/**
 * Script to update Maitri Camping to be featured on homepage
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

async function main() {
  console.log('🚀 Updating Maitri Camping to be featured on homepage...\n');

  // Check if Sanity credentials are set
  if (!process.env.SANITY_API_WRITE_TOKEN) {
    console.error('❌ Error: SANITY_API_WRITE_TOKEN not set in environment variables');
    process.exit(1);
  }

  try {
    // Find Maitri Camping
    const existing = await client.fetch(
      `*[_type == "property" && slug.current == $slug][0]{ _id, title, isFeatured, googleMapsUrl, locationName }`,
      { slug: 'maitri-camping' }
    );

    if (!existing) {
      console.log('❌ Maitri Camping not found in Sanity');
      console.log('   Run: npm run add-maitri-package first');
      return;
    }

    console.log(`✓ Found: ${existing.title} (${existing._id})`);
    console.log(`  Current isFeatured: ${existing.isFeatured || false}`);
    console.log(`  Current googleMapsUrl: ${existing.googleMapsUrl ? 'set' : 'not set'}`);

    // Update to featured and add location data
    const result = await client
      .patch(existing._id)
      .set({
        isFeatured: true,
        locationName: 'Pawna Tent Camp by Maitri - Lonavala',
        googleMapsUrl: 'https://www.google.com/maps/place/Pawna+Tent+Camp+by+Maitri+Pawna+Lake+Camping+for+Couples+%26+Family+Lonavala+%7C+Tent+%26+Cottage+Camping/@18.6324747,73.4943782,17z/data=!4m9!3m8!1s0x3bc2a7ea40fa93d5:0xd347c333111ba7d8!5m2!4m1!1i2!8m2!3d18.6311632!4d73.4951721!16s%2Fg%2F11x8v2c58q',
        mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3780.7018670068865!2d73.49437816613157!3d18.632474684937243!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2a7ea40fa93d5%3A0xd347c333111ba7d8!2sPawna%20Tent%20Camp%20by%20Maitri%20Pawna%20Lake%20Camping%20for%20Couples%20%26%20Family%20Lonavala%20%7C%20Tent%20%26%20Cottage%20Camping!5e0!3m2!1sen!2sin!4v1792930352424!5m2!1sen!2sin',
        coordinates: {
          lat: 18.6311632,
          lng: 73.4951721
        }
      })
      .commit();

    console.log(`\n✅ Updated successfully!`);
    console.log(`   ${existing.title} is now featured on homepage`);
    console.log(`   isFeatured: true`);
    console.log(`   Location fields: googleMapsUrl, mapEmbed, coordinates added`);
    console.log('\n🎉 Maitri Camping will now appear in "Handpicked Campsites" section');

  } catch (error) {
    console.error('❌ Failed to update:', error);
    process.exit(1);
  }
}

// Run the script
main().catch((error) => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});
