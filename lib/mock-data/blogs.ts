import { BlogPost } from '@/types';

export const MOCK_BLOGS: BlogPost[] = [
  {
    id: 'blog-1',
    slug: 'ultimate-pawna-lake-camping-guide',
    title: 'The Ultimate Guide to Camping at Pawna Lake (2026 Edition)',
    excerpt: 'Everything you need to know about weather, best months, tent types, travel routes from Mumbai & Pune, and packing essentials.',
    content: `
Pawna Lake has transformed into Maharashtra’s favorite weekend getaway. Situated near Lonavala, just 2 hours from Pune and 2.5 hours from Mumbai, Pawna Lake offers serene waters, cool evening breeze, and magnificent fort backdrop.

### Best Time to Visit
- **Monsoon (July to September):** Lush green hills, overflowing waterfalls, and misty lake surroundings.
- **Winter (October to February):** Crisp cold evenings perfect for bonfires and stargazing. Temperature drops to 12°C.
- **Summer (March to May):** Cool evening breeze off the water; ideal for water sports and swimming.

### How to Reach
1. **From Mumbai:** Expressway → Lonavala Exit → Kamshet → Pawna Dam (approx 110 km).
2. **From Pune:** Pune-Mumbai Old Highway → Somatane Toll → Kamshet → Pawna Lake (approx 55 km).

### Essential Packing List
- Warm jackets or blankets for night breeze.
- Comfortable sports shoes for walking along rocky shorelines.
- Power bank for keeping electronics charged.
- Personal mosquito repellent cream.
    `,
    category: 'Travel Guide',
    coverImage: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=1200&q=80',
    author: {
      name: 'Sneha Roy',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      role: 'Senior Travel Writer'
    },
    publishedAt: 'Sep 10, 2026',
    readTime: '6 min read',
    tags: ['Pawna Lake', 'Camping Guide', 'Weekend Trip', 'Lonavala']
  },
  {
    id: 'blog-2',
    slug: 'glamping-vs-tent-camping',
    title: 'Glamping vs Traditional Tent Camping: Which One is Right for You?',
    excerpt: 'Comparing luxury AC dome tents with cozy canvas camping. Discover comfort, pricing, amenities, and vibe differences.',
    content: `
Whether you prefer luxury air-conditioned dome tents with private bathrooms or rustic canvas camping under the stars, Pawna Lake offers options for every style of traveler.

### What is Glamping?
Glamping combines "glamorous" and "camping". You get high-density mattresses, electrical plug sockets, attached washrooms, and climate control inside a dome tent.

### Traditional Camping Vibe
Classic tent camping focuses on authentic outdoorsiness — sleeping under double-layered waterproof canvas, listening to cricket chirps, and hanging out around communal campfires.
    `,
    category: 'Camping Tips',
    coverImage: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1200&q=80',
    author: {
      name: 'Rohan Sharma',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      role: 'Outdoor Specialist'
    },
    publishedAt: 'Aug 28, 2026',
    readTime: '4 min read',
    tags: ['Glamping', 'Tents', 'Comparison', 'Lifestyle']
  },
  {
    id: 'blog-3',
    slug: 'top-5-water-activities-pawna-lake',
    title: 'Top 5 Water Activities You Must Try at Pawna Lake',
    excerpt: 'From peaceful kayaking at sunrise to exhilarating speed boating and banana rides across the lake waters.',
    content: `
Water sports add an extra surge of excitement to your weekend campsite stay! Here are the top five activities available at LakeStay camps.

1. **Sunset Kayaking:** Quiet single or double kayak exploration.
2. **Speed Boating:** Thrilling lake ride with professional boat captains.
3. **Paddle Boarding:** Great balance workout along calm bay shorelines.
4. **Lake Swimming with Safety Vests:** Floating safely in freshwater.
5. **Banana Boat Rides:** Fun group water activity for friends.
    `,
    category: 'Activities',
    coverImage: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
    author: {
      name: 'Aditya Kadam',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      role: 'Adventure Host'
    },
    publishedAt: 'Aug 14, 2026',
    readTime: '5 min read',
    tags: ['Kayaking', 'Water Sports', 'Adventure']
  }
];
