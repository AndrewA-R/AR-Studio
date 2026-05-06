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
      name: 'layoutSlots', title: 'Layout templates', type: 'array',
      of: [{type: 'string'}],
      description: 'Short labels for layout thumbnails, e.g. "T1", "T2", "T3".',
    }),
  ],
  preview: {
    select: {title: 'title'},
    prepare: ({title}) => ({title: title ?? '(untitled brand system)', subtitle: '↳ Brand system block'}),
  },
});
