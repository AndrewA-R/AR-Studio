import { notFound } from "next/navigation";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { PageShell } from "@/components/PageShell";
import { getArticleBySlug } from "@/lib/data";

const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }: { value: { url?: string; alt?: string } }) =>
      value?.url ? (
        <figure className="my-10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value.url} alt={value.alt || ""} className="block w-full h-auto" />
          {value.alt && (
            <figcaption className="mt-3 font-mono text-[10px] tracking-[0.18em] uppercase text-ink-400">
              {value.alt}
            </figcaption>
          )}
        </figure>
      ) : null,
  },
  block: {
    h1: ({ children }) => (
      <h1 className="mt-14 mb-5 text-ink" style={{ fontFamily: '"Instrument Serif", serif', fontSize: 56, lineHeight: 1.05, letterSpacing: "-0.02em", fontWeight: 400 }}>{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="mt-12 mb-4 text-ink" style={{ fontFamily: '"Instrument Serif", serif', fontSize: 42, lineHeight: 1.1, letterSpacing: "-0.018em", fontWeight: 400 }}>{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-10 mb-3 text-ink" style={{ fontFamily: '"Instrument Serif", serif', fontSize: 30, lineHeight: 1.2, letterSpacing: "-0.014em", fontWeight: 400 }}>{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="mt-8 mb-2 text-ink font-mono text-[11px] tracking-[0.22em] uppercase" style={{ color: "var(--accent)" }}>{children}</h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-8 pl-6 border-l-2 border-purple-700 italic text-ink" style={{ fontFamily: '"Instrument Serif", serif', fontSize: 26, lineHeight: 1.35 }}>{children}</blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="my-5 list-disc pl-6 space-y-2">{children}</ul>,
    number: ({ children }) => <ol className="my-5 list-decimal pl-6 space-y-2">{children}</ol>,
  },
};

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
        <article className="wrap py-24">
          <div className="font-mono text-[11px] tracking-[0.22em] uppercase text-purple-700 mb-6">§ Essay · placeholder</div>
          <h1 className="m-0 text-ink" style={{ fontFamily: '"Instrument Serif", serif', fontSize: "clamp(44px,6vw,88px)", lineHeight: 1.02, letterSpacing: "-0.022em", fontWeight: 400 }}>
            {slug.replace(/-/g, " ")}
          </h1>
          <Byline />
          <div className="prose-ar mt-12 text-ink-600" style={{ fontFamily: '"Newsreader", Georgia, serif', fontSize: 19, lineHeight: 1.65 }}>
            <p>Article content will be loaded from Sanity once the CMS is connected. Replace this slug ({slug}) with a real essay in the Studio.</p>
          </div>
        </article>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <article className="wrap py-24">
        <div className="font-mono text-[11px] tracking-[0.22em] uppercase text-purple-700 mb-6">
          {[`No. ${article.number}`, article.tag, article.readTime].filter(Boolean).join(" · ")}
        </div>
        <h1 className="m-0 max-w-[24ch] text-ink text-balance" style={{ fontFamily: '"Instrument Serif", serif', fontSize: "clamp(48px,7vw,112px)", lineHeight: 0.98, letterSpacing: "-0.025em", fontWeight: 400 }}>
          {article.title}
        </h1>
        <Byline author={article.author} publishedAt={article.publishedAt} />
        <div className="prose-ar mt-12 text-ink-600" style={{ fontFamily: '"Newsreader", Georgia, serif', fontSize: 19, lineHeight: 1.65, maxWidth: 1100 }}>
          {article.body ? <PortableText value={article.body as never} components={portableTextComponents} /> : null}
        </div>
      </article>
    </PageShell>
  );
}
