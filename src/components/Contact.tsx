import Link from "next/link";

const pathways = [
  { tag: "For prospective clients", t: "Schedule an intro call", sub: "A 30-minute conversation about what you’re working on.", href: "/contact" },
  { tag: "For senior specialists", t: "Join the roster", sub: "Strategists, creatives, performance leads, producers.", href: "/join-our-roster" },
  { tag: "For everyone else", t: "Subscribe to the dispatch", sub: "Andrew’s monthly essay, plus what we’re reading.", href: "/thinking" },
];

export function Contact() {
  return (
    <section id="contact" className="bg-paper py-[120px] pt-[120px] pb-24 px-[clamp(24px,4vw,56px)] border-t-2 border-ink">
      <div className="max-w-wide mx-auto">
        <div className="font-mono text-[11px] tracking-[0.22em] uppercase text-purple-700 mb-7">§ Get in touch</div>
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-y-8 gap-x-20 items-end">
          <h2
            className="m-0 text-ink max-w-[14ch]"
            style={{
              fontFamily: '"Instrument Serif", serif',
              fontSize: "clamp(56px, 8vw, 128px)",
              lineHeight: 0.95,
              letterSpacing: "-0.028em",
              fontWeight: 400,
            }}
          >
            Bring the work
            <br />
            <span className="italic text-purple-700">back together.</span>
          </h2>
          <div>
            <p className="m-0 max-w-[42ch] text-ink-600" style={{ fontFamily: '"Newsreader", Georgia, serif', fontSize: 19, lineHeight: 1.55 }}>
              Most engagements start with a single conversation — what you’re trying to do, what’s in your way, whether we’re a fit. No brief. No RFP. If we’re not the right team, we’ll point you at one that is.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/contact" className="btn-primary text-sm px-[22px] py-3.5">Start a conversation →</Link>
              <a href="mailto:hello@a-r.studio" className="btn-link">hello@a-r.studio</a>
            </div>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-ink/10 grid grid-cols-1 md:grid-cols-3 gap-x-14 gap-y-8">
          {pathways.map((p) => (
            <Link key={p.t} href={p.href} className="no-underline text-inherit flex flex-col gap-2 group">
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-purple-700">{p.tag}</span>
              <span className="text-ink" style={{ fontFamily: '"Instrument Serif", serif', fontSize: 28, lineHeight: 1.1 }}>{p.t}</span>
              <span className="text-ink-600" style={{ fontFamily: '"Newsreader", Georgia, serif', fontSize: 15, lineHeight: 1.5 }}>{p.sub}</span>
              <span className="mt-1.5 self-start font-ui text-[13px] font-medium text-purple-700 border-b border-purple-700 pb-0.5">Continue →</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
