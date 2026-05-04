export function PageHero({
  kicker, title, titleAccent, lede,
}: { kicker: string; title: string; titleAccent?: string; lede?: string }) {
  return (
    <section className="bg-paper border-b border-ink/10 px-[clamp(24px,4vw,56px)] pt-20 pb-16">
      <div className="max-w-wide mx-auto">
        <div className="font-mono text-[11px] tracking-[0.22em] uppercase text-purple-700 mb-7">{kicker}</div>
        <h1
          className="m-0 max-w-[18ch] text-ink text-balance"
          style={{
            fontFamily: '"Instrument Serif", serif',
            fontSize: "clamp(56px, 8vw, 128px)",
            lineHeight: 0.95,
            letterSpacing: "-0.028em",
            fontWeight: 400,
          }}
        >
          {title}{titleAccent && <> <span className="italic text-purple-700">{titleAccent}</span></>}
        </h1>
        {lede && (
          <p className="mt-9 max-w-[60ch] text-ink-600" style={{ fontFamily: '"Newsreader", Georgia, serif', fontSize: 21, lineHeight: 1.55 }}>{lede}</p>
        )}
      </div>
    </section>
  );
}
