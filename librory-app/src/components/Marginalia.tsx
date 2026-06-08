import React from 'react';
import type { Note } from '../domain/types';
import { format } from 'date-fns';

interface MarginaliaProps {
  note: Note;
  onEdit?: () => void;
  onDelete?: () => void;
}

export const Marginalia: React.FC<MarginaliaProps> = ({ note, onEdit, onDelete }) => {
  return (
    <div className="relative p-6 rounded-lg bg-[var(--paper)] shadow-md border border-[var(--border)] group">
      <div className="flex justify-between items-start mb-4">
        <span className="font-serif italic text-sm text-[var(--muted)]">
          p. {note.page}
        </span>
        <span className="font-sans text-xs uppercase tracking-widest text-[var(--muted)]">
          {format(note.createdAt, 'MMM d, yyyy')}
        </span>
      </div>
      
      <p className="font-serif text-[var(--ink)] leading-relaxed whitespace-pre-wrap">
        {note.text}
      </p>

      {(onEdit || onDelete) && (
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
          {onEdit && <button onClick={onEdit} className="text-xs text-[var(--muted)] hover:text-[var(--ink)]">Edit</button>}
          {onDelete && <button onClick={onDelete} className="text-xs text-[var(--muted)] hover:text-red-800">Delete</button>}
        </div>
      )}
    </div>
  );
};
