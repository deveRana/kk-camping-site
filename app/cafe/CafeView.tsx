'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Badge } from '@/components/ui/Badge';
import type { CafeMenuItem } from '@/types';

type MenuCategory = string;

export function CafeView({ menuItems }: { menuItems?: CafeMenuItem[] }) {
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory>('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Menu comes from Sanity (see scripts/import-lakeora-menu.js)
  let items = menuItems ?? [];

  // Deduplicate items by ID (in case of any caching issues)
  const seenIds = new Set<string>();
  items = items.filter(item => {
    if (seenIds.has(item.id)) {
      return false;
    }
    seenIds.add(item.id);
    return true;
  });

  // Category pills follow the order of the menu card
  const categories: MenuCategory[] = ['All', ...Array.from(new Set(items.map(item => item.category)))];

  const filteredMenu = selectedCategory === 'All'
    ? items
    : items.filter(item => item.category === selectedCategory);

  return (
    <div className="min-h-screen bg-paper">
      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/swiss-tent/swiss-tent-1.jpg"
            alt="Lakeora Cafe"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-forest-deep/70 to-forest-deep/90" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto text-white">
          <div className="inline-flex items-center gap-2 bg-sage/90 text-forest-deep px-6 py-2 rounded-full text-sm font-semibold mb-4">
            ☕ Open Daily 8 AM - 10 PM
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-semibold mb-4">
            Lakeora <span className="italic text-sage">Cafe</span>
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            Fresh coffee, delicious food, and stunning lake views. Dine-in or takeaway available.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumbs items={[{ label: 'Cafe' }]} />

        {/* Cafe Features */}
        <section className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: '☕', title: 'Fresh Coffee', desc: 'Brewed daily' },
            { icon: '🍽️', title: 'All Day Dining', desc: 'Breakfast to dinner' },
            { icon: '🌊', title: 'Lake View Seating', desc: 'Indoor & outdoor' },
            { icon: '🚀', title: 'Quick Service', desc: 'Fast & friendly' },
          ].map((feature) => (
            <div key={feature.title} className="bg-white rounded-2xl p-6 text-center border border-mist hover:shadow-lg transition">
              <div className="text-4xl mb-3">{feature.icon}</div>
              <h3 className="font-display text-lg font-semibold text-forest-deep">{feature.title}</h3>
              <p className="text-sm text-forest-deep/70 mt-1">{feature.desc}</p>
            </div>
          ))}
        </section>

        {/* Menu Section */}
        <section className="mt-8">
          <div className="text-center mb-10">
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-forest-deep mb-3">
              Full Menu
            </h2>
            <p className="text-forest-deep/70">
              Authentic local flavors with a lakeside twist
            </p>
          </div>

          {/* Category Filter & View Toggle */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-6 py-2.5 rounded-full text-sm font-semibold transition ${
                    selectedCategory === cat
                      ? 'bg-forest text-white shadow-lg'
                      : 'bg-white text-forest-deep border border-mist hover:border-forest/30'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-2 bg-white rounded-full p-1.5 border border-mist shadow-sm">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-full transition ${
                  viewMode === 'grid'
                    ? 'bg-forest text-white'
                    : 'text-forest-deep/60 hover:text-forest-deep'
                }`}
                aria-label="Grid view"
              >
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <rect x="3" y="3" width="7" height="7" rx="1" />
                  <rect x="14" y="3" width="7" height="7" rx="1" />
                  <rect x="3" y="14" width="7" height="7" rx="1" />
                  <rect x="14" y="14" width="7" height="7" rx="1" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-full transition ${
                  viewMode === 'list'
                    ? 'bg-forest text-white'
                    : 'text-forest-deep/60 hover:text-forest-deep'
                }`}
                aria-label="List view"
              >
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <line x1="8" y1="6" x2="21" y2="6" />
                  <line x1="8" y1="12" x2="21" y2="12" />
                  <line x1="8" y1="18" x2="21" y2="18" />
                  <line x1="3" y1="6" x2="3.01" y2="6" />
                  <line x1="3" y1="12" x2="3.01" y2="12" />
                  <line x1="3" y1="18" x2="3.01" y2="18" />
                </svg>
              </button>
            </div>
          </div>

          {/* Menu Items Grid/List */}
          <div className={viewMode === 'grid' ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
            {filteredMenu.map((item) => (
              <div
                key={item.id}
                className={`bg-white rounded-2xl border border-mist overflow-hidden hover:shadow-2xl transition-all duration-300 group ${
                  viewMode === 'list' ? 'flex flex-row' : ''
                }`}
              >
                {/* Image */}
                <div className={`relative overflow-hidden bg-gradient-to-br from-amber-50 to-orange-50 ${
                  viewMode === 'grid' ? 'h-48' : 'w-48 h-48 flex-shrink-0'
                }`}>
                  {item.imageUrl && (
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 absolute inset-0"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                  )}
                  {!item.imageUrl && (
                    <div className="w-full h-full flex flex-col items-center justify-center absolute inset-0">
                      <span className="text-6xl mb-2">🍽️</span>
                      <span className="text-xs text-forest-deep/50 font-medium px-2 text-center">{item.name}</span>
                    </div>
                  )}
                  {/* Badges Overlay */}
                  <div className="absolute top-3 left-3 right-3 flex items-start justify-between z-10">
                    <div className="flex gap-2">
                      {item.isSpecial && (
                        <span className="bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg backdrop-blur">
                          ⭐ Special
                        </span>
                      )}
                    </div>
                    <div className={`w-8 h-8 rounded-lg border-2 flex items-center justify-center backdrop-blur bg-white/90 shadow ${
                      item.isVeg
                        ? 'border-green-600'
                        : 'border-red-600'
                    }`}>
                      <div className={`w-4 h-4 rounded-full ${
                        item.isVeg ? 'bg-green-600' : 'bg-red-600'
                      }`} />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className={viewMode === 'grid' ? 'p-5' : 'p-5 flex-1 flex flex-col justify-between'}>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="font-display text-xl font-semibold text-forest-deep flex-1 leading-tight">
                      {item.name}
                    </h3>
                    <div className="text-2xl font-display font-bold text-forest whitespace-nowrap">
                      ₹{item.price}
                    </div>
                  </div>

                  <p className="text-sm text-forest-deep/70 leading-relaxed mb-3">
                    {item.description}
                  </p>

                  <div className="flex items-center justify-between pt-3 border-t border-mist">
                    <Badge variant="paper" size="sm">
                      {item.category}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="mt-16 bg-gradient-to-br from-forest to-forest-dark text-white rounded-3xl p-12 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-semibold mb-4">
            Visit us for a meal with a view
          </h2>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            Whether you&apos;re staying with us or just passing by, our cafe is open to all.
            Perfect spot for breakfast, lunch, or evening tea by the lake.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/properties"
              className="bg-sage hover:bg-white text-forest-deep font-semibold px-8 py-4 rounded-full shadow-xl transition active:scale-95"
            >
              Book a Stay + Meals
            </Link>
            <Link
              href="/contact"
              className="border border-white/50 hover:bg-white/10 text-white font-semibold px-8 py-4 rounded-full transition"
            >
              Get Directions
            </Link>
          </div>
        </section>

        {/* Info Section */}
        <section className="mt-16 grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-mist">
            <h3 className="font-display text-xl font-semibold text-forest-deep mb-3 flex items-center gap-2">
              <span>🕐</span> Timings
            </h3>
            <p className="text-forest-deep/80 leading-relaxed">
              <strong>Breakfast:</strong> 8:00 AM - 11:00 AM<br />
              <strong>Lunch:</strong> 12:00 PM - 3:00 PM<br />
              <strong>Snacks:</strong> 3:00 PM - 6:00 PM<br />
              <strong>Dinner:</strong> 7:00 PM - 10:00 PM
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-mist">
            <h3 className="font-display text-xl font-semibold text-forest-deep mb-3 flex items-center gap-2">
              <span>💳</span> Payment
            </h3>
            <p className="text-forest-deep/80 leading-relaxed">
              We accept cash, UPI, cards, and all major digital wallets.
              Special discounts available for our camping guests.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-mist">
            <h3 className="font-display text-xl font-semibold text-forest-deep mb-3 flex items-center gap-2">
              <span>📍</span> Location
            </h3>
            <p className="text-forest-deep/80 leading-relaxed">
              Right by the waterfront at Lakeora resort, Pawna Lake.
              Easy parking available. Open to both guests and visitors.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
