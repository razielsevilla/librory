import React from 'react';
import { clsx } from 'clsx';
import type { Settings } from '../domain/types';

interface PersonaChipProps {
  persona: Settings['persona'];
  onClick: () => void;
}

export const PersonaChip: React.FC<PersonaChipProps> = ({ persona, onClick }) => {
  const titles = {
    'deep-diver': 'The Deep Diver',
    'cross-pollinator': 'The Cross Pollinator',
    'aesthetic-wanderer': 'The Aesthetic Wanderer'
  };

  return (
    <button 
      onClick={onClick}
      className={clsx(
        "px-4 py-2 rounded-full border border-[var(--border)] font-sans text-sm uppercase tracking-widest transition-colors",
        "hover:bg-[var(--surface-sunken)] text-[var(--ink)] active:scale-95"
      )}
    >
      {titles[persona]}
    </button>
  );
};
