import React from 'react';
import { TabBar } from './TabBar';

export const ScreenFrame: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="relative w-full max-w-[430px] mx-auto h-[100dvh] flex flex-col overflow-hidden bg-[var(--page)] text-[var(--ink)] transition-colors duration-700 ease-in-out md:border-x md:border-[var(--rule-soft)] md:shadow-2xl">
      {/* Live physical paper texture layers */}
      <div className="app-grain"></div>
      <div className="app-vignette"></div>

      {/* Viewport for screen content */}
      <div className="flex-1 overflow-hidden relative flex flex-col z-10 pt-safe">
        {children}
      </div>

      <TabBar />
    </div>
  );
};
