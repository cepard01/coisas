"use client";

import { useState, useCallback, useSyncExternalStore } from "react";

/**
 * Mock authentication state for the DaisyFlower website.
 * Purely frontend — no real OAuth, no persistence beyond session.
 * Simulates a logged-in player so we can render dashboard-style UIs.
 */

export interface MockPlayer {
  id: string;
  username: string;
  discriminator: string;
  avatar: string; // emoji used as avatar for the mockup
  level: number;
  joinedAt: string;
}

const MOCK_PLAYER: MockPlayer = {
  id: "daisy_2847",
  username: "petalkeeper",
  discriminator: "0421",
  avatar: "🌻",
  level: 7,
  joinedAt: "2025-03-14",
};

const STORAGE_KEY = "daisyflower_mock_auth";

// External store: shared across all hook consumers, hydrated once
// from sessionStorage on first client read.
let currentPlayer: MockPlayer | null = null;
let initialized = false;
const listeners = new Set<() => void>();

function ensureInit() {
  if (initialized) return;
  initialized = true;
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (raw) currentPlayer = JSON.parse(raw) as MockPlayer;
  } catch {
    // ignore
  }
}

function writeStore(player: MockPlayer | null) {
  currentPlayer = player;
  try {
    if (player) sessionStorage.setItem(STORAGE_KEY, JSON.stringify(player));
    else sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot(): MockPlayer | null {
  ensureInit();
  return currentPlayer;
}

export function useAuth() {
  // useSyncExternalStore handles SSR (returns server snapshot) and
  // client hydration automatically, no useEffect needed.
  const player = useSyncExternalStore(
    subscribe,
    getSnapshot,
    () => null, // server snapshot — always null on first render
  );

  // `hydrated` flips to true once we're on the client. We use a lazy
  // initializer (runs only on client during first render) so there's
  // no setState-in-effect.
  const [hydrated] = useState(() => {
    if (typeof window === "undefined") return false;
    return true;
  });

  const signIn = useCallback(() => {
    writeStore(MOCK_PLAYER);
  }, []);

  const signOut = useCallback(() => {
    writeStore(null);
  }, []);

  return { player, signIn, signOut, hydrated };
}
