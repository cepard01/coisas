"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { Reveal } from "@/components/utils/Reveal";
import { useI18n } from "@/components/providers/I18nProvider";
import { cn } from "@/lib/utils";
import { ArrowRightIcon } from "@/components/icons";
import { PlantModal, type PlantDetail } from "@/components/modals/PlantModal";
import { Breadcrumb } from "@/components/layout/Breadcrumb";

type RarityFilter = "all" | "Common" | "Uncommon" | "Rare";

export default function PlantsPage() {
  const { t } = useI18n();
  const [rarity, setRarity] = useState<RarityFilter>("all");
  const [selectedPlant, setSelectedPlant] = useState<PlantDetail | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const RARITY_STYLES: Record<string, string> = {
    Common: "text-muted-foreground",
    Uncommon: "text-sage",
    Rare: "text-terra-deep",
    Epic: "text-gold-deep",
  };

  const COLOR_BG = {
    sun: "from-gold/10",
    rose: "from-terra/10",
    sky: "from-sky-soft/15",
    terra: "from-terra-deep/8",
    gold: "from-gold/12",
  } as const;

  const filtered = useMemo(() => {
    if (rarity === "all") return t.plants.items;
    return t.plants.items.filter((p) => p.rarity === rarity);
  }, [t.plants.items, rarity]);

  const rarityFilters: { id: RarityFilter; label: string }[] = [
    { id: "all", label: "All" },
    { id: "Common", label: t.rarity.Common },
    { id: "Uncommon", label: t.rarity.Uncommon },
    { id: "Rare", label: t.rarity.Rare },
  ];

  const openPlant = (plant: typeof t.plants.items[number]) => {
    setSelectedPlant({
      emoji: plant.emoji,
      name: plant.name,
      rarity: plant.rarity,
      rarityLabel: t.rarity[plant.rarity as keyof typeof t.rarity] ?? plant.rarity,
      growTime: plant.growTime,
      price: plant.price,
      sellPrice: plant.sellPrice,
      description: plant.description,
      tip: plant.tip,
      color: plant.color,
      growsIn: t.plants.growsIn,
      priceLabel: t.plants.price,
      originLabel: t.plants.origin,
      mutationLabel: t.plants.mutation,
      sellsForLabel: t.plants.sellsFor,
    });
    setModalOpen(true);
  };

  return (
    <>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: t.nav.plants },
        ]}
      />
      <PageHeader
        number={t.plants.number}
        eyebrow={t.plants.eyebrow}
        title={
          <>
            {t.plants.title}{" "}
            <em className="font-normal text-sage">{t.plants.highlight}</em>
          </>
        }
        description={t.plants.description}
      />

      {/* Plant gallery */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          {/* Rarity filter */}
          <div className="flex flex-wrap gap-1.5 mb-8">
            {rarityFilters.map((f) => (
              <button
                key={f.id}
                onClick={() => setRarity(f.id)}
                className={cn(
                  "rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all",
                  rarity === f.id
                    ? "border-foreground bg-foreground text-background"
                    : "border-border bg-card text-muted-foreground hover:text-foreground hover:border-foreground/30"
                )}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((plant, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <div
                  className="card-hairline card-hairline-hover rounded-xl overflow-hidden h-full flex flex-col cursor-pointer"
                  onClick={() => openPlant(plant)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      openPlant(plant);
                    }
                  }}
                >
                  <div className={cn("relative h-32 grid place-items-center bg-gradient-to-br to-transparent", COLOR_BG[plant.color])}>
                    <span className="text-5xl">{plant.emoji}</span>
                    <span className={cn("absolute top-3 right-3 font-mono text-[10px] uppercase tracking-wider font-semibold", RARITY_STYLES[plant.rarity])}>
                      {t.rarity[plant.rarity as keyof typeof t.rarity] ?? plant.rarity}
                    </span>
                  </div>

                  <div className="p-4 flex-1 flex flex-col">
                    <h3 className="font-display text-lg font-medium text-foreground">{plant.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground text-pretty flex-1">{plant.description}</p>

                    <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{t.plants.growsIn}</p>
                        <p className="text-foreground font-medium mt-0.5">{plant.growTime}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
                          {plant.price > 0 ? t.plants.price : t.plants.origin}
                        </p>
                        <p className="text-foreground font-medium mt-0.5">
                          {plant.price > 0 ? `🪙 ${plant.price}` : t.plants.mutation}
                        </p>
                      </div>
                    </div>

                    {plant.sellPrice !== undefined && (
                      <div className="mt-2 text-xs">
                        <span className="text-[10px] text-muted-foreground uppercase tracking-wider">{t.plants.sellsFor}</span>
                        <span className="ml-2 text-sage font-medium">🪙 {plant.sellPrice}</span>
                      </div>
                    )}

                    <div className="mt-3 pt-3 border-t border-border">
                      <p className="text-[11px] text-muted-foreground italic text-pretty leading-relaxed">
                        💡 {plant.tip}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Weather section */}
      <section className="py-16 md:py-24 border-t border-border">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <Reveal>
            <div className="max-w-3xl">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-sage font-semibold mb-4">
                {t.weatherSection.eyebrow}
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-medium tracking-tight text-foreground text-balance leading-[1.05]">
                {t.weatherSection.title}
              </h2>
              <p className="mt-4 text-base text-muted-foreground text-pretty leading-relaxed max-w-2xl">
                {t.weatherSection.description}
              </p>
            </div>
          </Reveal>

          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {t.howItWorks.weather.items.map((w, i) => {
              const WEATHER_COLOR = {
                sun: "from-gold/15",
                sky: "from-sky-soft/20",
                terra: "from-terra-deep/12",
                snow: "from-sky-soft/12",
              } as const;
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
        </div>
      </section>

      {/* Mutation callout */}
      <section className="py-16 md:py-24 border-t border-border">
        <div className="mx-auto max-w-4xl px-5 sm:px-6">
          <Reveal>
            <div className="rounded-2xl border border-terra/20 bg-terra/[0.04] p-6 sm:p-8">
              <p className="font-mono text-[11px] uppercase tracking-wider text-terra font-semibold mb-3">
                {t.plants.mutationCallout.label}
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-medium text-foreground mb-3 text-balance">
                {t.plants.mutationCallout.title}
              </h2>
              <p className="text-base text-muted-foreground text-pretty leading-relaxed mb-5">
                {t.plants.mutationCallout.body}
              </p>
              <Link
                href="/how-it-works"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-terra-deep hover:underline"
              >
                {t.plants.mutationCallout.link}
                <ArrowRightIcon size={14} />
              </Link>
            </div>
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
            <Link
              href="/get-started"
              className="group mt-6 inline-flex items-center gap-2 rounded-lg bg-foreground text-background px-5 py-2.5 text-sm font-medium hover:bg-foreground/90 transition-colors"
            >
              {t.hero.ctaPrimary}
              <ArrowRightIcon size={15} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Reveal>
        </div>
      </section>

      <PlantModal
        plant={selectedPlant}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}
