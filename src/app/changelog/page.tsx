"use client";

import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";
import { useI18n } from "@/hooks/use-i18n";
import { cn } from "@/lib/utils";
import { Breadcrumb } from "@/components/site/Breadcrumb";

export default function ChangelogPage() {
  const { t } = useI18n();
  const c = t.changelog;

  const tagStyles: Record<string, string> = {
    fixed: "bg-sage/15 text-sage",
    added: "bg-gold/20 text-gold-deep",
    changed: "bg-terra/15 text-terra-deep",
    wip: "bg-secondary text-muted-foreground",
  };

  return (
    <>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Changelog" },
        ]}
      />
      <PageHeader
        number={c.number}
        eyebrow={c.eyebrow}
        title={
          <>
            {c.title}{" "}
            <em className="font-normal text-sage">{c.highlight}</em>
          </>
        }
        description={c.description}
      />

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-5 sm:px-6">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px bg-border sm:-translate-x-1/2" aria-hidden />

            <div className="space-y-8">
              {c.entries.map((entry, i) => {
                const left = i % 2 === 0;
                return (
                  <Reveal key={i} delay={i * 0.04}>
                    <div className={`relative pl-12 sm:pl-0 sm:grid sm:grid-cols-2 sm:gap-8 sm:items-center ${left ? "" : "sm:[direction:rtl]"}`}>
                      {/* Dot */}
                      <div className="absolute left-0 sm:left-1/2 sm:-translate-x-1/2 top-1 z-10">
                        <div className="grid place-items-center h-8 w-8 rounded-full bg-card border-2 border-sage shadow-sm">
                          <span className="text-xs">v</span>
                        </div>
                      </div>

                      {/* Card */}
                      <div className={`sm:[direction:ltr] ${left ? "sm:pr-8 sm:text-right" : "sm:pl-8"}`}>
                        <div className="card-hairline rounded-xl p-5">
                          <div className={`flex items-center gap-3 ${left ? "sm:flex-row-reverse" : ""}`}>
                            <span className={cn("inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide", tagStyles[entry.tag] ?? tagStyles.wip)}>
                              {c.tagLabels[entry.tag as keyof typeof c.tagLabels] ?? entry.tag}
                            </span>
                            <span className="font-mono text-sm font-semibold text-foreground">v{entry.version}</span>
                          </div>
                          <span className={`block mt-1 font-mono text-[11px] text-muted-foreground ${left ? "sm:text-right" : ""}`}>
                            {entry.date}
                          </span>
                          <h3 className={`mt-3 font-display text-lg font-medium text-foreground ${left ? "sm:text-right" : ""}`}>
                            {entry.title}
                          </h3>
                          <p className={`mt-2 text-sm text-muted-foreground text-pretty leading-relaxed ${left ? "sm:text-right" : ""}`}>
                            {entry.body}
                          </p>

                          {/* Details */}
                          <div className={`mt-4 pt-3 border-t border-border ${left ? "sm:text-right" : ""}`}>
                            <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground mb-2">
                              {c.detailsLabel}
                            </p>
                            <ul className={`space-y-1 text-xs text-muted-foreground ${left ? "sm:text-right" : ""}`}>
                              {entry.details.map((d, j) => (
                                <li key={j} className={`flex items-center gap-2 ${left ? "sm:flex-row-reverse" : ""}`}>
                                  <span className="text-sage shrink-0">·</span>
                                  <span>{d}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
