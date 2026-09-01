import { useSyncExternalStore } from "react";

const STORAGE_KEY = "bookmarked-rice-ids";
const EMPTY: string[] = [];

let bookmarkIds: string[] = [];
let hydrated = false;
const listeners = new Set<() => void>();

function loadFromStorage(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

function persist(ids: string[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch {}
}

function emitChange() {
  listeners.forEach((listener) => listener());
}

function ensureHydrated() {
  if (!hydrated && typeof window !== "undefined") {
    bookmarkIds = loadFromStorage();
    hydrated = true;
  }
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

function getSnapshot() {
  ensureHydrated();
  return bookmarkIds;
}

function getServerSnapshot() {
  return EMPTY;
}

export function toggleBookmark(id: string) {
  ensureHydrated();
  bookmarkIds = bookmarkIds.includes(id)
    ? bookmarkIds.filter((existing) => existing !== id)
    : [...bookmarkIds, id];
  persist(bookmarkIds);
  emitChange();
}

export function useBookmarkIds(): string[] {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function useIsBookmarked(id: string): boolean {
  return useBookmarkIds().includes(id);
}
