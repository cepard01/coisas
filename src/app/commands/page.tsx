"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Reveal } from "@/components/utils/Reveal";
import { useI18n } from "@/components/providers/I18nProvider";
import { SearchIcon, CheckIcon } from "@/components/icons";
import { cn } from "@/lib/utils";
import { Breadcrumb } from "@/components/layout/Breadcrumb";

type Category = "all" | "core" | "economy" | "system";

export default function CommandsPage() {
  const { t } = useI18n();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Category>("all");
  const [copied, setCopied] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut: "/" focuses search
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "/" && document.activeElement?.tagName !== "INPUT") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const filtered = useMemo(() => {
    return t.commands.items.filter((cmd) => {
      const matchesCategory = category === "all" || cmd.category === category;
      const q = query.toLowerCase().trim();
      const matchesQuery =
        !q ||
        cmd.command.toLowerCase().includes(q) ||
        cmd.description.toLowerCase().includes(q) ||
        cmd.aliases.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [t.commands.items, query, category]);

  const categories: { id: Category; label: string }[] = [
    { id: "all", label: "All" },
    { id: "core", label: t.commands.categories.core },
    { id: "economy", label: t.commands.categories.economy },
    { id: "system", label: t.commands.categories.system },
  ];

  const categoryColor: Record<string, string> = {
    core: "text-sage",
    economy: "text-gold-deep",
    system: "text-terra-deep",
  };

  const copyCommand = (cmd: string) => {
    navigator.clipboard?.writeText(cmd).then(() => {
      setCopied(cmd);
      setTimeout(() => setCopied(null), 1500);
    });
  };

  return (
    <>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: t.nav.commands },
        ]}
      />
      <PageHeader
        number={t.commands.number}
        eyebrow={t.commands.eyebrow}
        title={
          <>
            {t.commands.title}{" "}
            <em className="font-normal text-sage">{t.commands.highlight}</em>
          </>
        }
        description={t.commands.description}
      />

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-5 sm:px-6">
          {/* Search */}
          <Reveal>
            <div className="relative mb-6">
              <SearchIcon
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
              />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t.commands.searchPlaceholder}
                aria-label={t.commands.searchPlaceholder}
                className="w-full rounded-lg border border-border bg-card pl-11 pr-16 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-sage/40 transition-colors"
              />
              <kbd className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-0.5 rounded border border-border bg-background px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground pointer-events-none">
                /
              </kbd>
            </div>
          </Reveal>

          {/* Category filter */}
          <Reveal delay={0.05}>
            <div className="flex flex-wrap gap-1.5 mb-8">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setCategory(cat.id)}
                  className={cn(
                    "rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all",
                    category === cat.id
                      ? "border-foreground bg-foreground text-background"
                      : "border-border bg-card text-muted-foreground hover:text-foreground hover:border-foreground/30"
                  )}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </Reveal>

          {/* Commands list */}
          {filtered.length === 0 ? (
            <Reveal>
              <div className="text-center py-16">
                <p className="text-sm text-muted-foreground">{t.commands.noResults}</p>
              </div>
            </Reveal>
          ) : (
            <div className="rounded-2xl border border-border overflow-hidden bg-card">
              {/* Header row */}
              <div className="hidden sm:grid grid-cols-[160px_1fr_160px] gap-4 px-5 py-3 border-b border-border bg-secondary/30 text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
                <span>Command</span>
                <span>Description</span>
                <span>{t.commands.aliasLabel}</span>
              </div>

              <div className="divide-y divide-border">
                {filtered.map((cmd, i) => (
                  <Reveal key={cmd.command} delay={Math.min(i * 0.02, 0.15)}>
                    <div
                      className="grid sm:grid-cols-[160px_1fr_160px] gap-2 sm:gap-4 px-5 py-4 hover:bg-secondary/20 transition-colors group cursor-pointer"
                      onClick={() => copyCommand(cmd.command)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          copyCommand(cmd.command);
                        }
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <code className="font-mono text-sm font-semibold text-foreground">{cmd.command}</code>
                        {copied === cmd.command ? (
                          <CheckIcon size={13} className="text-sage" />
                        ) : (
                          <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] text-muted-foreground font-mono">
                            copy
                          </span>
                        )}
                      </div>
                      <div>
                        <p className="text-sm text-foreground text-pretty">{cmd.description}</p>
                        <p className={cn("mt-1 sm:hidden font-mono text-[10px] uppercase tracking-wider font-semibold", categoryColor[cmd.category])}>
                          {t.commands.categories[cmd.category as keyof typeof t.commands.categories]}
                        </p>
                      </div>
                      <div className="hidden sm:flex items-center">
                        <span className={cn("font-mono text-[10px] uppercase tracking-wider font-semibold mr-2", categoryColor[cmd.category])}>
                          {t.commands.categories[cmd.category as keyof typeof t.commands.categories]}
                        </span>
                        {cmd.aliases && (
                          <code className="font-mono text-[11px] text-muted-foreground bg-secondary px-1.5 py-0.5 rounded">
                            .{cmd.aliases.split(",")[0]}
                          </code>
                        )}
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          )}

          {/* Count + hint */}
          <div className="mt-6 flex items-center justify-between">
            <p className="text-xs text-muted-foreground">
              {filtered.length} / {t.commands.items.length}
            </p>
            <p className="hidden sm:block text-xs text-muted-foreground font-mono">
              click a row to copy · press / to search
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
