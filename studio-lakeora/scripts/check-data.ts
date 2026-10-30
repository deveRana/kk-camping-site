/**
 * Check for missing data in Sanity
 * Run: npx sanity exec scripts/check-data.ts --with-user-token
 */
import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2026-02-01'})

async function checkData() {
  console.log('🔍 Checking Sanity data for missing fields...\n')

  // Check testimonials
  console.log('📝 Checking Testimonials...')
  const testimonials = await client.fetch(`*[_type == "testimonial"]{ _id, name, rating, location, stayType }`)

  let missingRating = 0
  let missingLocation = 0
  let missingStayType = 0

  testimonials.forEach((t: any) => {
    if (!t.rating) {
      console.log(`  ⚠️  ${t.name} - Missing rating`)
      missingRating++
    }
    if (!t.location) {
      console.log(`  ⚠️  ${t.name} - Missing location`)
      missingLocation++
    }
    if (!t.stayType) {
      console.log(`  ⚠️  ${t.name} - Missing stayType`)
      missingStayType++
    }
  })

  console.log(`  Total: ${testimonials.length} testimonials`)
  console.log(`  Missing rating: ${missingRating}`)
  console.log(`  Missing location: ${missingLocation}`)
  console.log(`  Missing stayType: ${missingStayType}\n`)

  // Check cafe menu
  console.log('☕ Checking Cafe Menu...')
  const cafeItems = await client.fetch(`*[_type == "cafeMenuItem"]{ _id, name, isVeg }`)

  let missingIsVeg = 0

  cafeItems.forEach((item: any) => {
    if (item.isVeg === undefined || item.isVeg === null) {
      console.log(`  ⚠️  ${item.name} - Missing isVeg field`)
      missingIsVeg++
    }
  })

  console.log(`  Total: ${cafeItems.length} items`)
  console.log(`  Missing isVeg: ${missingIsVeg}\n`)

  // Check blog posts
  console.log('📰 Checking Blog Posts...')
  const blogs = await client.fetch(`*[_type == "blogPost"]{ _id, title, authorName }`)

  let missingAuthor = 0

  blogs.forEach((b: any) => {
    if (!b.authorName) {
      console.log(`  ⚠️  ${b.title} - Missing author`)
      missingAuthor++
    }
  })

  console.log(`  Total: ${blogs.length} blogs`)
  console.log(`  Missing author: ${missingAuthor}\n`)

  // Summary
  console.log('📊 Summary:')
  console.log(`  ${testimonials.length} testimonials (${missingRating} missing ratings)`)
  console.log(`  ${cafeItems.length} cafe items (${missingIsVeg} missing veg/non-veg)`)
  console.log(`  ${blogs.length} blogs (${missingAuthor} missing authors)`)

  if (missingRating + missingIsVeg + missingAuthor === 0) {
    console.log('\n✅ All critical data is complete!')
  } else {
    console.log('\n⚠️  Some data needs to be filled in Sanity Studio')
  }
}

checkData().catch((e) => {
  console.error('❌ Check failed:', e)
  process.exit(1)
})
