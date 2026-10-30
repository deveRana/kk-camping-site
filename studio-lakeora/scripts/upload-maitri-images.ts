/**
 * Upload Maitri Camping images to Sanity and update property
 * Run: npx sanity exec scripts/upload-maitri-images.ts --with-user-token
 */
import {readFileSync} from 'node:fs'
import {join} from 'node:path'
import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2026-02-01'})

async function uploadMaitriImages() {
  console.log('📸 Uploading Maitri Camping images to Sanity...\n')

  const imageFolder = join(process.cwd(), '../public/maitri-camping')
  const imageFiles = [
    'maitri-camping-1.jpeg',
    'maitri-camping-2.jpeg',
    'maitri-camping-3.jpeg',
    'maitri-camping-4.jpeg',
  ]

  // Upload images and collect asset IDs
  const uploadedImages = []

  for (const filename of imageFiles) {
    try {
      const filepath = join(imageFolder, filename)
      const imageBuffer = readFileSync(filepath)

      console.log(`⬆️  Uploading ${filename}...`)
      const asset = await client.assets.upload('image', imageBuffer, {
        filename,
        title: `Maitri Camping - ${filename}`,
      })

      uploadedImages.push({
        _type: 'image',
        _key: Math.random().toString(36).slice(2, 10),
        asset: {
          _type: 'reference',
          _ref: asset._id,
        },
      })

      console.log(`   ✅ Uploaded: ${asset._id}`)
    } catch (error) {
      console.error(`   ❌ Failed to upload ${filename}:`, error)
    }
  }

  console.log(`\n📊 Uploaded ${uploadedImages.length} images\n`)

  // Find Maitri Camping property
  console.log('🔍 Finding Maitri Camping property...')
  const property = await client.fetch(
    `*[_type == "property" && slug.current == "maitri-camping"][0]{ _id, title, coverImage, gallery }`
  )

  if (!property) {
    console.error('❌ Maitri Camping property not found!')
    return
  }

  console.log(`✅ Found: ${property.title}\n`)

  // Set first image as cover, rest as gallery
  const [coverImage, ...galleryImages] = uploadedImages

  console.log('📝 Updating property with new images...')
  await client
    .patch(property._id)
    .set({
      coverImage,
      gallery: galleryImages,
    })
    .commit()

  console.log('✅ Property updated!\n')

  console.log('📸 Image Configuration:')
  console.log('   Cover Image: maitri-camping-1.jpeg')
  console.log('   Gallery Images:')
  console.log('   - maitri-camping-2.jpeg')
  console.log('   - maitri-camping-3.jpeg')
  console.log('   - maitri-camping-4.jpeg')

  console.log('\n🎉 Maitri Camping images uploaded successfully!')
  console.log(`\n🔗 View in Sanity: https://lakeora.sanity.studio/structure/property;${property._id}`)
}

uploadMaitriImages().catch((e) => {
  console.error('❌ Upload failed:', e)
  process.exit(1)
})
