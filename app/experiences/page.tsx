'use client';

import React, { useState } from 'react';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ExperienceCard } from '@/components/sections/ExperienceCard';
import { MOCK_EXPERIENCES } from '@/lib/mock-data/experiences';
import { Badge } from '@/components/ui/Badge';

export default function ExperiencesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Water Sports', 'Nightlife', 'Food', 'Outdoor'];

  const filtered = selectedCategory === 'All'
    ? MOCK_EXPERIENCES
    : MOCK_EXPERIENCES.filter((exp) => exp.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <Breadcrumbs items={[{ label: 'Experiences' }]} />

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <Badge variant="amber" size="sm">
          Activities &amp; Nightlife
        </Badge>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-terracotta-deep">
          Adventures at Pawna Lake
        </h1>
        <p className="text-sm text-terracotta-deep/75 leading-relaxed">
          From peaceful sunrise kayaking and guided fort trekking to charcoal BBQ sessions and live acoustic music.
        </p>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition ${
              selectedCategory === cat
                ? 'bg-terracotta text-white shadow-md'
                : 'bg-white border border-cream-dark text-terracotta-deep hover:bg-cream-dark/50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((exp) => (
          <ExperienceCard key={exp.id} experience={exp} />
        ))}
      </div>
    </div>
  );
}
