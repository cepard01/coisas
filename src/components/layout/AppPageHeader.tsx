"use client";

import { Reveal } from "@/components/utils/Reveal";

/**
 * Page header for app pages — lighter padding than marketing PageHeader
 * since the app has a 56px top bar instead of a 64px fixed navbar.
 */
export function AppPageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
}) {
  return (
    <header className="pb-8 border-b border-border">
      <Reveal>
        {eyebrow && (
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-sage font-semibold mb-3">
            {eyebrow}
          </p>
        )}
        <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-foreground text-balance leading-[1.05] max-w-3xl">
          {title}
        </h1>
        {description && (
          <p className="mt-4 text-base text-muted-foreground text-pretty leading-relaxed max-w-2xl">
            {description}
          </p>
        )}
      </Reveal>
    </header>
  );
}
