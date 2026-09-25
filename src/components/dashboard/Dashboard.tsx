"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useMemo, useRef } from "react";
import { useI18n } from "@/components/providers/I18nProvider";
import { useToast } from "@/components/providers/Toast";
import { GardenHealth } from "@/components/dashboard/GardenHealth";
import { ConfirmDialog } from "@/components/modals/ConfirmDialog";
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
  CloseIcon,
} from "@/components/icons";
import { cn } from "@/lib/utils";

type Tab = "garden" | "wallet" | "missions" | "collection" | "shop" | "weather" | "achievements";

export function DashboardLayout({
  tab,
  player,
}: {
  tab: Tab;
  player?: { username: string; level: number };
}) {
  const { t } = useI18n();
  const d = t.panel.dashboard;

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      {/* Status bar */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-secondary/30">
        <span className="font-mono text-[11px] text-muted-foreground">{d.url}</span>
        <div className="flex items-center gap-3">
          {player && (
            <span className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
              {t.userMenu.level} {player.level}
            </span>
          )}
          <span className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-sage animate-pulse-dot" />
            {d.synced}
          </span>
        </div>
      </div>

      {/* Tab content — no sidebar, the app layout provides navigation */}
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
            {tab === "achievements" && <AchievementsTab />}
          </motion.div>
        </AnimatePresence>
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

  // Live humidity drain
  const [humidity, setHumidity] = useState(50);
  useEffect(() => {
    if (tick > 0) setHumidity((h) => Math.max(10, h - 0.5));
  }, [tick]);

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
  const [showXpPopup, setShowXpPopup] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<typeof liveSlots[number] | null>(null);

  const handleHarvestAll = () => {
    setHarvested(true);
    setShowXpPopup(true);
    setTimeout(() => setHarvested(false), 2000);
    setTimeout(() => setShowXpPopup(false), 2500);
    toast("Harvested 1 Sunflower · +400 🪙 +20 XP", "success");
  };

  const handleWater = () => {
    setHumidity((h) => Math.min(100, h + 30));
    toast("Watered garden · Humidity +30%", "success");
  };

  // Live activity feed
  const [activities, setActivities] = useState(g.activity);
  useEffect(() => {
    if (tick > 0 && tick % 5 === 0) {
      const newActivity = {
        time: "just now",
        text: `Sunflower in slot ${Math.floor(Math.random() * 6) + 1} grew ${Math.floor(Math.random() * 5) + 1}%`,
        tone: "sage" as const,
      };
      setActivities((prev) => [newActivity, ...prev.slice(0, 3)]);
    }
  }, [tick]);

  return (
    <div className="relative">
      {/* XP popup */}
      <AnimatePresence>
        {showXpPopup && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.8 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-0 right-0 z-20 rounded-lg bg-sage text-white px-4 py-2 shadow-lg"
          >
            <p className="font-display text-sm font-bold">+400 🪙 +20 XP</p>
          </motion.div>
        )}
      </AnimatePresence>

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
              onClick={handleWater}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium hover:bg-secondary transition-colors"
            >
              💧 Water
            </motion.button>
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
                  <CheckIcon size={13} /> Done!
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
        <div className="rounded-lg border border-border bg-background p-3">
          <DropletIcon size={14} className="text-sky-soft mb-2" />
          <p className="font-display text-base font-medium text-foreground tabular">{Math.round(humidity)}%</p>
          <p className="text-[10px] text-muted-foreground">{g.humidity}</p>
          <div className="mt-1.5 h-0.5 w-full rounded-full bg-secondary overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-sky-soft"
              animate={{ width: `${humidity}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
        <MiniStat icon={ClockIcon} label={g.nextReady} value={nextReady} />
        <MiniStat icon={SparkIcon} label={g.mutationHint} value="✓" />
      </div>

      {/* Garden health indicator */}
      <div className="mb-7">
        <GardenHealth
          humidity={humidity}
          weather={g.weather}
          readyCount={1}
          totalSlots={6}
        />
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
            onClick={() => setSelectedSlot(slot)}
          />
        ))}
        <DashSlot emoji={g.readySlot.emoji} name={g.readySlot.name} progress={100} ready onClick={() => setSelectedSlot({ ...g.readySlot, liveProgress: 100, liveEta: "" } as any)} />
        <DashSlot empty />
        <DashSlot empty />
      </div>

      <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground mt-7 mb-3">
        {g.activityLabel}
      </p>
      <div className="space-y-2.5">
        <AnimatePresence initial={false}>
          {activities.map((a, i) => (
            <ActivityRow key={i} time={a.time} text={a.text} tone={a.tone} />
          ))}
        </AnimatePresence>
      </div>

      {/* Slot detail modal */}
      <SlotDetailModal slot={selectedSlot} onClose={() => setSelectedSlot(null)} />
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
  onClick,
}: {
  emoji?: string;
  name?: string;
  progress?: number;
  eta?: string;
  ready?: boolean;
  empty?: boolean;
  onClick?: () => void;
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
    <motion.div
      whileHover={{ y: -2 }}
      onClick={onClick}
      className={cn(
        "rounded-lg border p-3 cursor-pointer transition-colors",
        ready ? "border-sage/40 bg-sage/[0.04]" : "border-border bg-background hover:border-sage/30"
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

function SlotDetailModal({ slot, onClose }: { slot: any; onClose: () => void }) {
  const { t } = useI18n();
  const g = t.panel.dashboard.garden;
  const [harvesting, setHarvesting] = useState(false);

  useEffect(() => {
    if (!slot) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [slot, onClose]);

  if (!slot) return null;

  const isReady = slot.liveProgress >= 100 || slot.ready;

  const handleHarvest = () => {
    setHarvesting(true);
    setTimeout(() => {
      setHarvesting(false);
      onClose();
    }, 1500);
  };

  return (
    <AnimatePresence>
      {slot && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] grid place-items-center p-4"
          role="dialog"
          aria-modal="true"
        >
          <button aria-label="Close" onClick={onClose} className="absolute inset-0 bg-ink/40 backdrop-blur-sm" />
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-sm bg-card border border-border rounded-2xl shadow-2xl overflow-hidden"
          >
            <button onClick={onClose} className="absolute top-3 right-3 grid place-items-center h-8 w-8 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors z-10" aria-label="Close">
              <CloseIcon size={16} />
            </button>

            <div className={cn("h-32 grid place-items-center", isReady ? "bg-gradient-to-br from-sage/10 to-transparent" : "bg-gradient-to-br from-secondary/30 to-transparent")}>
              <motion.span
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="text-6xl"
              >
                {slot.emoji}
              </motion.span>
            </div>

            <div className="p-5">
              <h3 className="font-display text-xl font-medium text-foreground">{slot.name}</h3>
              <div className="mt-3 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Status</span>
                  <span className={cn("font-medium", isReady ? "text-sage" : "text-foreground")}>
                    {isReady ? g.ready : g.growing}
                  </span>
                </div>
                {!isReady && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-mono text-foreground tabular">{Math.round(slot.liveProgress ?? slot.progress ?? 0)}%</span>
                  </div>
                )}
                {!isReady && (
                  <div className="h-1.5 w-full rounded-full bg-secondary overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-sage-soft"
                      initial={{ width: 0 }}
                      animate={{ width: `${slot.liveProgress ?? slot.progress ?? 0}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                )}
                {isReady && (
                  <div className="mt-4 rounded-lg bg-sage/[0.06] border border-sage/20 px-4 py-3">
                    <p className="text-sm text-foreground text-pretty">
                      <span className="font-semibold text-sage">Ready to harvest!</span> You'll get flowers, XP, and Daisies.
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-5 flex gap-2">
                {isReady ? (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleHarvest}
                    className={cn(
                      "flex-1 inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors",
                      harvesting ? "bg-sage text-white" : "bg-foreground text-background hover:bg-foreground/90"
                    )}
                  >
                    {harvesting ? <><CheckIcon size={15} /> Harvested!</> : <>🌻 {g.harvestNow}</>}
                  </motion.button>
                ) : (
                  <button className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground hover:bg-secondary transition-colors">
                    💧 Water this plant
                  </button>
                )}
                <button onClick={onClose} className="rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ActivityRow({ time, text, tone }: { time: string; text: string; tone: "sage" | "sky" | "gold" | "ink" }) {
  const tones = { sage: "bg-sage", sky: "bg-sky-soft", gold: "bg-gold", ink: "bg-foreground/30" };
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0 }}
      className="flex items-start gap-3 text-sm"
    >
      <span className={cn("h-1.5 w-1.5 rounded-full mt-1.5 shrink-0", tones[tone])} />
      <p className="flex-1 text-foreground/90">{text}</p>
      <span className="font-mono text-[11px] text-muted-foreground shrink-0 tabular">{time}</span>
    </motion.div>
  );
}

/* ── Wallet Tab ──────────────────────────────────────────────────────── */

function WalletTab() {
  const { t } = useI18n();
  const { toast } = useToast();
  const w = t.panel.dashboard.wallet;

  const [balance, setBalance] = useState(0);
  const [displayBalance, setDisplayBalance] = useState(0);
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
      setDisplayBalance(Math.round(target * eased));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const [sellItems, setSellItems] = useState([
    { emoji: "🌻", name: "Sunflower", count: 12, price: 200, selected: 0 },
    { emoji: "🌹", name: "Red Rose", count: 4, price: 400, selected: 0 },
    { emoji: "🤍", name: "White Rose", count: 2, price: 400, selected: 0 },
    { emoji: "🥕", name: "Carrot", count: 7, price: 50, selected: 0 },
  ]);
  const [sellConfirm, setSellConfirm] = useState<{ index: number; emoji: string; name: string; price: number } | null>(null);

  const handleSell = (index: number) => {
    const item = sellItems[index];
    if (item.count <= 0) return;
    setSellItems((prev) => prev.map((it, i) =>
      i === index ? { ...it, count: it.count - 1, selected: it.selected + 1 } : it
    ));
    setDisplayBalance((b) => b + item.price);
    toast(`Sold 1 ${item.name} for ${item.price} 🪙`, "success");
  };

  const confirmSell = () => {
    if (!sellConfirm) return;
    handleSell(sellConfirm.index);
    setSellConfirm(null);
  };

  return (
    <div>
      <TabHeader title={w.title} subtitle={w.subtitle} />

      <div className="border-b border-border pb-6 mb-6">
        <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{w.balance}</p>
        <div className="mt-1 flex items-baseline gap-3">
          <p className="font-display text-5xl font-medium text-foreground marker-num tabular">
            {displayBalance.toLocaleString()}
          </p>
          <span className="text-sm text-muted-foreground">{w.daisies}</span>
        </div>
        <p className="mt-2 text-xs text-sage flex items-center gap-1">
          <TrendingIcon size={12} /> {w.thisWeek}
        </p>
      </div>

      {/* Sell flowers */}
      <div className="mb-6">
        <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground mb-3">Sell flowers</p>
        <div className="grid grid-cols-2 gap-2.5">
          {sellItems.map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -2 }}
              className="card-hairline rounded-lg p-3 flex items-center gap-3"
            >
              <span className="text-2xl shrink-0">{item.emoji}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{item.name}</p>
                <p className="font-mono text-[10px] text-muted-foreground">×{item.count} · 🪙 {item.price}</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => item.count > 0 && setSellConfirm({ index: i, emoji: item.emoji, name: item.name, price: item.price })}
                disabled={item.count <= 0}
                className={cn(
                  "rounded-md px-2 py-1 text-[10px] font-medium transition-colors",
                  item.count > 0
                    ? "bg-foreground text-background hover:bg-foreground/90"
                    : "bg-secondary text-muted-foreground cursor-not-allowed"
                )}
              >
                Sell
              </motion.button>
            </motion.div>
          ))}
        </div>
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

      {/* Sell confirmation dialog */}
      <ConfirmDialog
        open={!!sellConfirm}
        onClose={() => setSellConfirm(null)}
        onConfirm={confirmSell}
        title={`Sell ${sellConfirm?.name ?? ""}?`}
        description={`You'll receive ${sellConfirm?.price ?? 0} Daisies for selling 1 ${sellConfirm?.name ?? ""}. This cannot be undone.`}
        confirmLabel={`Sell for 🪙 ${sellConfirm?.price ?? 0}`}
        cancelLabel="Keep"
        emoji={sellConfirm?.emoji}
        amount={`+${sellConfirm?.price ?? 0} 🪙`}
      />
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
  const { toast } = useToast();
  const m = t.panel.dashboard.missions;

  const [items, setItems] = useState(m.items.map((item) => ({ ...item, claimed: item.done })));

  const claimableCount = items.filter((i) => i.done && !i.claimed).length;

  const handleClaim = (index: number) => {
    setItems((prev) => prev.map((it, i) => i === index ? { ...it, claimed: true } : it));
    toast(`Claimed: ${items[index].reward}`, "success");
  };

  const handleClaimAll = () => {
    const count = claimableCount;
    if (count === 0) return;
    setItems((prev) => prev.map((it) => it.done ? { ...it, claimed: true } : it));
    toast(`Claimed ${count} mission${count > 1 ? "s" : ""}`, "success");
  };

  return (
    <div>
      <TabHeader
        title={m.title}
        subtitle={m.subtitle}
        action={
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-flex items-center gap-1.5 font-mono text-[11px] text-muted-foreground">
              <TrendingIcon size={13} className="text-sage" /> {m.streak}
            </span>
            {claimableCount > 0 && (
              <motion.button
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleClaimAll}
                className="inline-flex items-center gap-1.5 rounded-lg bg-sage text-white px-3 py-1.5 text-xs font-medium"
              >
                <CheckIcon size={13} /> Claim all ({claimableCount})
              </motion.button>
            )}
          </div>
        }
      />

      <div className="divide-y divide-border">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-4 py-3.5">
            <span className={cn(
              "grid place-items-center h-7 w-7 rounded-full shrink-0 text-xs",
              item.claimed ? "bg-sage text-white" : item.locked ? "bg-secondary text-muted-foreground/50" : "bg-secondary text-muted-foreground"
            )}>
              {item.claimed ? <CheckIcon size={13} /> : item.locked ? <LockIcon size={12} /> : i + 1}
            </span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{item.type}</span>
                {item.progress && <span className="font-mono text-[10px] text-foreground tabular">{item.progress}</span>}
              </div>
              <p className={cn("text-sm mt-0.5", item.claimed ? "text-muted-foreground line-through" : "text-foreground font-medium")}>
                {item.title}
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs text-muted-foreground">{item.reward}</span>
              {item.done && !item.claimed && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleClaim(i)}
                  className="rounded-md bg-foreground text-background px-2 py-1 text-[10px] font-medium"
                >
                  Claim
                </motion.button>
              )}
            </div>
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

/* ── Shop Tab ────────────────────────────────────────────────────────── */

function ShopTab() {
  const { t } = useI18n();
  const { toast } = useToast();
  const s = t.panel.dashboard.shop;
  const [filter, setFilter] = useState<string>("all");
  const [bought, setBought] = useState<string | null>(null);
  const [balance, setBalance] = useState(1240);

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
    setBalance((b) => b - price);
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
            <span className="font-mono text-xs font-medium text-foreground tabular">{balance.toLocaleString()}</span>
          </div>
        }
      />

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

      <div className="grid sm:grid-cols-2 gap-3">
        {filtered.map((item, i) => {
          const canAfford = balance >= item.price;
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

/* ── Weather Tab ─────────────────────────────────────────────────────── */

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

/* ── Achievements Tab (NEW) ──────────────────────────────────────────── */

function AchievementsTab() {
  const { t } = useI18n();
  const a = t.achievements;
  const earnedCount = a.items.filter((i) => i.earned).length;

  const rarityColor: Record<string, string> = {
    Common: "text-muted-foreground",
    Uncommon: "text-sage",
    Rare: "text-terra-deep",
    Epic: "text-gold-deep",
  };

  return (
    <div>
      <TabHeader
        title={a.title.replace("playing, not paying.", "").trim() || "Achievements"}
        subtitle={`${earnedCount} / ${a.items.length} ${a.earnedLabel}`}
        action={
          <div className="hidden sm:flex items-center gap-2">
            <div className="h-1 w-20 rounded-full bg-secondary overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-sage"
                initial={{ width: 0 }}
                animate={{ width: `${(earnedCount / a.items.length) * 100}%` }}
                transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
            <span className="font-mono text-[11px] text-muted-foreground tabular">
              {Math.round((earnedCount / a.items.length) * 100)}%
            </span>
          </div>
        }
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
        {a.items.map((badge, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: Math.min(i * 0.03, 0.3) }}
            whileHover={{ y: -2 }}
            className={cn(
              "rounded-lg border p-4 text-center transition-colors cursor-pointer",
              badge.earned
                ? "border-border bg-background hover:border-sage/30"
                : "border-dashed border-border bg-background/30"
            )}
          >
            <div className={cn("text-3xl mb-2", !badge.earned && "grayscale opacity-30")}>
              {badge.earned ? badge.emoji : "🔒"}
            </div>
            <p className={cn("text-xs font-medium leading-tight", badge.earned ? "text-foreground" : "text-muted-foreground")}>
              {badge.name}
            </p>
            <p className="mt-1 text-[10px] text-muted-foreground text-pretty leading-tight">
              {badge.desc}
            </p>
            <p className={cn("mt-2 font-mono text-[9px] uppercase tracking-wider", badge.earned ? "text-sage" : "text-muted-foreground/50")}>
              {badge.earned ? a.earnedLabel : a.lockedLabel}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
