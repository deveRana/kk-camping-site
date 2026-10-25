# 🏕️ Lakeora Camping Site

A modern, full-featured camping and glamping booking platform built with Next.js 16, Sanity CMS, and Tailwind CSS.

## ✨ Features

- 🏡 **Property Listings** - Showcase tents, cottages, domes, and glamping options
- 📅 **Date Validation** - Smart booking system with past-date prevention
- 🗺️ **Google Maps Integration** - Location views for all properties
- 📧 **Email Notifications** - Automated booking confirmations via Resend
- 🔒 **DPDPA Compliance** - Data consent collection and audit trails
- 📱 **Responsive Design** - Mobile-first, works on all devices
- 🎨 **Modern UI** - Custom DatePicker, modals, toasts, and components
- 📊 **Sanity CMS** - Easy content management for properties, bookings, gallery
- 🔐 **Input Validation** - XSS protection, sanitization, server-side validation

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Sanity CMS account (free at [sanity.io](https://sanity.io))
- Resend account for emails (free at [resend.com](https://resend.com))

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd kk-camping-site
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` with your credentials:
   - **Sanity CMS**: Get from [sanity.io/manage](https://sanity.io/manage)
   - **Resend API**: Get from [resend.com/api-keys](https://resend.com/api-keys)
   - See `.env.example` for detailed instructions

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📦 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Sanity CMS
npm run sanity:studio  # Start Sanity Studio locally
npm run sanity:deploy  # Deploy Sanity schemas

# Data Management
npm run upload-gallery          # Upload gallery images to Sanity
npm run upload-property-images  # Upload property images
npm run add-maitri-package     # Add Maitri Camping to Sanity
npm run check-properties       # Check Sanity properties
```

## 🏗️ Project Structure

```
kk-camping-site/
├── app/                    # Next.js App Router pages
│   ├── properties/         # Property listings & detail pages
│   ├── booking/           # Booking flow
│   ├── contact/           # Contact form
│   ├── gallery/           # Photo gallery
│   └── api/               # API routes (bookings, payments)
├── components/            # React components
│   ├── ui/               # Reusable UI components (Button, DatePicker, etc.)
│   ├── sections/         # Page sections (PropertyCard, FilterSidebar)
│   └── modal/            # Modal system
├── lib/                  # Utilities and helpers
│   ├── sanity/          # Sanity client & queries
│   ├── email/           # Email templates & sending
│   ├── validation.ts    # Input validation & sanitization
│   └── mock-data/       # Mock data for development
├── sanity/              # Sanity schema definitions
├── scripts/             # Utility scripts
└── public/              # Static assets (images, fonts)
```

## 🔧 Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | ✅ | Your Sanity project ID |
| `NEXT_PUBLIC_SANITY_DATASET` | ✅ | Sanity dataset (production/development) |
| `SANITY_API_WRITE_TOKEN` | ✅ | Sanity token with Editor permissions |
| `RESEND_API_KEY` | ✅ | Resend API key for emails |
| `EMAIL_FROM` | ✅ | Verified sender email address |
| `ADMIN_EMAIL` | ✅ | Admin email for notifications |
| `ADMIN_API_TOKEN` | ⚠️ | Optional: Secure admin endpoints |

See `.env.example` for detailed setup instructions.

## 🎨 Tech Stack

- **Framework**: Next.js 16.3.5 (App Router, React 19, Turbopack)
- **CMS**: Sanity v3.62.4
- **Styling**: Tailwind CSS 4
- **Email**: Resend
- **Validation**: Custom input validation & sanitization
- **Language**: TypeScript 5
- **Deployment**: Vercel

## 📝 Key Features Implementation

### Date Validation
- Client-side: DatePicker prevents past dates with `minDate`
- Server-side: API validates dates to prevent tampering
- Checkout must be after check-in

### DPDPA Compliance
- Consent checkboxes on all forms
- Timestamp and IP address tracking
- Audit trail stored in Sanity

### Email System
- Booking confirmations sent to guests
- Admin notifications for new bookings
- HTML email templates with branding

### Input Validation
- Email, phone, name validation
- XSS protection via sanitization
- Server-side validation on all API routes

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy automatically on every push

### Manual Deployment

```bash
npm run build
npm run start
```

## 📧 Contact

For questions or support, reach out to:
- Phone/WhatsApp: +91 74997 57607
- Website: [lakeorastay.com](https://lakeorastay.com)

## 📄 License

Private - All rights reserved

---

Built with ❤️ using Next.js and Sanity CMS
