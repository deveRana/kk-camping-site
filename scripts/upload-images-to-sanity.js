/**
 * Upload cafe menu images to Sanity CMS
 *
 * Prerequisites:
 * 1. Sanity schema deployed (cafeMenuItem)
 * 2. Menu items imported to Sanity
 * 3. SANITY_API_WRITE_TOKEN in .env.local
 *
 * Run with: node scripts/upload-images-to-sanity.js
 */

const fs = require('fs');
const path = require('path');
const sanityClient = require('@sanity/client');

// Check if dotenv is available
try {
  require('dotenv').config({ path: '.env.local' });
} catch (e) {
  console.log('⚠️  dotenv not installed, using environment variables');
}

// Initialize Sanity client
const client = sanityClient.default({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'roac4c6v',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token: process.env.SANITY_API_WRITE_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
});

// Menu item name to Sanity document mapping
const menuItemMapping = [
  { file: 'chai.svg', name: 'Classic Masala Chai' },
  { file: 'coffee.svg', name: 'Filter Coffee' },
  { file: 'poha.svg', name: 'Poha' },
  { file: 'omelette.svg', name: 'Masala Omelette' },
  { file: 'paratha.svg', name: 'Aloo Paratha' },
  { file: 'toast.svg', name: 'French Toast' },
  { file: 'paneer-masala.svg', name: 'Paneer Butter Masala' },
  { file: 'dal.svg', name: 'Dal Tadka' },
  { file: 'chicken-curry.svg', name: 'Chicken Curry' },
  { file: 'veg-biryani.svg', name: 'Veg Biryani' },
  { file: 'chicken-biryani.svg', name: 'Chicken Biryani' },
  { file: 'rice.svg', name: 'Jeera Rice' },
  { file: 'pakora.svg', name: 'Veg Pakora' },
  { file: 'bhel.svg', name: 'Corn Bhel' },
  { file: 'maggi.svg', name: 'Maggi' },
  { file: 'sandwich.svg', name: 'Cheese Sandwich' },
  { file: 'vada-pav.svg', name: 'Vada Pav' },
  { file: 'cold-coffee.svg', name: 'Cold Coffee' },
  { file: 'lime-soda.svg', name: 'Fresh Lime Soda' },
  { file: 'mango-shake.svg', name: 'Mango Shake' },
  { file: 'buttermilk.svg', name: 'Masala Buttermilk' },
  { file: 'coconut.svg', name: 'Fresh Coconut Water' },
  { file: 'gulab-jamun.svg', name: 'Gulab Jamun' },
  { file: 'ice-cream.svg', name: 'Ice Cream' },
];

async function uploadImageToSanity(filePath, fileName) {
  try {
    const fileBuffer = fs.readFileSync(filePath);
    const asset = await client.assets.upload('image', fileBuffer, {
      filename: fileName,
      contentType: 'image/svg+xml',
    });
    return asset;
  } catch (error) {
    console.error(`❌ Failed to upload ${fileName}:`, error.message);
    return null;
  }
}

async function updateMenuItemWithImage(itemName, imageAsset) {
  try {
    // Find the menu item by name
    const query = `*[_type == "cafeMenuItem" && name == $name][0]`;
    const params = { name: itemName };
    const menuItem = await client.fetch(query, params);

    if (!menuItem) {
      console.log(`⚠️  Menu item not found: ${itemName}`);
      return false;
    }

    // Update the menu item with the image
    await client
      .patch(menuItem._id)
      .set({
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: imageAsset._id,
          },
        },
      })
      .commit();

    return true;
  } catch (error) {
    console.error(`❌ Failed to update ${itemName}:`, error.message);
    return false;
  }
}

async function main() {
  console.log('🚀 Starting Sanity image upload...\n');

  // Check for write token
  if (!process.env.SANITY_API_WRITE_TOKEN) {
    console.error('❌ SANITY_API_WRITE_TOKEN not found in .env.local');
    console.error('\nPlease add your Sanity write token:');
    console.error('1. Go to: https://www.sanity.io/manage');
    console.error('2. Select your project');
    console.error('3. Go to API > Tokens');
    console.error('4. Create a token with "Editor" permissions');
    console.error('5. Add to .env.local:\n');
    console.error('   SANITY_API_WRITE_TOKEN=your_token_here\n');
    process.exit(1);
  }

  const imagesDir = path.join(__dirname, '../public/cafe-images');
  let successCount = 0;
  let totalCount = menuItemMapping.length;

  console.log(`📁 Uploading ${totalCount} images to Sanity...\n`);

  for (const item of menuItemMapping) {
    const filePath = path.join(imagesDir, item.file);

    if (!fs.existsSync(filePath)) {
      console.log(`⚠️  File not found: ${item.file}`);
      continue;
    }

    console.log(`📤 Uploading: ${item.file}...`);

    // Upload image
    const asset = await uploadImageToSanity(filePath, item.file);

    if (asset) {
      console.log(`   ✅ Uploaded to Sanity: ${asset._id}`);

      // Update menu item
      const updated = await updateMenuItemWithImage(item.name, asset);

      if (updated) {
        console.log(`   ✅ Updated menu item: ${item.name}`);
        successCount++;
      }
    }

    console.log('');
  }

  console.log('═══════════════════════════════════════════════');
  console.log(`\n✨ Upload Complete!`);
  console.log(`   Success: ${successCount}/${totalCount} items`);

  if (successCount > 0) {
    console.log('\n🎉 Images are now in Sanity CMS!');
    console.log('\n📝 Next steps:');
    console.log('   1. Visit your Sanity Studio');
    console.log('   2. Check "☕ Cafe Menu"');
    console.log('   3. You should see images attached to each item');
    console.log('   4. Your website will now load images from Sanity CDN!\n');
  }
}

// Run the script
main().catch((error) => {
  console.error('❌ Script failed:', error);
  process.exit(1);
});
