"use client";

import Link from "next/link";
import { AppPageHeader } from "@/components/layout/AppPageHeader";
import { Reveal } from "@/components/utils/Reveal";
import { useI18n } from "@/components/providers/I18nProvider";
import { useAuth } from "@/hooks/use-auth";
import { DaisyMark, ArrowRightIcon, LockIcon } from "@/components/icons";
import { CountUp, AnimatedProgress, CardHover } from "@/components/utils/Animations";
import { cn } from "@/lib/utils";

export default function ProfilePage() {
  const { t } = useI18n();
  const { player, hydrated } = useAuth();

  return (
    <>
      <AppPageHeader
        
        eyebrow={t.profile.eyebrow}
        title={
          <>
            {t.profile.title}{" "}
            <em className="font-normal text-sage">{t.profile.highlight}</em>
          </>
        }
        description={t.profile.description}
      />

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-5xl px-5 sm:px-6 space-y-6">
          {/* Player card */}
          <Reveal>
            <PlayerCard player={player} hydrated={hydrated} />
          </Reveal>

          {/* Stats grid */}
          <Reveal delay={0.05}>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              <StatCard label={t.profile.stats.level} value={7} />
              <StatCard label={t.profile.stats.gardensPlanted} value={12} />
              <StatCard label={t.profile.stats.flowersHarvested} value={147} />
              <StatCard label={t.profile.stats.mutationsFound} value={3} />
              <StatCard label={t.profile.stats.streak} value={4} />
            </div>
          </Reveal>

          {/* Badges */}
          <Reveal delay={0.1}>
            <div className="card-hairline rounded-xl p-6">
              <div className="flex items-baseline justify-between mb-5">
                <div>
                  <h3 className="font-display text-lg font-medium text-foreground">
                    {t.profile.badges.title}
                  </h3>
                  <p className="mt-0.5 text-sm text-muted-foreground">{t.profile.badges.subtitle}</p>
                </div>
                <span className="font-mono text-xs text-muted-foreground">
                  {t.profile.badges.items.filter((b) => b.earned).length} / {t.profile.badges.items.length}
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {t.profile.badges.items.map((badge, i) => (
                  <div
                    key={i}
                    className={cn(
                      "rounded-lg border p-4 text-center transition-colors",
                      badge.earned
                        ? "border-border bg-background hover:bg-secondary/30"
                        : "border-dashed border-border bg-background/30 opacity-50"
                    )}
                  >
                    <div className={cn("text-2xl mb-2", !badge.earned && "grayscale opacity-40")}>
                      {badge.earned ? badge.emoji : "🔒"}
                    </div>
                    <p className={cn("text-xs font-medium", badge.earned ? "text-foreground" : "text-muted-foreground")}>
                      {badge.name}
                    </p>
                    <p className="mt-1 text-[10px] text-muted-foreground text-pretty leading-tight">
                      {badge.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Favorite plant + Recent achievements */}
          <div className="grid sm:grid-cols-2 gap-6">
            {/* Favorite plant */}
            <Reveal delay={0.15}>
              <div className="card-hairline rounded-xl p-6 h-full">
                <h3 className="font-display text-lg font-medium text-foreground">
                  {t.profile.favoritePlant.title}
                </h3>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  {t.profile.favoritePlant.subtitle}
                </p>
                <div className="mt-5 rounded-lg border border-terra/20 bg-terra/[0.04] p-6 text-center">
                  <div className="text-5xl">🌸</div>
                  <p className="mt-3 font-display text-lg font-medium text-foreground">Pink Rose</p>
                  <p className="text-xs text-terra-deep font-medium mt-0.5">RARE · Mutation</p>
                </div>
              </div>
            </Reveal>

            {/* Recent achievements */}
            <Reveal delay={0.2}>
              <div className="card-hairline rounded-xl p-6 h-full">
                <h3 className="font-display text-lg font-medium text-foreground">
                  {t.profile.recentAchievements.title}
                </h3>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  {t.profile.recentAchievements.subtitle}
                </p>
                <ul className="mt-5 space-y-3">
                  {t.profile.recentAchievements.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <span className="grid place-items-center h-9 w-9 rounded-full bg-sage/10 text-lg shrink-0">
                        {item.emoji}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground">{item.name}</p>
                        <p className="font-mono text-[10px] text-muted-foreground">{item.time}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          {/* CTA */}
          <Reveal delay={0.25}>
            <div className="text-center pt-4">
              <Link
                href="/panel"
                className="group inline-flex items-center gap-2 rounded-lg bg-foreground text-background px-5 py-2.5 text-sm font-medium hover:bg-foreground/90 transition-colors"
              >
                {t.userMenu.myPanel}
                <ArrowRightIcon size={15} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function PlayerCard({
  player,
  hydrated,
}: {
  player: { username: string; level: number } | null;
  hydrated: boolean;
}) {
  const { t } = useI18n();

  if (!hydrated || !player) {
    return (
      <div className="card-hairline rounded-2xl p-8 text-center">
        <span className="grid place-items-center h-12 w-12 rounded-full border border-border mx-auto">
          <LockIcon size={20} className="text-muted-foreground" />
        </span>
        <p className="mt-4 text-sm text-muted-foreground">
          {t.profile.favoritePlant.empty}
        </p>
      </div>
    );
  }

  return (
    <div className="card-hairline rounded-2xl overflow-hidden">
      {/* Banner */}
      <div className="h-24 bg-gradient-to-br from-sage/20 via-terra/10 to-gold/15 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, oklch(0.46 0.06 145 / 0.15), transparent 50%), radial-gradient(circle at 80% 50%, oklch(0.68 0.1 45 / 0.1), transparent 50%)",
          }}
          aria-hidden
        />
      </div>

      {/* Avatar + info */}
      <div className="px-6 pb-6 -mt-10">
        <div className="flex items-end gap-4">
          <span className="grid place-items-center h-20 w-20 rounded-2xl bg-card border-4 border-card shadow-sm text-3xl shrink-0">
            <DaisyMark size={40} className="text-terra" />
          </span>
          <div className="pb-1">
            <h3 className="font-display text-2xl font-medium text-foreground">
              @{player.username}
            </h3>
            <p className="text-sm text-muted-foreground">
              {t.userMenu.level} {player.level} · Gardener
            </p>
          </div>
        </div>

        {/* XP bar */}
        <div className="mt-5">
          <div className="flex items-baseline justify-between mb-1.5">
            <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              {t.profile.stats.level} {player.level}
            </span>
            <span className="font-mono text-xs text-muted-foreground tabular">
              <CountUp value={2140} duration={1.5} /> / 3,000 XP
            </span>
          </div>
          <AnimatedProgress
            value={71}
            delay={0.3}
            barClassName="bg-gradient-to-r from-sage to-sage-deep"
          />
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="card-hairline rounded-xl p-4 text-center">
      <p className="font-display text-2xl font-medium text-foreground marker-num tabular">
        <CountUp value={value} duration={1.2} />
      </p>
      <p className="mt-1 text-[10px] text-muted-foreground text-pretty leading-tight">{label}</p>
    </div>
  );
}
