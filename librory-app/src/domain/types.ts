export interface Note {
  id: string;
  bookId: string;
  page: number;
  text: string;
  createdAt: number;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  page: number;
  totalPages: number;
  status: 'reading' | 'unread' | 'paused' | 'completed';
  coverColor: string; // e.g. '#2e2219'
  giftFrom?: string;
  notes: Note[];
  tags: string[];
  addedAt: number;
  finishedAt?: number;
}

export interface Session {
  id: string;
  bookId: string;
  startedAt: number;
  endedAt: number;
  pagesRead: number;
  seconds: number;
}

export type PersonaId = 'deep-diver' | 'cross-pollinator' | 'aesthetic-wanderer';

export interface EmberState {
  fuel: number; // 0-100
  lastIgnitedAt: number;
}

export interface Settings {
  theme: string;
  persona: PersonaId;
  atmosphericNoise: boolean;
  quietHours: boolean;
  softPulses: boolean;
  secureCloudBackup: boolean;
  lastSyncAt?: number;
}
