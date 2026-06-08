import React, { useState, useMemo } from 'react';
import { useLibraryStore } from '../store/library';
import { useUIStore } from '../store/ui';
import { BookSpine } from '../components/BookSpine';
import { BookForm } from '../components/BookForm';
import { Plus } from 'lucide-react';
import { clsx } from 'clsx';
import { Reorder } from 'framer-motion';

export default function ShelfScreen() {
  const books = useLibraryStore(state => state.books);
  const setActiveBookId = useUIStore(state => state.setActiveBookId);
  const [filter, setFilter] = useState<'all' | 'reading' | 'unread' | 'paused' | 'completed'>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const allBooks = useMemo(() => Object.values(books).sort((a, b) => b.addedAt - a.addedAt), [books]);
  const displayBooks = useMemo(() => {
    if (filter === 'all') return allBooks;
    return allBooks.filter(b => b.status === filter);
  }, [allBooks, filter]);

  const [orderedBooks, setOrderedBooks] = useState(displayBooks);
  
  React.useEffect(() => {
    setOrderedBooks(displayBooks);
  }, [displayBooks]);

  const filters = ['all', 'reading', 'unread', 'paused', 'completed'] as const;

  return (
    <div className="flex flex-col h-full pt-safe animate-in fade-in duration-500">
      <div className="flex flex-col px-6 pt-6 pb-2 border-b border-[var(--border)] shrink-0">
        <div className="flex justify-between items-center mb-6">
          <h1 className="font-serif-display text-3xl text-[var(--ink)]">Your Shelf</h1>
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="p-2 rounded-full border border-[var(--border)] hover:bg-[var(--surface-sunken)] transition-colors"
          >
            <Plus className="w-5 h-5 text-[var(--ink)]" />
          </button>
        </div>

        <div className="flex gap-4 overflow-x-auto cozy-scroll pb-2">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={clsx(
                "px-4 py-2 rounded-full font-sans text-xs uppercase tracking-widest whitespace-nowrap transition-colors border",
                filter === f 
                  ? "bg-[var(--ink)] text-[var(--page)] border-[var(--ink)]" 
                  : "border-[var(--border)] text-[var(--muted)] hover:text-[var(--ink)] hover:border-[var(--muted)]"
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto cozy-scroll p-6 pb-24">
        {orderedBooks.length > 0 ? (
          <div className="w-full flex justify-center">
            <div className="w-full max-w-2xl bg-[var(--surface-sunken)] p-4 rounded-xl border border-[var(--border)] shadow-inner">
              <Reorder.Group 
                axis="x" 
                values={orderedBooks} 
                onReorder={setOrderedBooks} 
                className="flex flex-wrap gap-2 min-h-[160px] items-end pb-2 border-b-[8px] border-[var(--ink-soft)]"
                style={{ touchAction: 'none' }}
              >
                {orderedBooks.map((book) => {
                  const height = Math.max(120, Math.min(200, 100 + (book.totalPages / 10)));
                  return (
                    <Reorder.Item key={book.id} value={book} className="cursor-grab active:cursor-grabbing">
                      <BookSpine 
                        book={book} 
                        height={height} 
                        onClick={() => setActiveBookId(book.id)} 
                      />
                    </Reorder.Item>
                  );
                })}
              </Reorder.Group>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center opacity-50">
            <span className="text-4xl mb-4">📚</span>
            <p className="font-serif italic text-[var(--muted)]">No volumes found.</p>
          </div>
        )}
      </div>

      {isAddModalOpen && <BookForm onClose={() => setIsAddModalOpen(false)} />}
    </div>
  );
}
