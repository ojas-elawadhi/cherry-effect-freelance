import { heroWords } from "./data";
import HeroBackground from "./hero-background";
import HeroSubtext from "./hero-subtext";
import HeroWordRotator from "./hero-word-rotator";

export default function HeroSection() {
  return (
    <section className="relative isolate min-h-screen overflow-hidden">
      <HeroBackground />
      <div className="pointer-events-none relative mx-auto flex min-h-screen max-w-7xl items-center justify-center px-4 py-16 sm:px-6 lg:px-10">
        <div className="flex w-full flex-col items-center">
          <HeroWordRotator words={heroWords} />

          <HeroSubtext className="absolute font-bold inset-x-0 bottom-10 mx-auto px-4 text-center text-sm leading-6 text-primary sm:bottom-12 sm:text-xl sm:leading-7">
            Not more content. Not more ads. Just better decisions.
          </HeroSubtext>
        </div>
      </div>
    </section>
  );
}

