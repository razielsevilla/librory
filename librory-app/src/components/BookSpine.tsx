import React from 'react';
import type { Book } from '../domain/types';
import { clsx } from 'clsx';

interface BookSpineProps {
  book: Book;
  height: number;
  onClick: () => void;
}

export const BookSpine: React.FC<BookSpineProps> = ({ book, height, onClick }) => {
  const colors = [
    'bg-[#8b4513]', 'bg-[#a0522d]', 'bg-[#cd853f]', 'bg-[#d2691e]', 
    'bg-[#556b2f]', 'bg-[#2f4f4f]', 'bg-[#483d8b]', 'bg-[#800000]'
  ];
  const colorHash = book.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const bgColor = colors[colorHash % colors.length];

  return (
    <div 
      onClick={onClick}
      className={clsx(
        "relative flex items-center justify-center cursor-pointer shadow-md transition-transform hover:-translate-y-2 flex-shrink-0",
        bgColor
      )}
      style={{ height: `${height}px`, width: '44px', borderRadius: '2px 6px 6px 2px' }}
    >
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.05] mix-blend-overlay pointer-events-none"></div>
      <div className="absolute left-1 top-0 bottom-0 w-1 bg-black/10"></div>
      <div className="absolute right-1 top-0 bottom-0 w-px bg-white/10"></div>
      
      <div className="transform -rotate-90 whitespace-nowrap text-white/90 font-serif text-sm truncate absolute w-[200px] text-center origin-center">
        {book.title}
      </div>
      
      {book.status === 'reading' && (
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-6 bg-[var(--ember)] shadow-sm" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 80%, 0 100%)' }}></div>
      )}
    </div>
  );
};
