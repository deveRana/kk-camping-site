/**
 * Script to upload property cover images to Sanity CMS
 * Run with: npm run upload-property-images
 */

// Load environment variables from .env.local
import { config } from 'dotenv';
import { resolve } from 'path';
config({ path: resolve(process.cwd(), '.env.local') });

import { createClient } from '@sanity/client';
import { createReadStream } from 'fs';

// Initialize Sanity client with write permissions
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_WRITE_TOKEN!,
  useCdn: false,
});

interface PropertyImageMapping {
  propertySlug: string;
  propertyTitle: string;
  imagePath: string;
  coverImage: string;
  galleryImages: string[];
}

// Map property slugs to their images
const propertyImages: PropertyImageMapping[] = [
  {
    propertySlug: 'machang-cottages',
    propertyTitle: 'Machang Cottages',
    imagePath: 'public/machang-cottage-images',
    coverImage: 'machang-cottage-1.jpg',
    galleryImages: [
      'machang-cottage-1.jpg',
      'machang-cottage-2.jpg',
      'machang-cottage-3.jpg',
    ],
  },
  {
    propertySlug: 'swiss-tent',
    propertyTitle: 'Swiss Tent (Attached Washroom)',
    imagePath: 'public/swiss-tent',
    coverImage: 'swiss-tent-1.jpg',
    galleryImages: ['swiss-tent-1.jpg'],
  },
  {
    propertySlug: 'white-tent',
    propertyTitle: 'White Tent (With Light, Fan & Board)',
    imagePath: 'public/white-tent',
    coverImage: 'white-tent-1.jpg',
    galleryImages: ['white-tent-1.jpg'],
  },
  {
    propertySlug: 'normal-waterproof-tent',
    propertyTitle: 'Normal Waterproof Tent',
    imagePath: 'public/normal-tent',
    coverImage: 'normal-tent-1.jpeg',
    galleryImages: [
      'normal-tent-1.jpeg',
      'normal-tent-2.jpeg',
      'normal-tent-3.jpeg',
    ],
  },
];

async function uploadPropertyImage(mapping: PropertyImageMapping) {
  try {
    console.log(`\n📤 Processing: ${mapping.propertyTitle}...`);

    // Find the property in Sanity
    const property = await client.fetch(
      `*[_type == "property" && slug.current == $slug][0]{ _id, title, slug }`,
      { slug: mapping.propertySlug }
    );

    if (!property) {
      console.log(`   ⚠️  Property not found in Sanity: ${mapping.propertySlug}`);
      console.log(`   ℹ️  Please create this property in Sanity Studio first.`);
      return { success: false, reason: 'property_not_found' };
    }

    console.log(`   ✓ Found property: ${property.title} (${property._id})`);

    // Upload cover image
    const coverImagePath = resolve(process.cwd(), mapping.imagePath, mapping.coverImage);
    console.log(`   📤 Uploading cover image: ${mapping.coverImage}...`);

    const coverAsset = await client.assets.upload('image', createReadStream(coverImagePath), {
      filename: mapping.coverImage,
    });

    console.log(`   ✓ Cover image uploaded: ${coverAsset._id}`);

    // Upload gallery images
    const galleryAssets = [];
    for (const galleryImage of mapping.galleryImages) {
      const galleryImagePath = resolve(process.cwd(), mapping.imagePath, galleryImage);
      console.log(`   📤 Uploading gallery image: ${galleryImage}...`);

      const galleryAsset = await client.assets.upload('image', createReadStream(galleryImagePath), {
        filename: galleryImage,
      });

      console.log(`   ✓ Gallery image uploaded: ${galleryAsset._id}`);
      galleryAssets.push({
        _type: 'image',
        _key: galleryAsset._id,
        asset: {
          _type: 'reference',
          _ref: galleryAsset._id,
        },
      });

      // Small delay between uploads
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    // Update property with cover image and gallery
    await client
      .patch(property._id)
      .set({
        coverImage: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: coverAsset._id,
          },
        },
        gallery: galleryAssets,
      })
      .commit();

    console.log(`   ✓ Property updated with cover image and ${galleryAssets.length} gallery images`);
    return { success: true };
  } catch (error) {
    console.error(`   ✗ Failed to process ${mapping.propertyTitle}:`, error);
    return { success: false, error };
  }
}

async function main() {
  console.log('🚀 Starting property images upload to Sanity...\n');

  // Check if Sanity credentials are set
  if (!process.env.SANITY_API_WRITE_TOKEN) {
    console.error('❌ Error: SANITY_API_WRITE_TOKEN not set in environment variables');
    process.exit(1);
  }

  console.log(`📊 Total properties to update: ${propertyImages.length}\n`);

  let successCount = 0;
  let notFoundCount = 0;
  let failCount = 0;

  for (const mapping of propertyImages) {
    const result = await uploadPropertyImage(mapping);

    if (result.success) {
      successCount++;
    } else if (result.reason === 'property_not_found') {
      notFoundCount++;
    } else {
      failCount++;
    }

    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  console.log('\n' + '='.repeat(60));
  console.log('📊 Upload Summary:');
  console.log(`   ✓ Successfully updated: ${successCount}`);
  console.log(`   ⚠️  Properties not found in Sanity: ${notFoundCount}`);
  console.log(`   ✗ Failed: ${failCount}`);
  console.log(`   📁 Total: ${propertyImages.length}`);
  console.log('='.repeat(60));

  if (notFoundCount > 0) {
    console.log('\n⚠️  Some properties were not found in Sanity.');
    console.log('   Please create them in Sanity Studio first, then run this script again.');
  }

  if (successCount > 0) {
    console.log('\n✨ Property images uploaded successfully!');
    console.log('🌐 Refresh your site to see the updated cover images.');
  }
}

// Run the script
main().catch((error) => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});
