'use client';

import React from 'react';
import { Skeleton } from '@/components/ui/Skeleton';

export default function BlogDetailLoading() {
  return (
    <div className="animate-fadeIn">
      {/* Hero Image */}
      <div className="relative h-[500px] bg-gradient-to-br from-sage/20 to-forest/10">
        <Skeleton className="w-full h-full" />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/50 to-transparent flex items-end">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full space-y-4">
            <Skeleton className="h-5 w-32 rounded-full bg-white/20" />
            <Skeleton className="h-14 w-full bg-white/20" />
            <Skeleton className="h-14 w-3/4 bg-white/20" />
            <div className="flex items-center gap-4 pt-4">
              <Skeleton className="h-12 w-12 rounded-full bg-white/20" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-32 bg-white/20" />
                <Skeleton className="h-3 w-40 bg-white/20" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article className="prose prose-lg max-w-none space-y-6">
          {/* Paragraphs */}
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div key={n} className="space-y-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          ))}

          {/* Image */}
          <Skeleton className="h-80 w-full rounded-2xl" />

          {/* More paragraphs */}
          {[1, 2, 3].map((n) => (
            <div key={`p2-${n}`} className="space-y-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          ))}
        </article>

        {/* Tags */}
        <div className="flex gap-2 pt-8 border-t border-mist mt-12">
          {[1, 2, 3, 4].map((n) => (
            <Skeleton key={n} className="h-8 w-24 rounded-full" />
          ))}
        </div>

        {/* Share Section */}
        <div className="mt-8 bg-sage/10 rounded-2xl p-6 space-y-4">
          <Skeleton className="h-6 w-48" />
          <div className="flex gap-3">
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-10 w-10 rounded-full" />
          </div>
        </div>

        {/* Related Posts */}
        <div className="mt-16">
          <Skeleton className="h-8 w-48 mb-8" />
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="bg-white rounded-2xl border border-mist overflow-hidden">
                <Skeleton className="h-48 w-full" />
                <div className="p-4 space-y-3">
                  <Skeleton className="h-5 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
