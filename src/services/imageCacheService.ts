import { ImageSlot } from '../types/ethnic';

const DB_NAME = 'vn54_museum_image_cache';
const STORE_NAME = 'images';
const DB_VERSION = 1;

const memoryCache = new Map<string, string>();

function makeCacheKey(ethnicId: string, slot: ImageSlot): string {
  return `${ethnicId}::${slot}`;
}

function openDB(): Promise<IDBDatabase | null> {
  if (typeof indexedDB === 'undefined') {
    return Promise.resolve(null);
  }
  return new Promise((resolve) => {
    try {
      const request = indexedDB.open(DB_NAME, DB_VERSION);
      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME);
        }
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => resolve(null);
    } catch {
      resolve(null);
    }
  });
}

export async function getCachedImage(
  ethnicId: string,
  slot: ImageSlot
): Promise<string | null> {
  const key = makeCacheKey(ethnicId, slot);
  if (memoryCache.has(key)) {
    return memoryCache.get(key) ?? null;
  }

  const db = await openDB();
  if (!db) {
    return null;
  }

  return new Promise((resolve) => {
    try {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(key);
      req.onsuccess = () => {
        const result = typeof req.result === 'string' ? req.result : null;
        if (result) {
          memoryCache.set(key, result);
        }
        resolve(result);
      };
      req.onerror = () => resolve(null);
    } catch {
      resolve(null);
    }
  });
}

export async function setCachedImage(
  ethnicId: string,
  slot: ImageSlot,
  imageUrl: string
): Promise<void> {
  const key = makeCacheKey(ethnicId, slot);
  memoryCache.set(key, imageUrl);

  const db = await openDB();
  if (!db) {
    return;
  }

  return new Promise((resolve) => {
    try {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      store.put(imageUrl, key);
      tx.oncomplete = () => resolve();
      tx.onerror = () => resolve();
    } catch {
      resolve();
    }
  });
}

export function getMemoryCachedImage(
  ethnicId: string,
  slot: ImageSlot
): string | null {
  return memoryCache.get(makeCacheKey(ethnicId, slot)) ?? null;
}
