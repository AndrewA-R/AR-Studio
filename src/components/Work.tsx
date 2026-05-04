import { CaseTile, type CaseTileProps } from "./CaseTile";

export function Work({ cases }: { cases: CaseTileProps[] }) {
  return (
    <section id="work" className="bg-paper px-[clamp(24px,4vw,56px)] pt-12 pb-20">
      <div className="max-w-wide mx-auto">
        <div className="flex justify-between items-baseline pb-4 border-b-2 border-ink font-mono text-[11px] tracking-[0.22em] uppercase text-ink-400">
          <span>§ The work</span>
          <span className="display-italic" style={{ fontSize: 18, letterSpacing: "normal", textTransform: "none" }}>Two engagements, in their own words.</span>
        </div>
        <div className="grid gap-16 mt-10">
          {cases.map((c) => <CaseTile key={c.slug} {...c} />)}
        </div>
      </div>
    </section>
  );
}
