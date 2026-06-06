import React from 'react';

export default function Manifesto() {
  return (
    <section id="philosophy" className="py-20 md:py-32">
      <div className="max-w-page mx-auto px-5 md:px-8 grid grid-cols-1 md:grid-cols-12 gap-y-4 md:gap-x-8 animate-[rise_0.9s_ease_0.2s_forwards] opacity-0">
        
        {/* Eyebrow */}
        <div className="col-span-1 md:col-span-12 flex justify-between items-center mb-8 border-t border-rule pt-4">
          <div className="eyebrow">
            <span className="n-no">N° 02</span> — PHILOSOPHY
          </div>
          <div className="text-rule text-lg">❦</div>
        </div>

        {/* Headline */}
        <h2 className="col-span-1 md:col-span-7 text-h2 md:text-h1 font-display leading-[1.04] md:leading-[0.96] text-ink mb-12">
          Your attention is a garden, not an engagement metric.
        </h2>

        <div className="col-span-1 md:col-span-12 grid grid-cols-1 md:grid-cols-12 gap-x-8">
          {/* Body */}
          <div className="col-span-1 md:col-span-7 space-y-8 text-body text-ink">
            <p className="clearfix">
              <span className="drop-cap">W</span>hen did reading become a competition? We built Librory because we believe books should be an escape from the exhausting digital treadmill, not an extension of it.
            </p>
            <p className="italic text-ink-soft">
              There are no rigid reading goals here. No algorithms telling you what to read next. If you set a book down for three months, your reading flame simply waits for your return—gently glowing, totally free from judgment.
            </p>
            
            <div className="asterism">
              <span className="text-xl tracking-widest">* * *</span>
            </div>
          </div>

          {/* Marginalia */}
          <div className="hidden md:flex col-start-10 col-span-3 pt-12 justify-center">
            <div className="marginalia max-w-[10rem]">
              see also: candlelight, the unread, the dog-eared.
            </div>
          </div>
        </div>

        {/* Pull Quote */}
        <div className="col-span-1 md:col-start-3 md:col-span-8 mt-12 md:mt-20">
          <div className="pl-6 md:pl-10 py-2 border-l-[2px] border-accent">
            <p className="font-display italic text-3xl md:text-4xl leading-[1.15] text-ink mb-4">
              "Slow down. Read at the speed of thought."
            </p>
            <p className="font-sans text-caption font-bold tracking-widest uppercase text-muted">
              — Librory, N° 02
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
