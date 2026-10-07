import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProperties, getPropertyBySlug, getSiteSettings } from '@/lib/sanity/data';
import { PropertyDetailView } from './PropertyDetailView';

export const revalidate = 60;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);
  if (!property) return {};
  return {
    title: `${property.title} — Lakeora`,
    description: property.tagline,
    openGraph: property.coverImage ? { images: [property.coverImage] } : undefined,
  };
}

export default async function PropertyDetailPage({ params }: Props) {
  const { slug } = await params;
  const [property, all, settings] = await Promise.all([
    getPropertyBySlug(slug),
    getProperties(),
    getSiteSettings(),
  ]);
  if (!property) notFound();
  const related = all.filter((p) => p.id !== property.id).slice(0, 3);
  return <PropertyDetailView property={property} related={related} settings={settings} />;
}
