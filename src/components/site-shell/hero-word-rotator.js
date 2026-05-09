"use client";

import { useEffect, useState } from "react";

const WORD_ROTATION_MS = 1800;

export default function HeroWordRotator({ words }) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (words.length <= 1) {
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % words.length);
    }, WORD_ROTATION_MS);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [words.length]);

  if (!words.length) {
    return null;
  }

  return (
    <div className="relative h-[3.2rem] w-full text-center sm:h-[4.4rem] lg:h-[6.8rem]">
      <div
        key={words[activeIndex]}
        className="hero-word hero-word--cycle absolute inset-0 flex items-center justify-center [font-family:var(--font-press-start)] text-[2.8rem] leading-none tracking-[-0.08em] text-foreground sm:text-[4rem] lg:text-[6.4rem]"
      >
        {words[activeIndex]}
      </div>
    </div>
  );
}

