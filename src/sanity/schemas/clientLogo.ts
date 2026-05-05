import { defineField, defineType } from "sanity";

export const clientLogo = defineType({
  name: "clientLogo",
  title: "Client (logo wall)",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: r => r.required() }),
    defineField({ name: "logo", type: "image", description: "Greyscale + dark on light works best — site inverts to white." }),
    defineField({ name: "opticalScale", title: "Optical scale", type: "number",
      description: "1.0 is the baseline. Square / detailed logos look small at 1.0 — bump to 1.3–1.7. Very wide wordmarks (Aiir, ecoATM) look oversized — drop to 0.7–0.9. Step in 0.1.",
      initialValue: 1 }),
    defineField({ name: "order", type: "number" }),
  ],
  orderings: [{ title: "Display order", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "name", media: "logo" } },
});
