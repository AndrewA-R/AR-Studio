import { PageShell } from "@/components/PageShell";
import { PageHero } from "@/components/PageHero";
import { getServices } from "@/lib/data";

const fallbackServices = [
  {
    tier: "Planning",
    title: "Diagnostic + roadmap",
    summary: "Two to six weeks. We audit the marketing operation end-to-end — brand, performance, content, ops — and hand back a tight roadmap. No retainer required.",
  },
  {
    tier: "Campaigns",
    title: "Tightly scoped engagements",
    summary: "Three to six months. A single defined outcome — a launch, a quarter of paid media, a creative refresh — staffed with the right roster specialists and run on Carousel.",
  },
  {
    tier: "Ownership",
    title: "Full integrated marketing",
    summary: "Twelve months and up. We own the marketing function. One retainer covers strategy, creative, media, analytics, and ops — Carousel is the connective tissue.",
  },
];

export const metadata = { title: "Services" };

export default async function ServicesPage() {
  const services = await getServices() as typeof fallbackServices;
  const list = services.length ? services : fallbackServices;
  return (
    <PageShell>
      <PageHero
        kicker="§ Services"
        title="Three tiers."
        titleAccent="Same operating system underneath."
        lede="A+R is structured to meet brands wherever they are: a one-time diagnostic, a tightly scoped engagement, or full ownership of the marketing function. Every tier runs on Carousel and pulls from the same senior roster."
      />
      <section className="bg-paper px-[clamp(24px,4vw,56px)] py-24">
        <div className="max-w-wide mx-auto grid gap-16">
          {list.map((s, i) => (
            <article key={i} className="grid grid-cols-1 lg:grid-cols-[180px_1fr] gap-y-6 gap-x-16 pb-16 border-b border-ink/10 last:border-b-0">
              <div className="font-mono text-[11px] tracking-[0.22em] uppercase text-purple-700">{`Tier · 0${i + 1}`}<br /><span className="text-ink-400">{s.tier}</span></div>
              <div>
                <h2
                  className="m-0 text-ink"
                  style={{ fontFamily: '"Instrument Serif", serif', fontSize: "clamp(36px,4.4vw,64px)", lineHeight: 1.0, letterSpacing: "-0.022em", fontWeight: 400 }}
                >
                  {s.title}
                </h2>
                <p className="mt-5 max-w-[60ch] text-ink-600" style={{ fontFamily: '"Newsreader", Georgia, serif', fontSize: 19, lineHeight: 1.6 }}>{s.summary}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
