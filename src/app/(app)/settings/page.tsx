"use client";

import { useState } from "react";
import { useTheme } from "next-themes";
import { AppPageHeader } from "@/components/layout/AppPageHeader";
import { Reveal } from "@/components/utils/Reveal";
import { useI18n } from "@/components/providers/I18nProvider";
import { LOCALES, type Locale } from "@/lib/i18n-config";
import { CheckIcon, SunIcon, MoonIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

export default function SettingsPage() {
  const { t, locale, setLocale } = useI18n();
  const { theme, setTheme } = useTheme();
  const s = t.settings;

  // Local state for toggles (mock — no persistence beyond session)
  const [notifStates, setNotifStates] = useState(
    s.sections.notifications.items.map((i) => i.enabled)
  );
  const [privacyStates, setPrivacyStates] = useState(
    s.sections.privacy.items.map((i) => i.enabled)
  );

  const toggleNotif = (i: number) =>
    setNotifStates((prev) => prev.map((v, idx) => (idx === i ? !v : v)));
  const togglePrivacy = (i: number) =>
    setPrivacyStates((prev) => prev.map((v, idx) => (idx === i ? !v : v)));

  return (
    <>
      <AppPageHeader
        
        eyebrow={s.eyebrow}
        title={
          <>
            {s.title}{" "}
            <em className="font-normal text-sage">{s.highlight}</em>
          </>
        }
        description={s.description}
      />

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-5 sm:px-6 space-y-6">
          {/* Language */}
          <Reveal>
            <SettingsCard
              title={s.sections.language.title}
              subtitle={s.sections.language.subtitle}
              description={s.sections.language.description}
            >
              <div className="grid sm:grid-cols-2 gap-3">
                {LOCALES.map((l) => {
                  const isActive = locale === l.code;
                  return (
                    <button
                      key={l.code}
                      onClick={() => setLocale(l.code as Locale)}
                      className={cn(
                        "flex items-center gap-3 rounded-lg border p-4 transition-colors text-left",
                        isActive
                          ? "border-sage/40 bg-sage/[0.04]"
                          : "border-border bg-background hover:border-foreground/20"
                      )}
                    >
                      <span className="text-2xl">{l.flag}</span>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">{l.label}</p>
                        <p className="font-mono text-[10px] text-muted-foreground">{l.code}</p>
                      </div>
                      {isActive && (
                        <span className="grid place-items-center h-5 w-5 rounded-full bg-sage text-white">
                          <CheckIcon size={12} />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </SettingsCard>
          </Reveal>

          {/* Theme */}
          <Reveal delay={0.05}>
            <SettingsCard
              title={s.sections.theme.title}
              subtitle={s.sections.theme.subtitle}
              description={s.sections.theme.description}
            >
              <div className="grid sm:grid-cols-2 gap-3">
                <button
                  onClick={() => setTheme("light")}
                  className={cn(
                    "flex items-center gap-3 rounded-lg border p-4 transition-colors text-left",
                    theme === "light"
                      ? "border-sage/40 bg-sage/[0.04]"
                      : "border-border bg-background hover:border-foreground/20"
                  )}
                >
                  <SunIcon size={20} className="text-gold-deep" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">Light</p>
                    <p className="text-[11px] text-muted-foreground">Warm paper feel</p>
                  </div>
                  {theme === "light" && (
                    <span className="grid place-items-center h-5 w-5 rounded-full bg-sage text-white">
                      <CheckIcon size={12} />
                    </span>
                  )}
                </button>
                <button
                  onClick={() => setTheme("dark")}
                  className={cn(
                    "flex items-center gap-3 rounded-lg border p-4 transition-colors text-left",
                    theme === "dark"
                      ? "border-sage/40 bg-sage/[0.04]"
                      : "border-border bg-background hover:border-foreground/20"
                  )}
                >
                  <MoonIcon size={20} className="text-sage" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">Dark</p>
                    <p className="text-[11px] text-muted-foreground">Easier at night</p>
                  </div>
                  {theme === "dark" && (
                    <span className="grid place-items-center h-5 w-5 rounded-full bg-sage text-white">
                      <CheckIcon size={12} />
                    </span>
                  )}
                </button>
              </div>
            </SettingsCard>
          </Reveal>

          {/* Notifications */}
          <Reveal delay={0.1}>
            <SettingsCard
              title={s.sections.notifications.title}
              subtitle={s.sections.notifications.subtitle}
              description={s.sections.notifications.description}
            >
              <div className="divide-y divide-border">
                {s.sections.notifications.items.map((item, i) => (
                  <ToggleRow
                    key={i}
                    label={item.label}
                    desc={item.desc}
                    enabled={notifStates[i]}
                    onToggle={() => toggleNotif(i)}
                  />
                ))}
              </div>
            </SettingsCard>
          </Reveal>

          {/* Privacy */}
          <Reveal delay={0.15}>
            <SettingsCard
              title={s.sections.privacy.title}
              subtitle={s.sections.privacy.subtitle}
              description={s.sections.privacy.description}
            >
              <div className="divide-y divide-border">
                {s.sections.privacy.items.map((item, i) => (
                  <ToggleRow
                    key={i}
                    label={item.label}
                    desc={item.desc}
                    enabled={privacyStates[i]}
                    onToggle={() => togglePrivacy(i)}
                  />
                ))}
              </div>
            </SettingsCard>
          </Reveal>

          {/* Save indicator */}
          <Reveal delay={0.2}>
            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-sage animate-pulse-dot" />
              {s.saved}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function SettingsCard({
  title,
  subtitle,
  description,
  children,
}: {
  title: string;
  subtitle: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="card-hairline rounded-xl p-6">
      <div className="mb-5">
        <h3 className="font-display text-lg font-medium text-foreground">{title}</h3>
        <p className="mt-0.5 text-sm text-muted-foreground">{subtitle}</p>
        {description && (
          <p className="mt-2 text-xs text-muted-foreground text-pretty">{description}</p>
        )}
      </div>
      {children}
    </div>
  );
}

function ToggleRow({
  label,
  desc,
  enabled,
  onToggle,
}: {
  label: string;
  desc: string;
  enabled: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-3.5">
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground">{label}</p>
        <p className="text-[11px] text-muted-foreground text-pretty">{desc}</p>
      </div>
      <button
        onClick={onToggle}
        className={cn(
          "relative h-6 w-11 rounded-full transition-colors shrink-0",
          enabled ? "bg-sage" : "bg-secondary"
        )}
        role="switch"
        aria-checked={enabled}
        aria-label={label}
      >
        <span
          className={cn(
            "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform",
            enabled ? "translate-x-[22px]" : "translate-x-0.5"
          )}
        />
      </button>
    </div>
  );
}
