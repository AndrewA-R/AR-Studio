// Seed Sanity with starter content matching the design's stock copy.
// Idempotent — uses fixed _ids and createIfNotExists / createOrReplace where appropriate.
import { createClient } from "@sanity/client";

const homepageContent = {
  heroLede: "Marketing has been splintered into separate disciplines that measure separately and rarely speak.",
  heroLedeAccent: "A+R puts the work back on one team.",
  heroBody: "An integrated marketing studio built around Carousel — our AI-driven operating system — and a roster of senior specialists sourced for your category. One retainer. No media markups. No misaligned incentives.",
  carouselThesis: "The spine of the agency.",
  carouselThesisAccent: "And the reason we can run circles around shops twice our size.",
  carouselBodyTop: "Carousel is the AI-driven operating system A+R built so a small team of senior marketers can ship the output of a department twice its size. Strategy, creative, media, and reporting — planned, briefed, produced, deployed, and measured in one place. Every specialist we bring onto your engagement plugs into the same system, speaks the same language, and works from the same brief.",
  carouselBodyBottom: "You don't log into it. You don't pay for a license. You hire A+R, and Carousel is how we deliver — faster, more accountable, and without the dozen disconnected SaaS tools every other agency is duct-taping together.",
  thesisHeading: "The marketing landscape has fractured. Every discipline gets treated as its own operational entity. Everything is measured separately. The silos rarely speak.",
  thesisHeadingAccent: "A+R is putting it back together.",
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
};

const settings = {
  title: "A+R Studio",
  tagline: "Integrated marketing, on one team",
  description: "An integrated marketing studio built around Carousel — our AI-driven operating system — and a roster of senior specialists.",
  footerSignoff: "Bring the work",
  footerSignoffAccent: "back together.",
};

const forthcoming = { number: "04", title: "Naming the Five Fractures.", tag: "Manifesto", readTime: "publishes May 2026", status: "forthcoming", slug: "naming-the-five-fractures" };
const archive = [
  { number: "03", title: "Modern Marketing Is a Gamble. The Only One Winning Is the House.", tag: "Industry", readTime: "11 min", publishedAt: "2026-04-15", slug: "modern-marketing-gamble", status: "published" },
  { number: "02", title: "Half the Work Is Working. Figuring Out Which Half Is Killing Us.", tag: "Operations", readTime: "8 min", publishedAt: "2026-04-02", slug: "half-the-work-is-working", status: "published" },
  { number: "01", title: "Your Subscription Is Not A Strategy.", tag: "Strategy", readTime: "6 min", publishedAt: "2026-03-12", slug: "subscription-not-strategy", status: "published" },
];

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2025-01-01",
  token: process.env.SANITY_API_READ_TOKEN,
  useCdn: false,
});

async function main() {
  await client.createOrReplace({ _id: "siteSettings", _type: "siteSettings", ...settings });

  for (const a of [forthcoming, ...archive]) {
    await client.createIfNotExists({
      _id: `article-${a.slug}`, _type: "article",
      title: a.title,
      slug: { _type: "slug", current: a.slug },
      number: a.number, tag: a.tag, readTime: a.readTime,
      publishedAt: a.publishedAt || undefined,
      status: a.status,
    });
  }

  await client.createOrReplace({
    _id: "homepage", _type: "homepage", ...homepageContent,
    forthcomingArticle: { _type: "reference", _ref: `article-${forthcoming.slug}` },
  });

  for (const f of [
    { _id: "founder-andrew", name: "Andrew Cagan", role: "Founding principal · Brand + strategy",
      bio: "Built the studio model A+R operates inside. Twenty years across creative, media, and operations. Senior on the engagements that need senior; in the room when judgment is the deliverable.", order: 1 },
    { _id: "founder-robin", name: "Robin Cagan", role: "Founding principal · Performance + operations",
      bio: "Performance operator turned builder. Wrote Carousel's first spec on a kitchen whiteboard. Designs the operating system that lets every roster specialist do their best work without overhead.", order: 2 },
  ]) {
    await client.createIfNotExists({ _type: "founder", ...f });
  }

  const logos = ["BMW", "JBL", "Supergoop", "Revlon", "KM Tools", "DeLonghi", "Lakers", "OneSkin", "Whole Foods", "CAA", "CityMD", "Pulp Riot", "Lenovo", "LG", "Niagara", "Loews"];
  for (let i = 0; i < logos.length; i++) {
    await client.createIfNotExists({
      _id: `client-${logos[i].toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
      _type: "clientLogo", name: logos[i], order: i,
    });
  }

  for (const c of [
    { _id: "case-km-tools", caseNumber: "01", client: "Katz-Moses Tools", slug: "km-tools",
      tier: "Ownership tier", sector: "Retail · Tools", dates: "2024 – present",
      headline: "A founder-led love brand stalled because four vendors weren't talking.",
      result: "3× Q4 lift · 2.5× Cyberweek YoY · 200+ assets",
      logoIsWhite: false, featured: true, order: 1 },
    { _id: "case-concentric-travel", caseNumber: "02", client: "Concentric Travel", slug: "concentric-travel",
      tier: "Campaigns tier", sector: "Hospitality · EU", dates: "Jan – Apr 2026",
      headline: "Creative that performs at 5–10× the benchmark. Then the honest diagnosis.",
      result: "15% CTR · €0.04–0.13 CPC · Phase 02 in flight",
      logoIsWhite: true, featured: true, order: 2 },
  ]) {
    const { _id, slug, ...rest } = c;
    await client.createIfNotExists({
      _id, _type: "caseStudy",
      slug: { _type: "slug", current: slug },
      title: c.client, ...rest,
    });
  }

  const faqs = [
    ["How is A+R different from a traditional agency?", "We don't carry bench overhead. Two principals architect every engagement, then we assemble a senior, fractional roster configured for your category. Carousel — our operating system — keeps the work coherent across disciplines that normally get siloed."],
    ["Do I get access to Carousel?", "No. Carousel isn't a SaaS product — it's how we deliver. You hire A+R; Carousel is the connective tissue that lets a small senior team ship the output of a much bigger department."],
    ["What size brand do you work with?", "Most of our engagements sit between $10M and $50M ARR, but the better question is fit. We work best with operators who want a single accountable team rather than a vendor stack."],
    ["How do engagements start?", "A 30-minute conversation. No brief, no RFP. If we're not the right team, we'll say so and point you at one that is."],
    ["How is pricing structured?", "One retainer, scoped to the engagement tier. No media markups. No procurement games."],
  ];
  for (let i = 0; i < faqs.length; i++) {
    const [q, a] = faqs[i];
    await client.createIfNotExists({
      _id: `faq-${i + 1}`, _type: "faq",
      question: q,
      answer: [{ _type: "block", _key: "k1", style: "normal", children: [{ _type: "span", _key: "s1", text: a, marks: [] }], markDefs: [] }],
      order: i,
    });
  }

  for (const [tier, title, summary, order] of [
    ["Planning", "Diagnostic + roadmap", "Two to six weeks. We audit the marketing operation end-to-end — brand, performance, content, ops — and hand back a tight roadmap. No retainer required.", 1],
    ["Campaigns", "Tightly scoped engagements", "Three to six months. A single defined outcome — a launch, a quarter of paid media, a creative refresh — staffed with the right roster specialists and run on Carousel.", 2],
    ["Ownership", "Full integrated marketing", "Twelve months and up. We own the marketing function. One retainer covers strategy, creative, media, analytics, and ops — Carousel is the connective tissue.", 3],
  ]) {
    await client.createIfNotExists({
      _id: `service-${tier.toLowerCase()}`, _type: "service", title, tier, summary, order,
    });
  }

  console.log("Seed complete.");
}

main().catch(e => { console.error(e); process.exit(1); });
