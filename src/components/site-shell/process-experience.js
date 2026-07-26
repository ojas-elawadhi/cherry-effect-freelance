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
  const cardRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [revealedCards, setRevealedCards] = useState(() =>
    steps.map(() => false),
  );

  useEffect(() => {
    const cards = cardRefs.current.filter(Boolean);

    if (!cards.length) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const mostVisible = entries
          .filter((entry) => entry.isIntersecting)
          .map((entry) => ({
            index: Number(entry.target.dataset.processIndex),
            ratio: entry.intersectionRatio,
          }))
          .sort((a, b) => b.ratio - a.ratio)[0];

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

        if (mostVisible && !Number.isNaN(mostVisible.index)) {
          setActiveIndex(mostVisible.index);
        }
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
    <div className="process-experience">
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

                <div className="process-card__signals" aria-label="Process signals">
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
