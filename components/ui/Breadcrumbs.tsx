'use client';

import React from 'react';
import Link from 'next/link';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <nav className="flex items-center text-xs md:text-sm text-terracotta-deep/70 gap-2 mb-4">
      <Link href="/" className="hover:text-terracotta transition">
        Home
      </Link>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <span>/</span>
          {item.href ? (
            <Link href={item.href} className="hover:text-terracotta transition">
              {item.label}
            </Link>
          ) : (
            <span className="font-semibold text-terracotta-deep truncate max-w-[200px] md:max-w-none">
              {item.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};
