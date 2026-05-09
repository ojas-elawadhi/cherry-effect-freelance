import SectionReveal from "./section-reveal";
import SplitHeadline from "./split-headline";

export default function NoiseSection() {
  return (
    <section className="border-y border-white/6 bg-black px-4 py-24 sm:px-6 lg:px-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <SectionReveal className="space-y-4" threshold={0.7}>
          <SplitHeadline
            text="Most marketing is noise."
            className="text-base font-bold uppercase tracking-[0.28em] text-[#ff4f7f] sm:text-lg"
            viewportAmount={1}
            viewportMargin="0px 0px -18% 0px"
          />
          <SplitHeadline
            text="Most agencies?"
            className="text-4xl font-black uppercase leading-none tracking-[-0.07em] text-foreground sm:text-6xl lg:text-7xl"
            viewportAmount={1}
            viewportMargin="0px 0px -18% 0px"
          />
          <SplitHeadline
            text="Even louder."
            className="text-5xl font-black uppercase leading-none tracking-[-0.07em] text-foreground sm:text-7xl lg:text-[6.2rem]"
            viewportAmount={1}
            viewportMargin="0px 0px -18% 0px"
          />
          <SplitHeadline
            text="We do not play that game."
            className="text-[2.7rem] font-black uppercase leading-none tracking-[-0.07em] text-brand-green sm:text-6xl lg:text-[6.8rem]"
            viewportAmount={1}
            viewportMargin="0px 0px -18% 0px"
          />
        </SectionReveal>
      </div>
    </section>
  );
}

