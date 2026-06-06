import React, { useState } from 'react';
import { Flame, MoonStar } from 'lucide-react';

export default function EmberComparison() {
  const [days, setDays] = useState(3);
  const daysOfWeek = ['M', 'T', 'W', 'T', 'F', 'S', 'S', 'M', 'T', 'W', 'T', 'F', 'S', 'S'];

  // Calculate dynamic states derived from slider position
  const getEmberConfig = () => {
    if (days === 0) return {
      background: 'radial-gradient(circle, #FFFFFF 0%, #FFEFA6 20%, #FFA500 50%, #D35400 75%, transparent 88%)',
      filter: 'drop-shadow(0 0 55px rgba(255, 175, 40, 0.95))',
      transform: 'scale(1.28)',
      message: 'Your reading fire is burning bright!',
      duration: '1.4s'
    };
    if (days < 4) return {
      background: 'radial-gradient(circle, #FFE2B3 0%, #F5A85D 35%, #BD6D3C 65%, rgba(189,109,60,0.2) 80%, transparent 85%)',
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
    <section id="ember" className="max-w-7xl mx-auto px-5 md:px-8 py-24">
      <div className="max-w-3xl mb-12">
        <div className="font-sans text-[0.7rem] tracking-[0.16em] uppercase font-bold mb-4" style={{ color: 'var(--accent)' }}>Embers vs Streaks</div>
        <h2 className="font-display text-3xl md:text-5xl leading-[1.08] tracking-tight mb-5 font-bold" style={{ color: 'var(--ink)' }}>An elegant alternative to stressful gamification.</h2>
        <p className="leading-[1.75]" style={{ color: 'var(--muted)' }}>Streaks represent a brittle way of encouraging habits: missing one single day resets your score to zero and breeds discouragement. Librory replaces the aggressive fire streak with an "ember". An ember never resets; it simply glows softer when you're away, and brightens beautifully when you return.</p>
      </div>

      <div className="border p-3 md:p-4 rounded-[1.3rem] shadow-sm transition-colors duration-500" style={{ borderColor: 'var(--line)', background: 'color-mix(in srgb, var(--paper) 45%, transparent)' }}>
        <div className="grid md:grid-cols-2 rounded-[1rem] overflow-hidden min-h-[470px]">
          
          <div className="p-6 md:p-10 flex flex-col justify-between transition-colors duration-500 bg-white/20 dark:bg-black/10">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="font-sans text-[0.68rem] uppercase tracking-wider font-bold mb-2" style={{ color: 'var(--muted)' }}>The Gamified Streak Model</p>
                  <h3 className="text-3xl font-display font-bold tracking-tight">{Math.max(0, 12 - days)} day streak</h3>
                </div>
                <Flame color="#8C2C1B" size={24}/>
              </div>
              <p className="font-sans text-[0.65rem] font-bold uppercase tracking-wider mb-3" style={{ color: 'var(--muted)' }}>14-Day Calendar Tracker</p>
              
              <div className="grid grid-cols-7 gap-2 mb-8">
                {daysOfWeek.map((dayLabel, idx) => {
                  const isMissed = idx >= (14 - days);
                  return (
                    <div key={idx} className={`w-8 h-8 rounded border flex items-center justify-center font-sans text-[0.67rem] tracking-tighter font-semibold transition-all duration-300 ${
                      isMissed 
                        ? 'bg-[#8C2C1B] text-white border-[#8C2C1B] scale-90' 
                        : 'text-[var(--paper)]'
                    }`} style={{ background: !isMissed ? 'var(--accent)' : '', borderColor: !isMissed ? 'var(--accent)' : '' }}>
                      {isMissed ? (days >= 8 ? '×' : '!') : dayLabel}
                    </div>
                  );
                })}
              </div>

              <div className="border-l-2 pl-4 transition-all duration-300" style={{ borderColor: '#8C2C1B' }}>
                <p className="text-[1.05rem] font-medium opacity-90">{days < 3 ? 'Keep it up — consistency is everything.' : days < 8 ? 'You are slipping behind your goals.' : 'Your streak has expired. Start over.'}</p>
                <p className="text-[0.8rem] mt-1 opacity-70">Traditional apps punish a pause with guilt and visual countdowns, treating books like metric chores.</p>
              </div>
            </div>

            <div className="mt-8">
              <label className="block font-sans text-[0.68rem] uppercase tracking-wider font-bold mb-2" style={{ color: 'var(--muted)' }}>Simulate Days Away from Reading</label>
              <input type="range" min="0" max="14" value={days} onChange={(e) => setDays(Number(e.target.value))} className="w-full h-1.5 rounded-lg appearance-none cursor-pointer" style={{ accentColor: 'var(--accent)', background: 'var(--line)' }} />
              <div className="flex justify-between text-[0.65rem] font-sans font-bold uppercase tracking-wider mt-2" style={{ color: 'var(--muted)' }}>
                <span>0 days active</span><span>14 days away</span>
              </div>
            </div>
          </div>

          <div className="p-6 md:p-10 flex flex-col items-center justify-between text-center bg-[#1D1510] text-[#F8EFE6]">
            <div className="w-full flex items-center justify-between text-left opacity-60">
              <p className="font-sans text-[0.68rem] uppercase tracking-widest font-bold">The Librory Resilient Spark</p>
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
              <h3 className="text-3xl font-display font-bold tracking-tight mb-3">{config.message}</h3>
              <p className="text-sm max-w-xs mx-auto leading-[1.6] text-neutral-300">Your reading history isn't a scorecard. It's a refuge. When you are ready, simply open a book and gently blow the ash away.</p>
            </div>
          </div>

        </div>

        <p className="text-center text-[0.82rem] italic mt-5" style={{ color: 'var(--muted)' }}>
          Drag the comparison slider to explore how embers wait patiently compared to brittle streak metrics.
        </p>

      </div>
    </section>
  );
}
