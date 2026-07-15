"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useMemo } from "react";
import { useI18n } from "@/components/providers/I18nProvider";
import { useToast } from "@/components/providers/Toast";
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
  ShopIcon,
  WeatherIcon,
} from "@/components/icons";
import { cn } from "@/lib/utils";

type Tab = "garden" | "wallet" | "missions" | "collection" | "shop" | "weather";

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
    { id: "shop", label: d.tabs.shop, icon: ShopIcon },
    { id: "weather", label: d.tabs.weather, icon: WeatherIcon },
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

        <div className="p-5 sm:p-6 lg:p-8 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              {tab === "garden" && <GardenTab />}
              {tab === "wallet" && <WalletTab />}
              {tab === "missions" && <MissionsTab />}
              {tab === "collection" && <CollectionTab />}
              {tab === "shop" && <ShopTab />}
              {tab === "weather" && <WeatherTab />}
            </motion.div>
          </AnimatePresence>
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

/* ── Garden Tab ──────────────────────────────────────────────────────── */

function GardenTab() {
  const { t } = useI18n();
  const { toast } = useToast();
  const g = t.panel.dashboard.garden;

  const [tick, setTick] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setTick((v) => v + 1), 2000);
    return () => clearInterval(interval);
  }, []);

  const liveSlots = useMemo(() => {
    return g.slots.map((slot, i) => {
      const increment = tick * (0.3 + i * 0.1);
      const progress = Math.min(slot.progress + increment, 99);
      const remaining = Math.max(0, 100 - progress);
      const minutes = Math.max(1, Math.ceil(remaining * 0.2));
      return { ...slot, liveProgress: progress, liveEta: `~${minutes}m` };
    });
  }, [g.slots, tick]);

  const nextReady = useMemo(() => {
    const times = liveSlots.map((s) => Math.max(0, 100 - s.liveProgress));
    const min = Math.min(...times);
    return `~${Math.ceil(min * 0.2)}m`;
  }, [liveSlots]);

  const [harvested, setHarvested] = useState(false);
  const handleHarvestAll = () => {
    setHarvested(true);
    setTimeout(() => setHarvested(false), 2000);
    toast("Harvested 1 Sunflower · +400 🪙 +20 XP", "success");
  };

  return (
    <div>
      <TabHeader
        title={g.title}
        subtitle={g.subtitle}
        action={
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5">
              <SunIcon size={14} className="text-gold-deep" />
              <span className="text-xs font-medium text-foreground">{g.weather}</span>
              <span className="font-mono text-[10px] text-muted-foreground">×1.5</span>
            </div>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleHarvestAll}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors",
                harvested
                  ? "bg-sage text-white"
                  : "bg-foreground text-background hover:bg-foreground/90"
              )}
            >
              {harvested ? (
                <>
                  <CheckIcon size={13} /> +400 🪙 +20 XP
                </>
              ) : (
                <>🌻 {g.harvestNow}</>
              )}
            </motion.button>
          </div>
        }
      />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-7">
        <MiniStat icon={SproutIcon} label={g.slotsUsed} value="4 / 6" />
        <MiniStat icon={DropletIcon} label={g.humidity} value="50%" />
        <MiniStat icon={ClockIcon} label={g.nextReady} value={nextReady} />
        <MiniStat icon={SparkIcon} label={g.mutationHint} value="✓" />
      </div>

      <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground mb-3">
        {g.slotsLabel}
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
        {liveSlots.map((slot, i) => (
          <DashSlot
            key={i}
            emoji={slot.emoji}
            name={slot.name}
            progress={slot.liveProgress}
            eta={slot.liveEta}
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
  const [hovered, setHovered] = useState(false);

  if (empty) {
    return (
      <div className="rounded-lg border border-dashed border-border bg-background/30 p-3">
        <p className="font-mono text-[11px] text-muted-foreground/60">{g.empty}</p>
        <p className="mt-3 text-[11px] text-muted-foreground/50">{g.plantHere}</p>
      </div>
    );
  }
  return (
    <motion.div
      whileHover={{ y: -2 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className={cn(
        "rounded-lg border p-3 cursor-pointer transition-colors",
        ready ? "border-sage/40 bg-sage/[0.04]" : "border-border bg-background",
        hovered && "border-sage/30"
      )}
    >
      <div className="flex items-center justify-between">
        <motion.span
          animate={ready ? { scale: [1, 1.1, 1] } : {}}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-lg"
        >
          {emoji}
        </motion.span>
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
            <motion.div
              className="h-full rounded-full bg-sage-soft"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
          <p className="mt-1 font-mono text-[10px] text-muted-foreground tabular">{eta}</p>
        </>
      )}
    </motion.div>
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

/* ── Wallet Tab ──────────────────────────────────────────────────────── */

function WalletTab() {
  const { t } = useI18n();
  const w = t.panel.dashboard.wallet;

  const [balance, setBalance] = useState(0);
  useEffect(() => {
    const target = 1240;
    const duration = 1200;
    const start = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setBalance(Math.round(target * eased));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div>
      <TabHeader title={w.title} subtitle={w.subtitle} />

      <div className="border-b border-border pb-6 mb-6">
        <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{w.balance}</p>
        <div className="mt-1 flex items-baseline gap-3">
          <p className="font-display text-5xl font-medium text-foreground marker-num tabular">
            {balance.toLocaleString()}
          </p>
          <span className="text-sm text-muted-foreground">{w.daisies}</span>
        </div>
        <p className="mt-2 text-xs text-sage flex items-center gap-1">
          <TrendingIcon size={12} /> {w.thisWeek}
        </p>
      </div>

      {/* Sparkline chart */}
      <div className="mb-6">
        <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground mb-2">7-day balance</p>
        <Sparkline />
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
          <motion.div
            className="h-full rounded-full bg-sage"
            initial={{ width: 0 }}
            animate={{ width: "71%" }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          />
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

function Sparkline() {
  const data = [820, 950, 780, 1100, 980, 1150, 1240];
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * 280;
    const y = 40 - ((v - min) / range) * 35;
    return `${x},${y}`;
  }).join(" ");

  return (
    <svg viewBox="0 0 280 50" className="w-full h-12" preserveAspectRatio="none">
      <defs>
        <linearGradient id="spark-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.46 0.06 145)" stopOpacity="0.2" />
          <stop offset="100%" stopColor="oklch(0.46 0.06 145)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.polyline
        points={`0,50 ${points} 280,50`}
        fill="url(#spark-grad)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      />
      <motion.polyline
        points={points}
        fill="none"
        stroke="oklch(0.46 0.06 145)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      />
      {data.map((v, i) => {
        const x = (i / (data.length - 1)) * 280;
        const y = 40 - ((v - min) / range) * 35;
        return (
          <motion.circle
            key={i}
            cx={x}
            cy={y}
            r="2"
            fill="oklch(0.46 0.06 145)"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, delay: 0.8 + i * 0.05 }}
          />
        );
      })}
    </svg>
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

/* ── Missions Tab ────────────────────────────────────────────────────── */

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

/* ── Collection Tab ──────────────────────────────────────────────────── */

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
              <motion.div
                className="h-full rounded-full bg-terra"
                initial={{ width: 0 }}
                animate={{ width: "50%" }}
                transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
            <span className="font-mono text-[11px] text-muted-foreground tabular">50%</span>
          </div>
        }
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
        {c.entries.map((e, i) => {
          const rarityLabel = t.rarity[e.rarity as keyof typeof t.rarity] ?? e.rarity;
          return (
            <motion.div
              key={i}
              whileHover={{ y: -2 }}
              className={cn(
                "rounded-lg border p-4 text-center transition-colors cursor-pointer",
                e.found ? "border-border bg-background hover:border-sage/30" : "border-dashed border-border bg-background/30"
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
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

/* ── Shop Tab (NEW) ──────────────────────────────────────────────────── */

function ShopTab() {
  const { t } = useI18n();
  const { toast } = useToast();
  const s = t.panel.dashboard.shop;
  const [filter, setFilter] = useState<string>("all");
  const [bought, setBought] = useState<string | null>(null);

  const categories = [
    { id: "all", label: "All" },
    { id: "seeds", label: s.categories.seeds },
    { id: "tools", label: s.categories.tools },
    { id: "consumables", label: s.categories.consumables },
    { id: "decor", label: s.categories.decor },
  ];

  const filtered = filter === "all" ? s.items : s.items.filter((i) => i.category === filter);

  const handleBuy = (name: string, price: number) => {
    setBought(name);
    setTimeout(() => setBought(null), 1500);
    toast(`Bought ${name} for ${price} Daisies`, "success");
  };

  return (
    <div>
      <TabHeader
        title={s.title}
        subtitle={s.subtitle}
        action={
          <div className="flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5">
            <span className="text-sm">🪙</span>
            <span className="font-mono text-xs font-medium text-foreground tabular">1,240</span>
          </div>
        }
      />

      {/* Category filter */}
      <div className="flex flex-wrap gap-1.5 mb-5">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setFilter(cat.id)}
            className={cn(
              "rounded-full border px-3 py-1 text-xs font-medium transition-all",
              filter === cat.id
                ? "border-foreground bg-foreground text-background"
                : "border-border bg-card text-muted-foreground hover:text-foreground hover:border-foreground/30"
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Shop items */}
      <div className="grid sm:grid-cols-2 gap-3">
        {filtered.map((item, i) => {
          const canAfford = 1240 >= item.price;
          const justBought = bought === item.name;
          return (
            <motion.div
              key={i}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2, delay: Math.min(i * 0.03, 0.2) }}
              className="card-hairline rounded-lg p-4 flex items-center gap-3"
            >
              <span className="grid place-items-center h-12 w-12 rounded-lg bg-secondary text-2xl shrink-0">
                {item.emoji}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-foreground truncate">{item.name}</p>
                  {item.owned > 0 && (
                    <span className="font-mono text-[10px] text-muted-foreground bg-secondary px-1.5 py-0.5 rounded">
                      {s.owned}: {item.owned}
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-muted-foreground text-pretty mt-0.5">{item.desc}</p>
              </div>
              <div className="shrink-0 text-right">
                <p className="font-mono text-sm font-medium text-foreground tabular">🪙 {item.price}</p>
                <motion.button
                  whileHover={canAfford ? { scale: 1.05 } : {}}
                  whileTap={canAfford ? { scale: 0.95 } : {}}
                  onClick={() => canAfford && handleBuy(item.name, item.price)}
                  disabled={!canAfford}
                  className={cn(
                    "mt-1 inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium transition-colors",
                    justBought
                      ? "bg-sage text-white"
                      : canAfford
                        ? "bg-foreground text-background hover:bg-foreground/90"
                        : "bg-secondary text-muted-foreground cursor-not-allowed"
                  )}
                >
                  {justBought ? <><CheckIcon size={11} /> +1</> : canAfford ? s.buy : s.notEnough}
                </motion.button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

/* ── Weather Tab (NEW) ───────────────────────────────────────────────── */

function WeatherTab() {
  const { t } = useI18n();
  const w = t.panel.dashboard.weather;
  const weatherItems = t.howItWorks.weather.items;

  const WEATHER_COLOR: Record<string, string> = {
    "sun": "from-gold/15",
    "sky": "from-sky-soft/20",
    "terra": "from-terra-deep/12",
    "snow": "from-sky-soft/12",
  };

  return (
    <div>
      <TabHeader title={w.title} subtitle={w.subtitle} />

      {/* Current weather — big card */}
      <div className="card-hairline rounded-xl p-6 mb-6 bg-gradient-to-br from-gold/10 to-transparent">
        <div className="flex items-center gap-4">
          <motion.div
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="text-5xl"
          >
            {weatherItems[0].emoji}
          </motion.div>
          <div className="flex-1">
            <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{w.current.label}</p>
            <p className="font-display text-2xl font-medium text-foreground">{weatherItems[0].name}</p>
            <p className="mt-1 text-sm text-muted-foreground">{w.current.effect}</p>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-border">
          <p className="text-sm text-foreground text-pretty">{w.current.advice}</p>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <span className="font-mono text-[11px] text-muted-foreground">{w.next}</span>
          <span className="font-mono text-xs text-sage tabular">{w.nextTime}</span>
        </div>
      </div>

      {/* Forecast */}
      <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground mb-3">{w.forecast}</p>
      <div className="grid grid-cols-5 gap-2 mb-6">
        {weatherItems.map((item, i) => {
          const colorKey = ["sun", "sky", "terra", "snow"][i] ?? "sky";
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className={cn(
                "rounded-lg border p-3 text-center bg-gradient-to-br to-transparent",
                i === 0 ? "border-foreground/30 bg-secondary/40" : "border-border",
                WEATHER_COLOR[colorKey]
              )}
            >
              <div className="text-xl mb-1">{item.emoji}</div>
              <p className="text-[10px] font-medium text-foreground">{item.name}</p>
              <p className="font-mono text-[9px] text-muted-foreground mt-0.5">
                {i === 0 ? "now" : `+${i * 4}h`}
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* History */}
      <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground mb-3">{w.history}</p>
      <div className="space-y-2">
        {w.historyItems.map((h, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            className="flex items-center gap-3 text-sm"
          >
            <span className="text-base">{h.emoji}</span>
            <span className="flex-1 text-foreground">{h.name}</span>
            <span className="font-mono text-[11px] text-muted-foreground tabular">{h.time}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
