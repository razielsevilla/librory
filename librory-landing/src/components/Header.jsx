import React from 'react';
import { BookOpen } from 'lucide-react';

export default function Header({ currentTheme, onThemeChange }) {
  const themes = [
    { id: 'default', label: 'Paper' },
    { id: 'ambient-morning', label: 'Morning' },
    { id: 'ambient-evening', label: 'Dusk' },
    { id: 'ambient-candle', label: 'Candle' }
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-line backdrop-blur-md transition-colors duration-500 bg-[color-mix(in_srgb,var(--page)_90%,transparent)]">
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-4 flex items-center justify-between gap-4">
        <a href="#top" className="flex items-center gap-2 group">
          <span className="w-8 h-8 rounded-full border border-accent bg-paper flex items-center justify-center transition-colors duration-500 overflow-hidden">
            <img src="/logo.png" alt="Librory Logo" className="w-full h-full object-cover" />
          </span>
          <span className="text-xl font-display font-semibold tracking-tight transition-colors duration-500 text-ink">Librory</span>
        </a>

        <div className="flex items-center gap-1 border border-line rounded-full p-1 transition-colors duration-500 bg-[color-mix(in_srgb,var(--paper)_70%,transparent)]">
          {themes.map(t => (
            <button
              key={t.id}
              onClick={() => onThemeChange(t.id)}
              className={`rounded-full px-2.5 py-1 text-[0.6rem] font-sans font-bold uppercase tracking-wider transition-all duration-300 ${
                currentTheme === t.id 
                  ? 'bg-ink text-paper' 
                  : 'text-muted hover:text-ink'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <nav className="hidden md:flex items-center gap-8 font-sans text-[0.72rem] tracking-widest uppercase font-semibold">
          <a className="nav-link transition-colors text-muted hover:text-ink" href="#philosophy">Manifesto</a>
          <a className="nav-link transition-colors text-muted hover:text-ink" href="#technology">Technology</a>
          <a className="nav-link transition-colors text-muted hover:text-ink" href="#ember">Ember vs Streak</a>
        </nav>
        <a href="#join" className="rounded-full px-5 py-2.5 font-sans text-[0.68rem] tracking-widest uppercase font-bold transition-all duration-300 shadow-glow bg-ink text-paper">Join Sanctuary</a>
      </div>
    </header>
  );
}
