import { defineField, defineType } from 'sanity'

/**
 * Booking Schema for Sanity CMS
 *
 * Stores all booking/reservation records with full guest and payment details
 */

export default defineType({
  name: 'booking',
  title: 'Bookings',
  type: 'document',
  icon: () => '📅',
  fields: [
    defineField({
      name: 'referenceId',
      title: 'Reference ID',
      type: 'string',
      description: 'Unique booking reference number (e.g., LS-2026-1234)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'bookingDate',
      title: 'Booking Date',
      type: 'datetime',
      description: 'When the booking was created',
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Booking Status',
      type: 'string',
      options: {
        list: [
          { title: '⏳ Pending', value: 'pending' },
          { title: '✅ Confirmed', value: 'confirmed' },
          { title: '❌ Cancelled', value: 'cancelled' },
          { title: '✔️ Completed', value: 'completed' },
        ],
        layout: 'radio',
      },
      initialValue: 'pending',
      validation: (Rule) => Rule.required(),
    }),

    // Property Details
    defineField({
      name: 'propertyId',
      title: 'Property ID',
      type: 'string',
      description: 'The ID of the booked property',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'propertyName',
      title: 'Property Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'propertyCategory',
      title: 'Property Category',
      type: 'string',
    }),

    // Guest Details
    defineField({
      name: 'guestName',
      title: 'Guest Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'guestEmail',
      title: 'Guest Email',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'guestPhone',
      title: 'Guest Phone',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'guestCity',
      title: 'Guest City',
      type: 'string',
    }),

    // DPDPA Compliance - Consent Fields
    defineField({
      name: 'dataConsent',
      title: 'Data Collection Consent',
      type: 'boolean',
      description: 'Guest consent for data collection and processing (DPDPA compliance)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'consentTimestamp',
      title: 'Consent Timestamp',
      type: 'datetime',
      description: 'When the guest gave consent',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'consentIpAddress',
      title: 'Consent IP Address',
      type: 'string',
      description: 'IP address from where consent was given',
    }),

    // Booking Details
    defineField({
      name: 'numberOfGuests',
      title: 'Number of Guests',
      type: 'number',
      validation: (Rule) => Rule.required().positive().integer(),
    }),
    defineField({
      name: 'vegCount',
      title: 'Number of Veg Guests',
      type: 'number',
      description: 'Number of vegetarian guests',
      validation: (Rule) => Rule.min(0).integer(),
    }),
    defineField({
      name: 'nonVegCount',
      title: 'Number of Non-Veg Guests',
      type: 'number',
      description: 'Number of non-vegetarian guests',
      validation: (Rule) => Rule.min(0).integer(),
    }),
    defineField({
      name: 'checkInDate',
      title: 'Check-in Date',
      type: 'date',
    }),
    defineField({
      name: 'checkOutDate',
      title: 'Check-out Date',
      type: 'date',
    }),

    // Add-ons
    defineField({
      name: 'addons',
      title: 'Selected Add-ons',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'List of add-ons selected by the guest',
    }),

    // Pricing
    defineField({
      name: 'basePrice',
      title: 'Base Price',
      type: 'number',
      description: 'Property price × number of guests',
      validation: (Rule) => Rule.required().positive(),
    }),
    defineField({
      name: 'addonTotal',
      title: 'Add-ons Total',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'discount',
      title: 'Discount Amount',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'couponCode',
      title: 'Coupon Code',
      type: 'string',
    }),
    defineField({
      name: 'totalAmount',
      title: 'Total Amount',
      type: 'number',
      description: 'Final total after discounts',
      validation: (Rule) => Rule.required().positive(),
    }),

    // Payment Info
    defineField({
      name: 'paymentMethod',
      title: 'Payment Method',
      type: 'string',
      options: {
        list: [
          { title: 'Razorpay', value: 'razorpay' },
          { title: 'UPI', value: 'upi' },
          { title: 'Card', value: 'card' },
          { title: 'Net Banking', value: 'netbanking' },
          { title: 'Cash', value: 'cash' },
        ],
      },
    }),
    defineField({
      name: 'paymentStatus',
      title: 'Payment Status',
      type: 'string',
      options: {
        list: [
          { title: '⏳ Pending', value: 'pending' },
          { title: '✅ Paid', value: 'paid' },
          { title: '❌ Failed', value: 'failed' },
          { title: '↩️ Refunded', value: 'refunded' },
        ],
      },
      initialValue: 'pending',
    }),
    defineField({
      name: 'razorpayOrderId',
      title: 'Razorpay Order ID',
      type: 'string',
      description: 'Razorpay order ID for tracking payment',
      readOnly: true,
    }),

    // Additional Notes
    defineField({
      name: 'notes',
      title: 'Booking Notes',
      type: 'text',
      rows: 3,
      description: 'Any special requests or notes from guest',
    }),
    defineField({
      name: 'adminNotes',
      title: 'Admin Notes',
      type: 'text',
      rows: 3,
      description: 'Internal notes (not visible to guest)',
    }),
  ],

  preview: {
    select: {
      title: 'guestName',
      subtitle: 'propertyName',
      referenceId: 'referenceId',
      status: 'status',
      totalAmount: 'totalAmount',
    },
    prepare(selection) {
      const { title, subtitle, referenceId, status, totalAmount } = selection
      const statusEmoji = status === 'confirmed' ? '✅' : status === 'cancelled' ? '❌' : '⏳'
      return {
        title: `${statusEmoji} ${title} - ${referenceId}`,
        subtitle: `${subtitle} • ₹${totalAmount?.toLocaleString() || 0}`,
      }
    },
  },

  orderings: [
    {
      title: 'Booking Date (Recent First)',
      name: 'bookingDateDesc',
      by: [{ field: 'bookingDate', direction: 'desc' }],
    },
    {
      title: 'Status',
      name: 'statusAsc',
      by: [{ field: 'status', direction: 'asc' }],
    },
    {
      title: 'Guest Name (A-Z)',
      name: 'guestNameAsc',
      by: [{ field: 'guestName', direction: 'asc' }],
    },
  ],
})
