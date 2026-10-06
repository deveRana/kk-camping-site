'use client';

import React from 'react';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Button } from '@/components/ui/Button';

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      <Breadcrumbs items={[{ label: 'About Us' }]} />

      {/* Hero Heading */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <p className="eyebrow text-forest">Our Story &amp; Mission</p>
        <h1 className="font-display text-4xl md:text-5xl font-semibold text-forest-deep">
          Bringing You Closer to Nature at Pawna Lake
        </h1>
        <p className="text-base text-forest-deep/80 leading-relaxed">
          Founded in 2021, Lakeora started with a simple belief: weekend escapes shouldn&apos;t feel complicated or crowded. We curate premier lakeside glamping domes, wooden chalets, and safari tents so you can relax without compromise.
        </p>
      </div>

      {/* Story Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="relative h-80 md:h-[420px] rounded-2xl overflow-hidden shadow-xl border border-mist">
          <img
            src="/white-tent/white-tent-1.jpg"
            alt="Camping at sunset"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="space-y-6">
          <h2 className="font-display text-3xl font-semibold text-forest-deep">
            Why Lakeora is Maharashtra&apos;s #1 Camping Destination
          </h2>
          <p className="text-sm text-forest-deep/80 leading-relaxed">
            Nestled along the pristine shoreline of Pawna Dam with views of Tikona, Tung, and Lohagad Forts, our properties offer an ideal blend of rugged nature and modern comfort.
          </p>

          <div className="space-y-4">
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-xl bg-sage/30 text-forest flex items-center justify-center font-bold flex-shrink-0">
                1
              </div>
              <div>
                <h4 className="font-semibold text-forest-deep text-base">Verified Waterfront Locations</h4>
                <p className="text-xs text-forest-deep/70">
                  Every property on Lakeora is physically inspected to guarantee prime lake views, safe boundaries, and clean sanitation facilities.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-xl bg-sage/30 text-forest flex items-center justify-center font-bold flex-shrink-0">
                2
              </div>
              <div>
                <h4 className="font-semibold text-forest-deep text-base">All-Inclusive Weekend Packages</h4>
                <p className="text-xs text-forest-deep/70">
                  No hidden fees. Your stay includes evening high tea, unlimited local Maharashtrian dinner, campfire, acoustic music, and breakfast.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-xl bg-sage/30 text-forest flex items-center justify-center font-bold flex-shrink-0">
                3
              </div>
              <div>
                <h4 className="font-semibold text-forest-deep text-base">Hassle-Free Instant Booking</h4>
                <p className="text-xs text-forest-deep/70">
                  Instant confirmation vouchers via WhatsApp and email with instant 100% cancellation support up to 48 hours before check-in.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Counter */}
      <div className="bg-white rounded-2xl border border-mist p-8 md:p-12 shadow-sm">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <span className="font-display text-4xl md:text-5xl font-semibold text-forest">25+</span>
            <p className="text-xs font-semibold uppercase tracking-wider text-forest-deep/70 mt-2">
              Curated Campsites
            </p>
          </div>

          <div>
            <span className="font-display text-4xl md:text-5xl font-semibold text-forest">12,500+</span>
            <p className="text-xs font-semibold uppercase tracking-wider text-forest-deep/70 mt-2">
              Happy Guests
            </p>
          </div>

          <div>
            <span className="font-display text-4xl md:text-5xl font-semibold text-forest">4.9 ★</span>
            <p className="text-xs font-semibold uppercase tracking-wider text-forest-deep/70 mt-2">
              Average Rating
            </p>
          </div>

          <div>
            <span className="font-display text-4xl md:text-5xl font-semibold text-forest">100%</span>
            <p className="text-xs font-semibold uppercase tracking-wider text-forest-deep/70 mt-2">
              Clean Water &amp; Food
            </p>
          </div>
        </div>
      </div>

      {/* CTA Box */}
      <div className="bg-forest-deep text-paper rounded-2xl p-10 text-center space-y-6">
        <h2 className="font-display text-3xl md:text-4xl font-semibold text-sage">
          Ready for Your Pawna Lake Escape?
        </h2>
        <p className="text-sm text-paper/80 max-w-xl mx-auto">
          Book your lakeside glamping dome or tent today and enjoy bonfire nights with live music under the stars.
        </p>
        <Link href="/properties" className="inline-block">
          <Button variant="primary" size="lg">
            Explore All Campsites
          </Button>
        </Link>
      </div>
    </div>
  );
}
