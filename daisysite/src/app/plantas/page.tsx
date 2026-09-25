"use client";

import Link from "next/link";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";
import { PLANTS, type Plant } from "@/lib/daisy-data";
import { cn } from "@/lib/utils";
import { ArrowRightIcon } from "@/components/site/icons";

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

export default function PlantasPage() {
  return (
    <>
      <PageHeader
        number="02"
        eyebrow="O que você cultiva"
        title={
          <>
            Flores, rosas e{" "}
            <em className="font-normal text-sage">mutações raras.</em>
          </>
        }
        description="Comece com girassóis simples. Conforme joga, desbloqueie rosas, combine sementes e descubra híbridos que só nascem com paciência e curiosidade."
      />

      {/* Plant gallery */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PLANTS.map((plant, i) => (
              <Reveal key={plant.name} delay={i * 0.06}>
                <PlantCard plant={plant} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Mutation callout */}
      <section className="py-16 md:py-24 border-t border-border">
        <div className="mx-auto max-w-4xl px-5 sm:px-6">
          <Reveal>
            <div className="rounded-2xl border border-terra/20 bg-terra/[0.04] p-6 sm:p-8">
              <p className="font-mono text-[11px] uppercase tracking-wider text-terra font-semibold mb-3">
                🧬 Descoberta especial
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-medium text-foreground mb-3 text-balance">
                A Rosa Rosa só nasce com você.
              </h2>
              <p className="text-base text-muted-foreground text-pretty leading-relaxed mb-5">
                Você não compra a semente de Rosa Rosa em lugar nenhum. Ela só aparece quando você
                planta uma Rosa Vermelha e uma Rosa Branca lado a lado, espera as duas amadurecerem,
                e tem um pouco de sorte — 30% de chance em cada colheita.
              </p>
              <Link
                href="/como-funciona"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-terra-deep hover:underline"
              >
                Entenda como mutações funcionam
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
              Pronto para começar seu jardim?
            </h2>
            <Link
              href="/comecar"
              className="group mt-6 inline-flex items-center gap-2 rounded-lg bg-foreground text-background px-5 py-2.5 text-sm font-medium hover:bg-foreground/90 transition-colors"
            >
              Adicionar ao Discord
              <ArrowRightIcon size={15} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function PlantCard({ plant }: { plant: Plant }) {
  return (
    <div className="card-hairline card-hairline-hover rounded-xl overflow-hidden h-full flex flex-col">
      <div className={cn("relative h-32 grid place-items-center bg-gradient-to-br to-transparent", COLOR_BG[plant.color])}>
        <span className="text-5xl">{plant.emoji}</span>
        <span className={cn("absolute top-3 right-3 font-mono text-[10px] uppercase tracking-wider font-semibold", RARITY_STYLES[plant.rarity])}>
          {plant.rarity}
        </span>
      </div>

      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-display text-lg font-medium text-foreground">{plant.name}</h3>
        <p className="mt-1 text-sm text-muted-foreground text-pretty flex-1">{plant.description}</p>

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

        <div className="mt-3 pt-3 border-t border-border">
          <p className="text-[11px] text-muted-foreground italic text-pretty leading-relaxed">
            💡 {plant.tip}
          </p>
        </div>
      </div>
    </div>
  );
}
