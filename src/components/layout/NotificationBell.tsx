"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface Notification {
  id: string;
  emoji: string;
  title: string;
  time: string;
  read: boolean;
  type: "harvest" | "weather" | "mutation" | "mission" | "system";
}

const MOCK_NOTIFICATIONS: Notification[] = [
  { id: "1", emoji: "🌻", title: "Your Sunflower is ready to harvest!", time: "2m ago", read: false, type: "harvest" },
  { id: "2", emoji: "🌧️", title: "Weather changed to Rainy", time: "1h ago", read: false, type: "weather" },
  { id: "3", emoji: "🎯", title: "Daily mission reset — 3 new missions available", time: "3h ago", read: false, type: "mission" },
  { id: "4", emoji: "🌸", title: "Rare mutation discovered: Pink Rose!", time: "2d ago", read: true, type: "mutation" },
  { id: "5", emoji: "📈", title: "You reached Level 7!", time: "3d ago", read: true, type: "system" },
];

export function NotificationBell() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const ref = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const typeColors: Record<string, string> = {
    harvest: "bg-sage",
    weather: "bg-sky-soft",
    mutation: "bg-terra",
    mission: "bg-gold",
    system: "bg-foreground/30",
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="relative grid place-items-center h-9 w-9 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
        aria-label="Notifications"
      >
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 9a6 6 0 0 1 12 0c0 4 1.5 5 2 6H4c.5-1 2-2 2-6Z" />
          <path d="M10 19a2 2 0 0 0 4 0" />
        </svg>
        {unreadCount > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute top-1 right-1 grid place-items-center h-4 min-w-4 px-1 rounded-full bg-terra text-white text-[9px] font-bold"
          >
            {unreadCount}
          </motion.span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="absolute right-0 top-full mt-2 w-80 z-50 bg-card border border-border rounded-xl shadow-lg overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border">
              <p className="font-display text-sm font-medium text-foreground">Notifications</p>
              {unreadCount > 0 && (
                <button
                  onClick={markAllRead}
                  className="text-[11px] font-medium text-sage hover:underline"
                >
                  Mark all read
                </button>
              )}
            </div>

            {/* List */}
            <div className="max-h-80 overflow-y-auto scrollbar-soft">
              {notifications.length === 0 ? (
                <div className="py-8 text-center">
                  <p className="text-sm text-muted-foreground">No notifications</p>
                </div>
              ) : (
                notifications.map((n) => (
                  <motion.div
                    key={n.id}
                    layout
                    className={cn(
                      "flex items-start gap-3 px-4 py-3 border-b border-border last:border-b-0 transition-colors cursor-pointer",
                      !n.read ? "bg-sage/[0.04]" : "hover:bg-secondary/30"
                    )}
                  >
                    <span className={cn("h-2 w-2 rounded-full mt-1.5 shrink-0", typeColors[n.type])} />
                    <span className="text-lg shrink-0">{n.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <p className={cn("text-sm text-pretty", !n.read ? "font-medium text-foreground" : "text-muted-foreground")}>
                        {n.title}
                      </p>
                      <p className="font-mono text-[10px] text-muted-foreground mt-0.5">{n.time}</p>
                    </div>
                    {!n.read && (
                      <span className="h-2 w-2 rounded-full bg-terra shrink-0 mt-1.5" />
                    )}
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="px-4 py-2.5 border-t border-border text-center">
              <p className="font-mono text-[10px] text-muted-foreground">
                {unreadCount > 0 ? `${unreadCount} unread` : "All caught up"}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
