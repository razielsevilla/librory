import React from 'react';
import { Feather } from 'lucide-react';
import { clsx } from 'clsx';

interface ToastProps {
  message: string;
  isVisible: boolean;
}

export const Toast: React.FC<ToastProps> = ({ message, isVisible }) => {
  return (
    <div
      className={clsx(
        "absolute top-16 left-1/2 -translate-x-1/2 z-50 bg-stone-900/90 text-amber-100 border border-amber-900/25 px-5 py-2.5 rounded-full shadow-xl flex items-center gap-2 text-xs font-sans opacity-0 pointer-events-none transition-all duration-500",
        isVisible ? "opacity-100 translate-y-0" : "translate-y-[-10px]"
      )}
    >
      <Feather className="text-amber-500 w-4 h-4" />
      <span>{message}</span>
    </div>
  );
};
