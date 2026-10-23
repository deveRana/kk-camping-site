# 🔄 Sanity CMS Sync Guide

## Current Situation

Your Sanity schemas are stored locally in the `/sanity/` folder but need to be deployed to Sanity Studio server.

## 📋 Schemas to Deploy

✅ **Already in Sanity folder:**
- `booking.ts` - Booking records with DPDPA consent fields
- `payment.ts` - Payment transactions
- `galleryItem.ts` - Gallery images
- `cafeMenuItem.ts` - Cafe menu items

## 🚀 How to Sync Sanity (Two Options)

### Option 1: Using Sanity Studio (Recommended)

If you have a separate Sanity Studio project:

1. **Go to your Sanity Studio directory:**
   ```bash
   cd path/to/your-sanity-studio
   ```

2. **Copy schema files:**
   ```bash
   # Copy from this project to Sanity Studio
   cp /home/rana/Personal/kk-camping-site/sanity/booking.ts schemas/
   cp /home/rana/Personal/kk-camping-site/sanity/payment.ts schemas/
   cp /home/rana/Personal/kk-camping-site/sanity/galleryItem.ts schemas/
   ```

3. **Add to schema index:**
   ```typescript
   // In schemas/index.ts
   import booking from './booking'
   import payment from './payment'
   import galleryItem from './galleryItem'

   export const schemaTypes = [
     booking,
     payment,
     galleryItem,
     // ... other schemas
   ]
   ```

4. **Deploy to Sanity:**
   ```bash
   npx sanity deploy
   ```

### Option 2: Using Sanity Hosted Studio

If you're using sanity.io hosted studio:

1. **Go to:** https://www.sanity.io/manage
2. **Select your project:** roac4c6v
3. **Go to:** Vision (API query tool)
4. **Verify schemas exist** by running:
   ```groq
   *[_type == "property"] | order(_createdAt desc) [0..5] {
     _id,
     title,
     slug
   }
   ```

## 📦 Add Maitri Camping Package

Once schemas are synced, add the package:

```bash
npm run add-maitri-package
```

This will:
- ✅ Create Maitri Camping in Sanity
- ✅ Add all details (₹1,500, inclusions, features)
- ✅ Make it visible on site immediately

## 🔍 Verify Sync

### Check Properties in Sanity:

```bash
# List all properties
curl "https://roac4c6v.api.sanity.io/v2024-01-01/data/query/production?query=*%5B_type%20%3D%3D%20%22property%22%5D%7Btitle%7D"
```

### Check on Website:

1. Visit: https://your-site.com/properties
2. You should see:
   - Machang Cottages
   - Swiss Tent
   - White Tent
   - Normal Waterproof Tent
   - **Maitri Camping** (after running script)

## 🛠️ Current Environment Variables

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=roac4c6v
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_WRITE_TOKEN=sk_xxxxx
```

## ⚡ Quick Commands

```bash
# 1. Add Maitri package to Sanity
npm run add-maitri-package

# 2. Upload property images to Sanity
npm run upload-property-images

# 3. Upload gallery images to Sanity
npm run upload-gallery
```

## 🎯 What Happens After Sync

1. **Maitri Camping appears on:**
   - `/properties` page
   - `/properties/maitri-camping` detail page
   - Search results

2. **Booking system works:**
   - Users can book Maitri Camping
   - Bookings saved with consent data
   - Emails sent automatically

3. **Data flow:**
   ```
   Sanity CMS (Database)
        ↓
   Next.js API (lib/sanity/data.ts)
        ↓
   Website (Live in 60 seconds)
   ```

## 🐛 Troubleshooting

### "Property not showing on site"
- Wait 60 seconds (revalidation time)
- Check Sanity Studio to verify property exists
- Run: `npm run add-maitri-package` again

### "Schema not found error"
- Schemas need to be deployed to Sanity Studio first
- Use Option 1 or 2 above to deploy

### "Token error"
- Check `SANITY_API_WRITE_TOKEN` in `.env.local`
- Must start with `sk_`
- Get from: https://www.sanity.io/manage/project/roac4c6v/api

## 📞 Next Steps

1. ✅ Deploy schemas to Sanity Studio (if not already done)
2. ✅ Run `npm run add-maitri-package`
3. ✅ Check website in 60 seconds
4. ✅ Upload images via Sanity Studio or script

---

**Note:** Mock data in `lib/mock-data/` is NOT used by the live site. 
All content comes from Sanity CMS!
