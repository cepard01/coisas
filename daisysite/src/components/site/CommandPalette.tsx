"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/hooks/use-i18n";
import {
  SearchIcon,
  SproutIcon,
  WalletIcon,
  ListIcon,
  BookIcon,
  ShopIcon,
  WeatherIcon,
  GithubIcon,
  ArrowRightIcon,
  DaisyMark,
  GearIcon,
  TrendingIcon,
} from "./icons";
import { cn } from "@/lib/utils";

interface PaletteItem {
  label: string;
  href: string;
  icon: React.ElementType;
  group: "navigate" | "actions";
  keywords?: string;
}

export function CommandPalette() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const items = useMemo<PaletteItem[]>(() => {
    return [
      { label: t.nav.howItWorks, href: "/how-it-works", icon: SproutIcon, group: "navigate" },
      { label: t.nav.plants, href: "/plants", icon: DaisyMark, group: "navigate" },
      { label: t.nav.panel, href: "/panel", icon: WalletIcon, group: "navigate" },
      { label: t.nav.commands, href: "/commands", icon: ListIcon, group: "navigate" },
      { label: t.nav.faq, href: "/faq", icon: BookIcon, group: "navigate" },
      { label: t.nav.getStarted, href: "/get-started", icon: SproutIcon, group: "actions" },
      { label: "Profile", href: "/profile", icon: DaisyMark, group: "navigate" },
      { label: "Settings", href: "/settings", icon: GearIcon, group: "navigate" },
      { label: "Changelog", href: "/changelog", icon: ListIcon, group: "navigate" },
      { label: "Leaderboard", href: "/leaderboard", icon: TrendingIcon, group: "navigate" },
      { label: "GitHub", href: "https://github.com/cepard01/daisyflower", icon: GithubIcon, group: "actions" },
    ];
  }, [t]);

  const filtered = useMemo(() => {
    if (!query.trim()) return items;
    const q = query.toLowerCase();
    return items.filter(
      (item) =>
        item.label.toLowerCase().includes(q) ||
        item.href.toLowerCase().includes(q) ||
        (item.keywords?.toLowerCase().includes(q) ?? false)
    );
  }, [items, query]);

  // Keyboard shortcut: Cmd+K / Ctrl+K
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
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

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setQuery("");
      setActiveIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  // Reset active index when query changes
  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

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

  const handleSelect = (item: PaletteItem) => {
    setOpen(false);
    if (item.href.startsWith("http")) {
      window.open(item.href, "_blank", "noopener,noreferrer");
    } else {
      router.push(item.href);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && filtered[activeIndex]) {
      e.preventDefault();
      handleSelect(filtered[activeIndex]);
    }
  };

  const navigateItems = filtered.filter((i) => i.group === "navigate");
  const actionItems = filtered.filter((i) => i.group === "actions");

  return (
    <>
      {/* Trigger button (hidden, only keyboard) */}
      {/* The palette is triggered via Cmd+K. No visible button needed. */}

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[100] grid place-items-start pt-[15vh] px-4"
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
          >
            {/* Backdrop */}
            <button
              aria-label="Close palette"
              onClick={() => setOpen(false)}
              className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
            />

            {/* Palette */}
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-lg bg-card border border-border rounded-2xl shadow-2xl overflow-hidden"
            >
              {/* Search input */}
              <div className="relative border-b border-border">
                <SearchIcon
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
                />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Search pages, commands..."
                  className="w-full bg-transparent pl-11 pr-4 py-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                />
                <kbd className="absolute right-3 top-1/2 -translate-y-1/2 rounded border border-border bg-background px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
                  Esc
                </kbd>
              </div>

              {/* Results */}
              <div className="max-h-[50vh] overflow-y-auto p-2 scrollbar-soft">
                {filtered.length === 0 ? (
                  <div className="py-8 text-center">
                    <p className="text-sm text-muted-foreground">No results found</p>
                  </div>
                ) : (
                  <>
                    {navigateItems.length > 0 && (
                      <>
                        <p className="px-2 py-1.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                          Navigate
                        </p>
                        {navigateItems.map((item) => {
                          const idx = filtered.indexOf(item);
                          const Icon = item.icon;
                          return (
                            <button
                              key={item.href}
                              onClick={() => handleSelect(item)}
                              onMouseEnter={() => setActiveIndex(idx)}
                              className={cn(
                                "w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors",
                                activeIndex === idx ? "bg-secondary" : "hover:bg-secondary/50"
                              )}
                            >
                              <Icon size={16} className="text-muted-foreground shrink-0" />
                              <span className="flex-1 text-sm text-foreground">{item.label}</span>
                              {activeIndex === idx && (
                                <ArrowRightIcon size={14} className="text-muted-foreground" />
                              )}
                            </button>
                          );
                        })}
                      </>
                    )}
                    {actionItems.length > 0 && (
                      <>
                        <p className="px-2 py-1.5 mt-2 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                          Actions
                        </p>
                        {actionItems.map((item) => {
                          const idx = filtered.indexOf(item);
                          const Icon = item.icon;
                          return (
                            <button
                              key={item.href}
                              onClick={() => handleSelect(item)}
                              onMouseEnter={() => setActiveIndex(idx)}
                              className={cn(
                                "w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors",
                                activeIndex === idx ? "bg-secondary" : "hover:bg-secondary/50"
                              )}
                            >
                              <Icon size={16} className="text-muted-foreground shrink-0" />
                              <span className="flex-1 text-sm text-foreground">{item.label}</span>
                              {activeIndex === idx && (
                                <ArrowRightIcon size={14} className="text-muted-foreground" />
                              )}
                            </button>
                          );
                        })}
                      </>
                    )}
                  </>
                )}
              </div>

              {/* Footer */}
              <div className="border-t border-border px-4 py-2.5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                    <kbd className="rounded border border-border bg-background px-1 py-0.5 font-mono">↑</kbd>
                    <kbd className="rounded border border-border bg-background px-1 py-0.5 font-mono">↓</kbd>
                    navigate
                  </span>
                  <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                    <kbd className="rounded border border-border bg-background px-1 py-0.5 font-mono">↵</kbd>
                    select
                  </span>
                </div>
                <span className="font-mono text-[10px] text-muted-foreground">
                  ⌘K to toggle
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
