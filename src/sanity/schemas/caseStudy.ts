/**
 * caseStudy — top-level document for a case study page.
 *
 * Composition: every case is a Masthead followed by an ordered array of
 * typed body blocks (metricsBlock, strategyBlock, diagnosisBlock,
 * galleryBlock, quoteBlock, brandSystemBlock). Numbering is auto-derived
 * from block position at render time — authors never renumber.
 */
import { defineField, defineType } from "sanity";

export const caseStudy = defineType({
  name: "caseStudy",
  title: "Case study",
  type: "document",
  groups: [
    { name: "masthead", title: "Masthead", default: true },
    { name: "body",     title: "Body" },
    { name: "tile",     title: "Homepage tile" },
    { name: "meta",     title: "Meta" },
  ],
  fields: [
    // ── Masthead ──────────────────────────────────────────────────────
    defineField({ name: "caseNo", title: "Case number", type: "string", group: "masthead",
      description: 'Two-digit string, e.g. "01". Used in the masthead chrome.',
      validation: (r) => r.regex(/^\d{2}$/, { name: "two digits" }) }),
    defineField({ name: "sector", title: "Sector", type: "string", group: "masthead",
      description: 'e.g. "Retail · Tools"' }),
    defineField({ name: "tier", title: "Engagement tier", type: "string", group: "masthead",
      options: { list: ["Ownership tier", "Campaigns tier", "Advisory tier"] } }),
    defineField({ name: "dates", title: "Dates", type: "string", group: "masthead",
      description: 'e.g. "2025" or "Jan – Apr 2026"' }),
    defineField({ name: "wordmark", title: "Wordmark", type: "string", group: "masthead",
      description: "Client name as displayed in the masthead." }),
    defineField({ name: "logo", title: "Client logo", type: "image", group: "masthead",
      options: { hotspot: true } }),

    defineField({ name: "headline", title: "Headline (roman)", type: "string", group: "masthead",
      description: "First line of the masthead title." }),
    defineField({ name: "italic", title: "Headline (italic)", type: "string", group: "masthead",
      description: "Second line — rendered italic. Optional." }),
    defineField({ name: "lede", title: "Lede", type: "text", rows: 4, group: "masthead" }),

    defineField({ name: "heroImage", title: "Hero image", type: "image", group: "masthead",
      options: { hotspot: true },
      description: "Use Hero image OR Hero video. If both are set, the video wins." }),
    defineField({ name: "heroVideo", title: "Hero video", type: "file", group: "masthead",
      options: { accept: "video/mp4,video/webm,video/quicktime" },
      description: "Looping clip for the masthead. MP4 / WebM / MOV. Plays muted, autoplay, loop, playsInline." }),

    defineField({ name: "atGlance", title: "At a glance", type: "array", group: "masthead",
      description: "Key/value rows shown in the purple plate. Keep to 4 rows.",
      of: [{
        type: "object",
        name: "glanceRow",
        fields: [
          { name: "k", title: "Label", type: "string" },
          { name: "v", title: "Value", type: "string" },
        ],
        preview: { select: { title: "k", subtitle: "v" } },
      }],
      validation: (r) => r.max(4) }),

    // ── Body ──────────────────────────────────────────────────────────
    defineField({ name: "body", title: "Body blocks", type: "array", group: "body",
      description: "Drag in any combination of block types in any order. Numbering is automatic.",
      of: [
        { type: "metricsBlock" },
        { type: "strategyBlock" },
        { type: "brandSystemBlock" },
        { type: "galleryBlock" },
        { type: "videoBlock" },
        { type: "quoteBlock" },
        { type: "diagnosisBlock" },
      ] }),

    // ── Homepage tile (separate from masthead — short hooks) ─────────
    defineField({ name: "tileHeadline", title: "Tile headline", type: "text", rows: 2, group: "tile",
      description: "Short 1–2 sentence hook for the homepage Work tile. Falls back to masthead headline if blank." }),
    defineField({ name: "tileResult", title: "Tile result line", type: "string", group: "tile",
      description: 'Comma-separated outcomes shown next to the tile, e.g. "3× Q4 lift · 2.5× Cyberweek YoY · 200+ assets".' }),

    // ── Meta ──────────────────────────────────────────────────────────
    defineField({ name: "slug", title: "Slug", type: "slug", group: "meta",
      options: { source: "wordmark", maxLength: 60 },
      validation: (r) => r.required() }),
    defineField({ name: "order", title: "Sort order", type: "number", group: "meta",
      description: "Lower numbers surface first on the work index." }),
    defineField({ name: "featured", title: "Featured on homepage", type: "boolean", group: "meta",
      initialValue: false }),

    // ── SEO / Social link previews ───────────────────────────────────
    defineField({ name: "seoTitle", title: "SEO title", type: "string", group: "meta",
      description: "Overrides the default <title> + LinkedIn/Twitter card title for this case. Falls back to '<wordmark> — Case study'." }),
    defineField({ name: "seoDescription", title: "SEO description", type: "text", rows: 2, group: "meta",
      description: "Overrides the meta description + social card description. Falls back to the masthead lede." }),
    defineField({ name: "ogImage", title: "OG image", type: "image", group: "meta",
      description: "1200×630. Overrides the default site OG image for shares of this case's URL. Falls back to the hero image." }),
  ],
  orderings: [
    { title: "Sort order",  name: "orderAsc",  by: [{ field: "order",  direction: "asc" }] },
    { title: "Case number", name: "caseNoAsc", by: [{ field: "caseNo", direction: "asc" }] },
  ],
  preview: {
    select: { title: "wordmark", subtitle: "sector", media: "heroImage" },
  },
});
