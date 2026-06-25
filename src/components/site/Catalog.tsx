"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  SEEDS,
  FLOWERS,
  CROPS,
  WEATHER,
  MUTATIONS,
  ITEMS,
  DECORATIONS,
  type Rarity,
} from "@/lib/daisy-data";
import { SectionHeader } from "./Features";
import { cn } from "@/lib/utils";

type Tab = "seeds" | "flowers" | "crops" | "weather" | "mutations" | "items" | "decorations";

const TABS: { id: Tab; label: string; emoji: string }[] = [
  { id: "seeds", label: "Seeds", emoji: "🌱" },
  { id: "flowers", label: "Flowers", emoji: "🌸" },
  { id: "crops", label: "Crops", emoji: "🥕" },
  { id: "weather", label: "Weather", emoji: "🌦️" },
  { id: "mutations", label: "Mutations", emoji: "🧬" },
  { id: "items", label: "Tools", emoji: "🚿" },
  { id: "decorations", label: "Decor", emoji: "🎃" },
];

const RARITY_STYLES: Record<Rarity, { label: string; chip: string }> = {
  common: { label: "Common", chip: "bg-secondary text-secondary-foreground" },
  uncommon: { label: "Uncommon", chip: "bg-leaf/15 text-leaf-deep" },
  rare: { label: "Rare", chip: "bg-sky-soft/30 text-foreground" },
  epic: { label: "Epic", chip: "bg-rose-petal/15 text-rose-petal" },
  legendary: { label: "Legendary", chip: "bg-sun/25 text-sun-deep" },
};

function formatGrowthTime(seconds: number) {
  if (seconds < 60) return `${seconds}s`;
  const m = Math.floor(seconds / 60);
  const r = seconds % 60;
  return r ? `${m}m ${r}s` : `${m}m`;
}

export function Catalog() {
  const [tab, setTab] = useState<Tab>("seeds");

  return (
    <section id="catalog" className="py-20 md:py-28 scroll-mt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="In-game catalog"
          title={
            <>
              Seeds, weather, and <span className="text-primary">rare hybrids</span>
            </>
          }
          description="A peek at the static game data shipped with DaisyFlower. Every entry is a JSON record in src/data — adding new content means adding new files, not rewriting core systems."
        />

        {/* Tabs */}
        <div className="mt-10 flex justify-center">
          <div
            className="inline-flex flex-wrap justify-center gap-1 rounded-2xl border border-border bg-card p-1.5 shadow-sm"
            role="tablist"
          >
            {TABS.map((t) => (
              <button
                key={t.id}
                role="tab"
                aria-selected={tab === t.id}
                onClick={() => setTab(t.id)}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs sm:text-sm font-semibold transition-all",
                  tab === t.id
                    ? "bg-primary text-primary-foreground shadow"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                )}
              >
                <span aria-hidden>{t.emoji}</span>
                <span>{t.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Panel */}
        <div className="mt-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              {tab === "seeds" && <SeedsPanel />}
              {tab === "flowers" && <FlowersPanel />}
              {tab === "crops" && <CropsPanel />}
              {tab === "weather" && <WeatherPanel />}
              {tab === "mutations" && <MutationsPanel />}
              {tab === "items" && <ItemsPanel />}
              {tab === "decorations" && <DecorationsPanel />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function RarityChip({ rarity }: { rarity: Rarity }) {
  const style = RARITY_STYLES[rarity];
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide",
        style.chip
      )}
    >
      {style.label}
    </span>
  );
}

function CardGrid({ children }: { children: React.ReactNode }) {
  return <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">{children}</div>;
}

function SeedsPanel() {
  return (
    <CardGrid>
      {SEEDS.map((s) => {
        const style = RARITY_STYLES[s.rarity];
        return (
          <article
            key={s.id}
            className="card-garden card-garden-hover rounded-2xl p-5 border"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="grid place-items-center h-14 w-14 rounded-xl bg-secondary text-3xl">
                  {s.emoji}
                </span>
                <div>
                  <h3 className="font-display text-lg font-bold text-foreground leading-tight">
                    {s.name}
                  </h3>
                  <p className="text-[11px] font-mono text-muted-foreground">{s.id}</p>
                </div>
              </div>
              <RarityChip rarity={s.rarity} />
            </div>

            <p className="mt-3 text-sm text-muted-foreground text-pretty">{s.description}</p>

            <dl className="mt-4 grid grid-cols-2 gap-2 text-xs">
              <div className="rounded-lg bg-background/60 px-3 py-2">
                <dt className="text-muted-foreground">Growth time</dt>
                <dd className="font-semibold text-foreground">{formatGrowthTime(s.growthTime)}</dd>
              </div>
              <div className="rounded-lg bg-background/60 px-3 py-2">
                <dt className="text-muted-foreground">Min humidity</dt>
                <dd className="font-semibold text-foreground">{s.requiredHumidity}%</dd>
              </div>
              <div className="rounded-lg bg-background/60 px-3 py-2">
                <dt className="text-muted-foreground">Source</dt>
                <dd className="font-semibold text-foreground capitalize">{s.source}</dd>
              </div>
              <div className="rounded-lg bg-background/60 px-3 py-2">
                <dt className="text-muted-foreground">Price</dt>
                <dd className="font-semibold text-foreground">
                  {s.price ? `🪙 ${s.price}` : "—"}
                </dd>
              </div>
            </dl>
          </article>
        );
      })}
    </CardGrid>
  );
}

function FlowersPanel() {
  return (
    <CardGrid>
      {FLOWERS.map((f) => (
        <article key={f.id} className="card-garden card-garden-hover rounded-2xl p-5 border">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="grid place-items-center h-14 w-14 rounded-xl bg-rose-petal/10 text-3xl">
                {f.emoji}
              </span>
              <div>
                <h3 className="font-display text-lg font-bold text-foreground leading-tight">
                  {f.name}
                </h3>
                <p className="text-[11px] font-mono text-muted-foreground">{f.id}</p>
              </div>
            </div>
            <RarityChip rarity={f.rarity} />
          </div>
          <p className="mt-3 text-sm text-muted-foreground text-pretty">{f.description}</p>
          <div className="mt-4 inline-flex items-center gap-2 rounded-lg bg-sun/15 px-3 py-2 text-sm">
            <span aria-hidden>🪙</span>
            <span className="font-semibold text-sun-deep">Sells for {f.sellPrice}</span>
          </div>
        </article>
      ))}
    </CardGrid>
  );
}

function CropsPanel() {
  return (
    <CardGrid>
      {CROPS.map((c) => (
        <article key={c.id} className="card-garden card-garden-hover rounded-2xl p-5 border">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="grid place-items-center h-14 w-14 rounded-xl bg-sun/15 text-3xl">
                {c.emoji}
              </span>
              <div>
                <h3 className="font-display text-lg font-bold text-foreground leading-tight">
                  {c.name}
                </h3>
                <p className="text-[11px] font-mono text-muted-foreground">{c.id}</p>
              </div>
            </div>
            <RarityChip rarity={c.rarity} />
          </div>
          <p className="mt-3 text-sm text-muted-foreground text-pretty">{c.description}</p>
          <div className="mt-4 inline-flex items-center gap-2 rounded-lg bg-sun/15 px-3 py-2 text-sm">
            <span aria-hidden>🪙</span>
            <span className="font-semibold text-sun-deep">Sells for {c.sellPrice}</span>
          </div>
        </article>
      ))}
    </CardGrid>
  );
}

function WeatherPanel() {
  const toneBg: Record<string, string> = {
    sun: "from-sun/20 to-transparent",
    rain: "from-sky-soft/30 to-transparent",
    storm: "from-leaf-deep/15 to-transparent",
    snow: "from-sky-soft/20 to-transparent",
  };
  return (
    <CardGrid>
      {WEATHER.map((w) => (
        <article
          key={w.id}
          className="card-garden card-garden-hover rounded-2xl p-5 border relative overflow-hidden"
        >
          <div
            className={cn("pointer-events-none absolute inset-0 bg-gradient-to-br opacity-70", toneBg[w.tone])}
            aria-hidden
          />
          <div className="relative">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <span className="grid place-items-center h-14 w-14 rounded-xl bg-card border border-border text-3xl shadow-sm">
                  {w.emoji}
                </span>
                <div>
                  <h3 className="font-display text-lg font-bold text-foreground leading-tight">
                    {w.label}
                  </h3>
                  <p className="text-[11px] font-mono text-muted-foreground">{w.id}</p>
                </div>
              </div>
            </div>
            <p className="mt-3 text-sm text-muted-foreground text-pretty">{w.description}</p>
            <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
              <div className="rounded-lg bg-background/60 px-3 py-2">
                <dt className="text-muted-foreground">Growth ×</dt>
                <dd className="font-semibold text-foreground">{w.growthMultiplier.toFixed(1)}</dd>
              </div>
              <div className="rounded-lg bg-background/60 px-3 py-2">
                <dt className="text-muted-foreground">Hydration loss ×</dt>
                <dd className="font-semibold text-foreground">
                  {w.hydrationLossMultiplier.toFixed(1)}
                </dd>
              </div>
            </div>
          </div>
        </article>
      ))}
    </CardGrid>
  );
}

function MutationsPanel() {
  return (
    <div className="grid gap-5">
      {MUTATIONS.map((m) => (
        <article key={m.id} className="card-garden rounded-2xl p-6 border relative overflow-hidden">
          <div
            className="pointer-events-none absolute inset-0 opacity-50"
            style={{
              background:
                "radial-gradient(ellipse at right, oklch(0.65 0.21 15 / 0.15), transparent 60%)",
            }}
            aria-hidden
          />
          <div className="relative grid lg:grid-cols-[auto_1fr_auto] gap-6 items-center">
            {/* Inputs */}
            <div className="flex items-center gap-3">
              {m.inputsEmojis.map((e, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="grid place-items-center h-16 w-16 rounded-2xl bg-card border border-border text-3xl shadow-sm">
                    {e}
                  </span>
                  {i < m.inputsEmojis.length - 1 && (
                    <span className="font-display text-2xl text-muted-foreground">+</span>
                  )}
                </div>
              ))}
            </div>

            {/* Center description */}
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-display text-xl font-bold text-foreground">{m.output}</h3>
                <span className="inline-flex items-center gap-1 rounded-full bg-rose-petal/15 px-2 py-0.5 text-[10px] font-bold uppercase text-rose-petal">
                  Mutation · {Math.round(m.chance * 100)}% chance
                </span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground text-pretty">{m.description}</p>
              <p className="mt-2 text-xs text-muted-foreground">
                <span className="font-semibold">Inputs:</span> {m.inputs.join(" + ")}
              </p>
            </div>

            {/* Output */}
            <div className="flex flex-col items-center">
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                Yields
              </span>
              <span className="mt-1 grid place-items-center h-20 w-20 rounded-2xl bg-rose-petal/10 text-4xl shadow-sm animate-float-slow">
                {m.outputEmoji}
              </span>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

function ItemsPanel() {
  return (
    <CardGrid>
      {ITEMS.map((it) => (
      <article key={it.id} className="card-garden card-garden-hover rounded-2xl p-5 border">
        <div className="flex items-start gap-3">
          <span className="grid place-items-center h-14 w-14 rounded-xl bg-secondary text-3xl">
            {it.emoji}
          </span>
          <div>
            <h3 className="font-display text-lg font-bold text-foreground leading-tight">
              {it.name}
            </h3>
            <p className="text-[11px] font-mono text-muted-foreground">{it.id}</p>
            <span className="inline-flex items-center mt-1 rounded-full bg-leaf/10 px-2 py-0.5 text-[10px] font-bold uppercase text-leaf-deep">
              {it.type}
            </span>
          </div>
        </div>
        <p className="mt-3 text-sm text-muted-foreground text-pretty">{it.description}</p>
        <div className="mt-4 inline-flex items-center gap-2 rounded-lg bg-sun/15 px-3 py-2 text-sm">
          <span aria-hidden>🪙</span>
          <span className="font-semibold text-sun-deep">{it.price}</span>
        </div>
      </article>
      ))}
    </CardGrid>
  );
}

function DecorationsPanel() {
  return (
    <CardGrid>
      {DECORATIONS.map((d) => (
      <article key={d.id} className="card-garden card-garden-hover rounded-2xl p-5 border">
        <div className="flex items-start gap-3">
          <span className="grid place-items-center h-14 w-14 rounded-xl bg-sun/15 text-3xl">
            {d.emoji}
          </span>
          <div>
            <h3 className="font-display text-lg font-bold text-foreground leading-tight">{d.name}</h3>
            <p className="text-[11px] font-mono text-muted-foreground">{d.id}</p>
            <span className="inline-flex items-center mt-1 rounded-full bg-sun/20 px-2 py-0.5 text-[10px] font-bold uppercase text-sun-deep">
              Decoration
            </span>
          </div>
        </div>
        <p className="mt-3 text-sm text-muted-foreground text-pretty">{d.description}</p>
        <div className="mt-4 inline-flex items-center gap-2 rounded-lg bg-sun/15 px-3 py-2 text-sm">
          <span aria-hidden>🪙</span>
          <span className="font-semibold text-sun-deep">{d.price}</span>
        </div>
      </article>
      ))}
    </CardGrid>
  );
}
