// Split bodyTop on the LAST blank line so the closing line ("A+R was built
// as a counter-argument...") can be set bolder and larger as the pivot
// between the diagnosis and the answer. Falls back gracefully to a single
// block if no blank line is present.
function splitPivot(s: string): { prefix: string; pivot: string } {
  const t = (s ?? "").replace(/\r\n/g, "\n");
  const i = t.lastIndexOf("\n\n");
  if (i === -1) return { prefix: "", pivot: t };
  return { prefix: t.slice(0, i).trimEnd(), pivot: t.slice(i + 2).trim() };
}

export function Thesis({
  heading, headingAccent, bodyTop, bodyBottom,
}: { heading: string; headingAccent: string; bodyTop: string; bodyBottom: string }) {
  const { prefix, pivot } = splitPivot(bodyTop);
  const smallSize = "clamp(20px, 1.6vw, 24px)";
  const largeSize = "clamp(22px, 1.85vw, 26px)";
  return (
    <section className="bg-ink text-bone py-[clamp(96px,12vh,160px)] px-[clamp(24px,4vw,56px)]">
      <div className="max-w-wide mx-auto">
        <div className="font-mono text-[11px] tracking-[0.22em] uppercase text-purple-300 mb-12">§ Why A+R exists</div>

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

        {/* Body extends to the container midpoint (~720px in a 1440px wrap). */}
        <div className="mt-[clamp(72px,10vh,128px)] max-w-[720px]">
          {prefix && (
            <p
              className="m-0 text-bone/85"
              style={{ fontFamily: '"Newsreader", Georgia, serif', fontSize: smallSize, lineHeight: 1.55, whiteSpace: "pre-line" }}
            >
              {prefix}
            </p>
          )}
          {pivot && (
            <p
              className={prefix ? "mt-7 m-0 text-bone" : "m-0 text-bone"}
              style={{ fontFamily: '"Newsreader", Georgia, serif', fontSize: largeSize, lineHeight: 1.5, fontWeight: 600, whiteSpace: "pre-line" }}
            >
              {pivot}
            </p>
          )}
          <p
            className="mt-7 m-0 text-bone"
            style={{ fontFamily: '"Newsreader", Georgia, serif', fontSize: largeSize, lineHeight: 1.55, whiteSpace: "pre-line" }}
          >
            {bodyBottom}
          </p>
        </div>
      </div>
    </section>
  );
}
