import { PageShell } from "@/components/PageShell";
import { Thinking } from "@/components/Thinking";
import { getArticleArchive, getHomepage } from "@/lib/data";

type ForthcomingShape = { number?: string; title: string; tag?: string; readTime?: string; slug?: string };

export const metadata = { title: "Thinking" };

export default async function ThinkingIndex() {
  const [archive, homepage] = await Promise.all([getArticleArchive(), getHomepage()]);
  const forthcoming = (homepage as { forthcomingArticle?: ForthcomingShape | null }).forthcomingArticle ?? null;
  return (
    <PageShell>
      <Thinking archive={archive} forthcoming={forthcoming} showAllEssaysLink={false} />
    </PageShell>
  );
}
