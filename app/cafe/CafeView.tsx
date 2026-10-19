'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Badge } from '@/components/ui/Badge';
import type { CafeMenuItem } from '@/types';

type MenuCategory = 'All' | 'Breakfast' | 'Lunch' | 'Snacks' | 'Dinner' | 'Beverages' | 'Desserts';

// Fallback menu items if Sanity data is not available
const fallbackMenuItems: CafeMenuItem[] = [
  // Breakfast
  {
    id: '1',
    name: 'Classic Masala Chai',
    category: 'Breakfast',
    price: 30,
    description: 'Traditional Indian spiced tea',
    isVeg: true,
    isSpecial: true,
    imageUrl: '/cafe-images/chai.svg'
  },
  {
    id: '2',
    name: 'Filter Coffee',
    category: 'Breakfast',
    price: 40,
    description: 'South Indian style filter coffee',
    isVeg: true,
    imageUrl: '/cafe-images/coffee.svg'
  },
  {
    id: '3',
    name: 'Poha',
    category: 'Breakfast',
    price: 80,
    description: 'Maharashtrian style flattened rice',
    isVeg: true,
    imageUrl: '/cafe-images/poha.svg'
  },
  {
    id: '4',
    name: 'Masala Omelette',
    category: 'Breakfast',
    price: 60,
    description: 'Two eggs with onions, tomatoes & spices',
    isVeg: false,
    imageUrl: '/cafe-images/omelette.svg'
  },
  {
    id: '5',
    name: 'Aloo Paratha',
    category: 'Breakfast',
    price: 100,
    description: 'Stuffed potato flatbread with curd & pickle',
    isVeg: true,
    imageUrl: '/cafe-images/paratha.svg'
  },
  {
    id: '6',
    name: 'French Toast',
    category: 'Breakfast',
    price: 120,
    description: 'Classic breakfast with maple syrup',
    isVeg: true,
    imageUrl: '/cafe-images/toast.svg'
  },

  // Lunch & Dinner
  {
    id: '7',
    name: 'Paneer Butter Masala',
    category: 'Lunch',
    price: 220,
    description: 'Cottage cheese in rich tomato gravy',
    isVeg: true,
    isSpecial: true,
    imageUrl: '/cafe-images/paneer-masala.svg'
  },
  {
    id: '8',
    name: 'Dal Tadka',
    category: 'Lunch',
    price: 150,
    description: 'Yellow lentils tempered with spices',
    isVeg: true,
    imageUrl: '/cafe-images/dal.svg'
  },
  {
    id: '9',
    name: 'Chicken Curry',
    category: 'Lunch',
    price: 280,
    description: 'Home-style chicken curry',
    isVeg: false,
    isSpecial: true,
    imageUrl: '/cafe-images/chicken-curry.svg'
  },
  {
    id: '10',
    name: 'Veg Biryani',
    category: 'Lunch',
    price: 200,
    description: 'Aromatic rice with mixed vegetables',
    isVeg: true,
    imageUrl: '/cafe-images/veg-biryani.svg'
  },
  {
    id: '11',
    name: 'Chicken Biryani',
    category: 'Lunch',
    price: 280,
    description: 'Hyderabadi style chicken biryani',
    isVeg: false,
    imageUrl: '/cafe-images/chicken-biryani.svg'
  },
  {
    id: '12',
    name: 'Jeera Rice',
    category: 'Lunch',
    price: 100,
    description: 'Cumin flavored basmati rice',
    isVeg: true,
    imageUrl: '/cafe-images/rice.svg'
  },

  // Snacks
  {
    id: '13',
    name: 'Veg Pakora',
    category: 'Snacks',
    price: 100,
    description: 'Mixed vegetable fritters',
    isVeg: true,
    imageUrl: '/cafe-images/pakora.svg'
  },
  {
    id: '14',
    name: 'Corn Bhel',
    category: 'Snacks',
    price: 80,
    description: 'Sweet corn chaat',
    isVeg: true,
    imageUrl: '/cafe-images/bhel.svg'
  },
  {
    id: '15',
    name: 'Maggi',
    category: 'Snacks',
    price: 60,
    description: 'Classic instant noodles',
    isVeg: true,
    imageUrl: '/cafe-images/maggi.svg'
  },
  {
    id: '16',
    name: 'Cheese Sandwich',
    category: 'Snacks',
    price: 100,
    description: 'Grilled cheese sandwich',
    isVeg: true,
    imageUrl: '/cafe-images/sandwich.svg'
  },
  {
    id: '17',
    name: 'Vada Pav',
    category: 'Snacks',
    price: 40,
    description: 'Mumbai street food special',
    isVeg: true,
    imageUrl: '/cafe-images/vada-pav.svg'
  },

  // Beverages
  {
    id: '18',
    name: 'Cold Coffee',
    category: 'Beverages',
    price: 80,
    description: 'Chilled coffee with ice cream',
    isVeg: true,
    imageUrl: '/cafe-images/cold-coffee.svg'
  },
  {
    id: '19',
    name: 'Fresh Lime Soda',
    category: 'Beverages',
    price: 50,
    description: 'Sweet/salt/plain',
    isVeg: true,
    imageUrl: '/cafe-images/lime-soda.svg'
  },
  {
    id: '20',
    name: 'Mango Shake',
    category: 'Beverages',
    price: 100,
    description: 'Thick and creamy',
    isVeg: true,
    isSpecial: true,
    imageUrl: '/cafe-images/mango-shake.svg'
  },
  {
    id: '21',
    name: 'Masala Buttermilk',
    category: 'Beverages',
    price: 40,
    description: 'Spiced yogurt drink',
    isVeg: true,
    imageUrl: '/cafe-images/buttermilk.svg'
  },
  {
    id: '22',
    name: 'Fresh Coconut Water',
    category: 'Beverages',
    price: 60,
    description: 'Natural and refreshing',
    isVeg: true,
    imageUrl: '/cafe-images/coconut.svg'
  },

  // Desserts
  {
    id: '23',
    name: 'Gulab Jamun',
    category: 'Desserts',
    price: 60,
    description: '2 pieces - milk solid dumplings in sugar syrup',
    isVeg: true,
    imageUrl: '/cafe-images/gulab-jamun.svg'
  },
  {
    id: '24',
    name: 'Ice Cream',
    category: 'Desserts',
    price: 80,
    description: 'Vanilla/Chocolate/Strawberry',
    isVeg: true,
    imageUrl: '/cafe-images/ice-cream.svg'
  },
];

export function CafeView({ menuItems }: { menuItems?: CafeMenuItem[] }) {
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory>('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const categories: MenuCategory[] = ['All', 'Breakfast', 'Lunch', 'Snacks', 'Dinner', 'Beverages', 'Desserts'];

  // Use fallback if no menu items from Sanity
  let items = menuItems && menuItems.length > 0 ? menuItems : fallbackMenuItems;

  // Deduplicate items by ID (in case of any caching issues)
  const seenIds = new Set<string>();
  items = items.filter(item => {
    if (seenIds.has(item.id)) {
      return false;
    }
    seenIds.add(item.id);
    return true;
  });

  const filteredMenu = selectedCategory === 'All'
    ? items
    : items.filter(item => {
        if (selectedCategory === 'Lunch' || selectedCategory === 'Dinner') {
          return item.category === 'Lunch';
        }
        return item.category === selectedCategory;
      });

  return (
    <div className="min-h-screen bg-paper">
      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/swiss-tent/swiss-tent-1.svg"
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

        {/* Featured Dishes Section */}
        <section className="mt-16">
          <div className="text-center mb-8">
            <Badge variant="amber" className="mb-3">
              Chef&apos;s Recommendations
            </Badge>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-forest-deep">
              Must-Try Specials
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {items
              .filter((item) => item.isSpecial)
              .slice(0, 3)
              .map((item) => (
                <div
                  key={item.id}
                  className="group bg-white rounded-3xl overflow-hidden border-2 border-amber-200 hover:border-amber-400 shadow-lg hover:shadow-2xl transition-all duration-300"
                >
                  <div className="relative h-56 overflow-hidden bg-gradient-to-br from-amber-50 to-orange-50">
                    {item.imageUrl ? (
                      <>
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 absolute inset-0"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            const placeholder = target.parentElement?.querySelector('.image-placeholder') as HTMLElement;
                            if (placeholder) placeholder.style.display = 'flex';
                          }}
                        />
                        <div
                          className="image-placeholder absolute inset-0 flex flex-col items-center justify-center"
                          style={{ display: 'none' }}
                        >
                          <span className="text-7xl mb-3">🍽️</span>
                          <span className="text-lg text-forest-deep/70 font-semibold px-4 text-center">{item.name}</span>
                        </div>
                      </>
                    ) : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-7xl mb-3">🍽️</span>
                        <span className="text-lg text-forest-deep/70 font-semibold px-4 text-center">{item.name}</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none z-10" />
                    <div className="absolute bottom-4 left-4 right-4 z-20">
                      <h3 className="font-display text-2xl font-bold text-white mb-1">
                        {item.name}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className="text-3xl font-display font-bold text-amber-300">
                          ₹{item.price}
                        </span>
                        <span className="text-white/80 text-sm">· {item.category}</span>
                      </div>
                    </div>
                    <div className="absolute top-4 right-4 z-20">
                      <span className="bg-amber-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-xl">
                        ⭐ Special
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="text-sm text-forest-deep/80 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
          </div>
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
