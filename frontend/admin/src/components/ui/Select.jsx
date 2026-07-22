import React, { forwardRef } from 'react';
import { cn } from '../../utils/cn';

export const Select = forwardRef(({ className, label, error, helperText, children, ...props }, ref) => {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-semibold text-slate-900">
          {label} {props.required && <span className="text-red-600">*</span>}
        </label>
      )}
      <select
        ref={ref}
        className={cn(
          'flex h-10 w-full appearance-none rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent disabled:cursor-not-allowed disabled:bg-slate-100 disabled:opacity-50 transition-colors',
          error && 'border-red-500 focus:ring-red-500',
          className
        )}
        {...props}
      >
        {children}
      </select>
      {error && <span className="text-xs text-red-600">{error}</span>}
      {!error && helperText && <span className="text-xs text-slate-500">{helperText}</span>}
    </div>
  );
});

Select.displayName = 'Select';
