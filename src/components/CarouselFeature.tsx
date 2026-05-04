import Image from "next/image";
import Link from "next/link";
import { CarouselGraphic } from "./CarouselGraphic";

type Props = {
  thesis: string;
  thesisAccent: string;
  bodyTop: string;
  bodyBottom: string;
};

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

          {/* Two-column body: headline + copy + numbered list on the left,
              animated Carousel graphic on the right. The headline is sized
              to fit the left column without wrapping into the graphic. */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-y-12 gap-x-16 items-start">
            <div>
              <h2
                className="m-0 text-balance"
                style={{
                  fontFamily: '"Instrument Serif", serif',
                  fontSize: "clamp(32px, 3.6vw, 56px)",
                  lineHeight: 1.0,
                  letterSpacing: "-0.022em",
                  fontWeight: 400,
                }}
              >
                {thesis} <span className="italic text-purple-300">{thesisAccent}</span>
              </h2>

              <div className="mt-12">
                <p className="m-0 max-w-[52ch] text-bone/90" style={{ fontFamily: '"Newsreader", Georgia, serif', fontSize: 21, lineHeight: 1.55 }}>{bodyTop}</p>
                <p className="mt-6 m-0 max-w-[52ch] text-bone/90" style={{ fontFamily: '"Newsreader", Georgia, serif', fontSize: 21, lineHeight: 1.55 }}>{bodyBottom}</p>
              </div>
            </div>

            <div className="lg:sticky lg:top-12 self-start">
              <CarouselGraphic />
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
