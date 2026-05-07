import { defineField, defineType } from "sanity";

// Singleton — /carousel page hero copy. Studio enforces single-doc via structure.ts.
export const carouselPage = defineType({
  name: "carouselPage",
  title: "Carousel page",
  type: "document",
  fields: [
    defineField({
      name: "kicker",
      title: "Kicker (top label, e.g. '§ Carousel · v3.4')",
      type: "string",
    }),
    defineField({
      name: "heroHeading",
      title: "Hero headline",
      description: "Set in regular Instrument Serif. e.g. 'The operating system.'",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "heroHeadingAccent",
      title: "Hero headline — italic accent clause",
      description: "Italic, purple. e.g. 'Built so a small team can ship like a large one.'",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "heroLede",
      title: "Hero lede paragraph",
      type: "text",
      rows: 5,
    }),
  ],
});
