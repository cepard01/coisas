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
import { SectionHeading } from "./Features";
import { cn } from "@/lib/utils";

type Tab = "seeds" | "flowers" | "crops" | "weather" | "mutations" | "items" | "decorations";

const TABS: { id: Tab; label: string; emoji: string; count: number }[] = [
  { id: "seeds", label: "Seeds", emoji: "🌱", count: SEEDS.length },
  { id: "flowers", label: "Flowers", emoji: "🌸", count: FLOWERS.length },
  { id: "crops", label: "Crops", emoji: "🥕", count: CROPS.length },
  { id: "weather", label: "Weather", emoji: "🌦️", count: WEATHER.length },
  { id: "mutations", label: "Mutations", emoji: "🧬", count: MUTATIONS.length },
  { id: "items", label: "Tools", emoji: "🚿", count: ITEMS.length },
  { id: "decorations", label: "Decor", emoji: "🎃", count: DECORATIONS.length },
];

const RARITY_STYLES: Record<Rarity, { label: string; chip: string; dot: string }> = {
  common: { label: "Common", chip: "bg-secondary text-secondary-foreground", dot: "bg-muted-foreground/40" },
  uncommon: { label: "Uncommon", chip: "bg-sage/15 text-sage-deep", dot: "bg-sage" },
  rare: { label: "Rare", chip: "bg-sky-soft/30 text-foreground", dot: "bg-sky-soft" },
  epic: { label: "Epic", chip: "bg-terra/15 text-terra-deep", dot: "bg-terra" },
  legendary: { label: "Legendary", chip: "bg-gold/25 text-gold-deep", dot: "bg-gold" },
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
    <section id="catalog" className="py-24 md:py-32 scroll-mt-16 border-t border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          number="03"
          eyebrow="Catalog"
          title={
            <>
              Real game data,
              <br className="hidden sm:block" /> <em className="font-normal text-sage">straight from the repo.</em>
            </>
          }
          description="Every entry below is a JSON record in src/data. Adding new content means adding new files — no core rewrites. This is the actual data shipped with DaisyFlower today."
        />

        {/* Tabs */}
        <div className="mt-12 flex flex-wrap gap-1.5">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={cn(
                "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all",
                tab === t.id
                  ? "border-foreground bg-foreground text-background"
                  : "border-border bg-card text-muted-foreground hover:text-foreground hover:border-foreground/30"
              )}
            >
              <span aria-hidden>{t.emoji}</span>
              <span>{t.label}</span>
              <span className={cn(
                "font-mono text-[10px] tabular-nums",
                tab === t.id ? "text-background/60" : "text-muted-foreground/60"
              )}>
                {t.count}
              </span>
            </button>
          ))}
        </div>

        {/* Panel */}
        <div className="mt-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
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
  const s = RARITY_STYLES[rarity];
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide", s.chip)}>
      <span className={cn("h-1.5 w-1.5 rounded-full", s.dot)} />
      {s.label}
    </span>
  );
}

function CardGrid({ children }: { children: React.ReactNode }) {
  return <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">{children}</div>;
}

function ItemId({ id }: { id: string }) {
  return <code className="font-mono text-[11px] text-muted-foreground">{id}</code>;
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-background/40 px-3 py-2">
      <dt className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</dt>
      <dd className="mt-0.5 font-display text-sm font-semibold text-foreground">{value}</dd>
    </div>
  );
}

function SeedsPanel() {
  return (
    <CardGrid>
      {SEEDS.map((s) => (
        <article key={s.id} className="card-hairline card-hairline-hover rounded-2xl p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="grid place-items-center h-12 w-12 rounded-xl bg-secondary text-2xl">{s.emoji}</span>
              <div>
                <h3 className="font-display text-base font-semibold text-foreground leading-tight">{s.name}</h3>
                <ItemId id={s.id} />
              </div>
            </div>
            <RarityChip rarity={s.rarity} />
          </div>
          <p className="mt-3 text-sm text-muted-foreground text-pretty">{s.description}</p>
          <dl className="mt-4 grid grid-cols-2 gap-2">
            <Stat label="Growth" value={formatGrowthTime(s.growthTime)} />
            <Stat label="Min humidity" value={`${s.requiredHumidity}%`} />
            <Stat label="Source" value={<span className="capitalize">{s.source}</span>} />
            <Stat label="Price" value={s.price ? `🪙 ${s.price}` : "—"} />
          </dl>
        </article>
      ))}
    </CardGrid>
  );
}

function FlowersPanel() {
  return (
    <CardGrid>
      {FLOWERS.map((f) => (
        <article key={f.id} className="card-hairline card-hairline-hover rounded-2xl p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="grid place-items-center h-12 w-12 rounded-xl bg-terra/10 text-2xl">{f.emoji}</span>
              <div>
                <h3 className="font-display text-base font-semibold text-foreground leading-tight">{f.name}</h3>
                <ItemId id={f.id} />
              </div>
            </div>
            <RarityChip rarity={f.rarity} />
          </div>
          <p className="mt-3 text-sm text-muted-foreground text-pretty">{f.description}</p>
          <div className="mt-4 flex items-center gap-2">
            <span className="text-lg">🪙</span>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Sell price</p>
              <p className="font-display text-base font-semibold text-foreground">{f.sellPrice} Daisies</p>
            </div>
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
        <article key={c.id} className="card-hairline card-hairline-hover rounded-2xl p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="grid place-items-center h-12 w-12 rounded-xl bg-gold/15 text-2xl">{c.emoji}</span>
              <div>
                <h3 className="font-display text-base font-semibold text-foreground leading-tight">{c.name}</h3>
                <ItemId id={c.id} />
              </div>
            </div>
            <RarityChip rarity={c.rarity} />
          </div>
          <p className="mt-3 text-sm text-muted-foreground text-pretty">{c.description}</p>
          <div className="mt-4 flex items-center gap-2">
            <span className="text-lg">🪙</span>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Sell price</p>
              <p className="font-display text-base font-semibold text-foreground">{c.sellPrice} Daisies</p>
            </div>
          </div>
        </article>
      ))}
    </CardGrid>
  );
}

function WeatherPanel() {
  const toneBg: Record<string, string> = {
    sun: "from-gold/15",
    rain: "from-sky-soft/20",
    storm: "from-sage-deep/15",
    snow: "from-sky-soft/15",
  };
  return (
    <CardGrid>
      {WEATHER.map((w) => (
        <article key={w.id} className="card-hairline card-hairline-hover rounded-2xl p-5 relative overflow-hidden">
          <div className={cn("pointer-events-none absolute inset-0 bg-gradient-to-br to-transparent opacity-60", toneBg[w.tone])} aria-hidden />
          <div className="relative">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <span className="grid place-items-center h-12 w-12 rounded-xl bg-card border border-border text-2xl">{w.emoji}</span>
                <div>
                  <h3 className="font-display text-base font-semibold text-foreground leading-tight">{w.label}</h3>
                  <ItemId id={w.id} />
                </div>
              </div>
            </div>
            <p className="mt-3 text-sm text-muted-foreground text-pretty">{w.description}</p>
            <dl className="mt-4 grid grid-cols-2 gap-2">
              <Stat label="Growth ×" value={w.growthMultiplier.toFixed(1)} />
              <Stat label="Water drain ×" value={w.hydrationLossMultiplier.toFixed(1)} />
            </dl>
          </div>
        </article>
      ))}
    </CardGrid>
  );
}

function MutationsPanel() {
  return (
    <div className="grid gap-4">
      {MUTATIONS.map((m) => (
        <article key={m.id} className="card-hairline rounded-2xl p-6 sm:p-7">
          <div className="grid lg:grid-cols-[auto_1fr_auto] gap-6 items-center">
            <div className="flex items-center gap-3">
              {m.inputsEmojis.map((e, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="grid place-items-center h-14 w-14 rounded-xl bg-card border border-border text-2xl">{e}</span>
                  {i < m.inputsEmojis.length - 1 && (
                    <span className="font-display text-xl text-muted-foreground">+</span>
                  )}
                </div>
              ))}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-display text-lg font-semibold text-foreground">{m.output}</h3>
                <span className="inline-flex items-center gap-1 rounded-full bg-terra/15 px-2 py-0.5 text-[10px] font-semibold uppercase text-terra-deep">
                  {Math.round(m.chance * 100)}% chance
                </span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground text-pretty">{m.description}</p>
              <p className="mt-2 text-xs text-muted-foreground">
                <span className="font-semibold">Inputs:</span> {m.inputs.join(" + ")}
              </p>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Yields</span>
              <span className="mt-1 grid place-items-center h-16 w-16 rounded-2xl bg-terra/10 text-3xl animate-float-soft">{m.outputEmoji}</span>
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
        <article key={it.id} className="card-hairline card-hairline-hover rounded-2xl p-5">
          <div className="flex items-start gap-3">
            <span className="grid place-items-center h-12 w-12 rounded-xl bg-secondary text-2xl">{it.emoji}</span>
            <div>
              <h3 className="font-display text-base font-semibold text-foreground leading-tight">{it.name}</h3>
              <ItemId id={it.id} />
              <span className="inline-flex items-center mt-1 rounded-full bg-sage/10 px-2 py-0.5 text-[10px] font-semibold uppercase text-sage-deep">
                {it.type}
              </span>
            </div>
          </div>
          <p className="mt-3 text-sm text-muted-foreground text-pretty">{it.description}</p>
          <div className="mt-4 flex items-center gap-2">
            <span className="text-lg">🪙</span>
            <p className="font-display text-base font-semibold text-foreground">{it.price} Daisies</p>
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
        <article key={d.id} className="card-hairline card-hairline-hover rounded-2xl p-5">
          <div className="flex items-start gap-3">
            <span className="grid place-items-center h-12 w-12 rounded-xl bg-gold/15 text-2xl">{d.emoji}</span>
            <div>
              <h3 className="font-display text-base font-semibold text-foreground leading-tight">{d.name}</h3>
              <ItemId id={d.id} />
              <span className="inline-flex items-center mt-1 rounded-full bg-gold/20 px-2 py-0.5 text-[10px] font-semibold uppercase text-gold-deep">
                Decoration
              </span>
            </div>
          </div>
          <p className="mt-3 text-sm text-muted-foreground text-pretty">{d.description}</p>
          <div className="mt-4 flex items-center gap-2">
            <span className="text-lg">🪙</span>
            <p className="font-display text-base font-semibold text-foreground">{d.price} Daisies</p>
          </div>
        </article>
      ))}
    </CardGrid>
  );
}
