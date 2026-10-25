import {defineField, defineType} from 'sanity'

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Guest Review',
  type: 'document',
  fields: [
    defineField({name: 'name', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'location', type: 'string', description: 'Guest home city'}),
    defineField({name: 'avatar', type: 'image', options: {hotspot: true}}),
    defineField({
      name: 'rating',
      type: 'number',
      initialValue: 5,
      validation: (r) => r.required().min(1).max(5),
    }),
    defineField({name: 'stayType', type: 'string', description: 'Package they stayed in'}),
    defineField({name: 'comment', type: 'text', rows: 4, validation: (r) => r.required()}),
    defineField({name: 'date', type: 'string', description: 'e.g. August 2026'}),
  ],
  preview: {select: {title: 'name', subtitle: 'stayType', media: 'avatar'}},
})
