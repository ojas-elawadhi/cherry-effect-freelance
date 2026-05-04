import ScrollStack, { ScrollStackItem } from "@/components/ScrollStack";

import { problemCards } from "./data";

const toneClasses = {
  purple: "bg-[#2d1148] text-[#f8edff]",
  yellow: "bg-[#f5e6a8] text-[#2e2608]",
  green: "bg-[#00a86b] text-[#041f16]",
};

export default function ScrollStackCards() {
  return (
    <ScrollStack
      useWindowScroll
      itemDistance={90}
      itemScale={0.04}
      itemStackDistance={36}
      stackPosition="18%"
      scaleEndPosition="10%"
      baseScale={0.9}
      className="w-full"
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
