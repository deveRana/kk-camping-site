'use client';

import React from 'react';
import { BookingWidget } from './BookingWidget';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-[620px] md:h-screen max-h-[900px] flex items-center justify-center pt-24 pb-20 overflow-visible z-20">
      {/* Background Hero Image (overflow-hidden scoped to image wrapper) */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <img
          src="https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=1920&q=80"
          alt="Lakeside camping tent at sunset"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-terracotta-deep/30 via-terracotta-deep/60 to-terracotta-deep/90" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto text-white">
        <p className="text-amber-light font-semibold tracking-widest uppercase text-xs md:text-sm mb-4">
          Pawna Lake · Lonavala
        </p>
        <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
          Bonfires. Sunsets.<br />
          <span className="italic text-amber-warm">Unforgettable nights.</span>
        </h1>
        <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
          Wake up to lake views. Roast marshmallows under the stars.
          Escape city life — just 2 hours from Pune &amp; Mumbai.
        </p>

        {/* Search Widget */}
        <BookingWidget className="max-w-3xl mx-auto relative z-30" />
      </div>
    </section>
  );
};
