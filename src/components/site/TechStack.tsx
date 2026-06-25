"use client";

import { motion } from "framer-motion";
import { TECH_STACK, DESIGN_PRINCIPLES } from "@/lib/daisy-data";
import { SectionHeader } from "./Features";

export function TechStack() {
  return (
    <section id="tech" className="py-20 md:py-28 scroll-mt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Under the hood"
          title={
            <>
              A modular monolith, <span className="text-primary">layered by design</span>
            </>
          }
          description="DaisyFlower is built with TypeScript end-to-end, Domain-Driven Design, and an event-driven domain layer. Commands receive input, viewers render UI, services own the rules, repositories persist, managers own infrastructure."
        />

        <div className="mt-14 grid lg:grid-cols-3 gap-5 md:gap-6">
          {TECH_STACK.map((tech, i) => (
            <motion.article
              key={tech.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="card-garden card-garden-hover rounded-2xl p-5 border"
            >
              <div className="flex items-center justify-between">
                <span className="grid place-items-center h-12 w-12 rounded-xl bg-secondary text-2xl">
                  {tech.emoji}
                </span>
                <span className="text-[11px] font-mono font-semibold text-primary bg-primary/10 px-2 py-1 rounded-md">
                  {tech.version}
                </span>
              </div>
              <h3 className="mt-4 font-display text-lg font-bold text-foreground">{tech.name}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground text-pretty">{tech.role}</p>
            </motion.article>
          ))}
        </div>

        {/* Architecture diagram */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-12 card-garden rounded-3xl p-6 md:p-10 border"
        >
          <h3 className="font-display text-xl md:text-2xl font-bold text-foreground text-center">
            System architecture
          </h3>
          <p className="mt-2 text-sm text-muted-foreground text-center max-w-2xl mx-auto text-pretty">
            Every layer has a single responsibility. Redis is an acceleration layer — gameplay
            remains recoverable after Redis loss. MongoDB is the durable source of truth.
          </p>

          <div className="mt-8 space-y-3 max-w-3xl mx-auto">
            <ArchLayer
              tone="leaf"
              label="Discord Gateway"
              sublabel="Slash commands · buttons · select menus · modals"
            />
            <ArchConnector />
            <ArchLayer
              tone="sun"
              label="Handlers · Middlewares · Viewers"
              sublabel="CommandHandler · InteractionHandler · Cooldown / Profile / Blacklist / Terms"
            />
            <ArchConnector />
            <ArchLayer
              tone="leaf"
              label="Domain Services"
              sublabel="GardenService · EconomyService · InventoryService · UserService · ShopManager"
            />
            <ArchConnector />
            <ArchLayer
              tone="sky"
              label="Managers · Repositories"
              sublabel="Database · Cache · Weather · GameData · i18n · LiveConfig"
            />
            <ArchConnector />
            <ArchLayer
              tone="rose"
              label="EventBus · System Listeners"
              sublabel="XPListener · MissionListener · LiveConfigListener"
            />
          </div>
        </motion.div>

        {/* Design principles */}
        <div className="mt-16">
          <h3 className="text-center font-display text-2xl md:text-3xl font-bold text-foreground">
            Design principles
          </h3>
          <div className="mt-8 grid sm:grid-cols-2 gap-5 max-w-4xl mx-auto">
            {DESIGN_PRINCIPLES.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="rounded-2xl border border-border bg-card/60 backdrop-blur-sm p-5"
              >
                <div className="flex items-start gap-3">
                  <span
                    className="grid place-items-center h-8 w-8 shrink-0 rounded-lg bg-leaf-gradient text-primary-foreground font-display font-bold text-sm"
                    aria-hidden
                  >
                    {i + 1}
                  </span>
                  <div>
                    <h4 className="font-display text-base font-bold text-foreground">{p.title}</h4>
                    <p className="mt-1 text-sm text-muted-foreground text-pretty">{p.description}</p>
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
  leaf: { bg: "bg-leaf-gradient", text: "text-primary-foreground" },
  sun: { bg: "bg-sun-gradient", text: "text-accent-foreground" },
  sky: { bg: "bg-gradient-to-r from-sky-soft to-leaf-soft", text: "text-foreground" },
  rose: { bg: "bg-gradient-to-r from-rose-petal to-sun-deep", text: "text-primary-foreground" },
} as const;

function ArchLayer({
  tone,
  label,
  sublabel,
}: {
  tone: keyof typeof TONES;
  label: string;
  sublabel: string;
}) {
  const t = TONES[tone];
  return (
    <div
      className={
        "rounded-2xl px-5 py-4 text-center shadow-sm " + t.bg + " " + t.text
      }
    >
      <p className="font-display text-base md:text-lg font-bold">{label}</p>
      <p className="mt-0.5 text-[11px] md:text-xs opacity-90 font-mono">{sublabel}</p>
    </div>
  );
}

function ArchConnector() {
  return (
    <div className="flex justify-center" aria-hidden>
      <svg width="24" height="20" viewBox="0 0 24 20" fill="none">
        <path
          d="M12 0 V14 M6 10 L12 16 L18 10"
          stroke="oklch(0.55 0.135 145 / 0.4)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
