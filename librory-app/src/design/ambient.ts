import { ScrollText, CloudSun, CloudMoon, Flame } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type ThemeId = 'paper' | 'morning' | 'dusk' | 'candle';

export interface AmbientTheme {
  id: ThemeId;
  displayName: string;
  icon: LucideIcon;
  emberIntensity: number;
}

export const ambientThemes: Record<ThemeId, AmbientTheme> = {
  paper: { id: 'paper', displayName: 'Classic Paper', icon: ScrollText, emberIntensity: 60 },
  morning: { id: 'morning', displayName: 'Morning Light', icon: CloudSun, emberIntensity: 40 },
  dusk: { id: 'dusk', displayName: 'Golden Dusk', icon: CloudMoon, emberIntensity: 80 },
  candle: { id: 'candle', displayName: 'Candle Sanctuary', icon: Flame, emberIntensity: 100 },
};
