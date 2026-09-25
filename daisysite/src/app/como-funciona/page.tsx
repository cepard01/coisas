"use client";

import Link from "next/link";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";
import { PLAY_STEPS } from "@/lib/daisy-data";
import { ArrowRightIcon } from "@/components/site/icons";

export default function ComoFuncionaPage() {
  return (
    <>
      <PageHeader
        number="01"
        eyebrow="Como funciona"
        title={
          <>
            Três passos.{" "}
            <em className="font-normal text-sage">Sem complicação.</em>
          </>
        }
        description="Você não precisa decorar comandos. Tudo acontece em painéis interativos com botões — como um mini-jogo dentro do Discord."
      />

      {/* Steps */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <div className="grid lg:grid-cols-3 gap-6">
            {PLAY_STEPS.map((step, i) => (
              <Reveal key={step.step} delay={i * 0.08} className="flex flex-col">
                <div className="flex items-baseline justify-between mb-4">
                  <span className="text-4xl">{step.emoji}</span>
                  <span className="font-display text-5xl font-medium text-foreground/10 marker-num">
                    {step.step}
                  </span>
                </div>
                <h3 className="font-display text-xl font-medium text-foreground">{step.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground text-pretty leading-relaxed flex-1">
                  {step.description}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Discord mockup */}
      <section className="py-16 md:py-24 border-t border-border">
        <div className="mx-auto max-w-4xl px-5 sm:px-6">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-sage font-semibold mb-4">
              É assim no Discord
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-medium text-foreground mb-8 text-balance">
              Um painel com botões, não uma tela cheia de texto.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <DiscordMockup />
          </Reveal>
        </div>
      </section>

      {/* Weather */}
      <section className="py-16 md:py-24 border-t border-border">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-sage font-semibold mb-4">
              O clima muda tudo
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-medium text-foreground mb-3 text-balance">
              Cada tempo tem seu efeito no jardim.
            </h2>
            <p className="text-base text-muted-foreground text-pretty max-w-2xl mb-10">
              O clima rotativa a cada 4 horas. Você precisa se adaptar — regar mais no sol,
              aproveitar a chuva, esperar a tempestade passar.
            </p>
          </Reveal>
          <WeatherGrid />
        </div>
      </section>

      {/* Mutations */}
      <section className="py-16 md:py-24 border-t border-border bg-background">
        <div className="mx-auto max-w-4xl px-5 sm:px-6">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-sage font-semibold mb-4">
              Descobertas, não sorte aleatória
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-medium text-foreground mb-5 text-balance">
              Plante combinações e descubra mutações raras.
            </h2>
            <p className="text-base text-muted-foreground text-pretty leading-relaxed mb-8 max-w-2xl">
              Algumas plantas só nascem quando você planta outras duas lado a lado. O bot dá dicas
              quando você está perto de descobrir algo especial. Nada de confusão aleatória —
              cada descoberta faz sentido.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <MutationDiagram />
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 border-t border-border">
        <div className="mx-auto max-w-3xl px-5 sm:px-6 text-center">
          <Reveal>
            <h2 className="font-display text-3xl font-medium tracking-tight text-foreground text-balance">
              Quer ver as plantas que você pode cultivar?
            </h2>
            <Link
              href="/plantas"
              className="group mt-6 inline-flex items-center gap-2 rounded-lg bg-foreground text-background px-5 py-2.5 text-sm font-medium hover:bg-foreground/90 transition-colors"
            >
              Ver plantas
              <ArrowRightIcon size={15} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function DiscordMockup() {
  return (
    <div className="rounded-xl border border-border overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-2.5 bg-ink text-paper/70">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-terra/60" />
          <span className="h-2.5 w-2.5 rounded-full bg-gold/60" />
          <span className="h-2.5 w-2.5 rounded-full bg-sage/60" />
        </div>
        <span className="ml-2 font-mono text-[11px]"># meu-jardim</span>
        <span className="ml-auto font-mono text-[11px] opacity-60">Discord</span>
      </div>

      <div className="p-4 sm:p-6 bg-ink text-paper space-y-4">
        <div className="flex items-start gap-3">
          <span className="grid place-items-center h-9 w-9 rounded-full bg-sage/30 text-sm shrink-0">🌻</span>
          <div>
            <p className="text-xs text-paper/50">
              <span className="font-medium text-paper">você</span> · agora mesmo
            </p>
            <p className="font-mono text-sm text-gold">/garden</p>
          </div>
        </div>

        <div className="rounded-lg bg-[oklch(0.22 0.01 150)] border border-white/5 overflow-hidden">
          <div className="flex items-center gap-2.5 px-4 py-3 border-b border-white/5">
            <DaisyMarkMini />
            <div>
              <p className="text-sm font-semibold text-paper">DaisyFlower</p>
              <p className="text-[10px] text-paper/50 font-mono">app · agora</p>
            </div>
            <span className="ml-auto text-[11px] text-gold bg-gold/10 px-2 py-0.5 rounded">☀ Ensolarado</span>
          </div>

          <div className="p-4">
            <p className="text-sm text-paper font-medium mb-3">🌼 Meu Jardim</p>
            <p className="text-xs text-paper/60 mb-3">4 plantas · 2 prontas para colher · umidade 50%</p>

            <div className="grid grid-cols-3 gap-2 mb-3">
              <div className="rounded bg-black/20 p-2 text-center">
                <div className="text-lg">🌻</div>
                <p className="text-[10px] text-paper/60 mt-0.5">crescendo 72%</p>
              </div>
              <div className="rounded bg-black/20 p-2 text-center">
                <div className="text-lg">🌹</div>
                <p className="text-[10px] text-paper/60 mt-0.5">crescendo 45%</p>
              </div>
              <div className="rounded bg-sage/15 border border-sage/30 p-2 text-center">
                <div className="text-lg">🌻</div>
                <p className="text-[10px] text-sage font-medium mt-0.5">pronta!</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5">
              <span className="rounded bg-sage text-white px-2.5 py-1 text-[11px] font-medium">🌱 Plantar</span>
              <span className="rounded bg-white/10 text-paper px-2.5 py-1 text-[11px]">🌻 Colher</span>
              <span className="rounded bg-white/10 text-paper px-2.5 py-1 text-[11px]">💧 Regar</span>
              <span className="rounded bg-white/10 text-paper px-2.5 py-1 text-[11px]">🛒 Loja</span>
            </div>

            <p className="mt-3 text-[11px] text-gold bg-gold/10 rounded px-2 py-1.5">
              <span className="font-semibold">Dica:</span> Colha seu girassol pronto 🌻
            </p>
          </div>
        </div>
      </div>

      <div className="px-4 py-3 bg-[oklch(0.16 0.008 150)] border-t border-white/5">
        <p className="text-xs text-paper/40 font-mono">Envie uma mensagem para #meu-jardim</p>
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

function WeatherGrid() {
  const weather = [
    { emoji: "☀️", name: "Ensolarado", effect: "Cresce 50% mais rápido", advice: "Mas a água evapora rápido — regue antes de sair.", color: "from-gold/15" },
    { emoji: "🌧️", name: "Chuvoso", effect: "A chuva rega seu jardim de graça", advice: "Tempo seguro para deixar plantas crescendo.", color: "from-sky-soft/20" },
    { emoji: "⛈️", name: "Tempestade", effect: "Crescimento mais lento", advice: "Mas abre chance de mutações raras depois.", color: "from-terra-deep/12" },
    { emoji: "🌨️", name: "Nevando", effect: "Tudo cresce devagar", advice: "Plantas de inverno especiais podem aparecer.", color: "from-sky-soft/12" },
  ];
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
      {weather.map((w, i) => (
        <Reveal key={w.name} delay={i * 0.05}>
          <div className={`card-hairline rounded-xl overflow-hidden bg-gradient-to-br ${w.color} to-transparent`}>
            <div className="p-5">
              <div className="text-3xl mb-3">{w.emoji}</div>
              <h4 className="font-display text-base font-medium text-foreground">{w.name}</h4>
              <p className="mt-1.5 text-sm text-foreground/90">{w.effect}</p>
              <p className="mt-1 text-xs text-muted-foreground text-pretty">{w.advice}</p>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

function MutationDiagram() {
  return (
    <div className="rounded-xl border border-border bg-card p-6 sm:p-8">
      <div className="flex items-baseline justify-between mb-6">
        <p className="font-mono text-[11px] text-muted-foreground">exemplo de mutação</p>
        <span className="font-mono text-[11px] text-terra">30% de chance</span>
      </div>

      <div className="flex items-center justify-center gap-4 sm:gap-8 py-4">
        <div className="flex flex-col items-center gap-2">
          <span className="grid place-items-center h-16 w-16 rounded-2xl bg-terra/10 text-3xl border border-border">🌹</span>
          <span className="text-[11px] text-muted-foreground">Rosa Vermelha</span>
        </div>
        <span className="font-display text-2xl text-muted-foreground">+</span>
        <div className="flex flex-col items-center gap-2">
          <span className="grid place-items-center h-16 w-16 rounded-2xl bg-sage/10 text-3xl border border-border">🤍</span>
          <span className="text-[11px] text-muted-foreground">Rosa Branca</span>
        </div>
        <span className="font-display text-2xl text-muted-foreground">→</span>
        <div className="flex flex-col items-center gap-2">
          <span className="grid place-items-center h-16 w-16 rounded-2xl bg-gradient-to-br from-terra/15 to-gold/15 text-3xl border border-terra/30 animate-float-soft">🌸</span>
          <span className="text-[11px] font-semibold text-terra-deep">Rosa Rosa</span>
        </div>
      </div>

      <div className="mt-6 rounded-lg bg-sage/[0.06] border border-sage/20 px-4 py-3">
        <p className="text-sm text-foreground text-pretty">
          <span className="font-semibold text-sage">Dica do bot:</span> Plante uma Rosa Vermelha
          e uma Rosa Branca lado a lado. Quando as duas amadurecerem, há 30% de chance de uma
          delas florescer como Rosa Rosa.
        </p>
      </div>
    </div>
  );
}
