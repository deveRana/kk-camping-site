'use client';

import React from 'react';
import { Skeleton } from '@/components/ui/Skeleton';

export default function GalleryLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="text-center space-y-3">
        <Skeleton className="h-6 w-40 mx-auto" />
        <Skeleton className="h-12 w-96 mx-auto" />
        <Skeleton className="h-5 w-[500px] mx-auto" />
      </div>

      {/* Category Filter Tabs */}
      <div className="flex gap-3 justify-center flex-wrap">
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <Skeleton key={n} className="h-10 w-28 rounded-full" />
        ))}
      </div>

      {/* Gallery Grid - Masonry Style */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((n) => (
          <div key={n} className="group relative overflow-hidden rounded-2xl border border-mist bg-white">
            <Skeleton
              className="w-full"
              style={{ height: n % 3 === 0 ? '320px' : n % 2 === 0 ? '240px' : '280px' }}
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      <div className="text-center pt-8">
        <Skeleton className="h-12 w-48 mx-auto rounded-full" />
      </div>
    </div>
  );
}
