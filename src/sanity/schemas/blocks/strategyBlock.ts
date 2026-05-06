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
    defineField({
      name: 'framework', title: 'Framework rows', type: 'array',
      description: 'Optional table — typical labels: Audience, Promise, Mechanic, Tone.',
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
