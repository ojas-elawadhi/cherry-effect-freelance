"use client";

import {
  ArrowRight,
  Brain,
  Rocket,
  Search,
  TrendingUp,
  Wrench,
} from "lucide-react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useRef, useState } from "react";

const stepIcons = [Brain, Search, Wrench, Rocket, TrendingUp];

const stepSignals = [
  ["Audience truth", "Buyer logic", "Context map"],
  ["Friction named", "Gap scan", "Root cause"],
  ["Message lock", "Brand spine", "Offer fit"],
  ["Content push", "Ad system", "Funnel build"],
  ["Signal read", "Scale loop", "Sharper moves"],
];

export default function ProcessExperience({ steps }) {
  const wrapperRef = useRef(null);
  const cardRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [revealedCards, setRevealedCards] = useState(() =>
    steps.map(() => false),
  );
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start 72%", "end 36%"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const nextIndex = Math.min(
      steps.length - 1,
      Math.max(0, Math.floor(latest * steps.length)),
    );

    setActiveIndex(nextIndex);
  });

  useEffect(() => {
    const cards = cardRefs.current.filter(Boolean);

    if (!cards.length) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        setRevealedCards((current) => {
          const next = [...current];
          let changed = false;

          entries.forEach((entry) => {
            const index = Number(entry.target.dataset.processIndex);

            if (Number.isNaN(index)) {
              return;
            }

            const shouldReveal = entry.isIntersecting && entry.intersectionRatio >= 0.42;
            const shouldReset = !entry.isIntersecting || entry.intersectionRatio <= 0.03;

            if (shouldReveal && !next[index]) {
              next[index] = true;
              changed = true;
            }

            if (shouldReset && next[index]) {
              next[index] = false;
              changed = true;
            }
          });

          return changed ? next : current;
        });
      },
      {
        rootMargin: "0px 0px -10% 0px",
        threshold: [0, 0.03, 0.42],
      },
    );

    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, [steps]);

  return (
    <div ref={wrapperRef} className="process-experience">
      <div className="process-cards">
        {steps.map((step, index) => {
          const Icon = stepIcons[index] ?? ArrowRight;

          return (
            <motion.article
              key={step.number}
              ref={(node) => {
                cardRefs.current[index] = node;
              }}
              data-process-index={index}
              className={`process-card ${
                activeIndex === index ? "is-active" : ""
              }`}
              initial="hidden"
              animate={revealedCards[index] ? "visible" : "hidden"}
              variants={{
                hidden: {
                  opacity: 0,
                  y: 92,
                  rotateX: 10,
                  scale: 0.94,
                  filter: "blur(14px)",
                  transition: {
                    duration: 0.28,
                    ease: "easeOut",
                  },
                },
                visible: {
                  opacity: 1,
                  y: 0,
                  rotateX: 0,
                  scale: 1,
                  filter: "blur(0px)",
                  transition: {
                    type: "spring",
                    stiffness: 86,
                    damping: 17,
                    mass: 0.75,
                  },
                },
              }}
            >
              <div className="process-card__scan" aria-hidden="true" />
              <div className="process-card__number">{step.number}</div>

              <div className="process-card__content">
                <div className="process-card__topline">
                  <span className="process-card__icon">
                    <Icon size={18} aria-hidden="true" />
                  </span>
                  <span>Phase {index + 1}</span>
                </div>

                <h3>{step.title}</h3>
                <p>{step.body}</p>

                <div className="process-card__signals" aria-label="Process signals">
                  {stepSignals[index].map((signal) => (
                    <span key={signal}>{signal}</span>
                  ))}
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>
    </div>
  );
}
