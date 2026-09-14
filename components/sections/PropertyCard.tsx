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
      <div className="bg-white rounded-2xl border border-cream-dark overflow-hidden transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl flex flex-col h-full">
        {/* Cover Image Container */}
        <div className="relative h-56 w-full overflow-hidden bg-cream-dark">
          <img
            src={property.coverImage}
            alt={property.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />

          {/* Category Pill */}
          <div className="absolute top-3 left-3">
            <Badge variant="terracotta" size="sm">
              {property.category}
            </Badge>
          </div>

          {/* Wishlist Heart Button */}
          <button
            onClick={toggleWishlist}
            className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-md text-terracotta hover:bg-white transition-transform duration-200 hover:scale-110 shadow"
            aria-label="Toggle Wishlist"
          >
            <svg
              className={`w-5 h-5 ${isWishlisted ? 'fill-terracotta stroke-terracotta' : 'fill-none stroke-current'}`}
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
            <div className="flex items-center justify-between text-xs text-terracotta-deep/70 mb-1.5">
              <span>{property.location}</span>
              <Rating score={property.rating} reviewCount={property.reviewCount} />
            </div>

            <h3 className="font-display text-xl font-semibold text-terracotta-deep group-hover:text-terracotta transition line-clamp-1">
              {property.title}
            </h3>

            <p className="text-xs text-terracotta-deep/70 mt-1 line-clamp-2 leading-relaxed">
              {property.tagline}
            </p>
          </div>

          {/* Feature Badges */}
          <div className="flex flex-wrap gap-1.5">
            {property.features.slice(0, 3).map((feat, idx) => (
              <Badge key={idx} variant="cream" size="sm">
                {feat}
              </Badge>
            ))}
          </div>

          {/* Price & Action */}
          <div className="pt-3 border-t border-cream-dark flex items-center justify-between">
            <div>
              <span className="text-xs text-terracotta-deep/60 block">Starts from</span>
              <div className="flex items-baseline gap-1.5">
                <span className="font-display text-xl font-bold text-terracotta">
                  ₹{property.price.toLocaleString()}
                </span>
                <span className="text-xs text-terracotta-deep/60">/ night</span>
                {property.originalPrice && (
                  <span className="text-xs line-through text-terracotta-deep/40">
                    ₹{property.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
            </div>

            <span className="bg-cream-dark group-hover:bg-terracotta group-hover:text-white text-terracotta-deep text-xs font-semibold px-3.5 py-2 rounded-xl transition duration-200">
              View Stay
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};
