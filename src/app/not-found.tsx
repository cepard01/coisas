"use client";

import Link from "next/link";
import { useI18n } from "@/hooks/use-i18n";
import { ArrowRightIcon, DaisyMark } from "@/components/site/icons";

export default function NotFound() {
  const { t } = useI18n();

  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-32 min-h-[60vh] grid place-items-center">
      <div className="mx-auto max-w-lg px-5 sm:px-6 text-center">
        <DaisyMark size={48} className="text-terra mx-auto opacity-40" />

        <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.18em] text-sage font-semibold">
          {t.notFound.code}
        </p>
        <h1 className="mt-3 font-display text-4xl sm:text-5xl font-medium tracking-tight text-foreground text-balance leading-[1.05]">
          {t.notFound.title}{" "}
          <em className="font-normal text-sage">{t.notFound.highlight}</em>
        </h1>
        <p className="mt-5 text-base text-muted-foreground text-pretty leading-relaxed">
          {t.notFound.body}
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 rounded-lg bg-foreground text-background px-5 py-2.5 text-sm font-medium hover:bg-foreground/90 transition-colors"
          >
            {t.notFound.backHome}
            <ArrowRightIcon size={15} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/plants"
            className="inline-flex items-center gap-1.5 rounded-lg px-4 py-2.5 text-sm font-medium text-foreground hover:bg-secondary transition-colors"
          >
            {t.nav.plants}
          </Link>
        </div>
      </div>
    </section>
  );
}
