import React, { useState } from 'react';
import { MoonStar } from 'lucide-react';

export default function EmberComparison() {
  const [days, setDays] = useState(3);
  const daysOfWeek = ['M', 'T', 'W', 'T', 'F', 'S', 'S', 'M', 'T', 'W', 'T', 'F', 'S', 'S'];

  // Calculate dynamic states derived from slider position
  const getEmberConfig = () => {
    if (days === 0) return {
      background: 'radial-gradient(circle, #FFFFFF 0%, #FFEFA6 20%, #FFA500 50%, var(--ember) 75%, transparent 88%)',
      filter: 'drop-shadow(0 0 55px rgba(255, 175, 40, 0.95))',
      transform: 'scale(1.28)',
      message: 'Your reading fire is burning bright!',
      duration: '1.4s'
    };
    if (days < 4) return {
      background: 'radial-gradient(circle, #FFE2B3 0%, #F5A85D 35%, var(--ember) 65%, rgba(189,109,60,0.2) 80%, transparent 85%)',
      filter: `drop-shadow(0 0 ${35 - days * 3}px rgba(230, 145, 82, 0.65))`,
      transform: `scale(${1.05 - days * 0.05})`,
      message: 'Your ember is glowing warmly.',
      duration: '3.2s'
    };
    if (days < 9) return {
      background: 'radial-gradient(circle, #E59866 0%, #A04000 45%, #5E2602 75%, transparent 85%)',
      filter: `drop-shadow(0 0 ${20 - days}px rgba(160, 64, 0, 0.45))`,
      transform: `scale(${0.85 - days * 0.03})`,
      message: 'Your ember is quiet, but waiting.',
      duration: '5.5s'
    };
    return {
      background: 'radial-gradient(circle, #78281F 0%, #4A1E17 35%, #1F100B 70%, transparent 85%)',
      filter: 'drop-shadow(0 0 8px rgba(120, 40, 31, 0.3))',
      transform: 'scale(0.52)',
      message: 'It only needs a little breath.',
      duration: '8.5s'
    };
  };

  const config = getEmberConfig();

  return (
    <section id="ember" className="max-w-page mx-auto px-5 md:px-8 py-24">
      <div className="max-w-3xl mb-12">
        <div className="eyebrow mb-6">
          <span className="n-no">N° 05</span> — EMBER
        </div>
        <h2 className="font-display text-h3 md:text-h2 leading-[1.08] tracking-tight mb-5 text-ink">An elegant alternative to stressful gamification.</h2>
        <div className="flex items-center gap-4 text-rule my-6">
          <span className="w-12 h-px bg-rule block" />
          <span className="text-accent text-sm">✦</span>
          <span className="w-12 h-px bg-rule block" />
        </div>
        <p className="font-serif text-body italic leading-[1.75] mb-8 text-ink-soft">Streaks represent a brittle way of encouraging habits: missing one single day resets your score to zero and breeds discouragement. Librory replaces the aggressive fire streak with an "ember". An ember never resets; it simply glows softer when you're away, and brightens beautifully when you return.</p>
      </div>

      <div className="border-y border-rule py-[4px] transition-colors duration-500">
        <div className="border-y border-rule grid md:grid-cols-2 min-h-[470px]">
          
          <div className="p-6 md:p-10 flex flex-col justify-between bg-paper border-r border-rule-soft/50">
            <div>
              <div className="flex items-center justify-between mb-8">
                <div>
                  <p className="eyebrow mb-2">The Gamified Streak Model</p>
                  <h3 className="text-h3 font-display tracking-tight text-ink">{Math.max(0, 12 - days)} day streak</h3>
                </div>
              </div>
              
              <div className="grid grid-cols-7 gap-2 mb-8 border-b border-rule-soft pb-8">
                {daysOfWeek.map((dayLabel, idx) => {
                  const isMissed = idx >= (14 - days);
                  return (
                    <div key={idx} className={`w-10 h-10 border flex items-center justify-center transition-all duration-300 ${
                      isMissed 
                        ? 'border-rule-soft bg-page text-muted opacity-70' 
                        : 'border-accent bg-[color-mix(in_srgb,var(--accent)_10%,transparent)] text-ink'
                    }`}>
                      {isMissed ? (
                        <span className="font-script text-[1.8rem] text-muted -rotate-[5deg] leading-none mt-2">
                          {days >= 8 ? '×' : '!'}
                        </span>
                      ) : (
                        <span className="font-serif text-lg text-ink">{dayLabel}</span>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="border-l-[2px] pl-4 transition-all duration-300 border-rule text-ink mt-6">
                <p className="font-serif text-[1.05rem] opacity-90 mb-2">{days < 3 ? 'Keep it up — consistency is everything.' : days < 8 ? 'You are slipping behind your goals.' : 'Your streak has expired. Start over.'}</p>
                <p className="font-sans text-caption opacity-70">Traditional apps punish a pause with guilt and visual countdowns, treating books like metric chores.</p>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-rule-soft">
              <div className="flex justify-between items-end font-serif text-caption italic text-muted mb-2 px-1">
                <span>0</span>
                <span className="font-display italic text-ink text-xl">{days} days away</span>
                <span>14</span>
              </div>
              <input type="range" min="0" max="14" value={days} onChange={(e) => setDays(Number(e.target.value))} className="w-full h-px appearance-none cursor-pointer bg-rule accent-accent" />
            </div>
          </div>

          <div className="p-6 md:p-10 flex flex-col items-center justify-between text-center bg-[#1D1510] text-[#F8EFE6]">
            <div className="w-full flex items-center justify-between text-left opacity-60">
              <p className="font-sans text-eyebrow text-[#F8EFE6]">The Librory Resilient Spark</p>
              <MoonStar color="#D09355" size={22}/>
            </div>
            <div className="relative flex items-center justify-center py-8">
              <div className="absolute w-[280px] h-[280px] rounded-full bg-gradient-to-r from-orange-900/10 to-transparent pointer-events-none"></div>
              <div className="w-[150px] h-[150px] rounded-full transition-all duration-500 animate-[pulse_infinite_ease-in-out]" style={{ 
                background: config.background, 
                filter: config.filter, 
                transform: config.transform, 
                animationDuration: config.duration 
              }}></div>
            </div>
            <div>
              <h3 className="text-h3 font-display tracking-tight mb-4 text-[#F8EFE6]">{config.message}</h3>
              <p className="text-body font-serif max-w-xs mx-auto leading-[1.6] text-neutral-400">Your reading history isn't a scorecard. It's a refuge. When you are ready, simply open a book and gently blow the ash away.</p>
            </div>
          </div>

        </div>
      </div>

      <div className="dingbat-row">
        <span>✦</span>
        <span>§</span>
        <span>✦</span>
      </div>

    </section>
  );
}
