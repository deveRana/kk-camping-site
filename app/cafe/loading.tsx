'use client';

import React from 'react';
import { Skeleton } from '@/components/ui/Skeleton';

export default function CafeLoading() {
  return (
    <div className="animate-fadeIn">
      {/* Hero Section */}
      <div className="relative h-[400px] bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center space-y-4">
            <Skeleton className="h-6 w-32 mx-auto rounded-full" />
            <Skeleton className="h-16 w-96 mx-auto" />
            <Skeleton className="h-5 w-[500px] mx-auto" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Timing Info */}
        <div className="bg-white rounded-2xl border border-mist p-6 mb-12">
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="text-center space-y-2">
                <Skeleton className="h-12 w-12 rounded-full mx-auto" />
                <Skeleton className="h-5 w-32 mx-auto" />
                <Skeleton className="h-4 w-24 mx-auto" />
              </div>
            ))}
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <Skeleton key={n} className="h-10 w-28 rounded-full flex-shrink-0" />
          ))}
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div key={n} className="bg-white rounded-2xl border border-mist overflow-hidden">
              <Skeleton className="h-48 w-full" />
              <div className="p-5 space-y-3">
                <div className="flex items-start justify-between">
                  <Skeleton className="h-6 w-2/3" />
                  <Skeleton className="h-5 w-5 rounded-full" />
                </div>
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <div className="flex items-center justify-between pt-2">
                  <Skeleton className="h-8 w-24" />
                  <Skeleton className="h-6 w-20 rounded-full" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
