import type { Book, Settings, EmberState } from '../domain/types';
import { db } from './db';

const defaultBooks: Book[] = [
  {
    id: 'b-stoner',
    title: 'Stoner',
    author: 'John Williams',
    page: 118,
    totalPages: 278,
    status: 'reading',
    coverColor: '#2e2219',
    notes: [],
    tags: [],
    addedAt: Date.now() - 86400000 * 5,
  },
  {
    id: 'b-dune',
    title: 'Dune',
    author: 'Frank Herbert',
    page: 72,
    totalPages: 600,
    status: 'reading',
    coverColor: '#1a233a',
    notes: [],
    tags: [],
    addedAt: Date.now() - 86400000 * 2,
  },
  {
    id: 'b-normal-people',
    title: 'Normal People',
    author: 'Sally Rooney',
    page: 104,
    totalPages: 273,
    status: 'paused',
    coverColor: '#223528',
    notes: [],
    tags: [],
    addedAt: Date.now() - 86400000 * 14,
  },
  {
    id: 'b-bell-jar',
    title: 'The Bell Jar',
    author: 'Sylvia Plath',
    page: 0,
    totalPages: 244,
    status: 'unread',
    coverColor: '#3d1c25',
    notes: [],
    tags: [],
    addedAt: Date.now() - 86400000 * 20,
  },
  {
    id: 'b-meditations',
    title: 'Meditations',
    author: 'Marcus Aurelius',
    page: 254,
    totalPages: 254,
    status: 'completed',
    coverColor: '#2b2a26',
    notes: [],
    tags: [],
    addedAt: Date.now() - 86400000 * 30,
    finishedAt: Date.now() - 86400000 * 10,
  }
];

const defaultSettings: Settings = {
  theme: 'paper',
  persona: 'deep-diver',
  atmosphericNoise: true,
  quietHours: false,
  softPulses: true,
  secureCloudBackup: false,
};

const defaultEmber: EmberState = {
  fuel: 60,
  lastIgnitedAt: Date.now(),
};

export const seedDatabaseIfEmpty = async () => {
  const books = await db.getBooks();
  if (books.length === 0) {
    for (const book of defaultBooks) {
      await db.putBook(book);
    }
    
    const settings = await db.getKV<Settings>('settings');
    if (!settings) await db.setKV('settings', defaultSettings);
    
    const ember = await db.getKV<EmberState>('ember');
    if (!ember) await db.setKV('ember', defaultEmber);
  }
};
