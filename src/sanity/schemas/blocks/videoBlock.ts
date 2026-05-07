/**
 * videoBlock — full-bleed (or contained) looping video section, with an
 * optional kicker / title / lede header above and an optional caption below.
 *
 * Plays muted, autoplays, loops, playsInline — same constraints as the
 * carousel-capability and gallery videos.
 */
import { defineField, defineType } from "sanity";

export default defineType({
  name: "videoBlock",
  title: "Video",
  type: "object",
  fields: [
    defineField({ name: "kicker", title: "Kicker", type: "string", initialValue: "Watch" }),
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({ name: "lede", title: "Lede", type: "text", rows: 3 }),

    defineField({ name: "video", title: "Video", type: "file",
      options: { accept: "video/mp4,video/webm,video/quicktime" },
      validation: (r) => r.required() }),
    defineField({ name: "poster", title: "Poster image (fallback)", type: "image",
      options: { hotspot: true },
      description: "Optional. Shown before the video loads, or if the video fails." }),

    defineField({ name: "ratio", title: "Aspect ratio", type: "string",
      options: { list: ["21/9", "16/9", "1/1", "4/5", "3/4", "9/16"] }, initialValue: "16/9",
      description: "Wide → tall. Use 9/16 for vertical phone-format clips." }),
    defineField({ name: "fullBleed", title: "Full-bleed", type: "boolean", initialValue: false,
      description: "When true, video extends edge-to-edge. When false, sits within the page container." }),
    defineField({ name: "caption", title: "Caption", type: "string",
      description: "Mono caption shown below the video." }),
  ],
  preview: {
    select: { title: "title", subtitle: "caption" },
    prepare: ({ title, subtitle }) => ({
      title: title ?? "(untitled video)",
      subtitle: subtitle ? `↳ Video — ${subtitle}` : "↳ Video block",
    }),
  },
});
