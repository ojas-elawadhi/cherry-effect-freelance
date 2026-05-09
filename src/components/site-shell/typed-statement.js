"use client";

import { useEffect, useRef, useState } from "react";

export default function TypedStatement({ lines }) {
  const ref = useRef(null);
  const [started, setStarted] = useState(false);
  const [count, setCount] = useState(0);
  const totalLength = lines.reduce(
    (sum, line) => sum + line.text.length + 1,
    0,
  );

  useEffect(() => {
    const node = ref.current;

    if (!node) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          return;
        }

        setStarted(false);
        setCount(0);
      },
      { threshold: 0.35 },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) {
      return undefined;
    }

    if (count >= totalLength) {
      return undefined;
    }

    const timeout = window.setTimeout(
      () => {
        setCount((current) => current + 1);
      },
      count < 80 ? 22 : 16,
    );

    return () => window.clearTimeout(timeout);
  }, [count, started, totalLength]);

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
    <div ref={ref} className="space-y-4">
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
          {started && line.visibleChars < line.text.length ? (
            <span className="type-cursor" />
          ) : null}
        </p>
      ))}
    </div>
  );
}

