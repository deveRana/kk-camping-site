import { Property } from '@/types';

export const MOCK_PROPERTIES: Property[] = [
  {
    id: 'prop-1',
    slug: 'sunset-haven-glamping',
    title: 'Sunset Haven Lakeside Glamping',
    tagline: 'Luxury air-conditioned dome tents right on the water edge',
    category: 'Glamping',
    price: 1899,
    originalPrice: 2499,
    rating: 4.9,
    reviewCount: 142,
    location: 'Thakurwadi, Pawna Lake',
    distance: '2.5 hrs from Mumbai · 1.5 hrs from Pune',
    capacity: '2-4 Guests',
    coverImage: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1537905569824-f89f14cceb68?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Experience premier lakeside glamping at Sunset Haven. Nestled along the serene shores of Pawna Lake, our geometric dome tents feature cozy king beds, private washrooms, climate control, and uninterrupted views of the sunset over the water.',
    features: ['Direct Lake Frontage', 'Unlimited Unlimited BBQ & Meals', 'Acoustic Live Music', 'Private Deck'],
    amenities: [
      { icon: 'tent', name: 'AC Geodesic Dome' },
      { icon: 'wifi', name: 'Free Wi-Fi' },
      { icon: 'bonfire', name: 'Private Bonfire' },
      { icon: 'food', name: 'Dinner & Breakfast' },
      { icon: 'kayak', name: 'Free Kayaking' },
      { icon: 'parking', name: 'Secure Parking' }
    ],
    host: {
      name: 'Vikram & Sneha Deshmukh',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      superhost: true,
      joined: 'Member since 2021',
      phone: '+91 98230 45678'
    },
    coordinates: { lat: 18.6874, lng: 73.4841 },
    isPopular: true,
    isFeatured: true
  },
  {
    id: 'prop-2',
    slug: 'misty-bay-cottage',
    title: 'Misty Bay Wooden Cottage',
    tagline: 'Rustic wooden chalet with private porch and mountain view',
    category: 'Cottage',
    price: 2499,
    originalPrice: 3200,
    rating: 4.8,
    reviewCount: 98,
    location: 'Ambegaon, Pawna Lake',
    distance: '2 hrs from Pune',
    capacity: '2-5 Guests',
    coverImage: 'https://images.unsplash.com/photo-1587061949409-02df41d5e562?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1587061949409-02df41d5e562?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Charming handcrafted pine wood cottages surrounded by lush greenery and mist in the mornings. Features ensuite bathroom, tea/coffee bar, and a patio overlooking the lake.',
    features: ['Solid Pinewood Build', 'Hot Shower Bathrooms', 'Barbecue Kit Included', 'Hill View Porch'],
    amenities: [
      { icon: 'home', name: 'Wooden Cabin' },
      { icon: 'shower', name: 'Attached Bath' },
      { icon: 'coffee', name: 'Tea & Coffee Maker' },
      { icon: 'food', name: 'Buffet Meals' },
      { icon: 'bonfire', name: 'Common Bonfire' }
    ],
    host: {
      name: 'Rohan Patil',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      superhost: true,
      joined: 'Member since 2022',
      phone: '+91 97654 32109'
    },
    coordinates: { lat: 18.675, lng: 73.491 },
    isPopular: true,
    isFeatured: true
  },
  {
    id: 'prop-3',
    slug: 'starlight-safari-tents',
    title: 'Starlight Safari Tent Camp',
    tagline: 'Spacious waterproof safari tents with twin beds and lake breeze',
    category: 'Tent Camping',
    price: 1199,
    originalPrice: 1600,
    rating: 4.7,
    reviewCount: 210,
    location: 'Kevare, Pawna Lake',
    distance: '2.5 hrs from Mumbai',
    capacity: '2-3 Guests',
    coverImage: 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Budget-friendly authentic camping experience under the vast night sky. Double-layer waterproof tents equipped with comfortable foam mattresses, clean bedsheets, and cozy blankets.',
    features: ['Ideal for Friends & Couples', 'Evening Snacks & Tea', 'Live DJ Night (Saturdays)', 'Boating Access'],
    amenities: [
      { icon: 'tent', name: 'Weatherproof Tent' },
      { icon: 'food', name: 'Veg / Non-Veg Dinner' },
      { icon: 'music', name: 'Music & Games' },
      { icon: 'bonfire', name: 'Campfire' }
    ],
    host: {
      name: 'Aditya Kadam',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      superhost: false,
      joined: 'Member since 2023',
      phone: '+91 99887 65432'
    },
    coordinates: { lat: 18.692, lng: 73.479 },
    isPopular: false,
    isFeatured: true
  },
  {
    id: 'prop-4',
    slug: 'pawna-panoramic-villa',
    title: 'Pawna Panoramic Lakefront Villa',
    tagline: 'Private 3-BHK luxury villa with plunge pool overlooking Tikona Fort',
    category: 'Villa',
    price: 4999,
    originalPrice: 6500,
    rating: 4.95,
    reviewCount: 64,
    location: 'Thakurwadi, Pawna Lake',
    distance: '2 hrs from Pune',
    capacity: '6-10 Guests',
    coverImage: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Exclusive private villa designed for family gatherings and group celebrations. Panoramic floor-to-ceiling glass windows, private swimming pool, lawn area, and personal chef on call.',
    features: ['Private Plunge Pool', 'Personal Chef Available', 'Lawn & Gazebo', 'BBQ Grill Set'],
    amenities: [
      { icon: 'pool', name: 'Private Pool' },
      { icon: 'wifi', name: 'High-speed Wi-Fi' },
      { icon: 'ac', name: 'Full AC Rooms' },
      { icon: 'food', name: 'Chef On Request' },
      { icon: 'parking', name: 'Private Parking' }
    ],
    host: {
      name: 'Nisha Mehta',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
      superhost: true,
      joined: 'Member since 2020',
      phone: '+91 98765 12345'
    },
    coordinates: { lat: 18.681, lng: 73.488 },
    isPopular: true,
    isFeatured: false
  }
];
