import SectionReveal from "./section-reveal";
import ScrollStackCards from "./scroll-stack-cards";

export default function ProblemsSection() {
  return (
    <section className="px-4 pb-24 pt-12 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <ScrollStackCards />

        <SectionReveal className="pt-14 text-center">
          <p className="text-3xl font-black tracking-[-0.05em] text-primary sm:text-7xl">
            We fix the full picture.
          </p>
        </SectionReveal>
      </div>
    </section>
  );
}

