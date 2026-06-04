import ScrollReveal from "./scroll-reveal";

export default function NoiseSection() {
  return (
    <section className="border-y border-white/6 bg-black px-4 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal
          lineSpacing={220}
          lines={[
            {
              text: "Most marketing is noise.",
              className:
                "text-base font-bold uppercase tracking-normal text-[#ff4f7f] sm:text-2xl",
            },
            {
              text: "Most agencies?",
              className:
                "text-4xl font-black uppercase leading-none tracking-normal text-white sm:text-6xl lg:text-7xl",
            },
            {
              text: "Even louder.",
              className:
                "text-5xl font-black uppercase leading-none tracking-normal text-foreground sm:text-7xl lg:text-[6.2rem]",
            },
            {
              text: "We do not play that game.",
              className:
                "text-[2.35rem] font-black uppercase leading-none tracking-normal text-brand-green sm:text-6xl lg:text-[6.8rem]",
            },
          ]}
        />
      </div>
    </section>
  );
}
