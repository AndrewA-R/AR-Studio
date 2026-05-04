import { defineField, defineType } from "sanity";

export const service = defineType({
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: r => r.required() }),
    defineField({ name: "tier", type: "string", description: "Planning / Campaigns / Ownership" }),
    defineField({ name: "summary", type: "text", rows: 3 }),
    defineField({ name: "body", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "order", type: "number" }),
  ],
  orderings: [{ title: "Display order", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "title", subtitle: "tier" } },
});
