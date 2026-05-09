import ContactForm from "@/components/contact-form";

import SectionReveal from "./section-reveal";

export default function ContactSection() {
  return (
    <section id="contact" className="px-4 py-24 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <SectionReveal className="glass-panel relative overflow-hidden p-8 sm:p-10 lg:p-12">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,0,149,0.2),transparent_32%),radial-gradient(circle_at_80%_20%,rgba(0,168,107,0.22),transparent_30%)]" />
          <div className="relative grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="space-y-6">
              <p className="text-xs font-semibold uppercase tracking-[0.42em] text-brand-green">
                Contact Us
              </p>
              <h2 className="text-4xl font-black uppercase leading-none tracking-[-0.06em] text-foreground sm:text-6xl">
                Let&apos;s take a proper look.
              </h2>
              <p className="text-xl font-semibold leading-8 text-primary">
                Get your company profile assessed today for free.
              </p>
              <p className="max-w-xl text-base leading-8 text-foreground/72">
                Tell us where things feel stuck. Brand, content, ads,
                positioning, product, growth systems. We will assess the full
                picture, not just the noisy part.
              </p>
            </div>

            <ContactForm />
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}

