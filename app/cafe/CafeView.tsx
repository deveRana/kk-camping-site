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
    imageUrl: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=500&q=80'
  },
  {
    id: '2',
    name: 'Filter Coffee',
    category: 'Breakfast',
    price: 40,
    description: 'South Indian style filter coffee',
    isVeg: true,
    imageUrl: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500&q=80'
  },
  {
    id: '3',
    name: 'Poha',
    category: 'Breakfast',
    price: 80,
    description: 'Maharashtrian style flattened rice',
    isVeg: true,
    imageUrl: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=500&q=80'
  },
  {
    id: '4',
    name: 'Masala Omelette',
    category: 'Breakfast',
    price: 60,
    description: 'Two eggs with onions, tomatoes & spices',
    isVeg: false,
    imageUrl: 'https://images.unsplash.com/photo-1608039829572-78524f79c4c7?w=500&q=80'
  },
  {
    id: '5',
    name: 'Aloo Paratha',
    category: 'Breakfast',
    price: 100,
    description: 'Stuffed potato flatbread with curd & pickle',
    isVeg: true,
    imageUrl: 'https://images.unsplash.com/photo-1626776876729-bab4369a5a5a?w=500&q=80'
  },
  {
    id: '6',
    name: 'French Toast',
    category: 'Breakfast',
    price: 120,
    description: 'Classic breakfast with maple syrup',
    isVeg: true,
    imageUrl: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=500&q=80'
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
    imageUrl: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=500&q=80'
  },
  {
    id: '8',
    name: 'Dal Tadka',
    category: 'Lunch',
    price: 150,
    description: 'Yellow lentils tempered with spices',
    isVeg: true,
    imageUrl: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500&q=80'
  },
  {
    id: '9',
    name: 'Chicken Curry',
    category: 'Lunch',
    price: 280,
    description: 'Home-style chicken curry',
    isVeg: false,
    isSpecial: true,
    imageUrl: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=500&q=80'
  },
  {
    id: '10',
    name: 'Veg Biryani',
    category: 'Lunch',
    price: 200,
    description: 'Aromatic rice with mixed vegetables',
    isVeg: true,
    imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500&q=80'
  },
  {
    id: '11',
    name: 'Chicken Biryani',
    category: 'Lunch',
    price: 280,
    description: 'Hyderabadi style chicken biryani',
    isVeg: false,
    imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500&q=80'
  },
  {
    id: '12',
    name: 'Jeera Rice',
    category: 'Lunch',
    price: 100,
    description: 'Cumin flavored basmati rice',
    isVeg: true,
    imageUrl: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=500&q=80'
  },

  // Snacks
  {
    id: '13',
    name: 'Veg Pakora',
    category: 'Snacks',
    price: 100,
    description: 'Mixed vegetable fritters',
    isVeg: true,
    imageUrl: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500&q=80'
  },
  {
    id: '14',
    name: 'Corn Bhel',
    category: 'Snacks',
    price: 80,
    description: 'Sweet corn chaat',
    isVeg: true,
    imageUrl: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=500&q=80'
  },
  {
    id: '15',
    name: 'Maggi',
    category: 'Snacks',
    price: 60,
    description: 'Classic instant noodles',
    isVeg: true,
    imageUrl: 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=500&q=80'
  },
  {
    id: '16',
    name: 'Cheese Sandwich',
    category: 'Snacks',
    price: 100,
    description: 'Grilled cheese sandwich',
    isVeg: true,
    imageUrl: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=500&q=80'
  },
  {
    id: '17',
    name: 'Vada Pav',
    category: 'Snacks',
    price: 40,
    description: 'Mumbai street food special',
    isVeg: true,
    imageUrl: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=500&q=80'
  },

  // Beverages
  {
    id: '18',
    name: 'Cold Coffee',
    category: 'Beverages',
    price: 80,
    description: 'Chilled coffee with ice cream',
    isVeg: true,
    imageUrl: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=500&q=80'
  },
  {
    id: '19',
    name: 'Fresh Lime Soda',
    category: 'Beverages',
    price: 50,
    description: 'Sweet/salt/plain',
    isVeg: true,
    imageUrl: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=500&q=80'
  },
  {
    id: '20',
    name: 'Mango Shake',
    category: 'Beverages',
    price: 100,
    description: 'Thick and creamy',
    isVeg: true,
    isSpecial: true,
    imageUrl: 'https://images.unsplash.com/photo-1577805947697-89e18249d767?w=500&q=80'
  },
  {
    id: '21',
    name: 'Masala Buttermilk',
    category: 'Beverages',
    price: 40,
    description: 'Spiced yogurt drink',
    isVeg: true,
    imageUrl: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=500&q=80'
  },
  {
    id: '22',
    name: 'Fresh Coconut Water',
    category: 'Beverages',
    price: 60,
    description: 'Natural and refreshing',
    isVeg: true,
    imageUrl: 'https://images.unsplash.com/photo-1585681805461-27c70606042f?w=500&q=80'
  },

  // Desserts
  {
    id: '23',
    name: 'Gulab Jamun',
    category: 'Desserts',
    price: 60,
    description: '2 pieces - milk solid dumplings in sugar syrup',
    isVeg: true,
    imageUrl: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=500&q=80'
  },
  {
    id: '24',
    name: 'Ice Cream',
    category: 'Desserts',
    price: 80,
    description: 'Vanilla/Chocolate/Strawberry',
    isVeg: true,
    imageUrl: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=500&q=80'
  },
];

export function CafeView({ menuItems = fallbackMenuItems }: { menuItems?: CafeMenuItem[] }) {
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory>('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const categories: MenuCategory[] = ['All', 'Breakfast', 'Lunch', 'Snacks', 'Dinner', 'Beverages', 'Desserts'];

  const filteredMenu = selectedCategory === 'All'
    ? menuItems
    : menuItems.filter(item => {
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
            {menuItems
              .filter((item) => item.isSpecial)
              .slice(0, 3)
              .map((item) => (
                <div
                  key={item.id}
                  className="group bg-white rounded-3xl overflow-hidden border-2 border-amber-200 hover:border-amber-400 shadow-lg hover:shadow-2xl transition-all duration-300"
                >
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
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
                    <div className="absolute top-4 right-4">
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
                <div className={`relative overflow-hidden bg-mist ${
                  viewMode === 'grid' ? 'h-48' : 'w-48 h-48 flex-shrink-0'
                }`}>
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-forest-deep/30">
                      <span className="text-5xl">🍽️</span>
                    </div>
                  )}
                  {/* Badges Overlay */}
                  <div className="absolute top-3 left-3 right-3 flex items-start justify-between">
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
                    <button className="text-xs font-semibold text-forest hover:text-forest-dark transition flex items-center gap-1 group-hover:gap-2">
                      Order Now
                      <span className="transition-all">→</span>
                    </button>
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
