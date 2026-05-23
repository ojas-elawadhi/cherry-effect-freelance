import ScrollReveal from "./scroll-reveal";

export default function NoiseSection() {
  return (
    <section className="border-y border-white/6 bg-black px-4 py-24 sm:px-6 lg:px-10 min-h-screen">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <ScrollReveal
          baseOpacity={0.1}
          baseRotation={3}
          blurStrength={4}
          enableBlur
          containerClassName="space-y-4"
          lines={[
            {
              text: "Most marketing is noise.",
              className:
                "text-base font-bold uppercase tracking-[0.28em] text-[#ff4f7f] sm:text-lg",
            },
            {
              text: "Most agencies?",
              className:
                "text-4xl font-black uppercase leading-none tracking-[-0.07em] text-foreground sm:text-6xl lg:text-7xl",
            },
            {
              text: "Even louder.",
              className:
                "text-5xl font-black uppercase leading-none tracking-[-0.07em] text-foreground sm:text-7xl lg:text-[6.2rem]",
            },
            {
              text: "We do not play that game.",
              className:
                "text-[2.7rem] font-black uppercase leading-none tracking-[-0.07em] text-brand-green sm:text-6xl lg:text-[6.8rem]",
            },
          ]}
        />
      </div>
    </section>
  );
}
