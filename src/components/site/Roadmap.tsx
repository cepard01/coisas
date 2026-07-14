"use client";

import { motion } from "framer-motion";
import { Check, Loader2, Circle } from "lucide-react";
import { SectionHeading } from "./Features";

interface RoadmapItem {
  phase: string;
  title: string;
  status: "done" | "active" | "next";
  items: { label: string; done: boolean }[];
}

const ROADMAP: RoadmapItem[] = [
  {
    phase: "Phase 1",
    title: "Foundation",
    status: "done",
    items: [
      { label: "DaisyClient dependency container", done: true },
      { label: "Command, event, interaction handlers", done: true },
      { label: "MongoDB repositories + Mongoose schemas", done: true },
      { label: "Redis cache with failover mode", done: true },
      { label: "i18n (pt-BR + en-US) + emoji packs", done: true },
      { label: "Components v2 viewer architecture", done: true },
    ],
  },
  {
    phase: "Phase 2",
    title: "Core gameplay",
    status: "active",
    items: [
      { label: "Lazy deterministic plant simulation", done: true },
      { label: "Weather rotation + forecast + history", done: true },
      { label: "Plant, water, harvest services", done: true },
      { label: "Shop with atomic transactions", done: true },
      { label: "Inventory + wallet viewers", done: true },
      { label: "Mutation detection (Pink Rose)", done: false },
      { label: "Slash command middleware unification", done: false },
    ],
  },
  {
    phase: "Phase 3",
    title: "Progression & guidance",
    status: "next",
    items: [
      { label: "Tutorial + daily mission system", done: false },
      { label: "Collection Book with hints", done: false },
      { label: "Player profiles + badges", done: false },
      { label: "Recommended-action helper", done: false },
      { label: "Helpful empty + error states", done: false },
    ],
  },
  {
    phase: "Phase 4",
    title: "Live content & social",
    status: "next",
    items: [
      { label: "Scalable content packs pipeline", done: false },
      { label: "Seasonal events + Event Hub", done: false },
      { label: "Garden visits between players", done: false },
      { label: "Leaderboards with privacy rules", done: false },
      { label: "Decorations + garden themes", done: false },
    ],
  },
];

const STATUS_META = {
  done: { label: "Shipped", icon: Check, color: "text-sage", bg: "bg-sage/15", border: "border-sage/30" },
  active: { label: "In progress", icon: Loader2, color: "text-gold-deep", bg: "bg-gold/15", border: "border-gold/30" },
  next: { label: "Planned", icon: Circle, color: "text-muted-foreground", bg: "bg-secondary", border: "border-border" },
} as const;

export function Roadmap() {
  return (
    <section id="roadmap" className="py-24 md:py-32 scroll-mt-16 border-t border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          number="09"
          eyebrow="Roadmap"
          title={
            <>
              Where we are,
              <br className="hidden sm:block" /> <em className="font-normal text-sage">where we're going.</em>
            </>
          }
          description="DaisyFlower is in active development. The architecture is in place, the core loop works, and we're now filling in progression, content, and social systems."
        />

        <div className="mt-14 grid md:grid-cols-2 gap-5">
          {ROADMAP.map((phase, i) => {
            const meta = STATUS_META[phase.status];
            const Icon = meta.icon;
            return (
              <motion.div
                key={phase.phase}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="rounded-2xl border border-border bg-card p-6"
              >
                <div className="flex items-start justify-between mb-5">
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                      {phase.phase}
                    </p>
                    <h3 className="mt-1 font-display text-xl font-semibold text-foreground">
                      {phase.title}
                    </h3>
                  </div>
                  <span className={`inline-flex items-center gap-1.5 rounded-full ${meta.bg} ${meta.border} border px-2.5 py-1 text-[11px] font-semibold ${meta.color}`}>
                    <Icon className={`h-3 w-3 ${phase.status === "active" ? "animate-spin" : ""}`} />
                    {meta.label}
                  </span>
                </div>

                <ul className="space-y-2">
                  {phase.items.map((item, j) => (
                    <li key={j} className="flex items-center gap-2.5 text-sm">
                      <span className={`grid place-items-center h-4 w-4 rounded-full shrink-0 ${item.done ? "bg-sage text-white" : "bg-secondary border border-border"}`}>
                        {item.done && <Check className="h-2.5 w-2.5" />}
                      </span>
                      <span className={item.done ? "text-muted-foreground line-through" : "text-foreground"}>
                        {item.label}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <a
            href="https://github.com/cepard01/daisyflower/blob/main/docs/audit-roadmap.md"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-sage hover:underline"
          >
            Read the full audit & roadmap ↗
          </a>
        </div>
      </div>
    </section>
  );
}
