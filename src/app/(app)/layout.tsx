"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useI18n } from "@/components/providers/I18nProvider";
import { useAuth } from "@/hooks/use-auth";
import { AuthModal } from "@/components/modals/AuthModal";
import {
  SproutIcon,
  WalletIcon,
  ListIcon,
  BookIcon,
  ShopIcon,
  WeatherIcon,
  SparkIcon,
  GearIcon,
  MenuIcon,
  CloseIcon,
  ArrowRightIcon,
  DaisyMark,
} from "@/components/icons";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { cn } from "@/lib/utils";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { t } = useI18n();
  const { player, signIn, signOut, hydrated } = useAuth();
  const pathname = usePathname();
  const [authOpen, setAuthOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  const navItems = [
    { href: "/panel", label: t.panel.dashboard.tabs.garden, icon: SproutIcon },
    { href: "/panel?tab=wallet", label: t.panel.dashboard.tabs.wallet, icon: WalletIcon },
    { href: "/panel?tab=missions", label: t.panel.dashboard.tabs.missions, icon: ListIcon },
    { href: "/panel?tab=collection", label: t.panel.dashboard.tabs.collection, icon: BookIcon },
    { href: "/panel?tab=shop", label: t.panel.dashboard.tabs.shop, icon: ShopIcon },
    { href: "/panel?tab=weather", label: t.panel.dashboard.tabs.weather, icon: WeatherIcon },
    { href: "/panel?tab=achievements", label: "Badges", icon: SparkIcon },
  ];

  const accountItems = [
    { href: "/profile", label: "Profile", icon: DaisyMark },
    { href: "/settings", label: t.panel.dashboard.settings, icon: GearIcon },
    { href: "/leaderboard", label: "Leaderboard", icon: SparkIcon },
    { href: "/changelog", label: "Changelog", icon: BookIcon },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* App top bar */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-xl">
        <div className="flex h-14 items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen((v) => !v)}
              className="lg:hidden grid place-items-center h-9 w-9 rounded-lg hover:bg-secondary transition-colors"
              aria-label="Toggle sidebar"
            >
              {sidebarOpen ? <CloseIcon size={18} /> : <MenuIcon size={18} />}
            </button>
            <Link href="/" className="flex items-center gap-2 group">
              <DaisyMark size={22} className="text-terra transition-transform group-hover:rotate-12" />
              <span className="font-display text-base font-semibold tracking-tight text-foreground">
                DaisyFlower
              </span>
              <span className="hidden sm:inline font-mono text-[10px] text-muted-foreground border border-border rounded px-1.5 py-0.5">
                app
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-1.5">
            <ThemeToggle />
            <LanguageSwitcher compact />
            <div className="w-px h-5 bg-border mx-0.5" />
            {hydrated && player ? (
              <div className="flex items-center gap-2 rounded-full border border-border bg-card pl-1 pr-2.5 py-1">
                <span className="grid place-items-center h-7 w-7 rounded-full bg-sage/15">
                  <DaisyMark size={15} className="text-sage" />
                </span>
                <span className="text-sm font-medium text-foreground max-w-[90px] truncate hidden sm:inline">
                  {player.username}
                </span>
                <span className="font-mono text-[10px] text-muted-foreground hidden sm:inline">
                  Lv {player.level}
                </span>
              </div>
            ) : (
              <button
                onClick={() => setAuthOpen(true)}
                className="rounded-lg bg-foreground text-background px-3 py-1.5 text-sm font-medium hover:bg-foreground/90 transition-colors"
              >
                {t.nav.signIn}
              </button>
            )}
          </div>
        </div>
      </header>

      <div className="flex-1 flex">
        {/* Sidebar — desktop */}
        <aside className="hidden lg:flex w-56 flex-col border-r border-border bg-card/50 p-3 sticky top-14 h-[calc(100vh-3.5rem)]">
          <AppSidebar navItems={navItems} accountItems={accountItems} pathname={pathname} player={player} signOut={signOut} hydrated={hydrated} t={t} />
        </aside>

        {/* Sidebar — mobile drawer */}
        <AnimatePresence>
          {sidebarOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden fixed inset-0 z-40 bg-ink/40 backdrop-blur-sm"
              />
              <motion.aside
                initial={{ x: -280 }}
                animate={{ x: 0 }}
                exit={{ x: -280 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="lg:hidden fixed left-0 top-14 bottom-0 z-50 w-64 bg-card border-r border-border p-3 overflow-y-auto"
              >
                <AppSidebar navItems={navItems} accountItems={accountItems} pathname={pathname} player={player} signOut={signOut} hydrated={hydrated} t={t} />
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* Main content */}
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {children}
          </motion.div>
        </main>
      </div>

      <AuthModal open={authOpen} onOpenChange={setAuthOpen} onAuthenticated={signIn} />
    </div>
  );
}

function AppSidebar({
  navItems,
  accountItems,
  pathname,
  player,
  signOut,
  hydrated,
  t,
}: {
  navItems: any[];
  accountItems: any[];
  pathname: string;
  player: any;
  signOut: () => void;
  hydrated: boolean;
  t: any;
}) {
  return (
    <div className="flex flex-col h-full">
      {/* User card */}
      {hydrated && player && (
        <div className="flex items-center gap-2.5 p-2 rounded-lg border border-border bg-background mb-3">
          <span className="grid place-items-center h-8 w-8 rounded-full bg-sage/10 shrink-0">
            <DaisyMark size={16} className="text-sage" />
          </span>
          <div className="min-w-0">
            <p className="text-sm font-medium text-foreground truncate">{player.username}</p>
            <p className="text-[11px] text-muted-foreground">{t.userMenu.level} {player.level}</p>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="space-y-0.5 flex-1">
        <p className="px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
          Garden
        </p>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href.split("?")[0];
          return (
            <Link
              key={item.href}
              href={item.href.split("?")[0]}
              className={cn(
                "w-full flex items-center gap-2.5 rounded-md px-2.5 py-1.5 text-sm transition-colors",
                isActive
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
              )}
            >
              <Icon size={15} className="shrink-0" />
              {item.label}
            </Link>
          );
        })}

        <p className="px-2.5 py-1.5 mt-3 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
          Account
        </p>
        {accountItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "w-full flex items-center gap-2.5 rounded-md px-2.5 py-1.5 text-sm transition-colors",
                isActive
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
              )}
            >
              <Icon size={15} className="shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom actions */}
      <div className="pt-3 border-t border-border space-y-0.5">
        <Link
          href="/"
          className="w-full flex items-center gap-2.5 rounded-md px-2.5 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-colors"
        >
          <ArrowRightIcon size={15} className="shrink-0 rotate-180" />
          Back to site
        </Link>
        {hydrated && player && (
          <button
            onClick={signOut}
            className="w-full flex items-center gap-2.5 rounded-md px-2.5 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-colors text-left"
          >
            <CloseIcon size={15} className="shrink-0" />
            {t.userMenu.signOut}
          </button>
        )}
      </div>
    </div>
  );
}
