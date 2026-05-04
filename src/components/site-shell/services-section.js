import { packages } from "./data";
import SectionReveal from "./section-reveal";

export default function ServicesSection() {
  return (
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
  );
}
