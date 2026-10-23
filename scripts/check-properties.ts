/**
 * Script to check what properties exist in Sanity
 * Run with: npm run check-properties
 */

// Load environment variables from .env.local
import { config } from 'dotenv';
import { resolve } from 'path';
config({ path: resolve(process.cwd(), '.env.local') });

import { createClient } from '@sanity/client';

// Initialize Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_WRITE_TOKEN!,
  useCdn: false,
});

async function main() {
  console.log('🔍 Checking properties in Sanity...\n');

  // Check if Sanity credentials are set
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    console.error('❌ Error: NEXT_PUBLIC_SANITY_PROJECT_ID not set');
    process.exit(1);
  }

  try {
    // Fetch all properties
    const properties = await client.fetch(
      `*[_type == "property"] | order(order asc, price desc) {
        _id,
        title,
        "slug": slug.current,
        category,
        price,
        order,
        isFeatured,
        isPopular,
        _createdAt
      }`
    );

    if (properties.length === 0) {
      console.log('⚠️  No properties found in Sanity!');
      console.log('\nThis means:');
      console.log('1. Your Sanity database is empty');
      console.log('2. Properties need to be added via Sanity Studio');
      console.log('3. Or property schema might not be deployed\n');
      return;
    }

    console.log(`✅ Found ${properties.length} properties:\n`);
    console.log('═'.repeat(80));

    properties.forEach((prop: any, index: number) => {
      console.log(`\n${index + 1}. ${prop.title}`);
      console.log(`   Slug: /properties/${prop.slug}`);
      console.log(`   Category: ${prop.category}`);
      console.log(`   Price: ₹${prop.price.toLocaleString()}`);
      console.log(`   Order: ${prop.order || 'Not set'}`);
      console.log(`   Featured: ${prop.isFeatured ? '⭐ Yes' : 'No'}`);
      console.log(`   Popular: ${prop.isPopular ? '🔥 Yes' : 'No'}`);
      console.log(`   ID: ${prop._id}`);
      console.log(`   Created: ${new Date(prop._createdAt).toLocaleDateString()}`);
    });

    console.log('\n' + '═'.repeat(80));

    // Check specifically for Maitri
    const maitri = properties.find((p: any) => p.slug === 'maitri-camping');
    if (maitri) {
      console.log('\n✅ Maitri Camping EXISTS in Sanity!');
      console.log(`   Should be visible at: /properties/maitri-camping`);
      console.log(`   Wait 60 seconds for cache to refresh.`);
    } else {
      console.log('\n❌ Maitri Camping NOT FOUND in Sanity!');
      console.log('   Run: npm run add-maitri-package');
    }

  } catch (error: any) {
    console.error('❌ Error fetching properties:', error.message);
    console.log('\nPossible issues:');
    console.log('1. Wrong API token or project ID');
    console.log('2. Property schema not deployed to Sanity');
    console.log('3. Network connection issue');
  }
}

// Run the script
main().catch((error) => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});
