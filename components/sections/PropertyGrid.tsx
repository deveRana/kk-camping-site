'use client';

import React from 'react';
import { Property } from '@/types';
import { PropertyCard } from './PropertyCard';

export interface PropertyGridProps {
  properties: Property[];
}

export const PropertyGrid: React.FC<PropertyGridProps> = ({ properties }) => {
  if (properties.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-mist p-12 text-center my-8">
        <div className="w-16 h-16 rounded-full bg-mist mx-auto flex items-center justify-center mb-4 text-forest">
          <svg width="30" height="30" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <h3 className="font-display text-xl font-semibold text-forest-deep mb-2">No stays match your search</h3>
        <p className="text-sm text-forest-deep/70 mb-4 max-w-md mx-auto">
          Try clearing filters or searching for different dates to view available Pawna Lake campsites.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map((prop) => (
        <PropertyCard key={prop.id} property={prop} />
      ))}
    </div>
  );
};
