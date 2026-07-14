"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { SectionHeading } from "./Features";

const FAQS = [
  {
    q: "Is DaisyFlower free to use?",
    a: "Yes. DaisyFlower is open source under the MIT license and completely free to add to your Discord server. There's no premium currency, no paywalls, and no plans to add any. The starter kit is identical for every player.",
  },
  {
    q: "Do I need to keep the bot open for plants to grow?",
    a: "No. Plants grow using lazy deterministic simulation — they store timestamps, not timers. When you open your garden or harvest, DaisyFlower computes the current state from time, weather history, and hydration. You can close Discord and come back hours later.",
  },
  {
    q: "How does the weather affect my garden?",
    a: "Weather rotates on a 4-hour cycle. Sunny boosts growth by 1.5× but drains water 2× faster. Rain refills soil for free. Storms slow growth but unlock rare mutation chances. Snow slows everything but hints at future winter plants. The UI always explains the current effect in plain language.",
  },
  {
    q: "How do mutations work?",
    a: "Plant compatible seeds side by side — for example, a Red Rose and a White Rose. When both mature, there's a 30% chance one will bloom as a rare Pink Rose. The UI shows hints when adjacency is right, and discoveries are recorded in your Collection Book.",
  },
  {
    q: "What languages does DaisyFlower support?",
    a: "Portuguese (pt-BR) and English (en-US) ship out of the box, with per-command translation files and Discord locale auto-detection. Adding a new language is just a folder of JSON files — no code changes required.",
  },
  {
    q: "What happens if Redis goes down?",
    a: "Nothing breaks. Redis is an acceleration layer — MongoDB is the durable source of truth. The bot automatically enters failover mode and continues serving gameplay from the database. When Redis recovers, caching resumes transparently.",
  },
  {
    q: "Can I add my own plants or content?",
    a: "If you self-host, yes. Plants, weather, mutations, items, and decorations are all data-driven JSON files in src/data. Add a new object, restart, and it appears in the shop, autocomplete, and validation. The website you're reading right now is also open source.",
  },
  {
    q: "Is the project finished?",
    a: "Not yet. DaisyFlower is in active development. The architecture, core loop, shop, inventory, weather, and most commands are implemented. Mutations, missions, and the collection book are partially done. See the audit-roadmap.md in the repo for current status.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 md:py-32 scroll-mt-16 border-t border-border bg-background relative overflow-hidden">

      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 text-muted-foreground">
            <span className="font-mono text-xs marker-num">08</span>
            <span className="h-px w-8 bg-border" />
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-sage font-semibold">FAQ</span>
          </div>
          <h2 className="mt-5 font-display text-4xl sm:text-5xl font-semibold tracking-tight text-foreground text-balance leading-[1.05]">
            Questions, <em className="font-normal text-sage">answered.</em>
          </h2>
        </div>

        <div className="mt-12 space-y-2">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                className="rounded-xl border border-border bg-card overflow-hidden"
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-secondary/30 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="font-display text-base font-semibold text-foreground text-pretty">
                    {item.q}
                  </span>
                  <span className="grid place-items-center h-6 w-6 rounded-full bg-secondary text-muted-foreground shrink-0">
                    {isOpen ? <Minus className="h-3 w-3" /> : <Plus className="h-3 w-3" />}
                  </span>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={false}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-sm text-muted-foreground text-pretty leading-relaxed">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          Still curious?{" "}
          <a
            href="https://github.com/cepard01/daisyflower/tree/main/docs"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-sage hover:underline"
          >
            Read the full documentation ↗
          </a>
        </p>
      </div>
    </section>
  );
}
