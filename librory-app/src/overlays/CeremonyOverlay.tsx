import React, { useEffect } from 'react';
import { useUIStore } from '../store/ui';
import confetti from 'canvas-confetti';

export const CeremonyOverlay: React.FC = () => {
  const ceremonyOverlayOpen = useUIStore(state => state.ceremonyOverlayOpen);
  const setCeremonyOverlayOpen = useUIStore(state => state.setCeremonyOverlayOpen);

  useEffect(() => {
    if (ceremonyOverlayOpen) {
      const duration = 3000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#C8612A', '#8B5A2B', '#E5D8C8'],
          zIndex: 90
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#C8612A', '#8B5A2B', '#E5D8C8'],
          zIndex: 90
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        } else {
          setTimeout(() => setCeremonyOverlayOpen(false), 1500);
        }
      };
      frame();
    }
  }, [ceremonyOverlayOpen, setCeremonyOverlayOpen]);

  if (!ceremonyOverlayOpen) return null;

  return (
    <div className="absolute inset-0 z-[80] pointer-events-none flex flex-col items-center justify-center bg-black/20 backdrop-blur-sm animate-in fade-in duration-500">
      <div className="bg-[var(--paper)] p-8 rounded-2xl shadow-xl flex flex-col items-center border border-[var(--border)] scale-in animate-in zoom-in-95 duration-500">
        <div className="text-4xl mb-4">✨</div>
        <h3 className="font-serif-display text-2xl text-[var(--ink)]">Volume Sealed</h3>
        <p className="font-serif italic text-[var(--muted)] mt-2">The hearth glows brighter.</p>
      </div>
    </div>
  );
};
