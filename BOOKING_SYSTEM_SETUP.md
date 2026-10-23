# Dynamic Booking System with Sanity CMS

## Overview

Your camping site now has a **fully dynamic booking system** that saves all bookings and payment records directly to Sanity CMS. This allows you to:

- ✅ Track all bookings in real-time
- ✅ Store complete guest information
- ✅ Record payment transactions
- ✅ Manage booking status (Pending, Confirmed, Cancelled, Completed)
- ✅ View payment history and transaction details
- ✅ Generate reports and analytics

---

## 🚀 Setup Instructions

### Step 1: Add Schemas to Sanity Studio

You need to import the booking and payment schemas into your Sanity Studio.

1. **Copy the schema files** to your Sanity Studio project:
   - `sanity/booking.ts` - Booking schema
   - `sanity/payment.ts` - Payment/Transaction schema

2. **Import schemas in your Sanity config file** (usually `sanity.config.ts` or `schemas/index.ts`):

```typescript
import booking from './booking'
import payment from './payment'

export const schemaTypes = [
  booking,
  payment,
  // ... your other schemas
]
```

3. **Deploy the schemas** to Sanity:
```bash
npx sanity deploy
```

---

### Step 2: Get Sanity API Token

You need a **write token** to allow the Next.js app to create bookings in Sanity.

1. Go to [sanity.io/manage](https://sanity.io/manage)
2. Select your project
3. Go to **API** → **Tokens**
4. Click **Add API Token**
5. Give it a name like "Booking System Write Token"
6. Set permissions to **Editor** (allows read + write)
7. Click **Add Token**
8. **Copy the token** (you won't see it again!)

---

### Step 3: Configure Environment Variables

Add the Sanity API token to your environment variables:

1. Create or update `.env.local` file in your project root:

```env
# Sanity Configuration (existing)
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production

# Sanity API Token (NEW - for write operations)
SANITY_API_TOKEN=sk_your_secret_token_here
```

⚠️ **Important**: 
- Never commit `.env.local` to Git
- Keep the API token secure (it starts with `sk_`)
- For production, add this to your hosting platform's environment variables (Vercel, Netlify, etc.)

---

### Step 4: Deploy and Test

1. **Restart your development server:**
```bash
npm run dev
```

2. **Test the booking flow:**
   - Go to any property page
   - Click "Book Now"
   - Complete the booking form
   - Submit the booking
   - Check your Sanity Studio to see the new booking!

---

## 📊 Viewing Bookings in Sanity Studio

### Access Bookings

1. Open your Sanity Studio (usually at `your-project.sanity.studio` or locally at `localhost:3333`)
2. You'll see two new content types:
   - **📅 Bookings** - All booking records
   - **💳 Payments** - All payment transactions

### Booking Details Include:

- **Reference ID** - Unique booking identifier (e.g., LS-2026-1234)
- **Guest Information** - Name, email, phone, city
- **Property Details** - Which tent/cottage was booked
- **Booking Status** - Pending, Confirmed, Cancelled, Completed
- **Pricing Breakdown** - Base price, add-ons, discounts, total
- **Payment Info** - Method, status, advance amount, balance
- **Dates** - Check-in, check-out, booking date
- **Add-ons** - Selected extra services
- **Notes** - Guest requests and admin notes

### Payment Records Include:

- **Transaction ID** - Unique payment reference
- **Booking Reference** - Linked to the booking
- **Payment Details** - Amount, method, type (advance/full/balance)
- **Payment Status** - Pending, Success, Failed, Refunded
- **Gateway Details** - Transaction IDs from payment gateways
- **Customer Info** - Name, email, phone
- **UPI/Card Details** - Relevant payment method details

---

## 🔗 API Endpoints

### Create Booking
```
POST /api/bookings
```

**Request Body:**
```json
{
  "referenceId": "LS-2026-1234",
  "propertyId": "pkg-swiss-tent",
  "propertyName": "Swiss Tent (Attached Washroom)",
  "guestName": "John Doe",
  "guestEmail": "john@example.com",
  "guestPhone": "+91 98765 43210",
  "numberOfGuests": 2,
  "totalAmount": 4600,
  "advanceAmount": 2300,
  "paymentMethod": "upi"
}
```

### Get Bookings
```
GET /api/bookings?email=john@example.com
GET /api/bookings?phone=9876543210
GET /api/bookings?referenceId=LS-2026-1234
```

### Create Payment Record
```
POST /api/payments
```

### Get Payments
```
GET /api/payments?bookingRef=LS-2026-1234
GET /api/payments?email=john@example.com
```

---

## 📈 Managing Bookings

### Update Booking Status

In Sanity Studio, you can:
1. Open any booking
2. Change the **Status** field:
   - ⏳ **Pending** - Payment not yet confirmed
   - ✅ **Confirmed** - Booking is confirmed
   - ❌ **Cancelled** - Booking was cancelled
   - ✔️ **Completed** - Guest has checked out

### Add Admin Notes

Use the **Admin Notes** field to add internal notes that guests won't see:
- Special requests
- Arrangements made
- Follow-up actions needed

### Search and Filter

Sanity Studio allows you to:
- Search bookings by guest name, email, or phone
- Filter by status
- Sort by booking date, amount, etc.
- Export data for reports

---

## 🎯 Features

### ✅ Implemented

- [x] Save bookings to Sanity CMS
- [x] Record payment transactions
- [x] Store complete guest information
- [x] Track add-ons and special requests
- [x] Calculate pricing with discounts
- [x] Support multiple payment methods
- [x] Generate unique reference IDs
- [x] Link payments to bookings
- [x] View all records in Sanity Studio

### 🔜 Future Enhancements

- [ ] Email confirmations to guests
- [ ] SMS notifications
- [ ] Admin dashboard with analytics
- [ ] Automated reminders
- [ ] Calendar view of bookings
- [ ] Payment gateway integration (Razorpay, PayU)
- [ ] Invoice generation
- [ ] Guest portal to view bookings

---

## 🔒 Security Notes

1. **API Token**: Never expose the `SANITY_API_TOKEN` in client-side code
2. **Validation**: The API routes validate all required fields
3. **Server-Side**: All Sanity writes happen server-side only
4. **Error Handling**: Errors are logged and don't expose sensitive data

---

## 🐛 Troubleshooting

### "Failed to create booking" Error

**Possible causes:**
1. Missing `SANITY_API_TOKEN` in environment variables
2. Token doesn't have write permissions
3. Schemas not deployed to Sanity
4. Network connectivity issues

**Solution:**
```bash
# 1. Check if token is set
echo $SANITY_API_TOKEN

# 2. Verify in .env.local
cat .env.local | grep SANITY_API_TOKEN

# 3. Restart dev server
npm run dev

# 4. Check Sanity Studio for the schemas
```

### Bookings Not Appearing in Sanity

1. Make sure schemas are imported in `sanity.config.ts`
2. Deploy schemas: `npx sanity deploy`
3. Check browser console for errors
4. Verify API token has write permissions

### Payment Records Not Created

1. Check that booking was created successfully first
2. Verify the booking reference ID is correct
3. Check server logs in terminal

---

## 📞 Support

If you encounter issues:
1. Check browser console for errors
2. Check terminal/server logs
3. Verify all environment variables are set
4. Ensure Sanity schemas are deployed

---

## 🎉 Success!

Your booking system is now fully dynamic and connected to Sanity CMS. Every booking and payment is automatically saved, and you can manage everything from your Sanity Studio!

**Test it now:**
1. Make a test booking on your site
2. Open Sanity Studio
3. Go to Bookings section
4. See your test booking appear! 🎊
