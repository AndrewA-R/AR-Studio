/**
 * SEO helpers — assemble Next.js `Metadata` objects from Sanity content
 * with a consistent fallback chain so that LinkedIn / Twitter / Slack
 * link previews always have *something* to show.
 *
 * Hierarchy: per-page override → siteSettings default → hardcoded literal.
 */
import type { Metadata } from "next";
import { getSettings } from "./data";

const HARDCODED_TITLE = "A+R Studio — Work. Together.";
const HARDCODED_DESC =
  "An integrated marketing studio built around Carousel — our AI-driven operating system — and a roster of senior specialists. One retainer. No media markups.";

type SettingsShape = {
  title?: string;
  seoTitle?: string;
  description?: string;
  ogImageUrl?: string;
};

type PageMeta = {
  title?: string;
  description?: string;
  image?: string;
  /** Optional path appended to siteName, e.g. "Concentric Travel" */
  pageName?: string;
};

/**
 * Build a Metadata object. Pass per-page overrides; the helper resolves
 * the rest from siteSettings + hardcoded fallbacks.
 */
export async function buildMetadata(page: PageMeta = {}): Promise<Metadata> {
  const settings = (await getSettings()) as SettingsShape;

  const title =
    page.title ||
    settings.seoTitle ||
    settings.title ||
    HARDCODED_TITLE;

  const description =
    page.description ||
    settings.description ||
    HARDCODED_DESC;

  const image = page.image || settings.ogImageUrl || undefined;

  return {
    title,
    description,
    openGraph: {
      type: "website",
      siteName: "A+R Studio",
      title,
      description,
      ...(image ? { images: [{ url: image, width: 1200, height: 630 }] } : {}),
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title,
      description,
      ...(image ? { images: [image] } : {}),
    },
  };
}
