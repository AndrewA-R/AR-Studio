/**
 * brandSystemBlock — renders <CaseBrandSystem />.
 *
 * Compact visual of the brand system: palette swatches, a display/body
 * type pair, and a small set of layout-template thumbnails.
 */
import {defineField, defineType} from 'sanity';

export default defineType({
  name: 'brandSystemBlock',
  title: 'Brand system',
  type: 'object',
  fields: [
    defineField({name: 'kicker', title: 'Kicker', type: 'string', initialValue: 'The system'}),
    defineField({name: 'title',  title: 'Title',  type: 'string'}),
    defineField({name: 'body',   title: 'Body',   type: 'text', rows: 4}),

    defineField({
      name: 'palette', title: 'Palette', type: 'array',
      validation: (r) => r.max(6),
      of: [{
        type: 'object',
        name: 'swatch',
        fields: [
          {name: 'name', title: 'Name', type: 'string'},
          {name: 'hex',  title: 'Hex',  type: 'string', description: 'e.g. "#3D2B22"'},
          {name: 'fg',   title: 'Foreground hex', type: 'string',
            description: 'Text color used on top of this swatch in the chip.'},
        ],
        preview: {select: {title: 'name', subtitle: 'hex'}},
      }],
    }),

    defineField({
      name: 'typography', title: 'Typography', type: 'object',
      fields: [
        {name: 'display', title: 'Display', type: 'object', fields: [
          {name: 'family', title: 'CSS family', type: 'string', description: 'e.g. \'"Instrument Serif", serif\''},
          {name: 'italic', title: 'Italic',     type: 'boolean'},
          {name: 'sample', title: 'Sample glyph', type: 'string', initialValue: 'Aa'},
          {name: 'label',  title: 'Label',     type: 'string'},
        ]},
        {name: 'body', title: 'Body', type: 'object', fields: [
          {name: 'family', title: 'CSS family', type: 'string'},
          {name: 'sample', title: 'Sample sentence', type: 'string'},
          {name: 'label',  title: 'Label', type: 'string'},
        ]},
      ],
    }),

    defineField({
      name: 'logoSample', title: 'Logo / wordmark sample', type: 'image',
      options: {hotspot: true},
      description: 'Top-left thumbnail in the system grid. Falls back to a placeholder if blank.',
    }),

    defineField({
      name: 'templates', title: 'Layout templates', type: 'array',
      description: 'Three layout thumbnails. Each shows the image you upload, or a labelled placeholder if no image is set.',
      validation: (r) => r.max(6),
      of: [{
        type: 'object',
        name: 'template',
        fields: [
          {name: 'label', title: 'Label', type: 'string', description: 'Shown on the placeholder when no image / video is uploaded. e.g. "T1".'},
          {name: 'image', title: 'Image', type: 'image', options: {hotspot: true}},
          {name: 'video', title: 'Video', type: 'file',
            options: {accept: 'video/mp4,video/webm,video/quicktime'},
            description: 'Looping clip. If both image and video are set, video wins.'},
          {name: 'caption', title: 'Caption', type: 'string'},
        ],
        preview: {select: {title: 'label', subtitle: 'caption', media: 'image'}},
      }],
    }),

    // Legacy — kept readable so existing data isn't lost. Hidden once
    // templates is populated.
    defineField({
      name: 'layoutSlots', title: 'Layout slot labels (legacy)', type: 'array',
      of: [{type: 'string'}],
      description: 'Old shape — labels only, no images. New work should use the Layout templates field above.',
      hidden: (ctx: { parent?: { templates?: unknown[] } }) =>
        Array.isArray(ctx.parent?.templates) && (ctx.parent?.templates?.length ?? 0) > 0,
    }),
  ],
  preview: {
    select: {title: 'title'},
    prepare: ({title}) => ({title: title ?? '(untitled brand system)', subtitle: '↳ Brand system block'}),
  },
});
