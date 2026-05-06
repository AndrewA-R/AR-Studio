/**
 * galleryBlock — renders <CaseGallery />.
 *
 * Two modes:
 *   • Flat — `items` array, each with span (1–12) and ratio (16/9, 4/5, 1/1).
 *   • Chaptered — `chapters` array, each with its own title/note + items.
 *
 * The frontend should detect whether `chapters` is present and switch modes.
 * If both are present, `chapters` wins.
 */
import {defineField, defineType} from 'sanity';

const galleryItemFields = [
  {name: 'image',   title: 'Image',   type: 'image', options: {hotspot: true}},
  {name: 'span',    title: 'Column span', type: 'number',
    description: '1–12. Typical: 4 (third), 6 (half), 8 (two-thirds), 12 (full).',
    validation: (r: any) => r.min(1).max(12), initialValue: 4},
  {name: 'ratio',   title: 'Aspect ratio', type: 'string',
    options: {list: ['16/9', '4/5', '1/1', '3/4', '21/9']}, initialValue: '4/5'},
  {name: 'caption', title: 'Caption', type: 'string'},
  {name: 'label',   title: 'Placeholder label', type: 'string',
    description: 'Shown when no image is uploaded yet, e.g. "A1", "01".'},
];

export default defineType({
  name: 'galleryBlock',
  title: 'Gallery',
  type: 'object',
  fields: [
    defineField({name: 'kicker', title: 'Kicker', type: 'string', initialValue: 'Selected work'}),
    defineField({name: 'title',  title: 'Title',  type: 'string'}),
    defineField({name: 'lede',   title: 'Lede',   type: 'text', rows: 3}),

    defineField({
      name: 'items', title: 'Items (flat)', type: 'array',
      description: 'Use for a single-chapter gallery. Leave blank if using Chapters below.',
      of: [{
        type: 'object',
        name: 'galleryItem',
        // @ts-ignore — Sanity accepts plain field arrays here
        fields: galleryItemFields,
        preview: {
          select: {caption: 'caption', label: 'label', media: 'image'},
          prepare: ({caption, label, media}) => ({title: caption ?? label ?? '(item)', media}),
        },
      }],
    }),

    defineField({
      name: 'chapters', title: 'Chapters', type: 'array',
      description: 'Use for multi-phase galleries (e.g. Phase 01 / Phase 02). Overrides flat items.',
      of: [{
        type: 'object',
        name: 'galleryChapter',
        fields: [
          {name: 'title', title: 'Chapter title', type: 'string'},
          {name: 'note',  title: 'Chapter note',  type: 'string', description: 'e.g. "International · Jan – Mar 2026"'},
          {name: 'items', title: 'Items', type: 'array', of: [{
            type: 'object',
            name: 'galleryItem',
            // @ts-ignore
            fields: galleryItemFields,
          }]},
        ],
        preview: {select: {title: 'title', subtitle: 'note'}},
      }],
    }),
  ],
  preview: {
    select: {title: 'title'},
    prepare: ({title}) => ({title: title ?? '(untitled gallery)', subtitle: '↳ Gallery block'}),
  },
});
