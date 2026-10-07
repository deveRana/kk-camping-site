'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import type { Property } from '@/types';
import type { SiteSettings } from '@/lib/sanity/data';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Badge } from '@/components/ui/Badge';
import { Rating } from '@/components/ui/Rating';
import { Button } from '@/components/ui/Button';
import { DatePicker } from '@/components/ui/DatePicker';
import { PropertyCard } from '@/components/sections/PropertyCard';
import { useModal } from '@/components/modal/useModal';
import { LightboxModalContent } from '@/components/sections/LightboxModalContent';
import { useToast } from '@/components/toast/useToast';

/** Line icons keyed by the amenity `icon` value stored in Sanity. */
const AMENITY_ICONS: Record<string, string> = {
  shower: 'M4 12h16M7 12V7a3 3 0 0 1 6 0M8 16v2m4-2v3m4-3v2',
  toilet: 'M6 4h12v6a6 6 0 0 1-12 0V4Zm3 14v3m6-3v3',
  plug: 'M9 3v5m6-5v5M7 8h10v3a5 5 0 0 1-10 0V8Zm5 8v5',
  bonfire: 'M12 3c1 3 4 4 4 8a4 4 0 0 1-8 0c0-2 1-3 2-4-.5 2 1 2.500 1 1 0-2-1-3 1-5ZM6 21l12-3M18 21 6 18',
  food: 'M7 3v8m-2-8v5a2 2 0 0 0 4 0V3M7 11v10m8-18c-2 2-2 6 0 8v10',
  sports: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm0 0v18M3 12h18',
  parking: 'M6 4h7a5 5 0 0 1 0 10H6V4Zm0 10v6',
};

function AmenityIcon({ name }: { name: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d={AMENITY_ICONS[name] ?? 'M5 13l4 4L19 7'} />
    </svg>
  );
}

const digits = (phone: string) => phone.replace(/\D/g, '');

export function PropertyDetailView({
  property,
  related,
  settings,
}: {
  property: Property;
  related: Property[];
  settings: SiteSettings;
}) {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('2');

  const { openModal } = useModal();
  const { showToast } = useToast();

  const phone = settings.contactNumbers[0] ?? '';
  const whatsappHref = phone
    ? `https://wa.me/91${digits(phone).slice(-10)}?text=${encodeURIComponent(
        `Hi Lakeora, I'm interested in the ${property.title}. Is it available?`,
      )}`
    : '';
  const bookingHref = `/booking?propertyId=${property.id}&checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`;

  const handleOpenLightbox = (index: number) => {
    openModal(
      <LightboxModalContent
        items={property.gallery.map((imgUrl, i) => ({
          id: `img-${i}`,
          title: `${property.title} - View ${i + 1}`,
          category: 'Campsites',
          imageUrl: imgUrl,
          caption: property.tagline,
        }))}
        initialIndex={index}
      />,
      { size: 'xl' },
    );
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast({ type: 'success', message: 'Link copied to clipboard!' });
  };

  const facts = [
    { label: 'Sleeps', value: property.capacity },
    { label: 'Check-in', value: settings.checkInTime ?? '—' },
    { label: 'Check-out', value: settings.checkOutTime ?? '—' },
    { label: 'From Mumbai / Pune', value: property.distance.replace(' from Mumbai · ', ' / ').replace(' from Pune', '') },
  ];

  return (
    <div className="pb-28 lg:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        <Breadcrumbs items={[{ label: 'Stays', href: '/properties' }, { label: property.title }]} />

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-3">
              <Badge variant="forest">{property.category}</Badge>
              <span className="eyebrow text-forest-deep/60">{property.location}</span>
            </div>
            <h1 className="font-display text-4xl md:text-6xl font-medium text-forest-deep leading-[1.05]">
              {property.title}
            </h1>
            <p className="text-base md:text-lg text-forest-deep/70 mt-3">{property.tagline}</p>
          </div>
          <div className="flex items-center gap-4">
            <Rating score={property.rating} reviewCount={property.reviewCount} size="md" />
            <Button onClick={handleShare} variant="outline" size="sm">
              Share
            </Button>
          </div>
        </div>

        {/* Photo gallery: layout adapts to how many photos the stay has */}
        {(() => {
          const photos = property.gallery.length > 0 ? property.gallery : [property.coverImage];
          const count = photos.length;
          const rest = photos.slice(1, 5);
          const tile = 'relative bg-mist group overflow-hidden';
          const img = 'w-full h-full object-cover transition-transform duration-700 group-hover:scale-105';
          const label = (
            <span className="absolute bottom-4 left-4 bg-white/90 text-forest-deep text-xs font-semibold px-4 py-2 rounded-full shadow backdrop-blur">
              {count > 1 ? `View all ${count} photos` : 'View photo'}
            </span>
          );
          const gridCols = count === 1 ? 'md:grid-cols-1' : count < 5 ? 'md:grid-cols-3' : 'md:grid-cols-4';
          const mainSpan = count === 1 ? '' : 'md:col-span-2';
          const rows = count < 5 ? Math.min(rest.length, 3) : 2;
          const mainShape = count === 1 ? 'rounded-t-[10rem] md:rounded-t-[22rem] rounded-b-3xl' : 'rounded-3xl md:rounded-tl-[12rem]';
          return (
            <div
              className={`grid grid-cols-1 ${gridCols} gap-3 h-[320px] md:h-[500px]`}
              style={count > 1 ? { gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))` } : undefined}
            >
              <button
                type="button"
                onClick={() => handleOpenLightbox(0)}
                style={count > 1 ? { gridRow: `span ${rows}` } : undefined}
                className={`${tile} ${mainSpan} ${mainShape} text-left h-full`}
              >
                <img src={photos[0]} alt={property.title} className={img} />
                {label}
              </button>
              {rest.slice(0, count < 5 ? 3 : 4).map((imgUrl, i) => (
                <button
                  type="button"
                  key={i}
                  onClick={() => handleOpenLightbox(i + 1)}
                  className={`${tile} rounded-3xl hidden md:block h-full`}
                >
                  <img src={imgUrl} alt={`${property.title} view ${i + 2}`} className={img} />
                </button>
              ))}
            </div>
          );
        })()}

        {/* Key facts */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-mist rounded-2xl overflow-hidden border border-mist">
          {facts.map((f) => (
            <div key={f.label} className="bg-white px-5 py-4">
              <span className="eyebrow text-forest-deep/50 block">{f.label}</span>
              <span className="font-display text-xl font-semibold text-forest-deep">{f.value}</span>
            </div>
          ))}
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            <section className="space-y-4">
              <h2 className="font-display text-3xl font-medium text-forest-deep">About this stay</h2>
              <p className="text-forest-deep/80 leading-relaxed">{property.description}</p>
              {property.features.length > 0 && (
                <ul className="flex flex-wrap gap-2 pt-1">
                  {property.features.map((feat) => (
                    <li key={feat}>
                      <Badge variant="paper" size="md">{feat}</Badge>
                    </li>
                  ))}
                </ul>
              )}
            </section>

            <section className="space-y-5 pt-10 border-t border-mist">
              <h2 className="font-display text-3xl font-medium text-forest-deep">What this stay offers</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {property.amenities.map((amenity, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col items-center text-center gap-3 p-5 bg-white rounded-3xl border border-mist hover:border-forest/30 hover:shadow-md transition"
                  >
                    <span className="w-12 h-12 rounded-full bg-sage/30 text-forest flex items-center justify-center">
                      <AmenityIcon name={amenity.icon} />
                    </span>
                    <span className="text-sm font-medium text-forest-deep leading-snug">{amenity.name}</span>
                  </div>
                ))}
              </div>
            </section>

            {property.inclusions && property.inclusions.length > 0 && (
              <section className="space-y-5 pt-10 border-t border-mist">
                <h2 className="font-display text-3xl font-medium text-forest-deep">What&apos;s included</h2>
                <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
                  {property.inclusions.map((item) => (
                    <li key={item} className="flex gap-3 text-sm text-forest-deep/85">
                      <svg className="w-5 h-5 shrink-0 text-forest mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <section className="rounded-3xl bg-forest-deep text-white p-8 flex flex-col sm:flex-row gap-6 sm:items-center justify-between">
              <div>
                <p className="eyebrow text-sage mb-2">Good to know</p>
                <p className="font-display text-2xl">
                  Confirm with just {settings.advancePaymentPercentage}% advance.
                </p>
                <p className="text-sm text-white/70 mt-1">
                  Pay the rest at check-in. Free cancellation up to 48 hours before arrival.
                </p>
              </div>
              {settings.googleMapsUrl && (
                <a
                  href={settings.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 border border-white/40 hover:bg-white/10 text-white px-6 py-3 rounded-full text-sm font-medium transition text-center"
                >
                  View on map
                </a>
              )}
            </section>
          </div>

          {/* Booking card */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 bg-white rounded-3xl border border-mist shadow-xl overflow-hidden">
              <div className="bg-forest text-white px-6 py-5">
                <p className="eyebrow text-sage">Starting from</p>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="font-display text-4xl font-semibold">₹{property.price.toLocaleString()}</span>
                  <span className="text-sm text-white/70">/ person</span>
                  {property.originalPrice && (
                    <span className="text-sm line-through text-white/50">₹{property.originalPrice.toLocaleString()}</span>
                  )}
                </div>
              </div>

              <div className="p-6 space-y-5">
                <div className="space-y-3">
                  <DatePicker label="Check-in Date" placeholder="Select Check-in" value={checkIn} onChange={setCheckIn} />
                  <DatePicker
                    label="Check-out Date"
                    placeholder="Select Check-out"
                    value={checkOut}
                    minDate={checkIn}
                    onChange={setCheckOut}
                  />
                  <div>
                    <label className="block text-xs font-semibold text-forest-deep uppercase tracking-wider mb-1.5">
                      Guests
                    </label>
                    <select
                      value={guests}
                      onChange={(e) => setGuests(e.target.value)}
                      className="w-full bg-paper/40 border border-mist rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-forest shadow-sm"
                    >
                      <option value="1">1 Guest</option>
                      <option value="2">2 Guests</option>
                      <option value="4">4 Guests</option>
                      <option value="6">6+ Guests</option>
                    </select>
                  </div>
                </div>

                <Link href={bookingHref} className="block w-full">
                  <Button variant="primary" size="lg" className="w-full">
                    Reserve Now
                  </Button>
                </Link>

                {whatsappHref && (
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center border border-forest/30 text-forest hover:bg-forest hover:text-white font-semibold text-sm py-3 rounded-xl transition"
                  >
                    Ask on WhatsApp
                  </a>
                )}

                <p className="text-[11px] text-center text-forest-deep/60">
                  Only {settings.advancePaymentPercentage}% advance · Free cancellation up to 48 hours before check-in
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* More stays */}
      {related.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
          <div className="flex items-end justify-between mb-8 gap-4">
            <div>
              <p className="eyebrow text-forest mb-2">Also at Lakeora</p>
              <h2 className="font-display text-4xl font-medium text-forest-deep">More ways to stay</h2>
            </div>
            <Link href="/properties" className="text-sm font-semibold text-forest hover:text-forest-dark whitespace-nowrap">
              All stays →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {related.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        </section>
      )}

      {/* Mobile sticky booking bar */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-30 bg-white/95 backdrop-blur border-t border-mist px-4 py-3 flex items-center justify-between gap-4 shadow-[0_-8px_24px_rgba(20,40,30,0.1)]">
        <div>
          <span className="font-display text-2xl font-semibold text-forest">₹{property.price.toLocaleString()}</span>
          <span className="text-xs text-forest-deep/60 ml-1">/ person</span>
        </div>
        <Link href={bookingHref}>
          <Button variant="primary" size="md">
            Reserve Now
          </Button>
        </Link>
      </div>
    </div>
  );
}
