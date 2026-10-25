/**
 * One-off import of the old mock data (kk-camping-site/lib/mock-data) into Sanity.
 * Run from this folder:  npx sanity exec scripts/seed.ts --with-user-token
 * Safe to re-run: a document type that already has content is skipped.
 */
import {readFileSync} from 'node:fs'
import {basename, join} from 'node:path'
import {getCliClient} from 'sanity/cli'

import {PAWNA_CAMPSITE_MASTER_DATA as C} from '../../kk-camping-site/lib/mock-data/campsite-info'
import {MOCK_BLOGS} from '../../kk-camping-site/lib/mock-data/blogs'
import {MOCK_FAQS} from '../../kk-camping-site/lib/mock-data/faqs'
import {MOCK_GALLERY} from '../../kk-camping-site/lib/mock-data/gallery'
import {MOCK_TESTIMONIALS} from '../../kk-camping-site/lib/mock-data/testimonials'

const client = getCliClient({apiVersion: '2026-02-01'})
const APP_PUBLIC = join(process.cwd(), '../kk-camping-site/public')
const cache = new Map<string, string>()

/** Upload a local /public path or a remote URL once and return an image field value. */
async function image(src: string | undefined) {
  if (!src) return undefined
  let assetId = cache.get(src)
  if (!assetId) {
    let body: Buffer
    if (src.startsWith('http')) {
      const res = await fetch(src)
      if (!res.ok) {
        console.warn(`  ! could not download ${src} (${res.status}), skipping`)
        return undefined
      }
      body = Buffer.from(await res.arrayBuffer())
    } else {
      body = readFileSync(join(APP_PUBLIC, src))
    }
    const filename = src.startsWith('http') ? 'remote.jpg' : basename(src)
    const asset = await client.assets.upload('image', body, {filename})
    assetId = asset._id
    cache.set(src, assetId)
  }
  return {_type: 'image', asset: {_type: 'reference', _ref: assetId}}
}

const key = () => Math.random().toString(36).slice(2, 10)

/** Minimal markdown (### headings, - / 1. lists, **bold**) to Portable Text. */
function toPortableText(md: string) {
  const spans = (text: string) => {
    const children: any[] = []
    text.split(/(\*\*[^*]+\*\*)/g).forEach((part) => {
      if (!part) return
      const bold = part.startsWith('**') && part.endsWith('**')
      children.push({
        _type: 'span',
        _key: key(),
        text: bold ? part.slice(2, -2) : part,
        marks: bold ? ['strong'] : [],
      })
    })
    return children
  }
  return md
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)
    .map((line) => {
      const base = {_type: 'block', _key: key(), markDefs: []}
      if (line.startsWith('### ')) return {...base, style: 'h3', children: spans(line.slice(4))}
      if (/^[-*] /.test(line))
        return {...base, style: 'normal', listItem: 'bullet', level: 1, children: spans(line.slice(2))}
      const num = line.match(/^\d+\.\s+(.*)/)
      if (num) return {...base, style: 'normal', listItem: 'number', level: 1, children: spans(num[1])}
      return {...base, style: 'normal', children: spans(line)}
    })
}

async function isEmpty(type: string) {
  const count = await client.fetch<number>('count(*[_type == $type])', {type})
  if (count > 0) console.log(`- ${type}: ${count} already exist, skipping`)
  return count === 0
}

async function main() {
  if (await isEmpty('siteSettings')) {
    await client.createOrReplace({
      _id: 'siteSettings',
      _type: 'siteSettings',
      brandName: 'Lakeora',
      tagline: C.tagline,
      contactNumbers: C.contactNumbers,
      address: C.location.address,
      landmark: C.location.landmark,
      googleMapsUrl: C.location.googleMapsUrl,
      latitude: C.location.coordinates.lat,
      longitude: C.location.coordinates.lng,
      checkInTime: C.checkInTime,
      checkOutTime: C.checkOutTime,
      advancePaymentPercentage: C.advancePaymentPercentage,
      paymentUPI: C.paymentUPI,
      paymentMethods: C.paymentMethods,
      freeActivities: C.freeActivities,
      otherFacilities: C.otherFacilities,
      privacyGuarantee: C.tentArrangement.privacyGuarantee,
    })
    console.log('+ siteSettings')
  }

  if (await isEmpty('property')) {
    let order = 0
    for (const pkg of C.packages) {
      await client.create({
        _type: 'property',
        title: pkg.name,
        slug: {_type: 'slug', current: pkg.slug},
        tagline: pkg.tagline,
        category: pkg.category,
        price: pkg.pricePerPerson,
        originalPrice: pkg.originalPricePerPerson,
        capacity: pkg.capacity,
        rating: 4.9,
        reviewCount:
          pkg.id === 'pkg-machang-cottage' ? 142 : pkg.id === 'pkg-swiss-tent' ? 186 : pkg.id === 'pkg-white-tent' ? 115 : 210,
        location: 'Gevhande Khadak, Pawna Lake',
        distance: '2.5 hrs from Mumbai · 1.5 hrs from Pune',
        coverImage: await image(pkg.coverImage),
        gallery: (
          await Promise.all(pkg.gallery.map(async (g) => ({...(await image(g)), _key: key()})))
        ).filter((g: any) => g.asset),
        description: `${pkg.tagline}. Located at Lakeora, Pawna Lake. Separate private setup for your group with unlimited evening tea, limited BBQ, unlimited veg/non-veg dinner, campfire live acoustic music, morning breakfast, and free sports activities included.`,
        features: pkg.highlights,
        inclusions: pkg.inclusions,
        amenities: [
          pkg.hasAttachedWashroom
            ? {name: 'Attached Washroom', icon: 'shower'}
            : {name: 'Common Clean Toilets', icon: 'toilet'},
          ...(pkg.hasLightFanBoard ? [{name: 'In-tent Light, Fan & Charging', icon: 'plug'}] : []),
          {name: 'Campfire & Live Music', icon: 'bonfire'},
          {name: 'BBQ, Dinner & Breakfast', icon: 'food'},
          {name: 'Free Archery, Volleyball & Cricket', icon: 'sports'},
          {name: 'Free Secure Parking', icon: 'parking'},
        ].map((a) => ({...a, _type: 'amenity', _key: key()})),
        hasAttachedWashroom: pkg.hasAttachedWashroom,
        hasLightFanBoard: pkg.hasLightFanBoard,
        isPopular: pkg.pricePerPerson <= 2300,
        isFeatured: true,
        order: order++,
      })
      console.log('+ property', pkg.name)
    }
  }

  if (await isEmpty('blogPost')) {
    for (const b of MOCK_BLOGS) {
      await client.create({
        _type: 'blogPost',
        title: b.title,
        slug: {_type: 'slug', current: b.slug},
        excerpt: b.excerpt,
        category: b.category,
        coverImage: await image(b.coverImage),
        body: toPortableText(b.content),
        authorName: b.author.name,
        authorRole: b.author.role,
        authorAvatar: await image(b.author.avatar),
        publishedAt: new Date(b.publishedAt).toISOString(),
        readTime: b.readTime,
        tags: b.tags,
      })
      console.log('+ blogPost', b.title)
    }
  }

  if (await isEmpty('faq')) {
    let order = 0
    for (const f of MOCK_FAQS) {
      await client.create({_type: 'faq', question: f.question, answer: f.answer, category: f.category, order: order++})
    }
    console.log(`+ ${MOCK_FAQS.length} faqs`)
  }

  if (await isEmpty('testimonial')) {
    for (const t of MOCK_TESTIMONIALS) {
      await client.create({
        _type: 'testimonial',
        name: t.name,
        location: t.location,
        avatar: await image(t.avatar),
        rating: t.rating,
        stayType: t.stayType,
        comment: t.comment,
        date: t.date,
      })
    }
    console.log(`+ ${MOCK_TESTIMONIALS.length} testimonials`)
  }

  if (await isEmpty('galleryItem')) {
    let order = 0
    for (const g of MOCK_GALLERY) {
      await client.create({
        _type: 'galleryItem',
        title: g.title,
        category: g.category,
        image: await image(g.imageUrl),
        caption: g.caption,
        order: order++,
      })
    }
    console.log(`+ ${MOCK_GALLERY.length} gallery items`)
  }
  console.log('Seed finished.')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
