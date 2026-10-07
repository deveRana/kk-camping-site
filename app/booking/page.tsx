import { notFound } from 'next/navigation';
import { getProperties } from '@/lib/sanity/data';
import { BookingView } from './BookingView';

export default async function BookingPage({
  searchParams,
}: {
  searchParams: Promise<{ propertyId?: string }>;
}) {
  const { propertyId } = await searchParams;
  const properties = await getProperties();
  const property = properties.find((p) => p.id === propertyId) ?? properties[0];
  if (!property) notFound();
  return <BookingView property={property} />;
}
