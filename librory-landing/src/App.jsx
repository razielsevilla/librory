import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Manifesto from './components/Manifesto';
import ScannerSimulator from './components/ScannerSimulator';
import ThematicNetwork from './components/ThematicNetwork';
import EmberComparison from './components/EmberComparison';
import JoinSanctuary from './components/JoinSanctuary';

export default function App() {
  const [theme, setTheme] = useState('default');

  useEffect(() => {
    document.body.className = "w-full paper-texture";
    if (theme !== 'default') {
      document.body.classList.add(theme);
    }
  }, [theme]);

  return (
    <div className="w-full overflow-hidden select-none">
      <Header currentTheme={theme} onThemeChange={setTheme} />
      <main id="top">
        <Hero />
        <Manifesto />
        <ScannerSimulator />
        <ThematicNetwork />
        <EmberComparison />
        <JoinSanctuary />
      </main>

      <footer className="border-t border-line py-10 transition-colors duration-500 bg-[color-mix(in_srgb,var(--paper)_40%,transparent)]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row gap-4 items-center justify-between text-xs font-sans tracking-wide text-muted">
          <p>© 2026 Librory. Made with thoughtful care for slow minds everywhere.</p>
          <div className="flex gap-8 font-semibold">
            <a href="#philosophy" className="hover:text-ink transition-colors">Manifesto</a>
            <a href="#" className="hover:text-ink transition-colors">Privacy & Autonomy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
