import { openDB } from 'idb';
import type { DBSchema, IDBPDatabase } from 'idb';
import type { Book, Note, Session } from '../domain/types';

interface LibroryDB extends DBSchema {
  books: {
    key: string;
    value: Book;
  };
  notes: {
    key: string;
    value: Note;
    indexes: { 'by-book': string };
  };
  sessions: {
    key: string;
    value: Session;
    indexes: { 'by-book': string };
  };
  kv: {
    key: string;
    value: any;
  };
}

let dbPromise: Promise<IDBPDatabase<LibroryDB>>;

export const initDB = () => {
  if (!dbPromise) {
    dbPromise = openDB<LibroryDB>('librory-db', 1, {
      upgrade(db) {
        db.createObjectStore('books', { keyPath: 'id' });
        
        const noteStore = db.createObjectStore('notes', { keyPath: 'id' });
        noteStore.createIndex('by-book', 'bookId');

        const sessionStore = db.createObjectStore('sessions', { keyPath: 'id' });
        sessionStore.createIndex('by-book', 'bookId');

        db.createObjectStore('kv');
      },
    });
  }
  return dbPromise;
};

export const db = {
  async getBooks() {
    return (await initDB()).getAll('books');
  },
  async putBook(book: Book) {
    return (await initDB()).put('books', book);
  },
  async getAllNotes() {
    return (await initDB()).getAll('notes');
  },
  async getNotes(bookId: string) {
    return (await initDB()).getAllFromIndex('notes', 'by-book', bookId);
  },
  async putNote(note: Note) {
    return (await initDB()).put('notes', note);
  },
  async getAllSessions() {
    return (await initDB()).getAll('sessions');
  },
  async getSessions(bookId: string) {
    return (await initDB()).getAllFromIndex('sessions', 'by-book', bookId);
  },
  async putSession(session: Session) {
    return (await initDB()).put('sessions', session);
  },
  async getKV<T>(key: string): Promise<T | undefined> {
    return (await initDB()).get('kv', key);
  },
  async setKV(key: string, value: any) {
    return (await initDB()).put('kv', value, key);
  }
};
