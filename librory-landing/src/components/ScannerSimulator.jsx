import React, { useState } from 'react';
import { Scan } from 'lucide-react';

export default function ScannerSimulator() {
  const [step, setStep] = useState(-1); // -1 = idle
  const labels = ["1. Edges", "2. Hough Transform", "3. Deskew Alignment", "4. Match Spines"];
  const books = [
    { name: "The Overstory", left: "14%", top: "28%" },
    { name: "Braiding Sweetgrass", left: "35%", top: "38%" },
    { name: "Briefly Gorgeous", left: "56%", top: "20%" },
    { name: "Midnight Library", left: "78%", top: "42%" }
  ];

  const handleScan = () => {
    setStep(0);
    let current = 0;
    const interval = setInterval(() => {
      current++;
      setStep(current);
      if (current >= 3) {
        clearInterval(interval);
      }
    }, 750);
  };

  return (
    <section id="technology" className="max-w-7xl mx-auto px-5 md:px-8 py-24">
      <div className="grid lg:grid-cols-[0.88fr_1.12fr] gap-12 lg:gap-20 items-center">
        <div>
          <div className="font-sans text-[0.7rem] tracking-[0.16em] uppercase font-bold mb-4 text-accent">Physical Bookcase Intelligence</div>
          <h2 className="font-display text-3xl md:text-5xl leading-[1.08] tracking-tight mb-5 font-bold text-ink">A digital shelf made by scanning your physical spine.</h2>
          <p className="leading-[1.75] mb-7 text-muted">Keep your real books. Simply take a snapshot of your physical bookcase, and our light computer-vision model isolates individual spines, straightens alignment, maps authors, and catalogues them effortlessly in seconds. No tedious manual searching.</p>
          <button onClick={handleScan} className="inline-flex items-center gap-2.5 rounded-full px-6 py-3.5 font-sans text-[0.68rem] font-bold uppercase tracking-widest text-paper shadow-md transition-all hover:brightness-110 bg-ink">
            <Scan size={14}/> Scan Book Shelf
          </button>
        </div>

        <div className="border border-line bg-[color-mix(in_srgb,var(--paper)_45%,transparent)] p-3 md:p-4 rounded-[1.3rem] shadow-sm transition-colors duration-500">
          <div className="relative overflow-hidden h-[470px] rounded-[1rem] bg-[#191512] border border-white/10">
            <img src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=800&auto=format&fit=crop" alt="Shelf" className={`w-full h-full object-cover opacity-40 transition-transform duration-1000 ${step >= 0 && step < 3 ? 'scale-[1.02]' : ''}`} />
            <div className="absolute inset-0 opacity-[0.2] bg-[linear-gradient(rgba(231,214,180,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(231,214,180,0.1)_1px,transparent_1px)] bg-[size:34px_34px]"></div>
            
            {step >= 0 && step < 3 && (
              <div className="absolute left-0 right-0 h-[90px] bg-gradient-to-b from-transparent via-amber-400/30 to-transparent animate-[scan_3s_ease-in-out_infinite]"></div>
            )}

            {step >= 0 && (
              <div className="absolute inset-0 transition-opacity duration-300">
                <div className="absolute left-[12%] top-[10%] h-[80%] w-[1px] bg-[#EFDDAF] shadow-[0_0_12px_rgba(239,221,175,0.9)]"></div>
                <div className="absolute left-[33%] top-[10%] h-[80%] w-[1px] bg-[#EFDDAF] shadow-[0_0_12px_rgba(239,221,175,0.9)]"></div>
                <div className="absolute left-[54%] top-[10%] h-[80%] w-[1px] bg-[#EFDDAF] shadow-[0_0_12px_rgba(239,221,175,0.9)]"></div>
                <div className="absolute left-[76%] top-[10%] h-[80%] w-[1px] bg-[#EFDDAF] shadow-[0_0_12px_rgba(239,221,175,0.9)]"></div>
              </div>
            )}

            {step === 3 && books.map((b, idx) => (
              <span key={idx} className="absolute p-1.5 px-2.5 border rounded text-[0.6rem] font-sans font-bold tracking-wider uppercase bg-stone-900/95 text-[#F5EBD8] border-amber-200/30 shadow-2xl animate-[tagIn_0.5s_ease_forwards]" style={{ left: b.left, top: b.top }}>
                {b.name}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-4 font-sans text-[0.66rem] uppercase tracking-wider font-semibold">
            {labels.map((l, idx) => (
              <div key={idx} className={`flex items-center gap-2 transition-colors ${step >= idx ? 'text-[color:var(--ink)] font-bold' : 'text-[color:var(--muted)]'}`}>
                <span className={`w-2 h-2 rounded-full ${step >= idx ? 'bg-green-600 shadow-[0_0_8px_rgba(22,163,74,0.8)]' : 'bg-stone-400'}`}></span>
                <span>{l}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
