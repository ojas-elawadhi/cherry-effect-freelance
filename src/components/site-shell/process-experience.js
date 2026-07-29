"use client";

import {
  ArrowRight,
  Brain,
  Rocket,
  Search,
  TrendingUp,
  Wrench,
} from "lucide-react";
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
  const activeIndexRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [revealedCards, setRevealedCards] = useState(() =>
    steps.map(() => false),
  );

  useEffect(() => {
    const wrapper = wrapperRef.current;

    if (!wrapper || !steps.length) {
      return undefined;
    }

    let frameId = null;
    let startOffset = 0;
    let endOffset = 1;

    const measure = () => {
      const bounds = wrapper.getBoundingClientRect();
      const wrapperTop = window.scrollY + bounds.top;

      startOffset = wrapperTop - window.innerHeight * 0.72;
      endOffset = wrapperTop + bounds.height - window.innerHeight * 0.36;
    };

    const updateActiveIndex = () => {
      frameId = null;

      const distance = Math.max(1, endOffset - startOffset);
      const progress = Math.min(
        1,
        Math.max(0, (window.scrollY - startOffset) / distance),
      );
      const nextIndex = Math.min(
        steps.length - 1,
        Math.max(0, Math.floor(progress * steps.length)),
      );

      if (activeIndexRef.current !== nextIndex) {
        activeIndexRef.current = nextIndex;
        setActiveIndex(nextIndex);
      }
    };

    const scheduleUpdate = () => {
      if (frameId === null) {
        frameId = window.requestAnimationFrame(updateActiveIndex);
      }
    };

    const handleResize = () => {
      measure();
      scheduleUpdate();
    };

    measure();
    updateActiveIndex();

    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", handleResize);

      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, [steps.length]);

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
            const shouldReveal =
              entry.isIntersecting && entry.intersectionRatio >= 0.42;
            const shouldReset =
              !entry.isIntersecting || entry.intersectionRatio <= 0.03;

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
            <article
              key={step.number}
              ref={(node) => {
                cardRefs.current[index] = node;
              }}
              data-process-index={index}
              className={`process-card ${
                activeIndex === index ? "is-active" : ""
              } ${revealedCards[index] ? "is-revealed" : ""}`}
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

                <div
                  className="process-card__signals"
                  aria-label="Process signals"
                >
                  {stepSignals[index].map((signal) => (
                    <span key={signal}>{signal}</span>
                  ))}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
