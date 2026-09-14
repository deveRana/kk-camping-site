'use client';

import React from 'react';
import { Skeleton } from '@/components/ui/Skeleton';

export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 animate-fadeIn">
      {/* Header skeleton */}
      <div className="space-y-3">
        <Skeleton className="h-4 w-36" />
        <Skeleton className="h-8 w-80" />
        <Skeleton className="h-4 w-96" />
      </div>

      {/* Grid of skeleton cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((n) => (
          <div key={n} className="bg-white rounded-2xl overflow-hidden border border-cream-dark p-5 space-y-4">
            <Skeleton className="h-56 w-full rounded-xl" />
            <div className="flex justify-between items-center">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-4 w-12" />
            </div>
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <div className="flex gap-2 pt-2">
              <Skeleton className="h-6 w-16 rounded-full" />
              <Skeleton className="h-6 w-16 rounded-full" />
              <Skeleton className="h-6 w-16 rounded-full" />
            </div>
            <div className="flex justify-between items-center pt-3 border-t border-cream-dark">
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-9 w-24 rounded-xl" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
