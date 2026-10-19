'use client';

import React, { useState } from 'react';

interface ImageWithPlaceholderProps {
  src: string | undefined | null;
  alt: string;
  className?: string;
  placeholderIcon?: string;
  placeholderText?: string;
  onError?: () => void;
}

export function ImageWithPlaceholder({
  src,
  alt,
  className = '',
  placeholderIcon = '🖼️',
  placeholderText,
  onError,
}: ImageWithPlaceholderProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleError = () => {
    setImageError(true);
    onError?.();
  };

  const showPlaceholder = !src || imageError;

  return (
    <div className="relative w-full h-full">
      {/* Placeholder */}
      {showPlaceholder && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-mist to-gray-100">
          <span className="text-5xl md:text-6xl mb-2 opacity-40">{placeholderIcon}</span>
          {placeholderText && (
            <span className="text-sm text-forest-deep/50 font-medium px-4 text-center">
              {placeholderText}
            </span>
          )}
        </div>
      )}

      {/* Actual Image */}
      {src && !imageError && (
        <>
          {/* Loading skeleton */}
          {!imageLoaded && (
            <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-mist to-gray-100" />
          )}

          <img
            src={src}
            alt={alt}
            className={className}
            onError={handleError}
            onLoad={() => setImageLoaded(true)}
            style={{ display: imageError ? 'none' : 'block' }}
          />
        </>
      )}
    </div>
  );
}
