# Monitoring Setup Guide

Quick guide to set up error tracking and uptime monitoring for Lakeora.

---

## 🚨 Step 1: Set Up Sentry (Error Tracking)

**Time:** 30 minutes  
**Cost:** Free (5,000 errors/month)

### Install Sentry

```bash
npm install @sentry/nextjs
npx @sentry/wizard@latest -i nextjs
```

The wizard will:
1. Create `sentry.client.config.ts`
2. Create `sentry.server.config.ts`
3. Add to `next.config.ts`
4. Ask for your Sentry DSN

### Get Your Sentry DSN

1. Go to [sentry.io](https://sentry.io)
2. Sign up (free)
3. Create new project → Next.js
4. Copy the DSN
5. Add to `.env.local`:

```env
NEXT_PUBLIC_SENTRY_DSN=https://your-dsn@sentry.io/project-id
SENTRY_AUTH_TOKEN=your-auth-token
```

### Track Custom Events

```typescript
import * as Sentry from '@sentry/nextjs';

// Track booking attempt
Sentry.addBreadcrumb({
  message: 'Booking started',
  data: { propertyId, amount, guests }
});

// Capture payment failure
if (!paymentSuccess) {
  Sentry.captureMessage('Payment failed', {
    level: 'error',
    extra: { 
      orderId, 
      amount, 
      paymentMethod,
      errorReason 
    }
  });
}

// Capture exceptions
try {
  // risky code
} catch (error) {
  Sentry.captureException(error);
  showToast({ type: 'error', message: 'Something went wrong' });
}
```

### Configure Alerts

In Sentry dashboard:
1. Go to Settings → Alerts
2. Create alert: "When error count > 10 in 5 minutes"
3. Add your email
4. Enable Slack/Discord webhook (optional)

---

## 📊 Step 2: Set Up Uptime Monitoring

**Time:** 10 minutes  
**Cost:** Free

### Option A: UptimeRobot (Recommended)

1. Go to [uptimerobot.com](https://uptimerobot.com)
2. Sign up (free)
3. Add new monitor:
   - **Monitor Type:** HTTP(s)
   - **URL:** `https://lakeorastay.com/api/health`
   - **Monitoring Interval:** 5 minutes
   - **Alert Contacts:** Your email/phone
4. Done!

### Option B: Better Uptime

1. Go to [betteruptime.com](https://betteruptime.com)
2. Sign up (free)
3. Add monitor: `https://lakeorastay.com/api/health`
4. Set up phone call alert for downtime (free tier)

### What Gets Monitored

The `/api/health` endpoint we created returns:
```json
{
  "status": "ok",
  "timestamp": "2026-10-29T12:00:00.000Z",
  "uptime": 12345,
  "environment": "production"
}
```

If this endpoint returns anything other than 200 OK, you get alerted immediately.

---

## 📈 Step 3: Set Up Analytics (Optional)

### Option A: Google Analytics 4

**Time:** 20 minutes  
**Cost:** Free

1. Go to [analytics.google.com](https://analytics.google.com)
2. Create account + property
3. Get Measurement ID (G-XXXXXXXXXX)
4. Add to `.env.local`:

```env
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

5. Create `components/GoogleAnalytics.tsx`:

```typescript
'use client';

import Script from 'next/script';

export function GoogleAnalytics() {
  const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  
  if (!GA_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}
      </Script>
    </>
  );
}
```

6. Add to `app/layout.tsx`:

```typescript
import { GoogleAnalytics } from '@/components/GoogleAnalytics';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  );
}
```

### Option B: Plausible (Privacy-Friendly)

**Cost:** $9/month (after trial)

1. Go to [plausible.io](https://plausible.io)
2. Add site: lakeorastay.com
3. Add script to `app/layout.tsx`:

```typescript
<Script
  defer
  data-domain="lakeorastay.com"
  src="https://plausible.io/js/script.js"
/>
```

---

## 🎯 Step 4: Enable Vercel Analytics

**Time:** 2 minutes  
**Cost:** Free on Hobby plan

1. Go to Vercel Dashboard → Your Project
2. Click "Analytics" tab
3. Click "Enable"
4. Install package:

```bash
npm install @vercel/analytics
```

5. Add to `app/layout.tsx`:

```typescript
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

This gives you:
- Real user monitoring
- Core Web Vitals
- Top pages
- No tracking cookies needed

---

## 📧 Step 5: Email Delivery Monitoring

### Log Email Sends

Update your email function:

```typescript
// lib/email/send.ts
export async function sendEmail(to: string, subject: string, html: string) {
  try {
    await transporter.sendMail({ to, subject, html });
    
    // Log success
    console.log('✅ Email sent:', { to, subject });
    
    // Optional: Track in Sentry
    // Sentry.addBreadcrumb({
    //   message: 'Email sent successfully',
    //   data: { to, subject }
    // });
    
    return { success: true };
  } catch (error) {
    // Log failure
    console.error('❌ Email failed:', { to, subject, error });
    
    // Track in Sentry
    // Sentry.captureException(error, {
    //   extra: { to, subject }
    // });
    
    return { success: false, error };
  }
}
```

---

## 🎊 Step 6: Test Everything

### Test Health Endpoint

```bash
curl https://lakeorastay.com/api/health
# Should return: {"status":"ok",...}
```

### Test Error Tracking

Add a test error button (remove after testing):

```typescript
// In any page
<button onClick={() => { throw new Error('Test error!') }}>
  Test Sentry
</button>
```

Click it, then check Sentry dashboard to see the error.

### Test Uptime Alert

1. Stop your Vercel deployment (or break health endpoint)
2. Wait 5-10 minutes
3. You should receive alert from UptimeRobot

### Test Analytics

1. Visit your site in incognito mode
2. Click around for 2-3 minutes
3. Check GA/Plausible dashboard to see your session

---

## 📊 What to Monitor

### Weekly Check (5 minutes)
- ✅ Sentry dashboard: Any new errors?
- ✅ UptimeRobot: Site uptime %
- ✅ Vercel Analytics: Core Web Vitals green?
- ✅ Google Analytics: Traffic trends

### After Deployment
- ✅ Check Sentry for new errors
- ✅ Verify health endpoint still works
- ✅ Test booking flow end-to-end

### Monthly Check
- ✅ Review most common errors in Sentry
- ✅ Check which pages have highest bounce rate
- ✅ Review booking conversion rate

---

## 🚨 When You Get Alerted

### Downtime Alert from UptimeRobot

1. Check Vercel dashboard - any deployment issues?
2. Visit site manually - does it load?
3. Check `/api/health` directly
4. Check Vercel status page: vercel-status.com
5. If all else fails, contact Vercel support

### Error Alert from Sentry

1. Check how many users affected
2. Read stack trace
3. Reproduce locally if possible
4. Fix and deploy
5. Mark as resolved in Sentry

### Payment Failure

1. Check Sentry for payment errors
2. Check Razorpay dashboard
3. Contact customer if booking was lost
4. Issue refund if needed

---

## 💰 Cost Summary

**For Basic Setup:**
- Sentry Free: 5,000 errors/month = **$0**
- UptimeRobot: 50 monitors = **$0**
- Vercel Analytics: Included = **$0**
- **Total: $0/month**

**If You Add:**
- Google Analytics = **$0** (free forever)
- Plausible = **$9/month** (privacy-friendly alternative)
- Sentry Team (if you outgrow free tier) = **$26/month**

**Recommended for launch:** Free tier everything = $0/month 🎉

---

## ✅ Post-Setup Checklist

- [ ] Sentry installed and DSN configured
- [ ] Test error captured in Sentry dashboard
- [ ] UptimeRobot monitoring `/api/health`
- [ ] Received test downtime alert
- [ ] Vercel Analytics enabled
- [ ] Email delivery logging added
- [ ] Tested full booking flow
- [ ] Documented monitoring links in team docs

---

## 🔗 Quick Links (Save These)

**Production:**
- Site: https://lakeorastay.com
- Health: https://lakeorastay.com/api/health
- Vercel: https://vercel.com/dashboard
- Sentry: https://sentry.io/dashboard
- UptimeRobot: https://uptimerobot.com/dashboard
- Analytics: https://analytics.google.com

**Monitoring Schedule:**
- Daily: Check Sentry for critical errors
- Weekly: Review uptime % and error trends  
- Monthly: Analyze conversion rates and top errors

---

## 🎯 Bottom Line

**Time Investment:**
- Setup: 1 hour
- Weekly monitoring: 5 minutes
- Monthly review: 15 minutes

**Result:**
- Know immediately when site goes down
- See all errors in one place
- Track where users drop off
- Fix problems before customers complain

**Worth it?** Absolutely! 🚀
