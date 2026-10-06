'use client';

import React, { useState } from 'react';
import { GalleryItem } from '@/types';

export interface LightboxModalContentProps {
  items: GalleryItem[];
  initialIndex?: number;
}

export const LightboxModalContent: React.FC<LightboxModalContentProps> = ({
  items,
  initialIndex = 0,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const currentItem = items[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  if (!currentItem) return null;

  return (
    <div className="flex flex-col items-center text-center space-y-4">
      <div className="relative w-full h-[60vh] max-h-[550px] bg-black/90 rounded-xl overflow-hidden flex items-center justify-center">
        <img
          src={currentItem.imageUrl}
          alt={currentItem.title}
          className="max-h-full max-w-full object-contain"
        />

        {/* Prev Button */}
        <button
          onClick={handlePrev}
          className="absolute left-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 text-white hover:bg-forest transition"
          aria-label="Previous Image"
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Next Button */}
        <button
          onClick={handleNext}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 text-white hover:bg-forest transition"
          aria-label="Next Image"
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div>
        <h4 className="font-display text-xl font-semibold text-forest-deep">{currentItem.title}</h4>
        <p className="text-sm text-forest-deep/70 mt-1">{currentItem.caption}</p>
        <p className="text-xs text-forest-deep/50 mt-2">
          Image {currentIndex + 1} of {items.length}
        </p>
      </div>
    </div>
  );
};
