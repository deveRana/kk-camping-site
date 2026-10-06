'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Property } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { Rating } from '@/components/ui/Rating';
import { useToast } from '@/components/toast/useToast';

export interface PropertyCardProps {
  property: Property;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { showToast } = useToast();

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
    showToast({
      type: !isWishlisted ? 'success' : 'info',
      message: !isWishlisted
        ? `Added "${property.title}" to your wishlist!`
        : `Removed "${property.title}" from your wishlist.`,
    });
  };

  return (
    <Link href={`/properties/${property.slug}`} className="group block">
      <div className="bg-white rounded-[1.75rem] border border-mist overflow-hidden transition-all duration-300 group-hover:-translate-y-1.5 group-hover:shadow-2xl group-hover:shadow-forest/15 flex flex-col h-full">
        {/* Cover Image Container */}
        <div className="relative h-64 mx-3 mt-3 overflow-hidden bg-mist rounded-t-[9rem] rounded-b-2xl">
          <img
            src={property.coverImage}
            alt={property.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />

          {/* Category Pill */}
          <div className="absolute bottom-3 left-3">
            <Badge variant="forest" size="sm" className="!bg-white/90 shadow backdrop-blur">
              {property.category}
            </Badge>
          </div>

          {/* Wishlist Heart Button */}
          <button
            onClick={toggleWishlist}
            className="absolute bottom-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-md text-forest hover:bg-white transition-transform duration-200 hover:scale-110 shadow"
            aria-label="Toggle Wishlist"
          >
            <svg
              className={`w-5 h-5 ${isWishlisted ? 'fill-forest stroke-forest' : 'fill-none stroke-current'}`}
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.684a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 flex flex-col justify-between flex-1 space-y-4">
          <div>
            <div className="flex items-center justify-between text-xs text-forest-deep/70 mb-1.5">
              <span>{property.location}</span>
              <Rating score={property.rating} reviewCount={property.reviewCount} />
            </div>

            <h3 className="font-display text-xl font-semibold text-forest-deep group-hover:text-forest transition line-clamp-1">
              {property.title}
            </h3>

            <p className="text-xs text-forest-deep/70 mt-1 line-clamp-2 leading-relaxed">
              {property.tagline}
            </p>
          </div>

          {/* Feature Badges */}
          <div className="flex flex-wrap gap-1.5">
            {property.features.slice(0, 3).map((feat, idx) => (
              <Badge key={idx} variant="paper" size="sm">
                {feat}
              </Badge>
            ))}
          </div>

          {/* Price & Action */}
          <div className="pt-3 border-t border-mist flex items-center justify-between">
            <div>
              <span className="text-xs text-forest-deep/60 block">Starts from</span>
              <div className="flex items-baseline gap-1.5">
                <span className="font-display text-xl font-semibold text-forest">
                  ₹{property.price.toLocaleString()}
                </span>
                <span className="text-xs text-forest-deep/60">/ night</span>
                {property.originalPrice && (
                  <span className="text-xs line-through text-forest-deep/40">
                    ₹{property.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
            </div>

            <span className="bg-mist group-hover:bg-forest group-hover:text-white text-forest-deep text-xs font-semibold px-3.5 py-2 rounded-xl transition duration-200">
              View Stay
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};
