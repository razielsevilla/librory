import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="max-w-[62rem] mx-auto px-5 md:px-8 pt-[8rem] pb-[6rem] flex flex-col items-center text-center relative">
      <div className="animate-[rise_0.9s_ease_forwards] w-full flex flex-col items-center">
        
        <div className="absolute top-12 right-12 text-rule opacity-55 text-xl hidden md:block">✦</div>
        
        <div className="flex flex-col items-center mb-8">
          <span className="w-12 h-px bg-rule mb-4 block" />
          <div className="eyebrow">
            <span className="n-no">N° 01</span> — A QUIET PROLOGUE
          </div>
        </div>

        <div className="relative mb-8 w-full">
          <h1 className="text-h2-lg md:text-h1-xl font-display leading-[1.05] md:leading-[0.92] tracking-[-0.025em] font-bold text-ink mx-auto">
            Reclaim the<br/>
            quiet joy of a<br/>
            long-form mind.
          </h1>
          <div className="marginalia absolute -right-4 md:-right-8 top-16 rotate-[-3deg] hidden lg:block text-muted">
            breathe.
          </div>
        </div>

        <p className="max-w-2xl mx-auto text-dek italic font-serif text-ink-soft mb-12">
          A physical-first reading sanctuary for slow minds and gentle fires.
        </p>

        <div className="flex flex-col sm:flex-row gap-8 sm:items-center justify-center font-sans text-eyebrow font-bold mb-16">
          <a href="#technology" className="bracketed bg-accent text-ink hover:bg-ink hover:text-page transition-colors px-5 py-2.5">
            Explore the Sanctuary
          </a>
          <a href="#philosophy" className="inline-flex items-center gap-2 group transition-transform duration-300 hover:translate-x-1 text-accent">
            <span>Read Manifesto</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        <div className="flex flex-col items-center w-full max-w-[18rem] mx-auto">
          <span className="w-full h-px bg-rule mb-4 block" />
          <div className="font-sans text-[0.62rem] tracking-widest text-muted uppercase">
            Vol. I · Iss. 01 · Anno 2026 · The Sanctuary Press
          </div>
        </div>
        
      </div>
    </section>
  );
}
