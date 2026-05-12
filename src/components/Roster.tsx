import { imgSrc } from "@/lib/image";

type Logo = { _id: string; name: string; logo: unknown | null; opticalScale?: number };

function LogoCell({ l }: { l: Logo }) {
  const url = l.logo ? imgSrc(l.logo, "", 240) : "";
  // Optical-balance scale: per-logo override (default 1). Square / detailed
  // logos go above 1, very wide wordmarks go below. Scale applies to both
  // height and width caps so wide-aspect logos can still grow.
  const scale = typeof l.opticalScale === "number" && l.opticalScale > 0 ? l.opticalScale : 1;
  const baseH = 28; // px
  return (
    <div className="border-r border-b border-bone/15 aspect-[3/2] flex items-center justify-center px-5 py-4">
      {url ? (
        <img
          src={url}
          alt={l.name}
          className="object-contain"
          style={{
            filter: "brightness(0) invert(1) opacity(0.85)",
            maxHeight: `${baseH * scale}px`,
            maxWidth: `${Math.min(80 * scale, 95)}%`,
          }}
        />
      ) : (
        <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-bone/55 text-center">{l.name}</span>
      )}
    </div>
  );
}

export function Roster({
  headline, headlineAccent, copy, logos,
}: { headline: string; headlineAccent: string; copy: string; logos: Logo[] }) {
  // Split into two rows. floor on top, ceil on bottom — gives 7+8 for 15
  // brands (the original layout) and 8+8 for 16 brands.
  const half = Math.floor(logos.length / 2);
  const top = logos.slice(0, half);
  const bottom = logos.slice(half);
  const topCols = top.length;
  const bottomCols = bottom.length;

  return (
    <section className="bg-purple-950 text-bone py-24 px-[clamp(24px,4vw,56px)]">
      <div className="max-w-wide mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-x-16 gap-y-6 mb-12 items-baseline">
          <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-purple-300 font-medium">§ Track record</div>
          <div>
            <h2
              className="m-0 text-bone text-balance"
              style={{
                fontFamily: '"Instrument Serif", serif',
                fontSize: "clamp(36px, 4.2vw, 60px)",
                lineHeight: 1.02,
                letterSpacing: "-0.02em",
                fontWeight: 400,
              }}
            >
              {headline}<span className="italic text-purple-300 block">{headlineAccent}</span>
            </h2>
            <p className="mt-5 max-w-[60ch] m-0 text-bone/70" style={{ fontFamily: '"Newsreader", Georgia, serif', fontSize: 17, whiteSpace: "pre-line" }}>{copy}</p>
          </div>
        </div>

        {/* Two stacked grids — column count derives from how many brands are
            in each half, so 15 logos → 7+8, 16 logos → 8+8, etc. The custom
            column count only kicks in at lg+; below that we use 3/4 cols
            so logos don't get squashed on phones. */}
        <div
          className="grid grid-cols-2 sm:grid-cols-4 lg:[grid-template-columns:repeat(var(--cols),minmax(0,1fr))] border-t border-l border-bone/15"
          style={{ ["--cols" as string]: String(topCols) }}
        >
          {top.map((l) => <LogoCell key={l._id} l={l} />)}
        </div>
        <div
          className="grid grid-cols-3 sm:grid-cols-4 lg:[grid-template-columns:repeat(var(--cols),minmax(0,1fr))] border-l border-bone/15"
          style={{ ["--cols" as string]: String(bottomCols) }}
        >
          {bottom.map((l) => <LogoCell key={l._id} l={l} />)}
        </div>
      </div>
    </section>
  );
}
