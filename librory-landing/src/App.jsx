import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Manifesto from './components/Manifesto';
import ScannerSimulator from './components/ScannerSimulator';
import ThematicNetwork from './components/ThematicNetwork';
import EmberComparison from './components/EmberComparison';
import JoinSanctuary from './components/JoinSanctuary';

export default function App() {
  return (
    <div className="w-full overflow-hidden select-none">
      <Header />
      <main id="top">
        <Hero />
        <Manifesto />
        <ScannerSimulator />
        <ThematicNetwork />
        <EmberComparison />
        <JoinSanctuary />
      </main>

      <footer className="border-t border-line/80 py-10 transition-colors duration-500">
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
