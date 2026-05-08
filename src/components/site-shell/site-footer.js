import Image from "next/image";
import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="site-shell__footer border-t border-white/6 px-4 py-14 sm:px-6 lg:px-10">
      <div className="mx-auto flex min-h-full w-full max-w-6xl flex-col justify-between gap-12 py-6 sm:py-8 lg:py-12">
        <div className="space-y-6">
          <Link
            href="/"
            className="inline-flex items-center text-[#f5e6a8] transition hover:text-[#ff0095]"
          >
            <Image
              src="/TCELogo.png"
              alt="The Cherry Effect logo"
              width={420}
              height={156}
              className="h-auto w-[16rem] shrink-0 sm:w-[20rem] lg:w-[26rem]"
            />
          </Link>
          <p className="max-w-2xl text-4xl font-black uppercase leading-none tracking-[-0.06em] text-[#f5e6a8] sm:text-5xl lg:text-7xl">
            Make people want you.
          </p>
        </div>
        <div className="ml-auto max-w-xl space-y-3 text-right text-lg leading-8 text-[#f5e6a8]/70 sm:text-xl">
          <p>Most brands try.</p>
          <p>Some stand out.</p>
          <p>Very few get chosen.</p>
        </div>
      </div>
    </footer>
  );
}
