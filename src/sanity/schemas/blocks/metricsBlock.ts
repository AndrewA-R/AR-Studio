/**
 * metricsBlock — renders <CaseMetrics />.
 *
 * Three numbers, each with a number, unit, label, and supporting note.
 * Use sparingly — one or two per case at most.
 */
import {defineField, defineType} from 'sanity';

export default defineType({
  name: 'metricsBlock',
  title: 'Metrics',
  type: 'object',
  fields: [
    defineField({name: 'kicker', title: 'Kicker', type: 'string', initialValue: 'The result',
      description: 'Small uppercase label above the title. e.g. "The signal", "The result".'}),
    defineField({name: 'title',  title: 'Title',  type: 'string'}),
    defineField({name: 'lede',   title: 'Lede',   type: 'text', rows: 3}),
    defineField({
      name: 'items', title: 'Metrics', type: 'array',
      validation: (r) => r.min(1).max(4),
      of: [{
        type: 'object',
        name: 'metric',
        fields: [
          {name: 'num',   title: 'Number',     type: 'string', description: 'e.g. "3", "200", "15"'},
          {name: 'unit',  title: 'Unit',       type: 'string', description: 'e.g. "×", "%", "+", or empty'},
          {name: 'label', title: 'Label',      type: 'string'},
          {name: 'note',  title: 'Supporting note', type: 'text', rows: 2},
        ],
        preview: {
          select: {num: 'num', unit: 'unit', label: 'label'},
          prepare: ({num, unit, label}) => ({title: `${num}${unit ?? ''} — ${label}`}),
        },
      }],
    }),
    defineField({name: 'footnote', title: 'Footnote', type: 'string',
      description: 'Italic line below the metrics grid.'}),
  ],
  preview: {
    select: {title: 'title'},
    prepare: ({title}) => ({title: title ?? '(untitled metrics)', subtitle: '↳ Metrics block'}),
  },
});
