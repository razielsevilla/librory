import React, { useState, useEffect } from 'react';
import { useUIStore } from '../store/ui';
import { useLibraryStore } from '../store/library';
import { Flame, Check } from 'lucide-react';
import type { Session } from '../domain/types';

export const ImmersiveOverlay: React.FC = () => {
  const immersiveOverlayOpen = useUIStore(state => state.immersiveOverlayOpen);
  const setImmersiveOverlayOpen = useUIStore(state => state.setImmersiveOverlayOpen);
  const activeBookId = useUIStore(state => state.activeBookId);
  const setCeremonyOverlayOpen = useUIStore(state => state.setCeremonyOverlayOpen);
  
  const books = useLibraryStore(state => state.books);
  const addSession = useLibraryStore(state => state.addSession);
  const updateEmber = useLibraryStore(state => state.updateEmber);
  const ember = useLibraryStore(state => state.ember);
  
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (immersiveOverlayOpen) {
      setStartedAt(Date.now());
      setElapsed(0);
    } else {
      setStartedAt(null);
    }
  }, [immersiveOverlayOpen]);

  useEffect(() => {
    if (!startedAt) return;
    const interval = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startedAt) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [startedAt]);

  if (!immersiveOverlayOpen || !activeBookId) return null;
  const book = books[activeBookId];
  if (!book) return null;

  const handleSeal = () => {
    const endedAt = Date.now();
    const session: Session = {
      id: crypto.randomUUID(),
      bookId: book.id,
      startedAt: startedAt!,
      endedAt,
      pagesRead: 0,
      seconds: elapsed
    };
    addSession(session);
    
    if (ember) {
      updateEmber({ ...ember, fuel: Math.min(100, ember.fuel + 25), lastIgnitedAt: Date.now() });
    }

    setImmersiveOverlayOpen(false);
    
    if (elapsed > 3) {
      setCeremonyOverlayOpen(true);
    }
  };

  const mins = Math.floor(elapsed / 60).toString().padStart(2, '0');
  const secs = (elapsed % 60).toString().padStart(2, '0');

  return (
    <div className="absolute inset-0 z-[60] bg-[var(--page)] flex flex-col items-center justify-center p-6 animate-in fade-in duration-700">
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.05] mix-blend-overlay pointer-events-none"></div>
      
      <div className="relative z-10 flex flex-col items-center max-w-sm text-center">
        <Flame className="w-16 h-16 text-[var(--ember)] animate-pulse mb-8 opacity-80" />
        
        <h2 className="text-3xl font-display text-[var(--ink)] mb-2">
          {book.title}
        </h2>
        <p className="font-serif italic text-[var(--muted)] mb-12">
          Sanctuary mode active
        </p>

        <div className="font-sans text-5xl tracking-widest text-[var(--ink)] mb-16 opacity-90 tabular-nums">
          {mins}:{secs}
        </div>

        <button 
          onClick={handleSeal}
          className="flex items-center gap-3 px-8 py-4 rounded-full border border-[var(--ember)] text-[var(--ember)] hover:bg-[var(--ember)] hover:text-[var(--paper)] transition-colors group"
        >
          <Check className="w-5 h-5" />
          <span className="font-sans uppercase tracking-widest text-sm">Seal Bookmark</span>
        </button>
      </div>
    </div>
  );
};
