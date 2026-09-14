'use client';

import React, { useState, useMemo } from 'react';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { PropertyGrid } from '@/components/sections/PropertyGrid';
import { FilterSidebar } from '@/components/sections/FilterSidebar';
import { MOCK_PROPERTIES } from '@/lib/mock-data/properties';
import { useModal } from '@/components/modal/useModal';
import { Button } from '@/components/ui/Button';

export default function PropertiesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [maxPrice, setMaxPrice] = useState<number>(6000);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');

  const { openModal, closeModal } = useModal();

  const filteredProperties = useMemo(() => {
    return MOCK_PROPERTIES.filter((prop) => {
      const matchesCategory = selectedCategory === 'All' || prop.category === selectedCategory;
      const matchesPrice = prop.price <= maxPrice;
      const matchesSearch =
        prop.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prop.location.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesPrice && matchesSearch;
    });
  }, [selectedCategory, maxPrice, searchQuery]);

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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-cream-dark pb-6">
        <div>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-terracotta-deep">
            Lakeside Stays at Pawna Lake
          </h1>
          <p className="text-sm text-terracotta-deep/70 mt-1">
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
              className="w-full bg-white border border-cream-dark rounded-xl px-4 py-2 text-xs md:text-sm text-terracotta-deep placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-terracotta"
            />
          </div>

          {/* View Toggle */}
          <div className="flex border border-cream-dark rounded-xl overflow-hidden bg-white p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                viewMode === 'grid' ? 'bg-terracotta text-white' : 'text-terracotta-deep hover:bg-cream-dark/40'
              }`}
            >
              Grid
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                viewMode === 'map' ? 'bg-terracotta text-white' : 'text-terracotta-deep hover:bg-cream-dark/40'
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
            <div className="bg-white rounded-2xl border border-cream-dark p-8 text-center space-y-4">
              <div className="h-96 w-full rounded-xl bg-cream-dark/60 flex flex-col items-center justify-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-terracotta/10 text-terracotta flex items-center justify-center font-bold">
                  📍
                </div>
                <h3 className="font-display text-xl font-semibold text-terracotta-deep">
                  Interactive Pawna Lake Map View
                </h3>
                <p className="text-xs text-terracotta-deep/70 max-w-sm">
                  Showing {filteredProperties.length} pins around Pawna Dam waterfront campsites.
                </p>
                <div className="flex flex-wrap justify-center gap-2 pt-2">
                  {filteredProperties.map((p) => (
                    <span key={p.id} className="bg-terracotta text-white text-xs font-bold px-3 py-1.5 rounded-full shadow">
                      {p.title.split(' ')[0]}: ₹{p.price}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
