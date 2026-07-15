"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useI18n } from "@/hooks/use-i18n";
import { AuthModal } from "@/components/site/AuthModal";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";
import { DashboardLayout } from "@/components/site/Dashboard";
import { LockIcon, ArrowUpRightIcon } from "@/components/site/icons";
import { Breadcrumb } from "@/components/site/Breadcrumb";

type Tab = "garden" | "wallet" | "missions" | "collection" | "shop" | "weather";

export default function PanelPage() {
  const { player, signIn, hydrated } = useAuth();
  const { t } = useI18n();
  const [authOpen, setAuthOpen] = useState(false);
  const [tab, setTab] = useState<Tab>("garden");

  return (
    <>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: t.nav.panel },
        ]}
      />
      <PageHeader
        number={t.panel.number}
        eyebrow={t.panel.eyebrow}
        title={
          <>
            {t.panel.title}{" "}
            <em className="font-normal text-sage">{t.panel.highlight}</em>
          </>
        }
        description={t.panel.description}
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
              {t.panel.whatYouCanDo.eyebrow}
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-medium text-foreground mb-8 text-balance">
              {t.panel.whatYouCanDo.title}
            </h2>
          </Reveal>

          <div className="grid sm:grid-cols-2 gap-4">
            {t.panel.whatYouCanDo.items.map((item, i) => (
              <Reveal key={i} delay={i * 0.05}>
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
  const { t } = useI18n();
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
            {t.panel.locked.title}
          </h3>
          <p className="mt-2 text-sm text-muted-foreground max-w-md text-pretty">
            {t.panel.locked.body}
          </p>
          <button
            onClick={onSignIn}
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-foreground text-background px-5 py-2.5 text-sm font-medium hover:bg-foreground/90 transition-colors"
          >
            {t.panel.locked.button}
            <ArrowUpRightIcon size={15} />
          </button>
        </Reveal>
      </div>
    </div>
  );
}
