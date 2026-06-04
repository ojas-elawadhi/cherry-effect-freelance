import { aboutStatementLines } from "./data";
import SectionReveal from "./section-reveal";
import TypedStatement from "./typed-statement";

export default function AboutSection() {
  return (
    <section id="about" className="px-4 pt-24 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <TypedStatement
          lines={aboutStatementLines}
          heading={
            <SectionReveal>
              <h2 className="text-xs font-semibold uppercase tracking-[0.42em] text-brand-green">
                About Us
              </h2>
            </SectionReveal>
          }
        />
      </div>
    </section>
  );
}
