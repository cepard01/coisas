"use client";

import { useState } from "react";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";
import { useI18n } from "@/hooks/use-i18n";
import { cn } from "@/lib/utils";
import { Breadcrumb } from "@/components/site/Breadcrumb";

type SortTab = "level" | "collection" | "mutations";

export default function LeaderboardPage() {
  const { t } = useI18n();
  const lb = t.leaderboard;
  const [tab, setTab] = useState<SortTab>("level");

  const tabs: { id: SortTab; label: string }[] = [
    { id: "level", label: lb.tabs.level },
    { id: "collection", label: lb.tabs.collection },
    { id: "mutations", label: lb.tabs.mutations },
  ];

  const rankStyles = [
    "text-gold-deep font-bold",
    "text-muted-foreground font-bold",
    "text-terra-deep font-bold",
  ];

  return (
    <>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Leaderboard" },
        ]}
      />
      <PageHeader
        number={lb.number}
        eyebrow={lb.eyebrow}
        title={
          <>
            {lb.title}{" "}
            <em className="font-normal text-sage">{lb.highlight}</em>
          </>
        }
        description={lb.description}
      />

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-5 sm:px-6">
          {/* Tabs */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {tabs.map((tb) => (
              <button
                key={tb.id}
                onClick={() => setTab(tb.id)}
                className={cn(
                  "rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all",
                  tab === tb.id
                    ? "border-foreground bg-foreground text-background"
                    : "border-border bg-card text-muted-foreground hover:text-foreground hover:border-foreground/30"
                )}
              >
                {tb.label}
              </button>
            ))}
          </div>

          {/* Table */}
          <div className="rounded-2xl border border-border overflow-hidden bg-card">
            {/* Header */}
            <div className="grid grid-cols-[50px_1fr_100px_80px] gap-3 px-5 py-3 border-b border-border bg-secondary/30 text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
              <span>{lb.rank}</span>
              <span>{lb.player}</span>
              <span className="text-right">{lb.score}</span>
              <span className="text-right">Lvl</span>
            </div>

            {/* Rows */}
            <div className="divide-y divide-border">
              {lb.entries.map((entry, i) => (
                <Reveal key={i} delay={Math.min(i * 0.03, 0.15)}>
                  <div
                    className={cn(
                      "grid grid-cols-[50px_1fr_100px_80px] gap-3 px-5 py-3.5 items-center transition-colors",
                      entry.you ? "bg-sage/[0.06]" : "hover:bg-secondary/20"
                    )}
                  >
                    <span className={cn("font-display text-lg", rankStyles[entry.rank - 1] ?? "text-muted-foreground")}>
                      {entry.rank}
                    </span>
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="grid place-items-center h-8 w-8 rounded-full bg-secondary text-base shrink-0">
                        {entry.avatar}
                      </span>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">
                          @{entry.name}
                          {entry.you && (
                            <span className="ml-2 inline-flex items-center rounded-full bg-sage/15 px-1.5 py-0.5 text-[9px] font-bold uppercase text-sage">
                              You
                            </span>
                          )}
                        </p>
                      </div>
                    </div>
                    <span className="text-right font-mono text-xs text-muted-foreground tabular">
                      {entry.score}
                    </span>
                    <span className="text-right font-mono text-sm font-medium text-foreground tabular">
                      {entry.level}
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Privacy note */}
          <Reveal delay={0.2}>
            <p className="mt-6 text-center text-xs text-muted-foreground text-pretty">
              {lb.privacyNote}
            </p>
          </Reveal>

          {/* Your rank highlight */}
          <Reveal delay={0.25}>
            <div className="mt-6 rounded-xl border border-sage/20 bg-sage/[0.04] p-5 text-center">
              <p className="font-mono text-[10px] uppercase tracking-wider text-sage font-semibold">
                {lb.yourRank}
              </p>
              <p className="mt-1 font-display text-3xl font-medium text-foreground marker-num">
                #6
              </p>
              <p className="mt-1 text-xs text-muted-foreground">2,140 XP · Level 7</p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
