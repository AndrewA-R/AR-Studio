// Re-upload the 7 swapped logos and patch the matching client docs.
// Also create Remy Cointreau as a 16th brand (text-only fallback for now).
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@sanity/client";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const TOKEN = process.env.SANITY_API_READ_TOKEN;
if (!PROJECT_ID || !TOKEN) { console.error("Missing PROJECT_ID or TOKEN"); process.exit(1); }
const PUBLIC_DIR = path.join(__dirname, "..", "public", "clients");

const swaps = [
  { docId: "client-bmw",                 name: "BMW",                file: "BMW_logo_(gray).svg.png" },
  { docId: "client-lg",                  name: "LG",                 file: "LG_logo_(2014).svg.png" },
  { docId: "client-jbl",                 name: "JBL",                file: "jbl-2-logo-black-and-white.png" },
  { docId: "client-lakers",              name: "Lakers",             file: "764-7645662_los-angeles-lakers-on-sale-428dc-10c4c-johns.png" },
  { docId: "client-lenovo",              name: "Lenovo",             file: "lenovo_logo_icon_145112.webp" },
  { docId: "client-de-longhi",           name: "De'Longhi",          file: "De’Longhi.svg.png" },
  { docId: "client-tribute-technology",  name: "Tribute Technology", file: "servlet.png" },
];

const client = createClient({
  projectId: PROJECT_ID, dataset: "production", apiVersion: "2024-01-01",
  token: TOKEN, useCdn: false,
});

for (const { docId, name, file } of swaps) {
  const fullPath = path.join(PUBLIC_DIR, file);
  if (!fs.existsSync(fullPath)) { console.warn(`  ${name}: missing ${file}`); continue; }
  console.log(`[${name}] re-uploading ${file} ...`);
  const stream = fs.createReadStream(fullPath);
  const asset = await client.assets.upload("image", stream, { filename: file });
  await client.patch(docId).set({
    logo: { _type: "image", asset: { _type: "reference", _ref: asset._id } },
  }).commit();
  console.log(`  ${name} ✓`);
}

// Add Remy Cointreau as a 16th brand. No logo yet — text fallback until user uploads.
console.log("\n[Remy Cointreau] creating doc (no logo yet)...");
await client.createOrReplace({
  _id: "client-remy-cointreau",
  _type: "clientLogo",
  name: "Remy Cointreau",
  order: 16,
});
console.log("  Remy Cointreau ✓ (waiting on logo upload)");

console.log("\nDone.");
