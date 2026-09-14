'use client';

import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'terracotta' | 'amber' | 'cream' | 'success' | 'outline';
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'terracotta',
  size = 'sm',
  className = '',
}) => {
  const base = 'inline-flex items-center font-semibold rounded-full tracking-wide';
  const variants = {
    terracotta: 'bg-terracotta/10 text-terracotta border border-terracotta/20',
    amber: 'bg-amber-light/30 text-amber-warm border border-amber-warm/30',
    cream: 'bg-cream-dark text-terracotta-deep border border-cream-dark',
    success: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    outline: 'border border-cream-dark text-terracotta-deep/80',
  };
  const sizes = {
    sm: 'px-2.5 py-0.5 text-xs',
    md: 'px-3.5 py-1 text-sm',
  };

  return <span className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}>{children}</span>;
};
