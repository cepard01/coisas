"use client";

import { motion } from "framer-motion";
import { SunIcon, CloudIcon, DropletIcon, SparkIcon, ClockIcon } from "./icons";

interface Feature {
  eyebrow: string;
  title: string;
  body: string;
  visual: React.ReactNode;
}

export function Features() {
  return (
    <section id="features" className="py-24 md:py-32 border-t border-border">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <SectionHeading
          number="01"
          eyebrow="Features"
          title={
            <>
              Built to feel like
              <br className="hidden sm:block" /> <em className="font-normal text-sage">tending a real garden.</em>
            </>
          }
          description="Every system exists to make the player feel calm, curious, and gently guided — never overwhelmed."
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
        initial={false}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={"lg:col-span-6 " + (reversed ? "lg:order-2" : "lg:order-1")}
      >
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-sage font-semibold">
          {feature.eyebrow}
        </span>
        <h3 className="mt-3 font-display text-3xl sm:text-4xl font-medium tracking-tight text-foreground text-balance leading-[1.1]">
          {feature.title}
        </h3>
        <p className="mt-4 text-base text-muted-foreground text-pretty leading-relaxed max-w-md">
          {feature.body}
        </p>
      </motion.div>

      <motion.div
        initial={false}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
        className={"lg:col-span-6 " + (reversed ? "lg:order-1" : "lg:order-2")}
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
      <h2 className="mt-5 font-display text-4xl sm:text-5xl lg:text-[3.5rem] font-medium tracking-tight text-foreground text-balance leading-[1.05]">
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

/* ── Feature visuals — hand-drawn SVG diagrams, not code mockups ────── */

function LazySimVisual() {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="flex items-baseline justify-between mb-6">
        <span className="font-mono text-[11px] text-muted-foreground">resolvePlantState()</span>
        <span className="font-mono text-[11px] text-sage flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-sage animate-pulse-dot" />
          computed
        </span>
      </div>

      {/* Timeline — horizontal, minimal */}
      <svg viewBox="0 0 400 120" className="w-full h-auto">
        {/* Timeline line */}
        <line x1="20" y1="60" x2="380" y2="60" stroke="oklch(0.9 0.008 75)" strokeWidth="1.5" />

        {/* Markers */}
        {[
          { x: 40, label: "planted", time: "10:24", color: "oklch(0.48 0.012 75)" },
          { x: 140, label: "watered", time: "10:54", color: "oklch(0.46 0.06 145)" },
          { x: 220, label: "sunny", time: "11:08", color: "oklch(0.8 0.1 85)" },
          { x: 340, label: "now", time: "11:32", color: "oklch(0.68 0.1 45)" },
        ].map((m) => (
          <g key={m.label}>
            <circle cx={m.x} cy="60" r="4" fill={m.color} />
            <text x={m.x} y="40" textAnchor="middle" fontSize="10" fill="oklch(0.48 0.012 75)" fontFamily="monospace">
              {m.time}
            </text>
            <text x={m.x} y="82" textAnchor="middle" fontSize="11" fill="oklch(0.21 0.012 75)" fontFamily="serif" fontStyle="italic">
              {m.label}
            </text>
          </g>
        ))}

        {/* "now" indicator — vertical line + label */}
        <line x1="340" y1="20" x2="340" y2="100" stroke="oklch(0.68 0.1 45)" strokeWidth="1" strokeDasharray="2 3" opacity="0.5" />
      </svg>

      <div className="mt-5 flex items-baseline justify-between border-t border-border pt-4">
        <div>
          <p className="text-xs text-muted-foreground">Current state</p>
          <p className="font-display text-lg text-foreground mt-0.5">72% grown · ~18m left</p>
        </div>
        <p className="font-mono text-[11px] text-muted-foreground text-right max-w-[180px]">
          no setTimeout<br />no cron — derived on demand
        </p>
      </div>
    </div>
  );
}

function WeatherVisual() {
  const days = [
    { d: "now", icon: SunIcon, n: "Sunny", active: true, color: "oklch(0.8 0.1 85)" },
    { d: "+4h", icon: CloudIcon, n: "Cloudy", color: "oklch(0.6 0.02 220)" },
    { d: "+8h", icon: SunIcon, n: "Sunny", color: "oklch(0.8 0.1 85)" },
    { d: "+12h", icon: CloudIcon, n: "Rain", color: "oklch(0.55 0.04 220)" },
    { d: "+16h", icon: CloudIcon, n: "Snow", color: "oklch(0.7 0.03 220)" },
  ];
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="flex items-baseline justify-between mb-6">
        <span className="font-mono text-[11px] text-muted-foreground">weather.forecast</span>
        <span className="font-mono text-[11px] text-muted-foreground">4-hour cycle</span>
      </div>

      <div className="grid grid-cols-5 gap-2">
        {days.map((d) => {
          const Icon = d.icon;
          return (
            <div
              key={d.d}
              className={
                "rounded-lg border p-3 text-center " +
                (d.active ? "border-foreground/30 bg-secondary/40" : "border-border")
              }
            >
              <Icon size={22} className="mx-auto" style={{ color: d.color }} />
              <p className="mt-2 font-mono text-[10px] text-muted-foreground">{d.d}</p>
              <p className={"text-[11px] mt-0.5 " + (d.active ? "text-foreground font-medium" : "text-muted-foreground")}>
                {d.n}
              </p>
            </div>
          );
        })}
      </div>

      <div className="mt-5 grid grid-cols-2 gap-4 border-t border-border pt-4">
        <div>
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Growth multiplier</p>
          <p className="font-display text-2xl font-medium text-foreground mt-0.5 tabular">×1.5</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Water drain</p>
          <p className="font-display text-2xl font-medium text-foreground mt-0.5 tabular">×2.0</p>
        </div>
      </div>
    </div>
  );
}

function MutationVisual() {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="flex items-baseline justify-between mb-6">
        <span className="font-mono text-[11px] text-muted-foreground">mutation.detect()</span>
        <span className="font-mono text-[11px] text-terra">30% chance</span>
      </div>

      {/* Diagram: two plants → rare hybrid */}
      <svg viewBox="0 0 360 140" className="w-full h-auto">
        {/* Red rose */}
        <g transform="translate(40, 30)">
          <circle cx="0" cy="20" r="18" fill="oklch(0.62 0.16 15)" />
          <circle cx="-7" cy="15" r="11" fill="oklch(0.58 0.16 15)" />
          <circle cx="7" cy="15" r="11" fill="oklch(0.65 0.17 15)" />
          <circle cx="0" cy="10" r="9" fill="oklch(0.7 0.18 15)" />
          <path d="M0 38 L0 90" stroke="oklch(0.42 0.06 145)" strokeWidth="2" strokeLinecap="round" />
          <text x="0" y="115" textAnchor="middle" fontSize="11" fill="oklch(0.48 0.012 75)" fontFamily="serif" fontStyle="italic">
            Red Rose
          </text>
        </g>

        {/* Plus */}
        <text x="110" y="75" textAnchor="middle" fontSize="24" fill="oklch(0.7 0.01 75)" fontFamily="serif">
          +
        </text>

        {/* White rose */}
        <g transform="translate(160, 30)">
          <circle cx="0" cy="20" r="18" fill="oklch(0.94 0.01 75)" stroke="oklch(0.85 0.01 75)" strokeWidth="1" />
          <circle cx="-7" cy="15" r="11" fill="oklch(0.92 0.008 75)" stroke="oklch(0.85 0.01 75)" strokeWidth="1" />
          <circle cx="7" cy="15" r="11" fill="oklch(0.96 0.005 75)" stroke="oklch(0.85 0.01 75)" strokeWidth="1" />
          <circle cx="0" cy="10" r="9" fill="oklch(0.98 0.004 75)" stroke="oklch(0.85 0.01 75)" strokeWidth="1" />
          <path d="M0 38 L0 90" stroke="oklch(0.42 0.06 145)" strokeWidth="2" strokeLinecap="round" />
          <text x="0" y="115" textAnchor="middle" fontSize="11" fill="oklch(0.48 0.012 75)" fontFamily="serif" fontStyle="italic">
            White Rose
          </text>
        </g>

        {/* Arrow */}
        <g transform="translate(230, 50)">
          <path d="M0 25 L40 25" stroke="oklch(0.68 0.1 45)" strokeWidth="1.5" strokeDasharray="3 3" />
          <path d="M35 20 L40 25 L35 30" stroke="oklch(0.68 0.1 45)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </g>

        {/* Pink rose — rare hybrid */}
        <g transform="translate(300, 30)" className="animate-float-soft" style={{ transformOrigin: "300px 50px" }}>
          <circle cx="0" cy="20" r="18" fill="oklch(0.75 0.13 350)" />
          <circle cx="-7" cy="15" r="11" fill="oklch(0.72 0.13 350)" />
          <circle cx="7" cy="15" r="11" fill="oklch(0.78 0.12 350)" />
          <circle cx="0" cy="10" r="9" fill="oklch(0.82 0.1 350)" />
          <path d="M0 38 L0 90" stroke="oklch(0.42 0.06 145)" strokeWidth="2" strokeLinecap="round" />
          <text x="0" y="115" textAnchor="middle" fontSize="11" fill="oklch(0.68 0.1 45)" fontFamily="serif" fontStyle="italic" fontWeight="600">
            Pink Rose
          </text>
          {/* "rare" tag */}
          <rect x="-18" y="-12" width="36" height="14" rx="7" fill="oklch(0.68 0.1 45)" />
          <text x="0" y="-2" textAnchor="middle" fontSize="8" fill="white" fontFamily="monospace" letterSpacing="1">
            RARE
          </text>
        </g>
      </svg>

      <p className="mt-4 text-xs text-muted-foreground text-pretty border-t border-border pt-4">
        <span className="font-medium text-foreground">Hint appears</span> when compatible plants
        are adjacent. Discovery is logged in the Collection Book — never a baffling surprise.
      </p>
    </div>
  );
}

function UIVisual() {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="flex items-baseline justify-between mb-6">
        <span className="font-mono text-[11px] text-muted-foreground">viewer.render()</span>
        <span className="font-mono text-[11px] text-muted-foreground">Components v2</span>
      </div>

      {/* Minimal Discord-like panel — no fake chrome dots */}
      <div className="rounded-lg mockup-dark p-4">
        <div className="flex items-center gap-2.5 mb-3">
          <DaisyMarkMini />
          <div>
            <p className="text-sm font-semibold text-paper">DaisyFlower</p>
            <p className="text-[10px] text-paper/50 font-mono">/garden · just now</p>
          </div>
        </div>
        <p className="text-sm text-paper leading-relaxed">
          Harvest complete. You received{" "}
          <span className="text-gold font-medium">2 Sunflowers</span> and{" "}
          <span className="text-gold font-medium">10 XP</span>.
        </p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          <span className="rounded-md bg-sage text-white px-2.5 py-1 text-[11px] font-medium">
            Plant Again
          </span>
          <span className="rounded-md bg-white/10 text-paper px-2.5 py-1 text-[11px]">Inventory</span>
          <span className="rounded-md bg-white/10 text-paper px-2.5 py-1 text-[11px]">Shop</span>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 text-center">
        {[
          { label: "Buttons", sub: "primary action" },
          { label: "Menus", sub: "seed picker" },
          { label: "Modals", sub: "custom qty" },
        ].map((it) => (
          <div key={it.label} className="rounded-lg bg-secondary/40 px-2 py-2.5">
            <p className="font-display text-sm font-medium text-foreground">{it.label}</p>
            <p className="text-[10px] text-muted-foreground mt-0.5">{it.sub}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function DaisyMarkMini() {
  return (
    <svg width="20" height="20" viewBox="0 0 36 36" fill="none">
      <g fill="oklch(0.8 0.1 85)">
        <ellipse cx="18" cy="7" rx="2.8" ry="5" />
        <ellipse cx="18" cy="29" rx="2.8" ry="5" />
        <ellipse cx="7" cy="18" rx="5" ry="2.8" />
        <ellipse cx="29" cy="18" rx="5" ry="2.8" />
      </g>
      <circle cx="18" cy="18" r="4.5" fill="oklch(0.62 0.12 75)" />
    </svg>
  );
}

function I18nVisual() {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="flex items-baseline justify-between mb-6">
        <span className="font-mono text-[11px] text-muted-foreground">i18n.t('garden.title')</span>
        <span className="font-mono text-[11px] text-muted-foreground">pt-BR · en-US</span>
      </div>

      <div className="space-y-2.5">
        <div className="rounded-lg border border-border p-3 flex items-center justify-between">
          <div>
            <p className="font-mono text-[10px] text-muted-foreground">en-US</p>
            <p className="mt-0.5 text-sm text-foreground">Your Garden — Sunny weather</p>
          </div>
          <span className="font-mono text-[10px] text-sage">default</span>
        </div>
        <div className="rounded-lg border border-sage/30 bg-sage/[0.04] p-3 flex items-center justify-between">
          <div>
            <p className="font-mono text-[10px] text-muted-foreground">pt-BR</p>
            <p className="mt-0.5 text-sm text-foreground">Seu Jardim — Clima ensolarado</p>
          </div>
          <span className="font-mono text-[10px] text-sage">auto-detected</span>
        </div>
      </div>

      <p className="mt-5 text-xs text-muted-foreground text-pretty border-t border-border pt-4">
        Per-command JSON files. Adding a language is a folder of translations — no code changes.
      </p>
    </div>
  );
}

function ContentPackVisual() {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="flex items-baseline justify-between mb-6">
        <span className="font-mono text-[11px] text-muted-foreground">src/data/seeds.json</span>
        <span className="font-mono text-[11px] text-sage">+1 file = +1 plant</span>
      </div>

      {/* File tree visualization */}
      <div className="rounded-lg border border-border bg-secondary/30 p-4 font-mono text-[12px]">
        <div className="text-muted-foreground">src/data/</div>
        <div className="mt-1.5 space-y-0.5 pl-3">
          <div className="text-foreground">seeds.json <span className="text-muted-foreground">— 4 entries</span></div>
          <div className="text-foreground">flowers.json <span className="text-muted-foreground">— 2 entries</span></div>
          <div className="text-foreground">weather.json <span className="text-muted-foreground">— 4 entries</span></div>
          <div className="text-foreground">mutations.json <span className="text-muted-foreground">— 1 recipe</span></div>
          <div className="text-foreground">items.json <span className="text-muted-foreground">— 2 entries</span></div>
          <div className="text-foreground">decorations.json <span className="text-muted-foreground">— 2 entries</span></div>
          <div className="mt-1.5 text-sage">
            + lavender.json <span className="text-muted-foreground italic">{"// you add this"}</span>
          </div>
        </div>
      </div>

      <p className="mt-5 text-xs text-muted-foreground text-pretty border-t border-border pt-4">
        Seeds, weather, mutations, items, decorations — all data-driven. New content appears in
        shop, autocomplete, and validation without touching core systems.
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
    body: "Weather rotates on a 4-hour cycle with a 5-step forecast. Sunny accelerates growth but drains water. Rain refills soil for free. Storms slow things down but open rare mutation chances. Snow hints at future winter plants.",
    visual: <WeatherVisual />,
  },
  {
    eyebrow: "Mutations",
    title: "Discovery, not random confusion.",
    body: "Plant a Red Rose and a White Rose side by side. When both mature, there's a 30% chance one blooms as a rare Pink Rose. Hints appear when adjacency is right, and discoveries are recorded in the Collection Book.",
    visual: <MutationVisual />,
  },
  {
    eyebrow: "Interface",
    title: "Panels, not commands to memorize.",
    body: "Commands are entry points. The actual game lives in viewers — Discord Components v2 panels with buttons, select menus, and modals. Plant, water, harvest, buy, sell: all guided flows that explain themselves.",
    visual: <UIVisual />,
  },
  {
    eyebrow: "Languages",
    title: "Bilingual by design, not bolted on.",
    body: "Built-in pt-BR and en-US locales with per-command translation files, Discord locale detection, user and guild language preferences. Adding a language is a folder of JSON — no code changes.",
    visual: <I18nVisual />,
  },
  {
    eyebrow: "Content",
    title: "New plants arrive as JSON files.",
    body: "Seeds, flowers, crops, weather, mutations, items, decorations — all data-driven from src/data. Adding a plant means adding an object to a JSON file. No core rewrites, no migrations, no downtime.",
    visual: <ContentPackVisual />,
  },
];
