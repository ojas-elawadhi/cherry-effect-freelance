"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

const TEXT_TARGET_SELECTOR =
  'input, textarea, select, [contenteditable="true"], [contenteditable=""]';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const frameRef = useRef(null);
  const pointerRef = useRef({ x: 0, y: 0, target: null });

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const mediaQuery = window.matchMedia("(pointer: fine)");
    if (!mediaQuery.matches) {
      return undefined;
    }

    const cursor = cursorRef.current;
    if (!cursor) {
      return undefined;
    }

    const updateVisibility = (target) => {
      const shouldHide = !!target?.closest?.(TEXT_TARGET_SELECTOR);
      cursor.dataset.visible = shouldHide ? "false" : "true";
    };

    const renderCursor = () => {
      frameRef.current = null;
      const { x, y, target } = pointerRef.current;

      cursor.style.transform = `translate3d(${x}px, ${y}px, 0) translate3d(-50%, -50%, 0)`;
      updateVisibility(target);
    };

    const handleMove = (event) => {
      pointerRef.current = {
        x: event.clientX,
        y: event.clientY,
        target: event.target,
      };

      if (frameRef.current === null) {
        frameRef.current = window.requestAnimationFrame(renderCursor);
      }
    };

    const handleLeave = () => {
      cursor.dataset.visible = "false";
    };

    const handleWindowOut = (event) => {
      if (!event.relatedTarget) {
        handleLeave();
      }
    };

    const handleEnter = (event) => {
      updateVisibility(event.target);
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseout", handleWindowOut);
    window.addEventListener("mouseover", handleEnter);
    window.addEventListener("blur", handleLeave);

    return () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }

      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseout", handleWindowOut);
      window.removeEventListener("mouseover", handleEnter);
      window.removeEventListener("blur", handleLeave);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      data-visible="false"
      aria-hidden="true"
      className="custom-cursor pointer-events-none fixed left-0 top-0 z-[9999] block"
    >
      <Image
        src="/Cherryeffecticon.png"
        alt=""
        width={112}
        height={112}
        className="h-28 w-28 select-none object-contain drop-shadow-[0_0_24px_rgba(255,0,149,0.28)]"
      />
    </div>
  );
}
