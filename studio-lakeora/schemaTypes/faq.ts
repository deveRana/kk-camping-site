import {defineField, defineType} from 'sanity'

export const faq = defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  fields: [
    defineField({name: 'question', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'answer', type: 'text', rows: 5, validation: (r) => r.required()}),
    defineField({
      name: 'category',
      type: 'string',
      options: {
        list: ['General', 'Booking & Payment', 'Check-in/out', 'Food & Activities', 'Safety'],
      },
      initialValue: 'General',
      validation: (r) => r.required(),
    }),
    defineField({name: 'order', type: 'number', description: 'Lower numbers show first'}),
  ],
  orderings: [{title: 'Display order', name: 'order', by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'question', subtitle: 'category'}},
})
