import { PageShell } from "@/components/PageShell";
import { PageHero } from "@/components/PageHero";
import { PortableText } from "@portabletext/react";
import { getFaqs } from "@/lib/data";

export const metadata = { title: "FAQs" };

const fallbackFaqs = [
  {
    question: "How is A+R different from a traditional agency?",
    answer: "We don't carry bench overhead. Two principals architect every engagement, then we assemble a senior, fractional roster configured for your category. Carousel — our operating system — keeps the work coherent across disciplines that normally get siloed.",
  },
  {
    question: "Do I get access to Carousel?",
    answer: "No. Carousel isn't a SaaS product — it's how we deliver. You hire A+R; Carousel is the connective tissue that lets a small senior team ship the output of a much bigger department.",
  },
  {
    question: "What size brand do you work with?",
    answer: "Most of our engagements sit between $10M and $50M ARR, but the better question is fit. We work best with operators who want a single accountable team rather than a vendor stack.",
  },
  {
    question: "How do engagements start?",
    answer: "A 30-minute conversation. No brief, no RFP. If we're not the right team, we'll say so and point you at one that is.",
  },
  {
    question: "How is pricing structured?",
    answer: "One retainer, scoped to the engagement tier. No media markups. No procurement games.",
  },
];

type FaqDoc = { _id?: string; question: string; answer?: unknown };

export default async function FaqsPage() {
  const fromCms = (await getFaqs()) as FaqDoc[];
  const list: FaqDoc[] = fromCms.length ? fromCms : fallbackFaqs.map((f, i) => ({ _id: `f${i}`, ...f }));
  return (
    <PageShell>
      <PageHero kicker="§ FAQs" title="The questions." titleAccent="And the honest answers." />
      <section className="bg-paper px-[clamp(24px,4vw,56px)] py-24">
        <div className="max-w-content mx-auto divide-y divide-ink/10 border-t-2 border-ink">
          {list.map((f, i) => (
            <details key={f._id || i} className="py-6 group">
              <summary className="cursor-pointer list-none flex justify-between items-baseline gap-6">
                <h2 className="m-0 max-w-[40ch] text-ink" style={{ fontFamily: '"Instrument Serif", serif', fontSize: "clamp(24px,2.4vw,32px)", lineHeight: 1.2, fontWeight: 400 }}>
                  {f.question}
                </h2>
                <span className="font-mono text-xs text-ink-400 group-open:rotate-45 transition-transform">+</span>
              </summary>
              <div className="prose-ar mt-5 max-w-prose text-ink-600" style={{ fontFamily: '"Newsreader", Georgia, serif', fontSize: 18, lineHeight: 1.6 }}>
                {typeof f.answer === "string" ? <p>{f.answer}</p> : f.answer ? <PortableText value={f.answer as never} /> : null}
              </div>
            </details>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
