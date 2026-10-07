'use client';

import React from 'react';
import { Testimonial } from '@/types';
import { Rating } from '@/components/ui/Rating';

export interface TestimonialSectionProps {
  testimonials: Testimonial[];
}

export const TestimonialSection: React.FC<TestimonialSectionProps> = ({ testimonials }) => {
  return (
    <section className="py-20 bg-forest-deep text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="eyebrow text-sage mb-2">
            Guest Reviews
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-medium text-white">
            Loved by 10,000+ Campers
          </h2>
          <p className="text-sm text-white/70 mt-2">
            Real experiences shared by couples, families, and friend groups who stayed at Pawna Lake.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((test) => (
            <div
              key={test.id}
              className="bg-white text-forest-deep rounded-t-[6rem] rounded-b-3xl pt-16 px-8 pb-7 shadow-xl text-center flex flex-col justify-between"
            >
              <div className="space-y-3 flex flex-col items-center">
                <Rating score={test.rating} showText={false} size="md" />
                <p className="text-sm text-forest-deep/85 italic leading-relaxed">
                  &ldquo;{test.comment}&rdquo;
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-mist flex items-center gap-3">
                <img
                  src={test.avatar}
                  alt={test.name}
                  className="w-10 h-10 rounded-full object-cover border border-mist"
                />
                <div>
                  <h4 className="text-sm font-semibold text-forest-deep">{test.name}</h4>
                  <p className="text-xs text-forest-deep/60">
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
