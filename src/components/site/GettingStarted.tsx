"use client";

import { motion } from "framer-motion";
import { ArrowRight, Terminal } from "lucide-react";
import { START_STEPS } from "@/lib/daisy-data";
import { SectionHeading } from "./Features";

export function GettingStarted() {
  return (
    <section id="start" className="py-24 md:py-32 scroll-mt-16 border-t border-border bg-paper-warm relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-paper-grain opacity-40" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          number="10"
          eyebrow="Get started"
          title={
            <>
              Three steps to your
              <br className="hidden sm:block" /> <em className="font-normal text-sage">first harvest.</em>
            </>
          }
          description="No setup, no installs. Invite the bot to your server, run one command, and the welcome panel guides you the rest of the way."
        />

        {/* Steps */}
        <div className="mt-16 grid md:grid-cols-3 gap-5">
          {START_STEPS.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="relative rounded-2xl border border-border bg-card p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <span className="text-3xl">{step.emoji}</span>
                <span className="font-display text-3xl font-semibold text-foreground/15 marker-num">
                  {step.step}
                </span>
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground">{step.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground text-pretty leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Starter kit + command preview */}
        <div className="mt-12 grid lg:grid-cols-2 gap-5">
          {/* Starter kit */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border border-border bg-card p-6 sm:p-7"
          >
            <p className="font-mono text-[11px] uppercase tracking-wider text-sage font-semibold">
              Starter kit
            </p>
            <h3 className="mt-1 font-display text-2xl font-semibold text-foreground">
              Every player starts fair.
            </h3>
            <p className="mt-2 text-sm text-muted-foreground text-pretty">
              No pay-to-win, no premium currency. Just seeds, a watering can, and enough Daisies to
              buy your first upgrade.
            </p>
            <div className="mt-5 grid grid-cols-3 gap-3">
              {[
                { emoji: "🌻", name: "Sunflower Seed", amount: "×3" },
                { emoji: "🚿", name: "Watering Can", amount: "×1" },
                { emoji: "🪙", name: "Daisies", amount: "50" },
              ].map((it) => (
                <div key={it.name} className="rounded-xl border border-border bg-background/40 p-3 text-center">
                  <div className="text-2xl">{it.emoji}</div>
                  <p className="mt-1 text-[11px] font-medium text-foreground">{it.name}</p>
                  <p className="text-[11px] text-sage font-bold">{it.amount}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Command preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-2xl border border-border bg-ink text-paper p-6 sm:p-7 relative overflow-hidden"
          >
            <div
              className="pointer-events-none absolute -top-12 -right-12 h-40 w-40 rounded-full blur-3xl opacity-40"
              style={{ background: "radial-gradient(circle, oklch(0.82 0.12 85 / 0.4), transparent 70%)" }}
              aria-hidden
            />
            <div className="relative">
              <div className="flex items-center gap-2">
                <Terminal className="h-4 w-4 text-gold" />
                <p className="font-mono text-[11px] uppercase tracking-wider text-gold font-semibold">
                  Quick start
                </p>
              </div>

              <div className="mt-4 rounded-lg bg-black/30 border border-white/10 p-3.5">
                <p className="font-mono text-[11px] text-white/50 uppercase tracking-wider mb-1.5">
                  Discord message
                </p>
                <p className="font-mono text-sm text-paper">
                  <span className="text-gold">/start</span>
                </p>
              </div>

              <div className="mt-3 rounded-lg bg-white/5 border border-white/10 p-3.5">
                <p className="font-mono text-[11px] text-white/50 uppercase tracking-wider mb-1.5">
                  🌼 DaisyFlower
                </p>
                <p className="text-sm text-paper leading-relaxed">
                  Welcome to DaisyFlower! Your starter kit is ready. Click{" "}
                  <span className="text-gold font-semibold">Start My Garden</span> to plant your
                  first Sunflower.
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5 text-[11px]">
                  <span className="rounded-md bg-sage text-white px-2 py-1 font-semibold">🌱 Start My Garden</span>
                  <span className="rounded-md bg-white/10 px-2 py-1">❔ How It Works</span>
                  <span className="rounded-md bg-white/10 px-2 py-1">⚙️ Language</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://github.com/cepard01/daisyflower"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground hover:border-foreground/30 transition-colors"
            >
              <Terminal className="h-4 w-4" />
              Read the docs
            </a>
            <a
              href="https://discord.com/oauth2/authorize"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-lg bg-foreground text-background px-5 py-2.5 text-sm font-semibold hover:bg-foreground/90 transition-colors"
            >
              Add DaisyFlower to Discord
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Open source · MIT License · TypeScript · Discord.js v14 · MongoDB · Redis
          </p>
        </motion.div>
      </div>
    </section>
  );
}
