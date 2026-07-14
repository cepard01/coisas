"use client";

import { motion } from "framer-motion";
import { TECH_STACK, DESIGN_PRINCIPLES } from "@/lib/daisy-data";
import { SectionHeading } from "./Features";

export function TechStack() {
  return (
    <section id="tech" className="py-24 md:py-32 scroll-mt-16 border-t border-border bg-paper-warm relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-paper-grain opacity-40" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          number="06"
          eyebrow="Engineering"
          title={
            <>
              A modular monolith,
              <br className="hidden sm:block" /> <em className="font-normal text-sage">layered by design.</em>
            </>
          }
          description="TypeScript end-to-end, Domain-Driven Design, and an event-driven domain layer. Commands receive input, viewers render UI, services own the rules, repositories persist, managers own infrastructure."
        />

        {/* Tech grid */}
        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border rounded-2xl overflow-hidden border border-border">
          {TECH_STACK.map((tech, i) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className="bg-card p-5 sm:p-6 group hover:bg-secondary/30 transition-colors"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl">{tech.emoji}</span>
                <span className="font-mono text-[10px] text-sage bg-sage/10 px-2 py-0.5 rounded">{tech.version}</span>
              </div>
              <h3 className="font-display text-base font-semibold text-foreground">{tech.name}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground text-pretty leading-relaxed">{tech.role}</p>
            </motion.div>
          ))}
        </div>

        {/* Architecture diagram */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-12 rounded-2xl border border-border bg-card p-6 sm:p-10"
        >
          <div className="text-center mb-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-sage font-semibold">System architecture</p>
            <h3 className="mt-2 font-display text-2xl font-semibold text-foreground">How a request flows</h3>
            <p className="mt-2 text-sm text-muted-foreground max-w-2xl mx-auto text-pretty">
              Every layer has a single responsibility. Redis is an acceleration layer — gameplay
              remains recoverable after Redis loss. MongoDB is the durable source of truth.
            </p>
          </div>

          <div className="max-w-2xl mx-auto space-y-2">
            <ArchLayer n="1" label="Discord Gateway" sub="slash · buttons · menus · modals" tone="sage" />
            <ArchArrow />
            <ArchLayer n="2" label="Handlers · Middlewares · Viewers" sub="cooldown · profile · blacklist · terms" tone="gold" />
            <ArchArrow />
            <ArchLayer n="3" label="Domain Services" sub="Garden · Economy · Inventory · User · Shop" tone="sage" />
            <ArchArrow />
            <ArchLayer n="4" label="Managers · Repositories" sub="Database · Cache · Weather · GameData · i18n" tone="sky" />
            <ArchArrow />
            <ArchLayer n="5" label="EventBus · Listeners" sub="XP · Missions · LiveConfig" tone="terra" />
          </div>
        </motion.div>

        {/* Design principles */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-sage font-semibold">Design principles</p>
            <h3 className="mt-2 font-display text-2xl font-semibold text-foreground">How we think about the player</h3>
          </div>
          <div className="grid sm:grid-cols-2 gap-5 max-w-4xl mx-auto">
            {DESIGN_PRINCIPLES.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="rounded-2xl border border-border bg-card p-5"
              >
                <div className="flex items-start gap-3">
                  <span className="font-display text-xl font-semibold text-sage marker-num shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h4 className="font-display text-base font-semibold text-foreground">{p.title}</h4>
                    <p className="mt-1 text-sm text-muted-foreground text-pretty leading-relaxed">{p.description}</p>
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

const TONES = {
  sage: "border-sage/30 bg-sage/[0.06] text-sage-deep",
  gold: "border-gold/30 bg-gold/[0.06] text-gold-deep",
  sky: "border-sky-soft/40 bg-sky-soft/[0.08] text-foreground",
  terra: "border-terra/30 bg-terra/[0.06] text-terra-deep",
} as const;

function ArchLayer({
  n,
  label,
  sub,
  tone,
}: {
  n: string;
  label: string;
  sub: string;
  tone: keyof typeof TONES;
}) {
  return (
    <div className={`rounded-xl border px-5 py-3.5 flex items-center gap-4 ${TONES[tone]}`}>
      <span className="font-display text-lg font-semibold marker-num shrink-0">{n}</span>
      <div className="flex-1">
        <p className="font-display text-sm font-semibold text-foreground">{label}</p>
        <p className="font-mono text-[11px] text-muted-foreground">{sub}</p>
      </div>
    </div>
  );
}

function ArchArrow() {
  return (
    <div className="flex justify-center" aria-hidden>
      <svg width="14" height="18" viewBox="0 0 14 18" fill="none">
        <path d="M7 0 V12 M3 9 L7 14 L11 9" stroke="oklch(0.5 0.07 145 / 0.4)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}
