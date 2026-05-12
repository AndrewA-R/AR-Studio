import { Masthead } from "@/components/Masthead";
import { Hero } from "@/components/Hero";
import { Work } from "@/components/Work";
import { CarouselFeature } from "@/components/CarouselFeature";
import { Thesis } from "@/components/Thesis";
import { Roster } from "@/components/Roster";
import { Founders } from "@/components/Founders";
import { Thinking } from "@/components/Thinking";
import { Contact } from "@/components/Contact";
import { SiteFooter } from "@/components/SiteFooter";
import {
  getHomepage, getSettings, getFeaturedCases,
  getFounders, getClientLogos, getArticleArchive,
} from "@/lib/data";
import { fallbackHomepage } from "@/lib/site";
import { buildMetadata } from "@/lib/seo";
import type { Metadata } from "next";
type ForthcomingShape = { number?: string; title: string; tag?: string; readTime?: string; slug?: string };

export async function generateMetadata(): Promise<Metadata> {
  const homepage = (await getHomepage()) as {
    seoTitle?: string; seoDescription?: string; ogImageUrl?: string;
  };
  return buildMetadata({
    title: homepage.seoTitle,
    description: homepage.seoDescription,
    image: homepage.ogImageUrl,
  });
}

export default async function HomePage() {
  const [homepage, settings, cases, founders, logos, archive] = await Promise.all([
    getHomepage(), getSettings(), getFeaturedCases(),
    getFounders(), getClientLogos(), getArticleArchive(),
  ]);

  const forthcoming = (homepage as { forthcomingArticle?: ForthcomingShape | null }).forthcomingArticle ?? null;

  return (
    <>
      <Masthead tagline={settings.tagline} />
      <Hero lede={homepage.heroLede} ledeAccent={homepage.heroLedeAccent} body={homepage.heroBody} />
      <Work cases={cases.map((c) => ({
        slug: c.slug, caseNumber: c.caseNumber, client: c.client,
        tier: c.tier, sector: c.sector, dates: c.dates,
        headline: c.headline, result: c.result,
        heroImage: c.heroImage, clientLogo: c.clientLogo, logoIsWhite: c.logoIsWhite,
      }))} />
      <Thesis
        heading={homepage.thesisHeading}
        headingAccent={homepage.thesisHeadingAccent}
        bodyTop={homepage.thesisBodyTop}
        pivot={(homepage as { thesisPivot?: string }).thesisPivot || fallbackHomepage.thesisPivot}
        rebuttals={
          ((homepage as { thesisRebuttals?: Array<{ lead: string; tail: string }> }).thesisRebuttals?.length
            ? (homepage as { thesisRebuttals: Array<{ lead: string; tail: string }> }).thesisRebuttals
            : fallbackHomepage.thesisRebuttals)
        }
      />
      <CarouselFeature
        thesis={homepage.carouselThesis}
        thesisAccent={homepage.carouselThesisAccent}
        bodyTop={homepage.carouselBodyTop}
        bodyBottom={homepage.carouselBodyBottom}
        closingQuote={homepage.carouselClosingQuote}
      />
      <Founders
        headline={homepage.foundersHeadline}
        headlineAccent={homepage.foundersHeadlineAccent}
        copy={homepage.foundersCopy}
        founders={founders}
      />
      <Roster
        headline={homepage.rosterHeadline}
        headlineAccent={homepage.rosterHeadlineAccent}
        copy={homepage.rosterCopy}
        logos={logos}
      />
      <Thinking archive={archive} forthcoming={forthcoming} />
      <Contact />
      <SiteFooter minimal />
    </>
  );
}
