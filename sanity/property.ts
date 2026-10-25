import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'property',
  title: 'Property',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Cottage', value: 'Cottage' },
          { title: 'Glamping', value: 'Glamping' },
          { title: 'Dome', value: 'Dome' },
          { title: 'Tent Camping', value: 'Tent Camping' },
        ],
      },
    }),
    defineField({
      name: 'price',
      title: 'Price (per person)',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'originalPrice',
      title: 'Original Price (if on sale)',
      type: 'number',
    }),
    defineField({
      name: 'capacity',
      title: 'Capacity',
      type: 'string',
      description: 'e.g., "2/3 Guests sharing"',
    }),
    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'number',
      validation: (Rule) => Rule.min(0).max(5),
    }),
    defineField({
      name: 'reviewCount',
      title: 'Review Count',
      type: 'number',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
    }),
    defineField({
      name: 'distance',
      title: 'Distance',
      type: 'string',
      description: 'e.g., "2 hours from Mumbai · 1.5 hours from Pune"',
    }),
    defineField({
      name: 'googleMapsUrl',
      title: 'Google Maps URL',
      type: 'url',
      description: 'Full Google Maps link for this property',
    }),
    defineField({
      name: 'mapEmbed',
      title: 'Map Embed URL',
      type: 'url',
      description: 'Google Maps embed iframe URL for this property',
    }),
    defineField({
      name: 'coordinates',
      title: 'GPS Coordinates',
      type: 'object',
      fields: [
        defineField({
          name: 'lat',
          title: 'Latitude',
          type: 'number',
        }),
        defineField({
          name: 'lng',
          title: 'Longitude',
          type: 'number',
        }),
      ],
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'inclusions',
      title: 'Inclusions',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'amenities',
      title: 'Amenities',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'string',
              options: {
                list: [
                  { title: 'Shower', value: 'shower' },
                  { title: 'Toilet', value: 'toilet' },
                  { title: 'Plug', value: 'plug' },
                  { title: 'Bonfire', value: 'bonfire' },
                  { title: 'Food', value: 'food' },
                  { title: 'Sports', value: 'sports' },
                  { title: 'Parking', value: 'parking' },
                ],
              },
            }),
            defineField({
              name: 'name',
              title: 'Name',
              type: 'string',
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'isPopular',
      title: 'Is Popular',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'isFeatured',
      title: 'Is Featured',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which property appears on the site',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'coverImage',
    },
  },
});
