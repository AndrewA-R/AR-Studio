import { PageShell } from "@/components/PageShell";
import { CarouselGraphic } from "@/components/CarouselGraphic";
import { CarouselCapabilities } from "@/components/CarouselCapabilities";
import { getCarouselCapabilities, getCarouselPage } from "@/lib/data";
import { fallbackCarouselPage } from "@/lib/site";

export const metadata = { title: "Carousel" };

export default async function CarouselPage() {
  const [page, capabilities] = await Promise.all([
    getCarouselPage() as Promise<typeof fallbackCarouselPage>,
    getCarouselCapabilities(),
  ]);
  const kicker      = page.kicker            || fallbackCarouselPage.kicker;
  const heading     = page.heroHeading       || fallbackCarouselPage.heroHeading;
  const accent      = page.heroHeadingAccent || fallbackCarouselPage.heroHeadingAccent;
  const lede        = page.heroLede          || fallbackCarouselPage.heroLede;
  return (
    <PageShell>
      <section className="bg-paper border-b border-ink/10 px-6 md:px-[clamp(24px,4vw,56px)] pt-12 md:pt-20 pb-12 md:pb-16">
        <div className="max-w-wide mx-auto grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-y-8 lg:gap-y-10 gap-x-16 items-start">
          <div>
            <div className="font-mono text-[11px] tracking-[0.22em] uppercase text-purple-700 mb-6 md:mb-7" style={{ whiteSpace: "pre-line" }}>{kicker}</div>
            <h1
              className="m-0 max-w-[18ch] text-balance text-ink"
              style={{
                fontFamily: '"Instrument Serif", serif',
                fontSize: "clamp(40px, 9vw, 128px)",
                lineHeight: 0.95,
                letterSpacing: "-0.028em",
                fontWeight: 400,
                whiteSpace: "pre-line",
              }}
            >
              {heading} <span className="italic text-purple-700">{accent}</span>
            </h1>
            <p
              className="mt-6 md:mt-9 max-w-[60ch] text-ink-600 text-[17px] md:text-[21px]"
              style={{ fontFamily: '"Newsreader", Georgia, serif', lineHeight: 1.55, whiteSpace: "pre-line" }}
            >
              {lede}
            </p>
          </div>
          <div className="lg:sticky lg:top-12 self-start w-full lg:w-[90%]">
            <CarouselGraphic variant="light" />
          </div>
        </div>
      </section>
      <CarouselCapabilities capabilities={capabilities} />
    </PageShell>
  );
}
