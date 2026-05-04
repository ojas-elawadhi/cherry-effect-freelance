import { aboutStatementLines } from "./data";
import SectionReveal from "./section-reveal";
import TypedStatement from "./typed-statement";

export default function AboutSection() {
  return (
    <section id="about" className="px-4 py-24 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl space-y-8">
        <SectionReveal>
          <h2 className="text-xs font-semibold uppercase tracking-[0.42em] text-[#00a86b]">
            About Us
          </h2>
        </SectionReveal>
        <SectionReveal delay={120} className="glass-panel w-full p-8 sm:p-10">
          <TypedStatement lines={aboutStatementLines} />
        </SectionReveal>
      </div>
    </section>
  );
}
