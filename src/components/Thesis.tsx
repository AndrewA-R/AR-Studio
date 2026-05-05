type Fracture = { label: string; rest: string };

export function Thesis({
  heading, headingAccent, fractures, bodyTop, bodyBottom,
}: { heading: string; headingAccent: string; fractures: Fracture[]; bodyTop: string; bodyBottom: string }) {
  return (
    <section className="bg-ink text-bone py-[120px] px-[clamp(24px,4vw,56px)]">
      <div className="max-w-wide mx-auto">
        <div className="font-mono text-[11px] tracking-[0.22em] uppercase text-purple-300 mb-8">§ Why A+R exists</div>
        <h2
          className="m-0 max-w-[22ch] text-bone text-balance"
          style={{
            fontFamily: '"Instrument Serif", serif',
            fontSize: "clamp(48px, 6vw, 96px)",
            lineHeight: 1.0,
            letterSpacing: "-0.025em",
            fontWeight: 400,
          }}
        >
          {heading} <span className="italic text-purple-300">{headingAccent}</span>
        </h2>
        <div className="mt-[72px] grid grid-cols-1 lg:grid-cols-2 gap-y-12 gap-x-20 items-start">
          <div>
            <p className="m-0 max-w-[46ch] text-bone/80" style={{ fontFamily: '"Newsreader", Georgia, serif', fontSize: 19, lineHeight: 1.6 }}>{bodyTop}</p>
            <p className="mt-5 m-0 max-w-[46ch] text-bone/80" style={{ fontFamily: '"Newsreader", Georgia, serif', fontSize: 19, lineHeight: 1.6 }}>{bodyBottom}</p>
          </div>
          <div className="border-t border-bone/20">
            {fractures.map((f, i) => (
              <div key={i} className="grid grid-cols-[40px_1fr] gap-4 py-4 border-b border-bone/10 items-baseline">
                <span className="font-mono text-[11px] tracking-[0.18em] text-purple-300">§{String(i + 1).padStart(2, "0")}</span>
                <span style={{ fontFamily: '"Newsreader", Georgia, serif', fontSize: 17, lineHeight: 1.45 }} className="text-bone">
                  <strong className="font-semibold">{f.label}</strong>
                  <span className="text-bone/70"> — {f.rest}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
