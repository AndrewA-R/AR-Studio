// Fallback content used when Sanity is empty (or before projectId is configured).
// Editors override these by populating the Homepage / Site settings docs in /admin.
export const fallbackHomepage = {
  heroLede:
    "Marketing has been splintered into separate disciplines that measure separately and rarely speak.",
  heroLedeAccent: "A+R puts the work back on one team.",
  heroBody:
    "An integrated marketing studio built around Carousel — our AI-driven operating system — and a roster of senior specialists sourced for your category. One retainer. No media markups. No misaligned incentives.",
  carouselThesis: "The spine of the agency.",
  carouselThesisAccent: "And the reason we can run circles around shops twice our size.",
  carouselBodyTop:
    "Carousel is the AI-driven operating system A+R built so a small team of senior marketers can ship the output of a department twice its size. Strategy, creative, media, and reporting — planned, briefed, produced, deployed, and measured in one place. Every specialist we bring onto your engagement plugs into the same system, speaks the same language, and works from the same brief.",
  carouselBodyBottom:
    "You don’t log into it. You don’t pay for a license. You hire A+R, and Carousel is how we deliver — faster, more accountable, and without the dozen disconnected SaaS tools every other agency is duct-taping together.",
  carouselKickerRight: "An AI-Powered Marketing Operating System\nbuilt by A+R.",
  carouselClosingQuote: "No other studio our size has built one. That is the point.",
  thesisHeading:
    "The marketing landscape has fractured. Every discipline gets treated as its own operational entity. Everything is measured separately. The silos rarely speak.",
  thesisHeadingAccent: "A+R is putting it back together.",
  thesisBodyTop: "That’s the entire thesis of the business. Not a service we offer, not a vertical, not a deck slide — the perspective we bring to every engagement. The commission can be narrow. The thinking never is.",
  thesisBodyBottom: "Closing those gaps requires three things at once: a way of working that doesn’t segment talent by lane, an operating system that lets the work compound across disciplines, and a business model that doesn’t profit from the fractures staying open. We built the studio around all three.",
  fractures: [
    { label: "Brand and performance", rest: "measured separately, briefed separately, rarely speak." },
    { label: "Strategy and execution", rest: "live in different rooms with different vocabularies." },
    { label: "The stack and the work", rest: "a dozen SaaS tools; none of them know about each other." },
    { label: "Customer data and platform data", rest: "two stories about the same person, never reconciled." },
    { label: "Agency and client", rest: "incentives bent by markups, retainers, and open-ended scopes." },
  ],
  rosterHeadline: "Brands whose growth our team has shaped — ",
  rosterHeadlineAccent: "directly, and from the seats we held before A+R.",
  rosterCopy:
    "Senior operators across the studio and the roster have led launches, rebrands, growth programs, and turnarounds at brands you know. Some as A+R. Some from prior agency seats. Some from in-house operator roles. The work is the work.",
  foundersHeadline: "Two principals architect the engagement. A senior, fractional roster does the work — ",
  foundersHeadlineAccent: "configured to your category, every time.",
  foundersCopy:
    "A+R is structured the opposite way of a traditional agency. Andrew and Robin build the infrastructure — the engagement model, the operating system, the standards — and then assemble a tailored team of senior, fractional specialists for each engagement. We rarely staff the same team twice. No bench overhead. No media markups. No misaligned incentives. The work compounds because the system does.",
};

export const fallbackSettings = {
  title: "A+R Studio",
  tagline: "Integrated marketing, on one team",
  description:
    "An integrated marketing studio built around Carousel — our AI-driven operating system — and a roster of senior specialists.",
  footerSignoff: "Bring the work",
  footerSignoffAccent: "back together.",
};

export const fallbackFounders = [
  {
    _id: "fallback-andrew",
    name: "Andrew Cagan",
    role: "Founding principal · Brand + strategy",
    bio: "Built the studio model A+R operates inside. Twenty years across creative, media, and operations. Senior on the engagements that need senior; in the room when judgment is the deliverable.",
    headshot: { _placeholder: "/placeholders/andrew.jpg" },
  },
  {
    _id: "fallback-robin",
    name: "Robin Cagan",
    role: "Founding principal · Performance + operations",
    bio: "Performance operator turned builder. Wrote Carousel’s first spec on a kitchen whiteboard. Designs the operating system that lets every roster specialist do their best work without overhead.",
    headshot: { _placeholder: "/placeholders/robin.jpg" },
  },
];

const clientLogoFiles: Array<[string, string]> = [
  ["BMW", "bmw.png"], ["JBL", "jbl.png"], ["Supergoop", "supergoop.png"], ["Revlon", "revlon.png"],
  ["KM Tools", "km-tools.png"], ["DeLonghi", "delonghi.png"], ["Lakers", "lakers.png"], ["OneSkin", "oneskin.webp"],
  ["Whole Foods", "whole-foods.png"], ["CAA", "caa.png"], ["CityMD", "citymd.png"], ["Pulp Riot", "pulp-riot.png"],
  ["Lenovo", "lenovo.png"], ["LG", "lg.png"], ["Niagara", "niagara.png"], ["Loews", "loews.webp"],
];
export const fallbackClientLogos = clientLogoFiles.map(([name, file], i) => ({
  _id: `fallback-${i}`, name, order: i, logo: { _placeholder: `/clients/${file}` },
}));

export const fallbackCases = [
  {
    _id: "fallback-km",
    slug: "km-tools",
    caseNumber: "01",
    client: "Katz-Moses Tools",
    tier: "Ownership tier",
    sector: "Retail · Tools",
    dates: "2024 – present",
    headline: "A founder-led love brand stalled because four vendors weren’t talking.",
    result: "3× Q4 lift · 2.5× Cyberweek YoY · 200+ assets",
    heroImage: { _placeholder: "/placeholders/km-tools.jpg" },
    clientLogo: { _placeholder: "/clients/km-tools.png" },
    logoIsWhite: false,
  },
  {
    _id: "fallback-concentric",
    slug: "concentric-travel",
    caseNumber: "02",
    client: "Concentric Travel",
    tier: "Campaigns tier",
    sector: "Hospitality · EU",
    dates: "Jan – Apr 2026",
    headline: "Creative that performs at 5–10× the benchmark. Then the honest diagnosis.",
    result: "15% CTR · €0.04–0.13 CPC · Phase 02 in flight",
    heroImage: { _placeholder: "/placeholders/concentric-travel.jpg" },
    clientLogo: { _placeholder: "/clients/concentric-travel-ko.png" },
    logoIsWhite: true,
  },
];

export const fallbackArchive = [
  { _id: "fa3", slug: "modern-marketing-gamble", number: "03",
    title: "Modern Marketing Is a Gamble. The Only One Winning Is the House.",
    tag: "Industry", readTime: "11 min", publishedAt: "2026-04-15" },
  { _id: "fa2", slug: "half-the-work-is-working", number: "02",
    title: "Half the Work Is Working. Figuring Out Which Half Is Killing Us.",
    tag: "Operations", readTime: "8 min", publishedAt: "2026-04-02" },
  { _id: "fa1", slug: "subscription-not-strategy", number: "01",
    title: "Your Subscription Is Not A Strategy.",
    tag: "Strategy", readTime: "6 min", publishedAt: "2026-03-12" },
];

export const fallbackCarouselCapabilities = [
  { _id: "cap-build", title: "Build Campaigns", order: 1,
    summary: "Strategy, briefs, calendars, and creative concepts come together in one workspace. No more chasing decks across five vendors. Every campaign starts from the same source of truth.",
    videoUrl: null, poster: null },
  { _id: "cap-execute", title: "Execute Creative", order: 2,
    summary: "Creative produced and reviewed inside the system. AI-assisted where it helps, human-led where judgment matters. Versions, comments, and approvals never leave the brief.",
    videoUrl: null, poster: null },
  { _id: "cap-plan-media", title: "Plan Media", order: 3,
    summary: "Channel mix, flighting, and budget modeled against the brand and performance goals on the same page. No more spreadsheets that disagree with the deck.",
    videoUrl: null, poster: null },
  { _id: "cap-deploy-email", title: "Deploy Email", order: 4,
    summary: "Lifecycle and broadcast email built, tested, and pushed without leaving Carousel. Same brief, same brand voice, same measurement frame as paid and social.",
    videoUrl: null, poster: null },
  { _id: "cap-manage-social", title: "Manage Social", order: 5,
    summary: "Organic and paid social planned together. Calendar, creative, captions, and posting in one place — with brand and performance signals reconciled in one report.",
    videoUrl: null, poster: null },
  { _id: "cap-track", title: "Track Results", order: 6,
    summary: "One document the CFO actually reads. Brand health, channel performance, and customer truth pulled together — not a quarterly slide tour, a continuous read on what's working.",
    videoUrl: null, poster: null },
];

export const fallbackForthcoming = {
  number: "04",
  title: "Naming the Five Fractures.",
  tag: "Manifesto",
  readTime: "publishes May 2026",
  status: "forthcoming",
  slug: "naming-the-five-fractures",
};
