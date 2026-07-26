import Link from "next/link";

import { articleCards } from "./data";
import SectionReveal from "./section-reveal";

export default function ArticlesSection() {
  return (
    <section className="render-later render-later--medium px-4 py-24 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl space-y-12">
        <SectionReveal className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.42em] text-primary">
              Article
            </p>
            <h2 className="max-w-3xl text-4xl font-black uppercase leading-none tracking-[-0.06em] text-foreground sm:text-6xl">
              Sharp reads for founders who hate filler.
            </h2>
          </div>
          <Link href="/article" className="cta-pill">
            Open Article Page
          </Link>
        </SectionReveal>

        <div className="grid gap-6 md:grid-cols-3">
          {articleCards.map((card, index) => (
            <SectionReveal key={card.title} delay={index * 100}>
              <article className="glass-panel h-full p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-foreground/48">
                  Article 0{index + 1}
                </p>
                <h3 className="mt-5 text-2xl font-black uppercase tracking-[-0.05em] text-foreground">
                  {card.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-foreground/70">
                  {card.description}
                </p>
              </article>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

