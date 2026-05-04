import { defineField, defineType } from "sanity";

// One row of the Carousel "what it does" capability strip on /carousel.
// Layout alternates text↔video automatically by display order.
export const carouselCapability = defineType({
  name: "carouselCapability",
  title: "Carousel capability (capability row)",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Heading", type: "string", validation: r => r.required(),
      description: "e.g. Build Campaigns, Execute Creative, Plan Media" }),
    defineField({ name: "summary", title: "Body copy", type: "text", rows: 4 }),
    defineField({ name: "video", title: "Looping video", type: "file",
      options: { accept: "video/mp4,video/webm" },
      description: "Short looping clip. MP4 or WebM. Plays muted, autoplay, loop." }),
    defineField({ name: "poster", title: "Poster image (fallback)", type: "image", options: { hotspot: true },
      description: "Optional. Shown before the video loads or if no video is set." }),
    defineField({ name: "order", title: "Display order", type: "number" }),
  ],
  orderings: [{ title: "Display order", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "title", subtitle: "summary", media: "poster" } },
});
