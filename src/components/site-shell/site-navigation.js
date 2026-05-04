import { FloatingNav } from "@/components/ui/floating-navbar";

import CircularBadge from "./circular-badge";
import { navItems } from "./data";

export default function SiteNavigation() {
  return (
    <>
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
    </>
  );
}
