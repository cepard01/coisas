"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CloseIcon } from "@/components/icons";

const SHORTCUTS = [
  { keys: ["⌘", "K"], description: "Open command palette" },
  { keys: ["/"], description: "Focus command search (on /commands)" },
  { keys: ["Esc"], description: "Close dialogs / modals" },
  { keys: ["↑", "↓"], description: "Navigate in command palette" },
  { keys: ["↵"], description: "Select in command palette" },
  { keys: ["?"], description: "Show this help overlay" },
];

export function KeyboardShortcuts() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // Don't trigger if typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === "?" && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape" && open) {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (open) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[100] grid place-items-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Keyboard shortcuts"
        >
          <button
            aria-label="Close"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-md bg-card border border-border rounded-2xl shadow-2xl overflow-hidden"
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 grid place-items-center h-8 w-8 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors z-10"
              aria-label="Close"
            >
              <CloseIcon size={16} />
            </button>

            <div className="p-6">
              <h2 className="font-display text-lg font-medium text-foreground">
                Keyboard shortcuts
              </h2>
              <p className="mt-1 text-xs text-muted-foreground">
                Press <kbd className="rounded border border-border bg-background px-1.5 py-0.5 font-mono text-[10px]">?</kbd> anywhere to toggle this overlay.
              </p>

              <div className="mt-5 space-y-2.5">
                {SHORTCUTS.map((s) => (
                  <div key={s.description} className="flex items-center justify-between gap-4">
                    <span className="text-sm text-foreground">{s.description}</span>
                    <div className="flex items-center gap-1 shrink-0">
                      {s.keys.map((key, i) => (
                        <kbd
                          key={i}
                          className="rounded border border-border bg-background px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground"
                        >
                          {key}
                        </kbd>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
