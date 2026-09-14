'use client';

import React, { use } from 'react';
import Link from 'next/link';
import { MOCK_PROPERTIES } from '@/lib/mock-data/properties';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/components/toast/useToast';

export default function BookingConfirmedPage({
  searchParams,
}: {
  searchParams: Promise<{ referenceId?: string; propertyId?: string }>;
}) {
  const resolvedSearchParams = use(searchParams);
  const refId = resolvedSearchParams.referenceId || 'LS-2026-8891';
  const propertyId = resolvedSearchParams.propertyId || 'prop-1';
  const property = MOCK_PROPERTIES.find((p) => p.id === propertyId) || MOCK_PROPERTIES[0];

  const { showToast } = useToast();

  const handleDownloadInvoice = () => {
    showToast({
      type: 'success',
      message: `PDF receipt for booking ${refId} downloaded!`,
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 text-center">
      {/* Success Badge Banner */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-8 space-y-4">
        <div className="w-16 h-16 rounded-full bg-emerald-600 text-white mx-auto flex items-center justify-center text-3xl font-bold shadow-lg">
          ✓
        </div>
        <h1 className="font-display text-3xl md:text-4xl font-bold text-emerald-950">
          Booking Confirmed!
        </h1>
        <p className="text-sm text-emerald-800 max-w-lg mx-auto">
          We&apos;ve sent your confirmation receipt and property location map to your WhatsApp and email.
        </p>
        <div className="inline-block bg-white px-4 py-2 rounded-xl text-xs font-mono font-bold text-emerald-900 border border-emerald-200 shadow-sm">
          Booking Reference: <span className="text-terracotta">{refId}</span>
        </div>
      </div>

      {/* Reservation Summary Box */}
      <div className="bg-white rounded-2xl border border-cream-dark p-6 md:p-8 text-left space-y-6 shadow-sm">
        <h3 className="font-display text-2xl font-semibold text-terracotta-deep border-b border-cream-dark pb-4">
          Reservation Details
        </h3>

        <div className="flex flex-col sm:flex-row gap-6">
          <img
            src={property.coverImage}
            alt={property.title}
            className="w-full sm:w-48 h-36 rounded-xl object-cover border border-cream-dark"
          />
          <div className="space-y-2 flex-1">
            <h4 className="font-display text-xl font-bold text-terracotta-deep">{property.title}</h4>
            <p className="text-xs text-terracotta-deep/70">{property.location}</p>
            <div className="grid grid-cols-2 gap-4 pt-3 text-xs">
              <div>
                <span className="text-terracotta-deep/60 block uppercase font-semibold">Check-in</span>
                <span className="font-bold text-terracotta-deep text-sm">4:00 PM · Oct 15, 2026</span>
              </div>
              <div>
                <span className="text-terracotta-deep/60 block uppercase font-semibold">Check-out</span>
                <span className="font-bold text-terracotta-deep text-sm">11:00 AM · Oct 17, 2026</span>
              </div>
            </div>
          </div>
        </div>

        {/* Host Contact Support */}
        <div className="p-4 bg-cream/50 rounded-xl border border-cream-dark flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-terracotta-deep">Property Host Contact</p>
            <p className="text-xs text-terracotta-deep/70">{property.host.name} ({property.host.phone})</p>
          </div>
          <a
            href={`https://wa.me/${property.host.phone.replace(/[^0-9]/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-emerald-600 text-white px-4 py-2 rounded-xl text-xs font-semibold hover:bg-emerald-700 transition flex items-center gap-1.5"
          >
            Chat on WhatsApp
          </a>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap justify-center gap-4">
        <Button onClick={handleDownloadInvoice} variant="outline" size="md">
          📄 Download PDF Invoice
        </Button>
        <Link href="/my-bookings">
          <Button variant="primary" size="md">
            View My Bookings Dashboard →
          </Button>
        </Link>
      </div>
    </div>
  );
}
