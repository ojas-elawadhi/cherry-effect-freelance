import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";

import { proofItems, testimonialItems } from "./data";
import SectionReveal from "./section-reveal";

export default function ProofSection() {
  return (
    <section className="render-later render-later--long px-4 py-24 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl space-y-14">
        <SectionReveal className="space-y-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.42em] text-brand-green">
            Proof, Softly
          </p>
          <h2 className="text-4xl font-black uppercase leading-none tracking-[-0.06em] text-foreground sm:text-6xl">
            Let&apos;s do great work.
          </h2>
          <p className="mx-auto max-w-3xl text-base leading-8 text-foreground/70">
            We are not here to hide behind reports or noise. We are here to
            make sure your brand makes sense, your marketing works, and your
            business grows without confusion.
          </p>
        </SectionReveal>

        <InfiniteMovingCards
          items={testimonialItems}
          direction="right"
          speed="slow"
          pauseOnHover
        />

        <div className="grid items-stretch gap-6 md:grid-cols-3">
          {proofItems.map((item, index) => (
            <SectionReveal key={item} delay={index * 100} className="h-full">
              <article className="flex h-full flex-col rounded-[1.75rem] border border-white/8 bg-white/4 p-6 text-center">
                <p className="text-sm font-semibold uppercase tracking-[0.35em] text-foreground/48">
                  Signal {index + 1}
                </p>
                <p className="mt-6 flex flex-1 items-center justify-center text-2xl font-black uppercase leading-snug tracking-[-0.05em] text-foreground">
                  {item}
                </p>
              </article>
            </SectionReveal>
          ))}
        </div>

        <SectionReveal className="grid gap-6 rounded-[2rem] border border-white/8 bg-white/4 p-6 text-center md:grid-cols-3 md:text-left">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.34em] text-primary">
              360
            </p>
            <p className="mt-3 text-xl font-bold uppercase tracking-[-0.04em] text-foreground">
              Clarity first
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.34em] text-foreground">
              0
            </p>
            <p className="mt-3 text-xl font-bold uppercase tracking-[-0.04em] text-foreground">
              Guesswork tolerated
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.34em] text-brand-green">
              5
            </p>
            <p className="mt-3 text-xl font-bold uppercase tracking-[-0.04em] text-foreground">
              Steps to better growth
            </p>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
