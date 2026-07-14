"use client";

import { DaisyMark, GithubIcon, ArrowUpRightIcon } from "./icons";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-background">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 py-14">
        {/* Top — brand + signature line */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-10 border-b border-border">
          <div>
            <div className="flex items-center gap-2.5">
              <DaisyMark size={26} className="text-terra" />
              <span className="font-display text-lg font-medium tracking-tight text-foreground">
                DaisyFlower
              </span>
            </div>
            <p className="mt-3 text-sm text-muted-foreground text-pretty max-w-sm leading-relaxed">
              A quiet gardening simulator for Discord. Open source, MIT licensed, built with
              TypeScript by people who like slow games.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com/cepard01/daisyflower"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-sage transition-colors"
            >
              <GithubIcon size={15} />
              GitHub
              <ArrowUpRightIcon size={13} className="text-muted-foreground" />
            </a>
            <a
              href="https://github.com/cepard01/daisyflower/blob/main/docs/README.md"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-sage transition-colors"
            >
              Docs
              <ArrowUpRightIcon size={13} className="text-muted-foreground" />
            </a>
          </div>
        </div>

        {/* Middle — sitemap as prose, not columns */}
        <div className="py-10 grid sm:grid-cols-3 gap-8 text-sm">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground mb-3">
              The project
            </p>
            <ul className="space-y-2">
              <FooterLink href="#features">Features</FooterLink>
              <FooterLink href="#loop">Gameplay loop</FooterLink>
              <FooterLink href="#catalog">In-game catalog</FooterLink>
              <FooterLink href="#commands">Command reference</FooterLink>
            </ul>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground mb-3">
              For players
            </p>
            <ul className="space-y-2">
              <FooterLink href="#dashboard">Web dashboard</FooterLink>
              <FooterLink href="#journey">Player journey</FooterLink>
              <FooterLink href="#roadmap">Roadmap</FooterLink>
              <FooterLink href="#faq">FAQ</FooterLink>
              <FooterLink href="#start">Get started</FooterLink>
            </ul>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground mb-3">
              For maintainers
            </p>
            <ul className="space-y-2">
              <FooterLink href="#tech" external>Architecture</FooterLink>
              <FooterLink href="https://github.com/cepard01/daisyflower/blob/main/docs/gameplay.md" external>Gameplay design</FooterLink>
              <FooterLink href="https://github.com/cepard01/daisyflower/blob/main/docs/operations.md" external>Operations</FooterLink>
              <FooterLink href="https://github.com/cepard01/daisyflower/blob/main/docs/audit-roadmap.md" external>Audit & roadmap</FooterLink>
            </ul>
          </div>
        </div>

        {/* Bottom — minimal */}
        <div className="pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} DaisyFlower Project · MIT License
          </p>
          <p className="font-mono text-[11px] text-muted-foreground/70">
            made slowly, on purpose
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({
  href,
  children,
  external,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  const handleClick = (e: React.MouseEvent) => {
    if (!external && href.startsWith("#")) {
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
  return (
    <li>
      <a
        href={href}
        onClick={handleClick}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className="text-muted-foreground hover:text-foreground transition-colors"
      >
        {children}
      </a>
    </li>
  );
}
