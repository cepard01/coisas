"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { AuthModal } from "./AuthModal";
import { SectionHeading } from "./Features";
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
  LockIcon,
  ArrowUpRightIcon,
  TrendingIcon,
  CheckIcon,
  DaisyMark,
} from "./icons";
import { cn } from "@/lib/utils";

type Tab = "garden" | "wallet" | "missions" | "collection";

export function Dashboard() {
  const { player, signIn, hydrated } = useAuth();
  const [authOpen, setAuthOpen] = useState(false);
  const [tab, setTab] = useState<Tab>("garden");

  return (
    <section id="dashboard" className="py-24 md:py-32 scroll-mt-16 border-t border-border">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <SectionHeading
          number="04"
          eyebrow="Dashboard"
          title={
            <>
              Your garden,
              <br className="hidden sm:block" /> <em className="font-normal text-sage">on the web.</em>
            </>
          }
          description="Sign in with Discord to sync your garden, view missions, track your collection, and manage settings — all from a clean web dashboard. Below is a mockup of what's coming."
        />

        <div className="mt-14">
          {hydrated && player ? (
            <motion.div
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <DashboardLayout tab={tab} onTab={setTab} player={player} />
            </motion.div>
          ) : (
            <LockedDashboard onSignIn={() => setAuthOpen(true)} />
          )}
        </div>
      </div>

      <AuthModal open={authOpen} onOpenChange={setAuthOpen} onAuthenticated={signIn} />
    </section>
  );
}

function LockedDashboard({ onSignIn }: { onSignIn: () => void }) {
  return (
    <div className="relative rounded-xl border border-border bg-card overflow-hidden">
      {/* Blurred preview */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden>
        <div className="opacity-25 blur-md pointer-events-none select-none">
          <DashboardLayout tab="garden" />
        </div>
      </div>
      <div className="relative grid place-items-center py-20 sm:py-28 px-6 text-center">
        <motion.div
          initial={false}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <span className="grid place-items-center h-12 w-12 rounded-full border border-border mx-auto">
            <LockIcon size={20} className="text-muted-foreground" />
          </span>
          <h3 className="mt-5 font-display text-2xl font-medium text-foreground">
            Sign in to preview
          </h3>
          <p className="mt-2 text-sm text-muted-foreground max-w-md text-pretty">
            This is a mockup. Connect a (fake) Discord account to explore the dashboard — no real
            data is sent or stored.
          </p>
          <button
            onClick={onSignIn}
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-foreground text-background px-5 py-2.5 text-sm font-medium hover:bg-foreground/90 transition-colors"
          >
            Sign in to preview
            <ArrowUpRightIcon size={15} />
          </button>
        </motion.div>
      </div>
    </div>
  );
}

function DashboardLayout({
  tab,
  onTab,
  player,
}: {
  tab: Tab;
  onTab?: (t: Tab) => void;
  player?: { username: string; level: number };
}) {
  const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
    { id: "garden", label: "Garden", icon: SproutIcon },
    { id: "wallet", label: "Wallet", icon: WalletIcon },
    { id: "missions", label: "Missions", icon: ListIcon },
    { id: "collection", label: "Collection", icon: BookIcon },
  ];

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      {/* Top bar — minimal, no fake window dots */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-secondary/30">
        <span className="font-mono text-[11px] text-muted-foreground">
          daisyflower.app/dashboard
        </span>
        <span className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-sage animate-pulse-dot" />
          synced
        </span>
      </div>

      <div className="grid lg:grid-cols-[200px_1fr]">
        {/* Sidebar */}
        <aside className="border-b lg:border-b-0 lg:border-r border-border p-3">
          {/* User */}
          <div className="flex items-center gap-2.5 p-2 rounded-lg border border-border bg-background">
            <span className="grid place-items-center h-8 w-8 rounded-full bg-sage/10 shrink-0">
              <DaisyMark size={16} className="text-sage" />
            </span>
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground truncate">
                {player?.username ?? "gardener"}
              </p>
              <p className="text-[11px] text-muted-foreground">Level {player?.level ?? 7}</p>
            </div>
          </div>

          {/* Nav */}
          <nav className="mt-3 space-y-0.5">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => onTab?.(t.id)}
                disabled={!onTab}
                className={cn(
                  "w-full flex items-center gap-2.5 rounded-md px-2.5 py-1.5 text-sm transition-colors text-left",
                  tab === t.id
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/60",
                  !onTab && "cursor-default"
                )}
              >
                <t.icon size={15} className="shrink-0" />
                {t.label}
              </button>
            ))}
          </nav>

          <div className="mt-4 pt-3 border-t border-border space-y-0.5">
            <button className="w-full flex items-center gap-2.5 rounded-md px-2.5 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-colors text-left">
              <BellIcon size={15} className="shrink-0" /> Alerts
            </button>
            <button className="w-full flex items-center gap-2.5 rounded-md px-2.5 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-colors text-left">
              <GearIcon size={15} className="shrink-0" /> Settings
            </button>
          </div>
        </aside>

        {/* Main */}
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

/* ── Tab headers ────────────────────────────────────────────────────── */

function TabHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle: string;
  action?: React.ReactNode;
}) {
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

function MiniStat({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-lg border border-border bg-background p-3">
      <Icon size={14} className="text-muted-foreground mb-2" />
      <p className="font-display text-base font-medium text-foreground tabular">{value}</p>
      <p className="text-[10px] text-muted-foreground">{label}</p>
    </div>
  );
}

/* ── Garden tab ─────────────────────────────────────────────────────── */

function GardenTab() {
  return (
    <div>
      <TabHeader
        title="My Garden"
        subtitle="3 plants growing · 1 ready to harvest"
        action={
          <div className="hidden sm:flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5">
            <SunIcon size={14} className="text-gold-deep" />
            <span className="text-xs font-medium text-foreground">Sunny</span>
            <span className="font-mono text-[10px] text-muted-foreground">×1.5</span>
          </div>
        }
      />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-7">
        <MiniStat icon={SproutIcon} label="Slots used" value="4 / 6" />
        <MiniStat icon={DropletIcon} label="Humidity" value="50%" />
        <MiniStat icon={ClockIcon} label="Next ready" value="~18m" />
        <MiniStat icon={SparkIcon} label="Mutation hint" value="Active" />
      </div>

      {/* Slots */}
      <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground mb-3">
        Garden slots
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
        <DashSlot emoji="🌻" name="Sunflower" progress={72} eta="~18m" />
        <DashSlot emoji="🌹" name="Red Rose" progress={45} eta="~1h 6m" />
        <DashSlot emoji="🤍" name="White Rose" progress={90} eta="~12m" />
        <DashSlot emoji="🌻" name="Sunflower" progress={100} ready />
        <DashSlot empty />
        <DashSlot empty />
      </div>

      {/* Activity */}
      <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground mt-7 mb-3">
        Recent activity
      </p>
      <div className="space-y-2.5">
        <ActivityRow time="2m ago" text="Sunflower in slot 4 became ready to harvest." tone="sage" />
        <ActivityRow time="14m ago" text="Watered White Rose in slot 3. Humidity +30%." tone="sky" />
        <ActivityRow time="1h ago" text="Planted Red Rose seed in slot 2." tone="ink" />
        <ActivityRow time="3h ago" text="Weather changed from Rain to Sunny." tone="gold" />
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
  if (empty) {
    return (
      <div className="rounded-lg border border-dashed border-border bg-background/30 p-3">
        <p className="font-mono text-[11px] text-muted-foreground/60">empty</p>
        <p className="mt-3 text-[11px] text-muted-foreground/50">+ plant here</p>
      </div>
    );
  }
  return (
    <div className={cn("rounded-lg border p-3", ready ? "border-sage/40 bg-sage/[0.04]" : "border-border bg-background")}>
      <div className="flex items-center justify-between">
        <span className="text-lg">{emoji}</span>
        <span className={cn("font-mono text-[9px] uppercase tracking-wider", ready ? "text-sage" : "text-muted-foreground")}>
          {ready ? "ready" : "growing"}
        </span>
      </div>
      <p className="mt-1.5 text-sm font-medium text-foreground">{name}</p>
      {ready ? (
        <p className="mt-1 text-[11px] text-sage font-medium">Harvest now</p>
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

function ActivityRow({
  time,
  text,
  tone,
}: {
  time: string;
  text: string;
  tone: "sage" | "sky" | "gold" | "ink";
}) {
  const tones = {
    sage: "bg-sage",
    sky: "bg-sky-soft",
    gold: "bg-gold",
    ink: "bg-foreground/30",
  };
  return (
    <div className="flex items-start gap-3 text-sm">
      <span className={cn("h-1.5 w-1.5 rounded-full mt-1.5 shrink-0", tones[tone])} />
      <p className="flex-1 text-foreground/90">{text}</p>
      <span className="font-mono text-[11px] text-muted-foreground shrink-0 tabular">{time}</span>
    </div>
  );
}

/* ── Wallet tab ─────────────────────────────────────────────────────── */

function WalletTab() {
  return (
    <div>
      <TabHeader title="Wallet" subtitle="Your Daisies, XP, and progression" />

      {/* Balance — single big number, no gradient card */}
      <div className="border-b border-border pb-6 mb-6">
        <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Balance</p>
        <div className="mt-1 flex items-baseline gap-3">
          <p className="font-display text-5xl font-medium text-foreground marker-num tabular">
            1,240
          </p>
          <span className="text-sm text-muted-foreground">Daisies</span>
        </div>
        <p className="mt-2 text-xs text-sage flex items-center gap-1">
          <TrendingIcon size={12} /> +320 this week
        </p>
      </div>

      {/* XP — horizontal bar */}
      <div className="mb-6">
        <div className="flex items-baseline justify-between mb-2">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Level 7</p>
            <p className="font-display text-lg font-medium text-foreground">Gardener</p>
          </div>
          <span className="font-mono text-sm text-muted-foreground tabular">2,140 / 3,000 XP</span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-secondary overflow-hidden">
          <div className="h-full w-[71%] rounded-full bg-sage" />
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          860 XP to Level 8 — unlocks <span className="text-foreground">decorations</span>
        </p>
      </div>

      {/* Transactions — list, no card wrappers */}
      <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground mb-3">
        Recent transactions
      </p>
      <div className="divide-y divide-border">
        <TxRow icon="🌻" label="Sold 2 Sunflowers" amount="+400" time="2m ago" positive />
        <TxRow icon="🌱" label="Bought Red Rose Seed" amount="−100" time="1h ago" />
        <TxRow icon="✓" label="Daily mission reward" amount="+50" time="3h ago" positive />
        <TxRow icon="↑" label="Level 7 reward" amount="+200" time="1d ago" positive />
        <TxRow icon="🚿" label="Bought Watering Can" amount="−500" time="2d ago" />
      </div>
    </div>
  );
}

function TxRow({
  icon,
  label,
  amount,
  time,
  positive,
}: {
  icon: string;
  label: string;
  amount: string;
  time: string;
  positive?: boolean;
}) {
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

/* ── Missions tab ───────────────────────────────────────────────────── */

function MissionsTab() {
  const missions = [
    { type: "Tutorial", title: "Plant your first seed", reward: "+10 XP", done: true },
    { type: "Tutorial", title: "Harvest your first flower", reward: "1 Seed", done: true },
    { type: "Daily", title: "Harvest 3 flowers", reward: "+50 Daisies", progress: "2 / 3" },
    { type: "Daily", title: "Water your garden", reward: "+15 XP", progress: "1 / 1", done: true },
    { type: "Daily", title: "Check the weather", reward: "+10 Daisies" },
    { type: "Weekly", title: "Discover a mutation", reward: "Rare seed", locked: true },
  ];

  return (
    <div>
      <TabHeader
        title="Missions"
        subtitle="3 of 6 completed today"
        action={
          <span className="hidden sm:inline-flex items-center gap-1.5 font-mono text-[11px] text-muted-foreground">
            <TrendingIcon size={13} className="text-sage" /> 4-day streak
          </span>
        }
      />

      <div className="divide-y divide-border">
        {missions.map((m, i) => (
          <div key={i} className="flex items-center gap-4 py-3.5">
            <span
              className={cn(
                "grid place-items-center h-7 w-7 rounded-full shrink-0 text-xs",
                m.done ? "bg-sage text-white" : m.locked ? "bg-secondary text-muted-foreground/50" : "bg-secondary text-muted-foreground"
              )}
            >
              {m.done ? <CheckIcon size={13} /> : m.locked ? <LockIcon size={12} /> : i + 1}
            </span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  {m.type}
                </span>
                {m.progress && (
                  <span className="font-mono text-[10px] text-foreground tabular">{m.progress}</span>
                )}
              </div>
              <p className={cn("text-sm mt-0.5", m.done ? "text-muted-foreground line-through" : "text-foreground font-medium")}>
                {m.title}
              </p>
            </div>
            <span className="text-xs text-muted-foreground shrink-0">{m.reward}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Collection tab ─────────────────────────────────────────────────── */

function CollectionTab() {
  const entries = [
    { emoji: "🌻", name: "Sunflower", rarity: "common", found: true, count: 12 },
    { emoji: "🌹", name: "Rose", rarity: "uncommon", found: true, count: 4 },
    { emoji: "🤍", name: "White Rose", rarity: "uncommon", found: true, count: 2 },
    { emoji: "🌸", name: "Pink Rose", rarity: "rare", found: false, hint: "Try Red + White Rose side by side." },
    { emoji: "🥕", name: "Carrot", rarity: "common", found: true, count: 7 },
    { emoji: "?", name: "Unknown", rarity: "rare", found: false, hint: "Keep growing different seeds." },
    { emoji: "?", name: "Unknown", rarity: "epic", found: false, hint: "Requires a special weather condition." },
    { emoji: "?", name: "Unknown", rarity: "uncommon", found: false, hint: "Try the shop during autumn." },
  ];

  const rarityColor: Record<string, string> = {
    common: "text-muted-foreground",
    uncommon: "text-sage",
    rare: "text-sky-soft",
    epic: "text-terra-deep",
  };

  return (
    <div>
      <TabHeader
        title="Collection Book"
        subtitle="4 of 8 discovered · 50% complete"
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
        {entries.map((e, i) => (
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
              {e.name}
            </p>
            <p className={cn("font-mono text-[9px] uppercase tracking-wider mt-0.5", rarityColor[e.rarity])}>
              {e.rarity}
            </p>
            {e.found ? (
              <p className="mt-2 font-mono text-[11px] text-muted-foreground tabular">×{e.count}</p>
            ) : (
              <p className="mt-2 text-[10px] text-muted-foreground italic leading-tight">{e.hint}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
