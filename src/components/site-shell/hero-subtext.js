"use client";

import { useEffect, useState } from "react";

const SCROLL_REVEAL_THRESHOLD = 40;

export default function HeroSubtext({ children, className = "" }) {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > SCROLL_REVEAL_THRESHOLD) {
        setRevealed(true);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <p className={`hero-subtext ${revealed ? "is-visible" : ""} ${className}`}>
      {children}
    </p>
  );
}
