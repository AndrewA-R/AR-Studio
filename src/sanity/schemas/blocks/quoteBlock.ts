/**
 * quoteBlock — renders <CaseQuote />.
 *
 * One large pull quote with attribution. Used both for client quotes and
 * for editorial pull-outs (e.g. the engagement-summary line at the end of
 * a case).
 */
import {defineField, defineType} from 'sanity';

export default defineType({
  name: 'quoteBlock',
  title: 'Quote',
  type: 'object',
  fields: [
    defineField({name: 'quote',       title: 'Quote',       type: 'text', rows: 4, validation: (r) => r.required()}),
    defineField({name: 'attribution', title: 'Attribution', type: 'string', description: 'Person or source name.'}),
    defineField({name: 'role',        title: 'Role / context', type: 'string',
      description: 'e.g. "Quarterly review · A+R principal · Q2"'}),
  ],
  preview: {
    select: {quote: 'quote', attribution: 'attribution'},
    prepare: ({quote, attribution}) => ({
      title: quote ? `“${quote.slice(0, 60)}${quote.length > 60 ? '…' : ''}”` : '(empty quote)',
      subtitle: `↳ Quote — ${attribution ?? '—'}`,
    }),
  },
});
