import React from 'react';

const ShelfScreen: React.FC = () => {
  return (
    <div className="flex flex-col p-6 h-full overflow-y-auto cozy-scroll pb-24">
      <div className="flex justify-between items-start mt-2">
        <div>
          <span className="eyebrow block">Personal Archive</span>
          <h2 className="text-4xl font-serif-display font-bold mt-1 text-[var(--ink)]">Your Living Shelf</h2>
        </div>
      </div>
      <div className="dingbat-row my-8">❦</div>
      
      <div className="flex-1 flex items-center justify-center text-[var(--muted)] text-sm italic font-sans text-center">
        Shelf structure ready.<br />Waiting for Phase 5.
      </div>
    </div>
  );
};

export default ShelfScreen;
