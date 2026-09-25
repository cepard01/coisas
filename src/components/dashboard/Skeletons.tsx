"use client";

import { motion } from "framer-motion";

/* ── Skeleton components for dashboard loading states ────────────────── */

export function DashboardSkeleton() {
  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-secondary/30">
        <SkeletonLine width="w-32" />
        <SkeletonLine width="w-16" />
      </div>
      <div className="p-5 sm:p-6 lg:p-8">
        <div className="flex items-start justify-between gap-4 mb-7">
          <div>
            <SkeletonLine width="w-40" height="h-7" />
            <SkeletonLine width="w-56" height="h-4" className="mt-2" />
          </div>
          <SkeletonLine width="w-24" height="h-8" rounded="rounded-full" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-7">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="rounded-lg border border-border bg-background p-3">
              <SkeletonLine width="w-4" height="h-4" className="mb-2" />
              <SkeletonLine width="w-12" height="h-5" className="mb-1" />
              <SkeletonLine width="w-16" height="h-3" />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="rounded-lg border border-border bg-background p-3">
              <div className="flex items-center justify-between mb-2">
                <SkeletonLine width="w-6" height="h-6" rounded="rounded-full" />
                <SkeletonLine width="w-12" height="h-3" />
              </div>
              <SkeletonLine width="w-20" height="h-4" className="mb-2" />
              <SkeletonLine width="w-full" height="h-1" rounded="rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function SkeletonLine({
  width = "w-20",
  height = "h-4",
  rounded = "rounded",
  className = "",
}: {
  width?: string;
  height?: string;
  rounded?: string;
  className?: string;
}) {
  return (
    <div
      className={`${width} ${height} ${rounded} bg-secondary animate-pulse ${className}`}
    />
  );
}

/* ── Empty state component ───────────────────────────────────────────── */

export function EmptyState({
  emoji,
  title,
  description,
  action,
}: {
  emoji: string;
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center justify-center py-16 text-center"
    >
      <div className="text-5xl mb-4 opacity-40">{emoji}</div>
      <h3 className="font-display text-lg font-medium text-foreground">{title}</h3>
      <p className="mt-1.5 text-sm text-muted-foreground text-pretty max-w-sm">{description}</p>
      {action && <div className="mt-5">{action}</div>}
    </motion.div>
  );
}
