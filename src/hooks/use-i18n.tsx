"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";
import { type Locale, DEFAULT_LOCALE } from "@/lib/i18n-config";
import { translations, type Translation } from "@/lib/translations";

interface I18nContextValue {
  locale: Locale;
  t: Translation;
  setLocale: (locale: Locale) => void;
  hydrated: boolean;
}

const I18nContext = createContext<I18nContextValue | null>(null);

const STORAGE_KEY = "daisyflower_locale";

export function I18nProvider({ children }: { children: ReactNode }) {
  // Always start with default locale so SSR and first client render match.
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);
  const [hydrated, setHydrated] = useState(false);

  // Load saved locale on mount (client only)
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as Locale | null;
      if (saved && saved in translations) {
        setLocaleState(saved);
      }
    } catch {
      // ignore
    }
    setHydrated(true);
  }, []);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    try {
      localStorage.setItem(STORAGE_KEY, newLocale);
    } catch {
      // ignore
    }
  }, []);

  return (
    <I18nContext.Provider
      value={{ locale, t: translations[locale], setLocale, hydrated }}
    >
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error("useI18n must be used within I18nProvider");
  }
  return ctx;
}
