'use client';

import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  leftIcon,
  className = '',
  id,
  ...props
}) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full flex flex-col gap-1.5">
      {label && (
        <label htmlFor={inputId} className="text-xs font-semibold uppercase tracking-wider text-terracotta-deep">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {leftIcon && <div className="absolute left-3.5 text-terracotta-deep/50 pointer-events-none">{leftIcon}</div>}
        <input
          id={inputId}
          className={`w-full bg-white border ${
            error ? 'border-red-500 focus:ring-red-500' : 'border-cream-dark focus:border-terracotta focus:ring-terracotta'
          } rounded-xl px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1 transition ${
            leftIcon ? 'pl-10' : ''
          } ${className}`}
          {...props}
        />
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
      {!error && helperText && <p className="text-xs text-terracotta-deep/60">{helperText}</p>}
    </div>
  );
};
