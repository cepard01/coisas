"use client";

import { motion } from "framer-motion";
import { FEATURES, type FeatureEntry } from "@/lib/daisy-data";
import { cn } from "@/lib/utils";

const ACCENT_STYLES: Record<
  FeatureEntry["accent"],
  { bg: string; ring: string; chip: string; icon: string }
> = {
  leaf: {
    bg: "from-leaf-soft/20 to-transparent",
    ring: "group-hover:border-leaf/40",
    chip: "bg-leaf/10 text-leaf-deep",
    icon: "bg-leaf-gradient",
  },
  sun: {
    bg: "from-sun/20 to-transparent",
    ring: "group-hover:border-sun/40",
    chip: "bg-sun/15 text-sun-deep",
    icon: "bg-sun-gradient",
  },
  rose: {
    bg: "from-rose-petal/15 to-transparent",
    ring: "group-hover:border-rose-petal/40",
    chip: "bg-rose-petal/10 text-rose-petal",
    icon: "bg-gradient-to-br from-rose-petal to-sun-deep",
  },
  sky: {
    bg: "from-sky-soft/25 to-transparent",
    ring: "group-hover:border-sky-soft/50",
    chip: "bg-sky-soft/20 text-foreground",
    icon: "bg-gradient-to-br from-sky-soft to-leaf-soft",
  },
};

export function Features() {
  return (
    <section id="features" className="relative py-20 md:py-28 scroll-mt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Why DaisyFlower"
          title={
            <>
              An engine built for{" "}
              <span className="text-primary">cozy, persistent gardens</span>
            </>
          }
          description="DaisyFlower is not a wrapper around an existing game framework. It is a from-scratch gardening engine designed for deterministic simulation, scalable content, and UI-first player experience."
        />

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {FEATURES.map((feature, i) => {
            const accent = ACCENT_STYLES[feature.accent];
            return (
              <motion.article
                key={feature.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className={cn(
                  "group relative card-garden card-garden-hover rounded-2xl p-6 overflow-hidden border",
                  accent.ring
                )}
              >
                {/* Decorative gradient wash */}
                <div
                  className={cn(
                    "pointer-events-none absolute inset-0 bg-gradient-to-br opacity-70",
                    accent.bg
                  )}
                  aria-hidden
                />

                <div className="relative">
                  <div className="flex items-center justify-between">
                    <span
                      className={cn(
                        "grid place-items-center h-12 w-12 rounded-xl text-white shadow-md text-xl",
                        accent.icon
                      )}
                      aria-hidden
                    >
                      {feature.icon}
                    </span>
                  </div>

                  <h3 className="mt-4 font-display text-xl font-bold text-foreground">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground text-pretty">
                    {feature.description}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "center" | "left";
}) {
  return (
    <div
      className={
        "max-w-3xl " + (align === "center" ? "mx-auto text-center" : "text-left")
      }
    >
      {eyebrow && (
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
          <span aria-hidden>🌼</span>
          {eyebrow}
        </span>
      )}
      <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground text-balance">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base sm:text-lg text-muted-foreground text-pretty">
          {description}
        </p>
      )}
    </div>
  );
}
