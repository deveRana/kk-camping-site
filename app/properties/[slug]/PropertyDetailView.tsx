'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import type { Property } from '@/types';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Badge } from '@/components/ui/Badge';
import { Rating } from '@/components/ui/Rating';
import { Button } from '@/components/ui/Button';
import { DatePicker } from '@/components/ui/DatePicker';
import { useModal } from '@/components/modal/useModal';
import { LightboxModalContent } from '@/components/sections/LightboxModalContent';
import { useToast } from '@/components/toast/useToast';

export function PropertyDetailView({ property }: { property: Property }) {

  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('2');

  const { openModal } = useModal();
  const { showToast } = useToast();


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
      { size: 'xl' }
    );
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast({
      type: 'success',
      message: 'Link copied to clipboard!',
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs
        items={[
          { label: 'Stays', href: '/properties' },
          { label: property.title },
        ]}
      />

      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="forest">{property.category}</Badge>
            <span className="text-xs text-forest-deep/70">{property.location}</span>
          </div>
          <h1 className="font-display text-3xl md:text-5xl font-semibold text-forest-deep">
            {property.title}
          </h1>
          <p className="text-sm md:text-base text-forest-deep/70 mt-1">{property.tagline}</p>
        </div>

        <div className="flex items-center gap-3">
          <Button onClick={handleShare} variant="outline" size="sm">
            Share Stay
          </Button>
          <Rating score={property.rating} reviewCount={property.reviewCount} size="md" />
        </div>
      </div>

      {/* Photo Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 h-[420px] rounded-2xl overflow-hidden shadow-lg border border-mist">
        <div
          onClick={() => handleOpenLightbox(0)}
          className="md:col-span-2 md:row-span-2 relative h-full bg-mist cursor-pointer group overflow-hidden"
        >
          <img
            src={property.gallery[0]}
            alt={property.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <span className="absolute bottom-3 left-3 bg-black/60 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur">
            Click to view photos
          </span>
        </div>

        {property.gallery.slice(1, 5).map((imgUrl, i) => (
          <div
            key={i}
            onClick={() => handleOpenLightbox(i + 1)}
            className="relative h-full bg-mist cursor-pointer group overflow-hidden hidden md:block"
          >
            <img
              src={imgUrl}
              alt={`${property.title} view ${i + 2}`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        ))}
      </div>

      {/* Main Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left Column: Specs & Features */}
        <div className="lg:col-span-2 space-y-10">
          {/* Overview Badges */}
          <div className="flex flex-wrap gap-4 p-5 bg-white rounded-2xl border border-mist">
            <div>
              <span className="text-xs text-forest-deep/60 block uppercase font-semibold">Capacity</span>
              <span className="text-sm font-semibold text-forest-deep">{property.capacity}</span>
            </div>
            <div className="border-l border-mist pl-4">
              <span className="text-xs text-forest-deep/60 block uppercase font-semibold">Distance</span>
              <span className="text-sm font-semibold text-forest-deep">{property.distance}</span>
            </div>
            <div className="border-l border-mist pl-4">
              <span className="text-xs text-forest-deep/60 block uppercase font-semibold">Rating</span>
              <span className="text-sm font-semibold text-forest-deep">★ {property.rating} / 5.0</span>
            </div>
          </div>


          {/* Description */}
          <div className="space-y-3">
            <h3 className="font-display text-2xl font-semibold text-forest-deep">
              About this campsite
            </h3>
            <p className="text-sm text-forest-deep/85 leading-relaxed">
              {property.description}
            </p>
          </div>

          {/* Amenities Grid */}
          <div className="space-y-4 pt-6 border-t border-mist">
            <h3 className="font-display text-2xl font-semibold text-forest-deep">
              What this stay offers
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {property.amenities.map((amenity, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 bg-white rounded-xl border border-mist">
                  <span className="w-8 h-8 rounded-lg bg-mist text-forest flex items-center justify-center text-sm font-bold">
                    ✓
                  </span>
                  <span className="text-xs font-medium text-forest-deep">{amenity.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Sticky Booking Widget Card */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 bg-white rounded-2xl p-6 border border-mist shadow-xl space-y-6">
            <div className="flex items-baseline justify-between">
              <div>
                <span className="font-display text-3xl font-semibold text-forest">
                  ₹{property.price.toLocaleString()}
                </span>
                <span className="text-xs text-forest-deep/60 ml-1">/ night</span>
              </div>
              <Rating score={property.rating} reviewCount={property.reviewCount} />
            </div>

            <div className="space-y-3 pt-4 border-t border-mist">
              <DatePicker
                label="Check-in Date"
                placeholder="Select Check-in"
                value={checkIn}
                onChange={setCheckIn}
              />

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
                </select>
              </div>
            </div>

            <Link
              href={`/booking?propertyId=${property.id}&checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`}
              className="block w-full"
            >
              <Button variant="primary" size="lg" className="w-full">
                Proceed to Booking
              </Button>
            </Link>

            <p className="text-[11px] text-center text-forest-deep/60">
              Free cancellation up to 48 hours before check-in.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
