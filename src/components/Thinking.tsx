import Link from "next/link";

type Article = { _id: string; slug: string; number?: string; title: string; tag?: string; readTime?: string; publishedAt?: string };
type Forthcoming = { number?: string; title: string; tag?: string; readTime?: string; slug?: string } | null | undefined;

function formatDate(d?: string) {
  if (!d) return "";
  const date = new Date(d);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

export function Thinking({
  archive, forthcoming, showAllEssaysLink = true,
}: { archive: Article[]; forthcoming: Forthcoming; showAllEssaysLink?: boolean }) {
  return (
    <section id="thinking" className="bg-paper py-[88px] px-[clamp(24px,4vw,56px)]">
      <div className="max-w-wide mx-auto">
        <div className="flex flex-wrap justify-between items-baseline gap-8 mb-10">
          <div>
            <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-purple-700 font-medium flex gap-2.5">
              <span className="opacity-55">§</span><span>Thinking</span>
            </div>
            <h2
              className="m-0 mt-3 max-w-[22ch] text-ink text-balance"
              style={{
                fontFamily: '"Instrument Serif", serif',
                fontSize: "clamp(44px, 6vw, 88px)",
                lineHeight: 1.02,
                letterSpacing: "-0.02em",
                fontWeight: 400,
              }}
            >
              Essays from A+R. <span className="italic text-purple-700">Published when we have something to say.</span>
            </h2>
          </div>
          {showAllEssaysLink && (
            <Link href="/thinking" className="font-ui text-sm text-ink border-b border-ink no-underline whitespace-nowrap">All essays →</Link>
          )}
        </div>

        {forthcoming?.title && (
          <div className="bg-purple-950 text-bone px-7 sm:px-10 lg:px-14 py-9 border-t-2 border-ink grid grid-cols-1 md:grid-cols-[180px_1fr_auto] gap-y-4 gap-x-10 items-center">
            <div>
              <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-purple-300">Forthcoming</div>
              <div className="mt-1.5 italic text-bone" style={{ fontFamily: '"Instrument Serif", serif', fontSize: 36 }}>No. {forthcoming.number || "—"}</div>
            </div>
            <div>
              <div className="text-bone max-w-[24ch]" style={{ fontFamily: '"Instrument Serif", serif', fontSize: "clamp(28px,3.4vw,44px)", lineHeight: 1.05 }}>{forthcoming.title}</div>
              <div className="mt-2.5 font-mono text-[11px] tracking-[0.16em] uppercase text-bone/65">
                {[forthcoming.tag, forthcoming.readTime].filter(Boolean).join(" · ")}
              </div>
            </div>
            <Link href="/thinking" className="font-ui text-[13px] font-medium text-bone border-b border-purple-300 pb-1 no-underline">Notify me →</Link>
          </div>
        )}

        <div className="mt-10 pb-3.5 border-b border-ink/10 font-mono text-[10px] tracking-[0.22em] uppercase text-ink-400">The archive</div>
        <div>
          {archive.map((a) => (
            <Link
              key={a._id}
              href={`/thinking/${a.slug}`}
              className="grid grid-cols-1 md:grid-cols-[80px_1fr_140px_80px_80px] gap-x-8 gap-y-1 py-7 border-b border-ink/10 no-underline text-inherit items-baseline group"
            >
              <div className="font-mono text-xs text-ink-400 tracking-[0.14em] flex items-baseline gap-3">
                <span>No. {a.number || "—"}</span>
                {a.readTime && <span className="md:hidden">· {a.readTime}</span>}
              </div>
              <h3
                className="m-0 text-ink group-hover:text-purple-700 transition-colors"
                style={{ fontFamily: '"Instrument Serif", serif', fontSize: "clamp(22px, 5vw, 32px)", lineHeight: 1.15, letterSpacing: "-0.018em", fontWeight: 400 }}
              >
                {a.title}
              </h3>
              <div className="hidden md:block font-mono text-[11px] tracking-[0.14em] uppercase text-ink-400">{a.tag}</div>
              <div className="hidden md:block font-mono text-[11px] tracking-[0.12em] text-ink-400">{a.readTime}</div>
              <div className="hidden md:block font-mono text-[11px] tracking-[0.12em] text-ink-400 text-right">{formatDate(a.publishedAt)}</div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
