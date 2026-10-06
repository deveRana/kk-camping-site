'use client';

import React from 'react';

export interface FilterSidebarProps {
  selectedCategory: string;
  onCategoryChange: (cat: string) => void;
  maxPrice: number;
  onPriceChange: (price: number) => void;
  onReset: () => void;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  selectedCategory,
  onCategoryChange,
  maxPrice,
  onPriceChange,
  onReset,
}) => {
  const categories = ['All', 'Glamping', 'Cottage', 'Tent Camping', 'Villa'];

  return (
    <div className="bg-white rounded-2xl border border-mist p-6 space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-mist">
        <h3 className="font-display text-lg font-semibold text-forest-deep">Filter Stays</h3>
        <button
          onClick={onReset}
          className="text-xs font-semibold text-forest hover:underline focus:outline-none"
        >
          Reset All
        </button>
      </div>

      {/* Categories */}
      <div>
        <h4 className="text-xs font-semibold uppercase tracking-wider text-forest-deep mb-3">
          Category
        </h4>
        <div className="space-y-2">
          {categories.map((cat) => (
            <label key={cat} className="flex items-center gap-3 cursor-pointer group text-sm text-forest-deep/80 hover:text-forest">
              <input
                type="radio"
                name="category"
                checked={selectedCategory === cat}
                onChange={() => onCategoryChange(cat)}
                className="accent-forest w-4 h-4"
              />
              <span className={selectedCategory === cat ? 'font-semibold text-forest' : ''}>
                {cat}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Slider */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-forest-deep">
            Max Price / Night
          </h4>
          <span className="text-xs font-bold text-forest">₹{maxPrice.toLocaleString()}</span>
        </div>
        <input
          type="range"
          min="1000"
          max="6000"
          step="200"
          value={maxPrice}
          onChange={(e) => onPriceChange(Number(e.target.value))}
          className="w-full accent-forest cursor-pointer"
        />
        <div className="flex justify-between text-xs text-forest-deep/50 mt-1">
          <span>₹1,000</span>
          <span>₹6,000</span>
        </div>
      </div>
    </div>
  );
};
