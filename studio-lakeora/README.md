# Lakeora Sanity Studio

Standalone Sanity Studio for managing Lakeora camping site content.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd studio-lakeora
npm install
```

### 2. Login to Sanity
```bash
npx sanity login
```

### 3. Run Studio Locally
```bash
npm run dev
```

Studio will be available at: http://localhost:3333

### 4. Deploy Studio to Sanity Cloud
```bash
npm run deploy
```

Studio will be deployed at: https://lakeora.sanity.studio

## 📁 Schema Structure

### Core Schemas
- **Property** - Stays & packages (tents, cottages, domes)
- **Booking** - Guest bookings with payment tracking
- **Payment** - Payment records from Razorpay

### Content Schemas
- **Blog Post** - Blog articles
- **FAQ** - Frequently asked questions
- **Testimonial** - Guest reviews and ratings
- **Gallery Item** - Photo gallery
- **Cafe Menu Item** - Cafe menu with categories

### System Schemas
- **Site Settings** - Global site configuration (singleton)
- **Contact Submission** - Contact form submissions

## 🗺️ Google Maps Integration

Each property has three location fields:
- `googleMapsUrl` - Full Google Maps link
- `mapEmbed` - Iframe embed URL
- `coordinates` - GPS coordinates (lat/lng)

## 🔐 Environment Variables

Create a `.env` file (optional for local dev):
```
SANITY_STUDIO_PROJECT_ID=roac4c6v
SANITY_STUDIO_DATASET=production
```

## 📦 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build production bundle
- `npm run deploy` - Deploy to Sanity Cloud
- `npm run deploy-graphql` - Deploy GraphQL API

## 🎨 Customization

All schemas are in `schemaTypes/` directory. Edit them to customize your content structure.

## 📝 Notes

- This studio is configured for the Lakeora project (ID: roac4c6v)
- Dataset: production
- Singleton: Site Settings (only one document allowed)
- Structure menu is customized with icons and dividers
