/**
 * Upload real food images (JPG) to Sanity CMS
 *
 * Prerequisites:
 * 1. Real images downloaded to public/cafe-images/
 * 2. SANITY_API_WRITE_TOKEN in .env.local
 *
 * Run with: node scripts/upload-real-images-to-sanity.js
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

// Menu item name to image file mapping
const menuItemMapping = [
  { file: 'chai.jpg', name: 'Classic Masala Chai' },
  { file: 'coffee.jpg', name: 'Filter Coffee' },
  { file: 'poha.jpg', name: 'Poha' },
  { file: 'omelette.jpg', name: 'Masala Omelette' },
  { file: 'paratha.jpg', name: 'Aloo Paratha' },
  { file: 'toast.jpg', name: 'French Toast' },
  { file: 'paneer-masala.jpg', name: 'Paneer Butter Masala' },
  { file: 'dal.jpg', name: 'Dal Tadka' },
  { file: 'chicken-curry.jpg', name: 'Chicken Curry' },
  { file: 'veg-biryani.jpg', name: 'Veg Biryani' },
  { file: 'chicken-biryani.jpg', name: 'Chicken Biryani' },
  { file: 'rice.jpg', name: 'Jeera Rice' },
  { file: 'pakora.jpg', name: 'Veg Pakora' },
  { file: 'bhel.jpg', name: 'Corn Bhel' },
  { file: 'maggi.jpg', name: 'Maggi' },
  { file: 'sandwich.jpg', name: 'Cheese Sandwich' },
  { file: 'vada-pav.jpg', name: 'Vada Pav' },
  { file: 'cold-coffee.jpg', name: 'Cold Coffee' },
  { file: 'lime-soda.jpg', name: 'Fresh Lime Soda' },
  { file: 'mango-shake.jpg', name: 'Mango Shake' },
  { file: 'buttermilk.jpg', name: 'Masala Buttermilk' },
  { file: 'coconut.jpg', name: 'Fresh Coconut Water' },
  { file: 'gulab-jamun.jpg', name: 'Gulab Jamun' },
  { file: 'ice-cream.jpg', name: 'Ice Cream' },
];

async function uploadImageToSanity(filePath, fileName) {
  try {
    const fileBuffer = fs.readFileSync(filePath);
    const asset = await client.assets.upload('image', fileBuffer, {
      filename: fileName,
      contentType: 'image/jpeg',
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
  console.log('🚀 Starting upload of real food images to Sanity...\n');

  // Check for write token
  if (!process.env.SANITY_API_WRITE_TOKEN) {
    console.error('❌ SANITY_API_WRITE_TOKEN not found in .env.local');
    process.exit(1);
  }

  const imagesDir = path.join(__dirname, '../public/cafe-images');
  let successCount = 0;
  let totalCount = menuItemMapping.length;

  console.log(`📁 Uploading ${totalCount} real images to Sanity...\n`);

  for (const item of menuItemMapping) {
    const filePath = path.join(imagesDir, item.file);

    if (!fs.existsSync(filePath)) {
      console.log(`⚠️  File not found: ${item.file} (skipping)`);
      continue;
    }

    console.log(`📤 Uploading: ${item.file}...`);

    // Upload image
    const asset = await uploadImageToSanity(filePath, item.file);

    if (asset) {
      console.log(`   ✅ Uploaded to Sanity CDN`);

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
    console.log('\n🎉 Real food images are now in Sanity CMS!');
    console.log('\n📝 Next steps:');
    console.log('   1. Visit http://localhost:3000/cafe');
    console.log('   2. You should see professional food photos!');
    console.log('   3. Images are hosted on Sanity CDN');
    console.log('   4. Full width/height responsive images\n');
  }
}

// Run the script
main().catch((error) => {
  console.error('❌ Script failed:', error);
  process.exit(1);
});
