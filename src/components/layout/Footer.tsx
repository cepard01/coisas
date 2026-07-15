"use client";

import { useState } from "react";
import Link from "next/link";
import { useI18n } from "@/components/providers/I18nProvider";
import { useToast } from "@/components/providers/Toast";
import { DaisyMark, GithubIcon, ArrowUpRightIcon, CheckIcon } from "@/components/icons";

export function Footer() {
  const { t } = useI18n();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const year = new Date().getFullYear();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    toast(t.footer.newsletter.success, "success");
    setEmail("");
    setTimeout(() => setSubscribed(false), 3000);
  };

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
              {t.footer.tagline}
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
              {t.footer.github}
              <ArrowUpRightIcon size={13} className="text-muted-foreground" />
            </a>
            <Link
              href="/get-started"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-sage transition-colors"
            >
              {t.footer.addToDiscord}
            </Link>
          </div>
        </div>

        {/* Newsletter */}
        <div className="py-10 border-b border-border">
          <div className="max-w-md">
            <h3 className="font-display text-lg font-medium text-foreground">
              {t.footer.newsletter.title}
            </h3>
            <p className="mt-1.5 text-sm text-muted-foreground text-pretty">
              {t.footer.newsletter.subtitle}
            </p>
            <form onSubmit={handleSubscribe} className="mt-4 flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.footer.newsletter.placeholder}
                aria-label={t.footer.newsletter.placeholder}
                className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-sage/40 transition-colors"
              />
              <button
                type="submit"
                className={`inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  subscribed
                    ? "bg-sage text-white"
                    : "bg-foreground text-background hover:bg-foreground/90"
                }`}
              >
                {subscribed ? (
                  <>
                    <CheckIcon size={14} /> ✓
                  </>
                ) : (
                  t.footer.newsletter.button
                )}
              </button>
            </form>
          </div>
        </div>

        <div className="py-10 grid sm:grid-cols-3 gap-8 text-sm">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground mb-3">
              {t.footer.theGame}
            </p>
            <ul className="space-y-2">
              <FooterLink href="/how-it-works">{t.footer.links.howItWorks}</FooterLink>
              <FooterLink href="/plants">{t.footer.links.plants}</FooterLink>
              <FooterLink href="/panel">{t.footer.links.panel}</FooterLink>
              <FooterLink href="/commands">{t.nav.commands}</FooterLink>
            </ul>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground mb-3">
              {t.footer.forPlayers}
            </p>
            <ul className="space-y-2">
              <FooterLink href="/get-started">{t.footer.links.getStarted}</FooterLink>
              <FooterLink href="/faq">{t.footer.links.faq}</FooterLink>
              <FooterLink href="/leaderboard">Leaderboard</FooterLink>
              <FooterLink href="/changelog">Changelog</FooterLink>
              <FooterLink href="/settings">Settings</FooterLink>
            </ul>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground mb-3">
              {t.footer.project}
            </p>
            <ul className="space-y-2">
              <FooterLink href="https://github.com/cepard01/daisyflower" external>
                {t.footer.links.sourceCode}
              </FooterLink>
              <FooterLink href="https://github.com/cepard01/daisyflower/blob/main/docs/gameplay.md" external>
                {t.footer.links.docs}
              </FooterLink>
              <FooterLink href="https://github.com/cepard01/daisyflower/blob/main/docs/audit-roadmap.md" external>
                {t.footer.links.progress}
              </FooterLink>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            {t.footer.copyright.replace("{year}", String(year))}
          </p>
          <p className="font-mono text-[11px] text-muted-foreground/70">
            {t.footer.signature}
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
  if (external || href.startsWith("http")) {
    return (
      <li>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          {children}
        </a>
      </li>
    );
  }
  return (
    <li>
      <Link href={href} className="text-muted-foreground hover:text-foreground transition-colors">
        {children}
      </Link>
    </li>
  );
}
