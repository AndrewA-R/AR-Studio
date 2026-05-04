import Link from "next/link";

export function Hero({ lede, ledeAccent, body }: { lede: string; ledeAccent: string; body: string }) {
  return (
    <section className="bg-paper">
      <div className="wrap pt-12 pb-10">
        <div className="grid grid-cols-[1fr_2px_1fr] items-stretch" style={{ minHeight: "clamp(360px, 48vh, 560px)" }}>
          <div className="flex flex-col justify-end items-end pr-12 text-right">
            <h1
              className="m-0 text-ink"
              style={{
                fontFamily: '"Instrument Serif", serif',
                fontSize: "clamp(88px, 13vw, 200px)",
                lineHeight: 0.88,
                letterSpacing: "-0.035em",
              }}
            >
              Work.
            </h1>
          </div>
          <div className="w-[2px] bg-ink h-full" aria-hidden />
          <div className="flex flex-col justify-end pl-12">
            <h1
              className="m-0 text-purple-700 italic"
              style={{
                fontFamily: '"Instrument Serif", serif',
                fontSize: "clamp(88px, 13vw, 200px)",
                lineHeight: 0.88,
                letterSpacing: "-0.035em",
              }}
            >
              Together.
            </h1>
          </div>
        </div>

        <div className="mt-8 pt-7 border-t border-ink/10 grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-y-7 gap-x-14 items-start">
          <p
            className="m-0 max-w-[20ch] text-ink italic"
            style={{
              fontFamily: '"Instrument Serif", serif',
              fontSize: "clamp(30px, 3.4vw, 46px)",
              lineHeight: 1.08,
              letterSpacing: "-0.015em",
            }}
          >
            {lede}{" "}
            <span className="not-italic text-purple-700" style={{ fontFamily: '"Instrument Serif", serif', fontStyle: "normal" }}>
              {ledeAccent}
            </span>
          </p>
          <div>
            <p className="m-0 max-w-[44ch] text-ink-600" style={{ fontSize: 17, lineHeight: 1.55 }}>{body}</p>
            <div className="mt-6 flex flex-wrap gap-4">
              <Link href="/#work" className="btn-primary">See the work ↓</Link>
              <Link href="/services" className="btn-link">How we work</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
