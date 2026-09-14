'use client';

import React from 'react';
import { Experience } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/components/toast/useToast';

export interface ExperienceCardProps {
  experience: Experience;
}

export const ExperienceCard: React.FC<ExperienceCardProps> = ({ experience }) => {
  const { showToast } = useToast();

  const handleBookExperience = () => {
    showToast({
      type: 'success',
      message: `Added "${experience.title}" to your trip activity list!`,
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-cream-dark overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col h-full">
      <div className="relative h-52 w-full overflow-hidden bg-cream-dark">
        <img
          src={experience.image}
          alt={experience.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute top-3 left-3">
          <Badge variant="amber" size="sm">
            {experience.category}
          </Badge>
        </div>
        <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold text-terracotta-deep shadow">
          {experience.duration}
        </div>
      </div>

      <div className="p-6 flex flex-col justify-between flex-1 space-y-4">
        <div>
          <h3 className="font-display text-xl font-semibold text-terracotta-deep mb-2">
            {experience.title}
          </h3>
          <p className="text-xs text-terracotta-deep/75 leading-relaxed">
            {experience.description}
          </p>
        </div>

        <div className="space-y-1.5">
          <p className="text-[11px] font-semibold text-terracotta-deep uppercase tracking-wider">
            What&apos;s Included:
          </p>
          <div className="flex flex-wrap gap-1.5">
            {experience.included.map((item, idx) => (
              <Badge key={idx} variant="cream" size="sm">
                {item}
              </Badge>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-cream-dark flex items-center justify-between">
          <div>
            <span className="text-xs text-terracotta-deep/60 block">Price per person</span>
            <span className="font-display text-xl font-bold text-terracotta">
              ₹{experience.pricePerPerson}
            </span>
          </div>

          <Button onClick={handleBookExperience} variant="primary" size="sm">
            Add to Trip
          </Button>
        </div>
      </div>
    </div>
  );
};
