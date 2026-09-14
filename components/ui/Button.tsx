'use client';

import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none';

  const variants = {
    primary: 'bg-terracotta hover:bg-terracotta-dark text-white focus:ring-terracotta shadow-md hover:shadow-lg active:scale-[0.98]',
    secondary: 'bg-cream-dark hover:bg-cream-dark/80 text-terracotta-deep focus:ring-terracotta-deep active:scale-[0.98]',
    outline: 'border-2 border-terracotta text-terracotta hover:bg-terracotta hover:text-white focus:ring-terracotta active:scale-[0.98]',
    ghost: 'text-terracotta-deep hover:bg-cream-dark/40 focus:ring-terracotta-deep',
    danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500 shadow-md active:scale-[0.98]',
  };

  const sizes = {
    sm: 'px-3.5 py-1.5 text-xs gap-1.5',
    md: 'px-5 py-2.5 text-sm gap-2',
    lg: 'px-7 py-3.5 text-base gap-2.5',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="spinner" style={{ width: '16px', height: '16px', borderWidth: '2px', borderColor: 'currentColor', borderTopColor: 'transparent' }} />
      ) : (
        leftIcon
      )}
      <span>{children}</span>
      {!isLoading && rightIcon}
    </button>
  );
};
