import { defineQuery } from 'next-sanity';
import { client } from './client';
import { urlFor } from './image';
import type {
  BlogPost,
  FAQItem,
  GalleryItem,
  Property,
  Testimonial,
} from '@/types';

const REVALIDATE = { next: { revalidate: 60 } };

/* ---------- Site settings ---------- */

const SETTINGS_QUERY = defineQuery(`*[_type == "siteSettings"][0]`);

export interface SiteSettings {
  brandName: string;
  tagline: string;
  contactNumbers: string[];
  email?: string;
  address: string;
  landmark: string;
  googleMapsUrl?: string;
  coordinates: { lat: number; lng: number };
  checkInTime?: string;
  checkOutTime?: string;
  advancePaymentPercentage: number;
  paymentUPI?: string;
  paymentMethods: string[];
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const s = await client.fetch(SETTINGS_QUERY, {}, REVALIDATE);
  return {
    brandName: s?.brandName ?? 'Lakeora',
    tagline: s?.tagline ?? '',
    contactNumbers: s?.contactNumbers ?? [],
    email: s?.email,
    address: s?.address ?? '',
    landmark: s?.landmark ?? '',
    googleMapsUrl: s?.googleMapsUrl,
    coordinates: { lat: s?.latitude ?? 18.6825, lng: s?.longitude ?? 73.4912 },
    checkInTime: s?.checkInTime,
    checkOutTime: s?.checkOutTime,
    advancePaymentPercentage: s?.advancePaymentPercentage ?? 50,
    paymentUPI: s?.paymentUPI,
    paymentMethods: s?.paymentMethods ?? [],
  };
}

/* ---------- Properties ---------- */

const PROPERTY_FIELDS = `
  _id, title, "slug": slug.current, tagline, category, price, originalPrice,
  capacity, rating, reviewCount, location, distance, description,
  coverImage, gallery, features, amenities, inclusions, isPopular, isFeatured
`;

const PROPERTIES_QUERY = defineQuery(
  `*[_type == "property" && defined(slug.current)] | order(order asc, price desc){ ${PROPERTY_FIELDS} }`,
);
const PROPERTY_QUERY = defineQuery(
  `*[_type == "property" && slug.current == $slug][0]{ ${PROPERTY_FIELDS} }`,
);

function mapProperty(p: any, s: SiteSettings): Property {
  return {
    id: p._id,
    slug: p.slug,
    title: p.title,
    tagline: p.tagline ?? '',
    category: p.category,
    price: p.price,
    originalPrice: p.originalPrice ?? undefined,
    rating: p.rating ?? 4.9,
    reviewCount: p.reviewCount ?? 0,
    location: p.location ?? '',
    distance: p.distance ?? '',
    capacity: p.capacity ?? '',
    coverImage: urlFor(p.coverImage, 1400),
    gallery: (p.gallery ?? []).map((g: any) => urlFor(g, 1600)).filter(Boolean),
    description: p.description ?? '',
    features: p.features ?? [],
    inclusions: p.inclusions ?? [],
    amenities: (p.amenities ?? []).map((a: any) => ({ icon: a.icon ?? '', name: a.name })),
    host: {
      name: `${s.brandName}, Pawna Lake`,
      avatar: '/logos/logo.PNG',
      superhost: false,
      joined: 'Verified Lakeside Campsite',
      phone: s.contactNumbers[0] ?? '',
    },
    coordinates: s.coordinates,
    isPopular: p.isPopular ?? false,
    isFeatured: p.isFeatured ?? false,
  };
}

export async function getProperties(): Promise<Property[]> {
  const [rows, settings] = await Promise.all([
    client.fetch(PROPERTIES_QUERY, {}, REVALIDATE),
    getSiteSettings(),
  ]);
  return rows.map((p: any) => mapProperty(p, settings));
}

export async function getPropertyBySlug(slug: string): Promise<Property | null> {
  const [row, settings] = await Promise.all([
    client.fetch(PROPERTY_QUERY, { slug }, REVALIDATE),
    getSiteSettings(),
  ]);
  return row ? mapProperty(row, settings) : null;
}

/* ---------- Blogs ---------- */

export type PortableTextValue = any[];
export interface BlogPostWithBody extends BlogPost {
  body: PortableTextValue;
}

const BLOG_FIELDS = `
  _id, title, "slug": slug.current, excerpt, category, coverImage, authorName,
  authorRole, authorAvatar, publishedAt, readTime, tags
`;

function mapBlog(b: any): BlogPostWithBody {
  return {
    id: b._id,
    slug: b.slug,
    title: b.title,
    excerpt: b.excerpt ?? '',
    content: '',
    body: b.body ?? [],
    category: b.category ?? '',
    coverImage: urlFor(b.coverImage, 1600),
    author: {
      name: b.authorName ?? 'Lakeora Team',
      avatar: urlFor(b.authorAvatar, 200) || '/logos/lakeora-mark-dark.png',
      role: b.authorRole ?? '',
    },
    publishedAt: b.publishedAt
      ? new Date(b.publishedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
      : '',
    readTime: b.readTime ?? '',
    tags: b.tags ?? [],
  };
}

const BLOGS_QUERY = defineQuery(
  `*[_type == "blogPost" && defined(slug.current)] | order(publishedAt desc){ ${BLOG_FIELDS} }`,
);
const BLOG_QUERY = defineQuery(
  `*[_type == "blogPost" && slug.current == $slug][0]{ ${BLOG_FIELDS}, body }`,
);

export async function getBlogs(): Promise<BlogPostWithBody[]> {
  const rows = await client.fetch(BLOGS_QUERY, {}, REVALIDATE);
  return rows.map(mapBlog);
}

export async function getBlogBySlug(slug: string): Promise<BlogPostWithBody | null> {
  const row = await client.fetch(BLOG_QUERY, { slug }, REVALIDATE);
  return row ? mapBlog(row) : null;
}

/* ---------- FAQs, reviews, gallery ---------- */

const FAQS_QUERY = defineQuery(
  `*[_type == "faq"] | order(order asc){ _id, question, answer, category }`,
);

export async function getFaqs(): Promise<FAQItem[]> {
  const rows = await client.fetch(FAQS_QUERY, {}, REVALIDATE);
  return rows.map((f: any) => ({
    id: f._id,
    question: f.question,
    answer: f.answer,
    category: f.category ?? 'General',
  }));
}

const TESTIMONIALS_QUERY = defineQuery(
  `*[_type == "testimonial"] | order(_createdAt asc){ _id, name, location, avatar, rating, stayType, comment, date }`,
);

export async function getTestimonials(): Promise<Testimonial[]> {
  const rows = await client.fetch(TESTIMONIALS_QUERY, {}, REVALIDATE);
  return rows.map((t: any) => ({
    id: t._id,
    name: t.name,
    location: t.location ?? '',
    avatar: urlFor(t.avatar, 200) || '/logos/lakeora-mark-dark.png',
    rating: t.rating ?? 5,
    stayType: t.stayType ?? '',
    comment: t.comment,
    date: t.date ?? '',
  }));
}

const GALLERY_QUERY = defineQuery(
  `*[_type == "galleryItem"] | order(order asc){ _id, title, category, image, caption }`,
);

export async function getGallery(): Promise<GalleryItem[]> {
  const rows = await client.fetch(GALLERY_QUERY, {}, REVALIDATE);
  return rows.map((g: any) => ({
    id: g._id,
    title: g.title,
    category: g.category,
    imageUrl: urlFor(g.image, 1600),
    caption: g.caption ?? '',
  }));
}
