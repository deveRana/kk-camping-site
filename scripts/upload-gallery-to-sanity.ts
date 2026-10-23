/**
 * Script to upload gallery images from public/gallery-images to Sanity CMS
 * Run with: npm run upload-gallery
 */

// Load environment variables from .env.local
import { config } from 'dotenv';
import { resolve } from 'path';
config({ path: resolve(process.cwd(), '.env.local') });

import { createClient } from '@sanity/client';
import { createReadStream } from 'fs';
import { readdir } from 'fs/promises';

// Initialize Sanity client with write permissions
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN!,
  useCdn: false,
});

interface GalleryImageData {
  filename: string;
  title: string;
  category: 'Campsites' | 'Food' | 'Guests' | 'Activities' | 'Interiors';
  caption: string;
  order: number;
}

// Map images to their categories and metadata
const galleryMapping: GalleryImageData[] = [
  // Campsites (10 images)
  {
    filename: 'WhatsApp Image 2026-10-01 at 7.17.27 PM.jpeg',
    title: 'White Tents with Cottages',
    category: 'Campsites',
    caption: 'White canvas tents with colorful Machang cottages in the background.',
    order: 1,
  },
  {
    filename: 'WhatsApp Image 2026-10-01 at 7.17.30 PM.jpeg',
    title: 'Row of White Luxury Tents',
    category: 'Campsites',
    caption: 'Premium white canvas dome tents lined up with lakeside view.',
    order: 2,
  },
  {
    filename: 'WhatsApp Image 2026-10-01 at 7.17.35 PM.jpeg',
    title: 'White Tents Daytime View',
    category: 'Campsites',
    caption: 'Elevated white tents on platforms with lush greenery.',
    order: 3,
  },
  {
    filename: 'WhatsApp Image 2026-10-01 at 7.17.31 PM.jpeg',
    title: 'Normal Tents with Lake Activities',
    category: 'Campsites',
    caption: 'Camping tents with tree house and lakeside activities setup.',
    order: 4,
  },
  {
    filename: 'WhatsApp Image 2026-10-01 at 7.17.32 PM.jpeg',
    title: 'Grey Tents Lakeside Row',
    category: 'Campsites',
    caption: 'Row of waterproof grey dome tents with panoramic lake and mountain view.',
    order: 5,
  },

  // Food (4 images)
  {
    filename: 'WhatsApp Image 2026-10-01 at 7.17.26 PM.jpeg',
    title: 'Special Biryani Serving',
    category: 'Food',
    caption: 'Hot delicious biryani served fresh with condiments by the lakeside.',
    order: 20,
  },
  {
    filename: 'WhatsApp Image 2026-10-01 at 7.17.27 PM (1).jpeg',
    title: 'Fresh Campsite Meal',
    category: 'Food',
    caption: 'Fresh campsite meal preparation.',
    order: 21,
  },
  {
    filename: 'WhatsApp Image 2026-10-01 at 7.17.27 PM (2).jpeg',
    title: 'Delicious Camping Food',
    category: 'Food',
    caption: 'Delicious camping food spread.',
    order: 22,
  },
  {
    filename: 'WhatsApp Image 2026-10-01 at 7.17.27 PM (3).jpeg',
    title: 'Hot Lakeside Meals',
    category: 'Food',
    caption: 'Hot and fresh lakeside meals.',
    order: 23,
  },

  // Guests (18 images)
  {
    filename: 'WhatsApp Image 2026-10-01 at 7.17.28 PM.jpeg',
    title: 'Night Campfire Gathering',
    category: 'Guests',
    caption: 'Guests enjoying warm campfire with live acoustic music at night.',
    order: 30,
  },
  {
    filename: 'WhatsApp Image 2026-10-01 at 7.17.36 PM.jpeg',
    title: 'Large Family Group',
    category: 'Guests',
    caption: 'Big family gathering enjoying quality time at Lakeora camping.',
    order: 31,
  },
  {
    filename: 'WhatsApp Image 2026-10-01 at 7.17.28 PM (1).jpeg',
    title: 'Happy Guests at Pawna Lake',
    category: 'Guests',
    caption: 'Happy guests making memories at Pawna Lake.',
    order: 32,
  },
  {
    filename: 'WhatsApp Image 2026-10-01 at 7.17.28 PM (2).jpeg',
    title: 'Friends and Family Together',
    category: 'Guests',
    caption: 'Friends and family enjoying camping together.',
    order: 33,
  },
  {
    filename: 'WhatsApp Image 2026-10-01 at 7.17.29 PM (1).jpeg',
    title: 'Group Lakeside Experience',
    category: 'Guests',
    caption: 'Group enjoying lakeside camping experience.',
    order: 34,
  },
  {
    filename: 'WhatsApp Image 2026-10-01 at 7.17.29 PM (2).jpeg',
    title: 'Happy Campers at Lakeora',
    category: 'Guests',
    caption: 'Happy campers at Lakeora.',
    order: 35,
  },
  {
    filename: 'WhatsApp Image 2026-10-01 at 7.17.30 PM (1).jpeg',
    title: 'Memorable Moments with Friends',
    category: 'Guests',
    caption: 'Memorable moments with friends.',
    order: 36,
  },
  {
    filename: 'WhatsApp Image 2026-10-01 at 7.17.30 PM (2).jpeg',
    title: 'Group Photo at Campsite',
    category: 'Guests',
    caption: 'Group photo at campsite.',
    order: 37,
  },
  {
    filename: 'WhatsApp Image 2026-10-01 at 7.17.31 PM (1).jpeg',
    title: 'Friends Camping Weekend',
    category: 'Guests',
    caption: 'Friends enjoying camping weekend.',
    order: 38,
  },
  {
    filename: 'WhatsApp Image 2026-10-01 at 7.17.31 PM (2).jpeg',
    title: 'Camping with Loved Ones',
    category: 'Guests',
    caption: 'Camping memories with loved ones.',
    order: 39,
  },
  {
    filename: 'WhatsApp Image 2026-10-01 at 7.17.32 PM (1).jpeg',
    title: 'Guests at Pawna Lake',
    category: 'Guests',
    caption: 'Happy guests at Pawna Lake camping.',
    order: 40,
  },
  {
    filename: 'WhatsApp Image 2026-10-01 at 7.17.32 PM (2).jpeg',
    title: 'Lakeside Activities',
    category: 'Guests',
    caption: 'Group enjoying lakeside activities.',
    order: 41,
  },
  {
    filename: 'WhatsApp Image 2026-10-01 at 7.17.35 PM (1).jpeg',
    title: 'Friends Celebrating',
    category: 'Guests',
    caption: 'Friends celebrating at campsite.',
    order: 42,
  },
  {
    filename: 'WhatsApp Image 2026-10-01 at 7.17.35 PM (2).jpeg',
    title: 'Memorable Camping Experience',
    category: 'Guests',
    caption: 'Memorable camping experience.',
    order: 43,
  },
  {
    filename: 'WhatsApp Image 2026-10-01 at 7.17.36 PM (1).jpeg',
    title: 'Group Photo Memories',
    category: 'Guests',
    caption: 'Group photo memories.',
    order: 44,
  },
  {
    filename: 'WhatsApp Image 2026-10-01 at 7.17.37 PM (1).jpeg',
    title: 'Happy Campers Together',
    category: 'Guests',
    caption: 'Happy campers together.',
    order: 45,
  },
  {
    filename: 'WhatsApp Image 2026-10-01 at 7.17.37 PM (2).jpeg',
    title: 'Enjoying Nature',
    category: 'Guests',
    caption: 'Group enjoying nature.',
    order: 46,
  },
  {
    filename: 'WhatsApp Image 2026-10-01 at 7.17.38 PM (1).jpeg',
    title: 'Making Memories',
    category: 'Guests',
    caption: 'Friends making memories.',
    order: 47,
  },

  // Activities (8 images)
  {
    filename: 'WhatsApp Image 2026-10-01 at 7.17.33 PM.jpeg',
    title: 'Night View with String Lights',
    category: 'Activities',
    caption: 'Beautiful night ambience with decorative string lights and tents.',
    order: 50,
  },
  {
    filename: 'WhatsApp Image 2026-10-01 at 7.17.34 PM.jpeg',
    title: 'Kayaking on Pawna Lake',
    category: 'Activities',
    caption: 'Peaceful kayaking experience with stunning lake and mountain views.',
    order: 51,
  },
  {
    filename: 'WhatsApp Image 2026-10-01 at 7.17.33 PM (1).jpeg',
    title: 'Outdoor Activities Setup',
    category: 'Activities',
    caption: 'Outdoor activities and games setup.',
    order: 52,
  },
  {
    filename: 'WhatsApp Image 2026-10-01 at 7.17.33 PM (2).jpeg',
    title: 'Fun Activities for Guests',
    category: 'Activities',
    caption: 'Fun activities for guests.',
    order: 53,
  },
  {
    filename: 'WhatsApp Image 2026-10-01 at 7.17.34 PM (1).jpeg',
    title: 'Water Activities',
    category: 'Activities',
    caption: 'Water activities on Pawna Lake.',
    order: 54,
  },
  {
    filename: 'WhatsApp Image 2026-10-01 at 7.17.34 PM (2).jpeg',
    title: 'Exciting Outdoor Adventures',
    category: 'Activities',
    caption: 'Exciting outdoor adventures.',
    order: 55,
  },
  {
    filename: 'WhatsApp Image 2026-10-01 at 7.17.37 PM.jpeg',
    title: 'Activities with Games',
    category: 'Activities',
    caption: 'Activities area with games.',
    order: 56,
  },
  {
    filename: 'WhatsApp Image 2026-10-01 at 7.17.38 PM.jpeg',
    title: 'Fun for Everyone',
    category: 'Activities',
    caption: 'Fun and games for everyone.',
    order: 57,
  },

  // Interiors (1 image)
  {
    filename: 'WhatsApp Image 2026-10-01 at 7.17.29 PM.jpeg',
    title: 'Machang Cottage Interior',
    category: 'Interiors',
    caption: 'Cozy wooden interior of elevated Machang cottage with comfortable bed.',
    order: 60,
  },
];

// Normal tent images (separate folder)
const normalTentMapping: GalleryImageData[] = [
  {
    filename: 'normal-tent-1.jpeg',
    title: 'Normal Waterproof Tent View 1',
    category: 'Campsites',
    caption: 'Budget-friendly waterproof tents perfect for groups and couples.',
    order: 6,
  },
  {
    filename: 'normal-tent-2.jpeg',
    title: 'Normal Waterproof Tent View 2',
    category: 'Campsites',
    caption: 'Classic waterproof camping tent by the lakeside.',
    order: 7,
  },
  {
    filename: 'normal-tent-3.jpeg',
    title: 'Normal Waterproof Tent View 3',
    category: 'Campsites',
    caption: 'Comfortable waterproof tents for authentic camping experience.',
    order: 8,
  },
];

async function uploadImage(imageData: GalleryImageData, imagePath: string) {
  try {
    console.log(`📤 Uploading: ${imageData.title}...`);

    // Upload image to Sanity
    const asset = await client.assets.upload('image', createReadStream(imagePath), {
      filename: imageData.filename,
    });

    console.log(`   ✓ Image uploaded: ${asset._id}`);

    // Create gallery item document
    const doc = await client.create({
      _type: 'galleryItem',
      title: imageData.title,
      category: imageData.category,
      caption: imageData.caption,
      order: imageData.order,
      image: {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: asset._id,
        },
      },
    });

    console.log(`   ✓ Gallery item created: ${doc._id}`);
    return { success: true, doc };
  } catch (error) {
    console.error(`   ✗ Failed to upload ${imageData.title}:`, error);
    return { success: false, error };
  }
}

async function main() {
  console.log('🚀 Starting gallery upload to Sanity...\n');

  // Check if Sanity credentials are set
  if (!process.env.SANITY_API_TOKEN) {
    console.error('❌ Error: SANITY_API_TOKEN not set in environment variables');
    process.exit(1);
  }

  const galleryDir = resolve(process.cwd(), 'public', 'gallery-images');
  const normalTentDir = resolve(process.cwd(), 'public', 'normal-tent');

  const totalImages = galleryMapping.length + normalTentMapping.length;

  console.log(`📁 Gallery images directory: ${galleryDir}`);
  console.log(`📁 Normal tent directory: ${normalTentDir}`);
  console.log(`📊 Total images to upload: ${totalImages}\n`);

  let successCount = 0;
  let failCount = 0;

  // Upload gallery images
  console.log('📤 Uploading gallery images...\n');
  for (const imageData of galleryMapping) {
    const imagePath = resolve(galleryDir, imageData.filename);
    const result = await uploadImage(imageData, imagePath);

    if (result.success) {
      successCount++;
    } else {
      failCount++;
    }

    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  // Upload normal tent images
  console.log('\n📤 Uploading normal tent images...\n');
  for (const imageData of normalTentMapping) {
    const imagePath = resolve(normalTentDir, imageData.filename);
    const result = await uploadImage(imageData, imagePath);

    if (result.success) {
      successCount++;
    } else {
      failCount++;
    }

    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  console.log('\n' + '='.repeat(60));
  console.log('📊 Upload Summary:');
  console.log(`   ✓ Successfully uploaded: ${successCount}`);
  console.log(`   ✗ Failed: ${failCount}`);
  console.log(`   📁 Total: ${totalImages}`);
  console.log('='.repeat(60));

  if (successCount > 0) {
    console.log('\n✨ Gallery images uploaded successfully!');
    console.log('🌐 Visit your Sanity Studio to view them.');
  }
}

// Run the script
main().catch((error) => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});
