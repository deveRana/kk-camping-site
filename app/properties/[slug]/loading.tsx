'use client';

import React from 'react';
import { Skeleton } from '@/components/ui/Skeleton';

export default function PropertyDetailLoading() {
  return (
    <div className="animate-fadeIn">
      {/* Hero Image Skeleton */}
      <div className="relative h-[500px] bg-gradient-to-br from-sage/20 to-forest/10">
        <Skeleton className="w-full h-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Breadcrumbs */}
        <div className="mb-6">
          <Skeleton className="h-4 w-64" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Title & Info */}
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-10 w-3/4" />
                  <Skeleton className="h-5 w-1/2" />
                </div>
                <Skeleton className="h-8 w-24 rounded-full" />
              </div>
              <div className="flex flex-wrap gap-4">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-5 w-28" />
                <Skeleton className="h-5 w-36" />
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl border border-mist p-6 space-y-3">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>

            {/* Amenities */}
            <div className="bg-white rounded-2xl border border-mist p-6 space-y-4">
              <Skeleton className="h-6 w-32" />
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <div key={n} className="flex items-center gap-3">
                    <Skeleton className="h-10 w-10 rounded-lg" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                ))}
              </div>
            </div>

            {/* Inclusions */}
            <div className="bg-white rounded-2xl border border-mist p-6 space-y-4">
              <Skeleton className="h-6 w-48" />
              <div className="space-y-2">
                {[1, 2, 3, 4, 5].map((n) => (
                  <Skeleton key={n} className="h-5 w-full" />
                ))}
              </div>
            </div>

            {/* Gallery */}
            <div className="space-y-4">
              <Skeleton className="h-6 w-32" />
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <Skeleton key={n} className="h-48 w-full rounded-xl" />
                ))}
              </div>
            </div>
          </div>

          {/* Booking Card Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-mist p-6 sticky top-24 space-y-6">
              <div className="space-y-2">
                <Skeleton className="h-10 w-40" />
                <Skeleton className="h-4 w-32" />
              </div>

              <div className="space-y-4">
                <div>
                  <Skeleton className="h-4 w-24 mb-2" />
                  <Skeleton className="h-12 w-full rounded-lg" />
                </div>
                <div>
                  <Skeleton className="h-4 w-32 mb-2" />
                  <Skeleton className="h-12 w-full rounded-lg" />
                </div>
                <div>
                  <Skeleton className="h-4 w-24 mb-2" />
                  <Skeleton className="h-12 w-full rounded-lg" />
                </div>
              </div>

              <div className="border-t border-mist pt-4 space-y-2">
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <div className="flex justify-between">
                  <Skeleton className="h-6 w-24" />
                  <Skeleton className="h-6 w-32" />
                </div>
              </div>

              <Skeleton className="h-12 w-full rounded-full" />

              <div className="text-center space-y-2">
                <Skeleton className="h-4 w-48 mx-auto" />
                <Skeleton className="h-4 w-40 mx-auto" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
