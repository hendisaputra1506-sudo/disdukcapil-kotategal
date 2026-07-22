import React, { useEffect } from 'react';
import { cn } from '../../utils/cn';

export function Modal({ isOpen, onClose, title, children, className }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal panel */}
      <div 
        className={cn(
          "relative z-50 w-full max-w-md transform overflow-hidden rounded-lg bg-white shadow-xl transition-all",
          className
        )}
      >
        {title && (
          <div className="border-b border-slate-200 px-6 py-4">
            <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
          </div>
        )}
        <div className="px-6 py-4">
          {children}
        </div>
      </div>
    </div>
  );
}
