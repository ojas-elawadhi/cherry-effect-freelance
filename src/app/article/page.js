import Link from "next/link";

import CustomCursor from "../../components/custom-cursor";

const articleCards = [
  {
    title: "Why People Buy Before They Understand Why",
    category: "Psychology",
    excerpt:
      "A sharp breakdown of emotional triggers, logical justification, and what most brands misunderstand about demand.",
  },
  {
    title: "Content Is Not the Goal. Recall Is.",
    category: "Strategy",
    excerpt:
      "How to build content systems that stay in people's heads instead of disappearing into the scroll.",
  },
  {
    title: "The Difference Between Looking Good and Converting Well",
    category: "Growth",
    excerpt:
      "Design polish matters, but meaning, positioning, and decision flow matter more.",
  },
];

export const metadata = {
  title: "The Cherry Effect | Article",
  description:
    "Thought pieces from The Cherry Effect on positioning, buyer psychology, and growth systems.",
};

export default function ArticlePage() {
  return (
    <main className="relative overflow-hidden bg-background text-foreground">
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
              Articles around psychology, positioning, content clarity, and the
              systems behind growth that actually lasts.
            </p>
          </div>
          <Link
            href="/"
            className="inline-flex w-fit items-center gap-3 rounded-full border border-brand-yellow/20 bg-brand-yellow/8 px-5 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-foreground transition hover:border-primary/50 hover:bg-primary/12 hover:text-white"
          >
            Back to Home
          </Link>
        </header>

        <section className="grid gap-6 md:grid-cols-3">
          {articleCards.map((article, index) => (
            <article
              key={article.title}
              className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-surface-elevated/80 p-7 transition duration-500 hover:-translate-y-2 hover:border-primary/50"
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-70"
                style={{
                  background:
                    index === 0
                      ? "radial-gradient(circle at top left, rgba(255, 0, 149, 0.26), transparent 40%)"
                      : index === 1
                        ? "radial-gradient(circle at top, rgba(245, 230, 168, 0.22), transparent 44%)"
                        : "radial-gradient(circle at top right, rgba(0, 168, 107, 0.24), transparent 40%)",
                }}
              />
              <div className="relative space-y-5">
                <span className="inline-flex rounded-full border border-white/10 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-foreground/72">
                  {article.category}
                </span>
                <h2 className="text-2xl font-black uppercase leading-tight tracking-[-0.04em] text-foreground">
                  {article.title}
                </h2>
                <p className="text-sm leading-7 text-foreground/72">
                  {article.excerpt}
                </p>
                <p className="text-xs uppercase tracking-[0.35em] text-brand-green">
                  Full article page can plug into CMS next.
                </p>
              </div>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
