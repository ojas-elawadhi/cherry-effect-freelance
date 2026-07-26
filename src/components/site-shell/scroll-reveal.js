"use client";

import { useEffect, useMemo, useRef, useState } from "react";

function getLineMetrics(distance) {
  const absoluteDistance = Math.abs(distance);

  if (absoluteDistance === 0) {
    return { opacity: 1, scale: 1.06, z: 0, rotateX: 0 };
  }

  if (absoluteDistance === 1) {
    return {
      opacity: 0.12,
      scale: 0.9,
      z: -180,
      rotateX: distance * 6,
    };
  }

  return {
    opacity: 0,
    scale: 0.82,
    z: -340,
    rotateX: distance > 0 ? 12 : -12,
  };
}

export default function ScrollReveal({
  lines,
  children,
  containerClassName = "",
  lineSpacing = 220,
  textClassName = "",
}) {
  const containerRef = useRef(null);
  const frameRef = useRef(null);
  const isNearRef = useRef(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const resolvedLines = useMemo(() => {
    if (Array.isArray(lines) && lines.length > 0) {
      return lines;
    }

    const text = typeof children === "string" ? children : "";
    return text ? [{ text, className: textClassName }] : [];
  }, [lines, children, textClassName]);

  const finalIndex = Math.max(resolvedLines.length - 1, 0);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return undefined;
    }

    const update = () => {
      frameRef.current = null;

      if (!isNearRef.current) {
        return;
      }

      const rect = container.getBoundingClientRect();
      const scrollDistance = Math.max(rect.height - window.innerHeight, 1);
      const progress = Math.min(Math.max(-rect.top / scrollDistance, 0), 1);
      const nextIndex = Math.round(progress * finalIndex);

      setActiveIndex((current) =>
        current === nextIndex ? current : nextIndex,
      );
    };

    const handleViewportChange = () => {
      if (frameRef.current === null) {
        frameRef.current = window.requestAnimationFrame(update);
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isNearRef.current = entry.isIntersecting;
        handleViewportChange();
      },
      { rootMargin: "100% 0px" },
    );

    observer.observe(container);
    window.addEventListener("scroll", handleViewportChange, { passive: true });
    window.addEventListener("resize", handleViewportChange);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleViewportChange);
      window.removeEventListener("resize", handleViewportChange);

      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, [finalIndex]);

  return (
    <div
      ref={containerRef}
      className={["relative h-[320vh]", containerClassName]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div
          className="relative mx-auto h-[62vh] w-full max-w-6xl"
          style={{ perspective: "1200px" }}
        >
          {resolvedLines.map((line, index) => {
            const distance = index - activeIndex;
            const metrics = getLineMetrics(distance);
            const isActive = distance === 0;
            const isAdjacent = Math.abs(distance) === 1;
            const isClean = index === finalIndex;
            const words = line.text.split(" ");

            return (
              <div
                key={`${line.text}-${index}`}
                className={`noise-ticker__line absolute left-8 right-8 top-1/2 ${
                  isActive ? "is-active" : ""
                } ${isAdjacent ? "is-adjacent" : ""} ${
                  isClean ? "is-clean" : ""
                }`}
                style={{
                  opacity: metrics.opacity,
                  transform: `translate3d(0, ${distance * (line.lineSpacing ?? lineSpacing)}px, ${metrics.z}px) rotateX(${metrics.rotateX}deg) scale(${metrics.scale})`,
                }}
              >
                <p
                  className={`${line.className ?? textClassName} noise-ticker__text -translate-y-1/2 text-balance`}
                  data-text={line.text}
                >
                  {words.map((word, wordIndex) => {
                    const characterOffset = words
                      .slice(0, wordIndex)
                      .reduce((total, current) => total + current.length + 1, 0);

                    return (
                      <span key={`${word}-${wordIndex}`}>
                        <span className="noise-ticker__word">
                          {Array.from(word).map((character, characterIndex) => (
                            <span
                              key={`${character}-${characterIndex}`}
                              className="noise-ticker__character"
                              style={{
                                animationDelay: `${Math.min(
                                  (characterOffset + characterIndex) * 11,
                                  350,
                                )}ms`,
                              }}
                            >
                              {character}
                            </span>
                          ))}
                        </span>
                        {wordIndex < words.length - 1 ? " " : null}
                      </span>
                    );
                  })}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
