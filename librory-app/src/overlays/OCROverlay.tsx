import React from 'react';
import { useUIStore } from '../store/ui';
import { X, Camera } from 'lucide-react';

export const OCROverlay: React.FC = () => {
  const ocrOverlayOpen = useUIStore(state => state.ocrOverlayOpen);
  const setOcrOverlayOpen = useUIStore(state => state.setOcrOverlayOpen);
  
  if (!ocrOverlayOpen) return null;

  return (
    <div className="absolute inset-0 z-[70] bg-[var(--ink)] text-[var(--page)] flex flex-col items-center justify-center p-6 animate-in fade-in slide-in-from-bottom-full duration-300">
      <button 
        onClick={() => setOcrOverlayOpen(false)}
        className="absolute top-safe right-6 mt-4 p-2 text-white/50 hover:text-white"
      >
        <X className="w-6 h-6" />
      </button>

      <Camera className="w-16 h-16 text-white/30 mb-6" />
      <h3 className="font-serif-display text-3xl mb-2 text-center">Quote Snap</h3>
      <p className="font-sans text-sm tracking-widest uppercase text-white/50 text-center">
        Coming in v2
      </p>
    </div>
  );
};
