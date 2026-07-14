"use client";

import { DaisyMark, GithubIcon, ArrowUpRightIcon } from "./icons";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-background">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 py-14">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-10 border-b border-border">
          <div>
            <div className="flex items-center gap-2.5">
              <DaisyMark size={26} className="text-terra" />
              <span className="font-display text-lg font-medium tracking-tight text-foreground">
                DaisyFlower
              </span>
            </div>
            <p className="mt-3 text-sm text-muted-foreground text-pretty max-w-sm leading-relaxed">
              Um simulador de jardim tranquilo para Discord. Grátis, código aberto, feito com
              carinho por gente que gosta de jogos lentos.
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
              href="#start"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-sage transition-colors"
            >
              Adicionar ao Discord
            </a>
          </div>
        </div>

        <div className="py-10 grid sm:grid-cols-3 gap-8 text-sm">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground mb-3">
              O jogo
            </p>
            <ul className="space-y-2">
              <FooterLink href="#how">Como funciona</FooterLink>
              <FooterLink href="#plants">Plantas e clima</FooterLink>
              <FooterLink href="#dashboard">Painel no site</FooterLink>
            </ul>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground mb-3">
              Para jogar
            </p>
            <ul className="space-y-2">
              <FooterLink href="#start">Adicionar ao Discord</FooterLink>
              <FooterLink href="#faq">Perguntas frequentes</FooterLink>
              <FooterLink href="#top">Kit inicial</FooterLink>
            </ul>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground mb-3">
              Projeto
            </p>
            <ul className="space-y-2">
              <FooterLink href="https://github.com/cepard01/daisyflower" external>
                Código-fonte
              </FooterLink>
              <FooterLink href="https://github.com/cepard01/daisyflower/blob/main/docs/gameplay.md" external>
                Documentação
              </FooterLink>
              <FooterLink href="https://github.com/cepard01/daisyflower/blob/main/docs/audit-roadmap.md" external>
                Andamento
              </FooterLink>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} DaisyFlower · MIT · grátis para sempre
          </p>
          <p className="font-mono text-[11px] text-muted-foreground/70">
            feito devagar, de propósito
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
