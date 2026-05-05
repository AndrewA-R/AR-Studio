// Upload the 5 newly added logos and patch the matching client docs.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@sanity/client";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const TOKEN = process.env.SANITY_API_READ_TOKEN;
if (!PROJECT_ID || !TOKEN) { console.error("Missing PROJECT_ID or TOKEN"); process.exit(1); }

const PUBLIC_DIR = path.join(__dirname, "..", "public", "clients");

// User dropped these into public/clients/ with original filenames
const mapping = [
  { docId: "client-ftd",                 name: "FTD",                file: "ftd-logo-freelogovectors.net_.png" },
  { docId: "client-ecoatm",              name: "ecoATM",             file: "ecoATM_logo_sea_RGB.png" },
  { docId: "client-tribute-technology",  name: "Tribute Technology", file: "images.jpg" },
  { docId: "client-aiir",                name: "Aiir",               file: "aiir logo black-05.png" },
  { docId: "client-whipshots",           name: "WhipShots",          file: "23279421-ws-logo-297x300.png" },
];

const client = createClient({
  projectId: PROJECT_ID, dataset: "production", apiVersion: "2024-01-01",
  token: TOKEN, useCdn: false,
});

for (const { docId, name, file } of mapping) {
  const fullPath = path.join(PUBLIC_DIR, file);
  if (!fs.existsSync(fullPath)) { console.warn(`  ${name}: missing ${file}, skipping`); continue; }
  console.log(`[${name}] uploading ${file} ...`);
  const stream = fs.createReadStream(fullPath);
  const asset = await client.assets.upload("image", stream, { filename: file });
  await client.patch(docId).set({
    logo: { _type: "image", asset: { _type: "reference", _ref: asset._id } },
  }).commit();
  console.log(`  ${name} ✓ patched ${docId}`);
}

console.log("\nDone. Sanity webhook will trigger Vercel rebuild.");
