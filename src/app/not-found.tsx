"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useI18n } from "@/hooks/use-i18n";
import { ArrowRightIcon } from "@/components/site/icons";

export default function NotFound() {
  const { t } = useI18n();

  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-32 min-h-[60vh] grid place-items-center">
      <div className="mx-auto max-w-lg px-5 sm:px-6 text-center">
        {/* Wilted plant SVG */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8"
        >
          <svg viewBox="0 0 120 100" className="w-32 h-28 mx-auto" fill="none" aria-hidden>
            {/* Pot */}
            <path
              d="M35 60 L40 95 L80 95 L85 60 Z"
              fill="oklch(0.55 0.08 45)"
              opacity="0.8"
            />
            <path
              d="M33 55 L87 55 L85 62 L35 62 Z"
              fill="oklch(0.48 0.07 45)"
            />
            {/* Soil */}
            <ellipse cx="60" cy="57" rx="25" ry="3" fill="oklch(0.35 0.04 50)" />

            {/* Wilted stem */}
            <motion.path
              d="M60 55 Q 58 40 50 30 Q 45 25 40 20"
              stroke="oklch(0.42 0.06 145)"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
              animate={{ pathLength: [0, 1] }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />

            {/* Drooping leaf left */}
            <motion.ellipse
              cx="48"
              cy="32"
              rx="8"
              ry="4"
              fill="oklch(0.5 0.07 145)"
              transform="rotate(60 48 32)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            />

            {/* Drooping flower head */}
            <motion.g
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
            >
              <circle cx="40" cy="20" r="8" fill="oklch(0.55 0.08 145)" opacity="0.6" />
              <circle cx="38" cy="18" r="3" fill="oklch(0.5 0.07 145)" opacity="0.4" />
            </motion.g>

            {/* Second wilted stem */}
            <motion.path
              d="M60 55 Q 65 42 72 35 Q 78 30 82 28"
              stroke="oklch(0.42 0.06 145)"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
              animate={{ pathLength: [0, 1] }}
              transition={{ duration: 1.5, delay: 0.3, ease: "easeInOut" }}
            />

            {/* Drooping leaf right */}
            <motion.ellipse
              cx="74"
              cy="36"
              rx="6"
              ry="3"
              fill="oklch(0.5 0.07 145)"
              transform="rotate(-50 74 36)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.5 }}
            />

            {/* Small drooping bud */}
            <motion.circle
              cx="82"
              cy="28"
              r="4"
              fill="oklch(0.55 0.08 145)"
              opacity="0.4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              transition={{ delay: 1.5, duration: 0.5 }}
            />

            {/* Water drop falling */}
            <motion.circle
              cx="60"
              cy="25"
              r="2"
              fill="oklch(0.7 0.08 220)"
              animate={{
                cy: [25, 50, 25],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeIn",
              }}
            />
          </svg>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="font-mono text-[11px] uppercase tracking-[0.18em] text-sage font-semibold"
        >
          {t.notFound.code}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-3 font-display text-4xl sm:text-5xl font-medium tracking-tight text-foreground text-balance leading-[1.05]"
        >
          {t.notFound.title}{" "}
          <em className="font-normal text-sage">{t.notFound.highlight}</em>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-5 text-base text-muted-foreground text-pretty leading-relaxed"
        >
          {t.notFound.body}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
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
        </motion.div>
      </div>
    </section>
  );
}
