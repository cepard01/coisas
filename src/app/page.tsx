"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { AuthModal } from "@/components/site/AuthModal";
import { Reveal } from "@/components/site/Reveal";
import { ArrowRightIcon, ArrowUpRightIcon } from "@/components/site/icons";
import { HERO_STATS } from "@/lib/daisy-data";

export default function Home() {
  const { player, signIn, hydrated } = useAuth();
  const [authOpen, setAuthOpen] = useState(false);

  return (
    <>
      {/* Hero */}
      <section id="top" className="relative pt-32 pb-20 md:pt-40 md:pb-24 overflow-hidden">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-sage">
              simulador de jardim · grátis
            </span>
            <span className="h-px w-10 bg-border" />
            <span className="text-xs">para Discord</span>
          </div>

          <h1 className="mt-7 font-display text-[2.75rem] sm:text-7xl lg:text-[5.5rem] xl:text-[6rem] font-medium tracking-tight leading-[0.95] text-balance max-w-5xl">
            Cultive seu{" "}
            <span className="italic font-normal text-sage">pequeno jardim</span>
            <br className="hidden sm:block" /> dentro do Discord.
          </h1>

          <div className="mt-10 grid sm:grid-cols-2 gap-8 sm:gap-12 items-start">
            <div className="sm:col-start-2">
              <p className="text-base lg:text-lg text-muted-foreground text-pretty leading-relaxed max-w-md">
                Plante sementes, cuide das suas flores, reaja ao clima e descubra mutações raras.
                Um jogo tranquilo que cresce com você — sem pressa, sem grind, sem spam.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link
                  href="/comecar"
                  className="group inline-flex items-center gap-2 rounded-lg bg-foreground text-background px-5 py-2.5 text-sm font-medium hover:bg-foreground/90 transition-colors"
                >
                  Adicionar ao Discord
                  <ArrowRightIcon size={15} className="transition-transform group-hover:translate-x-0.5" />
                </Link>
                <Link
                  href="/como-funciona"
                  className="inline-flex items-center gap-1.5 rounded-lg px-4 py-2.5 text-sm font-medium text-foreground hover:bg-secondary transition-colors"
                >
                  Como funciona
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-16 lg:mt-20">
            <GardenIllustration />

            <dl className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-x-8 gap-y-5 max-w-3xl">
              {HERO_STATS.map((s, i) => (
                <div key={s.label} className={i > 0 ? "sm:border-l sm:border-border sm:pl-6" : ""}>
                  <dt className="font-display text-3xl font-medium text-foreground marker-num tabular">
                    {s.value}
                  </dt>
                  <dd className="mt-0.5 text-xs text-muted-foreground">{s.label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* O que é — short explainer */}
      <section className="py-20 md:py-28 border-t border-border">
        <div className="mx-auto max-w-4xl px-5 sm:px-6">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-sage font-semibold">
              O que é
            </p>
            <div className="mt-5 space-y-5 text-lg sm:text-xl text-foreground leading-relaxed text-pretty font-display">
              <p>
                DaisyFlower é um bot de Discord onde você cuida de um jardim virtual. Plante
                sementes, acompanhe o crescimento, regue quando precisar e colha flores bonitas.
              </p>
              <p className="text-muted-foreground">
                Tudo acontece em painéis interativos com botões — não precisa decorar comandos.
                E o melhor: suas plantas continuam crescendo mesmo com o Discord fechado.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Feature cards — link to inner pages */}
      <section className="py-20 md:py-28 border-t border-border">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <Reveal>
            <h2 className="font-display text-3xl sm:text-4xl font-medium tracking-tight text-foreground text-balance">
              Explore por aí
            </h2>
            <p className="mt-3 text-base text-muted-foreground text-pretty max-w-xl">
              Cada página tem só o que precisa — sem enrolação.
            </p>
          </Reveal>

          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {FEATURE_CARDS.map((card, i) => (
              <Reveal key={card.href} delay={i * 0.06}>
                <Link
                  href={card.href}
                  className="group block card-hairline card-hairline-hover rounded-xl p-6 h-full"
                >
                  <div className="text-3xl mb-4">{card.emoji}</div>
                  <h3 className="font-display text-lg font-medium text-foreground">{card.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground text-pretty leading-relaxed flex-1">
                    {card.description}
                  </p>
                  <p className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-sage">
                    {card.cta}
                    <ArrowUpRightIcon size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 md:py-28 border-t border-border bg-background">
        <div className="mx-auto max-w-3xl px-5 sm:px-6 text-center">
          <Reveal>
            <h2 className="font-display text-3xl sm:text-5xl font-medium tracking-tight text-foreground text-balance leading-[1.05]">
              Pronto para plantar{" "}
              <em className="font-normal text-sage">sua primeira semente?</em>
            </h2>
            <p className="mt-5 text-base text-muted-foreground text-pretty">
              Leva 30 segundos. Sem cadastro, sem download. Adicione o bot e digite /start.
            </p>
            <Link
              href="/comecar"
              className="group mt-8 inline-flex items-center gap-2 rounded-lg bg-foreground text-background px-6 py-3 text-sm font-medium hover:bg-foreground/90 transition-colors"
            >
              Começar agora
              <ArrowRightIcon size={16} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Reveal>
        </div>
      </section>

      <AuthModal open={authOpen} onOpenChange={setAuthOpen} onAuthenticated={signIn} />
    </>
  );
}

const FEATURE_CARDS = [
  {
    emoji: "🌱",
    title: "Como funciona",
    description: "Três passos: plantar, deixar crescer, colher. Veja exatamente como é jogar no Discord.",
    cta: "Ver o guia",
    href: "/como-funciona",
  },
  {
    emoji: "🌻",
    title: "Plantas e clima",
    description: "Girassóis, rosas, mutações raras. Cada planta tem seu jeito. Cada clima muda tudo.",
    cta: "Ver plantas",
    href: "/plantas",
  },
  {
    emoji: "📊",
    title: "Seu painel",
    description: "Conecte com Discord e veja seu jardim no navegador — plantas, carteira, missões e coleção.",
    cta: "Ver painel",
    href: "/painel",
  },
];

function GardenIllustration() {
  return (
    <div className="relative w-full overflow-hidden rounded-xl border border-border bg-card">
      <div
        className="absolute inset-0 opacity-50"
        style={{
          background:
            "linear-gradient(to bottom, oklch(0.96 0.015 95) 0%, oklch(0.985 0.006 75) 60%)",
        }}
        aria-hidden
      />

      <svg
        viewBox="0 0 800 280"
        className="relative w-full h-auto block"
        preserveAspectRatio="xMidYMid meet"
        aria-label="Ilustração de um jardim com girassóis e rosas em diferentes estágios"
      >
        <circle cx="700" cy="55" r="22" fill="oklch(0.8 0.1 85)" opacity="0.7" />
        <circle cx="700" cy="55" r="14" fill="oklch(0.82 0.12 85)" />
        <path d="M0 200 L800 200 L800 280 L0 280 Z" fill="oklch(0.42 0.04 50)" opacity="0.85" />
        <path
          d="M0 200 Q 200 196 400 200 T 800 200"
          stroke="oklch(0.3 0.04 50)"
          strokeWidth="1.5"
          fill="none"
          opacity="0.4"
        />
        <g fill="oklch(0.3 0.04 50)" opacity="0.35">
          <circle cx="120" cy="225" r="1.5" />
          <circle cx="280" cy="240" r="1" />
          <circle cx="450" cy="218" r="1.5" />
          <circle cx="620" cy="245" r="1" />
          <circle cx="180" cy="255" r="1" />
          <circle cx="540" cy="228" r="1.2" />
          <circle cx="350" cy="260" r="1" />
        </g>

        {/* Plant 1 — Sunflower growing */}
        <g transform="translate(110, 200)">
          <path d="M0 0 L0 -55" stroke="oklch(0.46 0.06 145)" strokeWidth="2.5" strokeLinecap="round" />
          <ellipse cx="-8" cy="-30" rx="9" ry="4" fill="oklch(0.5 0.07 145)" transform="rotate(-30 -8 -30)" />
          <ellipse cx="8" cy="-20" rx="9" ry="4" fill="oklch(0.5 0.07 145)" transform="rotate(30 8 -20)" />
          <circle cx="0" cy="-55" r="6" fill="oklch(0.55 0.08 145)" />
        </g>

        {/* Plant 2 — Sunflower mature */}
        <g transform="translate(250, 200)">
          <path d="M0 0 L0 -95" stroke="oklch(0.42 0.06 145)" strokeWidth="3" strokeLinecap="round" />
          <ellipse cx="-12" cy="-50" rx="14" ry="6" fill="oklch(0.46 0.07 145)" transform="rotate(-35 -12 -50)" />
          <ellipse cx="12" cy="-35" rx="14" ry="6" fill="oklch(0.46 0.07 145)" transform="rotate(35 12 -35)" />
          <g transform="translate(0, -95)">
            {Array.from({ length: 10 }).map((_, i) => {
              const a = (i / 10) * Math.PI * 2;
              return (
                <ellipse
                  key={i}
                  cx={Math.cos(a) * 13}
                  cy={Math.sin(a) * 13}
                  rx="6"
                  ry="11"
                  fill="oklch(0.82 0.12 85)"
                  transform={`rotate(${(a * 180) / Math.PI} ${Math.cos(a) * 13} ${Math.sin(a) * 13})`}
                />
              );
            })}
            <circle cx="0" cy="0" r="8" fill="oklch(0.55 0.1 65)" />
            <circle cx="0" cy="0" r="5" fill="oklch(0.45 0.1 60)" />
          </g>
        </g>

        {/* Plant 3 — Rose bush growing */}
        <g transform="translate(400, 200)">
          <path d="M0 0 L0 -70" stroke="oklch(0.42 0.06 145)" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M0 -40 L-15 -55" stroke="oklch(0.42 0.06 145)" strokeWidth="2" strokeLinecap="round" />
          <path d="M0 -30 L15 -45" stroke="oklch(0.42 0.06 145)" strokeWidth="2" strokeLinecap="round" />
          <ellipse cx="-15" cy="-55" rx="6" ry="3" fill="oklch(0.5 0.07 145)" transform="rotate(-40 -15 -55)" />
          <ellipse cx="15" cy="-45" rx="6" ry="3" fill="oklch(0.5 0.07 145)" transform="rotate(40 15 -45)" />
          <circle cx="0" cy="-70" r="7" fill="oklch(0.62 0.16 15)" />
          <path d="M-4 -73 Q 0 -78 4 -73" stroke="oklch(0.52 0.16 15)" strokeWidth="1.5" fill="none" />
        </g>

        {/* Plant 4 — White Rose mature */}
        <g transform="translate(550, 200)">
          <path d="M0 0 L0 -85" stroke="oklch(0.42 0.06 145)" strokeWidth="3" strokeLinecap="round" />
          <path d="M0 -45 L-18 -60" stroke="oklch(0.42 0.06 145)" strokeWidth="2" strokeLinecap="round" />
          <path d="M0 -35 L18 -50" stroke="oklch(0.42 0.06 145)" strokeWidth="2" strokeLinecap="round" />
          <ellipse cx="-18" cy="-60" rx="8" ry="4" fill="oklch(0.5 0.05 140)" transform="rotate(-40 -18 -60)" />
          <ellipse cx="18" cy="-50" rx="8" ry="4" fill="oklch(0.5 0.05 140)" transform="rotate(40 18 -50)" />
          <g transform="translate(0, -85)">
            <circle cx="-5" cy="-3" r="6" fill="oklch(0.94 0.01 75)" />
            <circle cx="5" cy="-3" r="6" fill="oklch(0.94 0.01 75)" />
            <circle cx="0" cy="3" r="6" fill="oklch(0.96 0.008 75)" />
            <circle cx="0" cy="-2" r="5" fill="oklch(0.98 0.005 75)" />
            <circle cx="0" cy="-2" r="2" fill="oklch(0.85 0.04 85)" opacity="0.5" />
          </g>
        </g>

        {/* Plant 5 — empty */}
        <g transform="translate(690, 200)" opacity="0.5">
          <ellipse cx="0" cy="0" rx="14" ry="4" fill="oklch(0.38 0.04 50)" />
          <text x="0" y="-10" textAnchor="middle" fontSize="11" fill="oklch(0.48 0.012 75)" fontFamily="monospace">
            vazio
          </text>
        </g>

        <g transform="translate(40, 40)">
          <text x="0" y="0" fontSize="10" fill="oklch(0.48 0.012 75)" fontFamily="monospace" letterSpacing="1">
            AGORA
          </text>
          <text x="0" y="18" fontSize="14" fill="oklch(0.21 0.012 75)" fontFamily="serif" fontWeight="600">
            ☀ Ensolarado
          </text>
          <text x="0" y="34" fontSize="10" fill="oklch(0.48 0.012 75)" fontFamily="monospace">
            crescendo 50% mais rápido
          </text>
        </g>
      </svg>

      <div className="relative flex items-center justify-between px-5 py-3 border-t border-border bg-background/50">
        <p className="font-mono text-[11px] text-muted-foreground">
          4 plantas · 2 prontas para colher
        </p>
        <p className="font-mono text-[11px] text-sage flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-sage animate-pulse-dot" />
          crescendo agora
        </p>
      </div>
    </div>
  );
}
