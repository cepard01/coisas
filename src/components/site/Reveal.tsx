"use client";

import { motion, type MotionProps } from "framer-motion";
import { type ReactNode } from "react";

/**
 * SSR-safe reveal animation wrapper.
 *
 * Uses `whileInView` so the server-rendered HTML does NOT include
 * `opacity: 0` inline styles (which cause hydration mismatches when
 * Framer Motion immediately animates them on the client).
 *
 * The element renders visible by default, and only animates if the
 * user scrolls it into view on the client. With `viewport={{ once: true }}`,
 * the animation runs exactly once and then the element stays visible.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 16,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "section" | "article" | "li";
}) {
  const MotionTag = motion[as];
  return (
    <MotionTag
      initial={false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      className={className}
      // Start from a slightly offset position; the browser will paint
      // this on the first client render, then animate to the final state.
      style={{ animationDelay: `${delay}ms` }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </MotionTag>
  );
}

/**
 * Variant that starts hidden — only use this for elements that are
 * guaranteed to be below the fold on first paint (so the hidden state
 * is never visible to the user during hydration).
 */
export function RevealHidden({
  children,
  className,
  delay = 0,
  y = 16,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  return (
    <motion.div
      initial={false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
