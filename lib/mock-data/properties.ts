import { Property } from '@/types';
import { PAWNA_CAMPSITE_MASTER_DATA } from './campsite-info';

export const MOCK_PROPERTIES: Property[] = PAWNA_CAMPSITE_MASTER_DATA.packages.map((pkg) => ({
  id: pkg.id,
  slug: pkg.slug,
  title: pkg.name,
  tagline: pkg.tagline,
  category: pkg.category,
  price: pkg.pricePerPerson,
  originalPrice: pkg.originalPricePerPerson,
  rating: 4.9,
  reviewCount: pkg.id === 'pkg-machang-cottage' ? 142 : pkg.id === 'pkg-swiss-tent' ? 186 : pkg.id === 'pkg-white-tent' ? 115 : 210,
  location: 'Gevhande Khadak, Pawna Lake',
  distance: '2.5 hrs from Mumbai · 1.5 hrs from Pune',
  capacity: pkg.capacity,
  coverImage: pkg.coverImage,
  gallery: pkg.gallery,
  description: `${pkg.tagline}. Located at Pawna Lake NightHunt. Separate private setup for your group with unlimited evening tea, limited BBQ, unlimited veg/non-veg dinner, campfire live acoustic music, morning breakfast, and free sports activities included.`,
  features: pkg.highlights,
  amenities: [
    ...(pkg.hasAttachedWashroom ? [{ icon: 'shower', name: 'Attached Washroom' }] : [{ icon: 'toilet', name: 'Common Clean Toilets' }]),
    ...(pkg.hasLightFanBoard ? [{ icon: 'plug', name: 'In-tent Light, Fan & Charging' }] : []),
    { icon: 'bonfire', name: 'Campfire & Live Music' },
    { icon: 'food', name: 'BBQ, Dinner & Breakfast' },
    { icon: 'sports', name: 'Free Archery, Volleyball & Cricket' },
    { icon: 'parking', name: 'Free Secure Parking' }
  ],
  host: {
    name: 'Pawna Lake NightHunt',
    avatar: '/logos/logo.PNG',
    superhost: false,
    joined: 'Verified Lakeside Campsite',
    phone: PAWNA_CAMPSITE_MASTER_DATA.contactNumbers[0]
  },
  coordinates: PAWNA_CAMPSITE_MASTER_DATA.location.coordinates,
  isPopular: pkg.pricePerPerson <= 2300,
  isFeatured: true
}));
