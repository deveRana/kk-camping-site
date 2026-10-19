# 🍽️ Sanity Cafe Menu Schema

## Overview
This document contains the Sanity schema for the Cafe Menu feature. Add this schema to your Sanity Studio to manage cafe menu items through the CMS.

## Schema File

Create a new file in your Sanity Studio schemas directory:

**File:** `schemas/cafeMenuItem.ts` or `schemas/cafeMenuItem.js`

```typescript
import { defineField, defineType } from 'sanity'

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
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Breakfast', value: 'Breakfast' },
          { title: 'Lunch', value: 'Lunch' },
          { title: 'Snacks', value: 'Snacks' },
          { title: 'Dinner', value: 'Dinner' },
          { title: 'Beverages', value: 'Beverages' },
          { title: 'Desserts', value: 'Desserts' },
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
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: 'price',
      title: 'Price (₹)',
      type: 'number',
      validation: (Rule) => Rule.required().positive(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'isVeg',
      title: 'Vegetarian',
      type: 'boolean',
      initialValue: true,
      description: 'Is this a vegetarian dish?',
    }),
    defineField({
      name: 'isSpecial',
      title: 'Chef Special',
      type: 'boolean',
      initialValue: false,
      description: 'Mark as a special/featured item',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
      description: 'Lower numbers appear first',
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
      const specialIcon = isSpecial ? '⭐' : ''
      return {
        title: `${vegIcon} ${title} ${specialIcon}`,
        subtitle: `${subtitle} • ₹${price}`,
        media,
      }
    },
  },
  orderings: [
    {
      title: 'Category',
      name: 'categoryAsc',
      by: [{ field: 'category', direction: 'asc' }],
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
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
})
```

## Adding to Schema Index

Add the schema to your main schema index file:

**File:** `schemas/index.ts` or `schema.js`

```typescript
import cafeMenuItem from './cafeMenuItem'

export const schemaTypes = [
  // ... your existing schemas
  cafeMenuItem,
]
```

## Sample Data to Import

You can manually add these menu items in Sanity Studio, or use the Sanity CLI to import:

### Import JSON Format

Create a file `cafe-menu-import.ndjson`:

```json
{"_type":"cafeMenuItem","name":"Classic Masala Chai","category":"Breakfast","description":"Traditional Indian spiced tea","price":30,"isVeg":true,"isSpecial":true,"order":1}
{"_type":"cafeMenuItem","name":"Filter Coffee","category":"Breakfast","description":"South Indian style filter coffee","price":40,"isVeg":true,"order":2}
{"_type":"cafeMenuItem","name":"Poha","category":"Breakfast","description":"Maharashtrian style flattened rice","price":80,"isVeg":true,"order":3}
{"_type":"cafeMenuItem","name":"Masala Omelette","category":"Breakfast","description":"Two eggs with onions, tomatoes & spices","price":60,"isVeg":false,"order":4}
{"_type":"cafeMenuItem","name":"Aloo Paratha","category":"Breakfast","description":"Stuffed potato flatbread with curd & pickle","price":100,"isVeg":true,"order":5}
{"_type":"cafeMenuItem","name":"French Toast","category":"Breakfast","description":"Classic breakfast with maple syrup","price":120,"isVeg":true,"order":6}
{"_type":"cafeMenuItem","name":"Paneer Butter Masala","category":"Lunch","description":"Cottage cheese in rich tomato gravy","price":220,"isVeg":true,"isSpecial":true,"order":7}
{"_type":"cafeMenuItem","name":"Dal Tadka","category":"Lunch","description":"Yellow lentils tempered with spices","price":150,"isVeg":true,"order":8}
{"_type":"cafeMenuItem","name":"Chicken Curry","category":"Lunch","description":"Home-style chicken curry","price":280,"isVeg":false,"isSpecial":true,"order":9}
{"_type":"cafeMenuItem","name":"Veg Biryani","category":"Lunch","description":"Aromatic rice with mixed vegetables","price":200,"isVeg":true,"order":10}
{"_type":"cafeMenuItem","name":"Chicken Biryani","category":"Lunch","description":"Hyderabadi style chicken biryani","price":280,"isVeg":false,"order":11}
{"_type":"cafeMenuItem","name":"Jeera Rice","category":"Lunch","description":"Cumin flavored basmati rice","price":100,"isVeg":true,"order":12}
{"_type":"cafeMenuItem","name":"Veg Pakora","category":"Snacks","description":"Mixed vegetable fritters","price":100,"isVeg":true,"order":13}
{"_type":"cafeMenuItem","name":"Corn Bhel","category":"Snacks","description":"Sweet corn chaat","price":80,"isVeg":true,"order":14}
{"_type":"cafeMenuItem","name":"Maggi","category":"Snacks","description":"Classic instant noodles","price":60,"isVeg":true,"order":15}
{"_type":"cafeMenuItem","name":"Cheese Sandwich","category":"Snacks","description":"Grilled cheese sandwich","price":100,"isVeg":true,"order":16}
{"_type":"cafeMenuItem","name":"Vada Pav","category":"Snacks","description":"Mumbai street food special","price":40,"isVeg":true,"order":17}
{"_type":"cafeMenuItem","name":"Cold Coffee","category":"Beverages","description":"Chilled coffee with ice cream","price":80,"isVeg":true,"order":18}
{"_type":"cafeMenuItem","name":"Fresh Lime Soda","category":"Beverages","description":"Sweet/salt/plain","price":50,"isVeg":true,"order":19}
{"_type":"cafeMenuItem","name":"Mango Shake","category":"Beverages","description":"Thick and creamy","price":100,"isVeg":true,"isSpecial":true,"order":20}
{"_type":"cafeMenuItem","name":"Masala Buttermilk","category":"Beverages","description":"Spiced yogurt drink","price":40,"isVeg":true,"order":21}
{"_type":"cafeMenuItem","name":"Fresh Coconut Water","category":"Beverages","description":"Natural and refreshing","price":60,"isVeg":true,"order":22}
{"_type":"cafeMenuItem","name":"Gulab Jamun","category":"Desserts","description":"2 pieces - milk solid dumplings in sugar syrup","price":60,"isVeg":true,"order":23}
{"_type":"cafeMenuItem","name":"Ice Cream","category":"Desserts","description":"Vanilla/Chocolate/Strawberry","price":80,"isVeg":true,"order":24}
```

### Import Command

```bash
sanity dataset import cafe-menu-import.ndjson production --replace
```

## Usage in Frontend

The cafe menu is automatically fetched from Sanity:

```typescript
// In app/cafe/page.tsx
import { getCafeMenu } from '@/lib/sanity/data';

export default async function CafePage() {
  const menuItems = await getCafeMenu();
  return <CafeView menuItems={menuItems} />;
}
```

## Features

### 1. **Automatic Categorization**
- Breakfast items appear together
- Lunch/Dinner items shown by category
- Easy filtering by category

### 2. **Visual Indicators**
- 🟢 Green dot for vegetarian
- 🔴 Red dot for non-vegetarian
- ⭐ Star badge for special items

### 3. **Flexible Management**
- Add/edit/delete items in Sanity Studio
- Reorder items with `order` field
- Mark items as special/featured
- Upload high-quality dish photos

### 4. **Automatic Sync**
- Data revalidates every 60 seconds
- Changes in Sanity appear on site within 1 minute
- No code deployment needed for menu updates

## Best Practices

### Image Guidelines
- **Format**: JPG or PNG
- **Size**: At least 800x600px
- **Aspect Ratio**: 4:3 or 16:9 works best
- **File Size**: Under 2MB (will be optimized)
- **Quality**: High-quality food photography

### Pricing
- Enter prices without currency symbol
- Prices displayed as ₹{amount}
- Use whole numbers (no decimals)

### Descriptions
- Keep under 200 characters
- Focus on key ingredients or style
- Mention if it's spicy, sweet, etc.
- Use appetizing language

### Categories
- **Breakfast**: 8 AM - 11 AM items
- **Lunch**: 12 PM - 3 PM items
- **Snacks**: 3 PM - 6 PM items
- **Dinner**: 7 PM - 10 PM items (can reuse Lunch)
- **Beverages**: Available all day
- **Desserts**: Available all day

### Special Items
- Mark top 3-5 items as special
- These appear in the featured section
- Use for chef's recommendations or popular dishes

## Troubleshooting

### Menu not showing?
1. Check Sanity project ID in `.env.local`
2. Verify schema is deployed: `sanity deploy`
3. Check if documents exist in Sanity Studio
4. Look at browser console for errors

### Images not loading?
1. Verify images are uploaded in Sanity
2. Check Next.js image config includes Sanity CDN
3. Ensure images are marked as required in schema

### Wrong order?
1. Edit items in Sanity Studio
2. Set `order` field (lower numbers appear first)
3. Save and wait 60 seconds for revalidation

## Support

For Sanity-specific help:
- [Sanity Documentation](https://www.sanity.io/docs)
- [Schema Types Reference](https://www.sanity.io/docs/schema-types)
- [Image Handling](https://www.sanity.io/docs/image-type)

---

**Status**: ✅ Schema ready to deploy to Sanity Studio
**Last Updated**: October 2024
