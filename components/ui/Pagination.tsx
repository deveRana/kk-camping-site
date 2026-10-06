'use client';

import React from 'react';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-2 rounded-lg border border-mist text-sm font-medium text-forest-deep disabled:opacity-40 disabled:cursor-not-allowed hover:bg-mist/50 transition"
      >
        Previous
      </button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-10 h-10 rounded-lg text-sm font-semibold transition ${
            currentPage === page
              ? 'bg-forest text-white'
              : 'bg-white border border-mist text-forest-deep hover:bg-mist/50'
          }`}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-2 rounded-lg border border-mist text-sm font-medium text-forest-deep disabled:opacity-40 disabled:cursor-not-allowed hover:bg-mist/50 transition"
      >
        Next
      </button>
    </div>
  );
};
