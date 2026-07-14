"use client";

import { useState, useEffect, type ReactNode } from "react";

/**
 * Renders children only after the component has mounted on the client.
 * Use this to wrap components that cause SSR hydration mismatches
 * (e.g. SVGs with computed transforms, or anything that reads from
 * browser-only APIs on first render).
 *
 * On the server and first client render, returns null (or the fallback).
 * After mount, renders the children.
 */
export function ClientOnly({
  children,
  fallback = null,
}: {
  children: ReactNode;
  fallback?: ReactNode;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <>{fallback}</>;
  return <>{children}</>;
}
