import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { getCaseBySlug } from "@/lib/data";
import { imgSrc } from "@/lib/image";
import { fallbackCases } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const c = await getCaseBySlug(slug) as { client?: string; headline?: string } | null
    ?? fallbackCases.find(f => f.slug === slug) ?? null;
  return { title: c ? `${c.client} — Case study` : "Case study", description: c?.headline };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const fromSanity = await getCaseBySlug(slug) as
    | { client: string; caseNumber?: string; tier?: string; sector?: string; dates?: string;
        headline: string; result?: string; heroImage?: unknown; body?: unknown[] }
    | null;

  const fallback = fallbackCases.find(f => f.slug === slug);
  const c = fromSanity || fallback;
  if (!c) return notFound();

  const heroUrl = imgSrc(c.heroImage, slug === "concentric-travel" ? "/placeholders/concentric-travel.jpg" : "/placeholders/km-tools.jpg", 2400);

  return (
    <PageShell>
      <section className="bg-paper px-[clamp(24px,4vw,56px)] pt-16 pb-12">
        <div className="max-w-wide mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-[auto_1fr_auto] gap-6 items-baseline pb-3.5 border-b border-ink/10 font-mono text-[11px] tracking-[0.2em] uppercase text-ink-400">
            <span className="text-purple-700">Case · {c.caseNumber || "—"}</span>
            <span className="md:text-center">{[c.tier, c.sector].filter(Boolean).join(" · ")}</span>
            <span>{c.dates}</span>
          </div>
          <h1 className="m-0 mt-12 max-w-[22ch] text-ink text-balance" style={{ fontFamily: '"Instrument Serif", serif', fontSize: "clamp(48px,7vw,112px)", lineHeight: 0.98, letterSpacing: "-0.028em", fontWeight: 400 }}>
            {c.headline}
          </h1>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-y-6 gap-x-16 items-end pb-10 border-b border-ink/10">
            <div className="font-mono text-[11px] tracking-[0.22em] uppercase text-purple-700">{c.client}</div>
            <div className="italic text-ink" style={{ fontFamily: '"Instrument Serif", serif', fontSize: 22, lineHeight: 1.3 }}>{c.result}</div>
          </div>
        </div>
      </section>
      <div className="bg-paper px-[clamp(24px,4vw,56px)]">
        <div className="max-w-wide mx-auto">
          <div className="aspect-[21/10] bg-cover bg-center bg-purple-950" style={{ backgroundImage: `url(${heroUrl})` }} />
        </div>
      </div>
      <section className="bg-paper px-[clamp(24px,4vw,56px)] py-20">
        <div className="max-w-content mx-auto">
          <div className="prose-ar text-ink-600" style={{ fontFamily: '"Newsreader", Georgia, serif', fontSize: 19, lineHeight: 1.65 }}>
            {fromSanity?.body ? (
              <PortableText value={fromSanity.body as never} />
            ) : (
              <>
                <p>{c.headline}</p>
                <p>The full case story for <strong>{c.client}</strong> will live here once it’s loaded into Sanity. The schema is already wired — open the Studio at <Link href="/admin">/admin</Link>, find this case under "Case studies," and add the body content.</p>
                <p><strong>What we delivered:</strong> {c.result}</p>
              </>
            )}
          </div>
          <div className="mt-16">
            <Link href="/#work" className="btn-link">← All work</Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

export async function generateStaticParams() {
  return fallbackCases.map(c => ({ slug: c.slug }));
}
