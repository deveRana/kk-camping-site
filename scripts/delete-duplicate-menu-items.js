/**
 * Delete duplicate cafe menu items from Sanity
 * Keeps the first occurrence of each item, deletes the second
 */

const sanityClient = require('@sanity/client');

try {
  require('dotenv').config({ path: '.env.local' });
} catch (e) {
  console.log('⚠️  dotenv not installed, using environment variables');
}

const client = sanityClient.default({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'roac4c6v',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token: process.env.SANITY_API_WRITE_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
});

async function deleteDuplicates() {
  console.log('🔍 Finding duplicate menu items...\n');

  // Fetch all menu items
  const query = '*[_type == "cafeMenuItem"] | order(name asc, _createdAt asc)';
  const allItems = await client.fetch(query);

  console.log(`Found ${allItems.length} total items\n`);

  // Group by name
  const itemsByName = {};
  allItems.forEach(item => {
    if (!itemsByName[item.name]) {
      itemsByName[item.name] = [];
    }
    itemsByName[item.name].push(item);
  });

  // Find duplicates and delete them
  let deletedCount = 0;

  for (const [name, items] of Object.entries(itemsByName)) {
    if (items.length > 1) {
      console.log(`📦 ${name}: Found ${items.length} copies`);

      // Keep the first one, delete the rest
      for (let i = 1; i < items.length; i++) {
        const itemToDelete = items[i];
        console.log(`   🗑️  Deleting duplicate ID: ${itemToDelete._id}`);

        try {
          await client.delete(itemToDelete._id);
          deletedCount++;
          console.log(`   ✅ Deleted`);
        } catch (error) {
          console.error(`   ❌ Failed to delete: ${error.message}`);
        }
      }
      console.log('');
    }
  }

  console.log('═══════════════════════════════════════════════');
  console.log(`\n✨ Cleanup Complete!`);
  console.log(`   Deleted: ${deletedCount} duplicate items`);
  console.log(`   Remaining: ${allItems.length - deletedCount} unique items`);
  console.log('\n🎉 Menu is now clean!\n');
}

deleteDuplicates().catch((error) => {
  console.error('❌ Script failed:', error);
  process.exit(1);
});
