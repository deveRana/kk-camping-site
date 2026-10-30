# Site-Wide Data Audit - Issues Found

## 🔍 Comprehensive Audit Results

Checked entire site for hardcoded values, fallback data, and incomplete Sanity integration.

---

## ❌ Issues Found

### 1. **Fallback Values in `lib/sanity/data.ts`** (41 instances)

#### **Site Settings** (8 fallbacks)
```typescript
brandName: s?.brandName ?? 'Lakeora',  // Hardcoded fallback
coordinates: { lat: s?.latitude ?? 18.6825, lng: s?.longitude ?? 73.4912 },  // Hardcoded GPS
paymentMethods: s?.paymentMethods ?? ['UPI', 'Credit Card', ...],  // Hardcoded list
paymentGateway: s?.paymentGateway ?? 'Razorpay',  // Hardcoded
```

**Impact:** If Sanity data is missing, shows hardcoded values instead of empty/error.

---

#### **Properties** (15 fallbacks)
```typescript
tagline: p.tagline ?? '',
rating: p.rating ?? 0,  // Good! Shows 0 if missing
reviewCount: p.reviewCount ?? 0,
location: p.location ?? '',
distance: p.distance ?? '',
capacity: p.capacity ?? '',
description: p.description ?? '',
features: p.features ?? [],
inclusions: p.inclusions ?? [],
amenities: (p.amenities ?? []),
// ... etc
```

**Status:** 
- ✅ Rating fallback is OK (0 makes it obvious)
- ⚠️ Other empty string fallbacks hide missing data

---

#### **Blog Posts** (7 fallbacks)
```typescript
excerpt: b.excerpt ?? '',
body: b.body ?? [],
category: b.category ?? '',
name: b.authorName ?? 'Lakeora Team',  // ❌ Hardcoded author!
role: b.authorRole ?? '',
readTime: b.readTime ?? '',
tags: b.tags ?? [],
```

**Impact:** 
- ❌ All blogs without author show "Lakeora Team" (looks generic)
- Missing excerpts/categories hidden by empty strings

---

#### **Testimonials** (4 fallbacks)
```typescript
location: t.location ?? '',
rating: t.rating ?? 5,  // ❌ Hardcoded 5 stars!
stayType: t.stayType ?? '',
date: t.date ?? '',
```

**Impact:** 
- ❌ **ALL testimonials without rating show 5 stars!**
- Makes all reviews look perfect (unrealistic)

---

#### **FAQs** (1 fallback)
```typescript
category: f.category ?? 'General',  // ❌ Hardcoded category
```

**Impact:** FAQs without category all show "General"

---

#### **Gallery** (1 fallback)
```typescript
caption: g.caption ?? '',
```

**Impact:** Missing captions hidden (OK for gallery)

---

#### **Cafe Menu** (3 fallbacks)
```typescript
description: item.description ?? '',
isVeg: item.isVeg ?? true,  // ❌ Defaults to Veg!
isSpecial: item.isSpecial ?? false,
order: item.order ?? 0,
```

**Impact:**
- ❌ Non-veg items without isVeg flag show as Veg (wrong!)
- Could confuse non-vegetarian customers

---

### 2. **Hardcoded Values in Components**

#### **About Page** (`app/about/page.tsx`)
```tsx
<span>12,500+</span>  // Hardcoded guest count
<p>Happy Guests</p>

<span>4.9 ★</span>  // Hardcoded rating
<p>Average Rating</p>

<span>100%</span>  // Hardcoded stat
<p>Clean Water & Food</p>
```

**Impact:**
- ❌ Statistics never update
- Shows same "4.9★" rating even if property ratings change
- Can't track actual guest count growth
- Manual update needed

---

#### **Footer** (`components/layout/Footer.tsx`)
```tsx
<a href="tel:+917499757607">
  <span>+91 74997 57607</span>
</a>
```

**Impact:**
- ❌ Hardcoded phone number
- Should come from Sanity siteSettings
- If number changes, need to update code

---

### 3. **Missing Sanity Integration**

#### **Statistics on About Page**
About page shows hardcoded stats that should be dynamic:
- Guest count (12,500+)
- Average rating (4.9★)
- Clean water/food percentage (100%)

**Should be:** Dynamic from Sanity or calculated from actual data

---

## ✅ What's Working Well

1. ✅ **Properties** - Now pull all data from Sanity (after our update)
2. ✅ **Property Ratings** - Each property has unique rating
3. ✅ **Property Locations** - Each has GPS coordinates
4. ✅ **Booking Flow** - Uses real-time data
5. ✅ **Gallery Images** - From Sanity
6. ✅ **Blog Posts** - Content from Sanity
7. ✅ **FAQs** - Questions from Sanity
8. ✅ **Cafe Menu** - Items from Sanity

---

## 🎯 Priority Issues to Fix

### **High Priority** (Affects User Experience)

1. **Testimonial Rating Fallback** (CRITICAL)
   - Issue: All testimonials default to 5★
   - Fix: Change to 0 or remove fallback
   - Impact: Makes reviews look fake/generic

2. **Cafe Menu isVeg Fallback**
   - Issue: Non-veg items show as Veg
   - Fix: Make isVeg required in Sanity
   - Impact: Could confuse vegetarian customers

3. **About Page Hardcoded Stats**
   - Issue: Never updates, shows old data
   - Fix: Create stats schema in Sanity
   - Impact: Site looks outdated

4. **Footer Phone Number**
   - Issue: Hardcoded, can't change easily
   - Fix: Pull from Sanity siteSettings
   - Impact: Manual code update needed

---

### **Medium Priority** (Data Quality)

5. **Blog Author Fallback**
   - Issue: All blogs show "Lakeora Team"
   - Fix: Make author required in Sanity
   - Impact: Less personal, generic feel

6. **FAQ Category Fallback**
   - Issue: All uncategorized FAQs show "General"
   - Fix: Make category required
   - Impact: Less organized

---

### **Low Priority** (Edge Cases)

7. **Site Settings Fallbacks**
   - Issue: Hidden missing data
   - Fix: Remove fallbacks, enforce required fields
   - Impact: Only affects if Sanity data missing

8. **Property Empty String Fallbacks**
   - Issue: Hides missing taglines, descriptions
   - Fix: Make fields required or show placeholder
   - Impact: Quality control

---

## 🔧 Recommended Fixes

### **Fix 1: Update Testimonial Rating Fallback**
```typescript
// lib/sanity/data.ts
rating: t.rating ?? 0,  // Change from 5 to 0
```

### **Fix 2: Update Cafe Menu isVeg Fallback**
```typescript
// lib/sanity/data.ts
isVeg: item.isVeg,  // Remove fallback, make required
```

### **Fix 3: Create Stats Schema in Sanity**
```typescript
// sanity/stats.ts
{
  name: 'siteStats',
  fields: [
    { name: 'totalGuests', type: 'number' },
    { name: 'averageRating', type: 'number' },
    { name: 'cleanlinessPercentage', type: 'number' },
  ]
}
```

### **Fix 4: Use Sanity Data in Footer**
```tsx
// components/layout/Footer.tsx
const settings = await getSiteSettings();
<a href={`tel:${settings.contactNumbers[0]}`}>
  <span>{settings.contactNumbers[0]}</span>
</a>
```

### **Fix 5: Make Blog Author Required**
```typescript
// sanity/blogPost.ts
defineField({
  name: 'authorName',
  type: 'string',
  validation: (Rule) => Rule.required(),  // Add this
}),
```

---

## 📊 Summary

| Category | Total | Fixed | Remaining |
|----------|-------|-------|-----------|
| **Property Fallbacks** | 15 | ✅ 5 | ⚠️ 10 |
| **Testimonial Issues** | 4 | ❌ 0 | ❌ 4 |
| **Blog Issues** | 7 | ❌ 0 | ❌ 7 |
| **Cafe Menu Issues** | 4 | ❌ 0 | ❌ 4 |
| **Hardcoded Components** | 5 | ❌ 0 | ❌ 5 |
| **Site Settings** | 8 | ❌ 0 | ❌ 8 |

**Total Issues Found:** 43  
**Fixed:** 5 (Properties)  
**Remaining:** 38

---

## 🎯 Next Steps

### **Immediate (Do Now):**
1. Fix testimonial rating fallback (5 → 0)
2. Fix cafe menu isVeg fallback
3. Remove hardcoded phone from Footer

### **Short Term (This Week):**
4. Create stats schema for About page
5. Make blog author required
6. Make FAQ category required

### **Long Term (When Needed):**
7. Review all fallback values
8. Make critical fields required in Sanity
9. Add data validation

---

## ✅ After Fixes

All data will come from Sanity:
- ✅ No hardcoded ratings
- ✅ No hardcoded phone numbers
- ✅ No hardcoded statistics
- ✅ All testimonials show real ratings
- ✅ Cafe menu accurately shows veg/non-veg
- ✅ Blog authors properly attributed
- ✅ Site updates via CMS only

**No code changes needed to update content!** 🎉
