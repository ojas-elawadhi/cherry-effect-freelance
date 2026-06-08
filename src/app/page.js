import SiteShell from "@/components/site-shell";

const SITE_URL = "https://thecherryeffect.com";

const services = [
  {
    name: "Performance Marketing",
    description:
      "Full-funnel paid campaigns across Meta and Google built to convert, with continuous creative and audience optimisation.",
  },
  {
    name: "Social Media Marketing in Delhi NCR",
    description:
      "Content strategy, structured calendars, and high-quality social content that builds brand recall.",
  },
  {
    name: "Search Engine Optimization (SEO)",
    description:
      "Technical and content SEO that helps brands rank and stay discoverable in Delhi NCR and beyond.",
  },
  {
    name: "Influencer & Affiliate Marketing",
    description:
      "Creator-led and affiliate-driven campaigns that reach the right audiences with measurable impact.",
  },
  {
    name: "Website Development",
    description:
      "Immersive, conversion-focused websites and landing pages designed around buyer psychology.",
  },
  {
    name: "Business Consultancy & Growth Management",
    description:
      "Brand strategy, positioning, and growth systems for startups, founders, and enterprises — including international companies entering the Indian market.",
  },
];

const servicesSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Digital Marketing & Consultancy Services",
  itemListElement: services.map((service, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "Service",
      name: service.name,
      description: service.description,
      provider: { "@id": `${SITE_URL}/#organization` },
      areaServed: ["Delhi NCR", "India", "International"],
    },
  })),
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(servicesSchema),
        }}
      />
      <SiteShell />
    </>
  );
}
