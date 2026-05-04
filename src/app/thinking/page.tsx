import { PageShell } from "@/components/PageShell";
import { PageHero } from "@/components/PageHero";
import { Thinking } from "@/components/Thinking";
import { getArticleArchive, getHomepage } from "@/lib/data";
import { fallbackForthcoming } from "@/lib/site";

export const metadata = { title: "Thinking" };

export default async function ThinkingIndex() {
  const [archive, homepage] = await Promise.all([getArticleArchive(), getHomepage()]);
  const forthcoming = (homepage as { forthcomingArticle?: typeof fallbackForthcoming }).forthcomingArticle ?? fallbackForthcoming;
  return (
    <PageShell>
      <PageHero
        kicker="§ Thinking"
        title="Essays from Andrew."
        titleAccent="Published when we have something to say."
        lede="A handful of pieces a year. Manifestos, diagnoses, arguments — the kind of thinking that informs every engagement we take. No SEO content. No thought-leadership filler."
      />
      <Thinking archive={archive} forthcoming={forthcoming} />
    </PageShell>
  );
}
