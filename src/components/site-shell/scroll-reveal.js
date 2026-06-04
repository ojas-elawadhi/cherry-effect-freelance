"use client";

import { useEffect, useMemo, useRef } from "react";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";

// Glyphs the "decode" effect cycles through before a character locks in.
// Mono-ish noise that matches the brand's terminal/static vibe.
const SCRAMBLE_GLYPHS = "!<>-_\\/[]{}—=+*^?#%$&▓▒░█01";

function pickGlyph(seed) {
  // Deterministic-ish pseudo glyph so we never call Math.random (SSR-safe-ish
  // and avoids hydration thrash). Seed is composed from indices + a tick.
  const i = Math.abs(Math.floor(seed)) % SCRAMBLE_GLYPHS.length;
  return SCRAMBLE_GLYPHS[i];
}

// Maps a line's signed distance-from-focus (in line units) to depth/position.
// The active line sits forward and sharp; neighbours recede into 3D space.
function getLineMetrics(distance) {
  const d = Math.abs(distance);

  if (d < 0.5) {
    const t = d / 0.5;
    return { opacity: 1, scale: 1.06 - t * 0.06, z: -t * 60, rotateX: distance * 5 };
  }
  if (d < 1.25) {
    const t = (d - 0.5) / 0.75;
    return {
      opacity: 0.18 - t * 0.1,
      scale: 1 - t * 0.14,
      z: -60 - t * 240,
      rotateX: distance * 5,
    };
  }
  return {
    opacity: 0,
    scale: 0.82,
    z: -340,
    rotateX: distance > 0 ? 12 : -12,
  };
}

// How long a character scrambles once its line arrives, in milliseconds.
const DECODE_MS = 400;

// A single character that decodes from scrambled glyphs into its real letter.
// The scramble is TIME-based, not scroll-based: when the line enters focus the
// character runs a fixed ~1s decode, then locks. When the line leaves focus it
// re-arms so the next approach scrambles again (scroll up or down).
function DecodeChar({ char, charFocus, delay, clean }) {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (char === " ") {
      node.textContent = "";
      return;
    }

    let frame = 0;
    let raf = 0;
    let startTime = null; // when this char's decode clock began (ms)

    const render = (now) => {
      const r = charFocus.get(); // line focus: 0 (away) .. 1 (centered)

      // Clean line: never scrambles, always shows the real character.
      if (clean) {
        node.textContent = char;
        node.style.opacity = "1";
        raf = requestAnimationFrame(render);
        return;
      }

      // Line is away from focus: hide and re-arm the clock for next arrival.
      if (r <= 0.04) {
        startTime = null;
        node.textContent = "";
        node.style.opacity = "0";
        raf = requestAnimationFrame(render);
        return;
      }

      // Line has arrived: start the decode clock the first frame we see focus.
      if (startTime === null) startTime = now;
      const elapsed = now - startTime - delay;

      if (elapsed >= DECODE_MS) {
        // Decode finished: lock the real character.
        node.textContent = char;
        node.style.opacity = "1";
      } else if (elapsed < 0) {
        // Staggered start not reached yet: show a faint scrambling glyph.
        frame += 1;
        if (frame % 3 === 0) node.textContent = pickGlyph(frame * 7 + char.charCodeAt(0) * 13);
        node.style.opacity = "0.45";
      } else {
        // Actively decoding: flicker glyphs, fade up over the ~1s window.
        frame += 1;
        if (frame % 3 === 0) node.textContent = pickGlyph(frame * 7 + char.charCodeAt(0) * 13);
        node.style.opacity = String(0.45 + (elapsed / DECODE_MS) * 0.55);
      }

      raf = requestAnimationFrame(render);
    };

    raf = requestAnimationFrame(render);
    return () => cancelAnimationFrame(raf);
  }, [char, charFocus, delay, clean]);

  // Render the real char on the server / first paint so there's never a flash
  // of empty text; the effect takes over the content once mounted.
  return (
    <span ref={ref} className="inline-block">
      {char === " " ? " " : char}
    </span>
  );
}

// One animated line. Builds the chromatic-split layers + decoding characters and
// drives them from a single per-line `focus` motion value (0 away → 1 centered).
function TickerLine({ line, index, tickerProgress, textClassName, lineSpacing, isClean }) {
  const distance = useTransform(tickerProgress, (v) => index - v);

  // Position / depth.
  const y = useTransform(distance, (d) => d * lineSpacing);
  const opacity = useTransform(distance, (d) => getLineMetrics(d).opacity);
  const scale = useTransform(distance, (d) => getLineMetrics(d).scale);
  const z = useTransform(distance, (d) => getLineMetrics(d).z);
  const rotateX = useTransform(distance, (d) => getLineMetrics(d).rotateX);

  // focus: 1 at dead-center, easing to 0 by ~0.9 lines away. This now only
  // drives depth/chroma and gates the decode clock (arrives vs away); the
  // scramble DURATION is time-based (~1s) inside DecodeChar, not scroll-based.
  const focus = useTransform(distance, (d) => {
    const f = 1 - Math.min(Math.abs(d) / 0.9, 1);
    return f * f * (3 - 2 * f); // smoothstep
  });

  // Chromatic aberration: big split while entering, collapses to 0 at focus.
  // The clean (final) line never splits — that's the whole point.
  const splitX = useTransform(focus, (f) => (isClean ? 0 : (1 - f) * 14));
  const blurPx = useTransform(focus, (f) => (1 - f) * (isClean ? 2.5 : 6));
  const filter = useTransform(blurPx, (b) => `blur(${b.toFixed(2)}px)`);

  // Glitch shudder: a tiny horizontal jitter on noise lines while mid-entry.
  const skewX = useTransform(focus, (f) => (isClean ? 0 : Math.sin(f * 40) * (1 - f) * 1.2));

  // Split into words so a word never breaks mid-character, but keep a running
  // global index per character to stagger the decode start left-to-right. Each
  // word is rendered as a non-wrapping unit. `delay` is in ms: the whole line's
  // stagger is capped so it always finishes within ~1s + a short tail.
  const words = useMemo(() => {
    const total = line.text.length || 1;
    const maxStagger = 350; // ms spread across the whole line
    const perChar = maxStagger / total;
    const wordStrings = line.text.split(" ");
    const offsets = wordStrings.reduce(
      (acc, word, i) => [...acc, acc[i] + word.length + 1],
      [0],
    );
    return wordStrings.map((word, wi) =>
      Array.from(word).map((char, ci) => {
        const globalIndex = offsets[wi] + ci;
        return { char, delay: globalIndex * perChar };
      }),
    );
  }, [line.text]);

  const baseClass = line.className ?? textClassName;

  return (
    <motion.div
      className="absolute left-8 right-8 top-1/2 will-change-transform"
      style={{ y, z, rotateX, opacity, scale, filter, transformStyle: "preserve-3d", transformOrigin: "50% 50%" }}
    >
      <div className="relative -translate-y-1/2 text-balance">
        {/* Chromatic ghosts — pink + cyan layers offset by splitX. Hidden on the clean line. */}
        {!isClean && (
          <>
            <ChromaLayer text={line.text} baseClass={baseClass} focus={focus} splitX={splitX} dir={1} color="#ff0095" />
            <ChromaLayer text={line.text} baseClass={baseClass} focus={focus} splitX={splitX} dir={-1} color="#00e5ff" />
          </>
        )}

        {/* The real, decoding text on top — grouped into non-breaking words. */}
        <motion.p className={baseClass} style={{ skewX }}>
          {words.map((wordChars, wi) => (
            <span key={wi}>
              <span className="inline-block whitespace-nowrap">
                {wordChars.map((cell, ci) => (
                  <CharCell
                    key={`${cell.char}-${ci}`}
                    char={cell.char}
                    focus={focus}
                    delay={cell.delay}
                    clean={isClean}
                  />
                ))}
              </span>
              {wi < words.length - 1 ? " " : null}
            </span>
          ))}
        </motion.p>
      </div>
    </motion.div>
  );
}

// Thin wrapper passing the line focus + this char's stagger to the decoder.
function CharCell({ char, focus, delay, clean }) {
  return <DecodeChar char={char} charFocus={focus} delay={delay} clean={clean} />;
}

// A duplicate text layer used for the RGB-split ghost. screen-blended so the
// colors add to white where they overlap, fringe where they don't.
function ChromaLayer({ text, baseClass, focus, splitX, dir, color }) {
  const x = useTransform(splitX, (s) => s * dir);
  const layerOpacity = useTransform(focus, (f) => (1 - f) * 0.9);
  return (
    <motion.p
      aria-hidden="true"
      className={`${baseClass} absolute inset-0`}
      style={{ x, color, opacity: layerOpacity, mixBlendMode: "screen", pointerEvents: "none" }}
    >
      {text}
    </motion.p>
  );
}

export default function ScrollReveal({
  lines,
  children,
  containerClassName = "",
  lineSpacing = 220,
  textClassName = "",
}) {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const resolvedLines = useMemo(() => {
    if (Array.isArray(lines) && lines.length > 0) return lines;
    const text = typeof children === "string" ? children : "";
    return text ? [{ text, className: textClassName }] : [];
  }, [lines, children, textClassName]);

  const finalIndex = Math.max(resolvedLines.length - 1, 0);

  // Continuous fractional line index (0 → finalIndex) straight from scroll.
  // No "hold" keyframes here — the snapping below provides the dwell instead.
  const rawIndex = useTransform(
    scrollYProgress,
    [0, 1],
    [0, finalIndex],
  );

  // The snapped target line. Commit-or-revert: when scroll pushes the fractional
  // index past the halfway point toward the next line it rounds up (commits);
  // otherwise it rounds back to the current line (reverts). This target is the
  // ONLY thing the spring chases, so the text always settles on a sharp line and
  // never rests in the blurry in-between.
  const snappedTarget = useMotionValue(0);

  useEffect(() => {
    const update = (value) => {
      // Math.round = 50% distance threshold. Pull it toward a clean integer.
      const snapped = Math.max(0, Math.min(finalIndex, Math.round(value)));
      snappedTarget.set(snapped);
    };
    update(rawIndex.get());
    return rawIndex.on("change", update);
  }, [rawIndex, snappedTarget, finalIndex]);

  // The spring animates from line to line and lands sharp. Because its target is
  // always an integer, mid-transition is a brief pass-through, never a resting
  // state. Snappier spring = decisive commit instead of a lazy drift.
  const tickerProgress = useSpring(snappedTarget, {
    stiffness: 170,
    damping: 26,
    mass: 0.8,
  });

  return (
    <div
      ref={containerRef}
      className={["relative h-[320vh]", containerClassName].filter(Boolean).join(" ")}
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="relative mx-auto h-[62vh] w-full max-w-6xl" style={{ perspective: "1200px" }}>
          {resolvedLines.map((line, index) => (
            <TickerLine
              key={`${line.text}-${index}`}
              line={line}
              index={index}
              tickerProgress={tickerProgress}
              textClassName={textClassName}
              lineSpacing={line.lineSpacing ?? lineSpacing}
              isClean={index === finalIndex}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
