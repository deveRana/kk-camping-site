# Professional Email System Setup Guide

## Overview

Your camping site now has an **enterprise-grade email system** that automatically sends professional, invoice-style confirmation emails to both guests and admins whenever a booking is made.

### Features ✨

- ✅ **Automatic Email Notifications** - Sent immediately after booking
- ✅ **Professional HTML Templates** - Enterprise-quality design
- ✅ **Invoice-Style Layout** - Complete payment breakdown
- ✅ **Dual Notifications** - Guest confirmation + Admin alert
- ✅ **Mobile Responsive** - Perfect on all devices
- ✅ **Branded Design** - Lakeora colors and branding
- ✅ **Complete Information** - All booking details included

---

## 📧 What Emails Are Sent?

### 1. Guest Confirmation Email

**To:** Guest's email address  
**Subject:** `Booking Confirmed - LS-2026-XXXX | Lakeora Camping`

**Includes:**
- ✅ Booking confirmation status
- 📋 Booking reference number (prominent display)
- 👤 Guest information
- 🏕️ Accommodation details
- ➕ Selected add-ons
- 💰 Complete payment invoice with breakdown
- ⚠️ Balance payment reminder
- 📝 What to bring checklist
- 📞 Contact information
- 🗺️ Location map link

**Design:** Professional green gradient header, organized sections, clear pricing table

### 2. Admin Notification Email

**To:** Admin email address  
**Subject:** `🔔 New Booking: LS-2026-XXXX`

**Includes:**
- 🔔 New booking alert
- 📋 Booking reference
- 👤 Guest contact details (clickable phone/email)
- 🏕️ Property and stay details
- ➕ Add-ons to arrange
- 💰 Payment summary
- ⚠️ Action items checklist
- 🔗 Link to Sanity Studio

**Design:** Blue gradient header for admin distinction, action-oriented layout

---

## 🚀 Setup Instructions

### Step 1: Get Resend API Key

[Resend](https://resend.com) is a modern email API that's perfect for transactional emails.

1. Go to [resend.com](https://resend.com)
2. Sign up for a free account
3. Go to **API Keys**
4. Create a new API key
5. Copy the key (starts with `re_`)

**Free Tier:**
- 3,000 emails/month
- Perfect for most camping sites
- No credit card required

### Step 2: Verify Your Domain (Optional but Recommended)

For better deliverability and custom sender email:

1. In Resend dashboard, go to **Domains**
2. Add your domain (e.g., `lakeora.com`)
3. Add the DNS records Resend provides
4. Wait for verification (usually 5-10 minutes)

**Before verification:**
- Emails sent from: `onboarding@resend.dev`

**After verification:**
- Emails sent from: `bookings@lakeora.com` (or any email you want)

### Step 3: Configure Environment Variables

Add these to your `.env.local` file:

```env
# Resend Email API
RESEND_API_KEY=re_your_api_key_here

# Email Configuration
EMAIL_FROM=Lakeora <bookings@lakeora.com>
ADMIN_EMAIL=admin@lakeora.com

# Existing Sanity config
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_WRITE_TOKEN=sk_your_token_here
```

**Configuration Options:**

- `RESEND_API_KEY` **(Required)** - Your Resend API key
- `EMAIL_FROM` - Sender email (use verified domain or default `onboarding@resend.dev`)
- `ADMIN_EMAIL` - Where admin notifications go (can be multiple emails comma-separated)

### Step 4: Install Dependencies

```bash
npm install resend
# or
yarn add resend
# or
pnpm add resend
```

### Step 5: Test the System

1. Restart your development server:
```bash
npm run dev
```

2. Make a test booking on your site
3. Check your email inbox (both guest and admin emails)
4. Verify all details are correct

---

## 📝 Email Templates

### Template Features

✨ **Professional Design**
- Clean, modern layout
- Lakeora brand colors (green gradient)
- Mobile-responsive
- Print-friendly

💼 **Enterprise Quality**
- Proper invoice formatting
- Complete payment breakdown
- Reference numbers prominently displayed
- Action items clearly highlighted

📊 **Information Architecture**
- Organized in logical sections
- Easy to scan and read
- Important information highlighted
- Clear call-to-actions

---

## 🎨 Customizing Email Templates

Email templates are located in `lib/email/templates.ts`.

### Change Colors

Find and replace color codes:

**Guest Email (Green Theme):**
- Primary: `#1a4d2e` (dark green)
- Secondary: `#a8d5ba` (light green)
- Accent: `#22c55e` (success green)

**Admin Email (Blue Theme):**
- Primary: `#1e40af` (dark blue)
- Secondary: `#3b82f6` (bright blue)

### Modify Content

Edit the template strings in `templates.ts`:

```typescript
// Guest confirmation email
export function generateGuestConfirmationEmail(booking: BookingDetails)

// Admin notification email
export function generateAdminNotificationEmail(booking: BookingDetails)
```

### Add More Sections

The templates use HTML tables for compatibility. Add new sections using:

```html
<h3 class="section-title">Your Section Title</h3>
<div class="info-grid">
  <div class="info-row">
    <div class="info-label">Label</div>
    <div class="info-value">Value</div>
  </div>
</div>
```

---

## 🔍 Email Delivery

### Testing Email Delivery

**Development:**
- Emails sent to real addresses in dev mode
- Check spam folder if not received
- Use your own email for testing

**Production:**
- Verify domain for better deliverability
- Monitor Resend dashboard for delivery stats
- Check bounce rates

### Common Issues

**❌ Emails not received:**
1. Check spam/junk folder
2. Verify `RESEND_API_KEY` is set correctly
3. Check Resend dashboard logs
4. Verify email address is valid

**❌ Emails go to spam:**
1. Verify your domain in Resend
2. Set up SPF and DKIM records
3. Warm up your domain gradually
4. Avoid spam trigger words

**❌ "Authentication required" error:**
- Make sure `RESEND_API_KEY` is in `.env.local`
- Restart dev server after adding env vars
- Check API key hasn't expired

---

## 📊 Monitoring Emails

### View Email Logs

1. Go to [Resend Dashboard](https://resend.com/emails)
2. See all sent emails
3. Check delivery status
4. View open rates (if tracking enabled)

### Email Statistics

Track:
- Total emails sent
- Delivery rate
- Bounce rate
- Open rate (optional)

---

## 🔒 Security & Privacy

### Best Practices

✅ **Never expose API keys in client-side code**
- API calls happen server-side only
- Keys stored in environment variables

✅ **GDPR Compliance**
- Guest consent obtained during booking
- Emails contain only necessary information
- Opt-out option can be added

✅ **Data Protection**
- No sensitive payment data in emails
- SSL/TLS encrypted transmission
- Resend is SOC 2 compliant

---

## 🎯 Email Flow

```
User completes booking
        ↓
Booking saved to Sanity
        ↓
Payment record created
        ↓
Email templates generated
        ↓
    ┌─────────┴─────────┐
    ↓                   ↓
Guest Email      Admin Email
    ↓                   ↓
Inbox           Admin Inbox
```

---

## 🔧 Troubleshooting

### Check Email Service Status

```bash
# Check if emails are being sent
# Look for this in server logs:
# ✅ Guest email sent successfully
# ✅ Admin email sent successfully
```

### Test Email Sending Manually

Create a test API route:

```typescript
// app/api/test-email/route.ts
import { sendGuestConfirmation } from '@/lib/email/client';

export async function GET() {
  const result = await sendGuestConfirmation(
    'your-test@email.com',
    'Test Email',
    '<h1>Test</h1>'
  );
  return Response.json(result);
}
```

Visit `/api/test-email` to test.

### Logs to Check

**Server Logs:**
```
✅ Booking created: LS-2026-1234
✅ Payment recorded: TXN-xxxxx
✅ Guest email sent to: guest@example.com
✅ Admin email sent to: admin@lakeora.com
```

**Error Logs:**
```
❌ Error sending email: [error details]
```

---

## 💡 Advanced Features

### Add More Email Types

You can add more email types:

**1. Cancellation Confirmation**
```typescript
export function generateCancellationEmail(booking: BookingDetails)
```

**2. Reminder Email (1 day before check-in)**
```typescript
export function generateReminderEmail(booking: BookingDetails)
```

**3. Thank You Email (after checkout)**
```typescript
export function generateThankYouEmail(booking: BookingDetails)
```

### Multiple Admin Recipients

In `.env.local`:
```env
ADMIN_EMAIL=admin1@lakeora.com,admin2@lakeora.com,manager@lakeora.com
```

Update `client.ts`:
```typescript
const ADMIN_EMAILS = process.env.ADMIN_EMAIL?.split(',') || [];
```

### SMS Notifications

For critical alerts, add SMS using Twilio:
```typescript
import twilio from 'twilio';

export async function sendSMS(to: string, message: string) {
  // SMS implementation
}
```

---

## 📈 Upgrade Options

**Free Tier:**
- 3,000 emails/month
- ✅ Perfect for starting out

**Pro Tier ($20/month):**
- 50,000 emails/month
- Custom domains
- Priority support

**Enterprise:**
- Unlimited emails
- Dedicated IP
- Advanced analytics

---

## ✅ Checklist

Before going live, verify:

- [ ] Resend API key added to `.env.local`
- [ ] Email addresses configured correctly
- [ ] Test booking completed successfully
- [ ] Guest email received in inbox
- [ ] Admin email received in inbox
- [ ] All booking details appear correctly
- [ ] Links work (maps, contact, etc.)
- [ ] Mobile view looks good
- [ ] Domain verified (optional)
- [ ] SPF/DKIM records added (if domain verified)

---

## 🎉 Success!

Your professional email system is ready! Every booking will automatically send beautiful, detailed confirmation emails to both guests and admins.

**Test it now:**
1. Make a booking
2. Check your emails
3. Admire the professional design! 📧✨

---

## 📞 Support

**Resend Support:**
- [Documentation](https://resend.com/docs)
- [Status Page](https://status.resend.com)
- [Email support](mailto:support@resend.com)

**Need Help?**
- Check server logs for errors
- Verify all environment variables are set
- Test with different email addresses
- Check Resend dashboard for delivery logs

---

## 🔗 Related Documentation

- [BOOKING_SYSTEM_SETUP.md](./BOOKING_SYSTEM_SETUP.md) - Booking system with Sanity
- Resend API Docs - https://resend.com/docs
- Email best practices - https://resend.com/guides

---

*Last updated: October 2026*
