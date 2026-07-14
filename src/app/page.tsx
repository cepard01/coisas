"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useI18n } from "@/hooks/use-i18n";
import { AuthModal } from "@/components/site/AuthModal";
import { Reveal } from "@/components/site/Reveal";
import { ClientOnly } from "@/components/site/ClientOnly";
import { FEATURE_VISUALS } from "@/components/site/FeatureVisuals";
import { ArrowRightIcon, ArrowUpRightIcon } from "@/components/site/icons";

export default function Home() {
  const { signIn } = useAuth();
  const { t } = useI18n();
  const [authOpen, setAuthOpen] = useState(false);

  return (
    <>
      {/* Hero */}
      <section id="top" className="relative pt-32 pb-20 md:pt-40 md:pb-24 overflow-hidden">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-sage">
              {t.hero.badge}
            </span>
            <span className="h-px w-10 bg-border" />
            <span className="text-xs">{t.hero.badgeSub}</span>
          </div>

          <h1 className="mt-7 font-display text-[2.75rem] sm:text-7xl lg:text-[5.5rem] xl:text-[6rem] font-medium tracking-tight leading-[0.95] text-balance max-w-5xl">
            {t.hero.titleLine1}{" "}
            <span className="italic font-normal text-sage">{t.hero.titleHighlight}</span>
            <br className="hidden sm:block" /> {t.hero.titleLine2}
          </h1>

          <div className="mt-10 grid sm:grid-cols-2 gap-8 sm:gap-12 items-start">
            <div className="sm:col-start-2">
              <p className="text-base lg:text-lg text-muted-foreground text-pretty leading-relaxed max-w-md">
                {t.hero.subtitle}
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link
                  href="/get-started"
                  className="group inline-flex items-center gap-2 rounded-lg bg-foreground text-background px-5 py-2.5 text-sm font-medium hover:bg-foreground/90 transition-colors"
                >
                  {t.hero.ctaPrimary}
                  <ArrowRightIcon size={15} className="transition-transform group-hover:translate-x-0.5" />
                </Link>
                <Link
                  href="/how-it-works"
                  className="inline-flex items-center gap-1.5 rounded-lg px-4 py-2.5 text-sm font-medium text-foreground hover:bg-secondary transition-colors"
                >
                  {t.hero.ctaSecondary}
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-16 lg:mt-20">
            <ClientOnly fallback={<IllustrationFallback />}>
              <GardenIllustration />
            </ClientOnly>

            <dl className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-x-8 gap-y-5 max-w-3xl">
              {t.hero.stats.map((s, i) => (
                <div key={i} className={i > 0 ? "sm:border-l sm:border-border sm:pl-6" : ""}>
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

      {/* What it is — short explainer */}
      <section className="py-20 md:py-28 border-t border-border">
        <div className="mx-auto max-w-4xl px-5 sm:px-6">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-sage font-semibold">
              {t.whatIs.eyebrow}
            </p>
            <div className="mt-5 space-y-5 text-lg sm:text-xl text-foreground leading-relaxed text-pretty font-display">
              <p>{t.whatIs.body1}</p>
              <p className="text-muted-foreground">{t.whatIs.body2}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Features — rich grid */}
      <FeaturesSection />

      {/* How it works preview */}
      <HowItWorksPreview />

      {/* Plant gallery preview */}
      <PlantPreview />

      {/* Progression */}
      <ProgressionSection />

      {/* Economy */}
      <EconomySection />

      {/* Explore cards */}
      <section className="py-20 md:py-28 border-t border-border">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <Reveal>
            <h2 className="font-display text-3xl sm:text-4xl font-medium tracking-tight text-foreground text-balance">
              {t.explore.title}
            </h2>
            <p className="mt-3 text-base text-muted-foreground text-pretty max-w-xl">
              {t.explore.subtitle}
            </p>
          </Reveal>

          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {t.explore.cards.map((card, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <Link
                  href={["/how-it-works", "/plants", "/panel", "/commands", "/#progression", "/faq"][i]}
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
              {t.finalCta.title}{" "}
              <em className="font-normal text-sage">{t.finalCta.highlight}</em>
            </h2>
            <p className="mt-5 text-base text-muted-foreground text-pretty">
              {t.finalCta.description}
            </p>
            <Link
              href="/get-started"
              className="group mt-8 inline-flex items-center gap-2 rounded-lg bg-foreground text-background px-6 py-3 text-sm font-medium hover:bg-foreground/90 transition-colors"
            >
              {t.finalCta.button}
              <ArrowRightIcon size={16} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Reveal>
        </div>
      </section>

      <AuthModal open={authOpen} onOpenChange={setAuthOpen} onAuthenticated={signIn} />
    </>
  );
}

/* ── Features section (rich, 6 cards) ───────────────────────────────── */

function FeaturesSection() {
  const { t } = useI18n();
  return (
    <section className="py-20 md:py-28 border-t border-border">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <Reveal>
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 text-muted-foreground">
              <span className="font-mono text-xs marker-num">{t.features.number}</span>
              <span className="h-px w-8 bg-border" />
              <span className="font-mono text-xs uppercase tracking-[0.18em] text-sage font-semibold">
                {t.features.eyebrow}
              </span>
            </div>
            <h2 className="mt-5 font-display text-4xl sm:text-5xl lg:text-[3.5rem] font-medium tracking-tight text-foreground text-balance leading-[1.05]">
              {t.features.title}{" "}
              <em className="font-normal text-sage">{t.features.highlight}</em>
            </h2>
            <p className="mt-5 text-base sm:text-lg text-muted-foreground text-pretty leading-relaxed max-w-2xl">
              {t.features.description}
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border rounded-2xl overflow-hidden border border-border">
          {t.features.items.map((item, i) => {
            const Visual = FEATURE_VISUALS[i] ?? (() => null);
            return (
              <Reveal key={i} delay={Math.min(i * 0.04, 0.2)}>
                <div className="bg-card p-5 sm:p-6 group hover:bg-secondary/30 transition-colors h-full">
                  <p className="font-mono text-[10px] uppercase tracking-wider text-sage font-semibold">
                    {item.eyebrow}
                  </p>
                  <h3 className="mt-2 font-display text-lg font-medium text-foreground leading-tight">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground text-pretty leading-relaxed">
                    {item.body}
                  </p>
                  <ClientOnly>
                    <Visual />
                  </ClientOnly>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── How it works preview (3 steps + mini mockup) ───────────────────── */

function HowItWorksPreview() {
  const { t } = useI18n();
  return (
    <section className="py-20 md:py-28 border-t border-border bg-background">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <Reveal>
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 text-muted-foreground">
              <span className="font-mono text-xs marker-num">{t.howItWorks.number}</span>
              <span className="h-px w-8 bg-border" />
              <span className="font-mono text-xs uppercase tracking-[0.18em] text-sage font-semibold">
                {t.howItWorks.eyebrow}
              </span>
            </div>
            <h2 className="mt-5 font-display text-4xl sm:text-5xl lg:text-[3.5rem] font-medium tracking-tight text-foreground text-balance leading-[1.05]">
              {t.howItWorks.title}{" "}
              <em className="font-normal text-sage">{t.howItWorks.highlight}</em>
            </h2>
            <p className="mt-5 text-base sm:text-lg text-muted-foreground text-pretty leading-relaxed max-w-2xl">
              {t.howItWorks.description}
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid lg:grid-cols-3 gap-6">
          {t.howItWorks.steps.map((step, i) => (
            <Reveal key={i} delay={i * 0.08} className="flex flex-col">
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

        <Reveal delay={0.2}>
          <div className="mt-10 text-center">
            <Link
              href="/how-it-works"
              className="group inline-flex items-center gap-1.5 text-sm font-medium text-sage hover:underline"
            >
              {t.explore.cards[0].cta}
              <ArrowRightIcon size={14} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── Plant gallery preview (3 cards) ────────────────────────────────── */

function PlantPreview() {
  const { t } = useI18n();
  const preview = t.plants.items.slice(0, 3);

  const COLOR_BG = {
    sun: "from-gold/10",
    rose: "from-terra/10",
    sky: "from-sky-soft/15",
    terra: "from-terra-deep/8",
    gold: "from-gold/12",
  } as const;

  return (
    <section className="py-20 md:py-28 border-t border-border">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <Reveal>
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 text-muted-foreground">
              <span className="font-mono text-xs marker-num">{t.plants.number}</span>
              <span className="h-px w-8 bg-border" />
              <span className="font-mono text-xs uppercase tracking-[0.18em] text-sage font-semibold">
                {t.plants.eyebrow}
              </span>
            </div>
            <h2 className="mt-5 font-display text-4xl sm:text-5xl lg:text-[3.5rem] font-medium tracking-tight text-foreground text-balance leading-[1.05]">
              {t.plants.title}{" "}
              <em className="font-normal text-sage">{t.plants.highlight}</em>
            </h2>
            <p className="mt-5 text-base sm:text-lg text-muted-foreground text-pretty leading-relaxed max-w-2xl">
              {t.plants.description}
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {preview.map((plant, i) => (
            <Reveal key={i} delay={i * 0.06}>
              <div className="card-hairline card-hairline-hover rounded-xl overflow-hidden h-full flex flex-col">
                <div className={`relative h-32 grid place-items-center bg-gradient-to-br ${COLOR_BG[plant.color]} to-transparent`}>
                  <span className="text-5xl">{plant.emoji}</span>
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <h3 className="font-display text-lg font-medium text-foreground">{plant.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground text-pretty flex-1">{plant.description}</p>
                  <div className="mt-3 flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">{t.plants.growsIn}</span>
                    <span className="text-foreground font-medium">{plant.growTime}</span>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="mt-10 text-center">
            <Link
              href="/plants"
              className="group inline-flex items-center gap-1.5 text-sm font-medium text-sage hover:underline"
            >
              {t.explore.cards[1].cta}
              <ArrowRightIcon size={14} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── Progression section (levels and unlocks) ───────────────────────── */

function ProgressionSection() {
  const { t } = useI18n();
  return (
    <section id="progression" className="py-20 md:py-28 border-t border-border bg-background scroll-mt-16">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <Reveal>
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 text-muted-foreground">
              <span className="font-mono text-xs marker-num">{t.progression.number}</span>
              <span className="h-px w-8 bg-border" />
              <span className="font-mono text-xs uppercase tracking-[0.18em] text-sage font-semibold">
                {t.progression.eyebrow}
              </span>
            </div>
            <h2 className="mt-5 font-display text-4xl sm:text-5xl lg:text-[3.5rem] font-medium tracking-tight text-foreground text-balance leading-[1.05]">
              {t.progression.title}{" "}
              <em className="font-normal text-sage">{t.progression.highlight}</em>
            </h2>
            <p className="mt-5 text-base sm:text-lg text-muted-foreground text-pretty leading-relaxed max-w-2xl">
              {t.progression.description}
            </p>
          </div>
        </Reveal>

        <div className="mt-14 relative">
          {/* Vertical line */}
          <div className="absolute left-5 sm:left-1/2 top-0 bottom-0 w-px bg-border sm:-translate-x-1/2" aria-hidden />

          <div className="space-y-6 sm:space-y-0">
            {t.progression.levels.map((lvl, i) => {
              const left = i % 2 === 0;
              return (
                <Reveal key={i} delay={i * 0.05}>
                  <div className={`relative pl-14 sm:pl-0 sm:grid sm:grid-cols-2 sm:gap-8 sm:items-center ${left ? "" : "sm:[direction:rtl]"}`}>
                    {/* Dot */}
                    <div className="absolute left-0 sm:left-1/2 sm:-translate-x-1/2 top-1 z-10">
                      <div className="grid place-items-center h-10 w-10 rounded-full bg-card border-2 border-sage shadow-sm">
                        <span className="text-base">{lvl.emoji}</span>
                      </div>
                    </div>

                    {/* Card */}
                    <div className={`sm:[direction:ltr] ${left ? "sm:pr-8 sm:text-right" : "sm:pl-8"}`}>
                      <div className="card-hairline rounded-xl p-5">
                        <p className="font-mono text-[11px] uppercase tracking-wider text-sage font-semibold">
                          {t.userMenu.level} {lvl.level}
                        </p>
                        <h3 className="mt-1 font-display text-lg font-medium text-foreground">{lvl.title}</h3>
                        <ul className={`mt-3 space-y-1.5 text-sm text-muted-foreground ${left ? "sm:text-right" : ""}`}>
                          {lvl.unlocks.map((u, j) => (
                            <li key={j} className={`flex items-center gap-2 ${left ? "sm:flex-row-reverse" : ""}`}>
                              <span className="text-sage shrink-0">·</span>
                              <span>{u}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Economy section (loop + missions preview) ──────────────────────── */

function EconomySection() {
  const { t } = useI18n();
  const e = t.economy;
  return (
    <section className="py-20 md:py-28 border-t border-border">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <Reveal>
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 text-muted-foreground">
              <span className="font-mono text-xs marker-num">{e.number}</span>
              <span className="h-px w-8 bg-border" />
              <span className="font-mono text-xs uppercase tracking-[0.18em] text-sage font-semibold">
                {e.eyebrow}
              </span>
            </div>
            <h2 className="mt-5 font-display text-4xl sm:text-5xl lg:text-[3.5rem] font-medium tracking-tight text-foreground text-balance leading-[1.05]">
              {e.title}{" "}
              <em className="font-normal text-sage">{e.highlight}</em>
            </h2>
            <p className="mt-5 text-base sm:text-lg text-muted-foreground text-pretty leading-relaxed max-w-2xl">
              {e.description}
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid lg:grid-cols-[1.3fr_1fr] gap-6 items-start">
          {/* Loop diagram */}
          <Reveal delay={0.05}>
            <div className="card-hairline rounded-2xl p-6 sm:p-8">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {e.loop.map((step, i) => (
                  <div key={i} className="relative">
                    {/* Arrow connector */}
                    {i < e.loop.length - 1 && (
                      <span className="hidden sm:block absolute top-6 -right-3 text-muted-foreground/40 font-display text-lg z-10">
                        →
                      </span>
                    )}
                    <div className="text-center">
                      <div className="text-3xl mb-2">{step.emoji}</div>
                      <p className="font-display text-sm font-medium text-foreground">{step.label}</p>
                      <p className="mt-0.5 text-[11px] text-muted-foreground text-pretty">{step.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
              {/* Circular arrow on mobile */}
              <div className="sm:hidden mt-4 text-center text-muted-foreground/40 font-display text-lg">↻</div>
            </div>
          </Reveal>

          {/* Missions preview */}
          <Reveal delay={0.1}>
            <div className="card-hairline rounded-2xl p-6">
              <div className="flex items-baseline justify-between mb-4">
                <div>
                  <p className="font-display text-lg font-medium text-foreground">{e.missions.title}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{e.missions.subtitle}</p>
                </div>
              </div>
              <div className="space-y-3">
                {e.missions.items.map((m, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span
                      className={`grid place-items-center h-7 w-7 rounded-full shrink-0 text-xs ${
                        m.done ? "bg-sage text-white" : "bg-secondary text-muted-foreground"
                      }`}
                    >
                      {m.done ? "✓" : i + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm ${m.done ? "text-muted-foreground line-through" : "text-foreground"}`}>
                        {m.title}
                      </p>
                      <p className="font-mono text-[10px] text-muted-foreground tabular">{m.progress}</p>
                    </div>
                    <span className="text-[11px] text-sage font-medium shrink-0">{m.reward}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ── Garden illustration SVG ────────────────────────────────────────── */

function IllustrationFallback() {
  return (
    <div className="relative w-full overflow-hidden rounded-xl border border-border bg-card h-[280px] sm:h-[350px]" />
  );
}

function GardenIllustration() {
  const { t } = useI18n();
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
        aria-label="Garden illustration with sunflowers and roses at different growth stages"
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
        </g>

        {/* Weather indicator */}
        <g transform="translate(40, 40)">
          <text x="0" y="0" fontSize="10" fill="oklch(0.48 0.012 75)" fontFamily="monospace" letterSpacing="1">
            {t.hero.illustration.now}
          </text>
          <text x="0" y="18" fontSize="14" fill="oklch(0.21 0.012 75)" fontFamily="serif" fontWeight="600">
            {t.hero.illustration.weather}
          </text>
          <text x="0" y="34" fontSize="10" fill="oklch(0.48 0.012 75)" fontFamily="monospace">
            {t.hero.illustration.weatherEffect}
          </text>
        </g>
      </svg>

      <div className="relative flex items-center justify-between px-5 py-3 border-t border-border bg-background/50">
        <p className="font-mono text-[11px] text-muted-foreground">{t.hero.illustration.caption}</p>
        <p className="font-mono text-[11px] text-sage flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-sage animate-pulse-dot" />
          {t.hero.illustration.live}
        </p>
      </div>
    </div>
  );
}
