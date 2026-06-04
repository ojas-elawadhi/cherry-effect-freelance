"use client";

import { useEffect, useRef, useState } from "react";

// How much scroll distance (in multiples of the viewport height) is dedicated
// to typing the whole statement out. Higher = each line takes longer to reveal.
const SCROLL_SPAN_VH = 1;

// Distance (px) the panel is pinned from the top of the viewport. Must match
// the `top-24` class on the sticky wrapper (24 * 0.25rem = 6rem = 96px).
const PIN_OFFSET = 96;

export default function TypedStatement({ lines, heading }) {
  const sectionRef = useRef(null);
  const stickyRef = useRef(null);
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const [containerHeight, setContainerHeight] = useState(null);

  const totalLength = lines.reduce(
    (sum, line) => sum + line.text.length + 1,
    0,
  );

  useEffect(() => {
    const node = sectionRef.current;
    const sticky = stickyRef.current;

    if (!node || !sticky) {
      return undefined;
    }

    let frame = 0;

    const update = () => {
      frame = 0;

      const viewportHeight = window.innerHeight;
      // Extra scroll distance reserved purely for the typing animation. The
      // container is this much taller than the panel, so the panel stays
      // pinned until every line has finished typing — only then can the next
      // section scroll into view.
      const span = viewportHeight * SCROLL_SPAN_VH;

      // Keep the container tall enough = panel height + the typing span.
      const nextHeight = sticky.offsetHeight + span;
      setContainerHeight((current) =>
        current === nextHeight ? current : nextHeight,
      );

      // Once the panel reaches its pinned position, the container's top sits
      // PIN_OFFSET above the viewport top. From there, progress runs 0 -> 1
      // across `span` of additional scrolling.
      const rect = node.getBoundingClientRect();
      const scrolled = PIN_OFFSET - rect.top;
      const progress = Math.min(1, Math.max(0, scrolled / span));

      setCount(Math.round(progress * totalLength));

      if (progress > 0) {
        setHasStarted(true);
      }
    };

    const onScroll = () => {
      if (frame) {
        return;
      }

      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);

      if (frame) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, [totalLength]);

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
    <div
      ref={sectionRef}
      className="relative mt-8"
      style={
        containerHeight
          ? { height: `${containerHeight}px` }
          : { minHeight: `${100 + SCROLL_SPAN_VH * 100}vh` }
      }
    >
      <div ref={stickyRef} className="sticky top-24">
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
    </div>
  );
}
