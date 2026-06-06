import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="max-w-7xl mx-auto px-5 md:px-8 pt-16 md:pt-24 pb-20 grid lg:grid-cols-[1.1fr_0.9fr] gap-14 lg:gap-20 items-center">
      <div className="animate-[rise_0.9s_ease_forwards]">
        <div className="font-sans text-[0.7rem] tracking-[0.16em] uppercase mb-5 font-bold" style={{ color: 'var(--accent)' }}>RESTORE YOUR COGNITIVE ATTENTION SPAN</div>
        <h1 className="text-5xl md:text-7xl font-display leading-[1.02] tracking-tight mb-6 font-bold" style={{ color: 'var(--ink)' }}>Reclaim the quiet joy of a long-form mind.</h1>
        <p className="max-w-xl text-lg md:text-xl leading-[1.65] mb-8" style={{ color: 'var(--muted)' }}>Librory is a physical-first reading sanctuary. We don't ask you to log speed, optimize statistics, or maintain demanding streaks. Instead, we help you digitize your bookcase, connect hidden concepts across books, and keep your intellectual fire burning—gently.</p>
        
        <div className="flex flex-col sm:flex-row gap-4 sm:items-center font-sans text-[0.7rem] tracking-widest uppercase font-bold">
          <a href="#technology" className="inline-flex items-center justify-center rounded-full px-7 py-4 transition-all duration-300 shadow-md" style={{ background: 'var(--ink)', color: 'var(--paper)' }}>Explore the Sanctuary</a>
          <a href="#philosophy" className="inline-flex items-center gap-2 group transition-transform duration-300 hover:translate-x-1" style={{ color: 'var(--accent)' }}>
            <span>Read our Manifesto</span>
            <ArrowRight size={16}/>
          </a>
        </div>
      </div>

      <div className="relative animate-[rise_0.9s_ease_0.18s_forwards]">
        <div className="overflow-hidden rounded-[1.7rem] aspect-[4/5] shadow-2xl" style={{ boxShadow: '0 24px 60px var(--glow)' }}>
          <img src="https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?q=80&w=1000&auto=format&fit=crop" alt="Reading Desk" className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.035]" style={{ filter: 'var(--hero-filter)' }} />
        </div>
        <div className="absolute -left-3 md:-left-10 bottom-8 max-w-[255px] p-5 rounded-[1rem] border shadow-xl transition-all duration-500" style={{ borderColor: 'var(--line)', background: 'var(--paper)' }}>
          <div className="w-14 h-[1px] mb-4" style={{ background: 'var(--accent)' }}></div>
          <p className="font-script text-2xl leading-[1.1] mb-3" style={{ color: 'var(--ink)' }}>“A book is a heart that only beats in the chest of another.”</p>
          <p className="font-sans text-[0.62rem] tracking-wider uppercase font-bold" style={{ color: 'var(--accent)' }}>— Rebecca Solnit</p>
        </div>
      </div>
    </section>
  );
}
