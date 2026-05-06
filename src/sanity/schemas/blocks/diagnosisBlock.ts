/**
 * diagnosisBlock — renders <CaseDiagnosis />.
 *
 * Long-form prose section, with an optional callout box.
 * Use for the honest-diagnosis section of a case (the "what we got wrong"
 * or "what the data revealed" section).
 */
import {defineField, defineType} from 'sanity';

export default defineType({
  name: 'diagnosisBlock',
  title: 'Diagnosis',
  type: 'object',
  fields: [
    defineField({name: 'kicker', title: 'Kicker', type: 'string', initialValue: 'Diagnosis'}),
    defineField({name: 'title',  title: 'Title',  type: 'string'}),
    defineField({
      name: 'paragraphs', title: 'Paragraphs', type: 'array',
      of: [{type: 'text', rows: 4}],
      validation: (r) => r.min(1),
    }),
    defineField({
      name: 'callout', title: 'Callout', type: 'object',
      description: 'Optional pull-out box. Leave blank to omit.',
      fields: [
        {name: 'label', title: 'Label', type: 'string'},
        {name: 'body',  title: 'Body',  type: 'text', rows: 3},
      ],
    }),
  ],
  preview: {
    select: {title: 'title'},
    prepare: ({title}) => ({title: title ?? '(untitled diagnosis)', subtitle: '↳ Diagnosis block'}),
  },
});
