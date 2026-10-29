import { getProperties } from '@/lib/sanity/data';
import { PropertiesView } from './PropertiesView';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'All Stays & Camping Options — Lakeora Pawna Lake',
  description:
    'Browse all lakeside stays at Pawna Lake: luxury AC dome tents, wooden cottages, glamping tents, and budget camping. Compare prices, amenities, and book instantly.',
};

export const revalidate = 60;

export default async function PropertiesPage() {
  const properties = await getProperties();
  return <PropertiesView properties={properties} />;
}
