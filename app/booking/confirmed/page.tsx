import { notFound } from 'next/navigation';
import { getProperties } from '@/lib/sanity/data';
import { BookingConfirmedView } from './ConfirmedView';

export default async function BookingConfirmedPage({
  searchParams,
}: {
  searchParams: Promise<{ referenceId?: string; propertyId?: string }>;
}) {
  const { referenceId, propertyId } = await searchParams;
  const properties = await getProperties();
  const property = properties.find((p) => p.id === propertyId) ?? properties[0];
  if (!property) notFound();
  return <BookingConfirmedView property={property} refId={referenceId || 'LK-2026-8891'} />;
}
