// Data fetchers — return Sanity content if configured, otherwise fall back to
// the design's stock copy. Lets the site render even before Sanity is wired.
import { client } from "@/sanity/client";
import { projectId } from "@/sanity/env";
import {
  homepageQuery, carouselPageQuery, siteSettingsQuery, featuredCasesQuery, allCasesQuery,
  caseBySlugQuery, articleArchiveQuery, articleBySlugQuery,
  foundersQuery, clientLogosQuery, servicesQuery, faqsQuery,
  carouselCapabilitiesQuery,
} from "@/sanity/queries";
import {
  fallbackHomepage, fallbackCarouselPage, fallbackSettings, fallbackFounders, fallbackClientLogos,
  fallbackCases, fallbackArchive, fallbackCarouselCapabilities,
} from "./site";

const isConfigured = projectId !== "placeholder" && projectId !== "replace-me";

async function safeFetch<T>(query: string, params: Record<string, unknown> = {}, fallback: T): Promise<T> {
  if (!isConfigured) return fallback;
  try {
    const result = await client.fetch<T>(query, params, { next: { revalidate: 60 } });
    return result ?? fallback;
  } catch (err) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[sanity] fetch failed, using fallback:", err);
    }
    return fallback;
  }
}

export const getHomepage = () => safeFetch(homepageQuery, {}, { ...fallbackHomepage, forthcomingArticle: null });
export const getCarouselPage = () => safeFetch(carouselPageQuery, {}, fallbackCarouselPage);
export const getSettings = () => safeFetch(siteSettingsQuery, {}, fallbackSettings);
export const getFeaturedCases = () => safeFetch(featuredCasesQuery, {}, fallbackCases);
export const getAllCases = () => safeFetch(allCasesQuery, {}, fallbackCases);
export const getCaseBySlug = (slug: string) => safeFetch(caseBySlugQuery, { slug }, null);
export const getArticleArchive = () => safeFetch(articleArchiveQuery, {}, fallbackArchive);
export const getArticleBySlug = (slug: string) => safeFetch(articleBySlugQuery, { slug }, null);
export const getFounders = () => safeFetch(foundersQuery, {}, fallbackFounders);
export const getClientLogos = () => safeFetch(clientLogosQuery, {}, fallbackClientLogos);
export const getServices = () => safeFetch(servicesQuery, {}, [] as unknown[]);
export const getFaqs = () => safeFetch(faqsQuery, {}, [] as unknown[]);
export const getCarouselCapabilities = () => safeFetch(carouselCapabilitiesQuery, {}, fallbackCarouselCapabilities);
