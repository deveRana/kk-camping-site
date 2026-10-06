'use client';

import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'forest' | 'amber' | 'paper' | 'success' | 'outline';
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'forest',
  size = 'sm',
  className = '',
}) => {
  const base = 'inline-flex items-center font-semibold rounded-full tracking-wide';
  const variants = {
    forest: 'bg-forest/10 text-forest border border-forest/20',
    amber: 'bg-sage/30 text-forest border border-sage',
    paper: 'bg-mist text-forest-deep border border-mist',
    success: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    outline: 'border border-mist text-forest-deep/80',
  };
  const sizes = {
    sm: 'px-2.5 py-0.5 text-xs',
    md: 'px-3.5 py-1 text-sm',
  };

  return <span className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}>{children}</span>;
};
