import Image from "next/image";
import Link from "next/link";

import Hyperspeed from "../ui/hyperspeed";

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

export default function SiteFooter() {
  return (
    <footer className="site-shell__footer relative overflow-hidden border-t border-white/6 px-4 py-14 sm:px-6 lg:px-10">
      <div className="absolute inset-0">
        <Hyperspeed effectOptions={footerHyperspeedOptions} />
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,0,149,0.18),transparent_24%),radial-gradient(circle_at_78%_26%,rgba(0,168,107,0.14),transparent_28%),linear-gradient(180deg,rgba(5,5,5,0.3),rgba(5,5,5,0.82)_54%,rgba(5,5,5,0.96))]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,5,5,0.46),transparent_34%,transparent_68%,rgba(5,5,5,0.62))]" />
      <div className="relative z-10 mx-auto flex min-h-full w-full max-w-6xl flex-col justify-between gap-12 py-6 sm:py-8 lg:py-12">
        <div className="space-y-6">
          <Link
            href="/"
            className="inline-flex items-center text-foreground transition hover:text-primary"
          >
            <Image
              src="/TCELogo-nobgwhite.png"
              alt="The Cherry Effect logo"
              width={420}
              height={156}
              className="h-auto w-[16rem] shrink-0 sm:w-[20rem] lg:w-[18rem]"
            />
          </Link>
          <p className="max-w-2xl text-4xl font-black uppercase leading-none tracking-[-0.06em] text-foreground sm:text-5xl lg:text-7xl">
            Make people want you.
          </p>
        </div>
        <div className="ml-auto max-w-xl space-y-3 text-right text-lg leading-8 text-foreground/70 sm:text-xl">
          <p>Most brands try.</p>
          <p>Some stand out.</p>
          <p>Very few get chosen.</p>
        </div>
      </div>
    </footer>
  );
}

