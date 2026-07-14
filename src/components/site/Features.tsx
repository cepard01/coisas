"use client";

import { motion } from "framer-motion";

interface Feature {
  eyebrow: string;
  title: string;
  body: string;
  visual: React.ReactNode;
}

export function Features() {
  return (
    <section id="features" className="py-24 md:py-32 scroll-mt-16 border-t border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <SectionHeading
          number="01"
          eyebrow="Features"
          title={
            <>
              Designed to feel like
              <br className="hidden sm:block" /> <em className="font-normal text-sage">tending a real garden.</em>
            </>
          }
          description="Every system in DaisyFlower exists to make the player feel calm, curious, and gently guided — never overwhelmed."
        />

        <div className="mt-20 space-y-24 md:space-y-32">
          {FEATURES.map((f, i) => (
            <FeatureRow key={f.eyebrow} feature={f} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureRow({ feature, index }: { feature: Feature; index: number }) {
  const reversed = index % 2 === 1;
  return (
    <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-center">
      <motion.div
        initial={{ opacity: 0, x: reversed ? 30 : -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={
          "lg:col-span-6 " + (reversed ? "lg:order-2" : "lg:order-1")
        }
      >
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-sage font-semibold">
          {feature.eyebrow}
        </span>
        <h3 className="mt-3 font-display text-3xl sm:text-4xl font-semibold tracking-tight text-foreground text-balance leading-tight">
          {feature.title}
        </h3>
        <p className="mt-4 text-base text-muted-foreground text-pretty leading-relaxed max-w-md">
          {feature.body}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: reversed ? -30 : 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        className={
          "lg:col-span-6 " + (reversed ? "lg:order-1" : "lg:order-2")
        }
      >
        {feature.visual}
      </motion.div>
    </div>
  );
}

export function SectionHeading({
  number,
  eyebrow,
  title,
  description,
}: {
  number: string;
  eyebrow: string;
  title: React.ReactNode;
  description?: React.ReactNode;
}) {
  return (
    <div className="max-w-3xl">
      <div className="flex items-center gap-3 text-muted-foreground">
        <span className="font-mono text-xs marker-num">{number}</span>
        <span className="h-px w-8 bg-border" />
        <span className="font-mono text-xs uppercase tracking-[0.18em] text-sage font-semibold">
          {eyebrow}
        </span>
      </div>
      <h2 className="mt-5 font-display text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-foreground text-balance leading-[1.05]">
        {title}
      </h2>
      {description && (
        <p className="mt-5 text-base sm:text-lg text-muted-foreground text-pretty leading-relaxed max-w-2xl">
          {description}
        </p>
      )}
    </div>
  );
}

/* ── Feature visuals ────────────────────────────────────────────────── */

function LazySimVisual() {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <span className="font-mono text-[11px] text-muted-foreground">resolvePlantState()</span>
        <span className="text-[11px] text-sage font-medium flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-sage animate-pulse-dot" /> computed
        </span>
      </div>
      {/* Timeline */}
      <div className="space-y-3">
        {[
          { t: "10:24", label: "plantedAt", value: "Sunflower seed", tone: "ink" },
          { t: "10:54", label: "wateredAt", value: "Watering can +30%", tone: "sage" },
          { t: "11:08", label: "weather", value: "Sunny ×1.5 growth", tone: "gold" },
          { t: "11:32", label: "now", value: "72% grown · ~18m left", tone: "terra", live: true },
        ].map((row) => (
          <div key={row.label} className="flex items-center gap-3 text-sm">
            <span className="font-mono text-[11px] text-muted-foreground w-12 shrink-0">{row.t}</span>
            <span
              className={
                "h-2 w-2 rounded-full shrink-0 " +
                (row.tone === "sage" ? "bg-sage" : row.tone === "gold" ? "bg-gold" : row.tone === "terra" ? "bg-terra" : "bg-ink/40")
              }
            />
            <span className="font-mono text-xs text-muted-foreground w-24 shrink-0">{row.label}</span>
            <span className="text-foreground text-sm flex-1 truncate">{row.value}</span>
            {row.live && (
              <span className="text-[10px] text-terra font-mono">● live</span>
            )}
          </div>
        ))}
      </div>
      <div className="mt-5 rounded-lg bg-secondary/50 px-3 py-2.5">
        <p className="text-[11px] text-muted-foreground font-mono">
          {"// no setTimeout, no cron — state derived on demand"}
        </p>
      </div>
    </div>
  );
}

function WeatherVisual() {
  const days = [
    { d: "Now", w: "☀️", n: "Sunny", active: true },
    { d: "+4h", w: "🌧️", n: "Rain" },
    { d: "+8h", w: "☀️", n: "Sunny" },
    { d: "+12h", w: "⛈️", n: "Storm" },
    { d: "+16h", w: "🌨️", n: "Snow" },
  ];
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <div className="flex items-center justify-between mb-5">
        <span className="font-mono text-[11px] text-muted-foreground">weather.forecast</span>
        <span className="text-[11px] text-muted-foreground">4-hour cycle</span>
      </div>
      <div className="grid grid-cols-5 gap-2">
        {days.map((d) => (
          <div
            key={d.d}
            className={
              "rounded-xl border p-3 text-center " +
              (d.active ? "border-gold/40 bg-gold/[0.08]" : "border-border bg-background/40")
            }
          >
            <div className="text-2xl">{d.w}</div>
            <p className="mt-1.5 text-[10px] font-mono text-muted-foreground">{d.d}</p>
            <p className={"text-[11px] font-medium " + (d.active ? "text-gold-deep" : "text-foreground")}>
              {d.n}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="rounded-lg bg-secondary/50 px-3 py-2.5">
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Growth</p>
          <p className="font-display text-lg font-semibold text-foreground">×1.5</p>
        </div>
        <div className="rounded-lg bg-secondary/50 px-3 py-2.5">
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Water drain</p>
          <p className="font-display text-lg font-semibold text-foreground">×2.0</p>
        </div>
      </div>
    </div>
  );
}

function MutationVisual() {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <div className="flex items-center justify-between mb-5">
        <span className="font-mono text-[11px] text-muted-foreground">mutation.detect()</span>
        <span className="inline-flex items-center gap-1 rounded-full bg-terra/15 px-2 py-0.5 text-[10px] font-semibold text-terra-deep">
          30% chance
        </span>
      </div>

      <div className="flex items-center justify-center gap-4 py-4">
        <div className="flex flex-col items-center gap-2">
          <span className="grid place-items-center h-16 w-16 rounded-2xl bg-rose-petal/10 text-3xl border border-border">🌹</span>
          <span className="text-[11px] text-muted-foreground">Red Rose</span>
        </div>
        <span className="font-display text-2xl text-muted-foreground">+</span>
        <div className="flex flex-col items-center gap-2">
          <span className="grid place-items-center h-16 w-16 rounded-2xl bg-sage/10 text-3xl border border-border">🤍</span>
          <span className="text-[11px] text-muted-foreground">White Rose</span>
        </div>
        <span className="font-display text-2xl text-muted-foreground">→</span>
        <div className="flex flex-col items-center gap-2">
          <span className="grid place-items-center h-16 w-16 rounded-2xl bg-gradient-to-br from-terra/15 to-gold/15 text-3xl border border-terra/30 animate-float-soft">🌸</span>
          <span className="text-[11px] font-semibold text-terra-deep">Pink Rose</span>
        </div>
      </div>

      <div className="mt-4 rounded-lg bg-sage/[0.06] border border-sage/20 px-3 py-2.5">
        <p className="text-xs text-foreground">
          <span className="font-semibold text-sage">Hint:</span> These two roses may create a rare
          color if grown side by side.
        </p>
      </div>
    </div>
  );
}

function UIVisual() {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <span className="font-mono text-[11px] text-muted-foreground">viewer.render()</span>
        <span className="text-[11px] text-muted-foreground">Components v2</span>
      </div>
      {/* Mock Discord panel */}
      <div className="rounded-xl bg-ink p-4 text-paper">
        <div className="flex items-center gap-2 mb-3">
          <span className="grid place-items-center h-8 w-8 rounded-lg bg-gold text-ink text-sm">🌼</span>
          <div>
            <p className="text-sm font-semibold">DaisyFlower</p>
            <p className="text-[10px] opacity-60">app command · just now</p>
          </div>
        </div>
        <p className="text-sm leading-relaxed">
          🌻 <span className="font-semibold">Harvest complete!</span>
          <br />
          You received: <span className="text-gold">2 Sunflowers</span> and <span className="text-gold">10 XP</span>.
        </p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          <span className="rounded-md bg-sage text-white px-2.5 py-1 text-[11px] font-semibold">🌱 Plant Again</span>
          <span className="rounded-md bg-white/10 px-2.5 py-1 text-[11px]">🎒 Inventory</span>
          <span className="rounded-md bg-white/10 px-2.5 py-1 text-[11px]">🛒 Shop</span>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2 text-center">
        <div className="rounded-lg bg-secondary/50 px-2 py-2">
          <p className="font-display text-base font-semibold text-foreground">Btn</p>
          <p className="text-[10px] text-muted-foreground">primary action</p>
        </div>
        <div className="rounded-lg bg-secondary/50 px-2 py-2">
          <p className="font-display text-base font-semibold text-foreground">Menu</p>
          <p className="text-[10px] text-muted-foreground">seed picker</p>
        </div>
        <div className="rounded-lg bg-secondary/50 px-2 py-2">
          <p className="font-display text-base font-semibold text-foreground">Modal</p>
          <p className="text-[10px] text-muted-foreground">custom qty</p>
        </div>
      </div>
    </div>
  );
}

function I18nVisual() {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <div className="flex items-center justify-between mb-5">
        <span className="font-mono text-[11px] text-muted-foreground">i18n.t('garden.title')</span>
        <span className="text-[11px] text-muted-foreground">pt-BR · en-US</span>
      </div>

      <div className="space-y-2.5">
        <div className="rounded-lg border border-border p-3">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[11px] text-muted-foreground">en-US</span>
            <span className="text-[10px] text-sage">default</span>
          </div>
          <p className="mt-1 text-sm text-foreground">🌼 Your Garden — Sunny weather</p>
        </div>
        <div className="rounded-lg border border-border p-3 bg-sage/[0.04]">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[11px] text-muted-foreground">pt-BR</span>
            <span className="text-[10px] text-sage">auto-detected</span>
          </div>
          <p className="mt-1 text-sm text-foreground">🌼 Seu Jardim — Clima ensolarado</p>
        </div>
      </div>

      <div className="mt-5 rounded-lg bg-secondary/50 px-3 py-2.5">
        <p className="text-[11px] text-muted-foreground font-mono">
          {"// per-command JSON files · hot-reloadable · emoji packs"}
        </p>
      </div>
    </div>
  );
}

function ContentPackVisual() {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <div className="flex items-center justify-between mb-5">
        <span className="font-mono text-[11px] text-muted-foreground">/src/data/seeds.json</span>
        <span className="text-[11px] text-sage">+1 file = +1 plant</span>
      </div>

      {/* Mock JSON editor */}
      <pre className="rounded-lg bg-ink p-4 text-[11px] leading-relaxed font-mono overflow-x-auto scrollbar-soft">
        <code className="text-paper">
<span className="text-muted-foreground">{"{"}</span>{"\n"}
{"  "}<span className="text-gold">"id"</span>: <span className="text-sage-soft">"seed_lavender"</span>,{"\n"}
{"  "}<span className="text-gold">"name"</span>: <span className="text-sage-soft">"Lavender Seed"</span>,{"\n"}
{"  "}<span className="text-gold">"emoji"</span>: <span className="text-sage-soft">"💜"</span>,{"\n"}
{"  "}<span className="text-gold">"rarity"</span>: <span className="text-sage-soft">"uncommon"</span>,{"\n"}
{"  "}<span className="text-gold">"growthTime"</span>: <span className="text-terra">180</span>,{"\n"}
{"  "}<span className="text-gold">"requiredHumidity"</span>: <span className="text-terra">55</span>,{"\n"}
{"  "}<span className="text-gold">"price"</span>: <span className="text-terra">150</span>{"\n"}
<span className="text-muted-foreground">{"}"}</span>
        </code>
      </pre>

      <div className="mt-4 grid grid-cols-4 gap-2">
        {["🌻", "🌹", "🤍", "🌸"].map((e, i) => (
          <div key={i} className="rounded-lg border border-border bg-background/40 py-3 text-center text-xl">
            {e}
          </div>
        ))}
      </div>
      <p className="mt-2 text-center text-[11px] text-muted-foreground">
        Existing content keeps working. New entries appear automatically.
      </p>
    </div>
  );
}

const FEATURES: Feature[] = [
  {
    eyebrow: "Simulation",
    title: "Lazy, deterministic, infinitely scalable.",
    body: "Plants don't run timers. They store timestamps. When you open your garden or harvest, DaisyFlower computes the current state from time, weather history, and modifiers — instantly. This scales to millions of plants without ever scheduling a setTimeout.",
    visual: <LazySimVisual />,
  },
  {
    eyebrow: "Weather",
    title: "A living sky above every garden.",
    body: "Weather rotates on a 4-hour cycle with a 5-step forecast. Sunny accelerates growth but drains water. Rain refills soil for free. Storms slow things down but open rare mutation chances. Snow hints at future winter plants. The UI explains every effect in plain language.",
    visual: <WeatherVisual />,
  },
  {
    eyebrow: "Mutations",
    title: "Discovery, not random confusion.",
    body: "Plant a Red Rose and a White Rose side by side. When both mature, there's a 30% chance one blooms as a rare Pink Rose. Hints appear when adjacency is right, and discoveries are recorded in the Collection Book — never a baffling surprise.",
    visual: <MutationVisual />,
  },
  {
    eyebrow: "Interface",
    title: "Panels, not commands to memorize.",
    body: "Commands are entry points. The actual game lives in viewers — Discord Components v2 panels with buttons, select menus, and modals. Plant, water, harvest, buy, sell: all guided flows that explain themselves as you go.",
    visual: <UIVisual />,
  },
  {
    eyebrow: "Languages",
    title: "Bilingual by design, not bolted on.",
    body: "Built-in pt-BR and en-US locales with per-command translation files, Discord locale detection, user and guild language preferences, and swappable emoji packs. Adding a language is a folder of JSON — no code changes.",
    visual: <I18nVisual />,
  },
  {
    eyebrow: "Content",
    title: "New plants arrive as JSON files.",
    body: "Seeds, flowers, crops, weather, mutations, items, decorations — all data-driven from src/data. Adding a new plant means adding a new object to a JSON file. No core system rewrites, no migrations, no downtime.",
    visual: <ContentPackVisual />,
  },
];
