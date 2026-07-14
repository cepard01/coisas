"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PlusIcon, MinusIcon } from "./icons";
import { FAQS } from "@/lib/daisy-data";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 md:py-32 border-t border-border">
      <div className="mx-auto max-w-3xl px-5 sm:px-6">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 text-muted-foreground">
            <span className="font-mono text-xs marker-num">03</span>
            <span className="h-px w-8 bg-border" />
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-sage font-semibold">
              Perguntas
            </span>
          </div>
          <h2 className="mt-5 font-display text-4xl sm:text-5xl font-medium tracking-tight text-foreground text-balance leading-[1.05]">
            Tudo que você{" "}
            <em className="font-normal text-sage">quer saber.</em>
          </h2>
        </div>

        <div className="space-y-2">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className="rounded-xl border border-border bg-card overflow-hidden">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-secondary/30 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="font-display text-base font-medium text-foreground text-pretty">
                    {item.question}
                  </span>
                  <span className="grid place-items-center h-6 w-6 rounded-full bg-secondary text-muted-foreground shrink-0">
                    {isOpen ? <MinusIcon size={13} /> : <PlusIcon size={13} />}
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
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
