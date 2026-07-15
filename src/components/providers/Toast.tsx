"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckIcon, CloseIcon } from "@/components/icons";

type ToastType = "success" | "info" | "error";

interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

interface ToastContextValue {
  toast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) return { toast: () => {} };
  return ctx;
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback((message: string, type: ToastType = "success") => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  const dismiss = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const typeStyles: Record<ToastType, { bg: string; icon: ReactNode }> = {
    success: {
      bg: "bg-sage text-white",
      icon: <CheckIcon size={15} />,
    },
    info: {
      bg: "bg-foreground text-background",
      icon: <span className="text-xs">ℹ</span>,
    },
    error: {
      bg: "bg-destructive text-white",
      icon: <span className="text-xs">✕</span>,
    },
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-[200] flex flex-col gap-2 pointer-events-none">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: 40, scale: 0.95 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className={`pointer-events-auto flex items-center gap-2.5 rounded-lg px-4 py-3 shadow-lg ${typeStyles[t.type].bg}`}
            >
              <span className="grid place-items-center h-5 w-5 rounded-full bg-white/20 shrink-0">
                {typeStyles[t.type].icon}
              </span>
              <p className="text-sm font-medium">{t.message}</p>
              <button
                onClick={() => dismiss(t.id)}
                className="ml-2 opacity-60 hover:opacity-100 transition-opacity"
                aria-label="Dismiss"
              >
                <CloseIcon size={14} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}
