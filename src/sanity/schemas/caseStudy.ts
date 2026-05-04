import { defineField, defineType } from "sanity";

export const caseStudy = defineType({
  name: "caseStudy",
  title: "Case study",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Internal title", type: "string", validation: r => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" }, validation: r => r.required() }),
    defineField({ name: "caseNumber", title: "Case number (e.g. 01)", type: "string" }),
    defineField({ name: "client", title: "Client name", type: "string", validation: r => r.required() }),
    defineField({ name: "tier", title: "Engagement tier", type: "string",
      options: { list: ["Ownership tier", "Campaigns tier", "Planning tier"] } }),
    defineField({ name: "sector", title: "Sector", type: "string", description: "e.g. Retail · Tools" }),
    defineField({ name: "dates", title: "Engagement dates", type: "string", description: "e.g. 2024 – present" }),
    defineField({ name: "headline", title: "Tile headline", type: "text", rows: 2,
      description: "Shown on homepage tile + case page hero" }),
    defineField({ name: "result", title: "Result line", type: "string",
      description: "Short, comma-separated. e.g. 3× Q4 lift · 2.5× Cyberweek YoY" }),
    defineField({ name: "heroImage", title: "Hero image", type: "image", options: { hotspot: true } }),
    defineField({ name: "clientLogo", title: "Client logo", type: "image",
      description: "Used on the homepage tile plate. Use a knockout/white version if logoIsWhite is true." }),
    defineField({ name: "logoIsWhite", title: "Logo is already white?", type: "boolean", initialValue: false }),
    defineField({ name: "body", title: "Case body", type: "array", of: [
      { type: "block" },
      { type: "image", options: { hotspot: true }, fields: [{ name: "alt", type: "string", title: "Alt text" }] },
    ]}),
    defineField({ name: "featured", title: "Show on homepage?", type: "boolean", initialValue: true }),
    defineField({ name: "order", title: "Display order on homepage", type: "number" }),
  ],
  orderings: [{ title: "Display order", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "client", subtitle: "tier", media: "heroImage" } },
});
