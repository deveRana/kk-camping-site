import { getGallery } from '@/lib/sanity/data';
import { GalleryView } from './GalleryView';

export const revalidate = 60;

export default async function GalleryPage() {
  const gallery = await getGallery();
  return <GalleryView gallery={gallery} />;
}
