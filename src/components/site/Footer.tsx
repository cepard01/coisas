"use client";

import { Sprout, Github, Heart } from "lucide-react";

const FOOTER_LINKS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Explore",
    links: [
      { label: "Features", href: "#features" },
      { label: "Gameplay loop", href: "#loop" },
      { label: "Catalog", href: "#catalog" },
      { label: "Commands", href: "#commands" },
    ],
  },
  {
    title: "Build",
    links: [
      { label: "Tech stack", href: "#tech" },
      { label: "Player journey", href: "#journey" },
      { label: "Get started", href: "#start" },
      { label: "GitHub", href: "https://github.com/cepard01/daisyflower" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Architecture", href: "https://github.com/cepard01/daisyflower/blob/main/docs/architecture.md" },
      { label: "Gameplay", href: "https://github.com/cepard01/daisyflower/blob/main/docs/gameplay.md" },
      { label: "Commands", href: "https://github.com/cepard01/daisyflower/blob/main/docs/commands.md" },
      { label: "Operations", href: "https://github.com/cepard01/daisyflower/blob/main/docs/operations.md" },
    ],
  },
];

export function Footer() {
  const handleNav = (href: string) => {
    if (href.startsWith("#")) {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.open(href, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <footer className="relative mt-auto bg-leaf-deep text-white">
      {/* Top decorative wave */}
      <div className="absolute top-0 inset-x-0 -translate-y-px" aria-hidden>
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full h-8 md:h-12">
          <path
            d="M0,30 C240,60 480,0 720,30 C960,60 1200,10 1440,30 L1440,0 L0,0 Z"
            fill="var(--leaf-deep)"
          />
        </svg>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid lg:grid-cols-[1.4fr_1fr_1fr_1fr] gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2">
              <span className="grid place-items-center h-10 w-10 rounded-xl bg-sun-gradient text-leaf-deep shadow-md">
                <Sprout className="h-5 w-5" />
              </span>
              <span className="font-display text-2xl font-bold">
                Daisy<span className="text-sun">Flower</span>
              </span>
            </div>
            <p className="mt-4 text-sm text-white/70 max-w-xs text-pretty">
              The deterministic gardening simulator for Discord. A cozy, UI-first farm &amp; garden
              game — open source and built with TypeScript.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <a
                href="https://github.com/cepard01/daisyflower"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-white/10 hover:bg-white/20 px-3 py-2 text-xs font-semibold transition-colors"
              >
                <Github className="h-4 w-4" /> GitHub
              </a>
              <span className="text-[11px] text-white/60">MIT License</span>
            </div>
          </div>

          {/* Link columns */}
          {FOOTER_LINKS.map((col) => (
            <div key={col.title}>
              <h3 className="font-display text-sm font-bold uppercase tracking-wider text-sun">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => handleNav(link.href)}
                      className="text-sm text-white/70 hover:text-white transition-colors text-left"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/60">
            © {new Date().getFullYear()} DaisyFlower Project. All rights reserved.
          </p>
          <p className="text-xs text-white/60 flex items-center gap-1.5">
            Made with <Heart className="h-3 w-3 fill-rose-petal text-rose-petal" /> for cozy gardens
            everywhere
          </p>
        </div>

        {/* Decorative bottom row of emojis */}
        <div className="mt-6 flex flex-wrap justify-center gap-2 opacity-50 text-lg" aria-hidden>
          <span>🌻</span>
          <span>🌱</span>
          <span>🦋</span>
          <span>🐝</span>
          <span>🌹</span>
          <span>🤍</span>
          <span>🌸</span>
          <span>🥕</span>
          <span>🚿</span>
          <span>🎃</span>
        </div>
      </div>
    </footer>
  );
}
