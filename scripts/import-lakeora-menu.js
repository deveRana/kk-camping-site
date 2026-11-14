/**
 * Replace the Sanity cafe menu with the official Lakeora Café menu card.
 *
 * Usage: node scripts/import-lakeora-menu.js <backupDir> [--images=<dir>] [--dry-run]
 *   --images=<dir>  optional; uses <dir>/<slug>.jpg where present. Without it items are
 *                   imported with no image (site shows a placeholder) so photos can be added later.
 *
 * - Backs up existing cafeMenuItem docs to <backupDir>/old-menu-backup.json
 * - Upserts every item with a stable _id (cafe-<slug>) → safe to re-run
 * - Deletes cafeMenuItem docs that are not part of the new menu
 * Requires SANITY_API_WRITE_TOKEN in .env.local
 */
const fs = require('fs');
const path = require('path');
const sanityClient = require('@sanity/client');
try { require('dotenv').config({ path: '.env.local' }); } catch (e) { /* env already set */ }
const { items } = require('./lakeora-menu');

const backupDir = process.argv[2];
const imagesArg = process.argv.find((a) => a.startsWith('--images='));
const imagesDir = imagesArg ? imagesArg.replace('--images=', '') : null;
const dryRun = process.argv.includes('--dry-run');
if (!backupDir) { console.error('backupDir required'); process.exit(1); }

const client = sanityClient.default({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'roac4c6v',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token: process.env.SANITY_API_WRITE_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
});

async function main() {
  const old = await client.fetch('*[_type == "cafeMenuItem"]');
  fs.writeFileSync(path.join(backupDir, 'old-menu-backup.json'), JSON.stringify(old, null, 2));
  console.log(`Backed up ${old.length} existing menu items.`);
  if (dryRun) { console.log(`Dry run: would import ${items.length} items.`); return; }

  const keep = new Set();
  for (const item of items) {
    const id = `cafe-${item.slug}`;
    keep.add(id);
    const file = imagesDir && path.join(imagesDir, item.slug + '.jpg');
    const image = file && fs.existsSync(file)
      ? {
          _type: 'image',
          asset: { _type: 'reference', _ref: (await client.assets.upload('image', fs.createReadStream(file), { filename: item.slug + '.jpg' }))._id },
          alt: item.name,
        }
      : undefined;
    await client.createOrReplace({
      _id: id,
      _type: 'cafeMenuItem',
      name: item.name,
      category: item.category,
      description: item.description,
      price: item.price,
      isVeg: item.isVeg,
      isSpecial: item.isSpecial,
      order: item.order,
      ...(image ? { image } : {}),
    });
    console.log(`✓ ${String(item.order).padStart(3)} ${item.name}`);
  }

  const stale = old.filter((d) => !keep.has(d._id.replace(/^drafts\./, '')) || d._id.startsWith('drafts.'));
  for (const d of stale) await client.delete(d._id);
  console.log(`Deleted ${stale.length} old menu docs. Imported ${items.length} items.`);
}
main().catch((e) => { console.error(e); process.exit(1); });
