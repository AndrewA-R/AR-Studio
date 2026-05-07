// Recreate the deleted homepage doc with the seed content, but WITHOUT
// the broken forthcomingArticle reference that caused this mess.
import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "buhlv91p";
const dataset = "production";
const token = process.env.SANITY_API_WRITE_TOKEN;
if (!token) { console.error("Missing SANITY_API_WRITE_TOKEN"); process.exit(1); }

const client = createClient({ projectId, dataset, apiVersion: "2025-01-01", token, useCdn: false });

const homepageContent = {
  _id: "homepage",
  _type: "homepage",
  heroLede: "Marketing has been splintered into separate disciplines that measure separately and rarely speak.",
  heroLedeAccent: "A+R puts the work back on one team.",
  heroBody: "An integrated marketing studio built around Carousel — our AI-driven operating system — and a roster of senior specialists sourced for your category. One retainer. No media markups. No misaligned incentives.",
  carouselThesis: "The spine of the agency.",
  carouselThesisAccent: "And the reason we can run circles around shops twice our size.",
  carouselBodyTop: "Carousel is the AI-driven operating system A+R built so a small team of senior marketers can ship the output of a department twice its size. Strategy, creative, media, and reporting — planned, briefed, produced, deployed, and measured in one place. Every specialist we bring onto your engagement plugs into the same system, speaks the same language, and works from the same brief.",
  carouselBodyBottom: "You don't log into it. You don't pay for a license. You hire A+R, and Carousel is how we deliver — faster, more accountable, and without the dozen disconnected SaaS tools every other agency is duct-taping together.",
  carouselClosingQuote: "No other studio our size has built one. That is the point.",
  thesisHeading: "The marketing landscape has fractured. Every discipline gets treated as its own operational entity. Everything is measured separately. The silos rarely speak.",
  thesisHeadingAccent: "A+R is putting it back together.",
  thesisBodyTop: "That's the entire thesis of the business. Not a service we offer, not a vertical, not a deck slide — the perspective we bring to every engagement. The commission can be narrow. The thinking never is.",
  thesisBodyBottom: "Closing those gaps requires three things at once: a way of working that doesn't segment talent by lane, an operating system that lets the work compound across disciplines, and a business model that doesn't profit from the fractures staying open. We built the studio around all three.",
  fractures: [
    { _key: "f1", label: "Brand and performance", rest: "measured separately, briefed separately, rarely speak." },
    { _key: "f2", label: "Strategy and execution", rest: "live in different rooms with different vocabularies." },
    { _key: "f3", label: "The stack and the work", rest: "a dozen SaaS tools; none of them know about each other." },
    { _key: "f4", label: "Customer data and platform data", rest: "two stories about the same person, never reconciled." },
    { _key: "f5", label: "Agency and client", rest: "incentives bent by markups, retainers, and open-ended scopes." },
  ],
  rosterHeadline: "Brands whose growth our team has shaped — ",
  rosterHeadlineAccent: "directly, and from the seats we held before A+R.",
  rosterCopy: "Senior operators across the studio and the roster have led launches, rebrands, growth programs, and turnarounds at brands you know. Some as A+R. Some from prior agency seats. Some from in-house operator roles. The work is the work.",
  foundersHeadline: "Two principals architect the engagement. A senior, fractional roster does the work — ",
  foundersHeadlineAccent: "configured to your category, every time.",
  foundersCopy: "A+R is structured the opposite way of a traditional agency. Andrew and Robin build the infrastructure — the engagement model, the operating system, the standards — and then assemble a tailored team of senior, fractional specialists for each engagement. We rarely staff the same team twice. No bench overhead. No media markups. No misaligned incentives. The work compounds because the system does.",
  // forthcomingArticle intentionally omitted — leave blank so the card hides.
};

await client.createOrReplace(homepageContent);
console.log("✓ Recreated homepage doc (published, no forthcomingArticle)");

// Also remove any lingering drafts so Studio shows the clean published version.
try { await client.delete("drafts.homepage"); console.log("✓ Removed drafts.homepage if it existed"); } catch {}

console.log("\nDone. Refresh Sanity Studio (hard reload).");
