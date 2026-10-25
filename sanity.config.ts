import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
// Note: @sanity/vision is optional - only needed for Sanity Studio development
// import { visionTool } from '@sanity/vision'

// Import schemas
import property from './sanity/property'
import booking from './sanity/booking'
import payment from './sanity/payment'
import galleryItem from './sanity/galleryItem'
import cafeMenuItem from './sanity/cafeMenuItem'

export default defineConfig({
  name: 'default',
  title: 'Lakeora Camping',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'roac4c6v',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',

  plugins: [structureTool()],

  schema: {
    types: [
      // Property packages and accommodations
      property,

      // Bookings and payments
      booking,
      payment,

      // Content
      galleryItem,
      cafeMenuItem,
    ],
  },
})
