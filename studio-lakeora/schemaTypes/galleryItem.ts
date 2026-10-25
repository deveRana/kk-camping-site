import {defineField, defineType} from 'sanity'

export const galleryItem = defineType({
  name: 'galleryItem',
  title: 'Gallery Photo',
  type: 'document',
  fields: [
    defineField({name: 'title', type: 'string', validation: (r) => r.required()}),
    defineField({
      name: 'category',
      type: 'string',
      options: {list: ['Campsites', 'Sunsets', 'Activities', 'Food']},
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'image',
      type: 'image',
      options: {hotspot: true},
      validation: (r) => r.required(),
    }),
    defineField({name: 'caption', type: 'string'}),
    defineField({name: 'order', type: 'number'}),
  ],
  orderings: [{title: 'Display order', name: 'order', by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'title', subtitle: 'category', media: 'image'}},
})
