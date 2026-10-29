/**
 * Script to add Maitri Camping package to Sanity CMS
 * Run with: npm run add-maitri-package
 */

// Load environment variables from .env.local
import { config } from 'dotenv';
import { resolve } from 'path';
config({ path: resolve(process.cwd(), '.env.local') });

import { createClient } from '@sanity/client';

// Initialize Sanity client with write permissions
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_WRITE_TOKEN!,
  useCdn: false,
});

const maitriPackage = {
  _type: 'property',
  title: 'Maitri Camping',
  slug: {
    _type: 'slug',
    current: 'maitri-camping',
  },
  tagline: 'Affordable lakeside camping with complete meals, BBQ, and free activities for couples & families',
  category: 'Tent Camping',
  price: 1500,
  capacity: '2/3/4 Guests sharing',
  rating: 4.8,
  reviewCount: 45,
  location: 'Pawna Tent Camp by Maitri, Lonavala',
  distance: '2 hours from Mumbai · 1.5 hours from Pune',
  googleMapsUrl: 'https://www.google.com/maps/place/Pawna+Tent+Camp+by+Maitri+Pawna+Lake+Camping+for+Couples+%26+Family+Lonavala+%7C+Tent+%26+Cottage+Camping/@18.6324747,73.4943782,17z/data=!4m9!3m8!1s0x3bc2a7ea40fa93d5:0xd347c333111ba7d8!5m2!4m1!1i2!8m2!3d18.6311632!4d73.4951721!16s%2Fg%2F11x8v2c58q',
  mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3780.7018670068865!2d73.49437816613157!3d18.632474684937243!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2a7ea40fa93d5%3A0xd347c333111ba7d8!2sPawna%20Tent%20Camp%20by%20Maitri%20Pawna%20Lake%20Camping%20for%20Couples%20%26%20Family%20Lonavala%20%7C%20Tent%20%26%20Cottage%20Camping!5e0!3m2!1sen!2sin!4v1792930352424!5m2!1sen!2sin',
  coordinates: {
    lat: 18.6311632,
    lng: 73.4951721
  },
  description: 'Welcome to Maitri Camping at Pawna Lake! Perfect for couples and families looking for an affordable lakeside getaway. Enjoy waterproof tents, western toilet facilities, free parking, and unlimited entertainment with sports activities like badminton, cricket, volleyball, and archery. Complete your experience with delicious BBQ, unlimited dinner buffet, and morning breakfast.',
  features: [
    'Western Toilet Facility',
    'Free Parking',
    'Free Sports Activities',
    'Music System',
    'Unlimited Dinner',
    'Morning Breakfast',
  ],
  inclusions: [
    '2/3/4 Person Sharing Waterproof Tents',
    'Western Toilet Access',
    'Free Parking',
    'Evening Snacks & High Tea',
    'Free Activities: Badminton, Football, Volleyball, Cricket, Archery 🏏🏹⚽',
    'Music System for Entertainment 🎼',
    'Limited Veg / Non-Veg BBQ (7:00 PM - 8:30 PM) 🍢',
    'Unlimited Dinner Buffet (9:30 PM - 11:00 PM)',
    'Veg: Paneer Masala, Dal, Roti, Rice, Aalu Sabji, Salad, Sweet',
    'Non-Veg: Chicken Masala, Chicken Curry, Roti, Rice, Salad, Sweet',
    'Morning Breakfast: Poha & Tea',
    'Check-in: 4:00 PM | Check-out: 11:00 AM',
    'Contact: +91 95271 43112',
  ],
  amenities: [
    { _key: 'parking', icon: 'parking', name: 'Free Parking' },
    { _key: 'toilet', icon: 'toilet', name: 'Western Toilet' },
    { _key: 'sports', icon: 'sports', name: 'Free Sports Activities' },
    { _key: 'food', icon: 'food', name: 'Unlimited Meals' },
    { _key: 'bonfire', icon: 'bonfire', name: 'Music & Entertainment' },
  ],
  isPopular: false,
  isFeatured: true,
  order: 5,
};

async function main() {
  console.log('🚀 Adding Maitri Camping package to Sanity...\n');

  // Check if Sanity credentials are set
  if (!process.env.SANITY_API_WRITE_TOKEN) {
    console.error('❌ Error: SANITY_API_WRITE_TOKEN not set in environment variables');
    process.exit(1);
  }

  try {
    // Check if package already exists
    const existing = await client.fetch(
      `*[_type == "property" && slug.current == $slug][0]{ _id, title }`,
      { slug: 'maitri-camping' }
    );

    if (existing) {
      console.log(`⚠️  Maitri Camping already exists in Sanity (${existing._id})`);
      console.log('   Skipping creation to avoid duplicates.');
      console.log('   If you want to update it, delete it from Sanity Studio first.');
      return;
    }

    // Create the package
    const result = await client.create(maitriPackage);
    console.log(`✓ Maitri Camping package created successfully!`);
    console.log(`   Document ID: ${result._id}`);
    console.log(`   Slug: maitri-camping`);
    console.log(`   Price: ₹1,500 per person`);
    console.log('\n✨ Package is now live on your site!');
    console.log('🌐 Visit: https://your-site.com/properties/maitri-camping');
    console.log('\n📝 Note: You still need to upload images for this package in Sanity Studio.');
    console.log('   Using: normal-tent images as placeholders for now.');

  } catch (error) {
    console.error('❌ Failed to create package:', error);
    process.exit(1);
  }
}

// Run the script
main().catch((error) => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});
