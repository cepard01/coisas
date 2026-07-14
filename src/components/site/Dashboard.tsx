"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { useI18n } from "@/hooks/use-i18n";
import {
  SproutIcon,
  WalletIcon,
  ListIcon,
  BookIcon,
  BellIcon,
  GearIcon,
  SunIcon,
  DropletIcon,
  ClockIcon,
  SparkIcon,
  TrendingIcon,
  CheckIcon,
  LockIcon,
  DaisyMark,
} from "./icons";
import { cn } from "@/lib/utils";

type Tab = "garden" | "wallet" | "missions" | "collection";

export function DashboardLayout({
  tab,
  onTab,
  player,
}: {
  tab: Tab;
  onTab?: (t: Tab) => void;
  player?: { username: string; level: number };
}) {
  const { t } = useI18n();
  const d = t.panel.dashboard;

  const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
    { id: "garden", label: d.tabs.garden, icon: SproutIcon },
    { id: "wallet", label: d.tabs.wallet, icon: WalletIcon },
    { id: "missions", label: d.tabs.missions, icon: ListIcon },
    { id: "collection", label: d.tabs.collection, icon: BookIcon },
  ];

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-secondary/30">
        <span className="font-mono text-[11px] text-muted-foreground">{d.url}</span>
        <span className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-sage animate-pulse-dot" />
          {d.synced}
        </span>
      </div>

      <div className="grid lg:grid-cols-[200px_1fr]">
        <aside className="border-b lg:border-b-0 lg:border-r border-border p-3">
          <div className="flex items-center gap-2.5 p-2 rounded-lg border border-border bg-background">
            <span className="grid place-items-center h-8 w-8 rounded-full bg-sage/10 shrink-0">
              <DaisyMark size={16} className="text-sage" />
            </span>
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground truncate">
                {player?.username ?? "gardener"}
              </p>
              <p className="text-[11px] text-muted-foreground">{t.userMenu.level} {player?.level ?? 7}</p>
            </div>
          </div>

          <nav className="mt-3 space-y-0.5">
            {tabs.map((tb) => (
              <button
                key={tb.id}
                onClick={() => onTab?.(tb.id)}
                disabled={!onTab}
                className={cn(
                  "w-full flex items-center gap-2.5 rounded-md px-2.5 py-1.5 text-sm transition-colors text-left",
                  tab === tb.id
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/60",
                  !onTab && "cursor-default"
                )}
              >
                <tb.icon size={15} className="shrink-0" />
                {tb.label}
              </button>
            ))}
          </nav>

          <div className="mt-4 pt-3 border-t border-border space-y-0.5">
            <button className="w-full flex items-center gap-2.5 rounded-md px-2.5 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-colors text-left">
              <BellIcon size={15} className="shrink-0" /> {d.alerts}
            </button>
            <button className="w-full flex items-center gap-2.5 rounded-md px-2.5 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-colors text-left">
              <GearIcon size={15} className="shrink-0" /> {d.settings}
            </button>
          </div>
        </aside>

        <div className="p-5 sm:p-6 lg:p-8">
          {tab === "garden" && <GardenTab />}
          {tab === "wallet" && <WalletTab />}
          {tab === "missions" && <MissionsTab />}
          {tab === "collection" && <CollectionTab />}
        </div>
      </div>
    </div>
  );
}

function TabHeader({ title, subtitle, action }: { title: string; subtitle: string; action?: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4 mb-7">
      <div>
        <h3 className="font-display text-2xl font-medium text-foreground">{title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
      </div>
      {action}
    </div>
  );
}

function MiniStat({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-background p-3">
      <Icon size={14} className="text-muted-foreground mb-2" />
      <p className="font-display text-base font-medium text-foreground tabular">{value}</p>
      <p className="text-[10px] text-muted-foreground">{label}</p>
    </div>
  );
}

function GardenTab() {
  const { t } = useI18n();
  const g = t.panel.dashboard.garden;
  return (
    <div>
      <TabHeader
        title={g.title}
        subtitle={g.subtitle}
        action={
          <div className="hidden sm:flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5">
            <SunIcon size={14} className="text-gold-deep" />
            <span className="text-xs font-medium text-foreground">{g.weather}</span>
            <span className="font-mono text-[10px] text-muted-foreground">×1.5</span>
          </div>
        }
      />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-7">
        <MiniStat icon={SproutIcon} label={g.slotsUsed} value="4 / 6" />
        <MiniStat icon={DropletIcon} label={g.humidity} value="50%" />
        <MiniStat icon={ClockIcon} label={g.nextReady} value="~18m" />
        <MiniStat icon={SparkIcon} label={g.mutationHint} value="✓" />
      </div>

      <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground mb-3">
        {g.slotsLabel}
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
        {g.slots.map((slot, i) => (
          <DashSlot
            key={i}
            emoji={slot.emoji}
            name={slot.name}
            progress={slot.progress}
            eta={slot.eta}
          />
        ))}
        <DashSlot emoji={g.readySlot.emoji} name={g.readySlot.name} progress={100} ready />
        <DashSlot empty />
        <DashSlot empty />
      </div>

      <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground mt-7 mb-3">
        {g.activityLabel}
      </p>
      <div className="space-y-2.5">
        {g.activity.map((a, i) => (
          <ActivityRow key={i} time={a.time} text={a.text} tone={a.tone} />
        ))}
      </div>
    </div>
  );
}

function DashSlot({
  emoji,
  name,
  progress,
  eta,
  ready,
  empty,
}: {
  emoji?: string;
  name?: string;
  progress?: number;
  eta?: string;
  ready?: boolean;
  empty?: boolean;
}) {
  const { t } = useI18n();
  const g = t.panel.dashboard.garden;
  if (empty) {
    return (
      <div className="rounded-lg border border-dashed border-border bg-background/30 p-3">
        <p className="font-mono text-[11px] text-muted-foreground/60">{g.empty}</p>
        <p className="mt-3 text-[11px] text-muted-foreground/50">{g.plantHere}</p>
      </div>
    );
  }
  return (
    <div className={cn("rounded-lg border p-3", ready ? "border-sage/40 bg-sage/[0.04]" : "border-border bg-background")}>
      <div className="flex items-center justify-between">
        <span className="text-lg">{emoji}</span>
        <span className={cn("font-mono text-[9px] uppercase tracking-wider", ready ? "text-sage" : "text-muted-foreground")}>
          {ready ? g.ready : g.growing}
        </span>
      </div>
      <p className="mt-1.5 text-sm font-medium text-foreground">{name}</p>
      {ready ? (
        <p className="mt-1 text-[11px] text-sage font-medium">{g.harvestNow}</p>
      ) : (
        <>
          <div className="mt-1.5 h-0.5 w-full rounded-full bg-secondary overflow-hidden">
            <div className="h-full rounded-full bg-sage-soft" style={{ width: `${progress}%` }} />
          </div>
          <p className="mt-1 font-mono text-[10px] text-muted-foreground tabular">{eta}</p>
        </>
      )}
    </div>
  );
}

function ActivityRow({ time, text, tone }: { time: string; text: string; tone: "sage" | "sky" | "gold" | "ink" }) {
  const tones = { sage: "bg-sage", sky: "bg-sky-soft", gold: "bg-gold", ink: "bg-foreground/30" };
  return (
    <div className="flex items-start gap-3 text-sm">
      <span className={cn("h-1.5 w-1.5 rounded-full mt-1.5 shrink-0", tones[tone])} />
      <p className="flex-1 text-foreground/90">{text}</p>
      <span className="font-mono text-[11px] text-muted-foreground shrink-0 tabular">{time}</span>
    </div>
  );
}

function WalletTab() {
  const { t } = useI18n();
  const w = t.panel.dashboard.wallet;
  return (
    <div>
      <TabHeader title={w.title} subtitle={w.subtitle} />

      <div className="border-b border-border pb-6 mb-6">
        <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{w.balance}</p>
        <div className="mt-1 flex items-baseline gap-3">
          <p className="font-display text-5xl font-medium text-foreground marker-num tabular">1,240</p>
          <span className="text-sm text-muted-foreground">{w.daisies}</span>
        </div>
        <p className="mt-2 text-xs text-sage flex items-center gap-1">
          <TrendingIcon size={12} /> {w.thisWeek}
        </p>
      </div>

      <div className="mb-6">
        <div className="flex items-baseline justify-between mb-2">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{w.level}</p>
            <p className="font-display text-lg font-medium text-foreground">{w.levelName}</p>
          </div>
          <span className="font-mono text-sm text-muted-foreground tabular">{w.xpToNext}</span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-secondary overflow-hidden">
          <div className="h-full w-[71%] rounded-full bg-sage" />
        </div>
        <p className="mt-2 text-xs text-muted-foreground">{w.unlocks}</p>
      </div>

      <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground mb-3">
        {w.transactions}
      </p>
      <div className="divide-y divide-border">
        {w.transactionsRows.map((tx, i) => (
          <TxRow key={i} {...tx} />
        ))}
      </div>
    </div>
  );
}

function TxRow({ icon, label, amount, time, positive }: { icon: string; label: string; amount: string; time: string; positive?: boolean }) {
  return (
    <div className="flex items-center gap-3 py-3">
      <span className="grid place-items-center h-7 w-7 rounded-md bg-secondary text-xs shrink-0">{icon}</span>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-foreground truncate">{label}</p>
        <p className="font-mono text-[11px] text-muted-foreground tabular">{time}</p>
      </div>
      <span className={cn("font-mono text-sm font-medium tabular", positive ? "text-sage" : "text-foreground")}>
        {amount}
      </span>
    </div>
  );
}

function MissionsTab() {
  const { t } = useI18n();
  const m = t.panel.dashboard.missions;
  return (
    <div>
      <TabHeader
        title={m.title}
        subtitle={m.subtitle}
        action={
          <span className="hidden sm:inline-flex items-center gap-1.5 font-mono text-[11px] text-muted-foreground">
            <TrendingIcon size={13} className="text-sage" /> {m.streak}
          </span>
        }
      />

      <div className="divide-y divide-border">
        {m.items.map((item, i) => (
          <div key={i} className="flex items-center gap-4 py-3.5">
            <span className={cn(
              "grid place-items-center h-7 w-7 rounded-full shrink-0 text-xs",
              item.done ? "bg-sage text-white" : item.locked ? "bg-secondary text-muted-foreground/50" : "bg-secondary text-muted-foreground"
            )}>
              {item.done ? <CheckIcon size={13} /> : item.locked ? <LockIcon size={12} /> : i + 1}
            </span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{item.type}</span>
                {item.progress && <span className="font-mono text-[10px] text-foreground tabular">{item.progress}</span>}
              </div>
              <p className={cn("text-sm mt-0.5", item.done ? "text-muted-foreground line-through" : "text-foreground font-medium")}>
                {item.title}
              </p>
            </div>
            <span className="text-xs text-muted-foreground shrink-0">{item.reward}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function CollectionTab() {
  const { t } = useI18n();
  const c = t.panel.dashboard.collection;
  const rarityColor: Record<string, string> = {
    Common: "text-muted-foreground",
    Uncommon: "text-sage",
    Rare: "text-terra-deep",
    Epic: "text-gold-deep",
  };
  return (
    <div>
      <TabHeader
        title={c.title}
        subtitle={c.subtitle}
        action={
          <div className="hidden sm:flex items-center gap-2">
            <div className="h-1 w-20 rounded-full bg-secondary overflow-hidden">
              <div className="h-full w-1/2 rounded-full bg-terra" />
            </div>
            <span className="font-mono text-[11px] text-muted-foreground tabular">50%</span>
          </div>
        }
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
        {c.entries.map((e, i) => {
          const rarityLabel = t.rarity[e.rarity as keyof typeof t.rarity] ?? e.rarity;
          return (
            <div
              key={i}
              className={cn(
                "rounded-lg border p-4 text-center",
                e.found ? "border-border bg-background" : "border-dashed border-border bg-background/30"
              )}
            >
              <div className={cn("text-2xl mb-2", !e.found && "opacity-25")}>
                {e.found ? e.emoji : "?"}
              </div>
              <p className={cn("text-sm font-medium", e.found ? "text-foreground" : "text-muted-foreground")}>
                {e.found ? e.name : c.unknown}
              </p>
              <p className={cn("font-mono text-[9px] uppercase tracking-wider mt-0.5", rarityColor[e.rarity])}>
                {rarityLabel}
              </p>
              {e.found ? (
                <p className="mt-2 font-mono text-[11px] text-muted-foreground tabular">×{e.count}</p>
              ) : (
                <p className="mt-2 text-[10px] text-muted-foreground italic leading-tight">{e.hint}</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
