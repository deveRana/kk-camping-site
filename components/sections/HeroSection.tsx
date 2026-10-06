'use client';

import React from 'react';
import Link from 'next/link';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-[680px] md:h-screen max-h-[940px] flex items-center justify-center pt-28 pb-24 overflow-visible z-20">
      <div className="absolute inset-0 overflow-hidden z-0">
        <img
          src="/swiss-tent/swiss-tent-1.jpg"
          alt="Lakeside stay at Lakeora, Pawna Lake"
          className="w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-forest-deep/55 via-forest-deep/55 to-forest-deep/95" />
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto text-white">
        <p className="eyebrow text-sage mb-5 reveal">Lakeora · Pawna Lake · Lonavala</p>
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-medium leading-[1.02] mb-6 text-shadow-soft reveal-2">
          Sunrise on the water.<br />
          <span className="italic text-sage">Coffee, campfire &amp; calm.</span>
        </h1>
        <p className="text-base md:text-xl text-white/90 mb-8 max-w-2xl mx-auto font-light leading-relaxed reveal-3">
          A lakeside retreat where mornings smell of fresh coffee, evenings glow with bonfire music,
          and the only alarm is birdsong. Just 2 hours from Pune &amp; Mumbai.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 reveal-3">
          <Link
            href="/properties"
            className="bg-sage hover:bg-white text-forest-deep font-semibold px-8 py-3.5 rounded-full shadow-xl transition active:scale-95"
          >
            Reserve Your Stay
          </Link>
          <Link
            href="/gallery"
            className="border border-white/60 hover:bg-white/10 text-white font-medium px-8 py-3.5 rounded-full backdrop-blur transition"
          >
            See the Lake
          </Link>
        </div>
      </div>
    </section>
  );
};
