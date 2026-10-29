# Google Analytics 4 Setup Guide

Quick guide to set up Google Analytics 4 (GA4) for Lakeora.

---

## 📊 Step 1: Create Google Analytics Account

### 1.1 Go to Google Analytics
Visit: https://analytics.google.com

### 1.2 Create Account
1. Click "Start measuring"
2. Account name: "Lakeora" or your business name
3. Check all data sharing settings (recommended)
4. Click "Next"

### 1.3 Create Property
1. Property name: "Lakeora Website"
2. Time zone: India (IST)
3. Currency: Indian Rupee (INR)
4. Click "Next"

### 1.4 Business Information
1. Industry: "Travel & Tourism" or "Hospitality"
2. Business size: Select appropriate option
3. Usage: "Examine user behavior"
4. Click "Create"

### 1.5 Accept Terms
1. Select India as country
2. Check both boxes
3. Click "I Accept"

---

## 🔑 Step 2: Get Your Measurement ID

### 2.1 Data Streams
1. Click "Web" under "Choose a platform"
2. Website URL: `https://lakeorastay.com`
3. Stream name: "Lakeora Website"
4. Click "Create stream"

### 2.2 Copy Measurement ID
1. You'll see a **Measurement ID** like: `G-XXXXXXXXXX`
2. Copy this ID (you'll need it next)

---

## ⚙️ Step 3: Add to Your Website

### 3.1 Add to Environment Variables
Add this to your `.env.local` file:

```env
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

Replace `G-XXXXXXXXXX` with your actual Measurement ID.

### 3.2 Add to Vercel
1. Go to Vercel Dashboard → Your Project
2. Settings → Environment Variables
3. Add new variable:
   - **Name:** `NEXT_PUBLIC_GA_MEASUREMENT_ID`
   - **Value:** `G-XXXXXXXXXX`
   - **Environment:** Production, Preview, Development
4. Click "Save"
5. Redeploy your site (Vercel will do this automatically)

---

## ✅ Step 4: Test It's Working

### 4.1 Real-Time Test
1. Go to Google Analytics → Reports → Realtime
2. Open your website in incognito/private window
3. Navigate around for 30 seconds
4. You should see **1 active user** in Google Analytics

### 4.2 Debug with Chrome Extension
1. Install: [Google Analytics Debugger](https://chrome.google.com/webstore/detail/google-analytics-debugger/)
2. Enable the extension
3. Open your website
4. Open Chrome DevTools (F12) → Console
5. You should see GA4 events being sent

---

## 📈 Step 5: Set Up Key Events (Conversions)

### 5.1 Mark Events as Conversions
In Google Analytics:
1. Go to Admin → Events
2. Click "Create event" for custom events
3. Mark these as conversions:
   - `booking_started`
   - `booking_completed`
   - `payment_success`

---

## 🎯 Step 6: Track Custom Events

### Track Booking Started
Add to your booking form (when user clicks "Book Now"):

```typescript
import { trackEvent } from '@/components/GoogleAnalytics';

// When user starts booking
trackEvent('booking_started', 'Booking', property.name, property.price);
```

### Track Booking Completed
Add after successful payment:

```typescript
import { trackEvent } from '@/components/GoogleAnalytics';

// After successful booking
trackEvent('booking_completed', 'Booking', propertyName, totalAmount);
```

### Track Payment Success
In your Razorpay success handler:

```typescript
import { trackEvent } from '@/components/GoogleAnalytics';

// After payment verified
trackEvent('payment_success', 'Payment', 'Razorpay', amount);
```

### Track Contact Form Submission
In your contact form:

```typescript
import { trackEvent } from '@/components/GoogleAnalytics';

// After form submitted
trackEvent('contact_form_submit', 'Contact', 'Contact Page');
```

---

## 📊 What You'll Track

### Automatic Tracking (Already Set Up)
✅ Page views  
✅ Session duration  
✅ Bounce rate  
✅ Traffic sources (Google, Facebook, Direct, etc.)  
✅ Geographic location  
✅ Device type (mobile, desktop, tablet)  
✅ Browser & OS  

### Custom Events (Add These)
To track business metrics, add `trackEvent()` calls to:

| Event | Where to Add | Code |
|-------|-------------|------|
| **Booking Started** | When "Book Now" clicked | `trackEvent('booking_started', 'Booking', propertyName)` |
| **Booking Completed** | After payment success | `trackEvent('booking_completed', 'Booking', propertyName, amount)` |
| **Payment Failed** | After payment error | `trackEvent('payment_failed', 'Payment', 'Razorpay')` |
| **Contact Form** | After form submit | `trackEvent('contact_form_submit', 'Contact')` |
| **Property Viewed** | On property detail page | `trackEvent('property_view', 'Property', propertyName)` |
| **Phone Click** | When phone number clicked | `trackEvent('phone_click', 'Contact', 'Phone')` |
| **WhatsApp Click** | When WhatsApp clicked | `trackEvent('whatsapp_click', 'Contact', 'WhatsApp')` |

---

## 🔍 What to Monitor

### Weekly Check (5 minutes)
- **Traffic:** How many visitors?
- **Top Pages:** Which pages are most popular?
- **Traffic Sources:** Where are people coming from?
- **Bounce Rate:** Are people leaving immediately?

### Monthly Analysis (15 minutes)
- **Booking Funnel:** How many visitors → bookings?
- **Conversion Rate:** % of visitors who book
- **Popular Properties:** Which get most views/bookings?
- **Drop-off Points:** Where do people leave the booking flow?

---

## 🎯 Key Metrics to Watch

### Traffic Metrics
- **Users:** Unique visitors
- **Sessions:** Total visits
- **Pageviews:** Total pages viewed
- **Avg Session Duration:** How long people stay
- **Bounce Rate:** % who leave after 1 page (aim for <50%)

### Conversion Metrics (After adding custom events)
- **Booking Conversion Rate:** bookings / visitors (aim for 2-5%)
- **Contact Form Submissions:** leads generated
- **Property Views:** interest in each property

### Traffic Sources
- **Organic Search:** Google search results
- **Direct:** Typed URL directly
- **Social:** Facebook, Instagram, WhatsApp shares
- **Referral:** Other websites linking to you

---

## 🚨 Troubleshooting

### "Not Seeing Any Data"
1. **Wait 24-48 hours** - GA4 can take time to start showing data
2. Check Realtime reports - should show data immediately
3. Verify Measurement ID is correct
4. Check browser console for errors (F12)
5. Disable ad blockers and test in incognito

### "Seeing Own Visits"
Exclude your IP address:
1. Google Analytics → Admin → Data Streams
2. Click your web stream
3. Configure tag settings → Show more
4. Define internal traffic
5. Add your IP address

### "High Bounce Rate"
Could be:
- Slow loading speed
- Mobile site issues
- Not matching user intent
- Pop-ups or intrusive elements

---

## 📱 Mobile App Tracking (Future)

If you build a mobile app later, GA4 can track both web and app in one property:
1. Add Android/iOS data stream
2. Install Firebase SDK
3. Track app + web users together

---

## 🔐 Privacy & Compliance

### Cookie Consent
GA4 uses cookies. You should:
1. ✅ Cookie Policy page (already done)
2. ⚠️ Cookie consent banner (add if strict about GDPR)
3. ✅ Privacy Policy mentions analytics (update yours)

### Data Retention
Default: 2 months (can change to 14 months in GA4 settings)

### IP Anonymization
GA4 automatically anonymizes IP addresses by default.

---

## 💰 Cost

**Google Analytics 4:** **FREE** forever
- Unlimited pageviews
- Unlimited users
- All features included
- No credit card needed

Only pay if you exceed:
- 10 million events/month (you won't!)
- Then it's GA360 at $50,000/year (enterprise only)

---

## 🎓 Learning Resources

**Official Docs:**
- https://support.google.com/analytics/answer/9304153

**Video Tutorials:**
- [GA4 Beginners Guide](https://www.youtube.com/results?search_query=GA4+tutorial+beginners)

**What to Learn:**
1. How to read reports (20 min)
2. How to set up conversions (15 min)
3. How to create custom reports (30 min)

---

## ✅ Quick Checklist

Setup (20 minutes):
- [ ] Create Google Analytics account
- [ ] Get Measurement ID
- [ ] Add to .env.local
- [ ] Add to Vercel environment variables
- [ ] Deploy and test in Realtime
- [ ] Verify you see 1 active user

Week 1:
- [ ] Add booking event tracking
- [ ] Add payment event tracking
- [ ] Mark conversions in GA4
- [ ] Set up weekly report email

Month 1:
- [ ] Analyze first month of data
- [ ] Identify top traffic sources
- [ ] Calculate conversion rate
- [ ] Optimize based on findings

---

## 🎉 You're Done!

Once you add the Measurement ID to Vercel and redeploy:
- ✅ Analytics will start tracking automatically
- ✅ No more code changes needed for basic tracking
- ✅ View reports at https://analytics.google.com

**Next Step:** Add custom event tracking to measure bookings and conversions! 📈
