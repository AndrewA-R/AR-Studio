// Migrate any existing brandSystemBlock in case studies from
// `layoutSlots: ['T1', 'T2', 'T3']` (labels-only) to
// `templates: [{label: 'T1'}, ...]` (labelled, image upload available).
// Idempotent: skips blocks that already have `templates`.
import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "buhlv91p",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

const cases = await client.fetch(`*[_type == "caseStudy"]{_id, body}`);
let touched = 0;

for (const c of cases) {
  if (!Array.isArray(c.body)) continue;
  let changed = false;
  const newBody = c.body.map((b) => {
    if (b._type !== "brandSystemBlock") return b;
    if (Array.isArray(b.templates) && b.templates.length) return b; // already migrated
    if (!Array.isArray(b.layoutSlots) || !b.layoutSlots.length) return b;
    changed = true;
    const templates = b.layoutSlots.map((label, i) => ({
      _key: `tpl-${i + 1}`,
      label,
    }));
    return { ...b, templates };
  });
  if (changed) {
    await client.patch(c._id).set({ body: newBody }).commit();
    console.log(`✓ ${c._id}: migrated layoutSlots → templates`);
    touched++;
  }
}
console.log(`Done. Migrated ${touched} doc(s).`);
