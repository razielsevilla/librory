import React from 'react';
import { Camera } from 'lucide-react';

const ScannerScreen: React.FC = () => {
  return (
    <div className="flex flex-col p-6 h-full overflow-y-auto cozy-scroll pb-24">
      <div className="flex justify-between items-start mt-2">
        <div>
          <span className="eyebrow block">Computer Vision</span>
          <h2 className="text-4xl font-serif-display font-bold mt-1 text-[var(--ink)]">Spine Sync</h2>
        </div>
      </div>
      <div className="dingbat-row my-8">❦</div>
      
      <div className="flex-1 flex flex-col items-center justify-center text-[var(--muted)] text-sm font-sans text-center gap-4">
        <Camera className="w-12 h-12 opacity-50" />
        <p>Coming in v2.<br/>For now, add books manually.</p>
      </div>
    </div>
  );
};

export default ScannerScreen;
