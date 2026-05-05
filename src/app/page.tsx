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
import { fallbackForthcoming } from "@/lib/site";

export default async function HomePage() {
  const [homepage, settings, cases, founders, logos, archive] = await Promise.all([
    getHomepage(), getSettings(), getFeaturedCases(),
    getFounders(), getClientLogos(), getArticleArchive(),
  ]);

  const forthcoming = (homepage as { forthcomingArticle?: typeof fallbackForthcoming }).forthcomingArticle ?? fallbackForthcoming;

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
      <CarouselFeature
        thesis={homepage.carouselThesis}
        thesisAccent={homepage.carouselThesisAccent}
        bodyTop={homepage.carouselBodyTop}
        bodyBottom={homepage.carouselBodyBottom}
        closingQuote={homepage.carouselClosingQuote}
      />
      <Thesis
        heading={homepage.thesisHeading}
        headingAccent={homepage.thesisHeadingAccent}
        fractures={homepage.fractures}
        bodyTop={homepage.thesisBodyTop}
        bodyBottom={homepage.thesisBodyBottom}
      />
      <Roster
        headline={homepage.rosterHeadline}
        headlineAccent={homepage.rosterHeadlineAccent}
        copy={homepage.rosterCopy}
        logos={logos}
      />
      <Founders
        headline={homepage.foundersHeadline}
        headlineAccent={homepage.foundersHeadlineAccent}
        copy={homepage.foundersCopy}
        founders={founders}
      />
      <Thinking archive={archive} forthcoming={forthcoming} />
      <Contact />
      <SiteFooter signoff={settings.footerSignoff} signoffAccent={settings.footerSignoffAccent} />
    </>
  );
}
