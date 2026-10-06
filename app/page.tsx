'use client';

import React from 'react';
import Link from 'next/link';
import { HeroSection } from '@/components/sections/HeroSection';
import { PropertyGrid } from '@/components/sections/PropertyGrid';
import { TestimonialSection } from '@/components/sections/TestimonialSection';
import { MOCK_PROPERTIES } from '@/lib/mock-data/properties';
import { MOCK_TESTIMONIALS } from '@/lib/mock-data/testimonials';
import { MOCK_FAQS } from '@/lib/mock-data/faqs';
import { Accordion } from '@/components/ui/Accordion';
import { Badge } from '@/components/ui/Badge';

export default function HomePage() {
  const featuredProperties = MOCK_PROPERTIES.filter((p) => p.isFeatured);

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <HeroSection />

      {/* Feature Highlights Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="bg-white rounded-2xl p-6 border border-mist shadow-sm hover:border-forest/30 transition">
            <div className="w-12 h-12 rounded-xl bg-forest/10 text-forest mx-auto flex items-center justify-center mb-3">
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="font-display font-semibold text-forest-deep text-lg">Direct Lakefront</h3>
            <p className="text-xs text-forest-deep/70 mt-1">Right on the water edge of Pawna Dam</p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-mist shadow-sm hover:border-forest/30 transition">
            <div className="w-12 h-12 rounded-xl bg-sage/30 text-forest mx-auto flex items-center justify-center mb-3">
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
              </svg>
            </div>
            <h3 className="font-display font-semibold text-forest-deep text-lg">Bonfire &amp; BBQ</h3>
            <p className="text-xs text-forest-deep/70 mt-1">Unlimited meals &amp; evening grilled snacks</p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-mist shadow-sm hover:border-forest/30 transition">
            <div className="w-12 h-12 rounded-xl bg-forest/10 text-forest mx-auto flex items-center justify-center mb-3">
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
              </svg>
            </div>
            <h3 className="font-display font-semibold text-forest-deep text-lg">Live Music</h3>
            <p className="text-xs text-forest-deep/70 mt-1">Acoustic guitar nights under the stars</p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-mist shadow-sm hover:border-forest/30 transition">
            <div className="w-12 h-12 rounded-xl bg-sage/30 text-forest mx-auto flex items-center justify-center mb-3">
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="font-display font-semibold text-forest-deep text-lg">24/7 Safety</h3>
            <p className="text-xs text-forest-deep/70 mt-1">Fully secured &amp; couple friendly</p>
          </div>
        </div>
      </section>

      {/* Featured Stays */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <Badge variant="forest" size="sm">
              Handpicked Campsites
            </Badge>
            <h2 className="font-display text-4xl md:text-5xl font-medium text-forest-deep mt-2">
              Featured Stays at Pawna Lake
            </h2>
            <p className="text-sm text-forest-deep/70 mt-1">
              Choose from luxury AC dome tents, pine cottages, and waterfront camping canvas.
            </p>
          </div>
          <Link
            href="/properties"
            className="text-sm font-semibold text-forest hover:text-forest-dark flex items-center gap-1 group"
          >
            Explore all 25+ stays
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>

        <PropertyGrid properties={featuredProperties} />
      </section>



      {/* Experience: arch panes */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="eyebrow text-forest mb-3">The Lakeora way</p>
          <h2 className="font-display text-4xl md:text-5xl font-medium text-forest-deep">
            Four moments. One unforgettable stay.
          </h2>
          <div className="window-divider mt-6 mx-auto w-40" />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { t: 'Sunrise', d: 'Golden light spilling across the lake, right from your tent.', i: 'M12 3v2m0 14v2M5.6 5.6l1.4 1.4m10 10 1.4 1.4M3 12h2m14 0h2M5.6 18.4 7 17m10-10 1.4-1.4M8 12a4 4 0 1 1 8 0' },
            { t: 'Birdsong', d: 'Wake to the calls of kingfishers and bulbuls over still water.', i: 'M4 15c3 0 4-2 5-4s3-4 6-3l3-2-1 4c0 5-4 9-9 9-3 0-4-2-4-4Z' },
            { t: 'Coffee', d: 'Freshly brewed cups and a slow breakfast by the water.', i: 'M5 9h11v5a5 5 0 0 1-5 5H10a5 5 0 0 1-5-5V9Zm11 1h2a2 2 0 0 1 0 5h-2M8 3c0 2 2 2 2 4M12 3c0 2 2 2 2 4' },
            { t: 'Feast', d: 'Unlimited veg & non-veg dinner, BBQ and campfire music.', i: 'M7 3v8m-2-8v5a2 2 0 0 0 4 0V3M7 11v10m8-18c-2 2-2 6 0 8v10' },
          ].map((m) => (
            <div key={m.t} className="group bg-white border border-mist arch-lg px-6 pt-12 pb-8 text-center shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="mx-auto w-16 h-16 rounded-full bg-sage/30 text-forest flex items-center justify-center mb-5 group-hover:bg-forest group-hover:text-sage transition">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d={m.i} /></svg>
              </div>
              <h3 className="font-display text-2xl font-semibold text-forest-deep">{m.t}</h3>
              <p className="text-sm text-forest-deep/70 mt-2 leading-relaxed">{m.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialSection testimonials={MOCK_TESTIMONIALS} />


      {/* Registration CTA */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-forest text-white px-6 py-16 md:py-20 text-center shadow-2xl">
          <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-sage/10" />
          <div className="absolute -bottom-32 -left-20 w-96 h-96 rounded-full bg-sage/10" />
          <div className="relative">
            <p className="eyebrow text-sage mb-4">Weekends fill up fast</p>
            <h2 className="font-display text-4xl md:text-6xl font-medium mb-4">
              Your lakeside escape is <span className="italic text-sage">one tap away</span>
            </h2>
            <p className="text-white/85 max-w-xl mx-auto mb-8">
              Pick your dates, choose your tent or cottage and secure it with just 50% advance.
              Instant confirmation, zero hassle.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/properties" className="bg-sage hover:bg-white text-forest-deep font-semibold px-9 py-4 rounded-full shadow-xl transition active:scale-95">
                Book Your Stay Now
              </Link>
              <Link href="/contact" className="border border-white/50 hover:bg-white/10 text-white px-9 py-4 rounded-full transition">
                Talk to Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl font-semibold text-forest-deep">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-forest-deep/70 mt-1">
            Have questions before booking your Pawna Lake stay?
          </p>
        </div>

        <div className="space-y-4">
          {MOCK_FAQS.slice(0, 4).map((faq) => (
            <Accordion key={faq.id} title={faq.question}>
              {faq.answer}
            </Accordion>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link href="/faq" className="text-sm font-semibold text-forest hover:underline">
            View all questions &amp; policies →
          </Link>
        </div>
      </section>
    </div>
  );
}
