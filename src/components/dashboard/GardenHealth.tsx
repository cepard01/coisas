"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { SunIcon, DropletIcon, SproutIcon } from "@/components/icons";

/**
 * Garden health indicator — combines humidity, weather, and plant status
 * into a single "health" score with a visual gauge.
 */
export function GardenHealth({
  humidity,
  weather,
  readyCount,
  totalSlots,
  className,
}: {
  humidity: number;
  weather: string;
  readyCount: number;
  totalSlots: number;
  className?: string;
}) {
  // Calculate health score (0-100)
  const humidityScore = Math.min(humidity, 100) / 100 * 40; // 40% weight
  const plantScore = (totalSlots - readyCount) / totalSlots * 30; // 30% weight (more growing = healthier)
  const weatherBonus = weather === "Sunny" || weather === "Rainy" ? 30 : 15; // 30% weight
  const health = Math.round(humidityScore + plantScore + weatherBonus);

  const healthLabel = health >= 80 ? "Thriving" : health >= 60 ? "Healthy" : health >= 40 ? "Needs attention" : "Critical";
  const healthColor = health >= 80 ? "bg-sage" : health >= 60 ? "bg-gold" : health >= 40 ? "bg-terra" : "bg-destructive";
  const healthTextColor = health >= 80 ? "text-sage" : health >= 60 ? "text-gold-deep" : health >= 40 ? "text-terra-deep" : "text-destructive";

  return (
    <div className={cn("rounded-lg border border-border bg-background p-3", className)}>
      <div className="flex items-center justify-between mb-2">
        <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Garden health</p>
        <span className={cn("font-mono text-[10px] font-semibold uppercase", healthTextColor)}>
          {healthLabel}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex-1 h-2 rounded-full bg-secondary overflow-hidden">
          <motion.div
            className={cn("h-full rounded-full", healthColor)}
            initial={{ width: 0 }}
            animate={{ width: `${health}%` }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
        <span className="font-display text-sm font-medium text-foreground tabular shrink-0">
          {health}
        </span>
      </div>
      <div className="mt-2 flex items-center gap-3 text-[10px] text-muted-foreground">
        <span className="flex items-center gap-1">
          <DropletIcon size={10} /> {Math.round(humidity)}%
        </span>
        <span className="flex items-center gap-1">
          <SunIcon size={10} /> {weather}
        </span>
        <span className="flex items-center gap-1">
          <SproutIcon size={10} /> {readyCount} ready
        </span>
      </div>
    </div>
  );
}
