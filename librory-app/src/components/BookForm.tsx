import React, { useState } from 'react';
import { useLibraryStore } from '../store/library';
import { X } from 'lucide-react';
import type { Book } from '../domain/types';

export const BookForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const addBook = useLibraryStore(state => state.addBook);
  
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [totalPages, setTotalPages] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !author || !totalPages) return;
    
    const newBook: Book = {
      id: crypto.randomUUID(),
      title,
      author,
      page: 0,
      totalPages: parseInt(totalPages, 10),
      status: 'unread',
      coverColor: '#000000',
      notes: [],
      tags: [],
      addedAt: Date.now()
    };
    
    addBook(newBook);
    onClose();
  };

  return (
    <div className="absolute inset-0 z-[60] bg-black/40 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-6 animate-in fade-in duration-300">
      <div className="w-full max-w-md bg-[var(--paper)] rounded-t-2xl sm:rounded-2xl p-6 shadow-xl border border-[var(--border)] animate-in slide-in-from-bottom-8 sm:slide-in-from-bottom-0 sm:zoom-in-95 duration-300">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-display text-2xl text-[var(--ink)]">Add Volume</h2>
          <button onClick={onClose} className="p-2 -mr-2 text-[var(--muted)] hover:text-[var(--ink)]">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label className="eyebrow block mb-2 mt-1">Title</label>
            <input 
              autoFocus
              type="text" 
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full bg-[var(--surface-sunken)] border border-[var(--border)] rounded-lg px-4 py-3 font-serif text-[var(--ink)] focus:outline-none focus:border-[var(--ember)] transition-colors"
              placeholder="e.g. The Overstory"
            />
          </div>
          <div>
            <label className="eyebrow block mb-2 mt-1">Author</label>
            <input 
              type="text" 
              value={author}
              onChange={e => setAuthor(e.target.value)}
              className="w-full bg-[var(--surface-sunken)] border border-[var(--border)] rounded-lg px-4 py-3 font-serif text-[var(--ink)] focus:outline-none focus:border-[var(--ember)] transition-colors"
              placeholder="e.g. Richard Powers"
            />
          </div>
          <div>
            <label className="eyebrow block mb-2 mt-1">Total Pages</label>
            <input 
              type="number" 
              value={totalPages}
              onChange={e => setTotalPages(e.target.value)}
              className="w-full bg-[var(--surface-sunken)] border border-[var(--border)] rounded-lg px-4 py-3 font-serif text-[var(--ink)] focus:outline-none focus:border-[var(--ember)] transition-colors"
              placeholder="e.g. 512"
            />
          </div>

          <button 
            type="submit"
            disabled={!title || !author || !totalPages}
            className="mt-4 w-full py-4 rounded-lg bg-[var(--ink)] text-[var(--page)] font-sans uppercase tracking-widest text-sm transition-transform active:scale-95 disabled:opacity-50 disabled:active:scale-100"
          >
            Catalog
          </button>
        </form>
      </div>
    </div>
  );
};
