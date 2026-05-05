import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { PageShell } from "@/components/PageShell";
import { getArticleBySlug } from "@/lib/data";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const a = await getArticleBySlug(slug) as { title?: string; excerpt?: string } | null;
  return { title: a?.title || "Essay", description: a?.excerpt };
}

function Byline({ author, publishedAt }: { author?: string; publishedAt?: string }) {
  const name = (author && author.trim()) || "Andrew Cagan";
  const dateStr = publishedAt
    ? new Date(publishedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
    : "";
  return (
    <div className="mt-6 flex flex-wrap items-baseline gap-x-4 gap-y-1">
      <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-ink-400">By</span>
      <span className="text-ink" style={{ fontFamily: '"Instrument Serif", serif', fontSize: 22, fontStyle: "italic", lineHeight: 1.2 }}>
        {name}
      </span>
      {dateStr && (
        <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-ink-400">· {dateStr}</span>
      )}
    </div>
  );
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug) as {
    title: string; number?: string; tag?: string; readTime?: string;
    publishedAt?: string; author?: string; excerpt?: string; body?: unknown[];
  } | null;

  if (!article) {
    // Until Sanity is wired, render a placeholder body so links don't 404.
    return (
      <PageShell>
        <article className="bg-paper px-[clamp(24px,4vw,56px)] py-24">
          <div className="max-w-[1800px] mx-auto">
            <div className="font-mono text-[11px] tracking-[0.22em] uppercase text-purple-700 mb-6">§ Essay · placeholder</div>
            <h1 className="m-0 text-ink" style={{ fontFamily: '"Instrument Serif", serif', fontSize: "clamp(44px,6vw,88px)", lineHeight: 1.02, letterSpacing: "-0.022em", fontWeight: 400 }}>
              {slug.replace(/-/g, " ")}
            </h1>
            <Byline />
            <div className="prose-ar mt-12 max-w-prose text-ink-600" style={{ fontFamily: '"Newsreader", Georgia, serif', fontSize: 19, lineHeight: 1.65 }}>
              <p>Article content will be loaded from Sanity once the CMS is connected. Replace this slug ({slug}) with a real essay in the Studio.</p>
            </div>
          </div>
        </article>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <article className="bg-paper px-[clamp(24px,4vw,56px)] py-24">
        {/* Page width extended ~50% beyond the standard content container
            (1200 → 1800px) per request — gives long-form essays more breathing
            room. Prose itself stays narrow (max-w-prose) for readability. */}
        <div className="max-w-[1800px] mx-auto">
          <div className="font-mono text-[11px] tracking-[0.22em] uppercase text-purple-700 mb-6">
            {[`No. ${article.number}`, article.tag, article.readTime].filter(Boolean).join(" · ")}
          </div>
          <h1 className="m-0 max-w-[24ch] text-ink text-balance" style={{ fontFamily: '"Instrument Serif", serif', fontSize: "clamp(48px,7vw,112px)", lineHeight: 0.98, letterSpacing: "-0.025em", fontWeight: 400 }}>
            {article.title}
          </h1>
          <Byline author={article.author} publishedAt={article.publishedAt} />
          {article.excerpt && (
            <p className="mt-9 max-w-[60ch] italic text-ink-600" style={{ fontFamily: '"Instrument Serif", serif', fontSize: 24, lineHeight: 1.4, whiteSpace: "pre-line" }}>
              {article.excerpt}
            </p>
          )}
          <div className="prose-ar mt-12 max-w-prose text-ink-600" style={{ fontFamily: '"Newsreader", Georgia, serif', fontSize: 19, lineHeight: 1.65 }}>
            {article.body ? <PortableText value={article.body as never} /> : null}
          </div>
        </div>
      </article>
    </PageShell>
  );
}
