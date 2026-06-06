import React from 'react';

export default function JoinSanctuary() {
  return (
    <section id="join" className="max-w-5xl mx-auto px-5 md:px-8 py-20 md:py-32 text-center">
      <div className="font-sans text-[0.7rem] tracking-[0.16em] uppercase font-bold mb-5 text-accent">
        Slow and Conscious Reading
      </div>
      
      <h2 className="font-display text-4xl md:text-6xl leading-[1.05] tracking-tight mb-5 font-bold text-ink">
        A home where your books are waiting.
      </h2>
      
      <p className="text-base md:text-lg max-w-2xl mx-auto leading-[1.75] mb-8 text-muted">
        Rediscover literature on your own human terms. Librory is completely private, 
        deeply intentional, and free to get started.
      </p>
      
      <a 
        href="#top" 
        className="inline-flex rounded-full px-8 py-4 font-sans text-[0.7rem] font-bold tracking-widest uppercase transition-all duration-300 shadow-glow hover:brightness-110 hover:-translate-y-0.5 bg-ink text-paper"
      >
        Enter the Sanctuary
      </a>
    </section>
  );
}
