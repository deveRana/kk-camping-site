import { defineField, defineType } from 'sanity'

/**
 * Cafe Menu Item Schema for Sanity CMS
 *
 * This schema defines the structure for cafe menu items.
 * Add this file to your Sanity Studio's schemas directory.
 *
 * @see Full documentation in CAFE_MENU_SCHEMA.md
 */

export default defineType({
  name: 'cafeMenuItem',
  title: 'Cafe Menu Item',
  type: 'document',
  icon: () => '🍽️',
  fields: [
    defineField({
      name: 'name',
      title: 'Dish Name',
      type: 'string',
      description: 'The name of the dish as it will appear on the menu',
      validation: (Rule) => Rule.required().max(50),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: '🌅 Breakfast', value: 'Breakfast' },
          { title: '🍛 Lunch', value: 'Lunch' },
          { title: '🍿 Snacks', value: 'Snacks' },
          { title: '🍽️ Dinner', value: 'Dinner' },
          { title: '☕ Beverages', value: 'Beverages' },
          { title: '🍰 Desserts', value: 'Desserts' },
        ],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'A short appetizing description of the dish',
      validation: (Rule) => Rule.required().max(200).warning('Keep it concise and appetizing'),
    }),
    defineField({
      name: 'price',
      title: 'Price (₹)',
      type: 'number',
      description: 'Price in Indian Rupees (without decimals)',
      validation: (Rule) => Rule.required().positive().integer(),
    }),
    defineField({
      name: 'image',
      title: 'Dish Image',
      type: 'image',
      options: {
        hotspot: true,
        metadata: ['blurhash', 'lqip', 'palette'],
      },
      description: 'High-quality photo of the dish (min 800x600px)',
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
      name: 'isVeg',
      title: 'Vegetarian',
      type: 'boolean',
      initialValue: true,
      description: '✅ Check if this is a vegetarian dish',
    }),
    defineField({
      name: 'isSpecial',
      title: "Chef's Special",
      type: 'boolean',
      initialValue: false,
      description: '⭐ Mark as a featured/special item (appears in highlights)',
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
      title: 'name',
      subtitle: 'category',
      media: 'image',
      price: 'price',
      isVeg: 'isVeg',
      isSpecial: 'isSpecial',
    },
    prepare(selection) {
      const { title, subtitle, media, price, isVeg, isSpecial } = selection
      const vegIcon = isVeg ? '🟢' : '🔴'
      const specialIcon = isSpecial ? ' ⭐' : ''
      return {
        title: `${vegIcon} ${title}${specialIcon}`,
        subtitle: `${subtitle} • ₹${price}`,
        media,
      }
    },
  },
  orderings: [
    {
      title: 'Category (A-Z)',
      name: 'categoryAsc',
      by: [{ field: 'category', direction: 'asc' }],
    },
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [
        { field: 'order', direction: 'asc' },
        { field: 'category', direction: 'asc' },
      ],
    },
    {
      title: 'Price (Low to High)',
      name: 'priceAsc',
      by: [{ field: 'price', direction: 'asc' }],
    },
    {
      title: 'Price (High to Low)',
      name: 'priceDesc',
      by: [{ field: 'price', direction: 'desc' }],
    },
    {
      title: 'Name (A-Z)',
      name: 'nameAsc',
      by: [{ field: 'name', direction: 'asc' }],
    },
  ],
})
