import React from 'react';
import { clsx } from 'clsx';

export const DropCap: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <span className={clsx("dropcap float-left text-5xl font-display font-bold leading-none pr-2 pt-1 text-[var(--ember)]", className)}>
    {children}
  </span>
);

export const Eyebrow: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <span className={clsx("eyebrow block text-xs tracking-widest uppercase font-sans text-[var(--muted)] mb-1", className)}>
    {children}
  </span>
);

export const Bracketed: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <span className={clsx("font-serif italic text-sm text-[var(--muted)]", className)}>
    [{children}]
  </span>
);

export const Dingbat: React.FC<{ symbol?: string; className?: string }> = ({ symbol = '❦', className }) => (
  <span className={clsx("dingbat inline-block text-lg text-[var(--ember)] opacity-70", className)}>
    {symbol}
  </span>
);

export const Asterism: React.FC<{ className?: string }> = ({ className }) => (
  <div className={clsx("flex justify-center items-center gap-2 my-8 opacity-50", className)}>
    <span className="text-xl">⁂</span>
  </div>
);
