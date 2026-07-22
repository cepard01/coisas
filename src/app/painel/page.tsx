"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { AuthModal } from "@/components/site/AuthModal";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";
import { DashboardLayout } from "@/components/site/Dashboard";
import { LockIcon, ArrowUpRightIcon } from "@/components/site/icons";

export default function PainelPage() {
  const { player, signIn, hydrated } = useAuth();
  const [authOpen, setAuthOpen] = useState(false);
  const [tab, setTab] = useState<"garden" | "wallet" | "missions" | "collection">("garden");

  return (
    <>
      <PageHeader
        number="03"
        eyebrow="Seu painel no site"
        title={
          <>
            Seu jardim, <em className="font-normal text-sage">no navegador.</em>
          </>
        }
        description="Conecte sua conta do Discord e acompanhe seu jardim pelo site — sem precisar abrir o app. Veja suas plantas, carteira, missões e coleção em um painel limpo."
      />

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          {hydrated && player ? (
            <Reveal>
              <DashboardLayout tab={tab} onTab={setTab} player={player} />
            </Reveal>
          ) : (
            <LockedDashboard onSignIn={() => setAuthOpen(true)} />
          )}
        </div>
      </section>

      {/* What you can do */}
      <section className="py-16 md:py-24 border-t border-border">
        <div className="mx-auto max-w-4xl px-5 sm:px-6">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-sage font-semibold mb-4">
              O que você faz aqui
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-medium text-foreground mb-8 text-balance">
              Tudo que está no Discord, também no site.
            </h2>
          </Reveal>

          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { emoji: "🌼", title: "Veja seu jardim", body: "Slots, crescimento, umidade e clima — tudo em um olhar." },
              { emoji: "🪙", title: "Acompanhe sua carteira", body: "Saldo de Daisies, XP, nível e transações recentes." },
              { emoji: "🎯", title: "Siga suas missões", body: "Tutorial, missões diárias e semanais com progresso." },
              { emoji: "📚", title: "Complete sua coleção", body: "Flores descobertas e bloqueadas com dicas de como achar." },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 0.05}>
                <div className="card-hairline rounded-xl p-5">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl shrink-0">{item.emoji}</span>
                    <div>
                      <h3 className="font-display text-base font-medium text-foreground">{item.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground text-pretty">{item.body}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <AuthModal open={authOpen} onOpenChange={setAuthOpen} onAuthenticated={signIn} />
    </>
  );
}

function LockedDashboard({ onSignIn }: { onSignIn: () => void }) {
  return (
    <div className="relative rounded-xl border border-border bg-card overflow-hidden">
      <div className="absolute inset-0 overflow-hidden" aria-hidden>
        <div className="opacity-20 blur-md pointer-events-none select-none">
          <DashboardLayout tab="garden" />
        </div>
      </div>
      <div className="relative grid place-items-center py-20 sm:py-28 px-6 text-center">
        <Reveal>
          <span className="grid place-items-center h-12 w-12 rounded-full border border-border mx-auto">
            <LockIcon size={20} className="text-muted-foreground" />
          </span>
          <h3 className="mt-5 font-display text-2xl font-medium text-foreground">
            Conecte para ver
          </h3>
          <p className="mt-2 text-sm text-muted-foreground max-w-md text-pretty">
            Entre com Discord (mockup — nenhum dado real é enviado) para explorar como ficaria
            seu painel no site.
          </p>
          <button
            onClick={onSignIn}
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-foreground text-background px-5 py-2.5 text-sm font-medium hover:bg-foreground/90 transition-colors"
          >
            Entrar com Discord
            <ArrowUpRightIcon size={15} />
          </button>
        </Reveal>
      </div>
    </div>
  );
}
