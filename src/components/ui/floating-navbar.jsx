"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

export const FloatingNav = ({
  navItems,
  className,
  ctaLabel = "Contact Us",
  ctaHref = "#contact",
  showCta = true,
}) => {
  const [visible, setVisible] = useState(false);
  const lastScrollRef = useRef(0);
  const frameRef = useRef(null);

  useEffect(() => {
    lastScrollRef.current = window.scrollY;

    const update = () => {
      frameRef.current = null;
      const currentScroll = window.scrollY;
      const scrollingUp = currentScroll < lastScrollRef.current;

      setVisible(currentScroll > window.innerHeight * 0.05 && scrollingUp);
      lastScrollRef.current = currentScroll;
    };

    const handleScroll = () => {
      if (frameRef.current === null) {
        frameRef.current = window.requestAnimationFrame(update);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);

      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  return (
    <div
      aria-hidden={!visible}
      className={cn(
        "floating-nav fixed inset-x-0 top-10 z-[5000] mx-auto flex max-w-fit items-center justify-center",
        visible && "is-visible",
        className,
      )}
    >
      <div className="flex items-center justify-center gap-2 rounded-full border border-white/10 bg-black/70 px-2 py-1.5 shadow-lg shadow-black/30 backdrop-blur-md dark:border-white/10 dark:bg-black/70">
        <div className="flex items-center gap-1">
          {navItems.map((navItem) => (
            <a
              key={navItem.link}
              href={navItem.link}
              className="relative flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium text-foreground/72 transition-colors hover:bg-white/10 hover:text-white dark:text-foreground/72 dark:hover:bg-white/10 dark:hover:text-white"
            >
              <span className="block sm:hidden">{navItem.icon}</span>
              <span className="hidden sm:block">{navItem.name}</span>
            </a>
          ))}
        </div>

        {showCta ? <div className="h-5 w-px bg-white/10" /> : null}

        {showCta ? (
          <a
            href={ctaHref}
            className="relative rounded-full bg-primary px-4 py-2 text-sm font-medium text-white transition-all hover:bg-[#ff2ea4] hover:shadow-lg hover:shadow-primary/30"
          >
            <span>{ctaLabel}</span>
          </a>
        ) : null}
      </div>
    </div>
  );
};
