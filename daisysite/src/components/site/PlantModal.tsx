"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { CloseIcon } from "./icons";
import { cn } from "@/lib/utils";

export interface PlantDetail {
  emoji: string;
  name: string;
  rarity: string;
  rarityLabel: string;
  growTime: string;
  price: number;
  sellPrice?: number;
  description: string;
  tip: string;
  color: "sun" | "rose" | "sky" | "terra" | "gold";
  growsIn: string;
  priceLabel: string;
  originLabel: string;
  mutationLabel: string;
  sellsForLabel: string;
}

const COLOR_BG = {
  sun: "from-gold/15",
  rose: "from-terra/15",
  sky: "from-sky-soft/20",
  terra: "from-terra-deep/10",
  gold: "from-gold/15",
} as const;

const RARITY_STYLES: Record<string, string> = {
  Common: "text-muted-foreground",
  Uncommon: "text-sage",
  Rare: "text-terra-deep",
  Epic: "text-gold-deep",
};

export function PlantModal({
  plant,
  open,
  onClose,
}: {
  plant: PlantDetail | null;
  open: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    if (open) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && plant && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] grid place-items-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label={`${plant.name} details`}
        >
          <button
            aria-label="Close"
            onClick={onClose}
            className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-md bg-card border border-border rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 grid place-items-center h-8 w-8 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors z-10"
              aria-label="Close"
            >
              <CloseIcon size={16} />
            </button>

            {/* Hero */}
            <div className={cn("relative h-40 grid place-items-center bg-gradient-to-br to-transparent", COLOR_BG[plant.color])}>
              <motion.span
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="text-7xl"
              >
                {plant.emoji}
              </motion.span>
              <span className={cn("absolute top-4 right-14 font-mono text-[10px] uppercase tracking-wider font-semibold", RARITY_STYLES[plant.rarity])}>
                {plant.rarityLabel}
              </span>
            </div>

            {/* Body */}
            <div className="p-6">
              <h2 className="font-display text-2xl font-medium text-foreground">{plant.name}</h2>
              <p className="mt-2 text-sm text-muted-foreground text-pretty leading-relaxed">
                {plant.description}
              </p>

              {/* Stats grid */}
              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-lg border border-border bg-background p-3">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{plant.growsIn}</p>
                  <p className="font-display text-sm font-medium text-foreground mt-0.5">{plant.growTime}</p>
                </div>
                <div className="rounded-lg border border-border bg-background p-3">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
                    {plant.price > 0 ? plant.priceLabel : plant.originLabel}
                  </p>
                  <p className="font-display text-sm font-medium text-foreground mt-0.5">
                    {plant.price > 0 ? `🪙 ${plant.price}` : plant.mutationLabel}
                  </p>
                </div>
                {plant.sellPrice !== undefined && (
                  <div className="rounded-lg border border-border bg-background p-3 col-span-2">
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{plant.sellsForLabel}</p>
                    <p className="font-display text-sm font-medium text-sage mt-0.5">🪙 {plant.sellPrice} Daisies</p>
                  </div>
                )}
              </div>

              {/* Tip */}
              <div className="mt-4 rounded-lg bg-sage/[0.06] border border-sage/20 px-4 py-3">
                <p className="text-sm text-foreground text-pretty">
                  <span className="font-semibold text-sage">💡 Tip:</span> {plant.tip}
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
