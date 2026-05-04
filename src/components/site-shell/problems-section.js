import SectionReveal from "./section-reveal";
import ScrollStackCards from "./scroll-stack-cards";

export default function ProblemsSection() {
  return (
    <section className="px-4 py-24 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl space-y-14">
        <SectionReveal className="space-y-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.42em] text-[#ff0095]">
            What We Fix
          </p>
          <h2 className="text-4xl font-black uppercase leading-none tracking-[-0.06em] text-[#f5e6a8] sm:text-6xl">
            What we fix.
          </h2>
        </SectionReveal>

        <ScrollStackCards />

        <SectionReveal className="text-center">
          <p className="text-3xl font-black tracking-[-0.05em] text-[#ff0095] sm:text-5xl">
            We fix the full picture.
          </p>
        </SectionReveal>
      </div>
    </section>
  );
}
