# 🚀 Quick Gallery Upload Guide

## Automatic Upload Script

We've created a script to automatically upload all 37 gallery images from `public/gallery-images/` directly to Sanity!

## ✅ Prerequisites

1. **Sanity schema deployed** - Add `galleryItem` to your Sanity config and deploy
2. **Environment variables set** - Make sure `.env.local` has:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET`
   - `SANITY_API_WRITE_TOKEN` (write token)

## 🎯 How to Upload

### Step 1: Install Dependencies (if needed)
```bash
npm install
```

### Step 2: Run the Upload Script
```bash
npm run upload-gallery
```

That's it! The script will:
- ✅ Upload all 37 gallery images to Sanity
- ✅ Upload 3 normal tent images to Sanity
- ✅ Set proper categories (Campsites, Food, Guests, Activities, Interiors)
- ✅ Add titles and captions
- ✅ Set display order
- ✅ Create gallery items automatically
- ✅ Total: 40 images uploaded!

## 📊 What Gets Uploaded

The script uploads and categorizes:

**Campsites (13 images):**
- White tents
- Grey tents
- Normal waterproof tents (3 images)
- Campsite views

**Food (4 images):**
- Biryani
- Meal preparations

**Guests (18 images):**
- Group photos
- Family gatherings
- Campfire scenes

**Activities (8 images):**
- Night views with lights
- Kayaking
- Water activities
- Games

**Interiors (1 image):**
- Machang cottage interior

## 🎨 Output Example

```
🚀 Starting gallery upload to Sanity...

📁 Gallery images directory: /home/user/project/public/gallery-images
📁 Normal tent directory: /home/user/project/public/normal-tent
📊 Total images to upload: 40

📤 Uploading gallery images...

📤 Uploading: White Tents with Cottages...
   ✓ Image uploaded: image-abc123
   ✓ Gallery item created: gallery-xyz789

📤 Uploading: Special Biryani Serving...
   ✓ Image uploaded: image-def456
   ✓ Gallery item created: gallery-uvw012

...

📤 Uploading normal tent images...

📤 Uploading: Normal Waterproof Tent View 1...
   ✓ Image uploaded: image-ghi789
   ✓ Gallery item created: gallery-rst345

...

============================================================
📊 Upload Summary:
   ✓ Successfully uploaded: 40
   ✗ Failed: 0
   📁 Total: 40
============================================================

✨ Gallery images uploaded successfully!
🌐 Visit your Sanity Studio to view them.
```

## 🔍 After Upload

1. Open your Sanity Studio
2. Go to **🖼️ Gallery** section
3. You'll see all 37 images organized by category
4. Images are ready to display on your site!

## 🛠️ Troubleshooting

### Error: SANITY_API_WRITE_TOKEN not set
**Solution:** Add your Sanity write token to `.env.local`:
```env
SANITY_API_WRITE_TOKEN=sk_your_token_here
```

### Error: Image file not found
**Solution:** Make sure all images are in `public/gallery-images/` folder

### Error: galleryItem type not found
**Solution:** 
1. Add `galleryItem` schema to Sanity config
2. Run `npx sanity deploy`
3. Try upload again

## 🔄 Re-running the Script

The script can be run multiple times. If images already exist, Sanity will create new versions. You can delete old ones from Sanity Studio if needed.

## 📝 Script Details

**Location:** `scripts/upload-gallery-to-sanity.ts`

**What it does:**
1. Reads images from `public/gallery-images/`
2. Uploads each image to Sanity assets
3. Creates gallery item document with metadata
4. Links image asset to gallery item
5. Sets category, title, caption, and display order

**Configuration:**
All metadata (titles, captions, categories) is defined in the script. You can edit `scripts/upload-gallery-to-sanity.ts` to change any details.

## ⚡ Manual Alternative

If you prefer manual upload:
1. Open Sanity Studio
2. Go to Gallery
3. Click "Create"
4. Upload image
5. Fill in details
6. Publish

But the script is much faster! 🚀

---

**Questions?** Check the main [GALLERY_SANITY_SETUP.md](GALLERY_SANITY_SETUP.md) for more details.
