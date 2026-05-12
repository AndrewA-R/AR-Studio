import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "seo",     title: "SEO & Social" },
  ],
  fields: [
    defineField({ name: "title", title: "Site title", type: "string", group: "content" }),
    defineField({ name: "tagline", title: "Masthead tagline", type: "string", group: "content",
      description: "Right-side meta on the masthead. e.g. 'Integrated marketing, on one team'" }),
    defineField({ name: "footerSignoff", title: "Footer sign-off line 1", type: "string", group: "content" }),
    defineField({ name: "footerSignoffAccent", title: "Footer sign-off line 2 (italic accent)", type: "string", group: "content" }),

    // ── SEO defaults (used when a page has no per-page override) ──────
    defineField({ name: "seoTitle", title: "Default SEO title", type: "string", group: "seo",
      description: "Default <title> + LinkedIn/Twitter card title. Used on pages with no per-page override." }),
    defineField({ name: "description", title: "Default meta description", type: "text", rows: 2, group: "seo",
      description: "Default meta description + LinkedIn/Twitter card description." }),
    defineField({ name: "ogImage", title: "Default OpenGraph image", type: "image", group: "seo",
      description: "1200×630 PNG/JPG. Shown when someone shares a link on LinkedIn, Twitter, Slack, iMessage, etc." }),
  ],
});
