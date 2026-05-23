import Image from "next/image";
import Link from "next/link";

import { navItems } from "./data";

export default function SiteHeader() {
  return (
    <header className="absolute inset-x-0 top-0 z-40 bg-transparent">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-4 sm:px-6 lg:px-10">
        <Link
          href="/"
          className="flex items-center gap-3 text-sm font-black uppercase tracking-[0.45em] text-foreground transition hover:text-primary"
        >
          <Image
            src="/TCELogo-nobg.png"
            alt="The Cherry Effect logo"
            width={124}
            height={46}
            priority
            className=" w-auto shrink-0"
          />
          {/* <span>The Cherry Effect</span> */}
        </Link>

        <nav className="hidden items-center gap-1 rounded-full border border-white/8 bg-background/70 backdrop-blur-xl px-3 py-2 lg:flex">
          {navItems.map((item) =>
            item.href.startsWith("/") ? (
              <Link key={item.label} href={item.href} className="nav-pill">
                {item.label}
              </Link>
            ) : (
              <a key={item.label} href={item.href} className="nav-pill">
                {item.label}
              </a>
            ),
          )}
        </nav>

        <a href="#contact" className="cta-pill">
          Contact Us
        </a>
      </div>
    </header>
  );
}

