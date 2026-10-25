import { defineField, defineType } from 'sanity'

/**
 * Payment/Transaction Schema for Sanity CMS
 *
 * Stores all payment transactions and records
 */

export default defineType({
  name: 'payment',
  title: 'Payments',
  type: 'document',
  icon: () => '💳',
  fields: [
    defineField({
      name: 'transactionId',
      title: 'Transaction ID',
      type: 'string',
      description: 'Unique transaction/payment reference',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'bookingReference',
      title: 'Booking Reference',
      type: 'reference',
      to: [{ type: 'booking' }],
      description: 'Link to the associated booking',
    }),
    defineField({
      name: 'bookingReferenceId',
      title: 'Booking Reference ID',
      type: 'string',
      description: 'Booking reference ID (e.g., LS-2026-1234)',
    }),
    defineField({
      name: 'paymentDate',
      title: 'Payment Date',
      type: 'datetime',
      description: 'When the payment was made',
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),

    // Customer Details
    defineField({
      name: 'customerName',
      title: 'Customer Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'customerEmail',
      title: 'Customer Email',
      type: 'string',
      validation: (Rule) => Rule.email(),
    }),
    defineField({
      name: 'customerPhone',
      title: 'Customer Phone',
      type: 'string',
    }),

    // Payment Details
    defineField({
      name: 'amount',
      title: 'Amount',
      type: 'number',
      description: 'Payment amount in INR',
      validation: (Rule) => Rule.required().positive(),
    }),
    defineField({
      name: 'paymentType',
      title: 'Payment Type',
      type: 'string',
      options: {
        list: [
          { title: 'Advance Payment', value: 'advance' },
          { title: 'Full Payment', value: 'full' },
          { title: 'Balance Payment', value: 'balance' },
          { title: 'Refund', value: 'refund' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'paymentMethod',
      title: 'Payment Method',
      type: 'string',
      options: {
        list: [
          { title: 'UPI (GPay/PhonePe/Paytm)', value: 'upi' },
          { title: 'Credit Card', value: 'credit_card' },
          { title: 'Debit Card', value: 'debit_card' },
          { title: 'Net Banking', value: 'netbanking' },
          { title: 'Cash', value: 'cash' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'paymentStatus',
      title: 'Payment Status',
      type: 'string',
      options: {
        list: [
          { title: '⏳ Pending', value: 'pending' },
          { title: '✅ Success', value: 'success' },
          { title: '❌ Failed', value: 'failed' },
          { title: '↩️ Refunded', value: 'refunded' },
          { title: '⚠️ On Hold', value: 'on_hold' },
        ],
        layout: 'radio',
      },
      initialValue: 'pending',
      validation: (Rule) => Rule.required(),
    }),

    // Gateway Details
    defineField({
      name: 'paymentGateway',
      title: 'Payment Gateway',
      type: 'string',
      description: 'e.g., Razorpay, PayU, Stripe, Manual',
    }),
    defineField({
      name: 'gatewayTransactionId',
      title: 'Gateway Transaction ID',
      type: 'string',
      description: 'Transaction ID from payment gateway',
    }),
    defineField({
      name: 'gatewayOrderId',
      title: 'Gateway Order ID',
      type: 'string',
      description: 'Order ID from payment gateway',
    }),

    // UPI Details
    defineField({
      name: 'upiId',
      title: 'UPI ID',
      type: 'string',
      description: 'UPI ID used for payment',
    }),
    defineField({
      name: 'upiTransactionRef',
      title: 'UPI Transaction Reference',
      type: 'string',
      description: 'UPI transaction reference number',
    }),

    // Card Details (only last 4 digits for security)
    defineField({
      name: 'cardLast4',
      title: 'Card Last 4 Digits',
      type: 'string',
      description: 'Last 4 digits of card (for reference only)',
      validation: (Rule) => Rule.max(4),
    }),
    defineField({
      name: 'cardType',
      title: 'Card Type',
      type: 'string',
      options: {
        list: ['Visa', 'Mastercard', 'RuPay', 'Amex'],
      },
    }),

    // Additional Info
    defineField({
      name: 'currency',
      title: 'Currency',
      type: 'string',
      initialValue: 'INR',
    }),
    defineField({
      name: 'notes',
      title: 'Payment Notes',
      type: 'text',
      rows: 3,
      description: 'Any additional payment notes',
    }),
    defineField({
      name: 'failureReason',
      title: 'Failure Reason',
      type: 'string',
      description: 'Reason if payment failed',
    }),
    defineField({
      name: 'receiptUrl',
      title: 'Receipt URL',
      type: 'url',
      description: 'Link to payment receipt/invoice',
    }),
  ],

  preview: {
    select: {
      title: 'customerName',
      subtitle: 'bookingReferenceId',
      amount: 'amount',
      status: 'paymentStatus',
      date: 'paymentDate',
    },
    prepare(selection) {
      const { title, subtitle, amount, status } = selection
      const statusEmoji = status === 'success' ? '✅' : status === 'failed' ? '❌' : '⏳'
      return {
        title: `${statusEmoji} ${title} - ₹${amount?.toLocaleString() || 0}`,
        subtitle: `${subtitle || 'No booking ref'} • ${status}`,
      }
    },
  },

  orderings: [
    {
      title: 'Payment Date (Recent First)',
      name: 'paymentDateDesc',
      by: [{ field: 'paymentDate', direction: 'desc' }],
    },
    {
      title: 'Amount (High to Low)',
      name: 'amountDesc',
      by: [{ field: 'amount', direction: 'desc' }],
    },
    {
      title: 'Status',
      name: 'statusAsc',
      by: [{ field: 'paymentStatus', direction: 'asc' }],
    },
  ],
})
