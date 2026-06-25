"use client";

import { motion } from "framer-motion";
import { Sprout, Terminal, MessageSquare } from "lucide-react";
import { START_STEPS } from "@/lib/daisy-data";
import { SectionHeader } from "./Features";

export function GettingStarted() {
  return (
    <section id="start" className="py-20 md:py-28 scroll-mt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Get started"
          title={
            <>
              Three steps to your <span className="text-primary">first harvest</span>
            </>
          }
          description="No setup, no installs. Invite the bot to your server, run one command, and the welcome panel will guide you the rest of the way."
        />

        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {START_STEPS.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative"
            >
              <div className="card-garden card-garden-hover rounded-2xl p-6 h-full border">
                <div className="flex items-center justify-between">
                  <span className="grid place-items-center h-12 w-12 rounded-xl bg-leaf-gradient text-white text-2xl shadow-md">
                    {step.emoji}
                  </span>
                  <span className="font-display text-4xl font-bold text-primary/15">
                    {step.step}
                  </span>
                </div>
                <h3 className="mt-4 font-display text-xl font-bold text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground text-pretty leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Connector arrow between steps (desktop) */}
              {i < START_STEPS.length - 1 && (
                <div
                  className="hidden md:flex absolute top-1/2 -right-3 -translate-y-1/2 z-10 items-center justify-center"
                  aria-hidden
                >
                  <span className="grid place-items-center h-7 w-7 rounded-full bg-primary text-primary-foreground shadow-md text-xs">
                    →
                  </span>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Starter kit callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 grid lg:grid-cols-[1.2fr_1fr] gap-6 items-stretch"
        >
          {/* Starter kit card */}
          <div className="card-garden rounded-3xl p-6 md:p-8 border relative overflow-hidden">
            <div
              className="pointer-events-none absolute -top-12 -right-12 h-40 w-40 rounded-full opacity-50 blur-3xl"
              style={{ background: "radial-gradient(circle, oklch(0.85 0.16 88 / 0.5), transparent 70%)" }}
              aria-hidden
            />
            <div className="relative">
              <div className="flex items-center gap-2">
                <span className="grid place-items-center h-10 w-10 rounded-xl bg-sun-gradient text-white shadow">
                  <Sprout className="h-5 w-5" />
                </span>
                <h3 className="font-display text-xl font-bold text-foreground">Starter kit</h3>
              </div>
              <p className="mt-2 text-sm text-muted-foreground text-pretty">
                Every new player receives the same fair start. No pay-to-win, no premium currency —
                just seeds, a watering can, and enough Daisies to buy your first upgrade.
              </p>

              <ul className="mt-5 grid sm:grid-cols-3 gap-3">
                <StarterItem emoji="🌻" name="Sunflower Seed" amount="×3" />
                <StarterItem emoji="🚿" name="Watering Can" amount="×1" />
                <StarterItem emoji="🪙" name="Daisies" amount="50" />
              </ul>
            </div>
          </div>

          {/* Command preview */}
          <div className="card-garden rounded-3xl p-6 md:p-8 border bg-leaf-deep text-white relative overflow-hidden">
            <div
              className="pointer-events-none absolute inset-0 opacity-30"
              style={{
                background:
                  "radial-gradient(circle at top right, oklch(0.85 0.16 88 / 0.4), transparent 60%)",
              }}
              aria-hidden
            />
            <div className="relative">
              <div className="flex items-center gap-2">
                <Terminal className="h-5 w-5 text-sun" />
                <h3 className="font-display text-lg font-bold">Quick start</h3>
              </div>

              <div className="mt-4 rounded-xl bg-black/30 border border-white/10 p-4 font-mono text-sm">
                <div className="flex items-center gap-2 text-white/70 text-[11px] uppercase tracking-wider mb-2">
                  <MessageSquare className="h-3 w-3" /> Discord message
                </div>
                <p className="text-white">
                  <span className="text-sun">/start</span>
                </p>
              </div>

              <div className="mt-4 rounded-xl bg-white/10 border border-white/10 p-4">
                <p className="text-white/70 text-[11px] uppercase tracking-wider mb-2 font-mono">
                  🌼 DaisyFlower response
                </p>
                <p className="text-white text-sm font-medium leading-relaxed">
                  Welcome to DaisyFlower! Your starter kit is ready. Click{" "}
                  <span className="text-sun font-semibold">Start My Garden</span> to plant your
                  first Sunflower.
                </p>
                <div className="mt-3 flex flex-wrap gap-2 text-[11px]">
                  <span className="rounded-md bg-sun text-leaf-deep font-bold px-2.5 py-1">
                    🌱 Start My Garden
                  </span>
                  <span className="rounded-md bg-white/15 px-2.5 py-1">❔ How It Works</span>
                  <span className="rounded-md bg-white/15 px-2.5 py-1">⚙️ Language</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://github.com/cepard01/daisyflower"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground hover:border-primary/40 hover:bg-secondary/40 transition-all"
            >
              <Terminal className="h-4 w-4" />
              Read the docs on GitHub
            </a>
            <a
              href="https://discord.com/oauth2/authorize"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90 hover:shadow-xl hover:-translate-y-0.5 transition-all"
            >
              <Sprout className="h-4 w-4" />
              Add DaisyFlower to Discord
            </a>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Open source · MIT License · Built with TypeScript, Discord.js v14, MongoDB &amp; Redis
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function StarterItem({
  emoji,
  name,
  amount,
}: {
  emoji: string;
  name: string;
  amount: string;
}) {
  return (
    <li className="rounded-xl bg-secondary/60 px-3 py-3 text-center">
      <div className="text-3xl" aria-hidden>
        {emoji}
      </div>
      <div className="mt-1 text-xs font-semibold text-foreground">{name}</div>
      <div className="text-[11px] text-primary font-bold">{amount}</div>
    </li>
  );
}
