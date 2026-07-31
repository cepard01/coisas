"use client";

import Link from "next/link";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";
import { STARTER_KIT } from "@/lib/daisy-data";
import { ArrowRightIcon, TerminalIcon, SproutIcon } from "@/components/site/icons";

export default function ComecarPage() {
  return (
    <>
      <PageHeader
        number="05"
        eyebrow="Comece agora"
        title={
          <>
            Seu jardim está{" "}
            <em className="font-normal text-sage">esperando.</em>
          </>
        }
        description="Leva 30 segundos. Sem cadastro, sem download. Adicione o bot ao seu servidor, digite /start, e você já tem sementes para plantar."
      />

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-5xl px-5 sm:px-6 space-y-6">
          {/* Steps */}
          <Reveal>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { n: "1", title: "Adicione o bot", body: "Clique no botão abaixo e autorize no seu servidor." },
                { n: "2", title: "Digite /start", body: "Em qualquer canal onde o bot pode ver mensagens." },
                { n: "3", title: "Plante", body: "Toque em \"Começar Meu Jardim\" e siga os botões." },
              ].map((s) => (
                <div key={s.n} className="card-hairline rounded-xl p-5">
                  <div className="flex items-baseline justify-between mb-3">
                    <span className="font-display text-3xl font-medium text-foreground/10 marker-num">{s.n}</span>
                  </div>
                  <h3 className="font-display text-base font-medium text-foreground">{s.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground text-pretty">{s.body}</p>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Starter kit */}
          <Reveal delay={0.1}>
            <div className="rounded-xl border border-border bg-card p-6 sm:p-8">
              <div className="flex items-center gap-2 mb-1">
                <SproutIcon size={16} className="text-sage" />
                <p className="font-mono text-[11px] uppercase tracking-wider text-sage font-semibold">
                  Kit inicial · grátis
                </p>
              </div>
              <h3 className="font-display text-xl font-medium text-foreground">
                Todo mundo começa igual
              </h3>
              <p className="mt-1.5 text-sm text-muted-foreground text-pretty">
                Sem pay-to-win, sem vantagem paga. O suficiente para plantar seu primeiro girassol.
              </p>

              <div className="mt-5 grid grid-cols-3 gap-3">
                {STARTER_KIT.map((item) => (
                  <div key={item.name} className="rounded-lg border border-border bg-background/40 p-3 text-center">
                    <div className="text-2xl">{item.emoji}</div>
                    <p className="mt-1.5 text-[11px] font-medium text-foreground">{item.name}</p>
                    <p className="text-[11px] text-sage font-bold mt-0.5">{item.amount}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Command preview */}
          <Reveal delay={0.2}>
            <div className="rounded-xl border border-border bg-ink text-paper p-6 sm:p-8 relative overflow-hidden">
              <div
                className="pointer-events-none absolute -top-12 -right-12 h-40 w-40 rounded-full blur-3xl opacity-40"
                style={{ background: "radial-gradient(circle, oklch(0.82 0.12 85 / 0.4), transparent 70%)" }}
                aria-hidden
              />
              <div className="relative">
                <div className="flex items-center gap-2 mb-4">
                  <TerminalIcon size={16} className="text-gold" />
                  <p className="font-mono text-[11px] uppercase tracking-wider text-gold font-semibold">
                    No Discord
                  </p>
                </div>

                <div className="rounded-lg bg-black/30 border border-white/10 p-3.5 mb-3">
                  <p className="font-mono text-[11px] text-white/50 uppercase tracking-wider mb-1.5">
                    você digita
                  </p>
                  <p className="font-mono text-base text-paper">
                    <span className="text-gold">/start</span>
                  </p>
                </div>

                <div className="rounded-lg bg-white/5 border border-white/10 p-3.5">
                  <p className="font-mono text-[11px] text-white/50 uppercase tracking-wider mb-1.5">
                    🌼 DaisyFlower responde
                  </p>
                  <p className="text-sm text-paper leading-relaxed">
                    Bem-vindo ao DaisyFlower! Seu kit inicial está pronto. Toque em{" "}
                    <span className="text-gold font-semibold">Começar Meu Jardim</span> para plantar
                    seu primeiro girassol.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5 text-[11px]">
                    <span className="rounded-md bg-sage text-white px-2 py-1 font-medium">
                      🌱 Começar Meu Jardim
                    </span>
                    <span className="rounded-md bg-white/10 text-paper px-2 py-1">❔ Como funciona</span>
                    <span className="rounded-md bg-white/10 text-paper px-2 py-1">⚙️ Idioma</span>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Final CTA */}
          <Reveal delay={0.3}>
            <div className="text-center pt-6">
              <a
                href="https://discord.com/oauth2/authorize"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-lg bg-foreground text-background px-6 py-3 text-sm font-medium hover:bg-foreground/90 transition-colors"
              >
                Adicionar DaisyFlower ao Discord
                <ArrowRightIcon size={16} className="transition-transform group-hover:translate-x-0.5" />
              </a>
              <p className="mt-3 text-xs text-muted-foreground">
                Grátis · código aberto · MIT · feito com carinho
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
