"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

const TEXT_TARGET_SELECTOR =
  'input, textarea, select, [contenteditable="true"], [contenteditable=""]';

export default function CustomCursor() {
  const cursorRef = useRef(null);

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

    const handleMove = (event) => {
      cursor.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0) translate3d(-50%, -50%, 0)`;
      updateVisibility(event.target);
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
        priority
        className="h-28 w-28 select-none object-contain drop-shadow-[0_0_24px_rgba(255,0,149,0.28)]"
      />
    </div>
  );
}
