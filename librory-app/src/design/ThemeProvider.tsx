import React, { createContext, useContext, useEffect, useState } from 'react';
import { Preferences } from '@capacitor/preferences';
import type { ThemeId } from './ambient';
import { StatusBar, Style } from '@capacitor/status-bar';
import { Capacitor } from '@capacitor/core';

interface ThemeContextType {
  theme: ThemeId;
  setTheme: (theme: ThemeId) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_KEY = 'librory-theme';

const getHeuristicTheme = (): ThemeId => {
  const hour = new Date().getHours();
  if (hour >= 6 && hour < 12) return 'morning';
  if (hour >= 12 && hour < 18) return 'dusk';
  if (hour >= 18 || hour < 6) return 'candle';
  return 'paper';
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeId>('paper');
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const loadTheme = async () => {
      const { value } = await Preferences.get({ key: THEME_KEY });
      if (value && ['paper', 'morning', 'dusk', 'candle'].includes(value)) {
        setThemeState(value as ThemeId);
      } else {
        setThemeState(getHeuristicTheme());
      }
      setIsReady(true);
    };
    loadTheme();
  }, []);

  useEffect(() => {
    if (!isReady) return;
    document.documentElement.setAttribute('data-theme', `ambient-${theme}`);
    Preferences.set({ key: THEME_KEY, value: theme });
    
    if (Capacitor.isNativePlatform()) {
      try {
        if (theme === 'candle' || theme === 'dusk') {
          StatusBar.setStyle({ style: Style.Dark });
        } else {
          StatusBar.setStyle({ style: Style.Light });
        }
        const colors: Record<string, string> = {
          paper: '#ECE2D8',
          morning: '#E2E8E6',
          dusk: '#E8D4C2',
          candle: '#1A130E'
        };
        StatusBar.setBackgroundColor({ color: colors[theme] });
      } catch (e) {
        // ignore
      }
    }
  }, [theme, isReady]);

  const setTheme = (newTheme: ThemeId) => {
    setThemeState(newTheme);
  };

  if (!isReady) return null;

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};
