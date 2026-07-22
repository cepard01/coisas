"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "./Features";
import { GithubIcon } from "./icons";

interface Entry {
  version: string;
  date: string;
  tag: "added" | "fixed" | "changed" | "wip";
  items: string[];
}

const ENTRIES: Entry[] = [
  {
    version: "0.4.2",
    date: "2025-06-12",
    tag: "fixed",
    items: [
      "Harvest rewards now correctly map seed_* to flower_* items. Previously, some harvests silently failed because crop_* IDs weren't registered.",
      "Slash commands route through the same middleware pipeline as prefix commands. Cooldowns, profile checks, and blacklist now apply consistently.",
      "WeatherManager.init() is now called during startup. Weather state was previously uninitialized on fresh boots.",
    ],
  },
  {
    version: "0.4.1",
    date: "2025-05-28",
    tag: "added",
    items: [
      "Garden viewer now shows a recommended next action based on plant state, hydration, and inventory.",
      "Shop purchases run inside MongoDB transactions. Currency deduction and item grant are atomic.",
      "Pink Rose mutation recipe added: Red Rose + White Rose, 30% chance, requires adjacency.",
    ],
  },
  {
    version: "0.4.0",
    date: "2025-05-10",
    tag: "changed",
    items: [
      "Refactored viewer customId protocol to be stateless. UI can now be reconstructed from database + customId alone — no in-memory collectors required.",
      "Moved shop domain events from Discord client emit to EventBus. Side effects are now decoupled from the Discord transport.",
      "Redis failover mode is now transparent. Bot continues serving gameplay from MongoDB when Redis is unavailable.",
    ],
  },
  {
    version: "0.3.x",
    date: "2025-04",
    tag: "wip",
    items: [
      "Mission system: event listeners are wired, but tutorial missions are not yet authored. Tracked in audit-roadmap.md.",
      "Collection Book: schema exists, UI is stubbed. Needs discovery logic and locked-entry hints.",
      "Settings viewer still uses a local collector instead of the ViewerRegistry. Refactor pending.",
    ],
  },
];

const TAG_META = {
  added: { label: "Added", color: "text-sage", dot: "bg-sage" },
  fixed: { label: "Fixed", color: "text-terra-deep", dot: "bg-terra" },
  changed: { label: "Changed", color: "text-gold-deep", dot: "bg-gold" },
  wip: { label: "In progress", color: "text-muted-foreground", dot: "bg-muted-foreground/40" },
} as const;

export function Changelog() {
  return (
    <section id="changelog" className="py-24 md:py-32 border-t border-border">
      <div className="mx-auto max-w-4xl px-5 sm:px-6">
        <SectionHeading
          number="09"
          eyebrow="Changelog"
          title={
            <>
              What changed,
              <br className="hidden sm:block" /> <em className="font-normal text-sage">honestly.</em>
            </>
          }
          description="No marketing spin. Real version notes, real bugs fixed, real things still broken. The full audit lives in the repo."
        />

        <div className="mt-14 space-y-12">
          {ENTRIES.map((entry, i) => {
            const meta = TAG_META[entry.tag];
            return (
              <motion.div
                key={entry.version}
                initial={false}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.04 }}
                className="relative pl-6 border-l border-border"
              >
                {/* Dot */}
                <span
                  className={`absolute left-0 top-1.5 -translate-x-1/2 h-2.5 w-2.5 rounded-full ${meta.dot} ring-4 ring-background`}
                  aria-hidden
                />

                {/* Header */}
                <div className="flex items-baseline gap-3 flex-wrap">
                  <span className="font-mono text-sm font-semibold text-foreground">
                    v{entry.version}
                  </span>
                  <span className={`font-mono text-[11px] uppercase tracking-wider font-semibold ${meta.color}`}>
                    {meta.label}
                  </span>
                  <span className="font-mono text-[11px] text-muted-foreground">
                    {entry.date}
                  </span>
                </div>

                {/* Items */}
                <ul className="mt-3 space-y-2">
                  {entry.items.map((item, j) => (
                    <li key={j} className="text-sm text-muted-foreground text-pretty leading-relaxed">
                      <span className="text-foreground/80">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-12 flex items-center justify-between border-t border-border pt-6">
          <p className="text-sm text-muted-foreground">
            Full history in the git log.
          </p>
          <a
            href="https://github.com/cepard01/daisyflower/commits/main"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-sage hover:underline"
          >
            <GithubIcon size={14} />
            View commits
          </a>
        </div>
      </div>
    </section>
  );
}
