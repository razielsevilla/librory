import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';

interface EmberGraphicProps {
  fuel: number;
  dimFactor: number;
  onClick?: () => void;
}

export const EmberGraphic: React.FC<EmberGraphicProps> = ({ fuel, dimFactor, onClick }) => {
  const [isFlaring, setIsFlaring] = useState(false);
  const [ripples, setRipples] = useState<number[]>([]);

  const handleClick = () => {
    setIsFlaring(true);
    setRipples(prev => [...prev, Date.now()]);
    setTimeout(() => setIsFlaring(false), 800);
    if (onClick) onClick();
  };

  const scale = 0.8 + (fuel / 100) * 0.4;
  const opacity = 1 - (dimFactor * 0.6);

  return (
    <div 
      className="relative flex items-center justify-center w-32 h-32 cursor-pointer select-none"
      onClick={handleClick}
      style={{ transform: `scale(${scale})`, opacity }}
    >
      <div 
        className={clsx(
          "absolute w-24 h-24 rounded-full blur-xl transition-all duration-1000",
          isFlaring ? "bg-[#ffaa55] scale-125" : "bg-[var(--ember)] animate-pulse"
        )}
      />
      
      <div className="absolute w-8 h-8 rounded-full bg-white blur-md opacity-60" />

      <AnimatePresence>
        {ripples.map(id => (
          <motion.div
            key={id}
            initial={{ scale: 0.5, opacity: 0.8 }}
            animate={{ scale: 2.5, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            onAnimationComplete={() => setRipples(prev => prev.filter(r => r !== id))}
            className="absolute w-16 h-16 rounded-full border-2 border-[var(--ember)] pointer-events-none"
          />
        ))}
      </AnimatePresence>
    </div>
  );
};
