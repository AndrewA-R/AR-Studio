type Fracture = { label: string; rest: string };

export function Thesis({
  heading, headingAccent, fractures,
}: { heading: string; headingAccent: string; fractures: Fracture[] }) {
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
            <p className="m-0 max-w-[46ch] text-bone/80" style={{ fontFamily: '"Newsreader", Georgia, serif', fontSize: 19, lineHeight: 1.6 }}>
              That’s the entire thesis of the business. Not a service we offer, not a vertical, not a deck slide — the perspective we bring to every engagement. The commission can be narrow. The thinking never is.
            </p>
            <p className="mt-5 m-0 max-w-[46ch] text-bone/80" style={{ fontFamily: '"Newsreader", Georgia, serif', fontSize: 19, lineHeight: 1.6 }}>
              Closing those gaps requires three things at once: a way of working that doesn’t segment talent by lane, an operating system that lets the work compound across disciplines, and a business model that doesn’t profit from the fractures staying open. We built the studio around all three.
            </p>
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
