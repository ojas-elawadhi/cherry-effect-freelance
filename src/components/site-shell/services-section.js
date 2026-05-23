import { packages } from "./data";
import SectionReveal from "./section-reveal";
import { CardSpotlight } from "@/components/ui/card-spotlight";

const spotlightThemes = {
  pink: {
    color: "#1a0410",
    canvasColors: [
      [255, 0, 149],
      [255, 79, 127],
    ],
  },
  yellow: {
    color: "#1a1605",
    canvasColors: [
      [245, 230, 168],
      [240, 200, 120],
    ],
  },
  green: {
    color: "#04150d",
    canvasColors: [
      [0, 168, 107],
      [88, 200, 150],
    ],
  },
};

export default function ServicesSection() {
  return (
    <section id="services" className="px-4 py-24 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl space-y-14">
        <SectionReveal className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.42em] text-brand-green">
            Services
          </p>
          <h2 className="max-w-4xl text-4xl font-black uppercase leading-none tracking-[-0.06em] text-foreground sm:text-6xl">
            Packages built to move from clarity to scale.
          </h2>
        </SectionReveal>

        <div className="grid gap-8 xl:grid-cols-3 xl:gap-0">
          {packages.map((pack, index) => {
            const theme = spotlightThemes[pack.accent] ?? spotlightThemes.pink;
            return (
            <SectionReveal key={pack.name} delay={index * 120}>
              <CardSpotlight
                color={theme.color}
                canvasColors={theme.canvasColors}
                radius={420}
                className={`package-card package-card--${pack.accent} ${
                  pack.featured ? "package-card--featured" : ""
                } ${index === 1 ? "xl:-mx-4 xl:translate-y-6" : ""}`}
              >
                <div className="relative z-10 space-y-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-3">
                      <p className="text-xs font-semibold uppercase tracking-[0.35em] text-foreground/58">
                        {pack.inclusions}
                      </p>
                      <h3 className="text-4xl font-black uppercase tracking-[-0.06em] text-foreground">
                        {pack.name}
                      </h3>
                    </div>
                    {pack.featured ? (
                      <span className="rounded-full border border-brand-yellow/18 bg-brand-yellow/12 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.32em] text-foreground">
                        Best Value
                      </span>
                    ) : null}
                  </div>

                  <p className="text-base leading-7 text-foreground/76">
                    {pack.subtitle}
                  </p>

                  <div className="space-y-5">
                    {pack.groups.map((group) => (
                      <div key={group.title} className="space-y-3">
                        <p className="text-xs font-bold uppercase tracking-[0.34em] text-white">
                          {group.title}
                        </p>
                        <ul className="space-y-2 text-sm leading-7 text-foreground/72">
                          {group.items.map((item) => (
                            <li key={item}>+ {item}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                  <div className="rounded-[1.6rem] border border-white/10 bg-black/25 p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.35em] text-foreground/50">
                      Outcome
                    </p>
                    <p className="mt-3 text-lg font-semibold leading-8 text-foreground">
                      {pack.outcome}
                    </p>
                  </div>
                </div>
              </CardSpotlight>
            </SectionReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

