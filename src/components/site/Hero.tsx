"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { AuthModal } from "./AuthModal";
import { useState } from "react";

export function Hero() {
  const { player, signIn } = useAuth();
  const [authOpen, setAuthOpen] = useState(false);

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="top" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-paper-warm">
      {/* Subtle paper grain */}
      <div className="pointer-events-none absolute inset-0 bg-paper-grain opacity-60" aria-hidden />

      {/* Soft sun glow */}
      <div
        className="pointer-events-none absolute -top-40 right-0 h-[36rem] w-[36rem] rounded-full blur-3xl opacity-40"
        style={{ background: "radial-gradient(circle, oklch(0.82 0.12 85 / 0.45), transparent 70%)" }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 text-sm text-muted-foreground"
        >
          <span className="font-mono text-xs uppercase tracking-[0.18em] text-sage">v1.0 · in development</span>
          <span className="h-px w-12 bg-border" />
          <span className="hidden sm:inline">Open source · MIT</span>
        </motion.div>

        {/* Headline — editorial, asymmetric */}
        <div className="mt-8 grid lg:grid-cols-12 gap-8 lg:gap-12 items-end">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="lg:col-span-8"
          >
            <h1 className="font-display text-[2.5rem] sm:text-6xl lg:text-7xl xl:text-8xl font-semibold tracking-tight leading-[0.95] text-balance">
              A quiet garden,{" "}
              <span className="italic font-normal text-sage">grown inside</span>{" "}
              Discord.
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-4 lg:pb-3"
          >
            <p className="text-base lg:text-lg text-muted-foreground text-pretty leading-relaxed max-w-md">
              DaisyFlower is a cozy, deterministic gardening simulator. Plant seeds, react to the
              weather, harvest rare mutations — through buttons, menus, and panels. No timers, no
              grinding, no spam.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              {player ? (
                <button
                  onClick={() => scrollTo("#dashboard")}
                  className="group inline-flex items-center gap-2 rounded-lg bg-foreground text-background px-5 py-2.5 text-sm font-semibold hover:bg-foreground/90 transition-colors"
                >
                  Open your dashboard
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </button>
              ) : (
                <button
                  onClick={() => setAuthOpen(true)}
                  className="group inline-flex items-center gap-2 rounded-lg bg-foreground text-background px-5 py-2.5 text-sm font-semibold hover:bg-foreground/90 transition-colors"
                >
                  Sign in to your garden
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </button>
              )}
              <button
                onClick={() => scrollTo("#features")}
                className="inline-flex items-center gap-1.5 rounded-lg px-4 py-2.5 text-sm font-medium text-foreground hover:bg-secondary transition-colors"
              >
                See how it works
              </button>
            </div>
          </motion.div>
        </div>

        {/* Garden preview mockup */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 lg:mt-24"
        >
          <GardenPreview />
        </motion.div>

        {/* Footnote stats — editorial style */}
        <motion.dl
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-5 max-w-3xl"
        >
          {[
            { v: "12+", l: "Slash commands live" },
            { v: "4", l: "Weather states" },
            { v: "2", l: "Languages" },
            { v: "0", l: "Per-plant timers" },
          ].map((s) => (
            <div key={s.l} className="border-l-2 border-border pl-3">
              <dt className="font-display text-3xl font-semibold text-foreground marker-num">{s.v}</dt>
              <dd className="mt-0.5 text-xs text-muted-foreground">{s.l}</dd>
            </div>
          ))}
        </motion.dl>
      </div>

      <AuthModal open={authOpen} onOpenChange={setAuthOpen} onAuthenticated={signIn} />
    </section>
  );
}

function GardenPreview() {
  return (
    <div className="relative">
      {/* Frame chrome — looks like an app window */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-xl shadow-foreground/[0.04]">
        {/* Window header */}
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-secondary/40">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-terra/60" />
            <span className="h-2.5 w-2.5 rounded-full bg-gold/60" />
            <span className="h-2.5 w-2.5 rounded-full bg-sage/60" />
          </div>
          <span className="font-mono text-[11px] text-muted-foreground">
            discord · #daisy-garden
          </span>
          <span className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-sage animate-pulse-dot" />
            live
          </span>
        </div>

        {/* Garden panel — Discord Components v2 style */}
        <div className="grid lg:grid-cols-[1.5fr_1fr]">
          {/* Main panel */}
          <div className="p-5 sm:p-6 border-b lg:border-b-0 lg:border-r border-border">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display text-lg font-semibold text-foreground">My Garden</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  3 plants · 1 ready to harvest
                </p>
              </div>
              <WeatherPill />
            </div>

            {/* Slots grid */}
            <div className="mt-5 grid grid-cols-3 gap-2.5">
              <GardenSlot emoji="🌻" name="Sunflower" progress={72} />
              <GardenSlot emoji="🌹" name="Red Rose" progress={45} />
              <GardenSlot emoji="🤍" name="White Rose" progress={90} />
              <GardenSlot emoji="🌻" name="Sunflower" progress={100} ready />
              <GardenSlot emoji="🌱" empty label="Empty slot" />
              <GardenSlot emoji="🌱" empty label="Empty slot" />
            </div>

            {/* Action row */}
            <div className="mt-4 flex flex-wrap gap-2">
              <MockButton primary>🌱 Plant</MockButton>
              <MockButton>🌻 Harvest</MockButton>
              <MockButton>💧 Water</MockButton>
              <MockButton>🛒 Shop</MockButton>
            </div>

            {/* Recommended */}
            <div className="mt-3 rounded-lg bg-sage/[0.06] border border-sage/20 px-3 py-2 text-xs">
              <span className="font-semibold text-sage">Next:</span>{" "}
              <span className="text-foreground">Harvest your ready Sunflower.</span>
            </div>
          </div>

          {/* Side panel */}
          <div className="p-5 sm:p-6 bg-secondary/30">
            <div className="flex items-center gap-3">
              <span className="grid place-items-center h-10 w-10 rounded-full bg-sage/15 text-lg">
                🌻
              </span>
              <div>
                <p className="text-sm font-semibold text-foreground">petalkeeper</p>
                <p className="text-[11px] text-muted-foreground">Level 7 · Gardener</p>
              </div>
            </div>

            {/* XP bar */}
            <div className="mt-4">
              <div className="flex items-center justify-between text-[11px] text-muted-foreground mb-1.5">
                <span>XP to Level 8</span>
                <span className="font-mono">2,140 / 3,000</span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-secondary overflow-hidden">
                <div className="h-full w-[71%] rounded-full bg-gradient-to-r from-sage to-sage-deep" />
              </div>
            </div>

            {/* Wallet */}
            <div className="mt-5 grid grid-cols-2 gap-2">
              <div className="rounded-lg border border-border bg-card p-2.5">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Daisies</p>
                <p className="font-display text-lg font-semibold text-foreground mt-0.5">1,240</p>
              </div>
              <div className="rounded-lg border border-border bg-card p-2.5">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Collection</p>
                <p className="font-display text-lg font-semibold text-foreground mt-0.5">8 / 24</p>
              </div>
            </div>

            {/* Mission preview */}
            <div className="mt-4 rounded-lg border border-border bg-card p-3">
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-semibold text-foreground flex items-center gap-1">
                  <Sparkles className="h-3 w-3 text-gold" /> Daily mission
                </p>
                <span className="text-[10px] text-muted-foreground font-mono">2/3</span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">Harvest 3 flowers</p>
              <div className="mt-2 h-1 w-full rounded-full bg-secondary overflow-hidden">
                <div className="h-full w-2/3 rounded-full bg-gold" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating callout */}
      <motion.div
        className="absolute -top-4 -right-2 sm:right-6 hidden sm:flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 shadow-lg"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-sage animate-pulse-dot" />
        <span className="text-[11px] font-medium text-foreground">No timers running</span>
      </motion.div>
    </div>
  );
}

function WeatherPill() {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5">
      <span className="text-base leading-none">☀️</span>
      <div className="text-left">
        <p className="text-[11px] font-semibold text-foreground leading-none">Sunny</p>
        <p className="text-[10px] text-muted-foreground leading-none mt-0.5">×1.5 growth</p>
      </div>
    </div>
  );
}

function GardenSlot({
  emoji,
  name,
  progress,
  ready,
  empty,
  label,
}: {
  emoji: string;
  name?: string;
  progress?: number;
  ready?: boolean;
  empty?: boolean;
  label?: string;
}) {
  if (empty) {
    return (
      <div className="rounded-lg border border-dashed border-border bg-background/40 px-2.5 py-2.5 text-center">
        <p className="text-base opacity-40">{emoji}</p>
        <p className="mt-1 text-[10px] text-muted-foreground truncate">{label}</p>
      </div>
    );
  }
  return (
    <div
      className={
        "rounded-lg border px-2.5 py-2.5 " +
        (ready ? "border-sage/40 bg-sage/[0.06]" : "border-border bg-background/60")
      }
    >
      <div className="flex items-center justify-between">
        <span className="text-base leading-none">{emoji}</span>
        {ready && (
          <span className="text-[9px] font-bold uppercase tracking-wide text-sage">Ready</span>
        )}
      </div>
      <p className="mt-1 text-[10px] font-medium text-foreground truncate">{name}</p>
      {!ready && progress !== undefined && (
        <div className="mt-1.5 h-0.5 w-full rounded-full bg-secondary overflow-hidden">
          <div
            className="h-full rounded-full bg-sage-soft"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );
}

function MockButton({
  children,
  primary,
}: {
  children: React.ReactNode;
  primary?: boolean;
}) {
  return (
    <span
      className={
        "inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-colors " +
        (primary
          ? "bg-sage text-white hover:bg-sage-deep"
          : "bg-secondary text-secondary-foreground hover:bg-secondary/70")
      }
    >
      {children}
    </span>
  );
}
