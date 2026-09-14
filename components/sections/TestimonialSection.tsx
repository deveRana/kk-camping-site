'use client';

import React from 'react';
import { Testimonial } from '@/types';
import { Rating } from '@/components/ui/Rating';

export interface TestimonialSectionProps {
  testimonials: Testimonial[];
}

export const TestimonialSection: React.FC<TestimonialSectionProps> = ({ testimonials }) => {
  return (
    <section className="py-16 bg-cream border-y border-cream-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-terracotta font-semibold uppercase tracking-widest text-xs mb-2">
            Guest Reviews
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-terracotta-deep">
            Loved by 10,000+ Campers
          </h2>
          <p className="text-sm text-terracotta-deep/70 mt-2">
            Real experiences shared by couples, families, and friend groups who stayed at Pawna Lake.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((test) => (
            <div
              key={test.id}
              className="bg-white rounded-2xl p-6 border border-cream-dark shadow-sm flex flex-col justify-between"
            >
              <div className="space-y-3">
                <Rating score={test.rating} showText={false} size="md" />
                <p className="text-sm text-terracotta-deep/85 italic leading-relaxed">
                  &ldquo;{test.comment}&rdquo;
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-cream-dark flex items-center gap-3">
                <img
                  src={test.avatar}
                  alt={test.name}
                  className="w-10 h-10 rounded-full object-cover border border-cream-dark"
                />
                <div>
                  <h4 className="text-sm font-semibold text-terracotta-deep">{test.name}</h4>
                  <p className="text-xs text-terracotta-deep/60">
                    {test.location} · {test.stayType}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
