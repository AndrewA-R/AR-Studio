// Replace the existing client logo wall with a fresh ordered list.
// For brands where a local PNG exists in /public/clients, upload to Sanity
// and reference the new asset; otherwise leave logo unset (text fallback).
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@sanity/client";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const TOKEN = process.env.SANITY_API_READ_TOKEN;
if (!PROJECT_ID || !TOKEN) { console.error("Missing PROJECT_ID or TOKEN"); process.exit(1); }

const PUBLIC_DIR = path.join(__dirname, "..", "public", "clients");

// User-specified order — top row: positions 1-7, bottom row: 8-15
const brands = [
  { name: "FTD",                 file: null,                          order: 1 },
  { name: "De'Longhi",           file: "delonghi.png",                order: 2 },
  { name: "Whole Foods",         file: "whole-foods.png",             order: 3 },
  { name: "ecoATM",              file: null,                          order: 4 },
  { name: "LG",                  file: "lg.png",                      order: 5 },
  { name: "BMW",                 file: "bmw.png",                     order: 6 },
  { name: "Tribute Technology",  file: null,                          order: 7 },
  { name: "Lenovo",              file: "lenovo.png",                  order: 8 },
  { name: "KM Tools",            file: "km-tools.png",                order: 9 },
  { name: "Revlon",              file: "revlon.png",                  order: 10 },
  { name: "JBL",                 file: "jbl.png",                     order: 11 },
  { name: "Aiir",                file: null,                          order: 12 },
  { name: "Lakers",              file: "lakers.png",                  order: 13 },
  { name: "WhipShots",           file: null,                          order: 14 },
  { name: "Concentric Travel",   file: "concentric-travel.png",       order: 15 },
];

const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const client = createClient({
  projectId: PROJECT_ID, dataset: "production", apiVersion: "2024-01-01",
  token: TOKEN, useCdn: false,
});

// 1) Delete every existing client doc
const existing = await client.fetch('*[_type=="clientLogo"]{_id}');
console.log(`Deleting ${existing.length} existing client docs...`);
for (const doc of existing) {
  try { await client.delete(doc._id); }
  catch (e) { console.warn(`  could not delete ${doc._id}: ${e.message}`); }
}

// 2) Create the new 15 in order
for (const b of brands) {
  const docId = `client-${slug(b.name)}`;
  let logoRef = null;

  if (b.file) {
    const fullPath = path.join(PUBLIC_DIR, b.file);
    if (!fs.existsSync(fullPath)) {
      console.warn(`  ${b.name}: local file missing (${b.file}), skipping image upload`);
    } else {
      console.log(`[${b.name}] uploading ${b.file}...`);
      const stream = fs.createReadStream(fullPath);
      const asset = await client.assets.upload("image", stream, { filename: b.file });
      logoRef = { _type: "image", asset: { _type: "reference", _ref: asset._id } };
    }
  }

  const doc = { _id: docId, _type: "clientLogo", name: b.name, order: b.order };
  if (logoRef) doc.logo = logoRef;
  await client.createOrReplace(doc);
  console.log(`  ${b.order.toString().padStart(2," ")}. ${b.name}  (logo=${!!logoRef})`);
}

console.log("\nDone — 15 clients in user's order. Sanity webhook will trigger Vercel rebuild.");
