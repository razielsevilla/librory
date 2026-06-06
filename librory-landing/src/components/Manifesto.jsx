import React from 'react';

export default function Manifesto() {
  return (
    <section id="philosophy" className="py-20 md:py-28 border-y transition-colors duration-500 border-line bg-[color-mix(in_srgb,var(--paper)_30%,transparent)]">
      <div className="max-w-[800px] mx-auto text-center animate-[rise_0.9s_ease_0.2s_forwards] opacity-0">
        <h2 className="text-3xl md:text-5xl font-display mb-8 leading-[1.3] text-ink">
          Your attention is a garden, not an engagement metric.
        </h2>
        <div className="space-y-6 text-lg text-muted">
          <p>
            When did reading become a competition? We built Librory because we believe books should be an escape from the exhausting digital treadmill, not an extension of it.
          </p>
          <p>
            There are no rigid reading goals here. No algorithms telling you what to read next. If you set a book down for three months, your reading flame simply waits for your return—gently glowing, totally free from judgment.
          </p>
        </div>
        <div className="mt-14 inline-block transform -rotate-3 hover:rotate-0 transition-transform duration-500">
          <div className="relative border border-line rounded-xl px-12 py-10 shadow-glow bg-[color-mix(in_srgb,var(--paper)_90%,transparent)] backdrop-blur-sm">
            <span className="absolute -top-4 -left-4 text-5xl text-accent opacity-30 font-display">"</span>
            <p className="font-script text-3xl leading-[1.2] text-ink max-w-sm">Slow down. Read at the speed of thought.</p>
            <span className="absolute -bottom-6 -right-4 text-5xl text-accent opacity-30 font-display rotate-180">"</span>
          </div>
        </div>
      </div>
    </section>
  );
}
