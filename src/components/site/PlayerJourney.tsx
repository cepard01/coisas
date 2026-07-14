"use client";

import { motion } from "framer-motion";
import { JOURNEY_PHASES } from "@/lib/daisy-data";
import { SectionHeading } from "./Features";

export function PlayerJourney() {
  return (
    <section id="journey" className="py-24 md:py-32 scroll-mt-16 border-t border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          number="07"
          eyebrow="Progression"
          title={
            <>
              From first seed
              <br className="hidden sm:block" /> <em className="font-normal text-sage">to rare mutation.</em>
            </>
          }
          description="DaisyFlower unlocks complexity gradually. Players master the basic loop first, then collect, mutate, decorate, and eventually pursue rare mutations and seasonal events."
        />

        {/* Vertical timeline */}
        <div className="mt-16 max-w-3xl mx-auto relative">
          {/* Line */}
          <div className="absolute left-[19px] sm:left-1/2 top-0 bottom-0 w-px bg-border sm:-translate-x-1/2" aria-hidden />

          <div className="space-y-8">
            {JOURNEY_PHASES.map((phase, i) => (
              <motion.div
                key={phase.level}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="relative pl-12 sm:pl-0 sm:grid sm:grid-cols-2 sm:gap-8 sm:items-center"
              >
                {/* Dot */}
                <div className="absolute left-0 sm:left-1/2 sm:-translate-x-1/2 top-1 z-10">
                  <div className="grid place-items-center h-10 w-10 rounded-full bg-card border-2 border-sage shadow-sm">
                    <span className="text-base">{phase.emoji}</span>
                  </div>
                </div>

                {/* Card */}
                <div className={i % 2 === 0 ? "sm:pr-8 sm:text-right" : "sm:col-start-2 sm:pl-8"}>
                  <div className="rounded-2xl border border-border bg-card p-5">
                    <p className="font-mono text-[11px] uppercase tracking-wider text-sage font-semibold">
                      {phase.level}
                    </p>
                    <h3 className="mt-1 font-display text-lg font-semibold text-foreground">
                      {phase.title}
                    </h3>
                    <ul className={"mt-3 space-y-1 text-sm text-muted-foreground " + (i % 2 === 0 ? "sm:text-right" : "")}>
                      {phase.unlocks.map((u) => (
                        <li key={u} className={"flex items-center gap-2 " + (i % 2 === 0 ? "sm:flex-row-reverse" : "")}>
                          <span className="text-sage shrink-0">·</span>
                          <span>{u}</span>
                        </li>
                      ))}
                    </ul>
                    <div className={"mt-3 pt-3 border-t border-border " + (i % 2 === 0 ? "sm:text-right" : "")}>
                      <p className="text-xs text-muted-foreground">
                        <span className="font-semibold text-foreground">Goal:</span> {phase.goal}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
