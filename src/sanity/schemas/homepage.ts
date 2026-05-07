import { defineField, defineType } from "sanity";

// Singleton — homepage copy. The Studio enforces single-doc via structure.ts.
//
// Field order below mirrors the order sections appear on the live site:
//   1. Hero  →  2. Why A+R exists  →  3. Carousel  →  4. The studio
//   →  5. Brands we've worked with  →  6. Thinking (forthcoming card)
// Fieldsets give each section a collapsible header in Studio so editing
// any one section feels like editing that section on the page.
export const homepage = defineType({
  name: "homepage",
  title: "Homepage",
  type: "document",
  fieldsets: [
    { name: "hero",      title: "1. Hero",                  options: { collapsible: true, collapsed: false } },
    { name: "thesis",    title: "2. Why A+R exists",        options: { collapsible: true, collapsed: true } },
    { name: "carousel",  title: "3. Carousel",              options: { collapsible: true, collapsed: true } },
    { name: "founders",  title: "4. The studio",            options: { collapsible: true, collapsed: true } },
    { name: "roster",    title: "5. Brands we've worked with", options: { collapsible: true, collapsed: true } },
    { name: "thinking",  title: "6. Thinking (forthcoming card)", options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    // 1. Hero
    defineField({ name: "heroLede",       title: "Hero lede (italic)",                          type: "text",   rows: 3, fieldset: "hero" }),
    defineField({ name: "heroLedeAccent", title: "Hero lede — accent line (purple italic)",     type: "string", fieldset: "hero" }),
    defineField({ name: "heroBody",       title: "Hero body paragraph",                         type: "text",   rows: 4, fieldset: "hero" }),

    // 2. Why A+R exists
    defineField({ name: "thesisHeading",       title: "Heading",                       type: "text",   rows: 4, fieldset: "thesis" }),
    defineField({ name: "thesisHeadingAccent", title: "Heading — italic accent clause", type: "string", fieldset: "thesis" }),
    defineField({
      name: "thesisBodyTop",
      title: "Indictment paragraphs",
      description: "The two paragraphs of indictment prose that follow the headline. Separate paragraphs with a blank line.",
      type: "text", rows: 8, fieldset: "thesis",
    }),
    defineField({
      name: "thesisPivot",
      title: "Pivot line",
      description: "Single italic line above the rebuttals. e.g. 'A+R was built as a counter-argument to all of this.'",
      type: "text", rows: 2, fieldset: "thesis",
    }),
    defineField({
      name: "thesisRebuttals",
      title: "Rebuttal rows",
      description: "Each row has a serif lead + a smaller tail. Recommend 4 rows.",
      type: "array", fieldset: "thesis",
      of: [{
        type: "object",
        fields: [
          { name: "lead", type: "string", title: "Lead (serif, bold visual weight)" },
          { name: "tail", type: "string", title: "Tail (smaller body line)" },
        ],
        preview: { select: { title: "lead", subtitle: "tail" } },
      }],
      validation: r => r.max(8),
    }),
    defineField({
      name: "thesisBodyBottom",
      title: "Second paragraph (currently unused)",
      description: "Not rendered on the live site since the section was redesigned. Held here in case you want it back. Use 'Rebuttal rows' above instead.",
      type: "text", rows: 5, fieldset: "thesis",
    }),
    defineField({
      name: "fractures",
      title: "The fractures (currently unused)",
      description: "Not rendered on the live site. Held here in case we bring back the numbered list in a future module — your data is safe.",
      type: "array",
      fieldset: "thesis",
      of: [{ type: "object", fields: [
        { name: "label", type: "string", title: "Bold label" },
        { name: "rest",  type: "string", title: "Rest of line (after em-dash)" },
      ], preview: { select: { title: "label", subtitle: "rest" } } }],
      validation: r => r.max(8),
    }),

    // 3. Carousel
    defineField({ name: "carouselThesis",       title: "Thesis (display)",              type: "text",   rows: 2, fieldset: "carousel" }),
    defineField({ name: "carouselThesisAccent", title: "Thesis — italic accent clause", type: "text",   rows: 2, fieldset: "carousel" }),
    defineField({ name: "carouselBodyTop",      title: "Body — top paragraph",          type: "text",   rows: 5, fieldset: "carousel" }),
    defineField({ name: "carouselBodyBottom",   title: "Body — bottom paragraph",       type: "text",   rows: 4, fieldset: "carousel" }),
    defineField({ name: "carouselKickerRight",  title: "Kicker bar (right side)",       type: "text",   rows: 2, fieldset: "carousel",
      description: "Top-right of the Carousel section, opposite '§ What sets us apart'. Newlines preserved." }),
    defineField({ name: "carouselClosingQuote", title: "Closing italic quote",          type: "text",   rows: 2, fieldset: "carousel",
      description: "Shown above the 'Tour Carousel' button." }),

    // 4. The studio (founders)
    defineField({ name: "foundersHeadline",       title: "Headline",                  type: "text",   rows: 3, fieldset: "founders" }),
    defineField({ name: "foundersHeadlineAccent", title: "Headline — italic accent",  type: "string", fieldset: "founders" }),
    defineField({ name: "foundersCopy",           title: "Intro copy",                type: "text",   rows: 5, fieldset: "founders" }),

    // 5. Brands (roster)
    defineField({ name: "rosterHeadline",       title: "Headline",                  type: "text",   rows: 3, fieldset: "roster" }),
    defineField({ name: "rosterHeadlineAccent", title: "Headline — italic accent",  type: "string", fieldset: "roster" }),
    defineField({ name: "rosterCopy",           title: "Intro copy",                type: "text",   rows: 4, fieldset: "roster" }),

    // 6. Thinking — forthcoming card
    defineField({
      name: "forthcomingArticle",
      title: "Forthcoming article (preview card)",
      description: "Standalone teaser shown above the archive on /thinking. Fill in to show the card; clear all fields to hide it. No link to a real Article doc — just metadata.",
      type: "object",
      fieldset: "thinking",
      fields: [
        { name: "title",    title: "Title",            type: "string" },
        { name: "number",   title: "Essay number (e.g. 04)", type: "string" },
        { name: "tag",      title: "Category tag",     type: "string",
          options: { list: ["Strategy", "Operations", "Industry", "Manifesto", "Craft"] } },
        { name: "readTime", title: "Read time / release line",
          description: "e.g. \"publishes May 2026\" or \"8 min\"",
          type: "string" },
      ],
      options: { collapsible: true, collapsed: false },
    }),
  ],
});
