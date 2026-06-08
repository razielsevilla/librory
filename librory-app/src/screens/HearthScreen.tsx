import React, { useMemo, useState, useRef } from 'react';
import { useLibraryStore } from '../store/library';
import { useUIStore } from '../store/ui';
import { useTheme } from '../design/ThemeProvider';
import { useHaptics } from '../lib/haptics';
import { useNavigate } from 'react-router-dom';

export default function HearthScreen() {
  const books = useLibraryStore(state => state.books);
  const ember = useLibraryStore(state => state.ember);
  const updateEmber = useLibraryStore(state => state.updateEmber);
  const setActiveBookId = useUIStore(state => state.setActiveBookId);
  const { lightImpact } = useHaptics();
  const navigate = useNavigate();
  
  const emberRef = useRef<HTMLDivElement>(null);
  
  const { setTheme } = useTheme();
  const [ambientMenuOpen, setAmbientMenuOpen] = useState(false);
  
  const activeBooks = useMemo(() => {
    return Object.values(books)
      .filter(b => b.status === 'reading')
      .sort((a, b) => b.addedAt - a.addedAt);
  }, [books]);
  
  const daysAway = useMemo(() => {
    if (!ember) return 0;
    const msAway = Date.now() - ember.lastIgnitedAt;
    return Math.floor(msAway / (1000 * 60 * 60 * 24));
  }, [ember]);

  const handleIgnite = () => {
    lightImpact();
    if (ember) {
      updateEmber({ ...ember, fuel: Math.min(100, ember.fuel + 5), lastIgnitedAt: Date.now() });
    }
    
    if (emberRef.current) {
      const emberNode = emberRef.current;
      
      emberNode.style.transform = 'scale(1.2)';
      emberNode.style.filter = 'drop-shadow(0 0 40px rgba(255, 175, 40, 0.6))';
      
      const spark = document.createElement('div');
      spark.className = 'absolute w-3 h-3 bg-white rounded-full opacity-80 mix-blend-screen pointer-events-none transition-all duration-1000 ease-out z-20';
      
      const angle = Math.random() * Math.PI * 2;
      const distance = 50 + Math.random() * 80;
      const tx = Math.cos(angle) * distance;
      const ty = Math.sin(angle) * distance - 40;
      
      spark.style.left = '50%';
      spark.style.top = '50%';
      spark.style.transform = 'translate(-50%, -50%)';
      spark.style.filter = 'drop-shadow(0 0 10px rgba(255, 200, 100, 1))';
      
      emberNode.parentElement?.appendChild(spark);
      
      requestAnimationFrame(() => {
          spark.style.transform = `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) scale(0)`;
          spark.style.opacity = '0';
      });
      
      setTimeout(() => spark.remove(), 1000);
      
      setTimeout(() => {
          emberNode.style.transform = 'scale(1)';
          emberNode.style.filter = 'drop-shadow(0 0 0px transparent)';
      }, 300);
    }
  };

  const handleReenter = () => {
    if (ember) {
      updateEmber({ ...ember, lastIgnitedAt: Date.now() });
    }
  };

  return (
    <section id="screen-hearth"
      className="absolute inset-0 flex flex-col p-6 overflow-y-auto cozy-scroll pb-24 z-10 transition-all duration-700 ambient-transition"
      style={{ backgroundColor: 'var(--page)', color: 'var(--ink)' }}>

      {/* Cozy Header */}
      <div className="flex justify-between items-start mt-2">
          <div>
              <span className="eyebrow block">Today's Refuge</span>
              <h1 className="text-4xl font-display font-bold mt-1 text-[var(--ink)]">The Hearth</h1>
          </div>

          {/* Manual Lighting override controls */}
          <div className="relative">
              <button onClick={() => setAmbientMenuOpen(!ambientMenuOpen)}
                  className="w-8 h-8 rounded-full bg-[var(--paper-deep)] border border-[var(--rule)] flex items-center justify-center shadow-sm hover:border-[var(--accent)] transition-all z-20 relative"
                  title="Lighting Menu">
                  <i className="fa-solid fa-lightbulb opacity-80 text-[var(--ink)]"></i>
              </button>
              <div id="ambientMenu" 
                  className={`absolute top-full right-0 mt-2 flex flex-col gap-1.5 p-1.5 rounded-full bg-[var(--paper-deep)] border border-[var(--rule)] shadow-glow transition-all duration-300 z-10 ${ambientMenuOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-[-10px] pointer-events-none'}`}>
                  <button onClick={() => { setTheme('paper'); setAmbientMenuOpen(false); }}
                      className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] transition-all hover:opacity-100 hover:bg-[var(--accent)] hover:text-[var(--page)]"
                      id="btn-paper" title="Classic Paper"><i className="fa-solid fa-scroll"></i></button>
                  <button onClick={() => { setTheme('morning'); setAmbientMenuOpen(false); }}
                      className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] transition-all hover:opacity-100 hover:bg-[var(--accent)] hover:text-[var(--page)]"
                      id="btn-morning" title="Morning Light"><i className="fa-solid fa-cloud-sun"></i></button>
                  <button onClick={() => { setTheme('dusk'); setAmbientMenuOpen(false); }}
                      className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] transition-all hover:opacity-100 hover:bg-[var(--accent)] hover:text-[var(--page)]"
                      id="btn-dusk" title="Golden Dusk"><i className="fa-solid fa-cloud-moon"></i></button>
                  <button onClick={() => { setTheme('candle'); setAmbientMenuOpen(false); }}
                      className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] transition-all hover:opacity-100 hover:bg-[var(--accent)] hover:text-[var(--page)]"
                      id="btn-candle" title="Candle Sanctuary"><i className="fa-solid fa-fire-flame-curved"></i></button>
              </div>
          </div>
      </div>

      <div className="dingbat-row my-8">❦</div>

      {/* The Interactive Ember Component */}
      <div className="rounded-3xl p-6 flex flex-col items-center justify-center text-center relative bg-[var(--paper-deep)] border border-[var(--rule)] shadow-glow mb-10 transition-colors duration-700">
          {/* Landing Page Ember Visual */}
          <div className="relative w-full flex items-center justify-center py-8 mb-4 cursor-pointer" onClick={handleIgnite}>
              <div className="absolute w-[200px] h-[200px] rounded-full bg-gradient-to-r from-[rgba(255,165,0,0.1)] to-transparent pointer-events-none"></div>
              <div ref={emberRef} className="transition-all duration-500 flex items-center justify-center relative">
                  <div id="emberGraphic" className="w-[120px] h-[120px] rounded-full animate-orb-pulse" style={{
                      background: 'radial-gradient(circle, #FFFFFF 0%, #FFEFA6 20%, #FFA500 50%, var(--ember) 75%, transparent 88%)',
                      filter: 'drop-shadow(0 0 55px rgba(255, 175, 40, 0.95))'
                  }}></div>
              </div>
          </div>

          <h3 className="font-display text-lg font-bold mt-2" style={{ color: 'var(--ink)' }}>The Reading Fire Is Steady</h3>
          <p id="emberTip"
              className="text-xs mt-1.5 leading-relaxed opacity-75 font-sans max-w-[260px]">
              Your progress glows warmly. Tap the fire to fan its embers. Zero penalties for resting.
          </p>
      </div>

      {/* Re-Entry Nudge Card Component */}
      <div id="reentryCard"
          className="rounded-2xl p-6 border border-[var(--rule)] bg-[var(--paper-deep)] flex flex-col gap-4 relative shadow-glow mb-10 transition-all duration-500">
          <span className="eyebrow text-[var(--accent)]"><i className="fa-solid fa-compass mr-1.5"></i> Gentle
              Return</span>

          <div className="text-sm leading-relaxed">
              <span className="drop-cap">L</span>ife gets crowded, and we completely understand. You have been
              away for {daysAway > 2 ? daysAway : 4} quiet days. Would you like to sit down with just <strong
                  className="text-[var(--accent)]">2 pages</strong> of your current book today?
          </div>

          {/* Thematic Callback (Remembrance Engine) */}
          <div className="mt-1 p-4 bg-[var(--rule-soft)] rounded-xl border border-[var(--rule)] opacity-90 relative shadow-sm">
              <i className="fa-solid fa-quote-left absolute top-3 right-4 text-3xl opacity-5 text-[var(--accent)]"></i>
              <p className="text-[9px] font-sans uppercase tracking-widest text-[var(--muted)] mb-1.5">A thought from 3 months ago</p>
              <p className="text-xs font-serif italic text-[var(--ink)] leading-relaxed">"William Stoner learns how to suffer in pure silence."</p>
              <p className="text-[10px] font-sans mt-3 opacity-80 text-[var(--accent)] font-semibold">Perhaps <span className="italic">Dune</span> echoes this today?</p>
          </div>

          <div className="flex flex-col gap-2 pt-2 font-sans text-[13px] mt-1 w-full">
              <button onClick={handleReenter}
                  className="w-full py-2.5 rounded-lg bg-[var(--accent)] hover:opacity-90 font-semibold shadow-sm transition-all"
                  style={{ color: 'var(--page)' }}>
                  I am ready for 2 pages
              </button>
              <button onClick={handleReenter} className="w-full py-2 opacity-60 hover:opacity-100 transition-opacity italic font-serif">
                  I will return when the time is right
              </button>
          </div>
      </div>

      <hr className="border-t border-[var(--rule)] opacity-50 w-24 mx-auto mb-10" />

      {/* Currently Reading items list */}
      <div className="space-y-4">
          <div className="flex justify-between items-baseline">
              <span className="eyebrow">Active Sanctuary</span>
              <button onClick={() => navigate('/shelf')} className="text-xs italic hover:underline opacity-85">See Full Shelf</button>
          </div>

          <div className="grid grid-cols-2 gap-4">
              {activeBooks.slice(0, 2).map((book, index) => {
                  const percent = Math.round((book.page / book.totalPages) * 100) || 0;
                  const bgColor = index === 0 ? '#2e2219' : '#1a233a';
                  const textColor1 = index === 0 ? '#f5ecd2' : '#d2e0f5';
                  const textColor2 = index === 0 ? '#bda67a' : '#7a9bbd';

                  return (
                    <div key={book.id} onClick={() => setActiveBookId(book.id)}
                        className="rounded-2xl p-4 bg-[var(--paper-deep)] border border-[var(--rule)] hover:border-[var(--accent)] shadow-glow transition-all duration-300 flex flex-col justify-between cursor-pointer relative group">
                        <div
                            className="h-36 rounded-lg shadow-inner mb-4 flex flex-col justify-end p-3 relative overflow-hidden" style={{ backgroundColor: bgColor }}>
                            {/* Linen Noise Texture */}
                            <div className="absolute inset-0 opacity-10 mix-blend-overlay" style={{ backgroundImage: `url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')` }}></div>
                            {/* Spine Shadow */}
                            <div className="absolute left-0 top-0 w-2.5 h-full bg-gradient-to-r from-black/60 to-transparent"></div>
                            {/* Bookmark Ribbon */}
                            <div className="absolute top-0 right-4 w-2 h-12 bg-[var(--accent)] shadow-md rounded-b-sm z-10 opacity-90 group-hover:h-14 transition-all duration-300"></div>
                            
                            <span className="font-display text-base font-bold bg-clip-text text-transparent relative z-20" style={{ backgroundImage: `linear-gradient(to bottom right, ${textColor1}, ${textColor2})` }}>{book.title}</span>
                            <span
                                className="text-[10px] font-sans font-semibold relative z-20 tracking-wider uppercase" style={{ color: `${textColor1}99` }}>{book.author}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <span className="eyebrow block text-[9px] opacity-70">Bookmarks</span>
                                <span className="text-xs font-display font-bold mt-0.5 text-[var(--accent)]">{percent}%</span>
                            </div>
                            <span className="text-[10px] font-sans opacity-60">p. {book.page}</span>
                        </div>
                    </div>
                  );
              })}
          </div>
          
          {activeBooks.length === 0 && (
            <div className="text-center py-12">
              <p className="font-serif italic text-[var(--muted)]">
                Your hearth awaits its first spark.
              </p>
            </div>
          )}
      </div>

    </section>
  );
}
