"use client";

import { useEffect, useRef, useState } from "react";

const REVEAL_TRIGGER_POINT = 0.22;
const REVEAL_RESET_POINT = 0.06;

export default function HeroSubtext({ children, className = "" }) {
  const textRef = useRef(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    let frameId = null;

    const updateRevealState = () => {
      const textElement = textRef.current;
      const stageElement = textElement?.closest("[data-hero-scroll-stage]");

      if (!stageElement) {
        return;
      }

      const pinDistance = Math.max(
        stageElement.offsetHeight - window.innerHeight,
        1,
      );
      const scrolledWithinStage = Math.min(
        Math.max(-stageElement.getBoundingClientRect().top, 0),
        pinDistance,
      );
      const stageProgress = scrolledWithinStage / pinDistance;

      if (stageProgress >= REVEAL_TRIGGER_POINT) {
        setRevealed(true);
        return;
      }

      if (stageProgress <= REVEAL_RESET_POINT) {
        setRevealed(false);
      }
    };

    const handleViewportChange = () => {
      if (frameId !== null) {
        return;
      }

      frameId = window.requestAnimationFrame(() => {
        frameId = null;
        updateRevealState();
      });
    };

    updateRevealState();
    window.addEventListener("scroll", handleViewportChange, { passive: true });
    window.addEventListener("resize", handleViewportChange);

    return () => {
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }

      window.removeEventListener("scroll", handleViewportChange);
      window.removeEventListener("resize", handleViewportChange);
    };
  }, []);

  return (
    <p
      ref={textRef}
      className={`hero-subtext ${revealed ? "is-revealed" : ""} ${className}`}
    >
      {children}
    </p>
  );
}
