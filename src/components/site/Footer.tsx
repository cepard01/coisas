"use client";

import { Wordmark } from "./Navbar";

const FOOTER_LINKS: { title: string; links: { label: string; href: string; external?: boolean }[] }[] = [
  {
    title: "Explore",
    links: [
      { label: "Features", href: "#features" },
      { label: "Gameplay", href: "#loop" },
      { label: "Catalog", href: "#catalog" },
      { label: "Commands", href: "#commands" },
    ],
  },
  {
    title: "Project",
    links: [
      { label: "Dashboard", href: "#dashboard" },
      { label: "Roadmap", href: "#roadmap" },
      { label: "FAQ", href: "#faq" },
      { label: "Get started", href: "#start" },
    ],
  },
  {
    title: "Docs",
    links: [
      { label: "Architecture", href: "https://github.com/cepard01/daisyflower/blob/main/docs/architecture.md", external: true },
      { label: "Gameplay", href: "https://github.com/cepard01/daisyflower/blob/main/docs/gameplay.md", external: true },
      { label: "Commands", href: "https://github.com/cepard01/daisyflower/blob/main/docs/commands.md", external: true },
      { label: "Operations", href: "https://github.com/cepard01/daisyflower/blob/main/docs/operations.md", external: true },
    ],
  },
];

export function Footer() {
  const handleNav = (href: string, external?: boolean) => {
    if (external || href.startsWith("http")) {
      window.open(href, "_blank", "noopener,noreferrer");
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <footer className="mt-auto border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid lg:grid-cols-[1.5fr_1fr_1fr_1fr] gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5">
              <Wordmark />
              <span className="font-display text-lg font-semibold tracking-tight text-foreground">
                DaisyFlower
              </span>
            </div>
            <p className="mt-4 text-sm text-muted-foreground text-pretty max-w-xs leading-relaxed">
              A cozy, deterministic gardening simulator for Discord. Open source, MIT licensed,
              built with TypeScript.
            </p>
            <div className="mt-5 flex items-center gap-3 text-xs">
              <a
                href="https://github.com/cepard01/daisyflower"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                GitHub ↗
              </a>
              <span className="text-border">·</span>
              <span className="text-muted-foreground">MIT License</span>
              <span className="text-border">·</span>
              <span className="text-muted-foreground">v1.0 dev</span>
            </div>
          </div>

          {/* Link columns */}
          {FOOTER_LINKS.map((col) => (
            <div key={col.title}>
              <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground font-semibold">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => handleNav(link.href, link.external)}
                      className="text-sm text-foreground/80 hover:text-foreground transition-colors text-left"
                    >
                      {link.label}
                      {link.external && <span className="ml-1 text-muted-foreground">↗</span>}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} DaisyFlower Project. Built for cozy gardens everywhere.
          </p>
          <p className="text-xs text-muted-foreground font-mono">
            made with care · not by an AI
          </p>
        </div>
      </div>
    </footer>
  );
}
