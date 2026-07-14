"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "./Features";

const LOOP = [
  {
    n: "01",
    emoji: "🌱",
    title: "Plant",
    body: "Pick a slot, choose a seed from your bag, confirm. The bot checks humidity, ownership, and weather effects before you commit.",
    detail: "/plant · Garden → Plant",
  },
  {
    n: "02",
    emoji: "🌧️",
    title: "Grow",
    body: "Plants grow in real time using weather history and hydration. You don't need to keep the bot open — return whenever you like.",
    detail: "computed on demand",
  },
  {
    n: "03",
    emoji: "💧",
    title: "Care",
    body: "Water plants to protect them from wilting. The UI warns you when hydration is low or a plant is at risk — never a silent failure.",
    detail: "/water · Garden → Water",
  },
  {
    n: "04",
    emoji: "🌻",
    title: "Harvest",
    body: "Collect mature plants for flowers, crops, XP, and possible mutation discoveries. The reward screen always shows exactly what changed.",
    detail: "/harvest · Garden → Harvest",
  },
  {
    n: "05",
    emoji: "🪙",
    title: "Earn",
    body: "Sell harvest goods for Daisies, complete missions for XP, and unlock new seeds, tools, and upgrades at the shop.",
    detail: "/wallet · /shop",
  },
  {
    n: "06",
    emoji: "✨",
    title: "Expand",
    body: "Upgrade your garden with more slots, better humidity, decorations, and rare mutation seeds. Build your botanical collection over weeks.",
    detail: "/upgrade · /collection",
  },
];

export function GameplayLoop() {
  return (
    <section id="loop" className="py-24 md:py-32 scroll-mt-16 border-t border-border bg-paper-warm relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-paper-grain opacity-40" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          number="02"
          eyebrow="Gameplay"
          title={
            <>
              Six steps,
              <br className="hidden sm:block" /> <em className="font-normal text-sage">one quiet loop.</em>
            </>
          }
          description="Designed for short sessions and long-term progression. Plant in seconds, return later to harvest, and let the deterministic simulation handle the in-between."
        />

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border rounded-2xl overflow-hidden border border-border">
          {LOOP.map((step, i) => (
            <motion.div
              key={step.n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: Math.min(i * 0.06, 0.3) }}
              className="bg-card p-6 sm:p-7 group hover:bg-secondary/30 transition-colors"
            >
              <div className="flex items-start justify-between">
                <span className="font-display text-3xl font-semibold text-foreground/15 marker-num group-hover:text-sage/30 transition-colors">
                  {step.n}
                </span>
                <span className="text-3xl" aria-hidden>
                  {step.emoji}
                </span>
              </div>
              <h3 className="mt-4 font-display text-xl font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground text-pretty leading-relaxed">
                {step.body}
              </p>
              <p className="mt-4 font-mono text-[11px] text-sage">{step.detail}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10 flex items-start gap-3 max-w-2xl"
        >
          <span className="text-xl shrink-0">💡</span>
          <p className="text-sm text-muted-foreground text-pretty leading-relaxed">
            <span className="font-medium text-foreground">You don't need to keep the bot open.</span>{" "}
            Plants grow using weather history and timestamps — return whenever you like and
            DaisyFlower computes the current state on demand. No notifications required, no
            grinding, no FOMO.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
