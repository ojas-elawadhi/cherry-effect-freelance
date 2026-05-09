"use client";

import CustomCursor from "./custom-cursor";
import AboutSection from "./site-shell/about-section";
import ArticlesSection from "./site-shell/articles-section";
import ContactSection from "./site-shell/contact-section";
import HeroSection from "./site-shell/hero-section";
import NoiseSection from "./site-shell/noise-section";
import ProblemsSection from "./site-shell/problems-section";
import ProcessSection from "./site-shell/process-section";
import ProofSection from "./site-shell/proof-section";
import ServicesSection from "./site-shell/services-section";
import SiteFooter from "./site-shell/site-footer";
import SiteHeader from "./site-shell/site-header";
import SiteNavigation from "./site-shell/site-navigation";

export default function SiteShell() {
  return (
    <div className="site-shell">
      <CustomCursor />
      <SiteNavigation />
      <main className="site-shell__content relative overflow-x-clip bg-[#050505] text-[#f5e6a8]">
        <SiteHeader />
        <HeroSection />
        <NoiseSection />
        <AboutSection />
        <ProblemsSection />
        <ServicesSection />
        <ProcessSection />
        <ProofSection />
        <ArticlesSection />
        <ContactSection />
      </main>
      <div aria-hidden="true" className="site-shell__footer-spacer" />
      <SiteFooter />
    </div>
  );
}
