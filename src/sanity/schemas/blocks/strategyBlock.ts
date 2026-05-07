/**
 * strategyBlock — renders <CaseStrategy />.
 *
 * The argument-text section. Optional positioning pull-quote and an
 * optional 4-row framework table (audience / promise / mechanic / etc).
 */
import {defineField, defineType} from 'sanity';

export default defineType({
  name: 'strategyBlock',
  title: 'Strategy',
  type: 'object',
  fields: [
    defineField({name: 'kicker', title: 'Kicker', type: 'string', initialValue: 'Strategy'}),
    defineField({name: 'title',  title: 'Title',  type: 'string'}),
    defineField({name: 'body',   title: 'Body',   type: 'text', rows: 8}),
    defineField({name: 'positioning', title: 'Positioning pull', type: 'string',
      description: 'One-sentence positioning line, set big in italic. Optional.'}),
    defineField({name: 'image', title: 'Right-side image', type: 'image', options: {hotspot: true},
      description: 'Optional. If set, renders on the right column in place of the Framework table.'}),
    defineField({name: 'imageRatio', title: 'Image aspect ratio', type: 'string',
      options: {list: ['21/9', '16/9', '4/3', '1/1', '4/5', '3/4', '9/16']}, initialValue: '4/5',
      description: 'Only used when an image is uploaded.'}),
    defineField({name: 'imageCaption', title: 'Image caption', type: 'string'}),
    defineField({name: 'flip', title: 'Flip layout (image left, text right)', type: 'boolean',
      initialValue: false,
      description: 'Default: text left, image/framework right. Turn on to swap columns.'}),
    defineField({
      name: 'framework', title: 'Framework rows', type: 'array',
      description: 'Optional table — typical labels: Audience, Promise, Mechanic, Tone. Hidden when an image is uploaded.',
      validation: (r) => r.max(6),
      of: [{
        type: 'object',
        name: 'frameworkRow',
        fields: [
          {name: 'label', title: 'Label', type: 'string'},
          {name: 'lines', title: 'Lines', type: 'array', of: [{type: 'string'}],
            description: 'One or more short lines stacked under the label.'},
        ],
        preview: {
          select: {label: 'label', lines: 'lines'},
          prepare: ({label, lines}) => ({title: label, subtitle: (lines ?? []).join(' · ')}),
        },
      }],
    }),
  ],
  preview: {
    select: {title: 'title'},
    prepare: ({title}) => ({title: title ?? '(untitled strategy)', subtitle: '↳ Strategy block'}),
  },
});
