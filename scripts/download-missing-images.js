/**
 * Download only missing food images from Unsplash
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

// Only the missing images
const imageUrls = [
  { file: 'paratha.jpg', url: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=800&h=600&fit=crop&q=85', name: 'Paratha' },
  { file: 'bhel.jpg', url: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&h=600&fit=crop&q=85', name: 'Corn Bhel' },
  { file: 'buttermilk.jpg', url: 'https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=800&h=600&fit=crop&q=85', name: 'Buttermilk' },
  { file: 'coconut.jpg', url: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=800&h=600&fit=crop&q=85', name: 'Coconut Water' },
  { file: 'gulab-jamun.jpg', url: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800&h=600&fit=crop&q=85', name: 'Gulab Jamun' },
];

const outputDir = path.join(__dirname, '../public/cafe-images');

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
        reject(new Error(`Failed: ${response.statusCode}`));
      }
    }).on('error', (err) => {
      fs.unlink(filepath, () => {});
      reject(err);
    });
  });
}

async function downloadMissingImages() {
  console.log('🚀 Downloading 5 missing images...\n');

  let successCount = 0;

  for (const item of imageUrls) {
    const filepath = path.join(outputDir, item.file);

    try {
      await downloadImage(item.url, filepath, item.name);
      successCount++;
    } catch (error) {
      console.error(`   ❌ Failed: ${item.name} - ${error.message}`);
    }

    await new Promise(resolve => setTimeout(resolve, 500));
  }

  console.log('\n═══════════════════════════════════════════════');
  console.log(`✨ Complete! Downloaded ${successCount}/5 missing images\n`);
}

downloadMissingImages().catch(console.error);
