import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './design/ThemeProvider';
import { ToastProvider } from './components/ToastProvider';
import { ScreenFrame } from './components/ScreenFrame';
import { useLibraryStore } from './store/library';

import HearthScreen from './screens/HearthScreen';
import ShelfScreen from './screens/ShelfScreen';
import ScannerScreen from './screens/ScannerScreen';
import InsightsScreen from './screens/InsightsScreen';
import SettingsScreen from './screens/SettingsScreen';

import { BookDetailOverlay } from './overlays/BookDetailOverlay';
import { ImmersiveOverlay } from './overlays/ImmersiveOverlay';
import { OCROverlay } from './overlays/OCROverlay';
import { CeremonyOverlay } from './overlays/CeremonyOverlay';

import { App as CapacitorApp } from '@capacitor/app';
import { Capacitor } from '@capacitor/core';
import { useLocation, useNavigate } from 'react-router-dom';

function App() {
  const isHydrating = useLibraryStore((state) => state.isHydrating);
  const hydrate = useLibraryStore((state) => state.hydrate);
  
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  useEffect(() => {
    if (Capacitor.isNativePlatform()) {
      const backListener = CapacitorApp.addListener('backButton', () => {
        if (location.pathname === '/') {
          CapacitorApp.exitApp();
        } else {
          navigate(-1);
        }
      });
      return () => {
        backListener.then(listener => listener.remove());
      };
    }
  }, [location, navigate]);

  if (isHydrating) {
    return <div className="h-screen w-screen bg-[#0b0806]" />;
  }

  return (
    <ThemeProvider>
      <ToastProvider>
        <ScreenFrame>
          <Routes>
            <Route path="/" element={<HearthScreen />} />
            <Route path="/shelf" element={<ShelfScreen />} />
            <Route path="/scanner" element={<ScannerScreen />} />
            <Route path="/insights" element={<InsightsScreen />} />
            <Route path="/settings" element={<SettingsScreen />} />
          </Routes>
        </ScreenFrame>
        <BookDetailOverlay />
        <ImmersiveOverlay />
        <OCROverlay />
        <CeremonyOverlay />
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
