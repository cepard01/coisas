"use client";

import { Reveal } from "@/components/utils/Reveal";

/**
 * Header for inner pages — handles top padding for the fixed navbar
 * and renders an eyebrow + title + description in the editorial style.
 */
export function PageHeader({
  number,
  eyebrow,
  title,
  description,
}: {
  number: string;
  eyebrow: string;
  title: React.ReactNode;
  description?: React.ReactNode;
}) {
  return (
    <header className="pt-32 pb-12 md:pt-40 md:pb-16 border-b border-border">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <Reveal>
          <div className="flex items-center gap-3 text-muted-foreground">
            <span className="font-mono text-xs marker-num">{number}</span>
            <span className="h-px w-8 bg-border" />
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-sage font-semibold">
              {eyebrow}
            </span>
          </div>
          <h1 className="mt-5 font-display text-4xl sm:text-5xl lg:text-[3.5rem] font-medium tracking-tight text-foreground text-balance leading-[1.05] max-w-3xl">
            {title}
          </h1>
          {description && (
            <p className="mt-5 text-base sm:text-lg text-muted-foreground text-pretty leading-relaxed max-w-2xl">
              {description}
            </p>
          )}
        </Reveal>
      </div>
    </header>
  );
}
