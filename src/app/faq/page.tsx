"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { Reveal } from "@/components/utils/Reveal";
import { useI18n } from "@/components/providers/I18nProvider";
import { PlusIcon, MinusIcon, ArrowRightIcon } from "@/components/icons";
import { Breadcrumb } from "@/components/layout/Breadcrumb";

export default function FaqPage() {
  const { t } = useI18n();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: t.nav.faq },
        ]}
      />
      <PageHeader
        number={t.faq.number}
        eyebrow={t.faq.eyebrow}
        title={
          <>
            {t.faq.title}{" "}
            <em className="font-normal text-sage">{t.faq.highlight}</em>
          </>
        }
        description={t.faq.description}
      />

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-5 sm:px-6">
          <div className="space-y-2">
            {t.faq.items.map((item, i) => {
              const isOpen = open === i;
              return (
                <Reveal key={i} delay={Math.min(i * 0.03, 0.2)}>
                  <div className="rounded-xl border border-border bg-card overflow-hidden">
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
                </Reveal>
              );
            })}
          </div>

          {/* Still have questions */}
          <Reveal delay={0.2}>
            <div className="mt-12 rounded-xl border border-border bg-card p-6 text-center">
              <p className="font-display text-lg font-medium text-foreground">
                {t.faq.stillQuestions}
              </p>
              <p className="mt-2 text-sm text-muted-foreground text-pretty">
                {t.faq.stillBody}
              </p>
              <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
                <a
                  href="https://github.com/cepard01/daisyflower/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-secondary transition-colors"
                >
                  {t.faq.githubIssues}
                </a>
                <Link
                  href="/get-started"
                  className="group inline-flex items-center gap-2 rounded-lg bg-foreground text-background px-4 py-2 text-sm font-medium hover:bg-foreground/90 transition-colors"
                >
                  {t.nav.getStarted}
                  <ArrowRightIcon size={14} className="transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
