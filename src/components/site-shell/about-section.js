import { aboutStatementLines } from "./data";
import SectionReveal from "./section-reveal";
import TypedStatement from "./typed-statement";

export default function AboutSection() {
  return (
    <section id="about" className="px-4 py-24 sm:px-6 lg:px-10">
      <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
        <SectionReveal className="space-y-5">
          <p className="text-xs font-semibold uppercase tracking-[0.42em] text-[#00a86b]">
            About Us
          </p>
          <h2 className="text-4xl font-black uppercase leading-none tracking-[-0.06em] text-[#f5e6a8] sm:text-6xl">
            We understand the people buying from you.
          </h2>
          <p className="max-w-lg text-base leading-8 text-[#f5e6a8]/70">
            At The Cherry Effect, we look beyond trends and tools. We focus on
            people, how they think, what they feel, and how they make
            decisions.
          </p>
        </SectionReveal>

        <SectionReveal delay={120} className="glass-panel p-8 sm:p-10">
          <TypedStatement lines={aboutStatementLines} />
        </SectionReveal>
      </div>
    </section>
  );
}
