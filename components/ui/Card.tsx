'use client';

import React from 'react';

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className = '', hoverable = false }) => {
  return (
    <div
      className={`bg-white rounded-2xl border border-mist overflow-hidden transition-all duration-300 ${
        hoverable ? 'hover:-translate-y-1 hover:shadow-xl' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
};
