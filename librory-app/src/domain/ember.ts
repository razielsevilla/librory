import type { EmberState } from './types';

export const IGNITE_BOOST = 15;
export const SEAL_BOOST = 25;
export const MAX_FUEL = 100;

export const ignite = (currentFuel: number, boost: number = IGNITE_BOOST): number => {
  return Math.min(MAX_FUEL, currentFuel + boost);
};

export const computeDimFactor = (ember: EmberState, now: number = Date.now()): number => {
  // Fuel decays 1 point every 2.4 hours (so it drops 10% per day)
  const hoursSinceIgnite = (now - ember.lastIgnitedAt) / (1000 * 60 * 60);
  const decay = hoursSinceIgnite * (10 / 24);
  const currentFuel = Math.max(0, ember.fuel - decay);
  
  return currentFuel / MAX_FUEL;
};

export const interpolateVibe = (dimFactor: number): 'dim' | 'steady' | 'blazing' => {
  if (dimFactor < 0.3) return 'dim';
  if (dimFactor > 0.85) return 'blazing';
  return 'steady';
};
