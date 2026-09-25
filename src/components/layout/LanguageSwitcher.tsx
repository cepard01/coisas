"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/components/providers/I18nProvider";
import { LOCALES, type Locale } from "@/lib/i18n-config";
import { ChevronDownIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const { locale, setLocale, hydrated } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const current = LOCALES.find((l) => l.code === locale) ?? LOCALES[0];

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-lg text-sm font-medium transition-colors",
          compact
            ? "px-2 py-1 text-muted-foreground hover:text-foreground"
            : "border border-border bg-card px-3 py-1.5 text-foreground hover:border-foreground/20"
        )}
        aria-label="Change language"
        aria-expanded={open}
      >
        <span className="text-base leading-none">{current.flag}</span>
        {!compact && (
          <span className="hidden sm:inline">{current.code.toUpperCase()}</span>
        )}
        <ChevronDownIcon
          size={13}
          className={cn("text-muted-foreground transition-transform", open && "rotate-180")}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="absolute right-0 top-full mt-1.5 w-44 z-50 bg-card border border-border rounded-xl shadow-lg overflow-hidden"
          >
            <ul className="p-1.5">
              {LOCALES.map((l) => {
                const isActive = hydrated && locale === l.code;
                return (
                  <li key={l.code}>
                    <button
                      onClick={() => {
                        setLocale(l.code as Locale);
                        setOpen(false);
                      }}
                      className={cn(
                        "w-full flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm transition-colors text-left",
                        isActive
                          ? "bg-secondary text-foreground"
                          : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                      )}
                    >
                      <span className="text-base leading-none">{l.flag}</span>
                      <span className="flex-1">{l.label}</span>
                      {isActive && (
                        <span className="text-sage text-xs">✓</span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
