"use client";

import { useEffect, useRef, useState } from "react";

// How fast the whole statement types out, in characters per second. The full
// box types automatically once it scrolls into view (not driven by scroll).
const CHARS_PER_SECOND = 55;

// Fraction of the panel that must be visible before typing kicks off.
const START_THRESHOLD = 0.35;

export default function TypedStatement({ lines, heading }) {
  const sectionRef = useRef(null);
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  const totalLength = lines.reduce(
    (sum, line) => sum + line.text.length + 1,
    0,
  );

  // Start typing once the panel comes into view.
  useEffect(() => {
    const node = sectionRef.current;

    if (!node || hasStarted) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: START_THRESHOLD },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [hasStarted]);

  // Once started, advance the typed character count on a fixed-rate clock.
  useEffect(() => {
    if (!hasStarted) {
      return undefined;
    }

    let frame = 0;
    let startTime = null;

    const tick = (now) => {
      if (startTime === null) {
        startTime = now;
      }

      const elapsedSeconds = (now - startTime) / 1000;
      const next = Math.min(
        totalLength,
        Math.round(elapsedSeconds * CHARS_PER_SECOND),
      );

      setCount(next);

      if (next < totalLength) {
        frame = window.requestAnimationFrame(tick);
      }
    };

    frame = window.requestAnimationFrame(tick);

    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, [hasStarted, totalLength]);

  const typedLines = lines.reduce(
    (accumulator, line) => {
      const visibleChars = Math.max(
        0,
        Math.min(line.text.length, count - accumulator.consumed),
      );

      return {
        consumed: accumulator.consumed + line.text.length + 1,
        items: [
          ...accumulator.items,
          {
            ...line,
            content: line.text.slice(0, visibleChars),
            visibleChars,
          },
        ],
      };
    },
    { consumed: 0, items: [] },
  ).items;

  return (
    <div ref={sectionRef} className="relative mt-8">
      {heading ? <div className="mb-8">{heading}</div> : null}
      <div className="glass-panel w-full p-8 sm:p-10">
        <div className="space-y-4">
          {typedLines.map((line) => (
            <p
              key={line.text}
              className={`text-lg leading-8 sm:text-xl sm:leading-9 ${
                line.accent === "pink"
                  ? "text-primary"
                  : line.accent === "yellow"
                    ? "text-foreground"
                    : "text-foreground"
              }`}
            >
              {line.content}
              {hasStarted &&
              line.visibleChars > 0 &&
              line.visibleChars < line.text.length ? (
                <span className="type-cursor" />
              ) : null}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
