import {defineArrayMember, defineField, defineType} from 'sanity'

export const property = defineType({
  name: 'property',
  title: 'Stay / Package',
  type: 'document',
  fields: [
    defineField({name: 'title', type: 'string', validation: (r) => r.required()}),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      validation: (r) => r.required(),
    }),
    defineField({name: 'tagline', type: 'string'}),
    defineField({
      name: 'category',
      type: 'string',
      options: {list: ['Glamping', 'Cottage', 'Dome', 'Tent Camping', 'Villa']},
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'price',
      title: 'Price per person (₹)',
      type: 'number',
      validation: (r) => r.required().min(0),
    }),
    defineField({name: 'originalPrice', title: 'Original price (₹, strikethrough)', type: 'number'}),
    defineField({name: 'capacity', type: 'string', description: 'e.g. 2/3 Guests sharing'}),
    defineField({name: 'rating', type: 'number', initialValue: 4.9, validation: (r) => r.min(0).max(5)}),
    defineField({name: 'reviewCount', type: 'number', initialValue: 0}),
    defineField({name: 'location', type: 'string', initialValue: 'Gevhande Khadak, Pawna Lake'}),
    defineField({name: 'distance', type: 'string', initialValue: '2.5 hrs from Mumbai · 1.5 hrs from Pune'}),
    defineField({
      name: 'locationName',
      title: 'Location Name',
      type: 'string',
      description: 'Specific location name for this property (e.g., "Pawna Tent Camp by Maitri - Lonavala")',
    }),
    defineField({
      name: 'googleMapsUrl',
      title: 'Google Maps URL',
      type: 'url',
      description: 'Full Google Maps link for this property location',
    }),
    defineField({
      name: 'mapEmbed',
      title: 'Map Embed URL',
      type: 'url',
      description: 'Google Maps embed iframe URL',
    }),
    defineField({
      name: 'coordinates',
      title: 'GPS Coordinates',
      type: 'object',
      fields: [
        defineField({name: 'lat', title: 'Latitude', type: 'number'}),
        defineField({name: 'lng', title: 'Longitude', type: 'number'}),
      ],
    }),
    defineField({
      name: 'coverImage',
      type: 'image',
      options: {hotspot: true},
      fields: [defineField({name: 'alt', type: 'string', title: 'Alt text'})],
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'gallery',
      type: 'array',
      of: [defineArrayMember({type: 'image', options: {hotspot: true}})],
    }),
    defineField({name: 'description', type: 'text', rows: 4}),
    defineField({
      name: 'features',
      title: 'Highlights',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
    }),
    defineField({
      name: 'amenities',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'amenity',
          fields: [
            defineField({name: 'name', type: 'string', validation: (r) => r.required()}),
            defineField({
              name: 'icon',
              type: 'string',
              options: {list: ['shower', 'toilet', 'plug', 'bonfire', 'food', 'sports', 'parking']},
            }),
          ],
          preview: {select: {title: 'name', subtitle: 'icon'}},
        }),
      ],
    }),
    defineField({
      name: 'inclusions',
      title: "What's included",
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
    }),
    defineField({name: 'hasAttachedWashroom', type: 'boolean', initialValue: false}),
    defineField({name: 'hasLightFanBoard', type: 'boolean', initialValue: false}),
    defineField({name: 'isPopular', type: 'boolean', initialValue: false}),
    defineField({name: 'isFeatured', title: 'Show on home page', type: 'boolean', initialValue: true}),
    defineField({name: 'order', type: 'number', description: 'Lower numbers show first'}),
  ],
  orderings: [{title: 'Display order', name: 'order', by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'title', subtitle: 'category', media: 'coverImage'}},
})
