"use client";

import { motion } from "framer-motion";
import { Sprout, Sun, Cloud, Droplet } from "lucide-react";
import { STATS } from "@/lib/daisy-data";

export function Hero() {
  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      id="top"
      className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden bg-garden-meadow"
    >
      {/* Decorative floating emojis */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <span className="absolute top-32 left-[6%] text-5xl opacity-40 animate-float-slow">🌻</span>
        <span className="absolute top-52 right-[10%] text-4xl opacity-30 animate-float-medium">🦋</span>
        <span className="absolute bottom-24 left-[14%] text-4xl opacity-30 animate-drift">🌸</span>
        <span className="absolute bottom-40 right-[20%] text-5xl opacity-25 animate-float-slow">🐝</span>
        <span className="absolute top-1/2 left-[2%] text-3xl opacity-30 animate-float-medium">🌱</span>
        <span className="absolute top-40 right-[3%] text-3xl opacity-25 animate-drift">🍃</span>
      </div>

      {/* Soft sun glow */}
      <div
        className="pointer-events-none absolute -top-20 -right-20 h-[28rem] w-[28rem] rounded-full opacity-50 blur-3xl"
        style={{ background: "radial-gradient(circle, oklch(0.85 0.16 88 / 0.5), transparent 70%)" }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left column — copy */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center lg:text-left"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              In active development · Open source · MIT
            </span>

            <h1 className="mt-5 font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-balance leading-[1.05]">
              The deterministic{" "}
              <span className="relative inline-block">
                <span className="bg-clip-text text-transparent bg-gradient-to-br from-primary via-leaf to-leaf-deep">
                  gardening
                </span>
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 200 12"
                  preserveAspectRatio="none"
                  aria-hidden
                >
                  <path
                    d="M2 8 Q 50 1, 100 6 T 198 5"
                    fill="none"
                    stroke="oklch(0.85 0.16 88)"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </span>{" "}
              simulator for Discord.
            </h1>

            <p className="mt-6 text-base sm:text-lg lg:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 text-pretty">
              DaisyFlower is a cozy, UI-first farm &amp; garden game. Plant seeds, react to weather,
              harvest flowers, discover mutations, and grow your botanical collection — all through
              buttons, menus, and guided panels inside Discord.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-3">
              <button
                onClick={() => scrollTo("#start")}
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90 hover:shadow-xl hover:-translate-y-0.5 transition-all"
              >
                <Sprout className="h-4 w-4" />
                Start your garden
              </button>
              <button
                onClick={() => scrollTo("#features")}
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-card/60 backdrop-blur px-6 py-3 text-sm font-semibold text-foreground hover:border-primary/40 hover:bg-card transition-all"
              >
                Explore features
                <span aria-hidden>→</span>
              </button>
            </div>

            {/* Stats */}
            <dl className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto lg:mx-0">
              {STATS.map((s) => (
                <div
                  key={s.label}
                  className="rounded-xl border border-border bg-card/60 backdrop-blur-sm px-3 py-3 text-center lg:text-left"
                >
                  <dt className="text-xs text-muted-foreground flex items-center gap-1 justify-center lg:justify-start">
                    <span aria-hidden>{s.emoji}</span>
                    {s.label}
                  </dt>
                  <dd className="mt-1 font-display text-2xl font-bold text-foreground">{s.value}</dd>
                </div>
              ))}
            </dl>
          </motion.div>

          {/* Right column — garden card mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
            className="relative mx-auto w-full max-w-md lg:max-w-none"
          >
            <div className="relative">
              {/* Glow behind card */}
              <div
                className="absolute -inset-4 rounded-3xl opacity-40 blur-2xl"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.55 0.135 145 / 0.4), oklch(0.85 0.16 88 / 0.3))",
                }}
                aria-hidden
              />

              {/* The garden card */}
              <div className="relative card-garden rounded-3xl p-5 sm:p-6 overflow-hidden">
                {/* Card header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="grid place-items-center h-9 w-9 rounded-xl bg-leaf-gradient text-white text-lg">
                      🌼
                    </span>
                    <div>
                      <p className="font-display font-bold text-foreground leading-tight">
                        Daisy Garden
                      </p>
                      <p className="text-[11px] text-muted-foreground">Player · Level 3</p>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full bg-accent/30 px-2.5 py-1 text-[11px] font-semibold text-accent-foreground">
                    <Sun className="h-3 w-3" /> Sunny
                  </span>
                </div>

                {/* Weather strip */}
                <div className="mt-4 rounded-2xl bg-secondary/60 p-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Weather</span>
                    <span className="font-medium text-foreground">☀️ Faster growth · drains water 2×</span>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-xs">
                    <span className="text-muted-foreground flex items-center gap-1">
                      <Droplet className="h-3 w-3" /> Humidity
                    </span>
                    <span className="font-medium text-foreground">50%</span>
                  </div>
                  <div className="mt-1.5 h-1.5 w-full rounded-full bg-background overflow-hidden">
                    <div className="h-full w-1/2 bg-sky-soft rounded-full" />
                  </div>
                </div>

                {/* Slots */}
                <div className="mt-4 grid grid-cols-3 gap-2">
                  <Slot emoji="🌻" label="Sunflower" progress={72} status="Growing" />
                  <Slot emoji="🌹" label="Red Rose" progress={45} status="Growing" />
                  <Slot emoji="🌱" label="Empty" progress={0} status="Plant" empty />
                  <Slot emoji="🤍" label="White Rose" progress={90} status="Almost" />
                  <Slot emoji="🌻" label="Sunflower" progress={100} status="Ready" ready />
                  <Slot emoji="🌱" label="Empty" progress={0} status="Plant" empty />
                </div>

                {/* Action buttons */}
                <div className="mt-4 grid grid-cols-3 gap-2">
                  <ActionBtn emoji="🌱" label="Plant" primary />
                  <ActionBtn emoji="🌻" label="Harvest" />
                  <ActionBtn emoji="💧" label="Water" />
                </div>

                {/* Recommended action */}
                <div className="mt-3 rounded-xl border border-primary/20 bg-primary/5 px-3 py-2 text-xs text-foreground">
                  <span className="font-semibold text-primary">Recommended:</span> Harvest your ready Sunflower 🌻
                </div>
              </div>

              {/* Floating weather icons */}
              <motion.div
                className="absolute -top-6 -left-6 grid place-items-center h-12 w-12 rounded-2xl bg-card border border-border shadow-lg text-2xl"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                aria-hidden
              >
                ☀️
              </motion.div>
              <motion.div
                className="absolute -bottom-5 -right-5 grid place-items-center h-14 w-14 rounded-2xl bg-card border border-border shadow-lg text-3xl"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                aria-hidden
              >
                <Cloud className="h-7 w-7 text-sky-soft" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom wave divider */}
      <div className="absolute bottom-0 inset-x-0" aria-hidden>
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="w-full h-12 md:h-20">
          <path
            d="M0,60 C240,100 480,20 720,50 C960,80 1200,30 1440,70 L1440,100 L0,100 Z"
            fill="var(--background)"
          />
        </svg>
      </div>
    </section>
  );
}

function Slot({
  emoji,
  label,
  progress,
  status,
  empty,
  ready,
}: {
  emoji: string;
  label: string;
  progress: number;
  status: string;
  empty?: boolean;
  ready?: boolean;
}) {
  return (
    <div
      className={
        "rounded-xl border p-2.5 transition-all " +
        (empty
          ? "border-dashed border-border bg-background/40"
          : ready
            ? "border-primary/40 bg-primary/5 shadow-sm"
            : "border-border bg-background/60")
      }
    >
      <div className="flex items-center justify-between">
        <span className="text-lg leading-none" aria-hidden>
          {emoji}
        </span>
        <span
          className={
            "text-[9px] font-semibold uppercase tracking-wide " +
            (ready ? "text-primary" : empty ? "text-muted-foreground/70" : "text-muted-foreground")
          }
        >
          {status}
        </span>
      </div>
      <p className="mt-1 text-[10px] font-medium text-foreground truncate">{label}</p>
      {!empty && (
        <div className="mt-1.5 h-1 w-full rounded-full bg-secondary overflow-hidden">
          <div
            className={"h-full rounded-full " + (ready ? "bg-primary" : "bg-leaf-soft")}
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );
}

function ActionBtn({
  emoji,
  label,
  primary,
}: {
  emoji: string;
  label: string;
  primary?: boolean;
}) {
  return (
    <div
      className={
        "flex items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-semibold transition-colors " +
        (primary
          ? "bg-primary text-primary-foreground shadow-sm"
          : "bg-secondary text-secondary-foreground hover:bg-secondary/80")
      }
    >
      <span aria-hidden>{emoji}</span>
      {label}
    </div>
  );
}
