import { useMemo } from 'react';
import { useLibraryStore } from '../store/library';
import { useUIStore } from '../store/ui';
import { EmberGraphic } from '../components/EmberGraphic';
import { ReentryCard } from '../components/ReentryCard';
import { BookCard } from '../components/BookCard';
import { useHaptics } from '../lib/haptics';

export default function HearthScreen() {
  const books = useLibraryStore(state => state.books);
  const ember = useLibraryStore(state => state.ember);
  const updateEmber = useLibraryStore(state => state.updateEmber);
  const setActiveBookId = useUIStore(state => state.setActiveBookId);
  const { lightImpact } = useHaptics();
  
  const activeBooks = useMemo(() => {
    return Object.values(books)
      .filter(b => b.status === 'reading')
      .sort((a, b) => b.addedAt - a.addedAt);
  }, [books]);
  
  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 5) return 'The night is still.';
    if (hour < 12) return 'A quiet morning.';
    if (hour < 17) return 'The afternoon wanes.';
    if (hour < 21) return 'Evening falls.';
    return 'The night deepens.';
  }, []);

  const daysAway = useMemo(() => {
    if (!ember) return 0;
    const msAway = Date.now() - ember.lastIgnitedAt;
    return Math.floor(msAway / (1000 * 60 * 60 * 24));
  }, [ember]);

  const handleIgnite = () => {
    lightImpact();
    if (ember) {
      updateEmber({ ...ember, fuel: Math.min(100, ember.fuel + 5), lastIgnitedAt: Date.now() });
    }
  };

  const handleReenter = () => {
    if (ember) {
      updateEmber({ ...ember, lastIgnitedAt: Date.now() });
    }
  };

  return (
    <div className="flex flex-col min-h-full p-6 pb-24 pt-safe animate-in fade-in duration-500">
      <div className="flex flex-col items-center justify-center text-center mt-8 mb-12">
        <span className="eyebrow mb-2">Sanctuary</span>
        <h1 className="font-serif-display text-4xl text-[var(--ink)] mb-8">
          {greeting}
        </h1>
        
        {daysAway > 2 ? (
          <ReentryCard daysAway={daysAway} onReenter={handleReenter} />
        ) : (
          <EmberGraphic 
            fuel={ember?.fuel ?? 50} 
            dimFactor={0}
            onClick={handleIgnite} 
          />
        )}
      </div>

      {activeBooks.length > 0 ? (
        <div className="flex flex-col items-center gap-6 w-full">
          {activeBooks.slice(0, 2).map(book => (
            <BookCard 
              key={book.id} 
              book={book} 
              variant="hearth" 
              onClick={() => setActiveBookId(book.id)} 
            />
          ))}
          {activeBooks.length > 2 && (
            <p className="text-sm font-serif italic text-[var(--muted)] mt-2">
              ...and {activeBooks.length - 2} more on the shelf.
            </p>
          )}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="font-serif italic text-[var(--muted)]">
            Your hearth awaits its first spark.
          </p>
        </div>
      )}
    </div>
  );
}
