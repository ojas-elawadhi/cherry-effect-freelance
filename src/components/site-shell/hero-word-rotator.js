const WORD_ROTATION_MS = 1800;

export default function HeroWordRotator({ words }) {
  if (!words.length) {
    return null;
  }

  const cycleDuration = words.length * WORD_ROTATION_MS;

  return (
    <div className="relative h-[3.2rem] w-full text-center sm:h-[4.4rem] lg:h-[6.8rem]">
      {words.map((word, index) => (
        <div
          key={word}
          className="hero-word hero-word--cycle absolute inset-0 flex items-center justify-center [font-family:var(--font-press-start)] text-[2.8rem] leading-none tracking-[-0.08em] text-foreground sm:text-[4rem] lg:text-[6.4rem]"
          style={{
            animationDelay: `${index * WORD_ROTATION_MS}ms`,
            animationDuration: `${cycleDuration}ms`,
          }}
        >
          {word}
        </div>
      ))}
    </div>
  );
}

