import React, { useState } from 'react';
import { useLibraryStore } from '../store/library';
import { useUIStore } from '../store/ui';
import { BookCard } from '../components/BookCard';
import { ProgressEdge } from '../components/ProgressEdge';
import { Marginalia } from '../components/Marginalia';
import { X, Flame, ScanText, Plus } from 'lucide-react';
import type { Note } from '../domain/types';

export const BookDetailOverlay: React.FC = () => {
  const activeBookId = useUIStore(state => state.activeBookId);
  const setActiveBookId = useUIStore(state => state.setActiveBookId);
  const setImmersiveOverlayOpen = useUIStore(state => state.setImmersiveOverlayOpen);
  const setOcrOverlayOpen = useUIStore(state => state.setOcrOverlayOpen);
  
  const books = useLibraryStore(state => state.books);
  const updateBook = useLibraryStore(state => state.updateBook);
  const addNote = useLibraryStore(state => state.addNote);
  
  const [newNoteText, setNewNoteText] = useState('');
  
  if (!activeBookId) return null;
  const book = books[activeBookId];
  if (!book) return null;

  const handleClose = () => setActiveBookId(null);
  const handleProgressChange = (page: number) => updateBook(book.id, { page });
  
  const handleAddNote = () => {
    if (!newNoteText.trim()) return;
    const note: Note = {
      id: crypto.randomUUID(),
      bookId: book.id,
      page: book.page,
      text: newNoteText.trim(),
      createdAt: Date.now()
    };
    addNote(note);
    setNewNoteText('');
  };

  const handleStartSession = () => {
    setImmersiveOverlayOpen(true);
  };

  return (
    <div className="absolute inset-0 z-50 bg-[var(--page)] flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="flex justify-between items-center px-6 py-4 pt-safe border-b border-[var(--border)]">
        <span className="eyebrow mt-1">Sanctuary Log</span>
        <button onClick={handleClose} className="p-2 -mr-2 text-[var(--muted)] hover:text-[var(--ink)]">
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto cozy-scroll p-6 pb-24">
        <BookCard book={book} variant="detail" />
        
        <div className="mt-8 mb-12">
          <ProgressEdge 
            page={book.page} 
            totalPages={book.totalPages} 
            editable={true} 
            onChange={handleProgressChange} 
          />
        </div>

        <div className="flex gap-4 mb-12">
          <button 
            onClick={handleStartSession}
            className="flex-1 py-4 flex items-center justify-center gap-2 rounded-lg bg-[var(--ink)] text-[var(--page)] font-sans uppercase tracking-widest text-sm transition-transform active:scale-95"
          >
            <Flame className="w-4 h-4" /> Enter Focus
          </button>
          <button 
            onClick={() => setOcrOverlayOpen(true)}
            className="px-6 py-4 flex items-center justify-center gap-2 rounded-lg border border-[var(--border)] text-[var(--ink)] font-sans uppercase tracking-widest text-sm transition-transform active:scale-95 hover:bg-[var(--surface-sunken)]"
          >
            <ScanText className="w-4 h-4" />
          </button>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h4 className="font-serif italic text-lg text-[var(--ink)]">Marginalia</h4>
          </div>

          <div className="relative">
            <textarea 
              value={newNoteText}
              onChange={(e) => setNewNoteText(e.target.value)}
              placeholder="Jot a thought, a quote, a fleeting impression..."
              className="w-full bg-[var(--surface-sunken)] border border-[var(--border)] rounded-lg p-4 min-h-[120px] font-serif text-[var(--ink)] placeholder:text-[var(--muted)] focus:outline-none focus:border-[var(--ember)] transition-colors resize-none"
            />
            <button 
              onClick={handleAddNote}
              disabled={!newNoteText.trim()}
              className="absolute bottom-4 right-4 p-2 rounded-full bg-[var(--ember)] text-white disabled:opacity-50 disabled:cursor-not-allowed transition-opacity hover:opacity-90"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <div className="flex flex-col gap-4 mt-4">
            {book.notes?.sort((a, b) => b.createdAt - a.createdAt).map(note => (
              <Marginalia key={note.id} note={note} />
            ))}
            {(!book.notes || book.notes.length === 0) && (
              <div className="text-center py-8 text-[var(--muted)] font-serif italic text-sm">
                No marginalia yet.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
