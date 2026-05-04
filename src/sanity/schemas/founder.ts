import { defineField, defineType } from "sanity";

export const founder = defineType({
  name: "founder",
  title: "Founder",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: r => r.required() }),
    defineField({ name: "role", type: "string", description: "e.g. Founding principal · Brand + strategy" }),
    defineField({ name: "headshot", type: "image", options: { hotspot: true } }),
    defineField({ name: "bio", title: "Bio (italic line on homepage)", type: "text", rows: 4 }),
    defineField({ name: "order", type: "number" }),
  ],
  orderings: [{ title: "Display order", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "name", subtitle: "role", media: "headshot" } },
});
