'use client';

import React from 'react';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

export default function CancellationPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <Breadcrumbs items={[{ label: 'Cancellation & Refund Policy' }]} />

      <h1 className="font-display text-4xl md:text-5xl font-semibold text-forest-deep">
        Cancellation &amp; Refund Policy
      </h1>

      <div className="bg-white rounded-2xl p-8 border border-mist space-y-6 text-sm text-forest-deep/85 leading-relaxed">
        <section className="space-y-2">
          <h2 className="font-display text-xl font-semibold text-forest-deep">1. Free Cancellation Window</h2>
          <p>
            Cancellations made <strong>48 hours or more</strong> prior to scheduled check-in time (4:00 PM on arrival date) are eligible for a <strong>100% full refund</strong> or free date rescheduling without any penalty.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-display text-xl font-semibold text-forest-deep">2. Late Cancellations (24 – 48 Hours)</h2>
          <p>
            Cancellations made between 24 and 48 hours before check-in will receive a <strong>50% credit voucher</strong> valid for 6 months toward any future booking at Lakeora campsites.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-display text-xl font-semibold text-forest-deep">3. Same-Day / No-Show Policy</h2>
          <p>
            Cancellations requested within 24 hours of check-in or guest no-shows are non-refundable, as campsites and meals are prepared in advance.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-display text-xl font-semibold text-forest-deep">4. Monsoon &amp; Weather Disruptions</h2>
          <p>
            In the event of severe weather warnings issued by local authorities preventing travel to Pawna Lake, guests will be offered a 100% date shift or credit voucher.
          </p>
        </section>

        <div className="pt-6 border-t border-mist flex items-center justify-between text-xs">
          <span>Last updated: August 2026</span>
          <Link href="/contact" className="font-semibold text-forest hover:underline">
            Need help with a cancellation? Contact us →
          </Link>
        </div>
      </div>
    </div>
  );
}
