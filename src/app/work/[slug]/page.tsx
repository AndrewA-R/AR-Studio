import { notFound } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import { getCaseBySlug } from "@/lib/data";
import {
  CaseMasthead, CaseMetrics, CaseStrategy, CaseDiagnosis,
  CaseGallery, CaseQuote, CaseBrandSystem, CaseCTA,
} from "@/components/case-blocks";
import { fallbackCases } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

type AnyBlock = { _key?: string; _type: string; [k: string]: unknown };

type CaseDoc = {
  caseNo?: string; sector?: string; tier?: string; dates?: string;
  wordmark?: string; logo?: unknown; logoUrl?: string;
  headline?: string; italic?: string; lede?: string;
  heroImage?: unknown; heroImageUrl?: string;
  atGlance?: Array<{ k?: string; v?: string }>;
  body?: AnyBlock[];
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const c = (await getCaseBySlug(slug)) as CaseDoc | null;
  return {
    title: c?.wordmark ? `${c.wordmark} — Case study` : "Case study",
    description: c?.lede,
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const fromSanity = (await getCaseBySlug(slug)) as CaseDoc | null;

  // Until Sanity has the doc, render a slim placeholder so links never 404.
  if (!fromSanity) {
    const stub = fallbackCases.find((f) => f.slug === slug);
    if (!stub) return notFound();
    return (
      <PageShell>
        <CaseMasthead
          caseNo={stub.caseNumber}
          sector={stub.sector}
          tier={stub.tier}
          dates={stub.dates}
          wordmark={stub.client}
          headline={stub.headline}
          lede="Full case study coming soon — content for this engagement is being authored in Sanity."
          atGlance={(
            [
              ["Tier", stub.tier],
              ["Sector", stub.sector],
              ["Dates", stub.dates],
              ["Status", "Draft"],
            ] as Array<[string, string | undefined]>
          ).filter(([, v]) => Boolean(v)).map(([k, v]) => ({ k, v: v as string }))}
        />
        <CaseCTA />
      </PageShell>
    );
  }

  return (
    <PageShell>
      <CaseMasthead
        caseNo={fromSanity.caseNo}
        sector={fromSanity.sector}
        tier={fromSanity.tier}
        dates={fromSanity.dates}
        wordmark={fromSanity.wordmark}
        logo={fromSanity.logoUrl}
        headline={fromSanity.headline}
        italic={fromSanity.italic}
        lede={fromSanity.lede}
        atGlance={fromSanity.atGlance}
        image={fromSanity.heroImageUrl}
      />

      {(fromSanity.body || []).map((block, idx) => {
        // Auto-derive section number from position. Masthead is §01 implicitly,
        // first body block becomes §02, and so on.
        const n = String(idx + 2).padStart(2, "0");
        const key = block._key || `${block._type}-${idx}`;

        switch (block._type) {
          case "metricsBlock":
            return <CaseMetrics key={key} n={n} {...(block as object)} />;
          case "strategyBlock":
            return <CaseStrategy key={key} n={n} {...(block as object)} />;
          case "diagnosisBlock":
            return <CaseDiagnosis key={key} n={n} {...(block as object)} />;
          case "galleryBlock":
            return <CaseGallery key={key} n={n} {...(block as object)} />;
          case "quoteBlock":
            return <CaseQuote key={key} {...(block as object)} />;
          case "brandSystemBlock":
            return <CaseBrandSystem key={key} n={n} {...(block as object)} />;
          default:
            if (process.env.NODE_ENV !== "production") {
              console.warn("Unknown case-study block type:", block._type);
            }
            return null;
        }
      })}

      <CaseCTA />
    </PageShell>
  );
}

export async function generateStaticParams() {
  return fallbackCases.map((c) => ({ slug: c.slug }));
}
