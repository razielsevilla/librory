import { create } from 'zustand';
import type { Book, Note, Session, EmberState, Settings } from '../domain/types';
import { db } from '../data/db';
import { seedDatabaseIfEmpty } from '../data/seed';

interface LibraryState {
  isHydrating: boolean;
  books: Record<string, Book>;
  notes: Record<string, Note>;
  sessions: Record<string, Session>;
  ember: EmberState | null;
  settings: Settings | null;
  
  hydrate: () => Promise<void>;
  addBook: (book: Book) => Promise<void>;
  updateBook: (id: string, updates: Partial<Book>) => Promise<void>;
  addNote: (note: Note) => Promise<void>;
  addSession: (session: Session) => Promise<void>;
  updateEmber: (ember: EmberState) => Promise<void>;
  updateSettings: (settings: Partial<Settings>) => Promise<void>;
}

export const useLibraryStore = create<LibraryState>()((set, get) => ({
  isHydrating: true,
  books: {},
  notes: {},
  sessions: {},
  ember: null,
  settings: null,

  hydrate: async () => {
    await seedDatabaseIfEmpty();
    
    const [booksArr, notesArr, sessionsArr, ember, settings] = await Promise.all([
      db.getBooks(),
      db.getAllNotes(),
      db.getAllSessions(),
      db.getKV<EmberState>('ember'),
      db.getKV<Settings>('settings')
    ]);
    
    const books = booksArr.reduce((acc, b) => { acc[b.id] = b; return acc; }, {} as Record<string, Book>);
    const notes = notesArr.reduce((acc, n) => { acc[n.id] = n; return acc; }, {} as Record<string, Note>);
    const sessions = sessionsArr.reduce((acc, s) => { acc[s.id] = s; return acc; }, {} as Record<string, Session>);

    set({ 
      books, 
      notes, 
      sessions, 
      ember: ember || undefined, 
      settings: settings || undefined, 
      isHydrating: false 
    });
  },

  addBook: async (book) => {
    await db.putBook(book);
    set(state => ({ books: { ...state.books, [book.id]: book } }));
  },

  updateBook: async (id, updates) => {
    const book = get().books[id];
    if (!book) return;
    const updated = { ...book, ...updates };
    await db.putBook(updated);
    set(state => ({ books: { ...state.books, [id]: updated } }));
  },

  addNote: async (note) => {
    await db.putNote(note);
    set(state => ({ notes: { ...state.notes, [note.id]: note } }));
  },

  addSession: async (session) => {
    await db.putSession(session);
    set(state => ({ sessions: { ...state.sessions, [session.id]: session } }));
  },

  updateEmber: async (ember) => {
    await db.setKV('ember', ember);
    set({ ember });
  },

  updateSettings: async (settings) => {
    const current = get().settings;
    if (!current) return;
    const updated = { ...current, ...settings };
    await db.setKV('settings', updated);
    set({ settings: updated });
  }
}));
