import React, { useState } from 'react';

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
    <section id="technology" className="max-w-page mx-auto px-5 md:px-8 py-24">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-center">
        
        {/* Text Column */}
        <div className="col-span-1 md:col-span-5">
          <div className="eyebrow mb-6">
            <span className="n-no">N° 03</span> — TECHNOLOGY
          </div>
          <h2 className="font-display text-h3 md:text-h2 leading-[1.08] tracking-tight mb-5 text-ink">
            A digital shelf made by scanning your physical spine.
          </h2>
          <div className="flex items-center gap-4 text-rule my-6">
            <span className="w-12 h-px bg-rule block" />
            <span className="text-accent text-sm">✦</span>
            <span className="w-12 h-px bg-rule block" />
          </div>
          <p className="font-serif text-body italic leading-[1.75] mb-8 text-ink-soft">
            Keep your real books. Simply take a snapshot of your physical bookcase, and our light computer-vision model isolates individual spines, straightens alignment, maps authors, and catalogues them effortlessly in seconds. No tedious manual searching.
          </p>
          <button onClick={handleScan} className="bracketed font-sans text-eyebrow font-bold uppercase transition-colors bg-accent text-ink hover:bg-ink hover:text-page px-5 py-2.5">
            Scan Book Shelf
          </button>
        </div>

        {/* Frame Column */}
        <div className="col-span-1 md:col-start-7 md:col-span-6">
          <div className="border border-rule p-3 md:p-4 rounded-[0.4rem] bg-paper-ink transition-colors duration-500 shadow-seal-dark">
            <div className="relative overflow-hidden h-[470px] rounded-[0.2rem] bg-black">
              <img 
                src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=800&auto=format&fit=crop" 
                alt="Shelf" 
                className={`w-full h-full object-cover opacity-35 transition-transform duration-1000 ${step >= 0 && step < 3 ? 'scale-[1.02]' : ''}`} 
              />
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

            <div className="grid grid-cols-2 gap-3 pt-5 font-sans text-caption uppercase tracking-widest font-semibold">
              {labels.map((l, idx) => (
                <div key={idx} className={`flex items-center gap-2 transition-colors ${step >= idx ? 'text-paper-ink-ink' : 'text-muted'}`}>
                  <span className={`text-lg leading-none mt-1 ${step >= idx ? 'text-accent' : 'text-rule-soft'}`}>*</span>
                  <span>{l}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
