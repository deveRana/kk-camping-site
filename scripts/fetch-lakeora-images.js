/**
 * Find + download an accurate photo for every Lakeora menu item from Wikimedia Commons.
 *
 * Usage: node scripts/fetch-lakeora-images.js <outDir> [--only=slug1,slug2] [--pick=slug:N,...]
 *   --pick=slug:N  use the Nth candidate (0-based) instead of the first, for manual correction
 * Writes <outDir>/<slug>.jpg and <outDir>/manifest.json (title, url, author, license, candidates).
 */
const fs = require('fs');
const path = require('path');
const { items } = require('./lakeora-menu');

const outDir = process.argv[2];
if (!outDir) { console.error('outDir required'); process.exit(1); }
fs.mkdirSync(outDir, { recursive: true });

const only = (process.argv.find((a) => a.startsWith('--only=')) || '').replace('--only=', '').split(',').filter(Boolean);
const picks = Object.fromEntries(
  (process.argv.find((a) => a.startsWith('--pick=')) || '').replace('--pick=', '').split(',').filter(Boolean)
    .map((p) => { const [s, n] = p.split(':'); return [s, Number(n)]; })
);

const manifestPath = path.join(outDir, 'manifest.json');
const manifest = fs.existsSync(manifestPath) ? JSON.parse(fs.readFileSync(manifestPath, 'utf8')) : {};
const UA = 'LakeoraMenuImageFetcher/1.0';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const BAD = /map|logo|diagram|flag|icon|recipe card|menu|poster|stamp|\bsvg\b|painting|drawing|restaurant|shop|stall|street|market|vendor|truck|package|packet|box\b/i;

async function search(q) {
  const url = 'https://commons.wikimedia.org/w/api.php?' + new URLSearchParams({
    action: 'query', format: 'json', generator: 'search', gsrnamespace: '6', gsrsearch: q, gsrlimit: '12',
    prop: 'imageinfo', iiprop: 'url|size|mime|extmetadata', iiurlwidth: '1000',
  });
  for (let attempt = 0; attempt < 4; attempt++) {
    const res = await fetch(url, { headers: { 'User-Agent': UA } });
    if (res.status === 429) { await sleep(3000 * (attempt + 1)); continue; }
    if (!res.ok) throw new Error('search ' + res.status);
    const j = await res.json();
    const pages = Object.values((j.query && j.query.pages) || {}).sort((a, b) => a.index - b.index);
    return pages.map((p) => {
      const ii = p.imageinfo && p.imageinfo[0];
      if (!ii) return null;
      const md = ii.extmetadata || {};
      return {
        title: p.title, mime: ii.mime, w: ii.width, h: ii.height, thumb: ii.thumburl,
        page: ii.descriptionurl, license: (md.LicenseShortName || {}).value || '',
        author: ((md.Artist || {}).value || '').replace(/<[^>]+>/g, '').trim(),
      };
    }).filter(Boolean);
  }
  return [];
}

async function main() {
  const used = new Set(Object.values(manifest).map((m) => m.title));
  for (const item of items) {
    if (only.length && !only.includes(item.slug)) continue;
    if (!only.length && manifest[item.slug] && fs.existsSync(path.join(outDir, item.slug + '.jpg'))) continue;
    let candidates = [];
    for (const q of item.q) {
      const found = await search(q);
      await sleep(400);
      for (const c of found) {
        if (!/image\/(jpeg|png)/.test(c.mime) || c.w < 600 || c.h < 450) continue;
        if (BAD.test(c.title)) continue;
        if (candidates.some((x) => x.title === c.title)) continue;
        candidates.push(c);
      }
      if (candidates.length >= 4) break;
    }
    if (!candidates.length) { console.log('NONE  ', item.slug); continue; }
    const fresh = candidates.filter((c) => !used.has(c.title));
    const pool = fresh.length ? fresh : candidates;
    const choice = pool[picks[item.slug] || 0] || pool[0];
    const res = await fetch(choice.thumb, { headers: { 'User-Agent': UA } });
    if (!res.ok) { console.log('DLFAIL', item.slug, res.status); await sleep(2000); continue; }
    fs.writeFileSync(path.join(outDir, item.slug + '.jpg'), Buffer.from(await res.arrayBuffer()));
    used.add(choice.title);
    manifest[item.slug] = { ...choice, candidates: pool.slice(0, 6).map((c) => c.title) };
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
    console.log('OK    ', item.slug.padEnd(32), choice.title);
    await sleep(600);
  }
}
main().catch((e) => { console.error(e); process.exit(1); });
