/**
 * Download real food images from Unsplash
 *
 * This script downloads high-quality food images for all 24 cafe menu items
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

// Unsplash image URLs for each menu item
// Using specific food photography from Unsplash
const imageUrls = [
  // Breakfast
  { file: 'chai.jpg', url: 'https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?w=800&h=600&fit=crop&q=85', name: 'Masala Chai' },
  { file: 'coffee.jpg', url: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&h=600&fit=crop&q=85', name: 'Filter Coffee' },
  { file: 'poha.jpg', url: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=800&h=600&fit=crop&q=85', name: 'Poha' },
  { file: 'omelette.jpg', url: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800&h=600&fit=crop&q=85', name: 'Omelette' },
  { file: 'paratha.jpg', url: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=800&h=600&fit=crop&q=85', name: 'Paratha' },
  { file: 'toast.jpg', url: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=800&h=600&fit=crop&q=85', name: 'French Toast' },

  // Lunch
  { file: 'paneer-masala.jpg', url: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=800&h=600&fit=crop&q=85', name: 'Paneer Butter Masala' },
  { file: 'dal.jpg', url: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&h=600&fit=crop&q=85', name: 'Dal Tadka' },
  { file: 'chicken-curry.jpg', url: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=800&h=600&fit=crop&q=85', name: 'Chicken Curry' },
  { file: 'veg-biryani.jpg', url: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&h=600&fit=crop&q=85', name: 'Veg Biryani' },
  { file: 'chicken-biryani.jpg', url: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&h=600&fit=crop&q=85', name: 'Chicken Biryani' },
  { file: 'rice.jpg', url: 'https://images.unsplash.com/photo-1516684732162-798a0062be99?w=800&h=600&fit=crop&q=85', name: 'Jeera Rice' },

  // Snacks
  { file: 'pakora.jpg', url: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&h=600&fit=crop&q=85', name: 'Pakora' },
  { file: 'bhel.jpg', url: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&h=600&fit=crop&q=85', name: 'Corn Bhel' },
  { file: 'maggi.jpg', url: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=800&h=600&fit=crop&q=85', name: 'Maggi' },
  { file: 'sandwich.jpg', url: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800&h=600&fit=crop&q=85', name: 'Sandwich' },
  { file: 'vada-pav.jpg', url: 'https://images.unsplash.com/photo-1626074353765-517a681e40be?w=800&h=600&fit=crop&q=85', name: 'Vada Pav' },

  // Beverages
  { file: 'cold-coffee.jpg', url: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=800&h=600&fit=crop&q=85', name: 'Cold Coffee' },
  { file: 'lime-soda.jpg', url: 'https://images.unsplash.com/photo-1556881286-fc6915169721?w=800&h=600&fit=crop&q=85', name: 'Lime Soda' },
  { file: 'mango-shake.jpg', url: 'https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=800&h=600&fit=crop&q=85', name: 'Mango Shake' },
  { file: 'buttermilk.jpg', url: 'https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=800&h=600&fit=crop&q=85', name: 'Buttermilk' },
  { file: 'coconut.jpg', url: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=800&h=600&fit=crop&q=85', name: 'Coconut Water' },

  // Desserts
  { file: 'gulab-jamun.jpg', url: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800&h=600&fit=crop&q=85', name: 'Gulab Jamun' },
  { file: 'ice-cream.jpg', url: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&h=600&fit=crop&q=85', name: 'Ice Cream' },
];

const outputDir = path.join(__dirname, '../public/cafe-images');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

function downloadImage(url, filepath, name) {
  return new Promise((resolve, reject) => {
    console.log(`📥 Downloading: ${name}...`);

    const file = fs.createWriteStream(filepath);

    https.get(url, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file);

        file.on('finish', () => {
          file.close();
          console.log(`   ✅ Saved: ${path.basename(filepath)}`);
          resolve();
        });
      } else {
        fs.unlink(filepath, () => {});
        reject(new Error(`Failed to download ${name}: ${response.statusCode}`));
      }
    }).on('error', (err) => {
      fs.unlink(filepath, () => {});
      reject(err);
    });
  });
}

async function downloadAllImages() {
  console.log('🚀 Starting download of 24 real food images from Unsplash...\n');

  let successCount = 0;
  let failCount = 0;

  for (const item of imageUrls) {
    const filepath = path.join(outputDir, item.file);

    try {
      await downloadImage(item.url, filepath, item.name);
      successCount++;
    } catch (error) {
      console.error(`   ❌ Failed: ${item.name}`);
      console.error(`      ${error.message}`);
      failCount++;
    }

    // Small delay between downloads to be nice to Unsplash
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  console.log('\n═══════════════════════════════════════════════');
  console.log(`\n✨ Download Complete!`);
  console.log(`   Success: ${successCount}/${imageUrls.length} images`);
  if (failCount > 0) {
    console.log(`   Failed: ${failCount} images`);
  }

  console.log('\n📝 Next steps:');
  console.log('   1. Run: node scripts/upload-real-images-to-sanity.js');
  console.log('   2. Images will be uploaded to Sanity CDN');
  console.log('   3. Website will show professional food photos!\n');
}

downloadAllImages().catch(console.error);
