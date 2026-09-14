'use client';

import React from 'react';
import Link from 'next/link';
import { HeroSection } from '@/components/sections/HeroSection';
import { PropertyGrid } from '@/components/sections/PropertyGrid';
import { TestimonialSection } from '@/components/sections/TestimonialSection';
import { MOCK_PROPERTIES } from '@/lib/mock-data/properties';
import { MOCK_EXPERIENCES } from '@/lib/mock-data/experiences';
import { MOCK_TESTIMONIALS } from '@/lib/mock-data/testimonials';
import { MOCK_FAQS } from '@/lib/mock-data/faqs';
import { Accordion } from '@/components/ui/Accordion';
import { Badge } from '@/components/ui/Badge';
import { ExperienceCard } from '@/components/sections/ExperienceCard';

export default function HomePage() {
  const featuredProperties = MOCK_PROPERTIES.filter((p) => p.isFeatured);

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <HeroSection />

      {/* Feature Highlights Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="bg-white rounded-2xl p-6 border border-cream-dark shadow-sm hover:border-terracotta/30 transition">
            <div className="w-12 h-12 rounded-xl bg-terracotta/10 text-terracotta mx-auto flex items-center justify-center mb-3">
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="font-display font-semibold text-terracotta-deep text-lg">Direct Lakefront</h3>
            <p className="text-xs text-terracotta-deep/70 mt-1">Right on the water edge of Pawna Dam</p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-cream-dark shadow-sm hover:border-terracotta/30 transition">
            <div className="w-12 h-12 rounded-xl bg-amber-warm/10 text-amber-warm mx-auto flex items-center justify-center mb-3">
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
              </svg>
            </div>
            <h3 className="font-display font-semibold text-terracotta-deep text-lg">Bonfire &amp; BBQ</h3>
            <p className="text-xs text-terracotta-deep/70 mt-1">Unlimited meals &amp; evening grilled snacks</p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-cream-dark shadow-sm hover:border-terracotta/30 transition">
            <div className="w-12 h-12 rounded-xl bg-terracotta/10 text-terracotta mx-auto flex items-center justify-center mb-3">
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
              </svg>
            </div>
            <h3 className="font-display font-semibold text-terracotta-deep text-lg">Live Music</h3>
            <p className="text-xs text-terracotta-deep/70 mt-1">Acoustic guitar nights under the stars</p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-cream-dark shadow-sm hover:border-terracotta/30 transition">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 mx-auto flex items-center justify-center mb-3">
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="font-display font-semibold text-terracotta-deep text-lg">24/7 Safety</h3>
            <p className="text-xs text-terracotta-deep/70 mt-1">Fully secured &amp; couple friendly</p>
          </div>
        </div>
      </section>

      {/* Featured Stays */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <Badge variant="terracotta" size="sm">
              Handpicked Campsites
            </Badge>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-terracotta-deep mt-2">
              Featured Stays at Pawna Lake
            </h2>
            <p className="text-sm text-terracotta-deep/70 mt-1">
              Choose from luxury AC dome tents, pine cottages, and waterfront camping canvas.
            </p>
          </div>
          <Link
            href="/properties"
            className="text-sm font-semibold text-terracotta hover:text-terracotta-dark flex items-center gap-1 group"
          >
            Explore all 25+ stays
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>

        <PropertyGrid properties={featuredProperties} />
      </section>

      {/* Popular Experiences Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <Badge variant="amber" size="sm">
            Unforgettable Memories
          </Badge>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-terracotta-deep mt-2">
            Top Lake Activities
          </h2>
          <p className="text-sm text-terracotta-deep/70 mt-1">
            Elevate your campsite weekend with curated water sports and night events.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MOCK_EXPERIENCES.slice(0, 3).map((exp) => (
            <ExperienceCard key={exp.id} experience={exp} />
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialSection testimonials={MOCK_TESTIMONIALS} />

      {/* FAQ Preview */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl font-bold text-terracotta-deep">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-terracotta-deep/70 mt-1">
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
          <Link href="/faq" className="text-sm font-semibold text-terracotta hover:underline">
            View all questions &amp; policies →
          </Link>
        </div>
      </section>
    </div>
  );
}
