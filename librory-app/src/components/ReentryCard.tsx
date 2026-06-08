import React from 'react';

interface ReentryCardProps {
  daysAway: number;
  onReenter: () => void;
}

export const ReentryCard: React.FC<ReentryCardProps> = ({ daysAway, onReenter }) => {
  return (
    <div className="p-8 rounded-xl bg-[var(--surface-sunken)] border border-[var(--border)] text-center shadow-inner flex flex-col items-center gap-4">
      <span className="text-3xl opacity-50">🕯️</span>
      <h3 className="font-serif-display text-2xl font-bold text-[var(--ink)]">
        The hearth has cooled.
      </h3>
      <p className="font-serif italic text-[var(--muted)]">
        It has been {daysAway} quiet {daysAway === 1 ? 'day' : 'days'} since your last visit.
      </p>
      <button 
        onClick={onReenter}
        className="mt-4 px-6 py-2 rounded-full border border-[var(--ember)] text-[var(--ember)] font-sans text-sm uppercase tracking-widest hover:bg-[var(--ember)] hover:text-[var(--paper)] transition-colors"
      >
        Rekindle
      </button>
    </div>
  );
};
