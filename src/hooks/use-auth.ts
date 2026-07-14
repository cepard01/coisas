"use client";

import { useState, useCallback, useEffect } from "react";

/**
 * Mock authentication state for the DaisyFlower website.
 * Purely frontend — no real OAuth, no persistence beyond session.
 * Simulates a logged-in player so we can render dashboard-style UIs.
 *
 * To avoid SSR hydration mismatches, we always render as signed-out
 * on the server and on the first client render, then flip to the
 * real state in a layout effect. Consumers should gate auth-dependent
 * UI behind the `hydrated` flag.
 */

export interface MockPlayer {
  id: string;
  username: string;
  discriminator: string;
  avatar: string;
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

export function useAuth() {
  // Always start as null/false so the server and first client render match.
  // The real state is loaded inside useEffect (client-only).
  const [player, setPlayer] = useState<MockPlayer | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let initial: MockPlayer | null = null;
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (raw) initial = JSON.parse(raw) as MockPlayer;
    } catch {
      // ignore
    }
    if (initial) setPlayer(initial);
    setHydrated(true);
  }, []);

  const signIn = useCallback(() => {
    setPlayer(MOCK_PLAYER);
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(MOCK_PLAYER));
    } catch {
      // ignore
    }
  }, []);

  const signOut = useCallback(() => {
    setPlayer(null);
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  }, []);

  return { player, signIn, signOut, hydrated };
}
