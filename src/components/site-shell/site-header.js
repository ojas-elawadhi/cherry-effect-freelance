import Link from "next/link";

import { navItems } from "./data";

export default function SiteHeader() {
  return (
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
