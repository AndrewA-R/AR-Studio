export function PageHero({
  kicker, title, titleAccent, lede,
}: { kicker: string; title: string; titleAccent?: string; lede?: string }) {
  return (
    <section className="bg-paper border-b border-ink/10 px-6 md:px-[clamp(24px,4vw,56px)] pt-12 md:pt-20 pb-12 md:pb-16">
      <div className="max-w-wide mx-auto">
        <div className="font-mono text-[11px] tracking-[0.22em] uppercase text-purple-700 mb-5 md:mb-7">{kicker}</div>
        <h1
          className="m-0 max-w-[18ch] text-ink text-balance"
          style={{
            fontFamily: '"Instrument Serif", serif',
            fontSize: "clamp(44px, 11vw, 128px)",
            lineHeight: 0.95,
            letterSpacing: "-0.028em",
            fontWeight: 400,
          }}
        >
          {title}{titleAccent && <> <span className="italic text-purple-700">{titleAccent}</span></>}
        </h1>
        {lede && (
          <p className="mt-6 md:mt-9 max-w-[60ch] text-ink-600 text-[17px] md:text-[21px]" style={{ fontFamily: '"Newsreader", Georgia, serif', lineHeight: 1.55 }}>{lede}</p>
        )}
      </div>
    </section>
  );
}
