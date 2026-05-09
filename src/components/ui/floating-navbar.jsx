"use client";
import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";
import { cn } from "@/lib/utils";

export const FloatingNav = ({
  navItems,
  className,
  ctaLabel = "Contact Us",
  ctaHref = "#contact",
  showCta = true,
}) => {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      const direction = current - scrollYProgress.getPrevious();

      if (scrollYProgress.get() < 0.05) {
        setVisible(false);
      } else {
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: -100,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.2,
        }}
        className={cn(
          "fixed inset-x-0 top-10 z-[5000] mx-auto flex max-w-fit items-center justify-center",
          className
        )}>
        <div
          className="flex items-center justify-center gap-2 rounded-full border border-white/10 bg-black/70 px-2 py-1.5 shadow-lg shadow-black/30 backdrop-blur-md dark:border-white/10 dark:bg-black/70">
          {/* Nav items container */}
          <div className="flex items-center gap-1">
            {navItems.map((navItem, idx) => (
              <a
                key={`link-${idx}`}
                href={navItem.link}
                className={cn(
                  "relative flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium text-foreground/72 transition-colors hover:bg-white/10 hover:text-white dark:text-foreground/72 dark:hover:bg-white/10 dark:hover:text-white"
                )}>
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
      </motion.div>
    </AnimatePresence>
  );
};

