# DaisyFlower Website — Design Document

> A calm garden simulator for Discord. This document defines the design system, architecture, and guidelines for the marketing site and web dashboard.

---

## Table of Contents

1. [Philosophy](#1-philosophy)
2. [Design Tokens](#2-design-tokens)
3. [Typography](#3-typography)
4. [Color System](#4-color-system)
5. [Spacing & Layout](#5-spacing--layout)
6. [Iconography](#6-iconography)
7. [Components](#7-components)
8. [Page Architecture](#8-page-architecture)
9. [Internationalization (i18n)](#9-internationalization-i18n)
10. [Animation](#10-animation)
11. [Accessibility](#11-accessibility)
12. [File Structure](#12-file-structure)
13. [Contribution Guidelines](#13-contribution-guidelines)

---

## 1. Philosophy

DaisyFlower is a calm game. The website should feel the same way.

**Three principles:**

1. **Calm over clever.** No bouncy animations, no gradient explosions, no emoji-as-icon. The site should feel like a botanical journal — warm paper, ink text, hand-drawn marks.

2. **Honest voice.** Copy speaks directly to the player, not at them. No marketing superlatives. No jargon. "Plants grow even when you're away" — not "leveraging lazy deterministic simulation for optimal scalability."

3. **Editorial, not generic.** Asymmetric layouts. Serif display type with italics. Section numbers like a magazine. Hairline borders instead of shadows. The goal: a site that looks like a person made it, not a template.

**What we avoid (signals of generic AI-generated frontend):**
- Emoji used as UI icons (🚀 ⚡ ✨ in buttons/nav) — use the custom SVG icon set instead
- Repeated dot textures ("paper grain") — removed in favor of clean surfaces
- Obvious gradients (sage → terra → gold bars) — use flat color or subtle single-hue washes
- "Code editor" mockups with fake syntax highlighting — use real diagrams or prose
- Shadow-heavy card stacks — use 1px hairline borders

---

## 2. Design Tokens

All tokens are defined as CSS custom properties in `src/app/globals.css` and mapped to Tailwind via `@theme inline`.

### Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `--radius` | `0.5rem` | Base — slightly tight, not bubbly |
| `--radius-sm` | `calc(0.5rem - 4px)` | Small elements, chips |
| `--radius-md` | `calc(0.5rem - 2px)` | Buttons, inputs |
| `--radius-lg` | `0.5rem` | Cards, panels |
| `--radius-xl` | `calc(0.5rem + 4px)` | Large containers |
| `--radius-2xl` | `calc(0.5rem + 10px)` | Hero illustrations, modals |

### Letter Spacing

| Context | Value | Reason |
|---------|-------|--------|
| Body text | `-0.011em` | Tighter, editorial feel |
| Display headings | `-0.025em` | Aggressive tracking for large serif type |

### Shadows

Shadows are almost never used. Prefer `border: 1px solid var(--border)`. The only exception is modal/dropdown overlays, which use `shadow-lg` for depth separation.

---

## 3. Typography

### Font Families

| Role | Font | Weights | Usage |
|------|------|---------|-------|
| **Display** | Fraunces (variable, axes: SOFT, WONK) | 400–900 | Headlines, section titles, numbers, plant names |
| **Body** | Inter | 300–700 | Paragraphs, buttons, UI labels |
| **Mono** | JetBrains Mono | 400–600 | Code, timestamps, IDs, eyebrow labels |

### Font Loading

```ts
// src/app/layout.tsx
const inter = Inter({ variable: "--font-inter", subsets: ["latin"], weight: ["300","400","500","600","700"], display: "swap" });
const fraunces = Fraunces({ variable: "--font-fraunces", subsets: ["latin"], display: "swap", axes: ["SOFT", "WONK"] });
const jetbrains = JetBrains_Mono({ variable: "--font-jetbrains", subsets: ["latin"], weight: ["400","500","600"], display: "swap" });
```

### Type Scale

| Element | Class | Size | Weight | Tracking |
|---------|-------|------|--------|----------|
| H1 (hero) | `font-display text-[2.75rem] sm:text-7xl lg:text-[5.5rem] xl:text-[6rem]` | 44→96px | 500 | -0.025em |
| H2 (section) | `font-display text-4xl sm:text-5xl lg:text-[3.5rem]` | 36→56px | 500 | -0.025em |
| H3 (card) | `font-display text-lg` | 18px | 500 | -0.025em |
| Body | `text-base` | 16px | 400 | -0.011em |
| Body large | `text-lg` | 18px | 400 | -0.011em |
| Small | `text-sm` | 14px | 400 | -0.011em |
| Eyebrow | `font-mono text-xs uppercase tracking-[0.18em]` | 12px | 600 | +0.18em |
| Caption | `font-mono text-[11px]` | 11px | 400 | 0 |

### Typographic Patterns

- **Italic emphasis** for highlighted words in headings: `<em className="font-normal text-sage">word</em>`
- **Section numbers** in monospace, dimmed: `01`, `02`, etc.
- **Eyebrow labels** above headings: monospace, uppercase, wide tracking, sage color
- **Tabular numbers** (`tabular` class) for data, stats, prices

---

## 4. Color System

### Light Theme (default)

| Token | OKLCH | Hex approx | Role |
|-------|-------|------------|------|
| `--background` | `oklch(0.985 0.006 75)` | `#FAF8F4` | Warm off-white, like uncoated paper |
| `--foreground` | `oklch(0.21 0.012 75)` | `#1F1D1A` | Near-black with warm undertone |
| `--card` | `oklch(0.995 0.004 75)` | `#FEFDFB` | Slightly lighter than background |
| `--primary` (sage) | `oklch(0.46 0.06 145)` | `#4A6B57` | Muted natural green |
| `--accent` (terra) | `oklch(0.68 0.1 45)` | `#C97B5A` | Earthy terracotta |
| `--gold` | `oklch(0.8 0.1 85)` | `#E8C766` | Sunflower gold |
| `--muted-foreground` | `oklch(0.48 0.012 75)` | `#6B6862` | Secondary text |
| `--border` | `oklch(0.9 0.008 75)` | `#E5E1DA` | Hairline borders |

### Garden Palette (custom tokens)

| Token | Usage |
|-------|-------|
| `--sage` | Primary actions, success states, "live" indicators |
| `--sage-deep` | Hover states, dark accents on green |
| `--sage-soft` | Progress bars, subtle green fills |
| `--terra` | Accent actions, rare items, callouts |
| `--terra-deep` | Terracotta text on light backgrounds |
| `--gold` | Currency (Daisies), sunny weather, highlights |
| `--gold-deep` | Gold text, sun indicators |
| `--ink` | Dark panels (Discord mockups), inverted sections |
| `--paper` | Alias for background in dark mockups |

### Dark Theme

Dark mode is defined but the site defaults to light. The palette shifts to cool greens with the same hue family:

```css
.dark {
  --background: oklch(0.155 0.008 150);
  --foreground: oklch(0.94 0.006 75);
  --primary: oklch(0.66 0.07 145);
  /* ... see globals.css for full dark theme */
}
```

### Color Usage Rules

1. **Sage** = primary, go, live, success
2. **Terra** = accent, rare, special, callout
3. **Gold** = currency, sun, reward
4. **Sky-soft** = water, rain, info
5. **Ink** = Discord mockups, inverted CTAs
6. Never use indigo or blue.

---

## 5. Spacing & Layout

### Container

- Max width: `max-w-6xl` (72rem / 1152px) for standard sections
- Max width: `max-w-3xl` (48rem) for prose-heavy sections (FAQ, manifestos)
- Max width: `max-w-4xl` (56rem) for focused content (mutation diagrams)
- Horizontal padding: `px-5 sm:px-6` on all containers

### Vertical Rhythm

| Section type | Top/bottom padding |
|--------------|-------------------|
| Hero | `pt-32 pb-20 md:pt-40 md:pb-24` (extra top for fixed navbar) |
| Standard section | `py-20 md:py-28` |
| Dense section | `py-16 md:py-24` |
| Inner page header | `pt-32 pb-12 md:pt-40 md:pb-16` |

### Grid

- Card grids: `grid sm:grid-cols-2 lg:grid-cols-3 gap-4`
- Hairline-separated grids: `grid gap-px bg-border rounded-2xl overflow-hidden border border-border` (cards have `bg-card` to create 1px lines)

### Navbar

- Fixed, `h-16` (64px)
- Transparent at top, `bg-background/85 backdrop-blur-xl` after scroll
- Nav links centered absolutely (`absolute left-1/2 -translate-x-1/2`)
- Active indicator: `motion.span` with `layoutId="nav-active"` for smooth sliding

---

## 6. Iconography

### Custom SVG Icon Set

All UI icons are hand-drawn SVGs in `src/components/site/icons.tsx`. **Never use emoji as UI icons** (in buttons, nav, stats, tabs). Emoji are only used where they represent actual game content (🌻 sunflower, ☀️ weather, 🪙 currency).

**Icon principles:**
- 1.5px stroke width
- `currentColor` inheritance
- 24×24 viewBox
- Rounded line caps and joins
- Available in `size` prop (default 16)

**Available icons:**
`SproutIcon`, `SunIcon`, `CloudIcon`, `RainIcon`, `StormIcon`, `SnowIcon`, `DropletIcon`, `ClockIcon`, `SparkIcon`, `WalletIcon`, `ListIcon`, `BookIcon`, `BellIcon`, `GearIcon`, `ArrowRightIcon`, `ArrowUpRightIcon`, `CheckIcon`, `PlusIcon`, `MinusIcon`, `MenuIcon`, `CloseIcon`, `ChevronDownIcon`, `LockIcon`, `ShieldIcon`, `GithubIcon`, `TerminalIcon`, `TrendingIcon`, `DaisyMark`, `SprigDivider`

### DaisyMark (Logo)

The DaisyFlower logo is a custom SVG: 8 petals (4 cardinal + 4 diagonal at 75% opacity) around a gold center. Used in navbar, footer, auth modal, and as the user avatar fallback.

```tsx
<DaisyMark size={26} className="text-terra" />
```

---

## 7. Components

### Core Components

| Component | File | Purpose |
|-----------|------|---------|
| `Navbar` | `Navbar.tsx` | Fixed top nav with active route indicator, language switcher, auth state |
| `Footer` | `Footer.tsx` | Site footer with sitemap, persistent across pages |
| `PageHeader` | `PageHeader.tsx` | Reusable header for inner pages (eyebrow + title + description) |
| `Reveal` | `Reveal.tsx` | SSR-safe scroll animation wrapper |
| `AuthModal` | `AuthModal.tsx` | Mock Discord login flow (3 steps: intro → connecting → done) |
| `LanguageSwitcher` | `LanguageSwitcher.tsx` | Dropdown for EN / PT-BR |
| `DashboardLayout` | `Dashboard.tsx` | The 4-tab dashboard (Garden, Wallet, Missions, Collection) |
| `icons` | `icons.tsx` | Custom SVG icon set |

### Card Pattern

```tsx
<div className="card-hairline card-hairline-hover rounded-xl p-5">
  {/* content */}
</div>
```

- `card-hairline`: 1px border, no shadow, subtle background
- `card-hairline-hover`: border darkens on hover (no transform, no shadow)

### Button Patterns

```tsx
// Primary (solid)
<button className="rounded-lg bg-foreground text-background px-5 py-2.5 text-sm font-medium hover:bg-foreground/90 transition-colors">

// Secondary (ghost)
<button className="rounded-lg px-4 py-2.5 text-sm font-medium text-foreground hover:bg-secondary transition-colors">

// Discord (branded)
<button className="rounded-xl bg-[#5865F2] hover:bg-[#4752c4] text-white px-5 py-3 text-sm font-semibold">
```

### Section Header Pattern

```tsx
<div className="flex items-center gap-3 text-muted-foreground">
  <span className="font-mono text-xs marker-num">01</span>
  <span className="h-px w-8 bg-border" />
  <span className="font-mono text-xs uppercase tracking-[0.18em] text-sage font-semibold">Eyebrow</span>
</div>
<h2 className="mt-5 font-display text-4xl sm:text-5xl font-medium tracking-tight text-foreground text-balance leading-[1.05]">
  Title with <em className="font-normal text-sage">italic highlight</em>
</h2>
```

---

## 8. Page Architecture

### Routes

| Route | Type | Purpose |
|-------|------|---------|
| `/` | Landing | Hero, what is, features, how-it-works preview, plant preview, explore, CTA |
| `/how-it-works` | Inner | Full guide: 3 steps, Discord mockup, weather, mutations |
| `/plants` | Inner | Full plant gallery + mutation callout |
| `/panel` | App | Dashboard (login-gated, separate from landing) |
| `/faq` | Inner | 8 questions in accordion |
| `/get-started` | Inner | Onboarding steps, starter kit, Discord preview, final CTA |

### Layout Structure

```
RootLayout (layout.tsx)
├── I18nProvider (context for translations)
│   ├── Navbar (fixed, persistent)
│   ├── main (page content)
│   └── Footer (persistent)
```

- Navbar and Footer live in the root layout — they persist across all routes
- Each page is a self-contained module with its own content
- The dashboard (`/panel`) is intentionally separate from the landing — it's the "app" area

### Navigation

- Uses `next/link` for client-side navigation (no full reload)
- `usePathname()` tracks active route for navbar indicator
- Mobile menu closes automatically on route change
- Language persists across navigation via context

---

## 9. Internationalization (i18n)

### Architecture

```
I18nProvider (context)
├── locale: "en" | "pt-BR"
├── t: Translation object (all strings)
├── setLocale(locale): switches language
└── hydrated: boolean (SSR-safe)
```

### Default Language

**English is the default.** The server always renders English. On mount, the client checks `localStorage` for a saved preference and swaps if needed. This avoids hydration mismatches.

### Adding a Language

1. Create `src/lib/translations/{code}.ts` — must match the `Translation` type from `en.ts`
2. Register in `src/lib/translations/index.ts`:
   ```ts
   import { en, type Translation } from "./en";
   import { ptBR } from "./pt-BR";
   export const translations: Record<string, Translation> = { en, "pt-BR": ptBR };
   ```
3. Add to `LOCALES` in `src/lib/i18n-config.ts`:
   ```ts
   export const LOCALES = [
     { code: "en", label: "English", flag: "🇬🇧" },
     { code: "pt-BR", label: "Português", flag: "🇧🇷" },
     // { code: "es", label: "Español", flag: "🇪🇸" },
   ];
   ```

### Translation Structure

The `Translation` type is defined by `en.ts` and covers:
- `nav`, `hero`, `whatIs`, `explore`, `finalCta`
- `features` (6 items)
- `howItWorks` (steps, discord mockup, weather, mutations)
- `plants` (5 items + callout)
- `panel` (locked state, dashboard with 4 tabs)
- `faq` (8 items)
- `getStarted` (steps, kit, discord preview)
- `footer`, `auth`, `userMenu`, `rarity`

### Usage in Components

```tsx
const { t } = useI18n();
return <h1>{t.hero.titleLine1} <em>{t.hero.titleHighlight}</em></h1>;
```

### Rules

- **Never hardcode user-facing strings.** Always use `t.*`
- Emoji and plant names that represent game content can stay as-is across languages (🌻 is 🌻 in every language)
- Dynamic values use `.replace("{year}", String(year))` pattern

---

## 10. Animation

### Principles

- **Slow and calm.** Never bouncy. Use `ease: [0.16, 1, 0.3, 1]` (ease-out-expo variant)
- **SSR-safe.** Never use `initial={{ opacity: 0 }}` with `animate` — it causes hydration mismatches. Use `initial={false}` with `whileInView` instead.
- **Subtle.** 6–8px movements, 0.5s duration, 0.05–0.2s delays

### Reveal Component

The `Reveal` wrapper is the standard way to animate content into view:

```tsx
<Reveal delay={0.1}>
  <Card />
</Reveal>
```

It uses `initial={false}` + `whileInView` so the server renders the element visible (no `opacity:0` inline style), and the animation only plays when scrolled into view on the client.

### CSS Animations

Defined in `globals.css`:

| Class | Duration | Usage |
|-------|----------|-------|
| `animate-float-soft` | 7s | Floating elements (pink rose in mutation diagram) |
| `animate-pulse-dot` | 2.4s | "Live" / "synced" status dots |
| `animate-grow-up` | 0.7s | One-time entrance (use sparingly — can cause hydration issues) |
| `animate-spin-slow` | 1s linear | Loading spinners |

### What NOT to do

- ❌ `initial={{ opacity: 0 }}` with `animate` (hydration mismatch)
- ❌ Bouncy springs (`type: "spring"`)
- ❌ Parallax or scroll-jacking
- ❌ Auto-playing carousels

---

## 11. Accessibility

### Requirements

- **Semantic HTML:** `header`, `main`, `section`, `nav`, `footer`, `h1`–`h3` hierarchy
- **ARIA:** `aria-label` on icon-only buttons, `aria-expanded` on toggles, `role="dialog"` + `aria-modal` on modals
- **Keyboard:** All interactive elements reachable via Tab, Escape closes modals
- **Focus:** Visible focus rings (`outline-ring/50`)
- **Color contrast:** All text meets WCAG AA (4.5:1 for body, 3:1 for large text)

### Patterns

- Modal: traps scroll (`body.style.overflow = "hidden"`), closes on Escape, closes on backdrop click
- Dropdown: closes on outside click, closes on Escape
- Mobile menu: `aria-expanded` on toggle, closes on route change
- Accordion: `aria-expanded` on trigger, animated height

---

## 12. File Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout (I18nProvider, Navbar, Footer)
│   ├── page.tsx            # Landing page (/)
│   ├── globals.css         # Design tokens, base styles, utilities
│   ├── how-it-works/
│   │   └── page.tsx
│   ├── plants/
│   │   └── page.tsx
│   ├── panel/
│   │   └── page.tsx        # Dashboard (separate app area)
│   ├── faq/
│   │   └── page.tsx
│   └── get-started/
│       └── page.tsx
├── components/
│   ├── site/               # All DaisyFlower components
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── PageHeader.tsx
│   │   ├── Reveal.tsx
│   │   ├── AuthModal.tsx
│   │   ├── LanguageSwitcher.tsx
│   │   ├── Dashboard.tsx
│   │   ├── icons.tsx       # Custom SVG icon set
│   │   └── ... (section components used by pages)
│   └── ui/                 # shadcn/ui primitives (not used much)
├── hooks/
│   ├── use-i18n.tsx        # i18n context + hook
│   ├── use-auth.ts         # Mock auth state
│   ├── use-mobile.ts
│   └── use-toast.ts
└── lib/
    ├── i18n-config.ts      # Locale list, default locale
    ├── translations/
    │   ├── index.ts        # Registry
    │   ├── en.ts           # English (default, defines Translation type)
    │   └── pt-BR.ts        # Portuguese
    ├── daisy-data.ts       # Static game data (plants, weather, etc.)
    └── utils.ts            # cn() helper
```

---

## 13. Contribution Guidelines

### Before You Add a Feature

1. **Read this document.** Especially the Philosophy and "what we avoid" sections.
2. **Check the translation files.** Any user-facing string must go through `t.*`, not hardcoded.
3. **Use the icon set.** If you need a new icon, add it to `icons.tsx` — don't use emoji or lucide for UI.
4. **Test hydration.** If you use Framer Motion, use `initial={false}` + `whileInView`, never `initial={{ opacity: 0 }}` + `animate`.

### Code Style

- TypeScript throughout, strict
- `"use client"` directive on any component using hooks or browser APIs
- `cn()` utility from `@/lib/utils` for conditional classes
- Prefer `Link` from `next/link` over `<a>` for internal navigation
- All new components go in `src/components/site/`

### Design Review Checklist

Before merging a visual change, verify:

- [ ] No emoji used as UI icons
- [ ] No hardcoded user-facing strings (all through `t.*`)
- [ ] No `initial={{ opacity: 0 }}` with `animate` (use `Reveal` or `initial={false}`)
- [ ] No indigo or blue colors
- [ ] No shadow-heavy cards (use hairline borders)
- [ ] Works in both English and Portuguese
- [ ] Responsive at 390px, 768px, 1024px, 1440px
- [ ] Lint passes (`bun run lint`)

### Adding a New Page

1. Create `src/app/{route}/page.tsx`
2. Add route to `NAV_LINKS` in `Navbar.tsx` (if it should appear in nav)
3. Add all strings to both `en.ts` and `pt-BR.ts`
4. Use `PageHeader` component for the header
5. Add footer links if appropriate
6. Test language switching on the new page

---

## Appendix: Bot-Inspired Decisions

The website mirrors several decisions from the DaisyFlower bot itself:

| Bot behavior | Website parallel |
|--------------|------------------|
| Bilingual (pt-BR + en-US) with auto-detection | i18n system with EN default, PT-BR available, fluid switching |
| UI-first gameplay (panels, not commands) | Panel-based dashboard, not a command reference |
| Deterministic simulation (timestamps, not timers) | SSR-safe rendering (no client-only state on first paint) |
| Calm, cozy player experience | Calm, editorial design (no bouncy animations, no spam) |
| Data-driven content (JSON files) | Translation files are data-driven (add a language = add a file) |

The website should feel like an extension of the bot's personality — quiet, warm, and unhurried.

---

*This document is a living reference. Update it when the design system evolves.*
