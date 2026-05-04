import { PageShell } from "@/components/PageShell";
import { CarouselGraphic } from "@/components/CarouselGraphic";
import { CarouselCapabilities } from "@/components/CarouselCapabilities";
import { getCarouselCapabilities } from "@/lib/data";

export const metadata = { title: "Carousel" };

export default async function CarouselPage() {
  const capabilities = await getCarouselCapabilities();
  return (
    <PageShell>
      <section className="bg-paper border-b border-ink/10 px-[clamp(24px,4vw,56px)] pt-20 pb-16">
        <div className="max-w-wide mx-auto grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-y-10 gap-x-16 items-start">
          <div>
            <div className="font-mono text-[11px] tracking-[0.22em] uppercase text-purple-700 mb-7">§ Carousel · v3.4</div>
            <h1
              className="m-0 max-w-[18ch] text-balance text-ink"
              style={{
                fontFamily: '"Instrument Serif", serif',
                fontSize: "clamp(56px, 8vw, 128px)",
                lineHeight: 0.95,
                letterSpacing: "-0.028em",
                fontWeight: 400,
              }}
            >
              The operating system. <span className="italic text-purple-700">Built so a small team can ship like a large one.</span>
            </h1>
            <p className="mt-9 max-w-[60ch] text-ink-600" style={{ fontFamily: '"Newsreader", Georgia, serif', fontSize: 21, lineHeight: 1.55 }}>
              Carousel is software A+R built and owns. You don’t buy it, you don’t log into it. You hire A+R, and Carousel is how we deliver — faster, more accountable, and without the dozen disconnected SaaS tools every other agency is duct-taping together.
            </p>
          </div>
          <div className="lg:sticky lg:top-12 self-start w-[90%]">
            <CarouselGraphic variant="light" />
          </div>
        </div>
      </section>
      <CarouselCapabilities capabilities={capabilities} />
    </PageShell>
  );
}
