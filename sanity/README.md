# Sanity CMS Setup for Lakeora

## Quick Start

This directory contains Sanity schema definitions and import data for the Lakeora website.

## Directory Structure

```
sanity/
├── README.md                  # This file
├── CAFE_MENU_SCHEMA.md       # Complete cafe menu schema documentation
└── cafe-menu-import.ndjson   # Sample menu data for import
```

## Setup Instructions

### 1. Add Schema to Sanity Studio

Copy the schema from `CAFE_MENU_SCHEMA.md` and add it to your Sanity Studio project:

```bash
# In your Sanity Studio directory
schemas/cafeMenuItem.ts  # Create this file with the schema
schemas/index.ts         # Add cafeMenuItem to exports
```

### 2. Deploy Schema

```bash
cd your-sanity-studio
sanity deploy
```

### 3. Import Sample Data (Optional)

From this directory, run:

```bash
sanity dataset import cafe-menu-import.ndjson production
```

Or manually add items through Sanity Studio interface.

## Existing Schemas in Use

The website already uses these Sanity schemas:

- ✅ **siteSettings** - Brand info, contact details, payment methods
- ✅ **property** - Camping/glamping properties
- ✅ **blogPost** - Blog articles with Portable Text
- ✅ **faq** - FAQ items
- ✅ **testimonial** - Customer reviews
- ✅ **galleryItem** - Photo gallery

## New Schema to Add

- 🆕 **cafeMenuItem** - Cafe menu items (see CAFE_MENU_SCHEMA.md)

## Environment Variables

Ensure these are set in `.env.local`:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=roac4c6v
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_WRITE_TOKEN=your_token_here  # For contact form submissions
```

## Data Sync

- **Revalidation**: 60 seconds
- **Method**: ISR (Incremental Static Regeneration)
- **Trigger**: Automatic via Next.js revalidate

Changes in Sanity will appear on the website within 1 minute.

## Managing Content

### Via Sanity Studio

1. Go to your Sanity Studio URL
2. Navigate to "Cafe Menu Item" section
3. Click "Create new Cafe Menu Item"
4. Fill in all fields:
   - Name, Category, Description
   - Price, Image
   - Veg/Non-veg, Special status
   - Display order

### Via API

```typescript
import { getCafeMenu } from '@/lib/sanity/data';

const menuItems = await getCafeMenu();
// Returns: CafeMenuItem[]
```

## Schema Features

- **Categories**: Breakfast, Lunch, Snacks, Dinner, Beverages, Desserts
- **Indicators**: Veg/Non-veg markers
- **Special Items**: Featured menu highlights
- **Custom Order**: Control display sequence
- **Images**: High-quality dish photos

## Support

- [Full Schema Documentation](./CAFE_MENU_SCHEMA.md)
- [Sanity Docs](https://www.sanity.io/docs)
- [Project Setup Guide](../README.md)

---

**Last Updated**: October 2024
