import { getGallery } from '@/lib/sanity/data';
import { GalleryView } from './GalleryView';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Photo Gallery — Lakeora Pawna Lake Camping',
  description:
    'Explore photos of our lakeside campsites, cottages, activities, food, and beautiful Pawna Lake sunsets. See what makes Lakeora the perfect camping destination.',
};

export const revalidate = 60;

export default async function GalleryPage() {
  const gallery = await getGallery();
  return <GalleryView gallery={gallery} />;
}
