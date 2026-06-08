import React from 'react';
import { clsx } from 'clsx';

interface PillSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
}

export const PillSwitch: React.FC<PillSwitchProps> = ({ checked, onChange, label }) => {
  return (
    <label className="flex items-center justify-between cursor-pointer group py-2">
      <span className="font-sans text-sm text-[var(--ink)]">{label}</span>
      <div className="relative">
        <input 
          type="checkbox" 
          className="sr-only" 
          checked={checked} 
          onChange={(e) => onChange(e.target.checked)} 
        />
        <div className={clsx(
          "w-10 h-6 rounded-full transition-colors duration-300 ease-in-out border border-[var(--border)]",
          checked ? "bg-[var(--ember)]" : "bg-[var(--surface-sunken)]"
        )}></div>
        <div className={clsx(
          "absolute top-1 left-1 bg-[var(--paper)] w-4 h-4 rounded-full transition-transform duration-300 ease-in-out shadow-sm",
          checked ? "transform translate-x-4" : ""
        )}></div>
      </div>
    </label>
  );
};
