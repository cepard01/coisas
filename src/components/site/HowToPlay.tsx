"use client";

import { Reveal } from "./Reveal";
import { PLAY_STEPS } from "@/lib/daisy-data";

export function HowToPlay() {
  return (
    <section id="how" className="py-24 md:py-32 border-t border-border">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 text-muted-foreground">
            <span className="font-mono text-xs marker-num">01</span>
            <span className="h-px w-8 bg-border" />
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-sage font-semibold">
              Como funciona
            </span>
          </div>
          <h2 className="mt-5 font-display text-4xl sm:text-5xl lg:text-[3.5rem] font-medium tracking-tight text-foreground text-balance leading-[1.05]">
            Três passos. <em className="font-normal text-sage">Sem complicação.</em>
          </h2>
          <p className="mt-5 text-base sm:text-lg text-muted-foreground text-pretty leading-relaxed max-w-2xl">
            Você não precisa decorar comandos. Tudo acontece em painéis interativos com botões —
            como um mini-jogo dentro do Discord.
          </p>
        </div>

        <div className="mt-16 grid lg:grid-cols-3 gap-6">
          {PLAY_STEPS.map((step, i) => (
            <Reveal key={step.step} delay={i * 0.08} className="flex flex-col">
              <div className="flex items-baseline justify-between mb-4">
                <span className="text-4xl">{step.emoji}</span>
                <span className="font-display text-5xl font-medium text-foreground/10 marker-num">
                  {step.step}
                </span>
              </div>
              <h3 className="font-display text-xl font-medium text-foreground">
                {step.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground text-pretty leading-relaxed flex-1">
                {step.description}
              </p>
            </Reveal>
          ))}
        </div>

        {/* Discord mockup */}
        <Reveal delay={0.2} className="mt-16">
          <DiscordMockup />
        </Reveal>
      </div>
    </section>
  );
}

function DiscordMockup() {
  return (
    <div className="rounded-xl border border-border overflow-hidden">
      {/* Discord window header */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-ink text-paper/70">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-terra/60" />
          <span className="h-2.5 w-2.5 rounded-full bg-gold/60" />
          <span className="h-2.5 w-2.5 rounded-full bg-sage/60" />
        </div>
        <span className="ml-2 font-mono text-[11px]"># meu-jardim</span>
        <span className="ml-auto font-mono text-[11px] opacity-60">Discord</span>
      </div>

      {/* Message area */}
      <div className="p-4 sm:p-6 bg-ink text-paper space-y-4">
        {/* User message */}
        <div className="flex items-start gap-3">
          <span className="grid place-items-center h-9 w-9 rounded-full bg-sage/30 text-sm shrink-0">
            🌻
          </span>
          <div>
            <p className="text-xs text-paper/50">
              <span className="font-medium text-paper">você</span> · agora mesmo
            </p>
            <p className="font-mono text-sm text-gold">/garden</p>
          </div>
        </div>

        {/* Bot response — garden panel */}
        <div className="rounded-lg bg-[oklch(0.22 0.01 150)] border border-white/5 overflow-hidden">
          <div className="flex items-center gap-2.5 px-4 py-3 border-b border-white/5">
            <DaisyMarkMini />
            <div>
              <p className="text-sm font-semibold text-paper">DaisyFlower</p>
              <p className="text-[10px] text-paper/50 font-mono">app · agora</p>
            </div>
            <span className="ml-auto text-[11px] text-gold bg-gold/10 px-2 py-0.5 rounded">
              ☀ Ensolarado
            </span>
          </div>

          <div className="p-4">
            <p className="text-sm text-paper font-medium mb-3">🌼 Meu Jardim</p>
            <p className="text-xs text-paper/60 mb-3">
              4 plantas · 2 prontas para colher · umidade 50%
            </p>

            {/* Slots mini */}
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

            {/* Buttons */}
            <div className="flex flex-wrap gap-1.5">
              <span className="rounded bg-sage text-white px-2.5 py-1 text-[11px] font-medium">
                🌱 Plantar
              </span>
              <span className="rounded bg-white/10 text-paper px-2.5 py-1 text-[11px]">
                🌻 Colher
              </span>
              <span className="rounded bg-white/10 text-paper px-2.5 py-1 text-[11px]">
                💧 Regar
              </span>
              <span className="rounded bg-white/10 text-paper px-2.5 py-1 text-[11px]">
                🛒 Loja
              </span>
            </div>

            <p className="mt-3 text-[11px] text-gold bg-gold/10 rounded px-2 py-1.5">
              <span className="font-semibold">Dica:</span> Colha seu girassol pronto 🌻
            </p>
          </div>
        </div>
      </div>

      {/* Input bar */}
      <div className="px-4 py-3 bg-[oklch(0.16 0.008 150)] border-t border-white/5">
        <p className="text-xs text-paper/40 font-mono">
          Envie uma mensagem para #meu-jardim
        </p>
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
