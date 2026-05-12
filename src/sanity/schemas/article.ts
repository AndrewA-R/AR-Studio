import { defineField, defineType } from "sanity";

export const article = defineType({
  name: "article",
  title: "Essay",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: r => r.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "title" }, validation: r => r.required() }),
    defineField({ name: "number", title: "Essay number (e.g. 04)", type: "string" }),
    defineField({ name: "tag", title: "Category tag", type: "string",
      options: { list: ["Strategy", "Operations", "Industry", "Manifesto", "Craft"] } }),
    defineField({ name: "readTime", title: "Read time (e.g. 8 min)", type: "string" }),
    defineField({ name: "publishedAt", title: "Published at", type: "datetime" }),
    defineField({ name: "status", title: "Status", type: "string",
      options: { list: ["draft", "forthcoming", "published"] }, initialValue: "draft" }),
    defineField({ name: "author", title: "Author byline", type: "string",
      description: "Shown under the title on the essay page. Defaults to 'Andrew Cagan' if left blank." }),
    defineField({ name: "excerpt", title: "Excerpt", type: "text", rows: 3 }),
    defineField({ name: "body", title: "Body", type: "array", of: [
      { type: "block" },
      { type: "image", options: { hotspot: true }, fields: [{ name: "alt", type: "string" }] },
    ]}),

    // ── SEO / Social link previews ───────────────────────────────────
    defineField({ name: "seoTitle", title: "SEO title", type: "string",
      description: "Overrides <title> + LinkedIn/Twitter card title for this essay. Falls back to the essay title." }),
    defineField({ name: "seoDescription", title: "SEO description", type: "text", rows: 2,
      description: "Overrides the meta description + social card description. Falls back to the excerpt." }),
    defineField({ name: "ogImage", title: "OG image", type: "image",
      description: "1200×630. Overrides the default site OG image for shares of this essay's URL." }),
  ],
  orderings: [{ title: "Newest first", name: "publishedDesc", by: [{ field: "publishedAt", direction: "desc" }] }],
  preview: { select: { title: "title", subtitle: "tag" } },
});
