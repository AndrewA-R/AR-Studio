import { imgSrc } from "@/lib/image";

type Founder = { _id: string; name: string; role: string; bio: string; headshot: unknown };

export function Founders({
  headline, headlineAccent, copy, founders,
}: { headline: string; headlineAccent: string; copy: string; founders: Founder[] }) {
  return (
    <section id="studio" className="bg-bone py-24 px-[clamp(24px,4vw,56px)]">
      <div className="max-w-wide mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-y-6 gap-x-20 mb-12">
          <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-purple-700 font-medium flex gap-2.5">
            <span className="opacity-55">§</span><span>The studio</span>
          </div>
          <h2
            className="m-0 max-w-[24ch] text-ink text-balance"
            style={{
              fontFamily: '"Instrument Serif", serif',
              fontSize: "clamp(44px, 6vw, 88px)",
              lineHeight: 1.02,
              letterSpacing: "-0.02em",
              fontWeight: 400,
            }}
          >
            {headline}<span className="italic text-purple-700 block">{headlineAccent}</span>
          </h2>
        </div>
        {/* Body copy aligned under the headline (matches the headline column of the grid above) */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-x-20 mb-14">
          <div aria-hidden className="hidden lg:block" />
          <p className="m-0 max-w-[70ch] text-ink-600" style={{ fontFamily: '"Newsreader", Georgia, serif', fontSize: 19, lineHeight: 1.6, whiteSpace: "pre-line" }}>{copy}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 border-t-2 border-ink">
          {founders.map((p, i) => (
            <div
              key={p._id}
              className={`p-6 sm:p-10 grid grid-cols-1 sm:grid-cols-[220px_1fr] gap-6 sm:gap-8 items-stretch ${i > 0 ? "lg:border-l border-ink/10 border-t lg:border-t-0" : ""}`}
            >
              <img
                src={imgSrc(p.headshot, "/placeholders/headshot.jpg", 800)}
                alt={p.name}
                className="w-full h-auto sm:h-full object-cover aspect-[3/4] sm:aspect-auto"
                style={{ filter: "grayscale(100%)" }}
              />
              <div>
                <h3 className="m-0 text-ink" style={{ fontFamily: '"Instrument Serif", serif', fontSize: "clamp(28px, 4.5vw, 36px)", lineHeight: 1.02, fontWeight: 400 }}>{p.name}</h3>
                <div className="mt-1.5 font-mono text-[11px] tracking-[0.14em] uppercase text-purple-700">{p.role}</div>
                <p className="mt-4 max-w-[38ch] text-ink-600 italic m-0" style={{ fontFamily: '"Instrument Serif", serif', fontSize: "clamp(17px, 3.6vw, 19px)", lineHeight: 1.4, whiteSpace: "pre-line" }}>{p.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
