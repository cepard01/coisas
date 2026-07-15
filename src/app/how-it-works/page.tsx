"use client";

import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { Reveal } from "@/components/utils/Reveal";
import { useI18n } from "@/components/providers/I18nProvider";
import { ArrowRightIcon } from "@/components/icons";
import { cn } from "@/lib/utils";
import { Breadcrumb } from "@/components/layout/Breadcrumb";

export default function HowItWorksPage() {
  const { t } = useI18n();

  return (
    <>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: t.nav.howItWorks },
        ]}
      />
      <PageHeader
        number={t.howItWorks.number}
        eyebrow={t.howItWorks.eyebrow}
        title={
          <>
            {t.howItWorks.title}{" "}
            <em className="font-normal text-sage">{t.howItWorks.highlight}</em>
          </>
        }
        description={t.howItWorks.description}
      />

      {/* Steps */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <div className="grid lg:grid-cols-3 gap-6">
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
        </div>
      </section>

      {/* Discord mockup */}
      <section className="py-16 md:py-24 border-t border-border">
        <div className="mx-auto max-w-4xl px-5 sm:px-6">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-sage font-semibold mb-4">
              {t.howItWorks.discordMockup.eyebrow}
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-medium text-foreground mb-8 text-balance">
              {t.howItWorks.discordMockup.title}
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
              {t.howItWorks.weather.eyebrow}
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-medium text-foreground mb-3 text-balance">
              {t.howItWorks.weather.title}
            </h2>
            <p className="text-base text-muted-foreground text-pretty max-w-2xl mb-10">
              {t.howItWorks.weather.description}
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
              {t.howItWorks.mutations.eyebrow}
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-medium text-foreground mb-5 text-balance">
              {t.howItWorks.mutations.title}
            </h2>
            <p className="text-base text-muted-foreground text-pretty leading-relaxed mb-8 max-w-2xl">
              {t.howItWorks.mutations.description}
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
              {t.finalCta.title}{" "}
              <em className="font-normal text-sage">{t.finalCta.highlight}</em>
            </h2>
            <p className="mt-4 text-base text-muted-foreground text-pretty">
              {t.finalCta.description}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/plants"
                className="group inline-flex items-center gap-2 rounded-lg bg-foreground text-background px-5 py-2.5 text-sm font-medium hover:bg-foreground/90 transition-colors"
              >
                {t.explore.cards[1].cta}
                <ArrowRightIcon size={15} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/get-started"
                className="inline-flex items-center gap-1.5 rounded-lg px-4 py-2.5 text-sm font-medium text-foreground hover:bg-secondary transition-colors"
              >
                {t.nav.getStarted}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function DiscordMockup() {
  const { t } = useI18n();
  const m = t.howItWorks.discordMockup;
  return (
    <div className="rounded-xl border border-border overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-2.5 bg-ink text-paper/70">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-terra/60" />
          <span className="h-2.5 w-2.5 rounded-full bg-gold/60" />
          <span className="h-2.5 w-2.5 rounded-full bg-sage/60" />
        </div>
        <span className="ml-2 font-mono text-[11px]">{m.channelName}</span>
        <span className="ml-auto font-mono text-[11px] opacity-60">Discord</span>
      </div>

      <div className="p-4 sm:p-6 bg-ink text-paper space-y-4">
        <div className="flex items-start gap-3">
          <span className="grid place-items-center h-9 w-9 rounded-full bg-sage/30 text-sm shrink-0">🌻</span>
          <div>
            <p className="text-xs text-paper/50">
              <span className="font-medium text-paper">{m.youName}</span> · {m.now}
            </p>
            <p className="font-mono text-sm text-gold">/garden</p>
          </div>
        </div>

        <div className="rounded-lg bg-[oklch(0.22 0.01 150)] border border-white/5 overflow-hidden">
          <div className="flex items-center gap-2.5 px-4 py-3 border-b border-white/5">
            <DaisyMarkMini />
            <div>
              <p className="text-sm font-semibold text-paper">DaisyFlower</p>
              <p className="text-[10px] text-paper/50 font-mono">app · {m.now}</p>
            </div>
            <span className="ml-auto text-[11px] text-gold bg-gold/10 px-2 py-0.5 rounded">{t.howItWorks.weather.items[0].emoji} {t.howItWorks.weather.items[0].name}</span>
          </div>

          <div className="p-4">
            <p className="text-sm text-paper font-medium mb-3">{m.gardenTitle}</p>
            <p className="text-xs text-paper/60 mb-3">{m.gardenSubtitle}</p>

            <div className="grid grid-cols-3 gap-2 mb-3">
              {m.slots.map((slot, i) => (
                <div
                  key={i}
                  className={cn(
                    "rounded p-2 text-center",
                    slot.ready
                      ? "bg-sage/15 border border-sage/30"
                      : "bg-black/20"
                  )}
                >
                  <div className="text-lg">{slot.emoji}</div>
                  <p className={cn(
                    "text-[10px] mt-0.5",
                    slot.ready ? "text-sage font-medium" : "text-paper/60"
                  )}>{slot.status}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-1.5">
              <span className="rounded bg-sage text-white px-2.5 py-1 text-[11px] font-medium">{m.buttons.plant}</span>
              <span className="rounded bg-white/10 text-paper px-2.5 py-1 text-[11px]">{m.buttons.harvest}</span>
              <span className="rounded bg-white/10 text-paper px-2.5 py-1 text-[11px]">{m.buttons.water}</span>
              <span className="rounded bg-white/10 text-paper px-2.5 py-1 text-[11px]">{m.buttons.shop}</span>
            </div>

            <p className="mt-3 text-[11px] text-gold bg-gold/10 rounded px-2 py-1.5">{m.tip}</p>
          </div>
        </div>
      </div>

      <div className="px-4 py-3 bg-[oklch(0.16 0.008 150)] border-t border-white/5">
        <p className="text-xs text-paper/40 font-mono">{m.inputPlaceholder}</p>
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
  const { t } = useI18n();
  const WEATHER_COLOR = {
    sun: "from-gold/15",
    sky: "from-sky-soft/20",
    terra: "from-terra-deep/12",
    snow: "from-sky-soft/12",
  } as const;
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
      {t.howItWorks.weather.items.map((w, i) => {
        const colorKey = ["sun", "sky", "terra", "snow"][i] as keyof typeof WEATHER_COLOR;
        return (
          <Reveal key={i} delay={i * 0.05}>
            <div className={`card-hairline rounded-xl overflow-hidden bg-gradient-to-br ${WEATHER_COLOR[colorKey]} to-transparent`}>
              <div className="p-5">
                <div className="text-3xl mb-3">{w.emoji}</div>
                <h4 className="font-display text-base font-medium text-foreground">{w.name}</h4>
                <p className="mt-1.5 text-sm text-foreground/90">{w.effect}</p>
                <p className="mt-1 text-xs text-muted-foreground text-pretty">{w.advice}</p>
              </div>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}

function MutationDiagram() {
  const { t } = useI18n();
  const m = t.howItWorks.mutations;
  return (
    <div className="rounded-xl border border-border bg-card p-6 sm:p-8">
      <div className="flex items-baseline justify-between mb-6">
        <p className="font-mono text-[11px] text-muted-foreground">{m.label}</p>
        <span className="font-mono text-[11px] text-terra">{m.chance}</span>
      </div>

      <div className="flex items-center justify-center gap-4 sm:gap-8 py-4">
        <div className="flex flex-col items-center gap-2">
          <span className="grid place-items-center h-16 w-16 rounded-2xl bg-terra/10 text-3xl border border-border">🌹</span>
          <span className="text-[11px] text-muted-foreground">{m.inputs[0]}</span>
        </div>
        <span className="font-display text-2xl text-muted-foreground">+</span>
        <div className="flex flex-col items-center gap-2">
          <span className="grid place-items-center h-16 w-16 rounded-2xl bg-sage/10 text-3xl border border-border">🤍</span>
          <span className="text-[11px] text-muted-foreground">{m.inputs[1]}</span>
        </div>
        <span className="font-display text-2xl text-muted-foreground">→</span>
        <div className="flex flex-col items-center gap-2">
          <span className="grid place-items-center h-16 w-16 rounded-2xl bg-gradient-to-br from-terra/15 to-gold/15 text-3xl border border-terra/30 animate-float-soft">🌸</span>
          <span className="text-[11px] font-semibold text-terra-deep">{m.output}</span>
        </div>
      </div>

      <div className="mt-6 rounded-lg bg-sage/[0.06] border border-sage/20 px-4 py-3">
        <p className="text-sm text-foreground text-pretty">{m.hint}</p>
      </div>
    </div>
  );
}
