import React from 'react';

const HearthScreen: React.FC = () => {
  return (
    <div className="flex flex-col p-6 h-full overflow-y-auto cozy-scroll pb-24">
      <div className="flex justify-between items-start mt-2">
        <div>
          <span className="eyebrow block">Today's Refuge</span>
          <h1 className="text-4xl font-serif-display font-bold mt-1 text-[var(--ink)]">The Hearth</h1>
        </div>
      </div>
      <div className="dingbat-row my-8">❦</div>
      
      <div className="flex-1 flex items-center justify-center text-[var(--muted)] text-sm italic font-sans text-center">
        Hearth structure ready.<br />Waiting for Phase 4.
      </div>
    </div>
  );
};

export default HearthScreen;
