'use client';

import React, { useState } from 'react';

export interface AccordionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export const Accordion: React.FC<AccordionProps> = ({ title, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="bg-white rounded-2xl border border-mist overflow-hidden transition">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
        aria-expanded={isOpen}
      >
        <span className="font-display text-lg font-semibold text-forest-deep">{title}</span>
        <span
          className={`ml-4 flex-shrink-0 text-forest transition-transform duration-200 ${
            isOpen ? 'rotate-45' : 'rotate-0'
          }`}
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </span>
      </button>
      {isOpen && (
        <div className="px-6 pb-6 text-sm text-forest-deep/80 leading-relaxed border-t border-mist/50 pt-4 animate-fadeIn">
          {children}
        </div>
      )}
    </div>
  );
};
