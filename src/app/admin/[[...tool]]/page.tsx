"use client";
// Embedded Sanity Studio — lives at /admin. SPA routing handled by Sanity itself.
import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
