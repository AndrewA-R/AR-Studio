import { defineField, defineType } from "sanity";

// Singleton — homepage copy. The Studio enforces single-doc via structure.ts.
export const homepage = defineType({
  name: "homepage",
  title: "Homepage",
  type: "document",
  fields: [
    defineField({ name: "heroLede", title: "Hero lede (italic)", type: "text", rows: 3 }),
    defineField({ name: "heroLedeAccent", title: "Hero lede — accent line (purple italic)", type: "string" }),
    defineField({ name: "heroBody", title: "Hero body paragraph", type: "text", rows: 4 }),
    defineField({ name: "carouselThesis", title: "Carousel thesis (display)", type: "text", rows: 2 }),
    defineField({ name: "carouselThesisAccent", title: "Carousel thesis — italic accent clause", type: "text", rows: 2 }),
    defineField({ name: "carouselBodyTop", title: "Carousel body — top paragraph", type: "text", rows: 5 }),
    defineField({ name: "carouselBodyBottom", title: "Carousel body — bottom paragraph", type: "text", rows: 4 }),
    defineField({ name: "carouselKickerRight", title: "Carousel section — kicker bar (right side)", type: "text", rows: 2,
      description: "Top-right of the Carousel section, opposite '§ What sets us apart'. Newlines preserved." }),
    defineField({ name: "carouselClosingQuote", title: "Carousel section — closing italic quote", type: "text", rows: 2,
      description: "Shown above the 'Tour Carousel' button. e.g. 'No other studio our size has built one. That is the point.'" }),
    defineField({ name: "thesisHeading", title: "Why A+R exists — heading", type: "text", rows: 4 }),
    defineField({ name: "thesisHeadingAccent", title: "Why A+R exists — italic accent clause", type: "string" }),
    defineField({ name: "thesisBodyTop", title: "Why A+R exists — first paragraph (left column)", type: "text", rows: 5 }),
    defineField({ name: "thesisBodyBottom", title: "Why A+R exists — second paragraph (left column)", type: "text", rows: 5 }),
    defineField({ name: "fractures", title: "The fractures (numbered list on dark)", type: "array",
      of: [{ type: "object", fields: [
        { name: "label", type: "string", title: "Bold label" },
        { name: "rest", type: "string", title: "Rest of line (after em-dash)" },
      ], preview: { select: { title: "label", subtitle: "rest" } } }],
      validation: r => r.max(8) }),
    defineField({ name: "rosterHeadline", title: "Roster headline", type: "text", rows: 3 }),
    defineField({ name: "rosterHeadlineAccent", title: "Roster headline — italic accent clause", type: "string" }),
    defineField({ name: "rosterCopy", title: "Roster intro copy", type: "text", rows: 4 }),
    defineField({ name: "foundersHeadline", title: "Founders headline", type: "text", rows: 3 }),
    defineField({ name: "foundersHeadlineAccent", title: "Founders headline — italic accent", type: "string" }),
    defineField({ name: "foundersCopy", title: "Founders intro copy", type: "text", rows: 5 }),
    defineField({ name: "forthcomingArticle", title: "Forthcoming article (linked)", type: "reference", to: [{ type: "article" }] }),
  ],
});
