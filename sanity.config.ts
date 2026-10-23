import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'

// Import schemas
import booking from './sanity/booking'
import payment from './sanity/payment'
import galleryItem from './sanity/galleryItem'
import cafeMenuItem from './sanity/cafeMenuItem'

export default defineConfig({
  name: 'default',
  title: 'Lakeora Camping',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'roac4c6v',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: [
      // Existing schemas (assumed to be in Sanity already)
      // property, blogPost, testimonial, faq, siteSettings

      // New schemas from local folder
      booking,
      payment,
      galleryItem,
      cafeMenuItem,
    ],
  },
})
