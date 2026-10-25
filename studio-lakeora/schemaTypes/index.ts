import {property} from './property'
import {blogPost} from './blogPost'
import {faq} from './faq'
import {testimonial} from './testimonial'
import {galleryItem} from './galleryItem'
import {siteSettings} from './siteSettings'
import {contactSubmission} from './contactSubmission'
import cafeMenuItem from './cafeMenuItem'
import booking from './booking'
import payment from './payment'

export const schemaTypes = [
  // Properties and accommodations
  property,

  // Bookings and payments
  booking,
  payment,

  // Content
  blogPost,
  faq,
  testimonial,
  galleryItem,
  cafeMenuItem,

  // Settings and submissions
  siteSettings,
  contactSubmission,
]
