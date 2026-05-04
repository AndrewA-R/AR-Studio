import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Site title", type: "string" }),
    defineField({ name: "description", title: "Default meta description", type: "text", rows: 2 }),
    defineField({ name: "tagline", title: "Masthead tagline", type: "string",
      description: "Right-side meta on the masthead. e.g. 'Integrated marketing, on one team'" }),
    defineField({ name: "footerSignoff", title: "Footer sign-off line 1", type: "string" }),
    defineField({ name: "footerSignoffAccent", title: "Footer sign-off line 2 (italic accent)", type: "string" }),
    defineField({ name: "ogImage", title: "Default OpenGraph image", type: "image" }),
  ],
});
