import { processSteps } from "./data";
import SectionReveal from "./section-reveal";

export default function ProcessSection() {
  return (
    <section id="how-we-work" className="px-4 py-24 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl space-y-14">
        <SectionReveal className="space-y-5">
          <p className="text-xs font-semibold uppercase tracking-[0.42em] text-[#ff0095]">
            How We Work
          </p>
          <h2 className="max-w-4xl text-4xl font-black uppercase leading-none tracking-[-0.06em] text-[#f5e6a8] sm:text-6xl">
            Simple. No confusion.
          </h2>
          <div className="max-w-3xl space-y-4 text-base leading-8 text-[#f5e6a8]/72">
            <p>
              We keep it simple. Most do not. No fluff. No filler. Just what
              actually moves the needle.
            </p>
            <p>
              We do not overcomplicate things. First, we understand your
              business, your market, and your audience properly. Then we
              identify what is not working and fix it at the root.
            </p>
          </div>
        </SectionReveal>

        <div className="grid gap-6">
          {processSteps.map((step, index) => (
            <SectionReveal key={step.number} delay={index * 90}>
              <article className="glass-panel grid gap-6 p-6 sm:p-8 md:grid-cols-[130px_1fr] md:items-start">
                <div className="text-[#ff0095]">
                  <p className="text-[3rem] font-black leading-none tracking-[-0.08em]">
                    {step.number}
                  </p>
                </div>
                <div className="space-y-3">
                  <h3 className="text-2xl font-black uppercase tracking-[-0.05em] text-[#f5e6a8] sm:text-3xl">
                    {step.title}
                  </h3>
                  <p className="max-w-3xl text-base leading-8 text-[#f5e6a8]/72">
                    {step.body}
                  </p>
                </div>
              </article>
            </SectionReveal>
          ))}
        </div>

        <SectionReveal className="space-y-6 text-center">
          <p className="text-3xl font-black uppercase tracking-[-0.05em] text-[#f5e6a8] sm:text-5xl">
            Most brands do more.
            <br />
            We make what you do actually work.
          </p>
          <a href="#contact" className="cta-pill mx-auto">
            Let&apos;s Talk -&gt;
          </a>
        </SectionReveal>
      </div>
    </section>
  );
}
