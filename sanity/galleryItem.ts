import { defineField, defineType } from 'sanity'

/**
 * Gallery Item Schema for Sanity CMS
 *
 * This schema defines the structure for gallery images displayed on the site.
 */

export default defineType({
  name: 'galleryItem',
  title: 'Gallery',
  type: 'document',
  icon: () => '🖼️',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Title/name of the image',
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'All', value: 'All' },
          { title: '🏕️ Campsites', value: 'Campsites' },
          { title: '🍽️ Food', value: 'Food' },
          { title: '👥 Guests', value: 'Guests' },
          { title: '🎯 Activities', value: 'Activities' },
          { title: '🏠 Interiors', value: 'Interiors' },
        ],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
        metadata: ['blurhash', 'lqip', 'palette'],
      },
      description: 'High-quality photo (min 1200x800px recommended)',
      validation: (Rule) => Rule.required(),
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Alternative text for accessibility',
        },
      ],
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'text',
      rows: 2,
      description: 'Short description of the image',
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
      description: 'Lower numbers appear first (0, 1, 2...)',
      validation: (Rule) => Rule.integer().min(0),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'image',
    },
    prepare(selection) {
      const { title, subtitle, media } = selection
      return {
        title: title,
        subtitle: subtitle || 'No category',
        media,
      }
    },
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [
        { field: 'order', direction: 'asc' },
        { field: 'category', direction: 'asc' },
      ],
    },
    {
      title: 'Category (A-Z)',
      name: 'categoryAsc',
      by: [{ field: 'category', direction: 'asc' }],
    },
    {
      title: 'Recently Added',
      name: 'dateDesc',
      by: [{ field: '_createdAt', direction: 'desc' }],
    },
  ],
})
