"use client";

import { motion } from "framer-motion";
import { GAMEPLAY_LOOP } from "@/lib/daisy-data";
import { SectionHeader } from "./Features";

export function GameplayLoop() {
  return (
    <section
      id="loop"
      className="relative py-20 md:py-28 scroll-mt-16 bg-garden-soft overflow-hidden"
    >
      {/* Decorative top wave */}
      <div className="absolute top-0 inset-x-0 -translate-y-px" aria-hidden>
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-12 md:h-16">
          <path
            d="M0,40 C240,80 480,0 720,40 C960,80 1200,10 1440,40 L1440,0 L0,0 Z"
            fill="var(--background)"
          />
        </svg>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="The core loop"
          title={
            <>
              Six actions. <span className="text-primary">One satisfying cycle.</span>
            </>
          }
          description="DaisyFlower is designed for short sessions and long-term progression. Plant in seconds, return later to harvest, and let the deterministic simulation handle the in-between."
        />

        {/* Loop diagram */}
        <div className="mt-14 relative">
          {/* Connector line on desktop */}
          <div
            className="hidden lg:block absolute top-12 left-[12%] right-[12%] h-0.5 border-t-2 border-dashed border-primary/25"
            aria-hidden
          />

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-5 relative">
            {GAMEPLAY_LOOP.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="relative"
              >
                <div className="card-garden card-garden-hover rounded-2xl p-5 text-center h-full">
                  {/* Step circle */}
                  <div className="relative mx-auto w-16 h-16">
                    <div className="absolute inset-0 rounded-full bg-primary/10" />
                    <div className="absolute inset-1.5 rounded-full bg-card border border-border grid place-items-center text-3xl shadow-sm">
                      <span aria-hidden>{step.emoji}</span>
                    </div>
                    {/* Step number */}
                    <span className="absolute -top-1 -right-1 grid place-items-center h-6 w-6 rounded-full bg-primary text-primary-foreground text-xs font-bold shadow-md">
                      {i + 1}
                    </span>
                  </div>

                  <h3 className="mt-4 font-display text-lg font-bold text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground text-pretty">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom note */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10 mx-auto max-w-2xl text-center"
        >
          <div className="rounded-2xl border border-primary/20 bg-primary/5 p-5">
            <p className="text-sm text-foreground text-pretty">
              <span className="font-semibold text-primary">Pro tip:</span> You don't need to keep
              the bot open. Plants grow using weather history and timestamps — return whenever you
              like and DaisyFlower computes the current state on demand.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Decorative bottom wave */}
      <div className="absolute bottom-0 inset-x-0 translate-y-px" aria-hidden>
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-12 md:h-16">
          <path
            d="M0,40 C240,0 480,80 720,40 C960,0 1200,70 1440,40 L1440,80 L0,80 Z"
            fill="var(--background)"
          />
        </svg>
      </div>
    </section>
  );
}
