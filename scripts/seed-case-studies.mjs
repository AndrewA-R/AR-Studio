/**
 * seed-cases.ts — one-shot importer for the existing two case studies.
 *
 * Hydrates the live KM and Concentric pages out of the JSX into Sanity
 * documents shaped exactly like the schemas in ../schemas/. Run once
 * after the Studio is up and `caseStudy` is registered.
 *
 * Usage:
 *   1. cd sanity-studio && npm i @sanity/client
 *   2. SANITY_TOKEN=<editor-token> npx tsx ../sanity/migrations/seed-cases.ts
 *
 * The script is idempotent — it upserts by `_id`, so re-running just
 * overwrites the same two docs.
 *
 * Image fields are left as plain string paths; once Studio is up,
 * upload the images via the Studio UI or extend this script with
 * `client.assets.upload()` calls.
 */
import {createClient} from '@sanity/client';

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset:   process.env.SANITY_DATASET ?? 'production',
  token:     process.env.SANITY_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
});

// ── Katz-Moses Tools ────────────────────────────────────────────────
const km = {
  _id: 'case-km-tools',
  _type: 'caseStudy',
  caseNo: '01',
  sector: 'Retail · Tools',
  tier: 'Ownership tier',
  dates: '2025',
  wordmark: 'Katz-Moses Tools',
  // logo: upload assets/client-logos/km-tools.png and reference here
  headline: 'A Creator’s Spark Drives',
  italic:   'An eComm Engine.',
  lede:     "Jonathan Katz-Moses has built one of the most trusted names in woodworking — not through advertising, but through obsessive craft and a YouTube channel his audience treats as gospel. That trust is rare. It’s also fragile if you build the wrong machine around it.",
  atGlance: [
    {_key: 'g1', k: 'Category',    v: 'Premium woodworking tools'},
    {_key: 'g2', k: 'Engagement',  v: 'Ownership — fractional CMO + senior team'},
    {_key: 'g3', k: 'Disciplines', v: 'Brand · Creative · Media · Retention · Affiliate'},
    {_key: 'g4', k: 'Mechanism',   v: 'InkBlot — continuous customer intelligence'},
  ],
  slug: {_type: 'slug', current: 'km-tools'},
  order: 1,
  featured: true,
  tileHeadline: "A founder-led love brand stalled because four vendors weren’t talking.",
  tileResult: "3× Q4 lift · 2.5× Cyberweek YoY · 200+ assets",
  body: [
    {
      _key: 'km-strategy',
      _type: 'strategyBlock',
      kicker: 'Strategy',
      title: 'One team. One always-on calendar. One number to move.',
      body: "The reset moved away from channel-by-channel optimization toward one always-on engine, with customer intelligence as its central signal. Four vendors became one team. Four calendars became one calendar. The brief stopped being whatever the next quarterly review demanded and started being whatever last week's customer transcripts revealed. The founder voice — the brand's deepest asset — got pulled out of YouTube alone and into every surface.",
      positioning: "The love brand for makers who care how it's made.",
      framework: [
        {_key: 'f1', label: 'Audience',  lines: ['Serious hobbyist + pro woodworker', 'YouTube-native, founder-loyal']},
        {_key: 'f2', label: 'Promise',   lines: ['Tools that make better work, made by someone who does the work.']},
        {_key: 'f3', label: 'Signal',    lines: ['InkBlot transcripts as the brief.', 'Cadence by what the data says.']},
        {_key: 'f4', label: 'Operating', lines: ['One team across all surfaces.', 'Founder voice everywhere, not just YouTube.']},
      ],
    },
    {
      _key: 'km-quote-1',
      _type: 'quoteBlock',
      quote: "I made a mistake. I have been pitching you tactics, not strategy. So let's reset.",
      attribution: 'Andrew Cagan',
      role: 'Quarterly review · A+R principal · Q2',
    },
    {
      _key: 'km-diagnosis',
      _type: 'diagnosisBlock',
      kicker: 'The reset',
      title: "What the founder's first year revealed.",
      paragraphs: [
        "The dashboards looked fine. Email open rates respectable. Paid ROAS within target. Affiliate spinning across 80 partners. Each vendor could defend their slice. None of them could tell us why repeat purchase was soft, why the email list was growing without converting, or why the founder was the one fielding customer questions every channel should have already answered.",
        "The honest diagnosis: we'd been pitching tactics. Optimizations within lanes. We hadn't gone upstream to ask what the brand was for, who it was for now, and what would make a customer come back without a discount. The reset was a slower thing than that quarter wanted, and it required killing a few things that worked locally to fix the system globally.",
        "InkBlot — our continuous customer intelligence layer — became the central signal. Every quarter, transcripts and behavioral data feed into one document that drives the next quarter's content map, lifecycle moments, retention triggers, and creative bets. Affiliate rationalized from 80 partners to 14 high-fit creators. Email rebuilt around the moments customers actually care about, not the calendar holidays. Paid creative took its briefs from the same transcripts that drove the lifecycle work.",
      ],
      callout: {
        label: 'What InkBlot is',
        body: 'A continuous read of customer language and behavior, condensed quarterly into the brief that drives every channel. Not a dashboard. A point of view, refreshed.',
      },
    },
    {
      _key: 'km-gallery',
      _type: 'galleryBlock',
      kicker: 'Executions',
      title: '200+ assets, one library, one calendar.',
      lede: 'Brand, organic, retention, and paid produced against a single content map — not as separate workstreams handed across vendors. The library is the proof: every surface speaks in the same voice because every surface was briefed off the same signal.',
      items: [
        {_key: 'i1',  span: 6, ratio: '16/9', label: '01', caption: 'Founder film — flagship cut'},
        {_key: 'i2',  span: 3, ratio: '4/5',  label: '02', caption: 'Hero product still — paid'},
        {_key: 'i3',  span: 3, ratio: '4/5',  label: '03', caption: 'Hero product still — paid'},
        {_key: 'i4',  span: 4, ratio: '1/1',  label: '04', caption: 'Lifecycle email — re-engage'},
        {_key: 'i5',  span: 4, ratio: '1/1',  label: '05', caption: 'Lifecycle email — post-purchase'},
        {_key: 'i6',  span: 4, ratio: '1/1',  label: '06', caption: 'Lifecycle email — anniversary'},
        {_key: 'i7',  span: 4, ratio: '4/5',  label: '07', caption: 'Organic short — workshop'},
        {_key: 'i8',  span: 4, ratio: '4/5',  label: '08', caption: 'Organic short — technique'},
        {_key: 'i9',  span: 4, ratio: '4/5',  label: '09', caption: 'Organic short — community'},
        {_key: 'i10', span: 8, ratio: '16/9', label: '10', caption: 'Cyberweek hero — homepage takeover'},
        {_key: 'i11', span: 4, ratio: '16/9', label: '11', caption: 'Affiliate kit — partner-ready'},
      ],
    },
    {
      _key: 'km-metrics',
      _type: 'metricsBlock',
      kicker: 'The result',
      title: 'Three Q4s in, the compounding shows.',
      footnote: 'Year 1 was the reset. Year 2 was the build. Year 3 is the compound.',
      items: [
        {_key: 'm1', num: '200', unit: '+', label: 'Creative assets produced', note: 'One library across brand, organic, retention, and paid. Briefed off one signal.'},
        {_key: 'm2', num: '3',   unit: '×', label: 'Q4 lift vs prior year',    note: 'Compounding across channels; retention carried the back half.'},
        {_key: 'm3', num: '2.5', unit: '×', label: 'Cyberweek YoY',            note: 'Blended ROAS held while spend scaled 2.2×. Founder got his time back.'},
      ],
    },
  ],
};

// ── Concentric Travel ───────────────────────────────────────────────
const concentric = {
  _id: 'case-concentric-travel',
  _type: 'caseStudy',
  caseNo: '02',
  sector: 'Hospitality',
  tier: 'Campaigns tier',
  dates: 'Jan – Apr 2026',
  wordmark: 'Concentric Travel',
  headline: 'Not a clean ROI story.',
  italic:   'A clean strategy story.',
  lede: "Concentric runs immersive tours led by master artisans across Europe. Beautiful raw material, no unified brand, just over €3,000 in spend, and a category with a long decision cycle. The creative performed at exceptional levels. Bookings didn't follow at volume — and the most useful thing we did was tell our client why, then design the experiment that pressure-tests the model.",
  atGlance: [
    {_key: 'g1', k: 'Category',   v: 'Artisan-led travel, EU'},
    {_key: 'g2', k: 'Engagement', v: 'Campaigns — Brand + Paid Social + Search'},
    {_key: 'g3', k: 'Spend',      v: '€3,130 across three months'},
    {_key: 'g4', k: 'Phase 02',   v: 'In-flight as of April 2026'},
  ],
  slug: {_type: 'slug', current: 'concentric-travel'},
  order: 2,
  featured: true,
  tileHeadline: "Creative that performs at 5–10× the benchmark. Then the honest diagnosis.",
  tileResult: "15% CTR · €0.04–0.13 CPC · Phase 02 in flight",
  body: [
    {
      _key: 'c-strategy',
      _type: 'strategyBlock',
      kicker: 'Strategy',
      title: 'One idea coherent enough to hold every city, every craft.',
      body: "Before any media, the brand had to be coherent enough that an audience could recognize it. The available assets were beautiful but visually disjointed — rich content produced by the artisans themselves, with no unified aesthetic. We built a visual and copy system around a single campaign idea — Make Yourself Here — that held imagery from Sevillian markets, Amsterdam studios, and Copenhagen workshops together without flattening them into false uniformity. The mechanic that did the work: a swappable Spanish noun by city and craft. Marroquería y recuerdos in one frame. Cerámica y recuerdos in the next.",
      positioning: 'Travel where the souvenir is something you made.',
      framework: [
        {_key: 'f1', label: 'Audience', lines: ['Cultural-curious traveler', 'Already planning EU trip', 'Indexes high on craft + provenance']},
        {_key: 'f2', label: 'Promise',  lines: ['Make something with the people who live there.']},
        {_key: 'f3', label: 'Mechanic', lines: ['Swappable noun by city + craft.', 'Marroquería · cerámica · tejido · …']},
        {_key: 'f4', label: 'Tone',     lines: ['Editorial documentary.', 'Specific, never generic.']},
      ],
    },
    {
      _key: 'c-metrics-1',
      _type: 'metricsBlock',
      kicker: 'The signal',
      title: 'The creative worked. The audience self-selected.',
      footnote: "Bookings didn't follow at volume — and it's worth being clear about why. See §04.",
      items: [
        {_key: 'm1', num: '15',     unit: '%',    label: 'Average CTR across campaigns',       note: '5–10× the paid social industry benchmark for the category.'},
        {_key: 'm2', num: '10,211', unit: '',     label: 'Link clicks on €3,130 spend',        note: '€0.04–€0.13 per click. Three months. One brand system.'},
        {_key: 'm3', num: '42',     unit: '–43%', label: 'Add-to-cart CTR · conversion campaigns', note: 'Right people, right intent. The horizon was the constraint.'},
      ],
    },
    {
      _key: 'c-diagnosis',
      _type: 'diagnosisBlock',
      kicker: 'Diagnosis',
      title: 'A structural constraint. Not a creative failure.',
      paragraphs: [
        "Concentric's tours are high-consideration purchases. An international traveler doesn't see an ad and book a nine-day trip the same week. The decision cycle is long, and a modest budget cannot sustain the retargeting window required to close it. That's a structural constraint, not a creative failure.",
        'The signal was unambiguous: the right people were clicking and engaging. What was missing was time and budget to stay in front of them until they were ready to commit. Two responses available — spend more, or change the variable. We changed the variable.',
        "Phase 02 isolates the question worth answering: does the appetite for these experiences exist at the right price point, and can we actually get people over the finish line? We refined the on-site booking process and removed the biggest obstacle to conversion — the travel planning horizon — by targeting people already living in the cities where Concentric operates. A local audience faces none of the lead time or logistical complexity of an international traveler. If they want to spend a Saturday afternoon learning leatherworking from a master craftsman in Madrid, they can decide and book the same week.",
      ],
      callout: {
        label: 'Phase 02 — in flight, April 2026',
        body: 'If the proof of concept holds — appetite confirmed, price point validated, conversion achieved — the next step is reintroducing international ads to run alongside the localized ones, with a stronger foundation for what works.',
      },
    },
    {
      _key: 'c-gallery',
      _type: 'galleryBlock',
      kicker: 'Executions',
      title: 'Two chapters. One brand. One swappable noun.',
      lede: 'Phase 01 ran editorial-quality paid social to international travelers, anchored on the Andalucía tour: warm, documentary, specific. Phase 02 — informed by what the data told us — adopted a scrapbook aesthetic and bilingual copy speaking directly to people already in the city.',
      chapters: [
        {
          _key: 'ch1',
          title: 'Phase 01 · Make Yourself Here',
          note: 'International · Jan – Mar 2026',
          items: [
            {_key: 'a1', span: 4, ratio: '4/5',  caption: 'Cerámica y recuerdos · Madrid'},
            {_key: 'a2', span: 4, ratio: '4/5',  label: 'A2', caption: 'Andalucía hero — paid social'},
            {_key: 'a3', span: 4, ratio: '4/5',  label: 'A3', caption: 'Leatherwork still — paid social'},
            {_key: 'a4', span: 8, ratio: '16/9', label: 'A4', caption: 'Hero film — 30s edit'},
            {_key: 'a5', span: 4, ratio: '16/9', label: 'A5', caption: 'Workshop set — 15s'},
          ],
        },
        {
          _key: 'ch2',
          title: 'Phase 02 · Cina y ciné → marroquería y recuerdos',
          note: 'Bilingual · In-city · Apr 2026 →',
          items: [
            {_key: 'b1', span: 4, ratio: '4/5',  label: 'B1', caption: 'Scrapbook still — Madrid'},
            {_key: 'b2', span: 4, ratio: '4/5',  label: 'B2', caption: 'Scrapbook still — Sevilla'},
            {_key: 'b3', span: 4, ratio: '4/5',  label: 'B3', caption: 'Scrapbook still — Amsterdam'},
            {_key: 'b4', span: 8, ratio: '16/9', label: 'B4', caption: 'Saturday-afternoon edit — 20s'},
            {_key: 'b5', span: 4, ratio: '16/9', label: 'B5', caption: 'Booking-page redesign'},
          ],
        },
      ],
    },
    {
      _key: 'c-system',
      _type: 'brandSystemBlock',
      kicker: 'The system',
      title: 'A visual + verbal system that travels.',
      body: "Logo, type, palette, and a small kit of layout templates that absorb the artisans' own photography without a re-shoot. Built to flex across two creative chapters from the start.",
      palette: [
        {_key: 'p1', name: 'Earth',  hex: '#3D2B22', fg: '#F4EFE2'},
        {_key: 'p2', name: 'Ochre',  hex: '#C28E47', fg: '#F4EFE2'},
        {_key: 'p3', name: 'Linen',  hex: '#F4EFE2', fg: '#3D2B22'},
        {_key: 'p4', name: 'Madder', hex: '#7A2820', fg: '#F4EFE2'},
      ],
      typography: {
        display: {family: '"Instrument Serif", serif', italic: true,  sample: 'Aa', label: 'Instrument Serif Italic'},
        body:    {family: '"Newsreader", Georgia, serif', sample: 'Make something with the people who live there.', label: 'Newsreader'},
      },
      layoutSlots: ['T1', 'T2', 'T3'],
    },
    {
      _key: 'c-quote',
      _type: 'quoteBlock',
      quote: 'Creative that performs at an exceptional level, honest diagnosis when the model needs pressure-testing, and the discipline to design an experiment rather than just run more ads.',
      attribution: 'What this case demonstrates',
      role: 'From the engagement summary',
    },
  ],
};

async function main() {
  // Remove old summary-only case docs so we don't have duplicates at
  // different IDs alongside the new full-body docs.
  for (const oldId of ["case-km-tools", "case-concentric-travel"]) {
    try {
      await client.delete(oldId);
      console.log(`Deleted old doc: ${oldId}`);
    } catch {
      // ignore — may not exist
    }
  }

  const tx = client.transaction();
  tx.createOrReplace(km);
  tx.createOrReplace(concentric);
  const result = await tx.commit();
  console.log(`Seeded ${result.results.length} case studies (km-tools, concentric-travel).`);
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exit(1);
});
