"use client";

import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

function toRgb(color) {
  return `rgb(${color.join(" ")})`;
}

export const CardSpotlight = ({
  children,
  radius = 350,
  color = "#262626",
  canvasColors = [
    [59, 130, 246],
    [139, 92, 246],
  ],
  dotSize = 3,
  className,
  style,
  ...props
}) => {
  const cardRef = useRef(null);
  const frameRef = useRef(null);
  const pointerRef = useRef({ x: 0, y: 0 });

  useEffect(
    () => () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    },
    [],
  );

  const handlePointerMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    pointerRef.current = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };

    if (frameRef.current !== null) {
      return;
    }

    frameRef.current = window.requestAnimationFrame(() => {
      frameRef.current = null;
      const card = cardRef.current;

      if (!card) {
        return;
      }

      card.style.setProperty("--spotlight-x", `${pointerRef.current.x}px`);
      card.style.setProperty("--spotlight-y", `${pointerRef.current.y}px`);
    });
  };

  return (
    <div
      ref={cardRef}
      className={cn(
        "card-spotlight group/spotlight relative rounded-md border border-neutral-800 bg-black p-10 dark:border-neutral-800",
        className,
      )}
      onPointerMove={handlePointerMove}
      style={{
        ...style,
        "--spotlight-color": color,
        "--spotlight-dot-primary": toRgb(canvasColors[0]),
        "--spotlight-dot-secondary": toRgb(
          canvasColors[1] ?? canvasColors[0],
        ),
        "--spotlight-dot-size": `${dotSize}px`,
        "--spotlight-dot-secondary-size": `${Math.max(dotSize * 0.7, 1)}px`,
        "--spotlight-radius": `${radius}px`,
      }}
      {...props}
    >
      <div aria-hidden="true" className="card-spotlight__effect" />
      {children}
    </div>
  );
};
