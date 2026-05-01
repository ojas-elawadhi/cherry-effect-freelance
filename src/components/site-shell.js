"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { MacbookScroll } from "@/components/ui/macbook-scroll";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";
import ContactForm from "./contact-form";

const navItems = [
  { label: "Work", href: "#work" },
  { label: "About Us", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Article", href: "/article" },
  { label: "How We Work", href: "#how-we-work" },
];

const heroWords = ["INFLUENCE", "GROWTH", "PRECISION"];

const problemCards = [
  {
    title: "Your brand looks fine.",
    body: "It just does not mean anything.",
    tone: "pink",
  },
  {
    title: "Your content is active.",
    body: "But it is not doing anything.",
    tone: "yellow",
  },
  {
    title: "Your business runs.",
    body: "But it is not set up to scale.",
    tone: "green",
  },
];

const workCards = [
  {
    tag: "Positioning Reset",
    name: "Luma Skincare",
    blurb: "Strategy, creative direction, funnel cleanup, and sharper language across the buyer journey.",
    accent: "pink",
    metric: "Recall up. Wastage down.",
  },
  {
    tag: "Launch System",
    name: "Northline Kitchens",
    blurb: "From zero clarity to a full launch story with content systems, paid media, and product-led landing pages.",
    accent: "yellow",
    metric: "A clearer brand hit harder.",
  },
  {
    tag: "Scale Engine",
    name: "Vera Clinics",
    blurb: "Offer refinement, conversion-focused campaigns, and operational systems that turned traction into pace.",
    accent: "green",
    metric: "Growth stopped feeling random.",
  },
];

const packages = [
  {
    name: "Pop",
    subtitle: "For brands getting their basics right",
    inclusions: "15 inclusions",
    accent: "pink",
    outcome: "You look clear, consistent, and ready.",
    groups: [
      {
        title: "Social & Content",
        items: [
          "Clean social setup + direction",
          "Basic content plan + weekly posts",
          "Simple visual identity + brand clarity",
        ],
      },
      {
        title: "Ads",
        items: [
          "Starter ads on one platform",
          "Basic targeting + simple creatives",
          "Instagram / Facebook setup",
        ],
      },
      {
        title: "Web & Product",
        items: [
          "Platform-based landing page",
          "Basic SEO setup",
          "Product + packaging direction",
          "Monthly tracking + simple insights",
          "Initial growth direction",
        ],
      },
    ],
  },
  {
    name: "Drip",
    subtitle: "For brands ready to grow properly",
    inclusions: "17 inclusions",
    accent: "yellow",
    outcome: "You stay in people's mind.",
    featured: true,
    groups: [
      {
        title: "Strategy & Content",
        items: [
          "Strong content strategy + structured calendar",
          "Weekly high-quality content",
          "Clear positioning + messaging",
        ],
      },
      {
        title: "Ads",
        items: [
          "Meta + Google campaign setup",
          "Funnel-based campaigns from awareness to conversion",
          "Creative + copy testing",
          "Retargeting + audience optimisation",
        ],
      },
      {
        title: "Web & Growth",
        items: [
          "Full website or immersive landing page",
          "SEO basics",
          "Product + packaging refinement",
          "Monthly performance insights",
          "Continuous optimisation + strategy check-ins",
        ],
      },
    ],
  },
  {
    name: "Juicy",
    subtitle: "For brands that want scale and dominance",
    inclusions: "20 inclusions",
    accent: "green",
    outcome: "You do not compete. You set the pace.",
    groups: [
      {
        title: "Brand & Content",
        items: [
          "Deep brand strategy + positioning",
          "Full content ecosystem across formats",
          "Content systems that build recall",
          "Presence across multiple platforms",
        ],
      },
      {
        title: "Ads",
        items: [
          "Advanced multi-platform ad strategy",
          "Full funnel from awareness to retention",
          "High-level targeting + continuous testing",
          "Conversion-focused creatives + copy",
        ],
      },
      {
        title: "Systems & Growth",
        items: [
          "CRM + customer journey setup",
          "Backend systems + automation",
          "Performance tracking across ROAS, CPL, CAC",
          "Ongoing scaling + business direction",
          "High-end website / SEO / product innovation",
        ],
      },
    ],
  },
];

const processSteps = [
  {
    number: "01",
    title: "Understand",
    body: "We actually get you. Your business, your market, your audience. No assumptions. No surface-level thinking.",
  },
  {
    number: "02",
    title: "Find the Problem",
    body: "We identify the real gaps, not the easy excuses. The friction gets named before anything gets built.",
  },
  {
    number: "03",
    title: "Fix the Foundation",
    body: "Brand, messaging, direction, and clarity get lined up so everything you put out lands properly.",
  },
  {
    number: "04",
    title: "Build & Push",
    body: "Content, ads, and systems are built with intent. We do not just run things. We make them work.",
  },
  {
    number: "05",
    title: "Improve & Scale",
    body: "We track what moves, fix what does not, and keep sharpening until the business stops plateauing.",
  },
];

const proofItems = [
  "Finally made sense of our brand",
  "Ads actually started working",
  "We stopped wasting money",
];

const testimonialItems = [
  {
    quote: "Finally made sense of our brand. Everything felt clearer after that.",
    name: "Founder, Luma Skincare",
    title: "Positioning and messaging reset",
  },
  {
    quote: "Ads actually started working because the offer and the landing flow finally matched.",
    name: "Northline Kitchens",
    title: "Creative and acquisition systems",
  },
  {
    quote: "We stopped wasting money and started seeing where growth was actually coming from.",
    name: "Vera Clinics",
    title: "Funnel structure and scale direction",
  },
];

const articleCards = [
  {
    title: "Why buyer psychology should lead your marketing",
    description:
      "A better brand starts with understanding emotion first and logic second.",
  },
  {
    title: "Why active content can still be invisible",
    description:
      "Consistency means very little if the message never sticks in memory.",
  },
  {
    title: "Why growth breaks when the foundation is weak",
    description:
      "Scale is not a traffic problem when the offer, message, and system are still misaligned.",
  },
];

const cherryPositions = [
  { left: "9%", top: "18%", duration: "18s", delay: "0s", scale: 1 },
  { left: "76%", top: "14%", duration: "20s", delay: "3s", scale: 0.85 },
  { left: "22%", top: "72%", duration: "17s", delay: "4s", scale: 0.72 },
  { left: "86%", top: "70%", duration: "22s", delay: "1s", scale: 0.94 },
  { left: "58%", top: "48%", duration: "16s", delay: "2s", scale: 0.68 },
];

function SectionReveal({
  children,
  className = "",
  as: Tag = "div",
  delay = 0,
  threshold = 0.2,
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;

    if (!node) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [threshold]);

  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

function CherryCursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer:fine)").matches) {
      return undefined;
    }

    const node = cursorRef.current;

    if (!node) {
      return undefined;
    }

    let frame = 0;
    let x = 0;
    let y = 0;

    const render = () => {
      node.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      frame = 0;
    };

    const handleMove = (event) => {
      x = event.clientX;
      y = event.clientY;
      node.dataset.visible = "true";

      if (!frame) {
        frame = window.requestAnimationFrame(render);
      }
    };

    const handlePointerContext = (event) => {
      node.dataset.active = event.target.closest(
        "a, button, input, textarea, label"
      )
        ? "true"
        : "false";
    };

    window.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseover", handlePointerContext);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseover", handlePointerContext);

      if (frame) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, []);

  return (
    <div ref={cursorRef} className="cherry-cursor" aria-hidden="true">
      <span className="cherry-cursor__fruit cherry-cursor__fruit--left" />
      <span className="cherry-cursor__fruit cherry-cursor__fruit--right" />
      <span className="cherry-cursor__stem" />
    </div>
  );
}

function CircularBadge() {
  const text = "THE * CHERRY * EFFECT";
  const letters = Array.from(text);

  return (
    <a
      href="#contact"
      className="circular-badge fixed right-4 top-24 z-40 hidden lg:block"
      aria-label="Jump to contact form"
    >
      <span className="circular-badge__core">TCE</span>
      <span className="circular-badge__ring">
        {letters.map((letter, index) => (
          <span
            key={`${letter}-${index}`}
            style={{
              transform: `rotate(${(360 / letters.length) * index}deg) translateY(-74px)`,
            }}
          >
            {letter}
          </span>
        ))}
      </span>
    </a>
  );
}

function TypedStatement({ lines }) {
  const ref = useRef(null);
  const [started, setStarted] = useState(false);
  const [count, setCount] = useState(0);
  const totalLength = lines.reduce((sum, line) => sum + line.text.length + 1, 0);

  useEffect(() => {
    const node = ref.current;

    if (!node) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) {
      return undefined;
    }

    if (count >= totalLength) {
      return undefined;
    }

    const timeout = window.setTimeout(() => {
      setCount((current) => current + 1);
    }, count < 80 ? 22 : 16);

    return () => window.clearTimeout(timeout);
  }, [count, started, totalLength]);

  const typedLines = lines.reduce(
    (accumulator, line) => {
      const visibleChars = Math.max(
        0,
        Math.min(line.text.length, count - accumulator.consumed)
      );

      return {
        consumed: accumulator.consumed + line.text.length + 1,
        items: [
          ...accumulator.items,
          {
            ...line,
            content: line.text.slice(0, visibleChars),
            visibleChars,
          },
        ],
      };
    },
    { consumed: 0, items: [] }
  ).items;

  return (
    <div ref={ref} className="space-y-4">
      {typedLines.map((line) => (
        <p
          key={line.text}
          className={`text-lg leading-8 sm:text-xl sm:leading-9 ${
            line.accent === "pink" ? "text-[#ff0095]" : "text-[#f5e6a8]"
          }`}
        >
          {line.content}
          {started && line.visibleChars < line.text.length ? (
            <span className="type-cursor" />
          ) : null}
        </p>
      ))}
    </div>
  );
}

function SplitHeadline({ text, className = "" }) {
  const words = text.split(" ");

  return (
    <motion.p
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.72 }}
      className={className}
    >
      {words.map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          variants={{
            hidden: {
              opacity: 0,
              y: 22,
              scale: 0.96,
              filter: "blur(8px)",
            },
            visible: {
              opacity: 1,
              y: 0,
              scale: 1,
              filter: "blur(0px)",
              transition: {
                type: "spring",
                bounce: 0.38,
                duration: 0.9,
                delay: index * 0.06,
              },
            },
          }}
          className="mr-[0.3em] inline-block"
        >
          {word}
        </motion.span>
      ))}
    </motion.p>
  );
}

function ScrollStackCards() {
  return (
    <div className="relative">
      {problemCards.map((card, index) => (
        <div
          key={card.title}
          className={`lg:h-[74vh] ${index !== problemCards.length - 1 ? "mb-6" : ""}`}
        >
          <div className="lg:sticky lg:top-28">
            <CardSpotlight
              radius={300}
              color={
                card.tone === "pink"
                  ? "#3b0a28"
                  : card.tone === "yellow"
                    ? "#42381c"
                    : "#0c3628"
              }
              className="rounded-[2rem] border-white/10 bg-[#090909]/92 p-8 sm:p-10"
            >
              <div className="relative z-10 space-y-8">
                <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#f5e6a8]/46">
                  0{index + 1}
                </p>
                <h3 className="text-3xl font-black uppercase leading-tight tracking-[-0.05em] text-[#f5e6a8] sm:text-5xl">
                  {card.title}
                </h3>
                <p className="max-w-2xl text-lg leading-8 text-[#f5e6a8]/76 sm:text-2xl sm:leading-10">
                  {card.body}
                </p>
              </div>
            </CardSpotlight>
          </div>
        </div>
      ))}
    </div>
  );
}

function HeroBackground() {
  return (
    <div className="hero-scene absolute inset-0 overflow-hidden">
      <div className="hero-scene__base" />
      <StarsBackground
        className="opacity-55"
        starDensity={0.00018}
        twinkleProbability={0.8}
        minTwinkleSpeed={0.5}
        maxTwinkleSpeed={1.2}
      />
      <ShootingStars
        className="opacity-75"
        starColor="#ff0095"
        trailColor="#f5e6a8"
        minDelay={1400}
        maxDelay={3200}
      />
      <div className="hero-scene__vignette" />
      <div className="hero-scene__dots" />
      <div className="hero-scene__orb hero-scene__orb--pink" />
      <div className="hero-scene__orb hero-scene__orb--yellow" />
      <div className="hero-scene__orb hero-scene__orb--green" />
      {cherryPositions.map((cherry, index) => (
        <div
          key={index}
          className="floating-cherry"
          style={{
            left: cherry.left,
            top: cherry.top,
            animationDuration: cherry.duration,
            animationDelay: cherry.delay,
            transform: `scale(${cherry.scale})`,
          }}
        >
          <span className="floating-cherry__fruit floating-cherry__fruit--left" />
          <span className="floating-cherry__fruit floating-cherry__fruit--right" />
          <span className="floating-cherry__stem" />
        </div>
      ))}
      <div className="noise-overlay" />
    </div>
  );
}

export default function SiteShell() {
  return (
    <>
      <CherryCursor />
      <CircularBadge />
      <FloatingNav
        className="hidden lg:flex"
        navItems={navItems.map((item) => ({
          name: item.label,
          link: item.href,
          icon: null,
        }))}
        ctaLabel="Contact"
        ctaHref="#contact"
      />
      <main className="relative overflow-hidden bg-[#050505] text-[#f5e6a8]">
        <header className="sticky top-0 z-30 border-b border-white/6 bg-[#050505]/70 backdrop-blur-xl">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-4 sm:px-6 lg:px-10">
            <Link
              href="/"
              className="text-sm font-black uppercase tracking-[0.45em] text-[#f5e6a8] transition hover:text-[#ff0095]"
            >
              The Cherry Effect
            </Link>

            <nav className="hidden items-center gap-1 rounded-full border border-white/8 bg-white/4 px-3 py-2 lg:flex">
              {navItems.map((item) =>
                item.href.startsWith("/") ? (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="nav-pill"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <a key={item.label} href={item.href} className="nav-pill">
                    {item.label}
                  </a>
                )
              )}
            </nav>

            <a href="#contact" className="cta-pill">
              Contact Us
            </a>
          </div>
        </header>

        <section className="relative isolate min-h-screen">
          <HeroBackground />
          <div className="relative mx-auto flex min-h-screen max-w-7xl items-center px-4 py-24 sm:px-6 lg:px-10">
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

        <section className="border-y border-white/6 bg-black px-4 py-24 sm:px-6 lg:px-10">
          <div className="mx-auto flex max-w-6xl flex-col gap-6">
            <SectionReveal className="space-y-4">
              <SplitHeadline
                text="Most marketing is noise."
                className="text-base font-bold uppercase tracking-[0.28em] text-[#ff4f7f] sm:text-lg"
              />
              <SplitHeadline
                text="Most agencies?"
                className="text-4xl font-black uppercase leading-none tracking-[-0.07em] text-[#f5e6a8] sm:text-6xl lg:text-7xl"
              />
              <SplitHeadline
                text="Even louder."
                className="text-5xl font-black uppercase leading-none tracking-[-0.07em] text-[#f5e6a8] sm:text-7xl lg:text-[6.2rem]"
              />
              <SplitHeadline
                text="We do not play that game."
                className="text-[2.7rem] font-black uppercase leading-none tracking-[-0.07em] text-[#00a86b] sm:text-6xl lg:text-[6.8rem]"
              />
            </SectionReveal>
          </div>
        </section>

        <section id="about" className="px-4 py-24 sm:px-6 lg:px-10">
          <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
            <SectionReveal className="space-y-5">
              <p className="text-xs font-semibold uppercase tracking-[0.42em] text-[#00a86b]">
                About Us
              </p>
              <h2 className="text-4xl font-black uppercase leading-none tracking-[-0.06em] text-[#f5e6a8] sm:text-6xl">
                We understand the people buying from you.
              </h2>
              <p className="max-w-lg text-base leading-8 text-[#f5e6a8]/70">
                At The Cherry Effect, we look beyond trends and tools. We focus
                on people, how they think, what they feel, and how they make
                decisions.
              </p>
            </SectionReveal>

            <SectionReveal delay={120} className="glass-panel p-8 sm:p-10">
              <TypedStatement
                lines={[
                  {
                    text: "At The Cherry Effect, we decode why people buy and build businesses around it.",
                  },
                  {
                    text: "We do not just market; we partner from zero to scale, aligning strategy, psychology, and execution into one clear direction.",
                  },
                  {
                    text: "Startups, founders, and enterprises get the same approach: sharp positioning, decisive action, measurable growth.",
                  },
                  {
                    text: "360-degree clarity. Zero guesswork. Pure human insight. Because when you understand people, growth is inevitable.",
                    accent: "pink",
                  },
                ]}
              />
            </SectionReveal>
          </div>
        </section>

        <section id="work" className="px-4 py-24 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-6xl space-y-14">
            <SectionReveal className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div className="space-y-4">
                <p className="text-xs font-semibold uppercase tracking-[0.42em] text-[#ff0095]">
                  Our Work
                </p>
                <h2 className="max-w-3xl text-4xl font-black uppercase leading-none tracking-[-0.06em] text-[#f5e6a8] sm:text-6xl">
                  The work has to feel alive before it performs alive.
                </h2>
              </div>
              <p className="max-w-xl text-base leading-8 text-[#f5e6a8]/68">
                Positioning, creative, landing pages, and growth systems are
                built as one experience. Not separate departments. Not random
                output.
              </p>
            </SectionReveal>

            <div className="overflow-hidden rounded-[2.5rem] border border-white/8 bg-black/30">
              <MacbookScroll
                src="/cherry-dashboard.svg"
                showGradient={false}
                title={
                  <span className="text-center text-4xl font-black uppercase leading-none tracking-[-0.06em] text-[#f5e6a8] sm:text-6xl">
                    Our projects come to life.
                    <br />
                    Quite literally.
                  </span>
                }
                badge={
                  <span className="rounded-full border border-[#ff0095]/30 bg-[#ff0095]/12 px-4 py-2 text-xs font-black uppercase tracking-[0.35em] text-[#f5e6a8]">
                    The Cherry Effect
                  </span>
                }
              />
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
              {workCards.map((card, index) => (
                <SectionReveal key={card.name} delay={index * 120}>
                  <article className={`poster-card poster-card--${card.accent}`}>
                    <div className="poster-card__shine" />
                    <div className="relative space-y-8">
                      <div className="flex items-center justify-between">
                        <span className="rounded-full border border-white/15 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-[#f5e6a8]/74">
                          {card.tag}
                        </span>
                        <span className="text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-[#f5e6a8]/50">
                          Case {index + 1}
                        </span>
                      </div>
                      <div className="space-y-4">
                        <h3 className="text-3xl font-black uppercase tracking-[-0.05em] text-[#f5e6a8]">
                          {card.name}
                        </h3>
                        <p className="text-sm leading-7 text-[#f5e6a8]/72">
                          {card.blurb}
                        </p>
                      </div>
                      <p className="text-sm font-semibold uppercase tracking-[0.28em] text-white">
                        {card.metric}
                      </p>
                    </div>
                  </article>
                </SectionReveal>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-24 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-6xl space-y-14">
            <SectionReveal className="space-y-4 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.42em] text-[#ff0095]">
                What We Fix
              </p>
              <h2 className="text-4xl font-black uppercase leading-none tracking-[-0.06em] text-[#f5e6a8] sm:text-6xl">
                What we fix.
              </h2>
            </SectionReveal>

            <ScrollStackCards />

            <SectionReveal className="text-center">
              <p className="text-3xl font-black uppercase tracking-[-0.05em] text-[#ff0095] sm:text-5xl">
                We fix the full picture.
              </p>
            </SectionReveal>
          </div>
        </section>

        <section id="services" className="px-4 py-24 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-7xl space-y-14">
            <SectionReveal className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.42em] text-[#00a86b]">
                Services
              </p>
              <h2 className="max-w-4xl text-4xl font-black uppercase leading-none tracking-[-0.06em] text-[#f5e6a8] sm:text-6xl">
                Packages built to move from clarity to scale.
              </h2>
            </SectionReveal>

            <div className="grid gap-8 xl:grid-cols-3 xl:gap-0">
              {packages.map((pack, index) => (
                <SectionReveal key={pack.name} delay={index * 120}>
                  <article
                    className={`package-card package-card--${pack.accent} ${
                      pack.featured ? "package-card--featured" : ""
                    } ${index === 1 ? "xl:-mx-4 xl:translate-y-6" : ""}`}
                  >
                    <div className="space-y-6">
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-3">
                          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#f5e6a8]/58">
                            {pack.inclusions}
                          </p>
                          <h3 className="text-4xl font-black uppercase tracking-[-0.06em] text-[#f5e6a8]">
                            {pack.name}
                          </h3>
                        </div>
                        {pack.featured ? (
                          <span className="rounded-full border border-[#f5e6a8]/18 bg-[#f5e6a8]/12 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.32em] text-[#f5e6a8]">
                            Best Value
                          </span>
                        ) : null}
                      </div>

                      <p className="text-base leading-7 text-[#f5e6a8]/76">
                        {pack.subtitle}
                      </p>

                      <div className="space-y-5">
                        {pack.groups.map((group) => (
                          <div key={group.title} className="space-y-3">
                            <p className="text-xs font-bold uppercase tracking-[0.34em] text-white">
                              {group.title}
                            </p>
                            <ul className="space-y-2 text-sm leading-7 text-[#f5e6a8]/72">
                              {group.items.map((item) => (
                                <li key={item}>+ {item}</li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>

                      <div className="rounded-[1.6rem] border border-white/10 bg-black/25 p-5">
                        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#f5e6a8]/50">
                          Outcome
                        </p>
                        <p className="mt-3 text-lg font-semibold leading-8 text-[#f5e6a8]">
                          {pack.outcome}
                        </p>
                      </div>
                    </div>
                  </article>
                </SectionReveal>
              ))}
            </div>
          </div>
        </section>

        <section id="how-we-work" className="px-4 py-24 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-6xl space-y-14">
            <SectionReveal className="space-y-5">
              <p className="text-xs font-semibold uppercase tracking-[0.42em] text-[#ff0095]">
                How We Work
              </p>
              <h2 className="max-w-4xl text-4xl font-black uppercase leading-none tracking-[-0.06em] text-[#f5e6a8] sm:text-6xl">
                Simple. No confusion.
              </h2>
              <div className="max-w-3xl space-y-4 text-base leading-8 text-[#f5e6a8]/72">
                <p>
                  We keep it simple. Most do not. No fluff. No filler. Just what
                  actually moves the needle.
                </p>
                <p>
                  We do not overcomplicate things. First, we understand your
                  business, your market, and your audience properly. Then we
                  identify what is not working and fix it at the root.
                </p>
              </div>
            </SectionReveal>

            <div className="grid gap-6">
              {processSteps.map((step, index) => (
                <SectionReveal key={step.number} delay={index * 90}>
                  <article className="glass-panel grid gap-6 p-6 sm:p-8 md:grid-cols-[130px_1fr] md:items-start">
                    <div className="text-[#ff0095]">
                      <p className="text-[3rem] font-black leading-none tracking-[-0.08em]">
                        {step.number}
                      </p>
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-2xl font-black uppercase tracking-[-0.05em] text-[#f5e6a8] sm:text-3xl">
                        {step.title}
                      </h3>
                      <p className="max-w-3xl text-base leading-8 text-[#f5e6a8]/72">
                        {step.body}
                      </p>
                    </div>
                  </article>
                </SectionReveal>
              ))}
            </div>

            <SectionReveal className="space-y-6 text-center">
              <p className="text-3xl font-black uppercase tracking-[-0.05em] text-[#f5e6a8] sm:text-5xl">
                Most brands do more.
                <br />
                We make what you do actually work.
              </p>
              <a href="#contact" className="cta-pill mx-auto">
                Let&apos;s Talk -&gt;
              </a>
            </SectionReveal>
          </div>
        </section>

        <section className="px-4 py-24 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-6xl space-y-14">
            <SectionReveal className="space-y-4 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.42em] text-[#00a86b]">
                Proof, Softly
              </p>
              <h2 className="text-4xl font-black uppercase leading-none tracking-[-0.06em] text-[#f5e6a8] sm:text-6xl">
                Let&apos;s do great work.
              </h2>
              <p className="mx-auto max-w-3xl text-base leading-8 text-[#f5e6a8]/70">
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

            <div className="grid gap-6 md:grid-cols-3">
              {proofItems.map((item, index) => (
                <SectionReveal key={item} delay={index * 100}>
                  <article className="rounded-[1.75rem] border border-white/8 bg-white/4 p-6 text-center">
                    <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#f5e6a8]/48">
                      Signal {index + 1}
                    </p>
                    <p className="mt-6 text-2xl font-black uppercase leading-snug tracking-[-0.05em] text-[#f5e6a8]">
                      {item}
                    </p>
                  </article>
                </SectionReveal>
              ))}
            </div>

            <SectionReveal className="grid gap-6 rounded-[2rem] border border-white/8 bg-white/4 p-6 text-center md:grid-cols-3 md:text-left">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.34em] text-[#ff0095]">
                  360
                </p>
                <p className="mt-3 text-xl font-bold uppercase tracking-[-0.04em] text-[#f5e6a8]">
                  Clarity first
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.34em] text-[#f5e6a8]">
                  0
                </p>
                <p className="mt-3 text-xl font-bold uppercase tracking-[-0.04em] text-[#f5e6a8]">
                  Guesswork tolerated
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.34em] text-[#00a86b]">
                  5
                </p>
                <p className="mt-3 text-xl font-bold uppercase tracking-[-0.04em] text-[#f5e6a8]">
                  Steps to better growth
                </p>
              </div>
            </SectionReveal>
          </div>
        </section>

        <section className="px-4 py-24 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-6xl space-y-12">
            <SectionReveal className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="space-y-4">
                <p className="text-xs font-semibold uppercase tracking-[0.42em] text-[#ff0095]">
                  Article
                </p>
                <h2 className="max-w-3xl text-4xl font-black uppercase leading-none tracking-[-0.06em] text-[#f5e6a8] sm:text-6xl">
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
                    <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#f5e6a8]/48">
                      Article 0{index + 1}
                    </p>
                    <h3 className="mt-5 text-2xl font-black uppercase tracking-[-0.05em] text-[#f5e6a8]">
                      {card.title}
                    </h3>
                    <p className="mt-4 text-sm leading-7 text-[#f5e6a8]/70">
                      {card.description}
                    </p>
                  </article>
                </SectionReveal>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="px-4 py-24 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-6xl">
            <SectionReveal className="glass-panel relative overflow-hidden p-8 sm:p-10 lg:p-12">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,0,149,0.2),transparent_32%),radial-gradient(circle_at_80%_20%,rgba(0,168,107,0.22),transparent_30%)]" />
              <div className="relative grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
                <div className="space-y-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.42em] text-[#00a86b]">
                    Contact Us
                  </p>
                  <h2 className="text-4xl font-black uppercase leading-none tracking-[-0.06em] text-[#f5e6a8] sm:text-6xl">
                    Let&apos;s take a proper look.
                  </h2>
                  <p className="text-xl font-semibold leading-8 text-[#ff0095]">
                    Get your company profile assessed today for free.
                  </p>
                  <p className="max-w-xl text-base leading-8 text-[#f5e6a8]/72">
                    Tell us where things feel stuck. Brand, content, ads,
                    positioning, product, growth systems. We will assess the
                    full picture, not just the noisy part.
                  </p>
                </div>

                <ContactForm />
              </div>
            </SectionReveal>
          </div>
        </section>

        <footer className="border-t border-white/6 px-4 py-14 sm:px-6 lg:px-10">
          <div className="mx-auto flex max-w-6xl flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
            <div className="space-y-4">
              <p className="text-sm font-black uppercase tracking-[0.45em] text-[#ff0095]">
                The Cherry Effect
              </p>
              <p className="max-w-md text-3xl font-black uppercase leading-tight tracking-[-0.05em] text-[#f5e6a8]">
                Make people want you.
              </p>
            </div>
            <div className="max-w-md space-y-3 text-base leading-8 text-[#f5e6a8]/70">
              <p>Most brands try.</p>
              <p>Some stand out.</p>
              <p>Very few get chosen.</p>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
