# 🚀 Quick Start - Sanity Cafe Menu Integration

## In 3 Minutes

### 1️⃣ Add Schema to Sanity Studio (2 min)

```bash
# Copy the schema file
cp sanity/cafeMenuItem.ts your-sanity-studio/schemas/

# Edit schemas/index.ts and add:
import cafeMenuItem from './cafeMenuItem'

export const schemaTypes = [
  // ... your existing schemas
  cafeMenuItem,
]

# Deploy
cd your-sanity-studio
sanity deploy
```

### 2️⃣ Import Sample Data (30 sec)

```bash
# From project root
cd sanity
sanity dataset import cafe-menu-import.ndjson production
```

### 3️⃣ Add Images (Optional - 30 sec)

Open Sanity Studio and upload images for each item, or they'll use the fallback Unsplash images.

## ✅ Done!

Visit `/cafe` on your website. Menu items from Sanity will appear!

## What Happens Next?

- 🔄 **Auto Sync**: Changes in Sanity appear within 60 seconds
- 📸 **Images**: Upload directly in Sanity Studio
- 🎨 **Manage**: Add/edit/delete items without code
- 📱 **Live**: Updates go live automatically

## Need Help?

- Full docs: [CAFE_MENU_SCHEMA.md](./CAFE_MENU_SCHEMA.md)
- Integration guide: [SANITY_INTEGRATION.md](../SANITY_INTEGRATION.md)
- Sanity docs: https://www.sanity.io/docs

---

**Time to Live**: ~3 minutes 🚀
