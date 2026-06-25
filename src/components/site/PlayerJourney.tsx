"use client";

import { motion } from "framer-motion";
import { JOURNEY_PHASES } from "@/lib/daisy-data";
import { SectionHeader } from "./Features";

export function PlayerJourney() {
  return (
    <section
      id="journey"
      className="py-20 md:py-28 scroll-mt-16 bg-garden-soft relative overflow-hidden"
    >
      <div className="absolute top-0 inset-x-0" aria-hidden>
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-12 md:h-16">
          <path
            d="M0,40 C240,80 480,0 720,40 C960,80 1200,10 1440,40 L1440,0 L0,0 Z"
            fill="var(--background)"
          />
        </svg>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8">
        <SectionHeader
          eyebrow="Player journey"
          title={
            <>
              From first seed to <span className="text-primary">rare mutation</span>
            </>
          }
          description="DaisyFlower unlocks complexity gradually. Players master the basic loop first, then collect, mutate, decorate, and eventually pursue rare mutations and seasonal events."
        />

        <div className="mt-14 relative">
          {/* Vertical timeline line (desktop) */}
          <div
            className="hidden md:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-0.5 bg-gradient-to-b from-primary/40 via-leaf-soft/40 to-primary/20"
            aria-hidden
          />

          <div className="space-y-6 md:space-y-0">
            {JOURNEY_PHASES.map((phase, i) => {
              const left = i % 2 === 0;
              return (
                <motion.div
                  key={phase.level}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className={
                    "md:grid md:grid-cols-2 md:gap-8 items-center " +
                    (left ? "" : "md:[direction:rtl]")
                  }
                >
                  {/* Card */}
                  <div className={"md:[direction:ltr] " + (left ? "md:pr-8 md:text-right" : "md:pl-8")}>
                    <div className="card-garden card-garden-hover rounded-2xl p-5 border inline-block w-full">
                      <div className={"flex items-center gap-3 " + (left ? "md:flex-row-reverse" : "")}>
                        <span className="grid place-items-center h-12 w-12 rounded-xl bg-leaf-gradient text-white text-2xl shadow-md shrink-0">
                          {phase.emoji}
                        </span>
                        <div className={left ? "md:text-right" : "text-left"}>
                          <p className="text-[11px] font-mono uppercase tracking-wider text-primary font-semibold">
                            {phase.level}
                          </p>
                          <h3 className="font-display text-lg font-bold text-foreground leading-tight">
                            {phase.title}
                          </h3>
                        </div>
                      </div>

                      <ul
                        className={
                          "mt-4 space-y-1.5 text-sm text-muted-foreground " +
                          (left ? "md:text-right" : "text-left")
                        }
                      >
                        {phase.unlocks.map((u) => (
                          <li
                            key={u}
                            className={
                              "flex items-center gap-2 " +
                              (left ? "md:flex-row-reverse md:text-right" : "")
                            }
                          >
                            <span className="text-leaf" aria-hidden>
                              ✓
                            </span>
                            <span>{u}</span>
                          </li>
                        ))}
                      </ul>

                      <div
                        className={
                          "mt-4 rounded-xl bg-primary/5 border border-primary/15 px-3 py-2 text-xs " +
                          (left ? "md:text-right" : "text-left")
                        }
                      >
                        <span className="font-semibold text-primary">Goal:</span>{" "}
                        <span className="text-foreground">{phase.goal}</span>
                      </div>
                    </div>
                  </div>

                  {/* Center dot (desktop) */}
                  <div className="hidden md:block relative [direction:ltr]">
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                      <div className="grid place-items-center h-10 w-10 rounded-full bg-card border-2 border-primary shadow-md">
                        <span className="text-base font-bold text-primary font-display">
                          {i + 1}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 inset-x-0" aria-hidden>
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
