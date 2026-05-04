import { imgSrc } from "@/lib/image";

type Logo = { _id: string; name: string; logo: unknown | null };

export function Roster({
  headline, headlineAccent, copy, logos,
}: { headline: string; headlineAccent: string; copy: string; logos: Logo[] }) {
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
              {headline}<span className="italic text-purple-300">{headlineAccent}</span>
            </h2>
            <p className="mt-5 max-w-[60ch] m-0 text-bone/70" style={{ fontFamily: '"Newsreader", Georgia, serif', fontSize: 17 }}>{copy}</p>
          </div>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-8 border-t border-l border-bone/15">
          {logos.map((l) => {
            const url = l.logo ? imgSrc(l.logo, "", 240) : "";
            return (
              <div key={l._id} className="border-r border-b border-bone/15 aspect-[3/2] flex items-center justify-center px-5 py-4">
                {url ? (
                  <img src={url} alt={l.name} className="max-h-6 max-w-[80%] object-contain" style={{ filter: "brightness(0) invert(1) opacity(0.7)" }} />
                ) : (
                  <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-bone/55 text-center">{l.name}</span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
