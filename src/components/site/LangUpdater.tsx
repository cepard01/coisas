"use client";

import { useEffect } from "react";
import { useI18n } from "@/hooks/use-i18n";

/**
 * Updates the <html lang="..."> attribute when the locale changes.
 * Lives inside I18nProvider so it can read the current locale.
 * Server renders lang="en" (default); client updates after mount.
 */
export function LangUpdater() {
  const { locale, hydrated } = useI18n();

  useEffect(() => {
    if (hydrated) {
      document.documentElement.lang = locale;
    }
  }, [locale, hydrated]);

  return null;
}
