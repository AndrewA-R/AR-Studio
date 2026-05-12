import { PageShell } from "@/components/PageShell";
import { PageHero } from "@/components/PageHero";
import { ContactForm } from "@/components/ContactForm";

export const metadata = { title: "Contact" };

export default async function ContactPage() {
  return (
    <PageShell>
      <PageHero
        kicker="§ Get in touch"
        title="Start a"
        titleAccent="conversation."
        lede="Let’s chat! (no pressure)"
      />
      <section className="bg-paper px-6 md:px-[clamp(24px,4vw,56px)] py-12 md:py-24">
        <div className="max-w-content mx-auto grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8 md:gap-12">
          <aside className="space-y-6">
            <div>
              <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-ink-400">Studio</div>
              <div className="mt-2 text-ink-600">Los Angeles</div>
            </div>
            <div>
              <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-ink-400">Roster</div>
              <a href="/join-our-roster" className="block mt-2 text-ink border-b border-ink pb-1 no-underline w-fit">Join the roster →</a>
            </div>
          </aside>
          <ContactForm />
        </div>
      </section>
    </PageShell>
  );
}
