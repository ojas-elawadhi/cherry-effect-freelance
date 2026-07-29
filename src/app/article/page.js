import Link from "next/link";

import CustomCursor from "../../components/custom-cursor";
import { articleCards } from "../../components/site-shell/data";

const SITE_URL = "https://thecherryeffect.com";

const cardGlows = [
  "radial-gradient(circle at top left, rgba(255, 0, 149, 0.26), transparent 42%)",
  "radial-gradient(circle at top, rgba(245, 230, 168, 0.22), transparent 44%)",
  "radial-gradient(circle at top right, rgba(0, 168, 107, 0.24), transparent 42%)",
  "radial-gradient(circle at bottom left, rgba(157, 78, 221, 0.24), transparent 44%)",
];

export const metadata = {
  title: "Business Strategy & Market Analysis Articles",
  description:
    "Read The Cherry Effect's articles on international business strategy, market entry, new ventures, hospitality, and growth.",
  keywords: [
    "business strategy articles",
    "international market entry",
    "international business strategy",
    "new venture analysis",
    "UK electric vehicle market",
    "India fitness market",
    "IHCL case study",
  ],
  alternates: {
    canonical: "/article",
  },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/article`,
    title: "Business Strategy & Market Analysis Articles | The Cherry Effect",
    description:
      "Sharp reads on international business strategy, market entry, new ventures, and strategic resilience.",
  },
};

const blogSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "The Cherry Effect Journal",
  description:
    "Articles on international business strategy, market entry, new ventures, and growth from The Cherry Effect.",
  url: `${SITE_URL}/article`,
  isPartOf: { "@id": `${SITE_URL}/#website` },
  mainEntity: {
    "@type": "ItemList",
    itemListElement: articleCards.map((article, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: article.title,
      url: `${SITE_URL}${article.href}`,
    })),
  },
};

export default function ArticlePage() {
  return (
    <main className="relative overflow-hidden bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      <CustomCursor />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,0,149,0.18),transparent_38%),radial-gradient(circle_at_80%_20%,rgba(0,168,107,0.18),transparent_30%),linear-gradient(180deg,var(--surface-base)_0%,#090909_100%)]" />
      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col gap-14 px-6 py-10 sm:px-10 lg:px-12">
        <header className="flex flex-col gap-6 rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur md:flex-row md:items-end md:justify-between">
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.45em] text-primary">
              The Cherry Effect Journal
            </p>
            <h1 className="max-w-3xl text-4xl font-black uppercase leading-none tracking-[-0.05em] text-foreground sm:text-6xl">
              Sharp thinking for brands that want better decisions.
            </h1>
            <p className="max-w-2xl text-base leading-7 text-foreground/72 sm:text-lg">
              Deep reads on international expansion, market entry, new ventures,
              and the strategic choices behind resilient growth.
            </p>
          </div>
          <Link
            href="/"
            className="inline-flex w-fit items-center gap-3 rounded-full border border-brand-yellow/20 bg-brand-yellow/8 px-5 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-foreground transition hover:border-primary/50 hover:bg-primary/12 hover:text-white"
          >
            Back to Home
          </Link>
        </header>

        <section className="grid gap-6 md:grid-cols-2">
          {articleCards.map((article, index) => (
            <article
              key={article.title}
              className="group relative min-h-[25rem] overflow-hidden rounded-[2rem] border border-white/10 bg-surface-elevated/80 transition duration-500 hover:-translate-y-2 hover:border-primary/50"
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-70"
                style={{ background: cardGlows[index] }}
              />
              <Link
                href={article.href}
                aria-label={`Read ${article.title}`}
                className="relative flex h-full min-h-[25rem] flex-col p-7"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="inline-flex rounded-full border border-white/10 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-foreground/72">
                    {article.category}
                  </span>
                  <span className="text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-foreground/48">
                    {article.year}
                  </span>
                </div>
                <h2 className="mt-7 text-2xl font-black uppercase leading-tight tracking-[-0.04em] text-foreground sm:text-3xl">
                  {article.title}
                </h2>
                <p className="mt-5 text-sm leading-7 text-foreground/72 sm:text-base">
                  {article.description}
                </p>
                <div className="mt-auto flex items-end justify-between gap-4 pt-8">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-foreground/48">
                    {article.readTime}
                  </p>
                  <span className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-green transition group-hover:text-primary">
                    Read article <span aria-hidden="true">&#8594;</span>
                  </span>
                </div>
              </Link>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
