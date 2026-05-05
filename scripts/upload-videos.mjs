// Upload local video files to Sanity, then patch each carouselCapability
// document to reference the new asset.
import fs from "node:fs";
import path from "node:path";
import { createClient } from "@sanity/client";

const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const TOKEN = process.env.SANITY_API_READ_TOKEN;

if (!PROJECT_ID || !TOKEN) { console.error("Missing PROJECT_ID or TOKEN"); process.exit(1); }

const ASSET_DIR = "/Users/andrewcagan/Desktop/Carousel/Site Case Study Assets";

// File → carouselCapability _id (top-to-bottom on /carousel)
const mapping = [
  { file: "Draper.mov", capId: "cap-build" },
  { file: "Peggy.mov", capId: "cap-execute" },
  { file: "Pima.mov", capId: "cap-plan-media" },
  { file: "Paul.mov", capId: "cap-deploy-email" },
  { file: "Rachel.mov", capId: "cap-manage-social" },
  { file: "harry.mov", capId: "cap-track" },
];

// Single arg = upload only that file (case-insensitive name match without extension)
const onlyArg = process.argv[2]?.toLowerCase().replace(/\.[^.]+$/, "");
const targets = onlyArg ? mapping.filter(m => m.file.toLowerCase().replace(/\.[^.]+$/, "") === onlyArg) : mapping;
if (!targets.length) { console.error(`No file matched: ${onlyArg}`); process.exit(1); }

const client = createClient({
  projectId: PROJECT_ID, dataset: DATASET, apiVersion: "2024-01-01",
  token: TOKEN, useCdn: false,
});

for (const { file, capId } of targets) {
  const fullPath = path.join(ASSET_DIR, file);
  if (!fs.existsSync(fullPath)) { console.error(`Missing: ${fullPath}`); continue; }
  const stats = fs.statSync(fullPath);
  const sizeMb = (stats.size / 1024 / 1024).toFixed(2);
  console.log(`\n[${file}] uploading ${sizeMb} MB → ${capId} ...`);

  const stream = fs.createReadStream(fullPath);
  const asset = await client.assets.upload("file", stream, {
    filename: file,
    contentType: "video/quicktime",
  });
  console.log(`  asset _id: ${asset._id}  url: ${asset.url}`);

  await client.patch(capId).set({
    video: { _type: "file", asset: { _type: "reference", _ref: asset._id } },
  }).commit();
  console.log(`  patched ${capId} ✓`);
}

console.log("\nDone. Site rebuilds via Sanity → Vercel webhook in ~2 min.");
