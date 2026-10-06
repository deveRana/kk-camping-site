'use client';

import React, { useState } from 'react';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { MOCK_GALLERY } from '@/lib/mock-data/gallery';
import { useModal } from '@/components/modal/useModal';
import { LightboxModalContent } from '@/components/sections/LightboxModalContent';

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const { openModal } = useModal();

  const categories = ['All', 'Campsites', 'Sunsets', 'Activities', 'Food'];

  const filteredItems = selectedCategory === 'All'
    ? MOCK_GALLERY
    : MOCK_GALLERY.filter((item) => item.category === selectedCategory);

  const handleOpenLightbox = (index: number) => {
    openModal(
      <LightboxModalContent items={filteredItems} initialIndex={index} />,
      { size: 'xl' }
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <Breadcrumbs items={[{ label: 'Photo Gallery' }]} />

      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h1 className="font-display text-4xl md:text-5xl font-semibold text-forest-deep">
          Pawna Lake Moments
        </h1>
        <p className="text-sm text-forest-deep/75 leading-relaxed">
          Real guest photos capturing sunset colors, cozy campfire evenings, kayaking waters, and delicious barbecue meals.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition ${
              selectedCategory === cat
                ? 'bg-forest text-white shadow-md'
                : 'bg-white border border-mist text-forest-deep hover:bg-mist/50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Masonry-Style Image Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredItems.map((item, idx) => (
          <div
            key={item.id}
            onClick={() => handleOpenLightbox(idx)}
            className="group relative h-64 bg-mist rounded-2xl overflow-hidden cursor-pointer shadow-sm border border-mist hover:shadow-xl transition duration-300"
          >
            <img
              src={item.imageUrl}
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col justify-end p-4 text-white">
              <p className="font-display text-lg font-semibold">{item.title}</p>
              <p className="text-xs text-white/80 line-clamp-1">{item.caption}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
