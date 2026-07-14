"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { AuthModal } from "./AuthModal";
import { Reveal } from "./Reveal";
import {
  SproutIcon,
  WalletIcon,
  ListIcon,
  BookIcon,
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
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 text-muted-foreground">
            <span className="font-mono text-xs marker-num">05</span>
            <span className="h-px w-8 bg-border" />
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-sage font-semibold">
              No site também
            </span>
          </div>
          <h2 className="mt-5 font-display text-4xl sm:text-5xl lg:text-[3.5rem] font-medium tracking-tight text-foreground text-balance leading-[1.05]">
            Seu jardim, <em className="font-normal text-sage">no navegador.</em>
          </h2>
          <p className="mt-5 text-base sm:text-lg text-muted-foreground text-pretty leading-relaxed max-w-2xl">
            Conecte sua conta do Discord e acompanhe seu jardim pelo site — sem precisar abrir
            o app. Veja suas plantas, carteira, missões e coleção em um painel limpo.
          </p>
        </div>

        <div className="mt-14">
          {hydrated && player ? (
            <Reveal>
              <DashboardLayout tab={tab} onTab={setTab} player={player} />
            </Reveal>
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
      <div className="absolute inset-0 overflow-hidden" aria-hidden>
        <div className="opacity-20 blur-md pointer-events-none select-none">
          <DashboardLayout tab="garden" />
        </div>
      </div>
      <div className="relative grid place-items-center py-20 sm:py-28 px-6 text-center">
        <Reveal>
          <span className="grid place-items-center h-12 w-12 rounded-full border border-border mx-auto">
            <LockIcon size={20} className="text-muted-foreground" />
          </span>
          <h3 className="mt-5 font-display text-2xl font-medium text-foreground">
            Conecte para ver
          </h3>
          <p className="mt-2 text-sm text-muted-foreground max-w-md text-pretty">
            Entre com Discord (mockup — nenhum dado real é enviado) para explorar como ficaria
            seu painel no site.
          </p>
          <button
            onClick={onSignIn}
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-foreground text-background px-5 py-2.5 text-sm font-medium hover:bg-foreground/90 transition-colors"
          >
            Entrar com Discord
            <ArrowUpRightIcon size={15} />
          </button>
        </Reveal>
      </div>
    </div>
  );
}

export function DashboardLayout({
  tab,
  onTab,
  player,
}: {
  tab: Tab;
  onTab?: (t: Tab) => void;
  player?: { username: string; level: number };
}) {
  const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
    { id: "garden", label: "Jardim", icon: SproutIcon },
    { id: "wallet", label: "Carteira", icon: WalletIcon },
    { id: "missions", label: "Missões", icon: ListIcon },
    { id: "collection", label: "Coleção", icon: BookIcon },
  ];

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-secondary/30">
        <span className="font-mono text-[11px] text-muted-foreground">
          daisyflower.app/meu-painel
        </span>
        <span className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-sage animate-pulse-dot" />
          sincronizado
        </span>
      </div>

      <div className="grid lg:grid-cols-[200px_1fr]">
        {/* Sidebar */}
        <aside className="border-b lg:border-b-0 lg:border-r border-border p-3">
          <div className="flex items-center gap-2.5 p-2 rounded-lg border border-border bg-background">
            <span className="grid place-items-center h-8 w-8 rounded-full bg-sage/10 shrink-0">
              <DaisyMark size={16} className="text-sage" />
            </span>
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground truncate">
                {player?.username ?? "jardineiro"}
              </p>
              <p className="text-[11px] text-muted-foreground">Nível {player?.level ?? 7}</p>
            </div>
          </div>

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
  return (
    <div>
      <TabHeader
        title="Meu Jardim"
        subtitle="3 plantas crescendo · 1 pronta para colher"
        action={
          <div className="hidden sm:flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5">
            <SunIcon size={14} className="text-gold-deep" />
            <span className="text-xs font-medium text-foreground">Ensolarado</span>
            <span className="font-mono text-[10px] text-muted-foreground">×1.5</span>
          </div>
        }
      />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-7">
        <MiniStat icon={SproutIcon} label="Slots usados" value="4 / 6" />
        <MiniStat icon={DropletIcon} label="Umidade" value="50%" />
        <MiniStat icon={ClockIcon} label="Próxima pronta" value="~18m" />
        <MiniStat icon={SparkIcon} label="Dica de mutação" value="Ativa" />
      </div>

      <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground mb-3">
        Slots do jardim
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
        <DashSlot emoji="🌻" name="Girassol" progress={72} eta="~18m" />
        <DashSlot emoji="🌹" name="Rosa Vermelha" progress={45} eta="~1h 6m" />
        <DashSlot emoji="🤍" name="Rosa Branca" progress={90} eta="~12m" />
        <DashSlot emoji="🌻" name="Girassol" progress={100} ready />
        <DashSlot empty />
        <DashSlot empty />
      </div>

      <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground mt-7 mb-3">
        Atividade recente
      </p>
      <div className="space-y-2.5">
        <ActivityRow time="há 2 min" text="Girassol no slot 4 ficou pronto para colher." tone="sage" />
        <ActivityRow time="há 14 min" text="Regou Rosa Branca no slot 3. Umidade +30%." tone="sky" />
        <ActivityRow time="há 1h" text="Plantou semente de Rosa Vermelha no slot 2." tone="ink" />
        <ActivityRow time="há 3h" text="Clima mudou de Chuvoso para Ensolarado." tone="gold" />
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
        <p className="font-mono text-[11px] text-muted-foreground/60">vazio</p>
        <p className="mt-3 text-[11px] text-muted-foreground/50">+ plantar aqui</p>
      </div>
    );
  }
  return (
    <div className={cn("rounded-lg border p-3", ready ? "border-sage/40 bg-sage/[0.04]" : "border-border bg-background")}>
      <div className="flex items-center justify-between">
        <span className="text-lg">{emoji}</span>
        <span className={cn("font-mono text-[9px] uppercase tracking-wider", ready ? "text-sage" : "text-muted-foreground")}>
          {ready ? "pronta!" : "crescendo"}
        </span>
      </div>
      <p className="mt-1.5 text-sm font-medium text-foreground">{name}</p>
      {ready ? (
        <p className="mt-1 text-[11px] text-sage font-medium">Colher agora</p>
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
  return (
    <div>
      <TabHeader title="Carteira" subtitle="Seus Daisies, XP e progresso" />

      <div className="border-b border-border pb-6 mb-6">
        <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Saldo</p>
        <div className="mt-1 flex items-baseline gap-3">
          <p className="font-display text-5xl font-medium text-foreground marker-num tabular">1.240</p>
          <span className="text-sm text-muted-foreground">Daisies</span>
        </div>
        <p className="mt-2 text-xs text-sage flex items-center gap-1">
          <TrendingIcon size={12} /> +320 esta semana
        </p>
      </div>

      <div className="mb-6">
        <div className="flex items-baseline justify-between mb-2">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Nível 7</p>
            <p className="font-display text-lg font-medium text-foreground">Jardineiro</p>
          </div>
          <span className="font-mono text-sm text-muted-foreground tabular">2.140 / 3.000 XP</span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-secondary overflow-hidden">
          <div className="h-full w-[71%] rounded-full bg-sage" />
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          Faltam 860 XP para o Nível 8 — desbloqueia <span className="text-foreground">decorações</span>
        </p>
      </div>

      <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground mb-3">
        Transações recentes
      </p>
      <div className="divide-y divide-border">
        <TxRow icon="🌻" label="Vendeu 2 Girassóis" amount="+400" time="há 2 min" positive />
        <TxRow icon="🌱" label="Comprou semente de Rosa" amount="−100" time="há 1h" />
        <TxRow icon="✓" label="Recompensa de missão diária" amount="+50" time="há 3h" positive />
        <TxRow icon="↑" label="Bônus de Nível 7" amount="+200" time="há 1 dia" positive />
        <TxRow icon="🚿" label="Comprou Regador" amount="−500" time="há 2 dias" />
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
  const missions = [
    { type: "Tutorial", title: "Plante sua primeira semente", reward: "+10 XP", done: true },
    { type: "Tutorial", title: "Colha sua primeira flor", reward: "1 semente", done: true },
    { type: "Diária", title: "Colha 3 flores", reward: "+50 Daisies", progress: "2 / 3" },
    { type: "Diária", title: "Rege seu jardim", reward: "+15 XP", progress: "1 / 1", done: true },
    { type: "Diária", title: "Verifique o clima", reward: "+10 Daisies" },
    { type: "Semanal", title: "Descubra uma mutação", reward: "semente rara", locked: true },
  ];

  return (
    <div>
      <TabHeader
        title="Missões"
        subtitle="3 de 6 concluídas hoje"
        action={
          <span className="hidden sm:inline-flex items-center gap-1.5 font-mono text-[11px] text-muted-foreground">
            <TrendingIcon size={13} className="text-sage" /> 4 dias seguidos
          </span>
        }
      />

      <div className="divide-y divide-border">
        {missions.map((m, i) => (
          <div key={i} className="flex items-center gap-4 py-3.5">
            <span className={cn(
              "grid place-items-center h-7 w-7 rounded-full shrink-0 text-xs",
              m.done ? "bg-sage text-white" : m.locked ? "bg-secondary text-muted-foreground/50" : "bg-secondary text-muted-foreground"
            )}>
              {m.done ? <CheckIcon size={13} /> : m.locked ? <LockIcon size={12} /> : i + 1}
            </span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{m.type}</span>
                {m.progress && <span className="font-mono text-[10px] text-foreground tabular">{m.progress}</span>}
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

function CollectionTab() {
  const entries = [
    { emoji: "🌻", name: "Girassol", rarity: "Comum", found: true, count: 12 },
    { emoji: "🌹", name: "Rosa Vermelha", rarity: "Incomum", found: true, count: 4 },
    { emoji: "🤍", name: "Rosa Branca", rarity: "Incomum", found: true, count: 2 },
    { emoji: "🌸", name: "Rosa Rosa", rarity: "Rara", found: false, hint: "Plante Rosa Vermelha + Branca juntas." },
    { emoji: "🥕", name: "Cenoura", rarity: "Comum", found: true, count: 7 },
    { emoji: "?", name: "???", rarity: "Rara", found: false, hint: "Continue cultivando sementes diferentes." },
    { emoji: "?", name: "???", rarity: "Épica", found: false, hint: "Exige uma condição de clima especial." },
    { emoji: "?", name: "???", rarity: "Incomum", found: false, hint: "Tente a loja durante o outono." },
  ];

  const rarityColor: Record<string, string> = {
    "Comum": "text-muted-foreground",
    "Incomum": "text-sage",
    "Rara": "text-terra-deep",
    "Épica": "text-gold-deep",
  };

  return (
    <div>
      <TabHeader
        title="Livro de Coleção"
        subtitle="4 de 8 descobertas · 50% completo"
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
