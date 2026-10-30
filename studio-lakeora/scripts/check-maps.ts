/**
 * Check property map data in Sanity
 * Run: npx sanity exec scripts/check-maps.ts --with-user-token
 */
import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2026-02-01'})

async function checkMaps() {
  console.log('🗺️  Checking property map data...\n')

  const properties = await client.fetch(`
    *[_type == "property"] | order(order asc) {
      title,
      coordinates,
      googleMapsUrl,
      mapEmbed,
      locationName,
      location,
      distance
    }
  `)

  properties.forEach((p: any) => {
    console.log(`📍 ${p.title}`)
    console.log(`   Location: ${p.location || '❌ MISSING'}`)
    console.log(`   Location Name: ${p.locationName || '❌ MISSING'}`)
    console.log(`   Distance: ${p.distance || '❌ MISSING'}`)
    console.log(`   Coordinates: ${p.coordinates ? `${p.coordinates.lat}, ${p.coordinates.lng}` : '❌ MISSING'}`)
    console.log(`   Google Maps URL: ${p.googleMapsUrl ? '✅ Set' : '❌ MISSING'}`)
    console.log(`   Map Embed: ${p.mapEmbed ? '✅ Set' : '❌ MISSING'}`)
    console.log()
  })

  const missingMaps = properties.filter((p: any) => !p.mapEmbed || !p.googleMapsUrl)
  const missingCoords = properties.filter((p: any) => !p.coordinates)

  console.log('📊 Summary:')
  console.log(`   Total properties: ${properties.length}`)
  console.log(`   Missing map embed: ${properties.filter((p: any) => !p.mapEmbed).length}`)
  console.log(`   Missing Google Maps URL: ${properties.filter((p: any) => !p.googleMapsUrl).length}`)
  console.log(`   Missing coordinates: ${missingCoords.length}`)
  console.log(`   Missing location name: ${properties.filter((p: any) => !p.locationName).length}`)

  if (missingMaps.length === 0 && missingCoords.length === 0) {
    console.log('\n✅ All properties have complete map data!')
  } else {
    console.log('\n⚠️  Some properties are missing map data')
    if (missingMaps.length > 0) {
      console.log('\nProperties missing maps:')
      missingMaps.forEach((p: any) => console.log(`   - ${p.title}`))
    }
    if (missingCoords.length > 0) {
      console.log('\nProperties missing coordinates:')
      missingCoords.forEach((p: any) => console.log(`   - ${p.title}`))
    }
  }
}

checkMaps().catch((e) => {
  console.error('❌ Check failed:', e)
  process.exit(1)
})
