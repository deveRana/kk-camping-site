# Razorpay Payment Integration Setup Guide

This document provides complete instructions for setting up and testing the Razorpay payment integration in your camping site application.

## 🎯 What's Been Implemented

### ✅ Complete End-to-End Payment Flow

1. **Frontend Integration** ([BookingView.tsx](app/booking/BookingView.tsx))
   - Dynamic Razorpay script loading
   - Secure checkout modal
   - Payment success/failure handling
   - Loading states and error handling

2. **Backend APIs**
   - Create Razorpay Order: `/api/razorpay/create-order`
   - Verify Payment: `/api/razorpay/verify-payment`
   - Updated Booking API: `/api/bookings`

3. **Server-Side Utilities** ([lib/razorpay/server.ts](lib/razorpay/server.ts))
   - Order creation
   - Payment signature verification
   - Payment fetching
   - Refund support

4. **Client-Side Utilities** ([lib/razorpay/client.ts](lib/razorpay/client.ts))
   - Checkout modal integration
   - API communication
   - Error handling

---

## 📦 Package Installation

Razorpay SDK has already been installed:

```bash
npm install razorpay
```

---

## 🔐 Environment Setup

### Step 1: Get Razorpay Credentials

1. Go to [Razorpay Dashboard](https://dashboard.razorpay.com/app/dashboard)
2. Sign up or log in
3. Navigate to **Settings** → **API Keys**
4. Generate keys (Test Mode for development, Live Mode for production)

### Step 2: Add to `.env.local`

Add these **3 environment variables** to your `.env.local` file:

```bash
# Server-side key ID (SECRET - never expose to frontend)
RAZORPAY_KEY_ID=rzp_test_your_key_id_here

# Server-side key secret (SECRET - never expose to frontend)
RAZORPAY_KEY_SECRET=your_key_secret_here

# Public key for frontend (safe to expose)
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_your_key_id_here
```

**Important Notes:**
- Use **test keys** (`rzp_test_...`) during development
- Use **live keys** (`rzp_live_...`) in production
- `RAZORPAY_KEY_ID` and `NEXT_PUBLIC_RAZORPAY_KEY_ID` can have the same value
- Never commit `.env.local` to git (it's already in `.gitignore`)

### Step 3: Email Configuration (Required)

The system sends booking confirmation emails after successful payment. Add these to `.env.local`:

```bash
# Resend API Key (get from https://resend.com/api-keys)
RESEND_API_KEY=re_your_resend_api_key_here

# Sender email (must be verified in Resend)
EMAIL_FROM=noreply@yourdomain.com

# Admin notification email
ADMIN_EMAIL=admin@yourdomain.com
```

---

## 🔄 How the Payment Flow Works

### User Journey

1. **User fills booking form** → Provides name, email, phone, guests
2. **Proceeds to payment** → System creates Razorpay order
3. **Razorpay checkout opens** → User selects payment method (UPI/Card/NetBanking)
4. **User completes payment** → Razorpay processes transaction
5. **System verifies payment** → Backend validates signature
6. **Booking confirmed** → Status updated, emails sent
7. **Confirmation page** → User sees booking details

### Backend Flow

```
┌─────────────────────────────────────────────────────────────┐
│ 1. POST /api/razorpay/create-order                          │
│    - Creates Razorpay order                                 │
│    - Returns orderId, amount, currency                      │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ 2. POST /api/bookings                                        │
│    - Creates booking with status: "pending"                 │
│    - paymentStatus: "pending"                               │
│    - Stores razorpayOrderId                                 │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ 3. Frontend opens Razorpay checkout modal                   │
│    - User completes payment                                 │
│    - Razorpay returns payment_id, order_id, signature       │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ 4. POST /api/razorpay/verify-payment                        │
│    - Verifies payment signature (CRITICAL SECURITY)         │
│    - Fetches payment details from Razorpay                  │
│    - Updates booking status: "confirmed"                    │
│    - Updates paymentStatus: "paid"                          │
│    - Creates payment record in Sanity                       │
│    - Sends confirmation emails                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 🧪 Testing Guide

### Test Mode Setup

1. Use test keys from Razorpay Dashboard
2. Razorpay provides test cards and UPI IDs

### Test Payment Credentials

#### Test Cards (Always Succeed)
```
Card Number: 4111 1111 1111 1111
CVV: Any 3 digits
Expiry: Any future date
```

#### Test UPI (Always Succeed)
```
UPI ID: success@razorpay
```

#### Test Cards (Always Fail)
```
Card Number: 4000 0000 0000 0002
```

### Testing Steps

1. **Start the development server**
   ```bash
   npm run dev
   ```

2. **Navigate to a property and click "Book Now"**

3. **Fill in the booking form**
   - Full Name: Test User
   - Email: test@example.com
   - Phone: 9876543210
   - Guests: 2
   - Accept consent checkbox

4. **Click "Proceed to Payment"**
   - Razorpay checkout modal should open

5. **Complete test payment**
   - Use test card: `4111 1111 1111 1111`
   - CVV: `123`
   - Expiry: `12/25`

6. **Verify success**
   - Should redirect to confirmation page
   - Check Sanity Studio for booking with status "confirmed"
   - Check Razorpay Dashboard for payment record
   - Check email inbox for confirmation email

---

## 🔒 Security Features

### ✅ Implemented Security Measures

1. **Payment Signature Verification**
   - Uses HMAC SHA256 to verify authenticity
   - Prevents payment tampering
   - Located in [lib/razorpay/server.ts](lib/razorpay/server.ts)

2. **Server-Side Validation**
   - All payment verification happens on server
   - Client cannot fake successful payments

3. **Environment Variable Protection**
   - Sensitive keys never exposed to frontend
   - Only `NEXT_PUBLIC_RAZORPAY_KEY_ID` is public

4. **Input Sanitization**
   - All user inputs sanitized before storage
   - Prevents injection attacks

5. **HTTPS Required**
   - Razorpay requires HTTPS in production
   - Use Vercel/Netlify for automatic HTTPS

---

## 🚀 Production Deployment Checklist

### Before Going Live

- [ ] Replace test keys with live keys in production environment
- [ ] Set up proper domain and HTTPS
- [ ] Configure Resend with verified domain for emails
- [ ] Test live payment with small amount
- [ ] Set up Razorpay webhooks (optional, for automated updates)
- [ ] Enable Razorpay payment methods (UPI, Cards, NetBanking)
- [ ] Set up refund policy in Razorpay Dashboard
- [ ] Configure payment receipt settings
- [ ] Add business logo in Razorpay settings

### Production Environment Variables

```bash
# Production .env (or Vercel/Netlify environment variables)
RAZORPAY_KEY_ID=rzp_live_your_live_key_id
RAZORPAY_KEY_SECRET=your_live_key_secret
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_your_live_key_id

RESEND_API_KEY=re_your_production_key
EMAIL_FROM=noreply@yourdomain.com
ADMIN_EMAIL=bookings@yourdomain.com
```

---

## 🐛 Troubleshooting

### Issue: "Razorpay key ID not configured"

**Solution:** Add `NEXT_PUBLIC_RAZORPAY_KEY_ID` to `.env.local` and restart server

### Issue: "Failed to load Razorpay script"

**Solution:** Check internet connection. Razorpay script loads from CDN.

### Issue: "Payment verification failed"

**Solution:** 
- Check that `RAZORPAY_KEY_SECRET` is correct
- Ensure signature verification is working
- Check server logs for detailed error

### Issue: Emails not sending

**Solution:**
- Verify `RESEND_API_KEY` is set
- Check that `EMAIL_FROM` is verified in Resend
- Check server logs for email errors

### Issue: Payment succeeds but booking not confirmed

**Solution:**
- Check `/api/razorpay/verify-payment` endpoint logs
- Verify Sanity write permissions
- Check network tab for API errors

---

## 📚 Razorpay Documentation

- [Razorpay Checkout Integration](https://razorpay.com/docs/payments/payment-gateway/web-integration/)
- [Payment Verification](https://razorpay.com/docs/payments/payment-gateway/web-integration/standard/verify-payment/)
- [Test Cards](https://razorpay.com/docs/payments/payments/test-card-details/)
- [Webhooks](https://razorpay.com/docs/webhooks/)

---

## 🎨 Customization

### Change Brand Color

Edit the theme color in [lib/razorpay/client.ts](lib/razorpay/client.ts):

```typescript
theme: {
  color: '#1a4d2e', // Your brand color
}
```

### Change Payment Timeout

Default is 15 minutes. Change in [lib/razorpay/client.ts](lib/razorpay/client.ts):

```typescript
timeout: 900, // 15 minutes (in seconds)
```

### Add Logo to Checkout

Add your logo to `public/logo.png` or update path in [lib/razorpay/client.ts](lib/razorpay/client.ts):

```typescript
image: '/logo.png',
```

---

## 💡 Additional Features (Optional)

### Webhooks for Real-time Updates

Configure webhooks in Razorpay Dashboard to receive real-time payment updates:

1. Go to Settings → Webhooks
2. Add webhook URL: `https://yourdomain.com/api/webhooks/razorpay`
3. Select events: `payment.captured`, `payment.failed`

(Webhook endpoint not yet implemented - can be added if needed)

---

## 📞 Support

- **Razorpay Support:** support@razorpay.com
- **Documentation Issues:** Check this file and code comments
- **Integration Issues:** Check server logs and browser console

---

**Status:** ✅ Fully Implemented and Ready for Testing

**Last Updated:** 2026-10-25
