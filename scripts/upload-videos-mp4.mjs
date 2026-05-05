// Re-upload the converted MP4s and re-point each carouselCapability doc.
import fs from "node:fs";
import path from "node:path";
import { createClient } from "@sanity/client";

const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const TOKEN = process.env.SANITY_API_READ_TOKEN;
if (!PROJECT_ID || !TOKEN) { console.error("Missing PROJECT_ID or TOKEN"); process.exit(1); }

const ASSET_DIR = "/tmp/carousel-mp4";
const mapping = [
  { file: "Draper.mp4", capId: "cap-build" },
  { file: "Peggy.mp4", capId: "cap-execute" },
  { file: "Pima.mp4", capId: "cap-plan-media" },
  { file: "Paul.mp4", capId: "cap-deploy-email" },
  { file: "Rachel.mp4", capId: "cap-manage-social" },
  { file: "harry.mp4", capId: "cap-track" },
];

const client = createClient({
  projectId: PROJECT_ID, dataset: DATASET, apiVersion: "2024-01-01",
  token: TOKEN, useCdn: false,
});

for (const { file, capId } of mapping) {
  const fullPath = path.join(ASSET_DIR, file);
  const sizeMb = (fs.statSync(fullPath).size / 1024 / 1024).toFixed(2);
  console.log(`\n[${file}] uploading ${sizeMb} MB → ${capId} ...`);
  const stream = fs.createReadStream(fullPath);
  const asset = await client.assets.upload("file", stream, {
    filename: file,
    contentType: "video/mp4",
  });
  console.log(`  asset _id: ${asset._id}`);
  await client.patch(capId).set({
    video: { _type: "file", asset: { _type: "reference", _ref: asset._id } },
  }).commit();
  console.log(`  patched ${capId} ✓`);
}
console.log("\nDone.");
