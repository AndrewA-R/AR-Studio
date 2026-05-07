import { PageShell } from "@/components/PageShell";

export const metadata = { title: "Services" };

const PURPLE_INK = "#14122B"; // not in the tailwind palette; design token --ar-purple-ink
type Coverage = "leadership" | "team" | "plan" | null;

const layers: Array<{ name: string; sub: string; cells: [Coverage, Coverage, Coverage] }> = [
  { name: "Strategic plan",       sub: "Brand platform, GTM, full-funnel, channel",       cells: ["plan", "plan", "plan"] },
  { name: "Operating system",     sub: "Carousel + InkBlot · brief once, run everywhere", cells: [null, "team", "team"] },
  { name: "Campaign execution",   sub: "Creative, media, production, optimization",       cells: [null, "team", "team"] },
  { name: "Marketing leadership", sub: "Fractional CMO, strategy ownership, ops",         cells: [null, null, "leadership"] },
  { name: "Board accountability", sub: "Reporting outcomes to the board",                 cells: [null, null, "leadership"] },
];

const tiers = [
  { n: "I",   name: "Planning",   sub: "Strategy and Advisorship" },
  { n: "II",  name: "Campaigns",  sub: "Planning + Marketing Execution" },
  { n: "III", name: "Ownership",  sub: "Campaigns + Departmental Leadership" },
];

export default function ServicesPage() {
  return (
    <PageShell>
      <main style={{ background: "#FDFCF8" }} className="text-ink px-[clamp(24px,4vw,56px)] pt-14 pb-16 min-h-[1280px]">
        <div className="max-w-[1320px] mx-auto">
          {/* Top meta bar */}
          <div className="flex justify-between pb-3.5 border-b border-ink/15 font-mono text-[11px] tracking-[0.22em] uppercase text-ink-400">
            <span>§ Services</span>
            <span className="hidden md:inline">Option C · Org-chart coverage</span>
            <span>Three depths · One engagement</span>
          </div>

          {/* Hero */}
          <div className="mt-[72px] grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-end pb-12 border-b border-ink/15">
            <h1
              className="m-0 text-ink max-w-[14ch]"
              style={{
                fontFamily: '"Instrument Serif", serif',
                fontWeight: 400,
                fontSize: "clamp(56px, 7vw, 108px)",
                lineHeight: 0.94,
                letterSpacing: "-0.026em",
              }}
            >
              Work with A+R Studio{" "}
              <span style={{ fontStyle: "italic" }} className="text-purple-700">at one of three tiers.</span>
            </h1>
            <p
              className="m-0 max-w-[46ch] text-ink-600"
              style={{ fontFamily: '"Newsreader", Georgia, serif', fontSize: 18, lineHeight: 1.6 }}
            >
              Every org is built differently. Whether you need some help setting the right strategy for yours, executing and analyzing campaigns on your behalf, or taking ownership of the whole thing, we have a service tier that works.
            </p>
          </div>

          {/* Diagram */}
          <div
            className="mt-[72px] grid"
            style={{ gridTemplateColumns: "160px 1fr 1fr 1fr", columnGap: 24 }}
          >
            {/* Header row: empty label cell + 3 tier columns */}
            <div />
            {tiers.map((t) => (
              <TierHeader key={t.n} {...t} />
            ))}

            {/* Layer rows */}
            {layers.map((layer, idx) => (
              <LayerRow key={layer.name} {...layer} isLast={idx === layers.length - 1} />
            ))}
          </div>

          {/* Legend + rule statements */}
          <div
            className="mt-14 pt-6 border-t-2 border-ink grid gap-6 items-baseline grid-cols-1 lg:[grid-template-columns:1.4fr_1fr_1fr_1fr]"
          >
            <div>
              <div className="font-mono text-[11px] tracking-[0.22em] uppercase text-purple-700 mb-3">§ Legend</div>
              <LegendItem swatch={PURPLE_INK} label="Covered by A+R leadership" />
              <LegendItem swatch="#3D2B82" label="Covered by A+R team" />
              <LegendItem swatch="#B3A6DC" label="Covered by A+R planning" />
            </div>
            <RuleStatement n="I">
              You bring leadership and a marketing team.<br />We bring the plan.
            </RuleStatement>
            <RuleStatement n="II">
              You bring leadership.<br />We bring the plan and the team to execute it.
            </RuleStatement>
            <RuleStatement n="III">
              We bring the plan, the team, and leadership of your marketing org.
            </RuleStatement>
          </div>
        </div>
      </main>
    </PageShell>
  );
}

function TierHeader({ n, name, sub }: { n: string; name: string; sub: string }) {
  return (
    <div className="pb-4 border-b-2 border-ink">
      <div className="font-mono text-[11px] tracking-[0.22em] uppercase text-purple-700">Tier {n}</div>
      <div
        className="mt-1.5 text-ink"
        style={{ fontFamily: '"Instrument Serif", serif', fontSize: 30, lineHeight: 1, letterSpacing: "-0.02em" }}
      >
        {name}
      </div>
      <div
        className="mt-1.5 text-ink-600"
        style={{ fontFamily: '"Instrument Serif", serif', fontStyle: "italic", fontSize: 14 }}
      >
        {sub}
      </div>
    </div>
  );
}

function LayerRow({
  name, sub, cells, isLast,
}: { name: string; sub: string; cells: [Coverage, Coverage, Coverage]; isLast: boolean }) {
  const rule = isLast ? "" : "border-b border-ink/10";
  return (
    <>
      <div className={`py-5 self-stretch ${rule}`}>
        <div
          className="text-ink"
          style={{ fontFamily: '"Instrument Serif", serif', fontSize: 18, lineHeight: 1.15, letterSpacing: "-0.012em" }}
        >
          {name}
        </div>
        <div className="mt-1 font-mono text-[10px] tracking-[0.16em] uppercase text-ink-400">{sub}</div>
      </div>
      {cells.map((c, i) => <CoverageCell key={i} kind={c} isLast={isLast} />)}
    </>
  );
}

function CoverageCell({ kind, isLast }: { kind: Coverage; isLast: boolean }) {
  const map = {
    leadership: { bg: PURPLE_INK,  fg: "#FDFCF8", label: "A+R leadership" },
    team:       { bg: "#3D2B82",   fg: "#FDFCF8", label: "A+R team" },
    plan:       { bg: "#B3A6DC",   fg: "#111010", label: "A+R planning" },
  } as const;
  const c = kind ? map[kind] : null;
  const rule = isLast ? "" : "border-b border-ink/10";
  return (
    <div className={`py-2 flex items-stretch ${rule}`}>
      <div
        className="flex-1 flex items-center px-3.5 py-3 font-mono text-[10px] tracking-[0.18em] uppercase"
        style={{
          background: c ? c.bg : "rgba(17,16,16,0.03)",
          color: c ? c.fg : "#6E6B78",
        }}
      >
        {c ? c.label : "—"}
      </div>
    </div>
  );
}

function LegendItem({ swatch, label }: { swatch: string; label: string }) {
  return (
    <div className="flex items-center gap-3 mb-2 font-mono text-[11px] tracking-[0.16em] uppercase text-ink-600">
      <span className="block" style={{ width: 22, height: 14, background: swatch }} />
      <span>{label}</span>
    </div>
  );
}

function RuleStatement({ n, children }: { n: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="font-mono text-[11px] tracking-[0.22em] uppercase text-purple-700 mb-2.5">Hire us for {n}</div>
      <p
        className="m-0 max-w-[24ch] text-ink"
        style={{ fontFamily: '"Instrument Serif", serif', fontStyle: "italic", fontSize: 19, lineHeight: 1.3 }}
      >
        {children}
      </p>
    </div>
  );
}
