import {defineArrayMember, defineField, defineType} from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({name: 'brandName', type: 'string', initialValue: 'Lakeora'}),
    defineField({name: 'tagline', type: 'string'}),
    defineField({
      name: 'contactNumbers',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
    }),
    defineField({name: 'email', type: 'string'}),
    defineField({name: 'address', type: 'text', rows: 2}),
    defineField({name: 'landmark', type: 'string'}),
    defineField({name: 'googleMapsUrl', type: 'url'}),
    defineField({name: 'latitude', type: 'number'}),
    defineField({name: 'longitude', type: 'number'}),
    defineField({name: 'checkInTime', type: 'string'}),
    defineField({name: 'checkOutTime', type: 'string'}),
    defineField({
      name: 'advancePaymentPercentage',
      type: 'number',
      initialValue: 50,
      validation: (r) => r.min(0).max(100),
    }),
    defineField({name: 'paymentUPI', title: 'UPI ID / number', type: 'string'}),
    defineField({
      name: 'paymentMethods',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
    }),
    defineField({
      name: 'freeActivities',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
    }),
    defineField({
      name: 'otherFacilities',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
    }),
    defineField({name: 'privacyGuarantee', title: 'Tent privacy note', type: 'text', rows: 2}),
  ],
  preview: {prepare: () => ({title: 'Site Settings'})},
})
