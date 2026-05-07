// Time-travel through homepage history using timestamps from the Studio's
// timeline panel. Print every recoverable revision so we can pick one.
const projectId = "buhlv91p";
const dataset = "production";
const token = process.env.SANITY_API_WRITE_TOKEN;
if (!token) { console.error("Missing SANITY_API_WRITE_TOKEN"); process.exit(1); }
const headers = { Authorization: `Bearer ${token}` };
const base = `https://${projectId}.api.sanity.io/v2025-01-01`;

const probeTimes = [
  // a few seconds after each chunk-timestamp from Studio
  "2026-05-06T22:35:01Z", "2026-05-06T22:00:00Z", "2026-05-06T20:00:00Z",
  "2026-05-06T18:00:00Z", "2026-05-06T12:00:00Z", "2026-05-06T05:00:00Z",
  "2026-05-05T22:18:01Z", "2026-05-05T22:13:21Z", "2026-05-05T22:13:03Z",
  "2026-05-05T21:42:31Z", "2026-05-05T21:36:09Z", "2026-05-05T20:52:29Z",
  "2026-05-05T19:30:58Z", "2026-05-05T19:08:59Z",
];

for (const time of probeTimes) {
  const r = await fetch(`${base}/data/history/${dataset}/documents/homepage?time=${time}`, { headers });
  const j = await r.json().catch(() => ({}));
  const doc = j.documents?.[0];
  console.log(`\n--- ${time} ---`);
  if (!doc) { console.log("  (no doc)"); continue; }
  console.log(`  _rev: ${doc._rev}`);
  const fields = ["heroLede","heroLedeAccent","heroBody","carouselThesis","carouselThesisAccent","carouselBodyTop","carouselBodyBottom","carouselClosingQuote","carouselKickerRight","thesisHeading","thesisHeadingAccent","thesisBodyTop","thesisBodyBottom","rosterHeadline","rosterHeadlineAccent","rosterCopy","foundersHeadline","foundersHeadlineAccent","foundersCopy"];
  for (const f of fields) {
    const v = doc[f];
    if (v) console.log(`  ${f}: ${JSON.stringify(String(v).slice(0, 140))}`);
  }
  if (doc.fractures) console.log(`  fractures count: ${doc.fractures.length}`);
  if (doc.forthcomingArticle) console.log(`  forthcomingArticle: ${JSON.stringify(doc.forthcomingArticle)}`);
}
