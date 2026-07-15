"use client";

import { Reveal } from "./Reveal";
import { PLANTS, WEATHER, type Plant } from "@/lib/daisy-data";
import { cn } from "@/lib/utils";

const RARITY_STYLES = {
  "Comum": "text-muted-foreground",
  "Incomum": "text-sage",
  "Rara": "text-terra-deep",
  "Épica": "text-gold-deep",
} as const;

const COLOR_BG = {
  sun: "from-gold/10",
  rose: "from-terra/10",
  sky: "from-sky-soft/15",
  terra: "from-terra-deep/8",
  gold: "from-gold/12",
} as const;

export function GardenGallery() {
  return (
    <section id="plants" className="py-24 md:py-32 border-t border-border bg-background">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 text-muted-foreground">
            <span className="font-mono text-xs marker-num">02</span>
            <span className="h-px w-8 bg-border" />
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-sage font-semibold">
              O que você cultiva
            </span>
          </div>
          <h2 className="mt-5 font-display text-4xl sm:text-5xl lg:text-[3.5rem] font-medium tracking-tight text-foreground text-balance leading-[1.05]">
            Flores, rosas e <em className="font-normal text-sage">mutações raras.</em>
          </h2>
          <p className="mt-5 text-base sm:text-lg text-muted-foreground text-pretty leading-relaxed max-w-2xl">
            Comece com girassóis simples. Conforme joga, desbloqueie rosas, combine sementes
            e descubra híbridos que só nascem com paciência e curiosidade.
          </p>
        </div>

        {/* Plant cards */}
        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {PLANTS.map((plant, i) => (
            <Reveal key={plant.name} delay={i * 0.06}>
              <PlantCard plant={plant} />
            </Reveal>
          ))}
        </div>

        {/* Weather section */}
        <div className="mt-20">
          <div className="text-center mb-10">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-sage font-semibold">
              O clima muda tudo
            </p>
            <h3 className="mt-2 font-display text-2xl sm:text-3xl font-medium text-foreground">
              Cada tempo tem seu efeito
            </h3>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {WEATHER.map((w, i) => (
              <Reveal key={w.name} delay={i * 0.05}>
                <WeatherCard weather={w} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function PlantCard({ plant }: { plant: Plant }) {
  return (
    <div className="card-hairline card-hairline-hover rounded-xl overflow-hidden h-full flex flex-col">
      {/* Top — big emoji on tinted background */}
      <div className={cn("relative h-32 grid place-items-center bg-gradient-to-br to-transparent", COLOR_BG[plant.color])}>
        <span className="text-5xl">{plant.emoji}</span>
        <span className={cn("absolute top-3 right-3 font-mono text-[10px] uppercase tracking-wider font-semibold", RARITY_STYLES[plant.rarity])}>
          {plant.rarity}
        </span>
      </div>

      {/* Body */}
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-display text-lg font-medium text-foreground">{plant.name}</h3>
        <p className="mt-1 text-sm text-muted-foreground text-pretty flex-1">{plant.description}</p>

        {/* Stats */}
        <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
          <div>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Cresce em</p>
            <p className="text-foreground font-medium mt-0.5">{plant.growTime}</p>
          </div>
          <div>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
              {plant.price > 0 ? "Preço" : "Origem"}
            </p>
            <p className="text-foreground font-medium mt-0.5">
              {plant.price > 0 ? `🪙 ${plant.price}` : "mutação"}
            </p>
          </div>
        </div>

        {plant.sellPrice && (
          <div className="mt-2 text-xs">
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Vende por</span>
            <span className="ml-2 text-sage font-medium">🪙 {plant.sellPrice}</span>
          </div>
        )}

        {/* Tip */}
        <div className="mt-3 pt-3 border-t border-border">
          <p className="text-[11px] text-muted-foreground italic text-pretty leading-relaxed">
            💡 {plant.tip}
          </p>
        </div>
      </div>
    </div>
  );
}

const WEATHER_COLOR = {
  sun: "from-gold/15",
  sky: "from-sky-soft/20",
  terra: "from-terra-deep/12",
  snow: "from-sky-soft/12",
} as const;

function WeatherCard({ weather }: { weather: typeof WEATHER[number] }) {
  return (
    <div className={cn("card-hairline rounded-xl overflow-hidden bg-gradient-to-br to-transparent", WEATHER_COLOR[weather.color])}>
      <div className="p-5">
        <div className="text-3xl mb-3">{weather.emoji}</div>
        <h4 className="font-display text-base font-medium text-foreground">{weather.name}</h4>
        <p className="mt-1.5 text-sm text-foreground/90">{weather.effect}</p>
        <p className="mt-1 text-xs text-muted-foreground text-pretty">{weather.advice}</p>
      </div>
    </div>
  );
}
