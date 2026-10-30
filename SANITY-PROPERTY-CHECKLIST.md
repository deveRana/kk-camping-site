# Sanity Property Data Checklist

## 🎯 Goal
Ensure ALL property data comes from Sanity CMS (no hardcoded fallbacks).

---

## ✅ Required Fields for Each Property

Go to: **Sanity Studio → Content → Property**

For **EACH property** (Maitri Camping, Sunset Haven, etc.), fill in these fields:

### 1. **Basic Info** (Required)
- ✅ **Title** - Property name
- ✅ **Slug** - URL-friendly name (auto-generated)
- ✅ **Tagline** - Short catchy description (2-3 lines)
- ✅ **Description** - Full detailed description (4-5 lines)
- ✅ **Category** - Select: Cottage / Glamping / Dome / Tent Camping

### 2. **Pricing** (Required)
- ✅ **Price** - Current price per person (e.g., 1200)
- ✅ **Original Price** - If on sale, show crossed-out price (e.g., 1500)

### 3. **Capacity & Details** (Required)
- ✅ **Capacity** - How many guests? (e.g., "2/3 Guests sharing")
- ✅ **Rating** - Star rating (e.g., 4.8, 4.9, 5.0)
- ✅ **Review Count** - Number of reviews (e.g., 127, 89)

### 4. **Location Details** (Required)
- ✅ **Location** - Short location text (e.g., "Pawna Lake, Lonavala")
- ✅ **Distance** - Travel distance (e.g., "2 hours from Mumbai · 1.5 hours from Pune")
- ✅ **Location Name** - Specific location (e.g., "Pawna Tent Camp by Maitri - Lonavala")
- ✅ **Google Maps URL** - Full link to Google Maps
- ✅ **Map Embed URL** - Embed iframe URL for maps
- ✅ **GPS Coordinates** - Latitude & Longitude

### 5. **Images** (Required)
- ✅ **Cover Image** - Main hero image (high quality, 1400px+)
- ✅ **Gallery Images** - Multiple images (at least 5-8 photos)

### 6. **Features & Amenities** (Required)
- ✅ **Features** - List of highlights (e.g., "Lakeside View", "Private Deck", "AC Tents")
- ✅ **Inclusions** - What's included in price (e.g., "Breakfast", "Bonfire", "BBQ")
- ✅ **Amenities** - Facilities with icons:
  - Shower
  - Toilet
  - Plug (charging)
  - Bonfire
  - Food
  - Sports
  - Parking

### 7. **Visibility Settings**
- ✅ **Is Popular** - Check if this should show "Popular" badge
- ✅ **Is Featured** - Check if this should appear on homepage
- ✅ **Display Order** - Number for sort order (lower = shows first)

---

## 🚨 Common Mistakes

### ❌ **Don't Leave Empty:**
- ❌ Rating = blank (will show as 0 stars)
- ❌ Location = blank (will show nothing)
- ❌ Capacity = blank (won't show guest count)
- ❌ Distance = blank (no travel info)

### ✅ **Do Fill Everything:**
- ✅ Every property has **rating** (4.8 - 5.0)
- ✅ Every property has **reviewCount** (realistic numbers)
- ✅ Every property has **location** and **distance**
- ✅ Every property has **capacity** info
- ✅ Every property has **GPS coordinates** for maps

---

## 📋 Quick Checklist Per Property

For **EACH property**, verify:

```
Property: _________________________

[ ] Title filled
[ ] Tagline (2-3 lines)
[ ] Description (4-5 lines)
[ ] Category selected
[ ] Price entered
[ ] Original price (if on sale)
[ ] Capacity filled (e.g., "2/3 Guests")
[ ] Rating (4.8-5.0)
[ ] Review count (e.g., 127)
[ ] Location (e.g., "Pawna Lake, Lonavala")
[ ] Distance (e.g., "2 hours from Mumbai")
[ ] Location Name (specific name)
[ ] Google Maps URL
[ ] Map Embed URL
[ ] GPS Coordinates (lat/lng)
[ ] Cover Image uploaded
[ ] Gallery (5-8 images)
[ ] Features (at least 3-5)
[ ] Inclusions (what's included)
[ ] Amenities (with icons)
[ ] Is Popular / Is Featured
[ ] Display Order
```

---

## 🔧 How to Fix

### Step 1: Open Sanity Studio
```bash
cd studio-lakeora
npm run dev
```
Then go to: http://localhost:3333

### Step 2: Go to Content → Property

### Step 3: For EACH property:
1. Click on the property
2. Fill in ALL fields listed above
3. Click **Publish**

### Step 4: Deploy Schema (if you added new fields)
```bash
cd studio-lakeora
npx sanity deploy
```

### Step 5: Test on Site
1. Go to https://lakeorastay.com/properties
2. Check that ALL properties show:
   - ✅ Correct rating
   - ✅ Location info
   - ✅ Capacity
   - ✅ Distance
   - ✅ All images
   - ✅ All features

---

## 📊 Current Status

After fixing, ALL properties should show data from Sanity:
- ❌ No more hardcoded "4.9" rating
- ❌ No more empty locations
- ❌ No more missing capacity
- ✅ Everything from Sanity CMS!

---

## 🎯 Properties to Update

Go through EACH of these:
1. **Maitri Camping** - Fill all fields
2. **Sunset Haven Dome** - Fill all fields
3. **Pine Cottage Retreat** - Fill all fields
4. **Waterfront Canvas Tent** - Fill all fields
5. **Any other properties** - Fill all fields

---

## ✅ Done?

Once ALL properties have complete data in Sanity:
1. Site will show real data (no fallbacks)
2. Each property will look unique
3. No more generic "4.9" rating everywhere
4. Maps will show correct locations
5. All images will be specific to each property

**No code changes needed - just fill Sanity CMS with real data!** 🎉
