"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";
import { useI18n } from "@/hooks/use-i18n";
import { AuthModal } from "./AuthModal";
import { LanguageSwitcher } from "./LanguageSwitcher";
import {
  DaisyMark,
  MenuIcon,
  CloseIcon,
  ChevronDownIcon,
  GithubIcon,
} from "./icons";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const pathname = usePathname();
  const { player, signIn, signOut, hydrated } = useAuth();
  const { t } = useI18n();

  const NAV_LINKS = [
    { href: "/how-it-works", label: t.nav.howItWorks },
    { href: "/plants", label: t.nav.plants },
    { href: "/panel", label: t.nav.panel },
    { href: "/commands", label: t.nav.commands },
    { href: "/faq", label: t.nav.faq },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-background/85 backdrop-blur-xl border-b border-border"
            : "bg-transparent border-b border-transparent"
        )}
      >
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <nav className="flex h-16 items-center justify-between gap-4">
            <Link href="/" className="flex items-center gap-2 group" aria-label="DaisyFlower home">
              <DaisyMark size={26} className="text-terra transition-transform group-hover:rotate-12" />
              <span className="font-display text-lg font-semibold tracking-tight text-foreground">
                DaisyFlower
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "relative px-3 py-2 text-sm font-medium transition-colors",
                      isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute -bottom-px left-3 right-3 h-px bg-foreground"
                        transition={{ duration: 0.25 }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            <div className="hidden md:flex items-center gap-1.5">
              <LanguageSwitcher compact />
              <a
                href="https://github.com/cepard01/daisyflower"
                target="_blank"
                rel="noopener noreferrer"
                className="grid place-items-center h-9 w-9 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                aria-label="GitHub"
              >
                <GithubIcon size={17} />
              </a>
              <div className="w-px h-5 bg-border mx-0.5" />
              {hydrated && player ? (
                <UserMenu player={player} onSignOut={signOut} />
              ) : (
                <button
                  onClick={() => setAuthOpen(true)}
                  className="rounded-lg bg-foreground text-background px-4 py-2 text-sm font-medium hover:bg-foreground/90 transition-colors"
                >
                  {t.nav.signIn}
                </button>
              )}
            </div>

            <button
              onClick={() => setOpen((v) => !v)}
              className="md:hidden grid place-items-center h-9 w-9 rounded-lg text-foreground hover:bg-secondary transition-colors"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              {open ? <CloseIcon size={18} /> : <MenuIcon size={18} />}
            </button>
          </nav>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="md:hidden overflow-hidden border-t border-border bg-background/95 backdrop-blur-xl"
            >
              <div className="px-5 py-4 flex flex-col gap-0.5">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "px-3 py-2.5 text-sm font-medium rounded-lg transition-colors",
                      pathname === link.href
                        ? "text-foreground bg-secondary"
                        : "text-foreground hover:bg-secondary"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href="/get-started"
                  className="px-3 py-2.5 text-sm font-medium text-foreground hover:bg-secondary rounded-lg transition-colors"
                >
                  {t.nav.getStarted}
                </Link>
                <a
                  href="https://github.com/cepard01/daisyflower"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2.5 text-sm font-medium text-foreground hover:bg-secondary rounded-lg transition-colors flex items-center gap-2"
                >
                  <GithubIcon size={15} /> {t.nav.github}
                </a>
                <div className="h-px bg-border my-2" />
                <div className="px-3 py-2 flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Language</span>
                  <LanguageSwitcher />
                </div>
                <div className="h-px bg-border my-2" />
                {hydrated && player ? (
                  <div className="px-3 py-2">
                    <div className="flex items-center gap-3">
                      <span className="grid place-items-center h-8 w-8 rounded-full bg-sage/15">
                        <DaisyMark size={18} className="text-sage" />
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-foreground">{player.username}</p>
                        <p className="text-xs text-muted-foreground">{t.userMenu.level} {player.level}</p>
                      </div>
                    </div>
                    <button
                      onClick={signOut}
                      className="mt-3 w-full text-left text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {t.userMenu.signOut}
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setAuthOpen(true)}
                    className="mt-2 mx-3 inline-flex items-center justify-center rounded-lg bg-foreground text-background px-4 py-2.5 text-sm font-medium"
                  >
                    {t.nav.signIn}
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <AuthModal open={authOpen} onOpenChange={setAuthOpen} onAuthenticated={signIn} />
    </>
  );
}

function UserMenu({
  player,
  onSignOut,
}: {
  player: { username: string; level: number };
  onSignOut: () => void;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { t } = useI18n();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-2 rounded-full border border-border bg-card pl-1 pr-2.5 py-1 hover:border-foreground/20 transition-colors"
      >
        <span className="grid place-items-center h-7 w-7 rounded-full bg-sage/15">
          <DaisyMark size={15} className="text-sage" />
        </span>
        <span className="text-sm font-medium text-foreground max-w-[90px] truncate">
          {player.username}
        </span>
        <ChevronDownIcon
          size={14}
          className={cn("text-muted-foreground transition-transform", open && "rotate-180")}
        />
      </button>

      <AnimatePresence>
        {open && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} aria-hidden />
            <motion.div
              initial={{ opacity: 0, y: -6, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.97 }}
              transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="absolute right-0 top-full mt-2 w-52 z-50 bg-card border border-border rounded-xl shadow-lg overflow-hidden"
            >
              <div className="p-3 border-b border-border">
                <p className="text-sm font-semibold text-foreground truncate">{player.username}</p>
                <p className="text-xs text-muted-foreground">{t.userMenu.level} {player.level} · Gardener</p>
              </div>
              <div className="p-1.5">
                <Link
                  href="/panel"
                  onClick={() => setOpen(false)}
                  className="w-full text-left px-2.5 py-2 text-sm text-foreground hover:bg-secondary rounded-lg transition-colors block"
                >
                  {t.userMenu.myPanel}
                </Link>
                <Link
                  href="/plants"
                  onClick={() => setOpen(false)}
                  className="w-full text-left px-2.5 py-2 text-sm text-foreground hover:bg-secondary rounded-lg transition-colors block"
                >
                  {t.userMenu.seePlants}
                </Link>
                <div className="h-px bg-border my-1.5" />
                <button
                  onClick={onSignOut}
                  className="w-full text-left px-2.5 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors"
                >
                  {t.userMenu.signOut}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
