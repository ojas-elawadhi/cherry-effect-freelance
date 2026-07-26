"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Hyperspeed = dynamic(() => import("../ui/hyperspeed"), {
  loading: () => null,
  ssr: false,
});

const footerHyperspeedOptions = {
  distortion: "turbulentDistortion",
  length: 420,
  roadWidth: 14,
  islandWidth: 4,
  lanesPerRoad: 4,
  fov: 95,
  fovSpeedUp: 130,
  speedUp: 1.5,
  carLightsFade: 0.35,
  totalSideLightSticks: 32,
  lightPairsPerRoadWay: 48,
  movingAwaySpeed: [72, 96],
  movingCloserSpeed: [-150, -190],
  carLightsLength: [18, 96],
  colors: {
    roadColor: 0x7e0d5a,
    islandColor: 0xff0095,
    background: 0x050505,
    shoulderLines: 0xf5e6a8,
    brokenLines: 0xf5e6a8,
    leftCars: [0xff0095, 0x7e0d5a, 0xf5e6a8],
    rightCars: [0x00a86b, 0xf5e6a8, 0x7e0d5a],
    sticks: [0x00a86b, 0xff0095, 0xf5e6a8],
  },
};

export default function FooterHyperspeed() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }

    const footerSpacer = document.querySelector(
      ".site-shell__footer-spacer",
    );

    if (!footerSpacer) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { rootMargin: "150% 0px 150% 0px" },
    );

    observer.observe(footerSpacer);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="h-full w-full"
      data-footer-hyperspeed={active ? "active" : "idle"}
    >
      {active ? <Hyperspeed effectOptions={footerHyperspeedOptions} /> : null}
    </div>
  );
}
