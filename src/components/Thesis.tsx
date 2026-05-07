type Rebuttal = { lead: string; tail: string };

// Split bodyTop into paragraphs on blank lines so the indictment can render
// as two centered paragraphs per the Variant C handoff.
function paragraphs(s: string): string[] {
  return (s ?? "")
    .replace(/\r\n/g, "\n")
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}

export function Thesis({
  heading, headingAccent, bodyTop, pivot, rebuttals,
}: {
  heading: string;
  headingAccent: string;
  bodyTop: string;
  pivot?: string;
  rebuttals?: Rebuttal[];
}) {
  const paras = paragraphs(bodyTop);
  const list = (rebuttals ?? []).filter((r) => r?.lead || r?.tail);

  return (
    <section
      className="bg-ink text-bone text-center"
      style={{ padding: "104px clamp(24px,4vw,56px) 112px" }}
    >
      <div className="mx-auto text-center" style={{ maxWidth: 920 }}>
        {/* Kicker */}
        <div
          className="font-mono uppercase text-purple-300"
          style={{ fontSize: 11, letterSpacing: "0.22em", marginBottom: 36 }}
        >
          § Why A+R exists
        </div>

        {/* Headline — two stacked lines */}
        <h2
          className="m-0 text-bone"
          style={{
            fontFamily: '"Instrument Serif", serif',
            fontWeight: 400,
            fontSize: "clamp(48px, 6.4vw, 96px)",
            lineHeight: 0.96,
            letterSpacing: "-0.026em",
          }}
        >
          <div className="lg:whitespace-nowrap">{heading}</div>
          <div className="italic text-purple-300 lg:whitespace-nowrap">{headingAccent}</div>
        </h2>

        {/* Indictment */}
        {paras.length > 0 && (
          <div
            style={{
              marginTop: 64,
              fontFamily: '"Newsreader", Georgia, serif',
              fontSize: 20,
              lineHeight: 1.5,
              color: "rgba(253,252,248,0.82)",
            }}
          >
            {paras.map((p, i) => (
              <p key={i} className="mx-auto" style={{ maxWidth: 640, margin: i === 0 ? "0 auto" : "14px auto 0" }}>
                {p}
              </p>
            ))}
          </div>
        )}

        {/* Pivot */}
        {pivot && (
          <div style={{ marginTop: 56, marginBottom: 40, paddingTop: 32, borderTop: "1px solid #B3A6DC" }}>
            <div
              className="italic text-purple-300 lg:whitespace-nowrap"
              style={{
                fontFamily: '"Instrument Serif", serif',
                fontSize: "clamp(22px, 2.6vw, 34px)",
                lineHeight: 1.12,
                letterSpacing: "-0.018em",
              }}
            >
              {pivot}
            </div>
          </div>
        )}

        {/* Rebuttal */}
        {list.length > 0 && (
          <div>
            {list.map((r, i) => (
              <div
                key={i}
                style={{
                  padding: "22px 0",
                  borderTop: "1px solid rgba(253,252,248,0.12)",
                }}
              >
                {r.lead && (
                  <div
                    className="text-bone"
                    style={{
                      fontFamily: '"Instrument Serif", serif',
                      fontSize: "clamp(22px, 2.4vw, 30px)",
                      lineHeight: 1.18,
                      letterSpacing: "-0.014em",
                      marginBottom: 6,
                    }}
                  >
                    {r.lead}
                  </div>
                )}
                {r.tail && (
                  <div
                    style={{
                      fontFamily: '"Newsreader", Georgia, serif',
                      fontSize: 17,
                      lineHeight: 1.5,
                      color: "rgba(253,252,248,0.72)",
                    }}
                  >
                    {r.tail}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
