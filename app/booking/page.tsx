import { notFound } from 'next/navigation';
import { getProperties, getSiteSettings } from '@/lib/sanity/data';
import { BookingView } from './BookingView';

export default async function BookingPage({
  searchParams,
}: {
  searchParams: Promise<{ propertyId?: string; guests?: string }>;
}) {
  const { propertyId, guests } = await searchParams;
  const [properties, settings] = await Promise.all([getProperties(), getSiteSettings()]);
  const property = properties.find((p) => p.id === propertyId) ?? properties[0];
  if (!property) notFound();
  const guestCount = Math.min(20, Math.max(1, parseInt(guests ?? '2', 10) || 2));
  return (
    <BookingView
      property={property}
      guests={guestCount}
      advancePercent={settings.advancePaymentPercentage}
    />
  );
}
