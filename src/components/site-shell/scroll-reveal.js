"use client";

import { useMemo, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

function Word({
  children,
  progress,
  start,
  end,
  baseOpacity,
  blurStrength,
  enableBlur,
}) {
  const opacity = useTransform(progress, [start, end], [baseOpacity, 1]);
  const filter = useTransform(
    progress,
    [start, end],
    [`blur(${blurStrength}px)`, "blur(0px)"],
  );

  return (
    <motion.span
      className="inline-block"
      style={enableBlur ? { opacity, filter } : { opacity }}
    >
      {children}
    </motion.span>
  );
}

export default function ScrollReveal({
  lines,
  children,
  enableBlur = true,
  baseOpacity = 0.1,
  baseRotation = 3,
  blurStrength = 4,
  containerClassName = "",
  textClassName = "",
}) {
  const containerRef = useRef(null);

  const { scrollYProgress: rotationProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  const { scrollYProgress: wordProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end end"],
  });

  const rotate = useTransform(rotationProgress, [0, 1], [baseRotation, 0]);

  const resolvedLines = useMemo(() => {
    if (Array.isArray(lines) && lines.length > 0) return lines;
    const text = typeof children === "string" ? children : "";
    return text ? [{ text, className: textClassName }] : [];
  }, [lines, children, textClassName]);

  const tokenizedLines = useMemo(
    () =>
      resolvedLines.map((line) => ({
        ...line,
        tokens: line.text.split(/(\s+)/),
      })),
    [resolvedLines],
  );

  const totalWords = useMemo(
    () =>
      tokenizedLines.reduce(
        (sum, line) =>
          sum + line.tokens.filter((t) => t && !/^\s+$/.test(t)).length,
        0,
      ),
    [tokenizedLines],
  );

  const rampDuration = 0.4;
  const stride =
    totalWords > 1 ? (1 - rampDuration) / (totalWords - 1) : 0;

  let wordIndex = -1;

  return (
    <motion.div
      ref={containerRef}
      style={{ rotate, transformOrigin: "0% 50%", position: "relative" }}
      className={containerClassName}
    >
      {tokenizedLines.map((line, lineIdx) => (
        <p key={lineIdx} className={line.className ?? textClassName}>
          {line.tokens.map((token, tokenIdx) => {
            if (!token) return null;
            if (/^\s+$/.test(token)) {
              return <span key={tokenIdx}>{token}</span>;
            }
            wordIndex += 1;
            const start = wordIndex * stride;
            const end = Math.min(start + rampDuration, 1);
            return (
              <Word
                key={tokenIdx}
                progress={wordProgress}
                start={start}
                end={end}
                baseOpacity={baseOpacity}
                blurStrength={blurStrength}
                enableBlur={enableBlur}
              >
                {token}
              </Word>
            );
          })}
          {" "}
        </p>
      ))}
    </motion.div>
  );
}
