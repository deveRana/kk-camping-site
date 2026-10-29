'use client';

import React from 'react';
import { Skeleton } from '@/components/ui/Skeleton';

export default function FAQLoading() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 animate-fadeIn">
      {/* Header */}
      <div className="text-center space-y-3">
        <Skeleton className="h-6 w-48 mx-auto" />
        <Skeleton className="h-12 w-[500px] mx-auto" />
        <Skeleton className="h-5 w-[600px] mx-auto" />
      </div>

      {/* Search Bar */}
      <div className="max-w-2xl mx-auto">
        <Skeleton className="h-14 w-full rounded-full" />
      </div>

      {/* Category Tabs */}
      <div className="flex gap-3 justify-center flex-wrap">
        {[1, 2, 3, 4, 5].map((n) => (
          <Skeleton key={n} className="h-10 w-36 rounded-full" />
        ))}
      </div>

      {/* FAQ Accordions */}
      <div className="space-y-4 pt-6">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
          <div key={n} className="bg-white rounded-xl border border-mist p-6 space-y-3">
            <div className="flex items-center justify-between">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-6 w-6 rounded" />
            </div>
            {n % 3 === 0 && (
              <>
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </>
            )}
          </div>
        ))}
      </div>

      {/* Still have questions CTA */}
      <div className="bg-gradient-to-br from-forest/5 to-sage/10 rounded-2xl border border-mist p-8 text-center space-y-4 mt-12">
        <Skeleton className="h-8 w-64 mx-auto" />
        <Skeleton className="h-4 w-96 mx-auto" />
        <div className="flex gap-4 justify-center pt-4">
          <Skeleton className="h-12 w-40 rounded-full" />
          <Skeleton className="h-12 w-40 rounded-full" />
        </div>
      </div>
    </div>
  );
}
