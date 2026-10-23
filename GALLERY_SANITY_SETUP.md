# Gallery Sanity Setup Guide

## Overview

Your gallery is already configured to pull images from Sanity CMS, but you need to add the schema and upload images to Sanity.

## 🚀 Quick Setup

### Step 1: Add Gallery Schema to Sanity Studio

**In your `sanity.config.ts` or `schemas/index.ts`:**

```typescript
import galleryItem from './sanity/galleryItem'
import booking from './sanity/booking'
import payment from './sanity/payment'

export const schemaTypes = [
  galleryItem,  // Add this
  booking,
  payment,
  // ... your other schemas
]
```

### Step 2: Deploy Schema to Sanity

```bash
npx sanity deploy
```

### Step 3: Add Gallery Images

1. Open your Sanity Studio (e.g., `yourdomain.sanity.studio`)
2. You'll see a new **🖼️ Gallery** section
3. Click **Create** to add new gallery items

## 📸 Adding Images to Gallery

### For Each Image:

**Required Fields:**
- **Title** - Name of the image (e.g., "White Tents with Cottages")
- **Category** - Choose from:
  - 🏕️ Campsites
  - 🍽️ Food
  - 👥 Guests
  - 🎯 Activities
  - 🏠 Interiors
- **Image** - Upload high-quality photo (min 1200x800px)
- **Caption** - Short description

**Optional:**
- **Display Order** - Number to control sorting (0, 1, 2...)
- **Alt Text** - For accessibility

## 📁 Migrating Your Existing Images

You have 42 images in `public/gallery-images/`. Here's how to add them to Sanity:

### Option 1: Manual Upload (Recommended)

1. Open Sanity Studio
2. Go to **Gallery** section
3. Click **Create**
4. Upload each image from `public/gallery-images/`
5. Set category and caption
6. Click **Publish**

### Option 2: Bulk Import (Advanced)

You can use Sanity's import tool or API to bulk upload. Let me know if you want this automated!

## 🎯 Image Categories Mapping

Based on your current images:

**Campsites (10 images):**
- WhatsApp Image 2026-10-01 at 7.17.27 PM.jpeg
- WhatsApp Image 2026-10-01 at 7.17.30 PM.jpeg
- WhatsApp Image 2026-10-01 at 7.17.35 PM.jpeg
- WhatsApp Image 2026-10-01 at 7.17.31 PM.jpeg
- WhatsApp Image 2026-10-01 at 7.17.32 PM.jpeg
- Plus existing tent images

**Food (4 images):**
- WhatsApp Image 2026-10-01 at 7.17.26 PM.jpeg
- WhatsApp Image 2026-10-01 at 7.17.27 PM (1-3).jpeg

**Guests (18 images):**
- WhatsApp Image 2026-10-01 at 7.17.28 PM.jpeg
- WhatsApp Image 2026-10-01 at 7.17.36 PM.jpeg
- All other guest group photos

**Activities (8 images):**
- WhatsApp Image 2026-10-01 at 7.17.33 PM.jpeg (Night lights)
- WhatsApp Image 2026-10-01 at 7.17.34 PM.jpeg (Kayaking)
- Other activity images

**Interiors (2 images):**
- WhatsApp Image 2026-10-01 at 7.17.29 PM.jpeg
- Machang cottage interior

## ✅ After Adding Images

Once you add images to Sanity:

1. Your gallery page will automatically show them
2. Filter options will work correctly
3. Images will be optimized by Sanity CDN
4. You can manage all images from Sanity Studio

## 🔄 How It Works

```
Sanity Studio
    ↓
Upload Images
    ↓
Categories Set
    ↓
Auto-syncs to Website
    ↓
Gallery Page Shows Images
```

**Code Path:**
```
app/gallery/page.tsx 
  → calls getGallery() 
  → lib/sanity/data.ts 
  → Fetches from Sanity 
  → Returns images
```

## 📝 Current Status

✅ Gallery schema created (`sanity/galleryItem.ts`)  
✅ Gallery page synced with Sanity  
✅ Filter options configured  
⚠️ **Need to:** Import schema and upload images to Sanity  

## 🎨 Tips

**Image Quality:**
- Use high-res images (1200x800px minimum)
- JPEG format recommended
- Keep file size under 2MB for fast loading
- Sanity will auto-optimize

**Categories:**
- Be consistent with categorization
- Use "Campsites" for all tent/cottage photos
- Use "Guests" for group photos and activities
- Use "Food" for meals and BBQ
- Use "Activities" for kayaking, sports, night views
- Use "Interiors" for inside views

**Display Order:**
- Best images should have lower order numbers (0, 1, 2)
- Sanity will sort by order number automatically

## 🚨 Important

The `lib/mock-data/gallery.ts` file is **NOT being used** anymore. The gallery pulls directly from Sanity. You can delete this file if you want, but it won't affect the site.

## 🎯 Next Steps

1. Add `galleryItem` schema to your Sanity config
2. Deploy with `npx sanity deploy`
3. Upload your 42 images to Sanity Studio
4. Set categories for each
5. Publish!

Your gallery will automatically populate! 🎉
