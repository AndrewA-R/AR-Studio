import Image from "next/image";
import Link from "next/link";

type Props = {
  thesis: string;
  thesisAccent: string;
  bodyTop: string;
  bodyBottom: string;
};

const items: Array<[string, string, string]> = [
  ["01", "Plans, briefs, and produces creative in one workspace.", "No more handoffs across five vendors."],
  ["02", "Buys, measures, and optimizes media against the same brief.", "Brand and performance signals in one view."],
  ["03", "Pulls customer truth into every decision.", "Continuous insight — not a quarterly slide."],
  ["04", "Reports in one document the CFO actually reads.", "No dashboard tour required."],
];

export function CarouselFeature({ thesis, thesisAccent, bodyTop, bodyBottom }: Props) {
  return (
    <section className="bg-purple-950 text-bone">
      <div className="wrap pt-6">
        <div className="flex justify-between items-baseline pb-3.5 border-b border-bone/20 font-mono text-[11px] tracking-[0.22em] uppercase text-purple-300">
          <span>§ What sets us apart</span>
          <span>An AI-driven marketing operating system, built by A+R.</span>
        </div>
      </div>

      <div className="relative overflow-hidden" style={{ padding: "clamp(64px,7vw,120px) clamp(24px,4vw,56px) clamp(64px,7vw,112px)" }}>
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(253,252,248,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(253,252,248,0.05) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
        <div className="relative max-w-wide mx-auto">
          <div className="flex items-center gap-6 mb-9 pb-6 border-b border-bone/20">
            <Image src="/brand/carousel-wordmark-ko.png" alt="Carousel" width={400} height={88} className="w-auto" style={{ height: "clamp(56px, 6vw, 88px)" }} />
            <div className="flex-1 flex items-center gap-3.5 font-mono text-[11px] tracking-[0.18em] uppercase text-bone/60">
              <span className="w-2 h-2 rounded-full bg-purple-300 inline-block" />
              <span>Software · A+R proprietary · AI-native</span>
            </div>
            <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-bone/60">v3.4 · April 2026</span>
          </div>

          <h2
            className="m-0 max-w-[18ch] text-balance"
            style={{
              fontFamily: '"Instrument Serif", serif',
              fontSize: "clamp(56px, 7.4vw, 128px)",
              lineHeight: 0.92,
              letterSpacing: "-0.028em",
              fontWeight: 400,
            }}
          >
            {thesis} <span className="italic text-purple-300">{thesisAccent}</span>
          </h2>

          <div className="mt-14 grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-y-10 gap-x-16 items-start">
            <div>
              <p className="m-0 max-w-[52ch] text-bone/90" style={{ fontFamily: '"Newsreader", Georgia, serif', fontSize: 21, lineHeight: 1.55 }}>{bodyTop}</p>
              <p className="mt-6 m-0 max-w-[52ch] text-bone/90" style={{ fontFamily: '"Newsreader", Georgia, serif', fontSize: 21, lineHeight: 1.55 }}>{bodyBottom}</p>
            </div>
            <div>
              <div className="mb-4 pb-3 border-b border-bone/20 font-mono text-[11px] tracking-[0.22em] uppercase text-purple-300">
                What it does, in plain language
              </div>
              <ol className="list-none p-0 m-0">
                {items.map(([n, t, sub]) => (
                  <li key={n} className="grid grid-cols-[36px_1fr] gap-3 py-3.5 border-b border-bone/10">
                    <span className="font-mono text-[11px] tracking-[0.18em] text-purple-300">{n}</span>
                    <span>
                      <div className="text-bone" style={{ fontFamily: '"Newsreader", Georgia, serif', fontSize: 17, lineHeight: 1.4 }}>{t}</div>
                      <div className="mt-1 text-bone/60 italic" style={{ fontFamily: '"Instrument Serif", serif', fontSize: 15 }}>{sub}</div>
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="mt-14 pt-7 border-t border-bone/20 flex flex-wrap justify-between items-center gap-8">
            <div className="text-bone/85 italic max-w-[38ch]" style={{ fontFamily: '"Instrument Serif", serif', fontSize: "clamp(22px, 2.4vw, 32px)", lineHeight: 1.25 }}>
              No other studio our size has built one. That is the point.
            </div>
            <Link href="/carousel" className="font-ui text-sm font-medium px-[22px] py-3.5 bg-bone text-purple-950 no-underline whitespace-nowrap">Tour Carousel →</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
