import {defineField, defineType} from 'sanity'

export const contactSubmission = defineType({
  name: 'contactSubmission',
  title: 'Contact Enquiry',
  type: 'document',
  fields: [
    defineField({name: 'name', type: 'string', readOnly: true}),
    defineField({name: 'email', type: 'string', readOnly: true}),
    defineField({name: 'phone', type: 'string', readOnly: true}),
    defineField({name: 'subject', type: 'string', readOnly: true}),
    defineField({name: 'message', type: 'text', rows: 6, readOnly: true}),
    defineField({name: 'submittedAt', type: 'datetime', readOnly: true}),
    defineField({
      name: 'status',
      type: 'string',
      options: {list: ['new', 'contacted', 'closed']},
      initialValue: 'new',
    }),
    defineField({name: 'notes', title: 'Internal notes', type: 'text', rows: 3}),
  ],
  orderings: [
    {title: 'Newest first', name: 'newest', by: [{field: 'submittedAt', direction: 'desc'}]},
  ],
  preview: {select: {title: 'name', subtitle: 'subject'}},
})
