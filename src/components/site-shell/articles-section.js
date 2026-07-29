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
              Articles
            </p>
            <h2 className="max-w-3xl text-4xl font-black uppercase leading-none tracking-[-0.06em] text-foreground sm:text-6xl">
              Sharp reads for founders who hate filler.
            </h2>
          </div>
          <Link href="/article" className="cta-pill">
            Explore All Articles
          </Link>
        </SectionReveal>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {articleCards.map((card, index) => (
            <SectionReveal key={card.title} delay={index * 100}>
              <article className="glass-panel group h-full overflow-hidden p-0 transition duration-500 hover:-translate-y-2 hover:border-primary/45">
                <Link
                  href={card.href}
                  aria-label={`Read ${card.title}`}
                  className="flex h-full flex-col p-7"
                >
                  <div className="flex items-center justify-between gap-4 text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-foreground/48">
                    <span>Article {String(index + 1).padStart(2, "0")}</span>
                    <span>{card.category}</span>
                  </div>
                  <h3 className="mt-5 text-xl font-black uppercase leading-tight tracking-[-0.05em] text-foreground">
                    {card.shortTitle}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-foreground/70">
                    {card.description}
                  </p>
                  <div className="mt-auto flex items-end justify-between gap-4 pt-7">
                    <p className="text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-foreground/48">
                      {card.readTime}
                    </p>
                    <span className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-green transition group-hover:text-primary">
                      Read article <span aria-hidden="true">&#8594;</span>
                    </span>
                  </div>
                </Link>
              </article>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

