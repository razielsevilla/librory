import { create } from 'zustand';

interface UIState {
  activeBookId: string | null;
  setActiveBookId: (id: string | null) => void;
  immersiveOverlayOpen: boolean;
  setImmersiveOverlayOpen: (open: boolean) => void;
  ocrOverlayOpen: boolean;
  setOcrOverlayOpen: (open: boolean) => void;
  ceremonyOverlayOpen: boolean;
  setCeremonyOverlayOpen: (open: boolean) => void;
  editMode: boolean;
  setEditMode: (mode: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  activeBookId: null,
  setActiveBookId: (id) => set({ activeBookId: id }),
  immersiveOverlayOpen: false,
  setImmersiveOverlayOpen: (open) => set({ immersiveOverlayOpen: open }),
  ocrOverlayOpen: false,
  setOcrOverlayOpen: (open) => set({ ocrOverlayOpen: open }),
  ceremonyOverlayOpen: false,
  setCeremonyOverlayOpen: (open) => set({ ceremonyOverlayOpen: open }),
  editMode: false,
  setEditMode: (mode) => set({ editMode: mode }),
}));
