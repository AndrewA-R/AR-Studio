import { PageShell } from "@/components/PageShell";
import { PageHero } from "@/components/PageHero";
import { ContactForm } from "@/components/ContactForm";

export const metadata = { title: "Join the roster" };

export default function JoinRosterPage() {
  return (
    <PageShell>
      <PageHero
        kicker="§ For senior specialists"
        title="Join the"
        titleAccent="roster."
        lede="A+R is built on a roster of senior, fractional specialists — strategists, creatives, performance leads, producers, analysts. We staff each engagement with the right operators for the category, then plug them into Carousel so the work compounds. If that's how you want to work, tell us about yourself."
      />
      <section className="bg-paper px-[clamp(24px,4vw,56px)] py-24">
        <div className="max-w-content mx-auto">
          <ContactForm kind="roster" />
        </div>
      </section>
    </PageShell>
  );
}
