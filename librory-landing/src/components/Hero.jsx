import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="max-w-7xl mx-auto px-5 md:px-8 pt-16 md:pt-24 pb-20 grid lg:grid-cols-[1.1fr_0.9fr] gap-14 lg:gap-20 items-center">
      <div className="animate-[rise_0.9s_ease_forwards]">
        <div className="font-sans text-[0.7rem] tracking-[0.16em] uppercase mb-5 font-bold text-accent">RESTORE YOUR COGNITIVE ATTENTION SPAN</div>
        <h1 className="text-5xl md:text-7xl font-display leading-[1.02] tracking-tight mb-6 font-bold text-ink">Reclaim the quiet joy of a long-form mind.</h1>
        <p className="max-w-xl text-lg md:text-xl leading-[1.65] mb-8 text-muted">Librory is a physical-first reading sanctuary. We don't ask you to log speed, optimize statistics, or maintain demanding streaks. Instead, we help you digitize your bookcase, connect hidden concepts across books, and keep your intellectual fire burning—gently.</p>
        
        <div className="flex flex-col sm:flex-row gap-4 sm:items-center font-sans text-[0.7rem] tracking-widest uppercase font-bold">
          <a href="#technology" className="inline-flex items-center justify-center rounded-full px-7 py-4 transition-all duration-300 shadow-glow bg-ink text-paper">Explore the Sanctuary</a>
          <a href="#philosophy" className="inline-flex items-center gap-2 group transition-transform duration-300 hover:translate-x-1 text-accent">
            <span>Read our Manifesto</span>
            <ArrowRight size={16}/>
          </a>
        </div>
      </div>

      <div className="relative animate-[rise_0.9s_ease_0.18s_forwards] opacity-0">
        <div className="rounded-[1.7rem] overflow-hidden aspect-[4/5] bg-neutral-200 shadow-glow-lg transition-shadow duration-800">
          <img loading="lazy" src="https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?q=80&w=1000&auto=format&fit=crop" alt="Sunlight streaming onto cozy stack of books on a desk" className="w-full h-full object-cover transition-all duration-700 hover:scale-[1.035] filter-[var(--hero-filter)]"/>
        </div>
        <div className="absolute -left-3 md:-left-10 bottom-8 max-w-[255px] p-5 rounded-[1rem] border border-line bg-[color-mix(in_srgb,var(--paper)_95%,transparent)] shadow-glow -rotate-2 hover:rotate-0 hover:scale-105 transition-all duration-400">
          <div className="w-[52px] h-[1px] bg-accent mb-4"></div>
          <p className="font-script text-2xl leading-[1.1] mb-3 text-ink">“A book is a heart that only beats in the chest of another.”</p>
          <p className="font-sans text-[0.62rem] tracking-[0.16em] uppercase text-accent">— Rebecca Solnit</p>
        </div>
      </div>
    </section>
  );
}
