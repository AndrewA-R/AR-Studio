import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "buhlv91p",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

// Read the user-edited dotted-ID Concentric doc, write it at the canonical
// slug-style ID, then strip the obsolete duplicates.
const concentric = await client.getDocument("caseStudy.concentric");
if (!concentric) { console.error("Source caseStudy.concentric not found"); process.exit(1); }

// Strip system + id fields, then assign the new ID + slug.
const {
  _id, _rev, _createdAt, _updatedAt, _system,
  caseNumber, client: clientLegacy, clientLogo, result, title, // any lingering legacy fields
  ...content
} = concentric;
void clientLegacy; void caseNumber; void clientLogo; void result; void title;

const migrated = {
  ...content,
  _id: "case-concentric-travel",
  _type: "caseStudy",
  slug: { _type: "slug", current: "concentric-travel" },
};

await client.createOrReplace(migrated);
console.log("✓ Migrated caseStudy.concentric → case-concentric-travel (your edits preserved)");

// Delete duplicates
for (const oldId of ["caseStudy.km-tools", "caseStudy.concentric"]) {
  try {
    await client.delete(oldId);
    console.log(`✓ Deleted duplicate: ${oldId}`);
  } catch (e) {
    console.warn(`✗ Could not delete ${oldId}: ${e.message}`);
  }
}

// Strip any obsolete fields from any draft state for the surviving docs
for (const id of ["case-km-tools", "case-concentric-travel", "drafts.case-km-tools", "drafts.case-concentric-travel"]) {
  try {
    await client.patch(id).unset(["caseNumber", "client", "clientLogo", "result", "title"]).commit();
    console.log(`✓ Stripped obsolete fields on ${id}`);
  } catch (e) {
    if (!String(e.message).includes("not found")) console.warn(`  (${id}: ${e.message})`);
  }
}

// Final state
const all = await client.fetch(`*[_type == "caseStudy"]{_id, "slug": slug.current, headline}`);
console.log("\nFinal case-study docs:");
for (const d of all) console.log(`  ${d._id}  slug=${d.slug}  headline=${d.headline?.slice(0,40)}`);
