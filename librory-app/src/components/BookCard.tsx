import React from 'react';
import type { Book } from '../domain/types';
import { clsx } from 'clsx';

interface BookCardProps {
  book: Book;
  variant: 'hearth' | 'shelf' | 'detail';
  onClick?: () => void;
}

export const BookCard: React.FC<BookCardProps> = ({ book, variant, onClick }) => {
  const percent = Math.round((book.page / book.totalPages) * 100) || 0;

  return (
    <div 
      onClick={onClick}
      className={clsx(
        "relative flex flex-col p-5 rounded-lg shadow-sm border border-[var(--border)] overflow-hidden cursor-pointer group bg-[var(--surface)] transition-all",
        variant === 'hearth' ? 'w-full max-w-sm' : 'w-full',
        variant === 'detail' ? 'border-none shadow-none bg-transparent p-0' : ''
      )}
    >
      {variant !== 'detail' && (
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay pointer-events-none"></div>
      )}
      
      <div className="relative z-10 flex flex-col gap-1">
        <h3 className={clsx(
          "font-display font-bold leading-tight text-[var(--ink)]",
          variant === 'detail' ? 'text-4xl' : 'text-2xl line-clamp-2'
        )}>
          {book.title}
        </h3>
        <p className="font-sans text-sm text-[var(--muted)]">{book.author}</p>
      </div>

      <div className="relative z-10 mt-6 flex items-center justify-between">
        <span className="font-sans text-xs tracking-widest uppercase text-[var(--muted)]">
          {percent}% Complete
        </span>
        <span className="font-serif italic text-sm text-[var(--ink)]">
          p. {book.page} / {book.totalPages}
        </span>
      </div>

      <div className="relative z-10 mt-2 h-1 w-full bg-[var(--surface-sunken)] rounded-full overflow-hidden">
        <div 
          className="h-full bg-[var(--ember)] transition-all duration-500 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>

      {variant !== 'detail' && book.status === 'reading' && (
        <div className="absolute top-0 right-6 w-6 h-12 shadow-md transform -translate-y-1 group-hover:translate-y-0 transition-transform duration-300" 
             style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 85%, 0 100%)', backgroundColor: 'var(--ember)' }} />
      )}
    </div>
  );
};
