"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { COMMANDS, type CommandEntry } from "@/lib/daisy-data";
import { SectionHeader } from "./Features";
import { cn } from "@/lib/utils";

type Category = "All" | CommandEntry["category"];

const CATEGORIES: Category[] = ["All", "Core", "Economy", "Progression", "System", "Info"];

const STATUS_STYLES: Record<CommandEntry["status"], string> = {
  Implemented: "bg-leaf/15 text-leaf-deep",
  "MVP planned": "bg-sun/20 text-sun-deep",
  "Post-MVP planned": "bg-sky-soft/30 text-foreground",
  "LiveOps planned": "bg-rose-petal/15 text-rose-petal",
};

const CATEGORY_EMOJI: Record<CommandEntry["category"], string> = {
  Core: "🌱",
  Economy: "🪙",
  Progression: "📈",
  System: "⚙️",
  Info: "ℹ️",
};

export function Commands() {
  const [filter, setFilter] = useState<Category>("All");

  const filtered =
    filter === "All" ? COMMANDS : COMMANDS.filter((c) => c.category === filter);

  return (
    <section
      id="commands"
      className="py-20 md:py-28 scroll-mt-16 bg-garden-soft relative overflow-hidden"
    >
      <div className="absolute top-0 inset-x-0" aria-hidden>
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-12 md:h-16">
          <path
            d="M0,40 C240,80 480,0 720,40 C960,80 1200,10 1440,40 L1440,0 L0,0 Z"
            fill="var(--background)"
          />
        </svg>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8">
        <SectionHeader
          eyebrow="Command catalog"
          title={
            <>
              Commands are entry points.{" "}
              <span className="text-primary">Panels do the rest.</span>
            </>
          }
          description="DaisyFlower is UI-first. Slash and prefix commands open viewers — interactive panels with buttons, menus, and modals. Below is the current command surface, including planned MVP additions."
        />

        {/* Filter */}
        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={cn(
                "rounded-full px-4 py-1.5 text-sm font-semibold transition-all",
                filter === c
                  ? "bg-primary text-primary-foreground shadow"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/30"
              )}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {filtered.map((cmd, i) => (
            <motion.article
              key={cmd.name}
              layout
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: Math.min(i * 0.04, 0.4) }}
              className="card-garden card-garden-hover rounded-2xl p-5 border"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span
                    className="grid place-items-center h-9 w-9 rounded-lg bg-secondary text-base"
                    aria-hidden
                  >
                    {CATEGORY_EMOJI[cmd.category]}
                  </span>
                  <code className="font-mono text-base font-bold text-foreground">{cmd.name}</code>
                </div>
                <span
                  className={cn(
                    "inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide whitespace-nowrap",
                    STATUS_STYLES[cmd.status]
                  )}
                >
                  {cmd.status}
                </span>
              </div>

              <p className="mt-3 text-sm text-muted-foreground text-pretty">{cmd.description}</p>

              <div className="mt-4 flex flex-wrap items-center gap-2 text-[11px]">
                <span className="inline-flex items-center gap-1 rounded-md bg-background/60 border border-border px-2 py-1 font-mono text-muted-foreground">
                  {cmd.type === "both" ? "slash + prefix" : "slash only"}
                </span>
                <span className="inline-flex items-center rounded-md bg-background/60 border border-border px-2 py-1 text-muted-foreground">
                  {cmd.category}
                </span>
                {cmd.aliases && cmd.aliases.length > 0 && (
                  <div className="flex flex-wrap items-center gap-1">
                    {cmd.aliases.slice(0, 3).map((a) => (
                      <code
                        key={a}
                        className="rounded-md bg-leaf/10 px-2 py-1 font-mono text-leaf-deep"
                      >
                        .{a}
                      </code>
                    ))}
                  </div>
                )}
              </div>
            </motion.article>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-muted-foreground">
          {COMMANDS.filter((c) => c.status === "Implemented").length} implemented ·{" "}
          {COMMANDS.filter((c) => c.status === "MVP planned").length} MVP planned ·{" "}
          {COMMANDS.filter((c) => c.status === "Post-MVP planned").length} post-MVP planned
        </p>
      </div>

      <div className="absolute bottom-0 inset-x-0" aria-hidden>
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-12 md:h-16">
          <path
            d="M0,40 C240,0 480,80 720,40 C960,0 1200,70 1440,40 L1440,80 L0,80 Z"
            fill="var(--background)"
          />
        </svg>
      </div>
    </section>
  );
}
