'use client';

import React from 'react';

export interface SkeletonProps {
  className?: string;
  style?: React.CSSProperties;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = '', style }) => {
  return <div className={`skel ${className}`} style={style} />;
};
