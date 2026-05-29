import { heroWords } from "./data";
import HeroBackground from "./hero-background";
import HeroSubtext from "./hero-subtext";
import HeroWordRotator from "./hero-word-rotator";

export default function HeroSection() {
  return (
    <section
      className="relative isolate min-h-[145vh] overflow-clip"
      data-hero-scroll-stage
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <HeroBackground />
        <div className="pointer-events-none relative mx-auto flex h-full max-w-7xl items-center justify-center px-4 py-16 sm:px-6 lg:px-10">
          <div className="flex w-full flex-col items-center">
            <HeroWordRotator words={heroWords} />

            <HeroSubtext className="absolute inset-x-0 bottom-[22vh] mx-auto max-w-3xl px-4 text-center text-sm font-bold leading-6 text-primary sm:bottom-[24vh] sm:text-xl sm:leading-7">
              Not more content. Not more ads. Just better decisions.
            </HeroSubtext>
          </div>
        </div>
      </div>
    </section>
  );
}
