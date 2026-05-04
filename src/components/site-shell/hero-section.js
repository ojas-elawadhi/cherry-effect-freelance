import { heroWords } from "./data";
import HeroBackground from "./hero-background";

export default function HeroSection() {
  return (
    <section className="relative isolate min-h-screen">
      <HeroBackground />
      <div className="pointer-events-none relative mx-auto flex min-h-screen max-w-7xl items-center px-4 py-24 sm:px-6 lg:px-10">
        <div className="max-w-5xl space-y-10">
          <p className="inline-flex rounded-full border border-[#f5e6a8]/15 bg-[#f5e6a8]/6 px-4 py-2 text-xs font-semibold uppercase tracking-[0.45em] text-[#f5e6a8]/80">
            Influence . Growth . Precision
          </p>

          <div className="space-y-6">
            {heroWords.map((word, index) => (
              <div
                key={word}
                className="hero-word [font-family:var(--font-press-start)] text-[2.8rem] leading-none tracking-[-0.08em] text-[#f5e6a8] sm:text-[4rem] lg:text-[6.4rem]"
                style={{ animationDelay: `${index * 180}ms` }}
              >
                {word}
              </div>
            ))}
          </div>

          <p className="hero-subtext max-w-2xl text-xl leading-9 text-[#f5e6a8]/78 sm:text-2xl">
            Not more content.
            <br />
            Not more ads.
            <br />
            Just better decisions.
          </p>
        </div>
      </div>
    </section>
  );
}
