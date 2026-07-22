"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";

/**
 * SSR-safe reveal animation. Uses whileInView with initial={false}
 * so the server-rendered HTML doesn't include opacity:0 inline styles
 * (which cause hydration mismatches).
 */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
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
