# Design Audit & Component Inventory — KK Camping Site (LakeStay)

## 1. Design Tokens & Color Palette

### Colors
- **Terracotta (Primary Brand)**:
  - `DEFAULT`: `#C65D3E` (Buttons, key highlights, price highlights, active icons)
  - `dark`: `#A54A2E` (Button hover, active states)
  - `deep`: `#6B2416` (Headings, primary text, dark overlays)
- **Amber (Warm Accents)**:
  - `warm`: `#F2A65A` (Rating stars, secondary badges, warm accents)
  - `light`: `#F9C89B` (Subtitles, subtle highlights, badge background)
- **Cream (Neutral Backgrounds)**:
  - `DEFAULT`: `#FFF8F0` (Main page background)
  - `dark`: `#F5E9D7` (Card borders, dividers, subtle input fills, skeleton base)
- **Text & Status**:
  - `text-primary`: `#2C1810`
  - `text-secondary`: `rgba(107, 36, 22, 0.7)` (`#6B2416` with 70% opacity)
  - `success`: `#10B981` (Green)
  - `error`: `#EF4444` (Red)
  - `info`: `#3B82F6` (Blue)
  - `warning`: `#F59E0B` (Amber)

### Typography
- **Display Font**: `Fraunces` (Serif) — used for all main page titles, section headings, numbers, and brand logo.
- **Sans Font**: `Inter` (Sans-serif) — used for body text, form inputs, buttons, navigation links, and badges.

### Layout & Borders
- **Max Width**: `max-w-7xl` (`1280px`) with container padding `px-4 sm:px-6 lg:px-8`
- **Border Radius**:
  - Cards & Containers: `rounded-2xl` (`16px`)
  - Inputs & Buttons: `rounded-xl` (`12px`) or `rounded-lg` (`8px`)
  - Badges & Pills: `rounded-full` (`9999px`)
- **Shadows**:
  - Soft card shadow: `shadow-md` / `box-shadow: 0 4px 16px rgba(107, 36, 22, 0.08)`
  - Elevated card hover: `shadow-2xl` / `box-shadow: 0 12px 32px rgba(107, 36, 22, 0.15)`

---

## 2. Component Inventory & Page Usage Matrix

| Component | Category | Description | Used in Pages |
| :--- | :--- | :--- | :--- |
| `Navbar` | Layout | Navigation header with logo, links, book action button, mobile drawer | All pages |
| `Footer` | Layout | Site footer with links, brand info, newsletter signup, copyright, social icons | All pages |
| `Button` | UI Primitive | Customizable button with primary (terracotta), secondary (cream), outline, ghost, icon variants | All pages |
| `Input` / `Select` | UI Primitive | Text input, date picker, select dropdown, search field | Home, Properties, Booking, Contact, FAQ, Blogs |
| `Badge` / `Tag` | UI Primitive | Category badges, amenity pills ("Lakefront", "Kayaking", "Glamping") | Home, Properties, Property Detail, Experiences |
| `RatingStars` | UI Primitive | Star rating visualization with numeric score and review count | Home, Properties, Property Detail, Experiences, Booking |
| `Skeleton` | UI Primitive | Loading state placeholders (shimmer animation for cards, detail pages, text) | `loading.tsx` across routes |
| `PropertyCard` | Section Component | Campsite card with image carousel/cover, price/night, rating, badges, wishlist heart button | Home, Properties, Property Detail (Related Stays) |
| `BlogCard` | Section Component | Article card with cover photo, category badge, date, read time, excerpt, author | Home, Blogs, Blog Post (Related Articles) |
| `ExperienceCard` | Section Component | Activity card (Kayaking, Bonfire, Trekking, BBQ) with pricing, duration, features | Home, Experiences |
| `TestimonialCard` | Section Component | Customer review card with star rating, review text, customer name, date | Home, About |
| `FAQAccordion` | Section Component | Expandable question/answer accordion item with toggle animation | Home, FAQ, Booking |
| `Breadcrumbs` | Layout/UI | Hierarchical page path navigation | Property Detail, Blog Post, Booking, Legal pages |
| `Pagination` | UI Primitive | Page switcher (Prev, Next, Page numbers) | Properties, Blogs, Gallery |
| `BookingWidget` | Section Component | Date range + guest selector form widget | Home (Hero), Property Detail, Booking |
| `FilterSidebar` / `FilterDrawer` | Section Component | Mobile/desktop campsite filters (price range, tent types, amenities, rating) | Properties |
| `GalleryGrid` & `LightboxModal` | Section Component | Photo grid with click-to-enlarge Lightbox viewer and Next/Prev controls | Home, Property Detail, Gallery |
| `ModalSystem` | Global System | `ModalProvider` + `<ModalRoot />` + `useModal()` hook | Gallery, Properties, My Bookings, Booking |
| `ToastSystem` | Global System | `ToastProvider` + `<ToastRoot />` + `useToast()` hook | Booking, Contact, Wishlist toggle, Newsletter |

---

## 3. Route & Page Mapping

| Reference HTML | App Router Path | TypeScript Page File | Primary Purpose |
| :--- | :--- | :--- | :--- |
| `index.html` | `/` | `app/page.tsx` | Home page |
| `about.html` | `/about` | `app/about/page.tsx` | About page |
| `properties.html` | `/properties` | `app/properties/page.tsx` | Stays listing & map view |
| `properties-detail.html` | `/properties/[slug]` | `app/properties/[slug]/page.tsx` | Single property detail page |
| `experiences.html` | `/experiences` | `app/experiences/page.tsx` | Experiences & activities listing |
| `booking.html` | `/booking` | `app/booking/page.tsx` | Multi-step booking checkout page |
| `booking-confirmed.html` | `/booking/confirmed` | `app/booking/confirmed/page.tsx` | Booking confirmation receipt page |
| `my-bookings.html` | `/my-bookings` | `app/my-bookings/page.tsx` | User's bookings dashboard |
| `blogs.html` | `/blogs` | `app/blogs/page.tsx` | Blog articles listing |
| `blogs-post.html` | `/blogs/[slug]` | `app/blogs/[slug]/page.tsx` | Single blog article post |
| `gallery.html` | `/gallery` | `app/gallery/page.tsx` | Photo gallery with Lightbox modal |
| `faq.html` | `/faq` | `app/faq/page.tsx` | Frequently Asked Questions |
| `contact.html` | `/contact` | `app/contact/page.tsx` | Contact page & message form |
| `cancellation.html` | `/cancellation` | `app/cancellation/page.tsx` | Cancellation policy |
| `privacy.html` | `/privacy` | `app/privacy/page.tsx` | Privacy policy |
| `terms.html` | `/terms` | `app/terms/page.tsx` | Terms of service |
| `404.html` | `not-found` | `app/not-found.tsx` | Custom 404 page |
| `loading-skeleton.html` | `loading` | `app/loading.tsx` & component skeletons | Global and route loading skeletons |

---

## 4. Global Interactivity & Systems

1. **Modal System**:
   - `ModalContext` managing active modal component, open/close functions, backdrop overlay click, ESC key listener, focus trap, body scroll lock.
   - Used for:
     - Gallery Lightbox (viewing high-res campsite images)
     - Mobile Filter Drawer (filtering properties on mobile screens)
     - Cancellation Confirmation Modal (cancelling an active booking)
     - Property Quick View / Share Modal

2. **Toast Notification System**:
   - `ToastContext` managing active toast notifications stack (type: `success`, `error`, `info`, `warning`).
   - Auto-dismiss after 4000ms, smooth entrance/exit animations.
   - Used for:
     - Wishlist added / removed notification
     - Form submission success feedback (Contact, Newsletter, Booking)
     - Coupon code applied feedback
     - Link copied to clipboard
