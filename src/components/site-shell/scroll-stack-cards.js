import ScrollStack, { ScrollStackItem } from "@/components/ScrollStack";

import { problemCards } from "./data";

const toneClasses = {
  purple: "bg-[#2d1148] text-[#f8edff]",
  yellow: "bg-brand-yellow text-[#2e2608]",
  green: "bg-brand-green text-[#041f16]",
};

export default function ScrollStackCards() {
  return (
    <ScrollStack
      useWindowScroll
      itemDistance={90}
      itemScale={0.04}
      itemStackDistance={36}
      stackPosition="32%"
      scaleEndPosition="22%"
      entryOffset="68%"
      baseScale={0.9}
      className="w-full"
      headerClassName="bg-background pb-8 pt-[8vh] text-center"
      header={
        <div className="mx-auto max-w-6xl space-y-4 px-4 sm:px-6 lg:px-10">
          <p className="text-xs font-semibold uppercase tracking-[0.42em] text-primary">
            What We Fix
          </p>
          <h2 className="text-4xl font-black uppercase leading-none tracking-[-0.06em] text-foreground sm:text-6xl">
            What we fix.
          </h2>
        </div>
      }
    >
      {problemCards.map((card, index) => (
        <ScrollStackItem
          key={card.title}
          itemClassName={`border border-white/12 shadow-[0_24px_80px_rgba(0,0,0,0.45)] min-h-[300px] h-auto p-8 sm:p-10 lg:p-14 ${
            toneClasses[card.tone]
          }`}
        >
          <div className="space-y-6">
            <p className="text-sm font-semibold uppercase tracking-[0.32em] opacity-70">
              0{index + 1}
            </p>
            <h3 className="text-3xl font-black leading-tight tracking-[-0.05em] sm:text-5xl">
              {card.title}
            </h3>
            <p className="max-w-2xl text-lg leading-8 sm:text-2xl sm:leading-10">
              {card.body}
            </p>
          </div>
        </ScrollStackItem>
      ))}
    </ScrollStack>
  );
}

