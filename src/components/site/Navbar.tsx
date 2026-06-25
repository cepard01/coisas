"use client";

import { useEffect, useState } from "react";
import { Menu, X, Sprout, Github } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "#features", label: "Features" },
  { href: "#loop", label: "Gameplay" },
  { href: "#catalog", label: "Catalog" },
  { href: "#commands", label: "Commands" },
  { href: "#tech", label: "Tech" },
  { href: "#start", label: "Get Started" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
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
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/85 backdrop-blur-md border-b border-border shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav className="flex h-16 items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => handleNav("#top")}
            className="flex items-center gap-2 group"
            aria-label="DaisyFlower home"
          >
            <span className="grid place-items-center h-9 w-9 rounded-xl bg-leaf-gradient text-white shadow-md group-hover:scale-105 transition-transform">
              <Sprout className="h-5 w-5" />
            </span>
            <span className="font-display text-xl font-bold tracking-tight text-foreground">
              Daisy<span className="text-primary">Flower</span>
            </span>
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNav(link.href)}
                className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/60 rounded-lg transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-2">
            <a
              href="https://github.com/cepard01/daisyflower"
              target="_blank"
              rel="noopener noreferrer"
              className="grid place-items-center h-10 w-10 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-colors"
              aria-label="GitHub repository"
            >
              <Github className="h-5 w-5" />
            </a>
            <button
              onClick={() => handleNav("#start")}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-md hover:bg-primary/90 hover:shadow-lg transition-all"
            >
              <span>Add to Discord</span>
              <span aria-hidden>→</span>
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden grid place-items-center h-10 w-10 rounded-lg text-foreground hover:bg-secondary/60 transition-colors"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-md">
          <div className="px-4 py-4 flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNav(link.href)}
                className="px-3 py-2.5 text-left text-sm font-medium text-foreground hover:bg-secondary/60 rounded-lg transition-colors"
              >
                {link.label}
              </button>
            ))}
            <div className="flex gap-2 pt-2">
              <a
                href="https://github.com/cepard01/daisyflower"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-semibold text-foreground hover:bg-secondary/60 transition-colors"
              >
                <Github className="h-4 w-4" /> GitHub
              </a>
              <button
                onClick={() => handleNav("#start")}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-md"
              >
                Add to Discord →
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
