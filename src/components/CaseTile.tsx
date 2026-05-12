import Link from "next/link";
import { imgSrc } from "@/lib/image";

export type CaseTileProps = {
  slug: string;
  caseNumber?: string;
  client: string;
  tier?: string;
  sector?: string;
  dates?: string;
  headline: string;
  result?: string;
  heroImage?: unknown;
  clientLogo?: unknown;
  logoIsWhite?: boolean;
};

export function CaseTile(c: CaseTileProps) {
  const heroUrl = imgSrc(c.heroImage, "/placeholders/case-hero.jpg", 2000);
  const logoUrl = c.clientLogo ? imgSrc(c.clientLogo, "", 600) : "";
  return (
    <Link href={`/work/${c.slug}`} className="block no-underline text-inherit group">
      <div className="grid grid-cols-1 sm:grid-cols-[auto_1fr_auto] gap-6 items-baseline pb-3.5 border-b border-ink/10 font-mono text-[11px] tracking-[0.2em] uppercase text-ink-400">
        <span className="text-purple-700">Case · {c.caseNumber || "—"}</span>
        <span className="sm:text-center">{[c.tier, c.sector].filter(Boolean).join(" · ")}</span>
        <span>{c.dates}</span>
      </div>

      <div
        className="relative aspect-[21/10] overflow-hidden bg-purple-950 bg-center bg-cover"
        style={{ backgroundImage: heroUrl ? `url(${heroUrl})` : undefined }}
      >
        <div
          className="absolute left-3 bottom-3 sm:left-6 sm:bottom-6 flex items-center justify-center w-40 h-16 sm:w-64 sm:h-24 px-3 py-2 sm:px-6 sm:py-4"
          style={{
            background: "rgba(255,255,255,0.18)",
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
            border: "1px solid rgba(255,255,255,0.28)",
          }}
        >
          {logoUrl ? (
            <img
              src={logoUrl}
              alt={c.client}
              className="object-contain max-w-[140px] sm:max-w-[220px] opacity-95"
              style={{
                height: c.logoIsWhite ? "clamp(44px, 14vw, 118px)" : "clamp(28px, 9vw, 68px)",
                filter: c.logoIsWhite ? "none" : "brightness(0) invert(1)",
                marginTop: c.logoIsWhite ? 0 : 4,
              }}
            />
          ) : (
            <span className="text-bone whitespace-nowrap" style={{ fontFamily: '"Instrument Serif", serif', fontStyle: "italic", fontSize: "clamp(16px, 3.6vw, 22px)", lineHeight: 1, letterSpacing: "-0.01em" }}>
              {c.client}
            </span>
          )}
        </div>
      </div>

      <div className="bg-paper pt-7 grid grid-cols-1 md:grid-cols-[1.5fr_1fr] gap-y-7 gap-x-14 items-start">
        <div>
          <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-purple-700 mb-3.5">{c.client}</div>
          <h3
            className="m-0 text-ink max-w-[22ch] text-balance"
            style={{
              fontFamily: '"Instrument Serif", serif',
              fontSize: "clamp(36px, 4.4vw, 64px)",
              lineHeight: 1.0,
              letterSpacing: "-0.022em",
              fontWeight: 400,
            }}
          >
            {c.headline}
          </h3>
        </div>
        <div className="flex flex-col gap-4 md:pl-8 md:border-l border-ink/10">
          <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-ink-400">The result</div>
          <div className="text-ink italic" style={{ fontFamily: '"Instrument Serif", serif', fontSize: 22, lineHeight: 1.3 }}>
            {c.result}
          </div>
          <span className="mt-auto self-start font-ui text-sm font-medium text-purple-700 border-b border-purple-700 pb-1 group-hover:text-purple-900 group-hover:border-purple-900">
            Read the case →
          </span>
        </div>
      </div>
    </Link>
  );
}
