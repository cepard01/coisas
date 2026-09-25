"use client";

import { motion, useScroll, useSpring, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/* ── 1. ScrollProgress — thin bar at top showing scroll position ─────── */

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-0.5 bg-sage origin-left z-[60]"
      style={{ scaleX }}
      aria-hidden
    />
  );
}

/* ── 2. CountUp — animated number counter ────────────────────────────── */

export function CountUp({
  value,
  duration = 1.4,
  className,
  format = true,
}: {
  value: number;
  duration?: number;
  className?: string;
  format?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(v),
    });
    return () => controls.stop();
  }, [isInView, value, duration]);

  const formatted = format ? Math.round(display).toLocaleString() : String(Math.round(display));

  return (
    <span ref={ref} className={className}>
      {formatted}
    </span>
  );
}

/* ── 3. StaggerReveal — staggered reveal for grid children ───────────── */

export function StaggerReveal({
  children,
  className,
  stagger = 0.06,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: stagger, delayChildren: delay },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 16 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── 4. CardHover — subtle lift + border glow on hover ───────────────── */

export function CardHover({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className={cn("transition-shadow duration-300 hover:shadow-lg hover:shadow-foreground/[0.04]", className)}
    >
      {children}
    </motion.div>
  );
}

/* ── 5. TextReveal — words fade up sequentially ──────────────────────── */

export function TextReveal({
  text,
  className,
  highlight,
  highlightClassName,
}: {
  text: string;
  className?: string;
  highlight?: string;
  highlightClassName?: string;
}) {
  const words = text.split(" ");

  return (
    <motion.span
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: 0.04 },
        },
      }}
      className={className}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: { opacity: 0, y: 12 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
            },
          }}
          className="inline-block"
        >
          {word}
          {highlight && i === words.length - 1 ? (
            <>
              {" "}
              <em className={highlightClassName}>{highlight}</em>
            </>
          ) : (
            i < words.length - 1 ? "\u00A0" : ""
          )}
        </motion.span>
      ))}
    </motion.span>
  );
}

/* ── 6. AnimatedProgress — progress bar that fills on view ───────────── */

export function AnimatedProgress({
  value,
  className,
  barClassName,
  delay = 0,
}: {
  value: number;
  className?: string;
  barClassName?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <div ref={ref} className={cn("h-1.5 w-full rounded-full bg-secondary overflow-hidden", className)}>
      <motion.div
        className={cn("h-full rounded-full bg-sage", barClassName)}
        initial={{ width: 0 }}
        animate={isInView ? { width: `${value}%` } : { width: 0 }}
        transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  );
}

/* ── 7. MagneticButton — button that subtly follows cursor ───────────── */

export function MagneticButton({
  children,
  className,
  href,
  onClick,
}: {
  children: ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) * 0.15;
    const deltaY = (e.clientY - centerY) * 0.15;
    x.set(deltaX);
    y.set(deltaY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const springConfig = { stiffness: 200, damping: 15 };
  const sx = useSpring(x, springConfig);
  const sy = useSpring(y, springConfig);

  const content = (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
    >
      {children}
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return (
    <button onClick={onClick} className="contents">
      {content}
    </button>
  );
}

/* ── 8. FloatingElement — gentle floating animation ──────────────────── */

export function FloatingElement({
  children,
  className,
  delay = 0,
  amplitude = 8,
  duration = 6,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  amplitude?: number;
  duration?: number;
}) {
  return (
    <motion.div
      animate={{ y: [0, -amplitude, 0] }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── 9. FadeIn — simple fade in on view ──────────────────────────────── */

export function FadeIn({
  children,
  className,
  delay = 0,
  y = 12,
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
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
      style={{ opacity: 0, y }}
    >
      {children}
    </motion.div>
  );
}
