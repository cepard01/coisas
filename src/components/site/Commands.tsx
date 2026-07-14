"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { COMMANDS, type CommandEntry } from "@/lib/daisy-data";
import { SectionHeading } from "./Features";
import { cn } from "@/lib/utils";

type Category = "All" | CommandEntry["category"];

const CATEGORIES: Category[] = ["All", "Core", "Economy", "Progression", "System", "Info"];

const STATUS_DOT: Record<CommandEntry["status"], string> = {
  Implemented: "bg-sage",
  "MVP planned": "bg-gold",
  "Post-MVP planned": "bg-sky-soft",
  "LiveOps planned": "bg-terra",
};

const STATUS_LABEL: Record<CommandEntry["status"], string> = {
  Implemented: "Live",
  "MVP planned": "MVP",
  "Post-MVP planned": "Soon",
  "LiveOps planned": "Admin",
};

export function Commands() {
  const [filter, setFilter] = useState<Category>("All");
  const filtered = filter === "All" ? COMMANDS : COMMANDS.filter((c) => c.category === filter);

  return (
    <section id="commands" className="py-24 md:py-32 scroll-mt-16 border-t border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          number="05"
          eyebrow="Commands"
          title={
            <>
              Commands are entry points.
              <br className="hidden sm:block" /> <em className="font-normal text-sage">Panels do the rest.</em>
            </>
          }
          description="DaisyFlower is UI-first. Slash and prefix commands open viewers — interactive panels with buttons, menus, and modals. Below is the current surface, including planned MVP additions."
        />

        {/* Filter */}
        <div className="mt-10 flex flex-wrap gap-1.5">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={cn(
                "rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all",
                filter === c
                  ? "border-foreground bg-foreground text-background"
                  : "border-border bg-card text-muted-foreground hover:text-foreground hover:border-foreground/30"
              )}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Table-style list */}
        <div className="mt-8 rounded-2xl border border-border overflow-hidden bg-card">
          {/* Header */}
          <div className="hidden sm:grid grid-cols-[140px_1fr_120px_120px] gap-4 px-5 py-3 border-b border-border bg-secondary/30 text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
            <span>Command</span>
            <span>Description</span>
            <span>Category</span>
            <span>Status</span>
          </div>

          <AnimatePresence mode="popLayout">
            <motion.div layout key={filter}>
              {filtered.map((cmd, i) => (
                <motion.div
                  key={cmd.name}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2, delay: Math.min(i * 0.02, 0.2) }}
                  className={cn(
                    "grid sm:grid-cols-[140px_1fr_120px_120px] gap-3 sm:gap-4 px-5 py-4 border-b border-border last:border-b-0 hover:bg-secondary/20 transition-colors",
                  )}
                >
                  <div className="flex items-center gap-2">
                    <code className="font-mono text-sm font-semibold text-foreground">{cmd.name}</code>
                  </div>
                  <div>
                    <p className="text-sm text-foreground text-pretty">{cmd.description}</p>
                    {cmd.aliases && cmd.aliases.length > 0 && (
                      <div className="mt-1.5 flex flex-wrap gap-1">
                        {cmd.aliases.slice(0, 4).map((a) => (
                          <code key={a} className="font-mono text-[10px] text-muted-foreground bg-secondary px-1.5 py-0.5 rounded">
                            .{a}
                          </code>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center">
                    <span className="text-xs text-muted-foreground">{cmd.category}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={cn("h-1.5 w-1.5 rounded-full", STATUS_DOT[cmd.status])} />
                    <span className="text-xs font-medium text-foreground">{STATUS_LABEL[cmd.status]}</span>
                    <span className="font-mono text-[10px] text-muted-foreground">
                      {cmd.type === "both" ? "/ +" : "/"}
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-sage" /> Live</span>
          <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-gold" /> MVP</span>
          <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-sky-soft" /> Soon</span>
          <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-terra" /> Admin</span>
          <span className="ml-auto font-mono">
            {COMMANDS.filter((c) => c.status === "Implemented").length} live ·{" "}
            {COMMANDS.filter((c) => c.status === "MVP planned").length} planned ·{" "}
            {COMMANDS.filter((c) => c.status === "Post-MVP planned").length} upcoming
          </span>
        </div>
      </div>
    </section>
  );
}
