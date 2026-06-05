"use client";

import { useState } from "react";

import ScrollStack, { ScrollStackItem } from "@/components/ScrollStack";

import { problemCards } from "./data";

const toneClasses = {
  purple: "fix-card--purple bg-[#2d1148] text-[#f8edff]",
  yellow: "fix-card--yellow bg-brand-yellow text-[#2e2608]",
  green: "fix-card--green bg-brand-green text-[#041f16]",
};

export default function ScrollStackCards() {
  const [activeIndex, setActiveIndex] = useState(-1);

  return (
    <div className="fix-stack">
      <ScrollStack
        useWindowScroll
        itemDistance={90}
        itemScale={0.04}
        itemStackDistance={36}
        stackPosition="32%"
        scaleEndPosition="22%"
        entryOffset="68%"
        entranceScale={1.28}
        peakPosition={0.8}
        baseScale={0.9}
        className="relative z-[1] w-full"
        onActiveIndexChange={setActiveIndex}
        outroClassName="px-6 text-center"
        outro={
          <p className="max-w-4xl text-4xl font-black tracking-[-0.05em] text-white sm:text-7xl">
            We fix the <span className="text-primary">full</span> picture.
          </p>
        }
        headerClassName="pb-16 pt-[8vh] text-center"
        header={
          <div className="mx-auto max-w-6xl space-y-5 px-4 sm:px-6 lg:px-10">
            <p className="text-xs font-semibold uppercase tracking-[0.42em] text-primary">
              What We Fix
            </p>
            <h2 className="text-4xl font-black uppercase leading-none tracking-[-0.06em] text-foreground sm:text-6xl">
              What we fix.
            </h2>
            <div className="fix-header__rule" />
            <div className="flex items-center justify-center gap-3 pt-1">
              <div className="fix-dots">
                {problemCards.map((card, index) => (
                  <span
                    key={card.title}
                    className="fix-dots__dot"
                    data-active={index <= activeIndex}
                  />
                ))}
              </div>
            </div>
          </div>
        }
      >
        {problemCards.map((card, index) => (
          <ScrollStackItem
            key={card.title}
            itemClassName={`fix-card border border-white/12 shadow-[0_30px_90px_rgba(0,0,0,0.5)] min-h-[320px] h-auto p-8 sm:p-12 lg:p-16 ${
              toneClasses[card.tone]
            }`}
          >
            <span aria-hidden="true" className="fix-card__wash" />
            <span aria-hidden="true" className="fix-card__shine" />
            <span aria-hidden="true" className="fix-card__edge" />

            <div className="fix-card__body flex flex-col gap-7 sm:flex-row sm:items-start sm:gap-10">
              <p className="fix-card__num shrink-0">0{index + 1}</p>
              <div className="space-y-5">
                <h3 className="text-3xl font-black leading-[1.05] tracking-[-0.05em] sm:text-5xl">
                  {card.title}
                </h3>
                <p className="max-w-2xl text-lg leading-8 opacity-90 sm:text-2xl sm:leading-10">
                  {card.body}
                </p>
              </div>
            </div>
          </ScrollStackItem>
        ))}
      </ScrollStack>
    </div>
  );
}
