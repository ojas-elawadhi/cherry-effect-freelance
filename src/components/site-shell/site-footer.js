export default function SiteFooter() {
  return (
    <footer className="border-t border-white/6 px-4 py-14 sm:px-6 lg:px-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
        <div className="space-y-4">
          <p className="text-sm font-black uppercase tracking-[0.45em] text-[#ff0095]">
            The Cherry Effect
          </p>
          <p className="max-w-md text-3xl font-black uppercase leading-tight tracking-[-0.05em] text-[#f5e6a8]">
            Make people want you.
          </p>
        </div>
        <div className="max-w-md space-y-3 text-base leading-8 text-[#f5e6a8]/70">
          <p>Most brands try.</p>
          <p>Some stand out.</p>
          <p>Very few get chosen.</p>
        </div>
      </div>
    </footer>
  );
}
