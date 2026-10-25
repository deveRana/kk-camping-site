import { notFound } from 'next/navigation';
import { getProperties } from '@/lib/sanity/data';
import { BookingView } from './BookingView';

export default async function BookingPage({
  searchParams,
}: {
  searchParams: Promise<{ propertyId?: string; guests?: string; checkIn?: string; checkOut?: string }>;
}) {
  const { propertyId, guests, checkIn, checkOut } = await searchParams;
  const properties = await getProperties();
  const property = properties.find((p) => p.id === propertyId) ?? properties[0];
  if (!property) notFound();
  const guestCount = Math.min(20, Math.max(1, parseInt(guests ?? '2', 10) || 2));
  return (
    <BookingView
      property={property}
      guests={guestCount}
      checkInDate={checkIn}
      checkOutDate={checkOut}
    />
  );
}
