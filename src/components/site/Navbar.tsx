"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";
import { AuthModal } from "./AuthModal";

const NAV_LINKS = [
  { href: "#features", label: "Features" },
  { href: "#loop", label: "Gameplay" },
  { href: "#catalog", label: "Catalog" },
  { href: "#commands", label: "Commands" },
  { href: "#dashboard", label: "Dashboard" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const { player, signIn, signOut, hydrated } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-background/80 backdrop-blur-xl border-b border-border"
            : "bg-transparent border-b border-transparent"
        )}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="flex h-16 items-center justify-between gap-4">
            {/* Wordmark */}
            <button
              onClick={() => handleNav("#top")}
              className="flex items-center gap-2.5 group"
              aria-label="DaisyFlower home"
            >
              <Wordmark />
              <span className="font-display text-lg font-semibold tracking-tight text-foreground">
                DaisyFlower
              </span>
            </button>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-0.5">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNav(link.href)}
                  className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* Right side */}
            <div className="hidden md:flex items-center gap-2">
              <a
                href="https://github.com/cepard01/daisyflower"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-muted-foreground hover:text-foreground px-3 py-2 transition-colors"
              >
                GitHub
              </a>

              {hydrated && player ? (
                <UserMenu player={player} onSignOut={signOut} onNav={handleNav} />
              ) : (
                <button
                  onClick={() => setAuthOpen(true)}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-foreground text-background px-4 py-2 text-sm font-semibold hover:bg-foreground/90 transition-colors"
                >
                  Sign in
                </button>
              )}
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setOpen((v) => !v)}
              className="md:hidden grid place-items-center h-10 w-10 rounded-lg text-foreground hover:bg-secondary transition-colors"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </nav>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="md:hidden overflow-hidden border-t border-border bg-background/95 backdrop-blur-xl"
            >
              <div className="px-4 py-4 flex flex-col gap-0.5">
                {NAV_LINKS.map((link) => (
                  <button
                    key={link.href}
                    onClick={() => handleNav(link.href)}
                    className="px-3 py-2.5 text-left text-sm font-medium text-foreground hover:bg-secondary rounded-lg transition-colors"
                  >
                    {link.label}
                  </button>
                ))}
                <a
                  href="https://github.com/cepard01/daisyflower"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2.5 text-left text-sm font-medium text-foreground hover:bg-secondary rounded-lg transition-colors"
                >
                  GitHub ↗
                </a>
                <div className="h-px bg-border my-2" />
                {hydrated && player ? (
                  <div className="px-3 py-2">
                    <div className="flex items-center gap-3">
                      <span className="grid place-items-center h-9 w-9 rounded-full bg-sage/15 text-lg">
                        {player.avatar}
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-foreground">
                          {player.username}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Level {player.level}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        signOut();
                        setOpen(false);
                      }}
                      className="mt-3 w-full text-left text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Sign out
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setOpen(false);
                      setAuthOpen(true);
                    }}
                    className="mt-2 mx-3 inline-flex items-center justify-center rounded-lg bg-foreground text-background px-4 py-2.5 text-sm font-semibold"
                  >
                    Sign in
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
  onNav,
}: {
  player: { username: string; avatar: string; level: number };
  onSignOut: () => void;
  onNav: (href: string) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-2 rounded-full border border-border bg-card pl-1 pr-2.5 py-1 hover:border-foreground/20 transition-colors"
      >
        <span className="grid place-items-center h-7 w-7 rounded-full bg-sage/15 text-sm">
          {player.avatar}
        </span>
        <span className="text-sm font-medium text-foreground max-w-[100px] truncate">
          {player.username}
        </span>
        <ChevronDown className={cn("h-3.5 w-3.5 text-muted-foreground transition-transform", open && "rotate-180")} />
      </button>

      <AnimatePresence>
        {open && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} aria-hidden />
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.96 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="absolute right-0 top-full mt-2 w-56 z-50 bg-card border border-border rounded-xl shadow-lg overflow-hidden"
            >
              <div className="p-3 border-b border-border">
                <p className="text-sm font-semibold text-foreground truncate">
                  {player.username}
                </p>
                <p className="text-xs text-muted-foreground">Level {player.level} · Gardener</p>
              </div>
              <div className="p-1.5">
                <button
                  onClick={() => {
                    setOpen(false);
                    onNav("#dashboard");
                  }}
                  className="w-full text-left px-2.5 py-2 text-sm text-foreground hover:bg-secondary rounded-lg transition-colors"
                >
                  My dashboard
                </button>
                <button
                  onClick={() => {
                    setOpen(false);
                    onNav("#catalog");
                  }}
                  className="w-full text-left px-2.5 py-2 text-sm text-foreground hover:bg-secondary rounded-lg transition-colors"
                >
                  Browse catalog
                </button>
                <div className="h-px bg-border my-1.5" />
                <button
                  onClick={() => {
                    setOpen(false);
                    onSignOut();
                  }}
                  className="w-full text-left px-2.5 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors"
                >
                  Sign out
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Wordmark() {
  return (
    <span className="relative grid place-items-center h-9 w-9">
      <svg viewBox="0 0 36 36" className="h-9 w-9" aria-hidden>
        {/* Petals */}
        <g>
          <ellipse cx="18" cy="6" rx="3.5" ry="6" fill="oklch(0.82 0.12 85)" />
          <ellipse cx="18" cy="30" rx="3.5" ry="6" fill="oklch(0.82 0.12 85)" />
          <ellipse cx="6" cy="18" rx="6" ry="3.5" fill="oklch(0.82 0.12 85)" />
          <ellipse cx="30" cy="18" rx="6" ry="3.5" fill="oklch(0.82 0.12 85)" />
          <ellipse cx="9.5" cy="9.5" rx="3.5" ry="6" transform="rotate(-45 9.5 9.5)" fill="oklch(0.78 0.1 80)" />
          <ellipse cx="26.5" cy="9.5" rx="3.5" ry="6" transform="rotate(45 26.5 9.5)" fill="oklch(0.78 0.1 80)" />
          <ellipse cx="9.5" cy="26.5" rx="3.5" ry="6" transform="rotate(45 9.5 26.5)" fill="oklch(0.78 0.1 80)" />
          <ellipse cx="26.5" cy="26.5" rx="3.5" ry="6" transform="rotate(-45 26.5 26.5)" fill="oklch(0.78 0.1 80)" />
        </g>
        {/* Center */}
        <circle cx="18" cy="18" r="5" fill="oklch(0.65 0.14 75)" />
        <circle cx="18" cy="18" r="5" fill="none" stroke="oklch(0.5 0.1 65)" strokeWidth="0.5" />
      </svg>
    </span>
  );
}
