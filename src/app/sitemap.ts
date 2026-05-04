import type { MetadataRoute } from "next";
import { getAllCases, getArticleArchive } from "@/lib/data";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://www.a-r.studio";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [cases, articles] = await Promise.all([getAllCases(), getArticleArchive()]);
  const now = new Date();
  const staticRoutes = ["", "/services", "/carousel", "/thinking", "/contact", "/faqs", "/join-our-roster"];
  return [
    ...staticRoutes.map(p => ({ url: `${SITE}${p}`, lastModified: now })),
    ...cases.map((c) => ({ url: `${SITE}/work/${c.slug}`, lastModified: now })),
    ...articles.map((a) => ({ url: `${SITE}/thinking/${a.slug}`, lastModified: a.publishedAt ? new Date(a.publishedAt) : now })),
  ];
}
