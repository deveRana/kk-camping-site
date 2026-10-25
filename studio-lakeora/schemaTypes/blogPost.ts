import {defineArrayMember, defineField, defineType} from 'sanity'

export const blogPost = defineType({
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({name: 'title', type: 'string', validation: (r) => r.required()}),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      validation: (r) => r.required(),
    }),
    defineField({name: 'excerpt', type: 'text', rows: 3}),
    defineField({name: 'category', type: 'string'}),
    defineField({
      name: 'coverImage',
      type: 'image',
      options: {hotspot: true},
      fields: [defineField({name: 'alt', type: 'string', title: 'Alt text'})],
    }),
    defineField({
      name: 'body',
      type: 'array',
      of: [defineArrayMember({type: 'block'})],
    }),
    defineField({name: 'authorName', type: 'string'}),
    defineField({name: 'authorRole', type: 'string'}),
    defineField({name: 'authorAvatar', type: 'image'}),
    defineField({name: 'publishedAt', type: 'datetime', validation: (r) => r.required()}),
    defineField({name: 'readTime', type: 'string', description: 'e.g. 6 min read'}),
    defineField({name: 'tags', type: 'array', of: [defineArrayMember({type: 'string'})], options: {layout: 'tags'}}),
  ],
  orderings: [{title: 'Newest first', name: 'newest', by: [{field: 'publishedAt', direction: 'desc'}]}],
  preview: {select: {title: 'title', subtitle: 'category', media: 'coverImage'}},
})
