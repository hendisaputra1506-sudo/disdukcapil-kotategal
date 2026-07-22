import React from 'react';
import { cn } from '../../utils/cn';

const variants = {
  primary: 'bg-blue-900 text-white hover:bg-blue-950 focus:ring-blue-900',
  secondary: 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 focus:ring-slate-200',
  danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-600',
  ghost: 'bg-transparent text-slate-700 hover:bg-slate-100 focus:ring-slate-200',
};

const sizes = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
  icon: 'p-2',
};

export function Button({
  className,
  variant = 'primary',
  size = 'md',
  type = 'button',
  disabled,
  children,
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={cn(
        'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
