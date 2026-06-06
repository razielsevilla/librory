import React from 'react';

export default function Manifesto() {
  return (
    <section id="philosophy" className="py-20 md:py-28 border-y transition-colors duration-500" style={{ borderColor: 'var(--line)', background: 'color-mix(in srgb, var(--paper) 30%, transparent)' }}>
      <div className="max-w-4xl mx-auto px-5 text-center">
        <div className="font-sans text-[0.72rem] tracking-[0.16em] uppercase font-bold mb-5" style={{ color: 'var(--accent)' }}>The Librory Manifesto</div>
        <h2 className="font-display text-3xl md:text-5xl max-w-3xl mx-auto leading-[1.1] tracking-tight mb-6 font-bold" style={{ color: 'var(--ink)' }}>Your attention is a garden, not a manufacturing plant.</h2>
        <p className="text-base md:text-lg max-w-2xl mx-auto leading-[1.8]" style={{ color: 'var(--muted)' }}>Modern reading apps are built like step trackers for high-productivity executives. They gamify literature with hostile fire icons, leaderboard rankings, and push alerts that make you feel guilty for simply living your life. Librory believes reading is a retreat, not a race. When you step away for a week or a month, your reading spark doesn't die. It rests, waiting gracefully for you to open the cover.</p>
      </div>
    </section>
  );
}
