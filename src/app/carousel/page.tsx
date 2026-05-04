import { PageShell } from "@/components/PageShell";
import { PageHero } from "@/components/PageHero";

export const metadata = { title: "Carousel" };

const capabilities: Array<[string, string, string]> = [
  ["Plan", "Strategy, briefs, calendars, and creative concepts in one workspace.", "Replaces: project tools, brief decks, calendar spreadsheets."],
  ["Brief", "Every specialist on your engagement works from the same brief, in the same language.", "Replaces: handoff docs, kickoff calls, miscommunication."],
  ["Produce", "Creative produced and reviewed in the system. AI-assisted where it helps, human-led where it matters.", "Replaces: scattered Figma files, Frame.io threads, asset libraries."],
  ["Deploy", "Push to ad platforms, social, email, web — without leaving Carousel.", "Replaces: copy-paste into ten tools."],
  ["Measure", "Brand and performance signals reconciled in one view, against the same brief.", "Replaces: dashboard zoo, monthly reporting decks."],
  ["Decide", "One document the CFO actually reads. With the receipts.", "Replaces: the quarterly slide tour."],
];

export default async function CarouselPage() {
  return (
    <PageShell>
      <PageHero
        kicker="§ Carousel · v3.4"
        title="The operating system."
        titleAccent="Built so a small team can ship like a large one."
        lede="Carousel is software A+R built and owns. You don’t buy it, you don’t log into it. You hire A+R, and Carousel is how we deliver — faster, more accountable, and without the dozen disconnected SaaS tools every other agency is duct-taping together."
      />
      <section className="bg-purple-950 text-bone px-[clamp(24px,4vw,56px)] py-24">
        <div className="max-w-wide mx-auto">
          <div className="font-mono text-[11px] tracking-[0.22em] uppercase text-purple-300 pb-3.5 border-b border-bone/20 mb-12">§ What it does</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-12 gap-x-20">
            {capabilities.map(([label, t, sub], i) => (
              <div key={i} className="border-l-2 border-purple-300 pl-6">
                <div className="font-mono text-[11px] tracking-[0.22em] uppercase text-purple-300">{`0${i + 1} · ${label}`}</div>
                <h3 className="mt-3 m-0 text-bone" style={{ fontFamily: '"Instrument Serif", serif', fontSize: 28, lineHeight: 1.1, fontWeight: 400 }}>{t}</h3>
                <p className="mt-3 max-w-[42ch] text-bone/65 italic m-0" style={{ fontFamily: '"Instrument Serif", serif', fontSize: 17, lineHeight: 1.45 }}>{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
