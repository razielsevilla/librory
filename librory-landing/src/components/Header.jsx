import React, { useState, useEffect } from 'react';

const themes = [
  { id: 'ambient-paper', label: 'Paper', letter: 'P' },
  { id: 'ambient-morning', label: 'Morning', letter: 'M' },
  { id: 'ambient-dusk', label: 'Dusk', letter: 'D' },
  { id: 'ambient-candle', label: 'Candle', letter: 'C' },
];

export default function Header() {
  const [theme, setTheme] = useState('ambient-paper');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-rule/50 backdrop-blur-md transition-colors duration-500 supports-[backdrop-filter]:bg-[color-mix(in_srgb,var(--page)_85%,transparent)] bg-[color-mix(in_srgb,var(--page)_98%,transparent)]">
      <div className="max-w-page mx-auto px-5 md:px-8 py-4 flex items-center justify-between gap-4">
        
        <a href="#top" className="flex flex-col items-center group cursor-pointer">
          <span className="w-full h-px bg-rule block mb-1 opacity-50 group-hover:opacity-100 transition-opacity"></span>
          <span className="text-[1.1rem] font-display italic tracking-[0.15em] uppercase transition-colors duration-500 text-ink">
            L I B R O R Y
          </span>
          <span className="w-full h-px bg-rule block mt-1 opacity-50 group-hover:opacity-100 transition-opacity"></span>
        </a>

        <div className="flex items-center gap-2">
          {themes.map(t => (
            <button
              key={t.id}
              onClick={() => setTheme(t.id)}
              title={t.label}
              aria-label={t.label}
              className={`w-6 h-6 flex items-center justify-center rounded-[1px] font-sans text-[0.65rem] font-bold transition-all duration-300 border shadow-sm ${
                theme === t.id
                  ? 'bg-ink text-page border-ink'
                  : 'bg-paper text-ink-soft border-rule-soft hover:bg-rule-soft'
              }`}
            >
              {t.letter}
            </button>
          ))}
        </div>

        <nav className="hidden md:flex items-center gap-8 font-sans text-eyebrow font-semibold">
          <a className="nav-link transition-colors text-muted hover:text-ink" href="#philosophy">Manifesto</a>
          <a className="nav-link transition-colors text-muted hover:text-ink" href="#technology">Technology</a>
          <a className="nav-link transition-colors text-muted hover:text-ink" href="#ember">Ember vs Streak</a>
        </nav>
        
        <div className="flex items-center gap-6">
          <div className="hidden lg:block font-sans text-[0.62rem] tracking-widest text-muted uppercase">
            Vol. I · Iss. 01 · 2026
          </div>
          <a href="#join" className="bracketed font-sans text-eyebrow font-bold transition-all duration-300 text-accent hover:text-ink hover:bg-paper px-3 py-1">
            Join Sanctuary
          </a>
        </div>

      </div>
    </header>
  );
}
