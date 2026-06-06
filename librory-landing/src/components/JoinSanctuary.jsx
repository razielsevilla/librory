import React from 'react';

export default function JoinSanctuary() {
  return (
    <section id="join" className="max-w-page mx-auto px-5 md:px-8 py-20 md:py-32 flex flex-col items-center text-center">
      
      <div className="text-xl text-rule mb-8 opacity-60">✦</div>
      
      <div className="eyebrow mb-8">
        <span className="n-no">N° 06</span> — COLOPHON
      </div>
      
      <h2 className="font-display text-h2-lg md:text-h1 leading-[1.0] md:leading-[0.96] tracking-[-0.02em] mb-12 text-ink max-w-measure mx-auto">
        A home where your books are waiting.
      </h2>
      
      <a 
        href="#top" 
        className="bracketed font-sans text-eyebrow font-bold uppercase transition-colors bg-accent text-ink hover:bg-ink hover:text-page px-6 py-3 mb-24"
      >
        Enter the Sanctuary
      </a>

      <div className="max-w-colophon mx-auto flex flex-col items-center font-sans text-[0.62rem] uppercase tracking-[0.2em] text-muted leading-[1.8]">
        <p>Librory · The Sanctuary Press · MMXXVI</p>
        <p>Printed in warm light.</p>
      </div>
      
    </section>
  );
}
