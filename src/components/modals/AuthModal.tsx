"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/components/providers/I18nProvider";
import {
  CloseIcon,
  SproutIcon,
  ShieldIcon,
  CheckIcon,
  DaisyMark,
} from "@/components/icons";

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAuthenticated?: () => void;
}

type Step = "intro" | "connecting" | "done";

export function AuthModal({ open, onOpenChange, onAuthenticated }: AuthModalProps) {
  // When the modal reopens we want a fresh state, so we mount the inner
  // content with a key that changes every time `open` goes true.
  return (
    <AuthModalInner
      key={open ? "open" : "closed"}
      open={open}
      onOpenChange={onOpenChange}
      onAuthenticated={onAuthenticated}
    />
  );
}

function AuthModalInner({ open, onOpenChange, onAuthenticated }: AuthModalProps) {
  const [step, setStep] = useState<Step>("intro");
  const { t } = useI18n();

  // Lock scroll when open
  useEffect(() => {
    if (open) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [open]);

  // Close on escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onOpenChange]);

  const handleConnect = useCallback(() => {
    setStep("connecting");
    // Simulated OAuth handshake
    const t1 = setTimeout(() => setStep("done"), 1800);
    const t2 = setTimeout(() => {
      onAuthenticated?.();
      onOpenChange(false);
    }, 3000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onAuthenticated, onOpenChange]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] grid place-items-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="auth-modal-title"
        >
          {/* Backdrop */}
          <button
            aria-label="Close dialog"
            onClick={() => onOpenChange(false)}
            className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
          />

          {/* Card */}
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-md bg-card border border-border rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Close */}
            <button
              onClick={() => onOpenChange(false)}
              className="absolute top-4 right-4 grid place-items-center h-8 w-8 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors z-10"
              aria-label="Close"
            >
              <CloseIcon size={16} />
            </button>

            <div className="p-7 sm:p-8">
              <AnimatePresence mode="wait">
                {step === "intro" && (
                  <motion.div
                    key="intro"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="grid place-items-center h-11 w-11 rounded-xl bg-sage text-white">
                        <DaisyMark size={22} className="text-paper" />
                      </span>
                      <div>
                        <p className="text-[11px] font-mono uppercase tracking-wider text-sage font-semibold">
                          {t.auth.mockLabel}
                        </p>
                        <h2 id="auth-modal-title" className="font-display text-xl font-medium text-foreground leading-tight">
                          {t.auth.title}
                        </h2>
                      </div>
                    </div>

                    <p className="mt-5 text-sm text-muted-foreground text-pretty leading-relaxed">
                      {t.auth.body}
                    </p>

                    {/* What you get */}
                    <ul className="mt-5 space-y-2.5">
                      {t.auth.benefits.map((item) => (
                        <li key={item} className="flex items-start gap-2.5 text-sm">
                          <span className="grid place-items-center h-5 w-5 rounded-full bg-sage/15 text-sage mt-0.5 shrink-0">
                            <CheckIcon size={12} />
                          </span>
                          <span className="text-foreground/90">{item}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Discord connect button */}
                    <button
                      onClick={handleConnect}
                      className="mt-6 w-full inline-flex items-center justify-center gap-2.5 rounded-xl bg-[#5865F2] hover:bg-[#4752c4] text-white px-5 py-3 text-sm font-semibold shadow-md transition-colors"
                    >
                      <DiscordIcon className="h-5 w-5" />
                      {t.auth.discordButton}
                    </button>

                    <p className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground">
                      <ShieldIcon size={12} />
                      {t.auth.privacy}
                    </p>
                  </motion.div>
                )}

                {step === "connecting" && (
                  <motion.div
                    key="connecting"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-center py-6"
                  >
                    <div className="relative mx-auto h-14 w-14">
                      <div className="absolute inset-0 rounded-full border-2 border-secondary" />
                      <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-sage animate-spin-slow" />
                      <span className="absolute inset-0 grid place-items-center">
                        <DaisyMark size={24} className="text-sage" />
                      </span>
                    </div>
                    <h3 className="mt-5 font-display text-lg font-medium text-foreground">
                      {t.auth.connecting}
                    </h3>
                    <p className="mt-1.5 text-sm text-muted-foreground">
                      {t.auth.connectingSub}
                    </p>
                  </motion.div>
                )}

                {step === "done" && (
                  <motion.div
                    key="done"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-center py-6"
                  >
                    <motion.div
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="mx-auto grid place-items-center h-14 w-14 rounded-full bg-sage/15 text-sage"
                    >
                      <CheckIcon size={26} />
                    </motion.div>
                    <h3 className="mt-5 font-display text-lg font-medium text-foreground">
                      {t.auth.done}
                    </h3>
                    <p className="mt-1.5 text-sm text-muted-foreground">
                      {t.auth.doneSub}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function DiscordIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  );
}
