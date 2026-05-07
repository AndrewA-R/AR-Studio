export function Thesis({
  heading, headingAccent, bodyTop, bodyBottom,
}: { heading: string; headingAccent: string; bodyTop: string; bodyBottom: string }) {
  return (
    <section className="bg-ink text-bone py-[clamp(96px,12vh,160px)] px-[clamp(24px,4vw,56px)]">
      <div className="max-w-wide mx-auto">
        <div className="font-mono text-[11px] tracking-[0.22em] uppercase text-purple-300 mb-12">§ Why A+R exists</div>

        {/* Manifesto headline. Heading and accent stack on their own lines —
            the accent isn't a clause, it's the punchline. */}
        <h2
          className="m-0 text-bone text-balance max-w-[16ch]"
          style={{
            fontFamily: '"Instrument Serif", serif',
            fontSize: "clamp(64px, 10vw, 168px)",
            lineHeight: 0.95,
            letterSpacing: "-0.028em",
            fontWeight: 400,
            whiteSpace: "pre-line",
          }}
        >
          {heading}
          <br />
          <span className="italic text-purple-300">{headingAccent}</span>
        </h2>

        {/* Single column body. Wider max (60ch) and bigger type so the
            argument carries the section. Both fields render with
            whiteSpace pre-line so Sanity returns become breaks. */}
        <div className="mt-[clamp(72px,10vh,128px)] max-w-[60ch]">
          <p
            className="m-0 text-bone/85"
            style={{ fontFamily: '"Newsreader", Georgia, serif', fontSize: "clamp(20px, 1.6vw, 24px)", lineHeight: 1.55, whiteSpace: "pre-line" }}
          >
            {bodyTop}
          </p>
          <p
            className="mt-8 m-0 text-bone"
            style={{ fontFamily: '"Newsreader", Georgia, serif', fontSize: "clamp(20px, 1.6vw, 24px)", lineHeight: 1.55, whiteSpace: "pre-line" }}
          >
            {bodyBottom}
          </p>
        </div>
      </div>
    </section>
  );
}
