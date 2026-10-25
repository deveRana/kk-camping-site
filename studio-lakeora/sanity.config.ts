import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

const singletonTypes = new Set(['siteSettings'])

export default defineConfig({
  name: 'default',
  title: 'Lakeora',

  projectId: 'roac4c6v',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Lakeora')
          .items([
            S.listItem()
              .title('Site Settings')
              .id('siteSettings')
              .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
            S.divider(),
            S.documentTypeListItem('booking').title('📅 Bookings'),
            S.documentTypeListItem('payment').title('💳 Payments'),
            S.divider(),
            S.documentTypeListItem('property').title('🏕️ Stays & Packages'),
            S.documentTypeListItem('cafeMenuItem').title('☕ Cafe Menu'),
            S.documentTypeListItem('blogPost').title('📝 Blog Posts'),
            S.documentTypeListItem('faq').title('❓ FAQs'),
            S.documentTypeListItem('testimonial').title('⭐ Guest Reviews'),
            S.documentTypeListItem('galleryItem').title('📸 Gallery'),
            S.divider(),
            S.documentTypeListItem('contactSubmission').title('📧 Contact Enquiries'),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
    templates: (templates) => templates.filter(({schemaType}) => !singletonTypes.has(schemaType)),
  },

  document: {
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(
            ({action}) => action && ['publish', 'discardChanges', 'restore'].includes(action),
          )
        : input,
  },
})
