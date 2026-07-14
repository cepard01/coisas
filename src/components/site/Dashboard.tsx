"use client";

import { motion } from "framer-motion";
import {
  Sprout,
  Wallet,
  ListChecks,
  BookOpen,
  Bell,
  Settings,
  TrendingUp,
  ArrowUpRight,
  Sun,
  Droplet,
  Clock,
  Sparkles,
  Lock,
} from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useState } from "react";
import { AuthModal } from "./AuthModal";
import { SectionHeading } from "./Features";
import { cn } from "@/lib/utils";

type Tab = "garden" | "wallet" | "missions" | "collection";

export function Dashboard() {
  const { player, signIn, hydrated } = useAuth();
  const [authOpen, setAuthOpen] = useState(false);
  const [tab, setTab] = useState<Tab>("garden");

  return (
    <section id="dashboard" className="py-24 md:py-32 scroll-mt-16 border-t border-border bg-paper-warm relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-paper-grain opacity-40" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          number="04"
          eyebrow="Dashboard"
          title={
            <>
              Your garden,
              <br className="hidden sm:block" /> <em className="font-normal text-sage">on the web.</em>
            </>
          }
          description="Sign in with Discord to sync your garden, view missions, track your collection, and manage settings — all from a clean web dashboard. This is a mockup of what's coming."
        />

        <div className="mt-14">
          {hydrated && player ? (
            <DashboardMockup player={player} tab={tab} onTab={setTab} />
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
    <div className="relative rounded-2xl border border-border bg-card overflow-hidden">
      {/* Blurred preview behind */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden>
        <div className="opacity-30 blur-md pointer-events-none select-none scale-105">
          <DashboardLayout tab="garden" />
        </div>
      </div>

      {/* Overlay */}
      <div className="relative grid place-items-center py-20 sm:py-28 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="grid place-items-center h-14 w-14 rounded-full bg-foreground/5 border border-border"
        >
          <Lock className="h-6 w-6 text-muted-foreground" />
        </motion.div>
        <h3 className="mt-5 font-display text-2xl font-semibold text-foreground">Sign in to preview</h3>
        <p className="mt-2 text-sm text-muted-foreground max-w-md text-pretty">
          This is a mockup. Connect a (fake) Discord account to explore the dashboard — no real
          data is sent or stored.
        </p>
        <button
          onClick={onSignIn}
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-foreground text-background px-5 py-2.5 text-sm font-semibold hover:bg-foreground/90 transition-colors"
        >
          Sign in to preview
          <ArrowUpRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

function DashboardMockup({
  player,
  tab,
  onTab,
}: {
  player: { username: string; avatar: string; level: number };
  tab: Tab;
  onTab: (t: Tab) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <DashboardLayout tab={tab} onTab={onTab} player={player} />
    </motion.div>
  );
}

function DashboardLayout({
  tab,
  onTab,
  player,
}: {
  tab: Tab;
  onTab?: (t: Tab) => void;
  player?: { username: string; avatar: string; level: number };
}) {
  const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
    { id: "garden", label: "Garden", icon: Sprout },
    { id: "wallet", label: "Wallet", icon: Wallet },
    { id: "missions", label: "Missions", icon: ListChecks },
    { id: "collection", label: "Collection", icon: BookOpen },
  ];

  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-xl shadow-foreground/[0.04]">
      {/* Window chrome */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-secondary/30">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-terra/50" />
          <span className="h-2.5 w-2.5 rounded-full bg-gold/50" />
          <span className="h-2.5 w-2.5 rounded-full bg-sage/50" />
        </div>
        <span className="font-mono text-[11px] text-muted-foreground">
          daisyflower.app/dashboard
        </span>
        <span className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-sage animate-pulse-dot" />
          synced
        </span>
      </div>

      <div className="grid lg:grid-cols-[220px_1fr]">
        {/* Sidebar */}
        <aside className="border-b lg:border-b-0 lg:border-r border-border bg-secondary/20 p-3 sm:p-4">
          {/* User card */}
          <div className="flex items-center gap-3 p-2.5 rounded-lg bg-card border border-border">
            <span className="grid place-items-center h-9 w-9 rounded-full bg-sage/15 text-base shrink-0">
              {player?.avatar ?? "🌻"}
            </span>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-foreground truncate">
                {player?.username ?? "gardener"}
              </p>
              <p className="text-[11px] text-muted-foreground">Level {player?.level ?? 7}</p>
            </div>
          </div>

          {/* Nav */}
          <nav className="mt-4 space-y-0.5">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => onTab?.(t.id)}
                disabled={!onTab}
                className={cn(
                  "w-full flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm font-medium transition-colors text-left",
                  tab === t.id
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/60",
                  !onTab && "cursor-default"
                )}
              >
                <t.icon className="h-4 w-4 shrink-0" />
                {t.label}
              </button>
            ))}
          </nav>

          {/* Bottom links */}
          <div className="mt-6 pt-4 border-t border-border space-y-0.5">
            <button className="w-full flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-colors text-left">
              <Bell className="h-4 w-4 shrink-0" /> Notifications
            </button>
            <button className="w-full flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-colors text-left">
              <Settings className="h-4 w-4 shrink-0" /> Settings
            </button>
          </div>
        </aside>

        {/* Main content */}
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

/* ── Tabs ───────────────────────────────────────────────────────────── */

function TabHeader({ title, subtitle, action }: { title: string; subtitle: string; action?: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4 mb-6">
      <div>
        <h3 className="font-display text-2xl font-semibold text-foreground">{title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
      </div>
      {action}
    </div>
  );
}

function GardenTab() {
  return (
    <div>
      <TabHeader
        title="My Garden"
        subtitle="3 plants growing · 1 ready to harvest"
        action={
          <div className="hidden sm:flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5">
            <Sun className="h-3.5 w-3.5 text-gold" />
            <span className="text-xs font-medium text-foreground">Sunny</span>
            <span className="text-[10px] text-muted-foreground">×1.5 growth</span>
          </div>
        }
      />

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <MiniStat icon={Sprout} label="Slots used" value="4 / 6" tone="sage" />
        <MiniStat icon={Droplet} label="Humidity" value="50%" tone="sky" />
        <MiniStat icon={Clock} label="Next ready" value="~18m" tone="gold" />
        <MiniStat icon={Sparkles} label="Mutation hint" value="Active" tone="terra" />
      </div>

      {/* Slots */}
      <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground mb-3">
        Garden slots
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <DashSlot emoji="🌻" name="Sunflower" progress={72} status="Growing" eta="~18m" />
        <DashSlot emoji="🌹" name="Red Rose" progress={45} status="Growing" eta="~1h 6m" />
        <DashSlot emoji="🤍" name="White Rose" progress={90} status="Almost" eta="~12m" />
        <DashSlot emoji="🌻" name="Sunflower" progress={100} status="Ready" ready />
        <DashSlot emoji="🌱" empty label="Empty" />
        <DashSlot emoji="🌱" empty label="Empty" />
      </div>

      {/* Activity */}
      <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground mt-7 mb-3">
        Recent activity
      </p>
      <div className="space-y-2">
        <ActivityRow time="2m ago" text="Sunflower in slot 4 became ready to harvest." tone="sage" />
        <ActivityRow time="14m ago" text="Watered White Rose in slot 3. Humidity +30%." tone="sky" />
        <ActivityRow time="1h ago" text="Planted Red Rose seed in slot 2." tone="ink" />
        <ActivityRow time="3h ago" text="Weather changed from Rain to Sunny." tone="gold" />
      </div>
    </div>
  );
}

function WalletTab() {
  return (
    <div>
      <TabHeader title="Wallet" subtitle="Your Daisies, XP, and progression" />

      {/* Balance card */}
      <div className="rounded-2xl border border-border bg-gradient-to-br from-sage/[0.08] to-terra/[0.05] p-5 sm:p-6 mb-6">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-wider text-muted-foreground">Balance</p>
            <p className="mt-1 font-display text-4xl sm:text-5xl font-semibold text-foreground marker-num">
              1,240
            </p>
            <p className="mt-1 text-xs text-muted-foreground">Daisies · earned this week: +320</p>
          </div>
          <span className="text-4xl">🪙</span>
        </div>
      </div>

      {/* XP */}
      <div className="rounded-2xl border border-border bg-card p-5 mb-6">
        <div className="flex items-center justify-between mb-2">
          <div>
            <p className="text-[11px] uppercase tracking-wider text-muted-foreground">Level 7</p>
            <p className="font-display text-lg font-semibold text-foreground">Gardener</p>
          </div>
          <span className="font-mono text-sm text-muted-foreground">2,140 / 3,000 XP</span>
        </div>
        <div className="h-2 w-full rounded-full bg-secondary overflow-hidden">
          <div className="h-full w-[71%] rounded-full bg-gradient-to-r from-sage to-sage-deep" />
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          860 XP to Level 8 — unlocks <span className="font-medium text-foreground">decorations</span>
        </p>
      </div>

      {/* Recent transactions */}
      <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground mb-3">
        Recent transactions
      </p>
      <div className="space-y-2">
        <TxRow icon="🌻" label="Sold 2 Sunflowers" amount="+400" time="2m ago" positive />
        <TxRow icon="🌱" label="Bought Red Rose Seed" amount="−100" time="1h ago" />
        <TxRow icon="🎯" label="Daily mission reward" amount="+50" time="3h ago" positive />
        <TxRow icon="📈" label="Level 7 reward" amount="+200" time="1d ago" positive />
        <TxRow icon="🚿" label="Bought Watering Can" amount="−500" time="2d ago" />
      </div>
    </div>
  );
}

function MissionsTab() {
  const missions = [
    { type: "Tutorial", title: "Plant your first seed", reward: "+10 XP", done: true },
    { type: "Tutorial", title: "Harvest your first flower", reward: "1 Seed", done: true },
    { type: "Daily", title: "Harvest 3 flowers", reward: "+50 Daisies", progress: "2 / 3", done: false },
    { type: "Daily", title: "Water your garden", reward: "+15 XP", progress: "1 / 1", done: true },
    { type: "Daily", title: "Check the weather", reward: "+10 Daisies", done: false },
    { type: "Weekly", title: "Discover a mutation", reward: "Rare seed", done: false, locked: true },
  ];

  return (
    <div>
      <TabHeader
        title="Missions"
        subtitle="3 of 6 completed today"
        action={
          <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-sage/15 px-3 py-1.5 text-xs font-semibold text-sage-deep">
            <TrendingUp className="h-3 w-3" /> Streak: 4 days
          </span>
        }
      />

      <div className="space-y-2.5">
        {missions.map((m, i) => (
          <div
            key={i}
            className={cn(
              "flex items-center gap-4 rounded-xl border p-3.5 transition-colors",
              m.done
                ? "border-sage/20 bg-sage/[0.04]"
                : m.locked
                  ? "border-border bg-background/40 opacity-60"
                  : "border-border bg-card hover:bg-secondary/30"
            )}
          >
            <span
              className={cn(
                "grid place-items-center h-9 w-9 rounded-full shrink-0 text-sm font-semibold",
                m.done ? "bg-sage text-white" : "bg-secondary text-muted-foreground"
              )}
            >
              {m.done ? "✓" : m.locked ? "🔒" : i + 1}
            </span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  {m.type}
                </span>
                {m.progress && !m.done && (
                  <span className="font-mono text-[10px] text-foreground">{m.progress}</span>
                )}
              </div>
              <p className={cn("text-sm font-medium", m.done ? "text-muted-foreground line-through" : "text-foreground")}>
                {m.title}
              </p>
            </div>
            <span className="text-xs font-medium text-foreground shrink-0">{m.reward}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function CollectionTab() {
  const entries = [
    { emoji: "🌻", name: "Sunflower", rarity: "common", found: true, count: 12 },
    { emoji: "🌹", name: "Rose", rarity: "uncommon", found: true, count: 4 },
    { emoji: "🤍", name: "White Rose", rarity: "uncommon", found: true, count: 2 },
    { emoji: "🌸", name: "Pink Rose", rarity: "rare", found: false, hint: "Try planting Red + White Rose side by side." },
    { emoji: "🥕", name: "Carrot", rarity: "common", found: true, count: 7 },
    { emoji: "💜", name: "???", rarity: "rare", found: false, hint: "Hidden — keep growing different seeds." },
    { emoji: "🐝", name: "???", rarity: "epic", found: false, hint: "Hidden — requires a special weather condition." },
    { emoji: "🍁", name: "???", rarity: "uncommon", found: false, hint: "Hidden — try the shop during autumn." },
  ];

  const rarityColor: Record<string, string> = {
    common: "text-muted-foreground",
    uncommon: "text-sage-deep",
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
            <div className="h-1.5 w-24 rounded-full bg-secondary overflow-hidden">
              <div className="h-full w-1/2 rounded-full bg-terra" />
            </div>
            <span className="font-mono text-xs text-muted-foreground">50%</span>
          </div>
        }
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {entries.map((e, i) => (
          <div
            key={i}
            className={cn(
              "rounded-xl border p-4 text-center transition-colors",
              e.found
                ? "border-border bg-card hover:bg-secondary/30"
                : "border-dashed border-border bg-background/30"
            )}
          >
            <div className={cn("text-3xl mb-2", !e.found && "opacity-30 grayscale")}>
              {e.found ? e.emoji : "🔒"}
            </div>
            <p className={cn("text-sm font-medium", e.found ? "text-foreground" : "text-muted-foreground")}>
              {e.name}
            </p>
            <p className={cn("text-[10px] font-semibold uppercase tracking-wide mt-0.5", rarityColor[e.rarity])}>
              {e.rarity}
            </p>
            {e.found ? (
              <p className="mt-2 font-mono text-[11px] text-muted-foreground">×{e.count} harvested</p>
            ) : (
              <p className="mt-2 text-[10px] text-muted-foreground italic leading-tight">{e.hint}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Helpers ────────────────────────────────────────────────────────── */

function MiniStat({
  icon: Icon,
  label,
  value,
  tone,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  tone: "sage" | "sky" | "gold" | "terra";
}) {
  const tones = {
    sage: "text-sage",
    sky: "text-sky-soft",
    gold: "text-gold-deep",
    terra: "text-terra-deep",
  };
  return (
    <div className="rounded-xl border border-border bg-card p-3">
      <Icon className={cn("h-4 w-4 mb-1.5", tones[tone])} />
      <p className="font-display text-base font-semibold text-foreground">{value}</p>
      <p className="text-[10px] text-muted-foreground">{label}</p>
    </div>
  );
}

function DashSlot({
  emoji,
  name,
  progress,
  status,
  eta,
  ready,
  empty,
  label,
}: {
  emoji: string;
  name?: string;
  progress?: number;
  status?: string;
  eta?: string;
  ready?: boolean;
  empty?: boolean;
  label?: string;
}) {
  if (empty) {
    return (
      <div className="rounded-xl border border-dashed border-border bg-background/30 p-3 text-center">
        <p className="text-xl opacity-30">{emoji}</p>
        <p className="mt-1 text-[11px] text-muted-foreground">{label}</p>
      </div>
    );
  }
  return (
    <div className={cn("rounded-xl border p-3", ready ? "border-sage/40 bg-sage/[0.06]" : "border-border bg-card")}>
      <div className="flex items-center justify-between">
        <span className="text-xl">{emoji}</span>
        <span className={cn("text-[10px] font-semibold uppercase tracking-wide", ready ? "text-sage" : "text-muted-foreground")}>
          {status}
        </span>
      </div>
      <p className="mt-1.5 text-sm font-medium text-foreground">{name}</p>
      {ready ? (
        <p className="mt-1 text-[11px] text-sage font-medium">Harvest now</p>
      ) : (
        <>
          <div className="mt-1.5 h-1 w-full rounded-full bg-secondary overflow-hidden">
            <div className="h-full rounded-full bg-sage-soft" style={{ width: `${progress}%` }} />
          </div>
          <p className="mt-1 font-mono text-[10px] text-muted-foreground">{eta}</p>
        </>
      )}
    </div>
  );
}

function ActivityRow({ time, text, tone }: { time: string; text: string; tone: "sage" | "sky" | "gold" | "ink" }) {
  const tones = {
    sage: "bg-sage",
    sky: "bg-sky-soft",
    gold: "bg-gold",
    ink: "bg-ink/30",
  };
  return (
    <div className="flex items-start gap-3 text-sm">
      <span className={cn("h-1.5 w-1.5 rounded-full mt-1.5 shrink-0", tones[tone])} />
      <p className="flex-1 text-foreground">{text}</p>
      <span className="font-mono text-[11px] text-muted-foreground shrink-0">{time}</span>
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
    <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-3">
      <span className="grid place-items-center h-8 w-8 rounded-lg bg-secondary text-base shrink-0">{icon}</span>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground truncate">{label}</p>
        <p className="font-mono text-[11px] text-muted-foreground">{time}</p>
      </div>
      <span className={cn("font-mono text-sm font-semibold shrink-0", positive ? "text-sage" : "text-foreground")}>
        {amount}
      </span>
    </div>
  );
}
