import { processSteps } from "./data";
import ProcessExperience from "./process-experience";
import SectionReveal from "./section-reveal";

export default function ProcessSection() {
  return (
    <section
      id="how-we-work"
      className="process-section render-later render-later--long px-4 py-24 sm:px-6 lg:px-10"
    >
      <div className="mx-auto max-w-6xl space-y-16">
        <SectionReveal className="space-y-5">
          <div className="process-heading">
            <p className="process-heading__eyebrow">How We Work</p>
            <h2>Simple. No confusion.</h2>
            <div className="process-heading__copy">
              <p>
                We keep it simple. Most do not. No fluff. No filler. Just what
                actually moves the needle.
              </p>
              <p>
                First, we understand your business, your market, and your
                audience properly. Then we identify what is not working and fix
                it at the root.
              </p>
            </div>
          </div>
        </SectionReveal>

        <ProcessExperience steps={processSteps} />

        <SectionReveal className="process-final">
          <div>
            <p className="process-final__label">Outcome</p>
            <p className="process-final__statement">
              Most brands do more.
              <br />
              We make what you do actually work.
            </p>
          </div>
          <a href="#contact" className="cta-pill process-final__cta">
            Let&apos;s Talk -&gt;
          </a>
        </SectionReveal>
      </div>
    </section>
  );
}
