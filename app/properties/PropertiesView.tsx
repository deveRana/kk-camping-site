'use client';

import React, { useState, useMemo } from 'react';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { PropertyGrid } from '@/components/sections/PropertyGrid';
import { FilterSidebar } from '@/components/sections/FilterSidebar';
import type { Property } from '@/types';
import { useModal } from '@/components/modal/useModal';
import { Button } from '@/components/ui/Button';

export function PropertiesView({ properties }: { properties: Property[] }) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [maxPrice, setMaxPrice] = useState<number>(6000);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');

  const { openModal, closeModal } = useModal();

  const filteredProperties = useMemo(() => {
    return properties.filter((prop) => {
      const matchesCategory = selectedCategory === 'All' || prop.category === selectedCategory;
      const matchesPrice = prop.price <= maxPrice;
      const matchesSearch =
        prop.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prop.location.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesPrice && matchesSearch;
    });
  }, [properties, selectedCategory, maxPrice, searchQuery]);

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setMaxPrice(6000);
    setSearchQuery('');
  };

  const handleOpenMobileFilter = () => {
    openModal(
      <div className="p-2">
        <FilterSidebar
          selectedCategory={selectedCategory}
          onCategoryChange={(cat) => {
            setSelectedCategory(cat);
            closeModal();
          }}
          maxPrice={maxPrice}
          onPriceChange={setMaxPrice}
          onReset={() => {
            handleResetFilters();
            closeModal();
          }}
        />
      </div>,
      { title: 'Filter Campsites', size: 'md' }
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <Breadcrumbs items={[{ label: 'All Stays' }]} />

      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-mist pb-6">
        <div>
          <h1 className="font-display text-4xl md:text-5xl font-semibold text-forest-deep">
            Lakeside Stays at Pawna Lake
          </h1>
          <p className="text-sm text-forest-deep/70 mt-1">
            Showing {filteredProperties.length} available campsites &amp; glamping domes
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Mobile Filter Button */}
          <Button
            onClick={handleOpenMobileFilter}
            variant="outline"
            size="sm"
            className="md:hidden"
            leftIcon={
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
            }
          >
            Filters
          </Button>

          {/* Search Input */}
          <div className="relative flex-1 md:w-64">
            <input
              type="text"
              placeholder="Search stay or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-mist rounded-xl px-4 py-2 text-xs md:text-sm text-forest-deep placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-forest"
            />
          </div>

          {/* View Toggle */}
          <div className="flex border border-mist rounded-xl overflow-hidden bg-white p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                viewMode === 'grid' ? 'bg-forest text-white' : 'text-forest-deep hover:bg-mist/40'
              }`}
            >
              Grid
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                viewMode === 'map' ? 'bg-forest text-white' : 'text-forest-deep hover:bg-mist/40'
              }`}
            >
              Map
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Desktop Filter Sidebar */}
        <div className="hidden lg:block lg:col-span-1">
          <FilterSidebar
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            maxPrice={maxPrice}
            onPriceChange={setMaxPrice}
            onReset={handleResetFilters}
          />
        </div>

        {/* Listings / Map Area */}
        <div className="lg:col-span-3">
          {viewMode === 'grid' ? (
            <PropertyGrid properties={filteredProperties} />
          ) : (
            <div className="space-y-6">
              {/* Map View */}
              <div className="bg-white rounded-2xl border border-mist overflow-hidden shadow-xl">
                <div className="bg-gradient-to-r from-forest to-forest-dark text-white p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-sage flex items-center justify-center">
                        📍
                      </div>
                      <div>
                        <h3 className="font-display text-lg font-semibold">
                          Pawna Lake Campsites Map
                        </h3>
                        <p className="text-xs text-white/80">
                          Showing {filteredProperties.length} properties around Pawna Lake
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Google Maps Embed */}
                <div className="relative w-full h-[500px] md:h-[600px]">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15122.924377424629!2d73.48703!3d18.63116!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2a9eab3ca531b%3A0xcbb693c085173e98!2sPawna%20Lake!5e0!3m2!1sen!2sin!4v1729847440383!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Pawna Lake Properties Map"
                    className="absolute inset-0"
                  />
                </div>

                {/* Properties Legend */}
                <div className="bg-mist/40 p-6 border-t border-mist">
                  <h4 className="font-semibold text-forest-deep mb-3 flex items-center gap-2">
                    <svg className="w-5 h-5 text-forest" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    Available Properties ({filteredProperties.length})
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {filteredProperties.map((p) => (
                      <a
                        key={p.id}
                        href={`/properties/${p.slug}`}
                        className="flex items-center justify-between bg-white rounded-xl p-3 border border-mist hover:border-forest transition group"
                      >
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-forest text-white text-xs font-bold flex items-center justify-center">
                            {p.title.substring(0, 1)}
                          </div>
                          <div>
                            <p className="font-semibold text-forest-deep text-sm group-hover:text-forest transition">
                              {p.title}
                            </p>
                            <p className="text-xs text-forest-deep/60">{p.category}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-forest text-sm">₹{p.price.toLocaleString()}</p>
                          <p className="text-xs text-forest-deep/60">per person</p>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Switch to Grid View CTA */}
              <div className="text-center">
                <button
                  onClick={() => setViewMode('grid')}
                  className="inline-flex items-center gap-2 text-sm text-forest hover:text-forest-dark font-semibold transition"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                  Switch to Grid View for Detailed Cards
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
