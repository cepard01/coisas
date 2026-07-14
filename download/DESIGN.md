# DaisyFlower Website — Design System & Architecture

> The marketing site and web dashboard for DaisyFlower, a calm garden simulator bot for Discord.
> This document is the source of truth for every visual, structural, and behavioral decision.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Design Philosophy](#2-design-philosophy)
3. [Technology Stack](#3-technology-stack)
4. [Design Tokens (CSS Custom Properties)](#4-design-tokens-css-custom-properties)
5. [Color System](#5-color-system)
6. [Typography](#6-typography)
7. [Iconography](#7-iconography)
8. [Spacing, Layout & Grid](#8-spacing-layout--grid)
9. [Component Library](#9-component-library)
10. [Page Architecture & Routing](#10-page-architecture--routing)
11. [Internationalization (i18n)](#11-internationalization-i18n)
12. [Authentication (Mock)](#12-authentication-mock)
13. [Animation & Motion](#13-animation--motion)
14. [Accessibility](#14-accessibility)
15. [Anti-Patterns (What We Avoid)](#15-anti-patterns-what-we-avoid)
16. [File Structure](#16-file-structure)
17. [Development Workflow](#17-development-workflow)
18. [Contribution Checklist](#18-contribution-checklist)

---

## 1. Project Overview

DaisyFlower is a Discord bot where players tend a virtual garden: plant seeds, react to weather,
harvest flowers, discover rare mutations. The website serves two purposes:

1. **Marketing site** (`/`, `/how-it-works`, `/plants`, `/faq`, `/get-started`) — tells players
   what the game is, how it works, and how to add the bot. User-facing, not technical.

2. **Web dashboard** (`/panel`) — a mockup of a logged-in app area where players can see their
   garden, wallet, missions, and collection in the browser. Separate from the landing page.

**Default language:** English. **Secondary language:** Português (pt-BR). Language switching is
fluid (context-based, no page reload) and persists across sessions.

---

## 2. Design Philosophy

The site should feel like a botanical journal — warm, quiet, hand-made.

### Three Principles

1. **Calm over clever.** Slow animations (never bouncy). Hairline borders instead of shadows.
   Warm off-white paper instead of pure white. The site should lower your heart rate, not raise it.

2. **Honest voice.** Copy speaks directly to the player. No marketing superlatives, no jargon.
   "Plants grow even when you're away" — not "leveraging lazy deterministic simulation."

3. **Editorial, not generic.** Asymmetric layouts. Serif display type with italics. Section numbers
   like a magazine (`01`, `02`). Mono eyebrows with wide tracking. The goal: a site that looks
   like a person made it.

### Bot-Inspired Decisions

The website mirrors the bot's personality:

| Bot behavior | Website parallel |
|---|---|
| Bilingual (pt-BR + en-US) with auto-detection | i18n with fluid switching, EN default |
| UI-first gameplay (panels, not commands) | Panel-based dashboard, not a command reference |
| Deterministic simulation (timestamps, not timers) | SSR-safe rendering (no client-only state on first paint) |
| Calm, cozy player experience | Calm design (no bouncy animations, no spam) |

---

## 3. Technology Stack

| Layer | Technology | Version |
|---|---|---|
| Framework | Next.js (App Router) | 16.x |
| Language | TypeScript | 5.x |
| Styling | Tailwind CSS | 4.x |
| UI primitives | shadcn/ui (New York) | — |
| Animation | Framer Motion | 12.x |
| Icons | Custom SVG set (hand-drawn) | — |
| Fonts | next/font (Google Fonts) | — |

**No external icon libraries** (no lucide-react in site components, no emoji-as-icon). All UI icons
are custom SVGs in `src/components/site/icons.tsx`.

---

## 4. Design Tokens (CSS Custom Properties)

All tokens live in `src/app/globals.css` under `:root` (light) and `.dark` (dark). They are mapped
to Tailwind via `@theme inline` so you can use them as `bg-background`, `text-foreground`, etc.

### Border Radius

| Token | Value | Tailwind class | Usage |
|---|---|---|---|
| `--radius` | `0.5rem` (8px) | `rounded-lg` | Base — tight, not bubbly |
| `--radius-sm` | `calc(r - 4px)` | `rounded-sm` | Chips, small elements |
| `--radius-md` | `calc(r - 2px)` | `rounded-md` | Buttons, inputs |
| `--radius-xl` | `calc(r + 4px)` | `rounded-xl` | Cards, panels |
| `--radius-2xl` | `calc(r + 10px)` | `rounded-2xl` | Large containers, callouts |

### Letter Spacing

| Context | Value | Where |
|---|---|---|
| Body text | `-0.011em` | `body` in `globals.css` |
| Display headings | `-0.025em` | `.font-display` class |
| Eyebrow labels | `+0.18em` (tracking-wider) | Inline on `font-mono text-xs uppercase` |

### Font Features

```css
font-feature-settings: "ss01", "cv01", "cv11";  /* body */
font-feature-settings: "lnum", "tnum";           /* .marker-num — lining + tabular nums */
font-variation-settings: "SOFT" 50, "WONK" 0;    /* Fraunces display */
```

### Shadows

**Shadows are almost never used.** The only exception is modal/dropdown overlays (`shadow-lg`).
Cards use `border: 1px solid var(--border)` instead. This is deliberate — shadows feel "material
design," borders feel "editorial."

---

## 5. Color System

### Light Theme (default)

All values in OKLCH for perceptual uniformity.

| Token | OKLCH | Hex approx | Role |
|---|---|---|---|
| `--background` | `oklch(0.985 0.006 75)` | `#FAF8F4` | Warm off-white (uncoated paper) |
| `--foreground` | `oklch(0.21 0.012 75)` | `#1F1D1A` | Near-black, warm undertone |
| `--card` | `oklch(0.995 0.004 75)` | `#FEFDFB` | Slightly lighter than bg |
| `--primary` | `oklch(0.46 0.06 145)` | `#4A6B57` | Sage — primary actions |
| `--secondary` | `oklch(0.955 0.008 75)` | `#F5F2EE` | Soft warm grey |
| `--muted-foreground` | `oklch(0.48 0.012 75)` | `#6B6862` | Secondary text |
| `--accent` | `oklch(0.68 0.1 45)` | `#C97B5A` | Terracotta — accent actions |
| `--destructive` | `oklch(0.58 0.19 25)` | `#B84A3A` | Errors |
| `--border` | `oklch(0.9 0.008 75)` | `#E5E1DA` | Hairline borders |

### Garden Palette (custom tokens)

These are project-specific colors used via Tailwind classes like `text-sage`, `bg-terra/10`, etc.

| Token | Light OKLCH | Dark OKLCH | Semantic role |
|---|---|---|---|
| `--sage` | `0.46 0.06 145` | `0.66 0.07 145` | Primary, go, live, success |
| `--sage-deep` | `0.33 0.04 150` | `0.42 0.05 150` | Hover states on green |
| `--sage-soft` | `0.7 0.035 140` | `0.48 0.04 140` | Progress bars, subtle fills |
| `--terra` | `0.68 0.1 45` | `0.72 0.12 45` | Accent, rare, special |
| `--terra-deep` | `0.52 0.11 40` | `0.58 0.12 40` | Terracotta text |
| `--gold` | `0.8 0.1 85` | `0.82 0.1 85` | Currency, sun, reward |
| `--gold-deep` | `0.62 0.12 75` | `0.68 0.12 75` | Gold text |
| `--clay` | `0.62 0.07 50` | `0.68 0.09 50` | Earthy neutral |
| `--ink` | `0.21 0.012 75` | `0.155 0.008 150` | Dark panels (Discord mockups) |
| `--paper` | `0.985 0.006 75` | `0.155 0.008 150` | Alias for bg in dark mockups |

### Color Usage Rules

| Color | Use for | Don't use for |
|---|---|---|
| **Sage** | Primary buttons, "live" dots, success, links | Error states |
| **Terra** | Rare items, mutation callouts, accent CTAs | Primary actions |
| **Gold** | Daisies (currency), sun weather, rewards | Body text |
| **Sky-soft** | Water/humidity, rain, info | — |
| **Ink** | Discord mockup backgrounds, inverted sections | Light mode backgrounds |

**Never use indigo or blue.** The palette is deliberately warm and earthy.

### Dark Theme

Defined in `.dark` class. The palette shifts to cooler greens but keeps the same hue family. Dark
mode is fully supported but the site defaults to light.

---

## 6. Typography

### Font Families

| Role | Font | Variable | Weights | Usage |
|---|---|---|---|---|
| Display | Fraunces (variable) | `--font-fraunces` | 400–900 (variable) | Headlines, titles, plant names, stats |
| Body | Inter | `--font-inter` | 300–700 | Paragraphs, buttons, UI labels |
| Mono | JetBrains Mono | `--font-jetbrains` | 400–600 | Code, timestamps, eyebrow labels |

### Font Loading (in `layout.tsx`)

```ts
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  axes: ["SOFT", "WONK"],  // Note: axes require NO weight property
});
```

**Important:** When using `axes`, you cannot specify `weight`. This is a Next.js font requirement.

### Type Scale

| Element | Classes | Size | Weight | Tracking |
|---|---|---|---|---|
| Hero H1 | `font-display text-[2.75rem] sm:text-7xl lg:text-[5.5rem] xl:text-[6rem]` | 44→96px | 500 | -0.025em |
| Section H2 | `font-display text-4xl sm:text-5xl lg:text-[3.5rem]` | 36→56px | 500 | -0.025em |
| Card H3 | `font-display text-lg` | 18px | 500 | -0.025em |
| Body | `text-base` | 16px | 400 | -0.011em |
| Body large | `text-lg sm:text-xl` | 18–20px | 400 | -0.011em |
| Small | `text-sm` | 14px | 400 | -0.011em |
| Eyebrow | `font-mono text-[11px] uppercase tracking-[0.18em]` | 11px | 600 | +0.18em |
| Caption | `font-mono text-[11px]` | 11px | 400 | 0 |
| Stat number | `font-display text-3xl marker-num tabular` | 30px | 500 | -0.025em |

### Typographic Patterns

**Italic highlight in headings:**
```tsx
<h2>{t.title} <em className="font-normal text-sage">{t.highlight}</em></h2>
```

**Section header with number + eyebrow:**
```tsx
<div className="flex items-center gap-3 text-muted-foreground">
  <span className="font-mono text-xs marker-num">01</span>
  <span className="h-px w-8 bg-border" />
  <span className="font-mono text-xs uppercase tracking-[0.18em] text-sage font-semibold">Features</span>
</div>
```

**Text balancing:** Use `text-balance` on headings, `text-pretty` on paragraphs.

---

## 7. Iconography

### Custom SVG Icon Set (`src/components/site/icons.tsx`)

**All UI icons are hand-drawn SVGs.** No lucide-react, no emoji-as-icon.

**Design rules:**
- 24×24 viewBox
- 1.5px stroke width
- `stroke="currentColor"` (inherits text color)
- Rounded line caps and joins (`strokeLinecap="round"`, `strokeLinejoin="round"`)
- `size` prop (default 16)

**Available icons (28 total):**

| Category | Icons |
|---|---|
| Botanical | `SproutIcon`, `SunIcon`, `CloudIcon`, `RainIcon`, `StormIcon`, `SnowIcon`, `DropletIcon`, `SparkIcon` |
| UI | `WalletIcon`, `ListIcon`, `BookIcon`, `BellIcon`, `GearIcon`, `ClockIcon`, `TrendingIcon` |
| Navigation | `ArrowRightIcon`, `ArrowUpRightIcon`, `ChevronDownIcon`, `MenuIcon`, `CloseIcon` |
| Status | `CheckIcon`, `PlusIcon`, `MinusIcon`, `LockIcon`, `ShieldIcon` |
| Brand | `GithubIcon`, `TerminalIcon`, `DaisyMark`, `SprigDivider` |

### DaisyMark (Logo)

The DaisyFlower logo — 8 petals (4 cardinal + 4 diagonal at 75% opacity) around a gold center.
Used in navbar, footer, auth modal, and as user avatar.

```tsx
<DaisyMark size={26} className="text-terra" />
```

### When to Use Emoji vs Icons

- **Emoji** = game content (🌻 sunflower, ☀️ sunny weather, 🪙 Daisies). These represent actual
  in-game items and are universal.
- **SVG icons** = UI affordances (buttons, nav, stats, tabs). These should never be emoji.

---

## 8. Spacing, Layout & Grid

### Container Widths

| Max width | Tailwind | Usage |
|---|---|---|
| 1152px | `max-w-6xl` | Standard sections (hero, features, galleries) |
| 768px | `max-w-3xl` | Prose-heavy (FAQ, manifestos, CTAs) |
| 896px | `max-w-4xl` | Focused content (mutation diagrams, mockups) |
| 1024px | `max-w-5xl` | Get-started page |

**Horizontal padding:** `px-5 sm:px-6` on all containers.

### Vertical Rhythm

| Context | Padding |
|---|---|
| Hero (top of page) | `pt-32 pb-20 md:pt-40 md:pb-24` (extra top for fixed navbar) |
| Standard section | `py-20 md:py-28` |
| Dense section | `py-16 md:py-24` |
| Inner page header | `pt-32 pb-12 md:pt-40 md:pb-16` |

### Grid Patterns

**Card grid (standard):**
```tsx
<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
```

**Hairline-separated grid (no gap, 1px borders):**
```tsx
<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border rounded-2xl overflow-hidden border border-border">
  <div className="bg-card p-5">...</div>
</div>
```

### Navbar Layout

- Fixed, height 64px (`h-16`)
- Transparent at scroll top, `bg-background/85 backdrop-blur-xl` after 8px scroll
- Three-zone layout: logo (left), nav links (centered absolutely), actions (right)
- Active route indicator: `motion.span` with `layoutId="nav-active"` (slides between links)

### Sticky Footer

```tsx
<div className="min-h-screen flex flex-col">
  <Navbar />
  <main className="flex-1">{children}</main>
  <Footer />
</div>
```

---

## 9. Component Library

### Core Components (`src/components/site/`)

| Component | File | Description |
|---|---|---|
| `Navbar` | `Navbar.tsx` | Fixed nav with route-aware active indicator, language switcher, auth state, mobile menu |
| `Footer` | `Footer.tsx` | Sitemap in 3 columns, persistent across all pages |
| `PageHeader` | `PageHeader.tsx` | Reusable header for inner pages (section number + eyebrow + title + description) |
| `Reveal` | `Reveal.tsx` | SSR-safe scroll animation wrapper (uses `initial={false}` + `whileInView`) |
| `AuthModal` | `AuthModal.tsx` | 3-step mock Discord login (intro → connecting → done) |
| `LanguageSwitcher` | `LanguageSwitcher.tsx` | Dropdown for EN / PT-BR with flags |
| `DashboardLayout` | `Dashboard.tsx` | 4-tab dashboard (Garden, Wallet, Missions, Collection) — exported for reuse |
| `icons` | `icons.tsx` | 28 custom SVG icons + DaisyMark logo |

### Reusable Patterns

**Hairline card:**
```tsx
<div className="card-hairline card-hairline-hover rounded-xl p-5">
  {/* content */}
</div>
```
- `.card-hairline`: 1px border, `bg-card`, 180ms transition on border-color
- `.card-hairline-hover:hover`: border darkens to `sage/30`

**Primary button:**
```tsx
className="rounded-lg bg-foreground text-background px-5 py-2.5 text-sm font-medium hover:bg-foreground/90 transition-colors"
```

**Ghost button:**
```tsx
className="rounded-lg px-4 py-2.5 text-sm font-medium text-foreground hover:bg-secondary transition-colors"
```

**Discord-branded button:**
```tsx
className="rounded-xl bg-[#5865F2] hover:bg-[#4752c4] text-white px-5 py-3 text-sm font-semibold"
```

**Discord mockup panel (dark):**
```tsx
<div className="bg-ink text-paper">
  {/* window chrome with terra/gold/sage dots */}
  {/* message area with bot response */}
</div>
```

---

## 10. Page Architecture & Routing

### Route Map

| Route | Type | Sections | Auth |
|---|---|---|---|
| `/` | Landing | Hero → What is → Features → How-it-works preview → Plant preview → Explore cards → Final CTA | No |
| `/how-it-works` | Inner | PageHeader → 3 steps → Discord mockup → Weather grid → Mutation diagram → CTA | No |
| `/plants` | Inner | PageHeader → Plant gallery (5 cards) → Mutation callout → CTA | No |
| `/panel` | App | PageHeader → Dashboard (login-gated) → "What you can do" grid | Mock |
| `/faq` | Inner | PageHeader → Accordion (8 items) → "Still have questions" | No |
| `/get-started` | Inner | PageHeader → 3 steps → Starter kit → Discord preview → Final CTA | No |
| `/not-found` | Error | 404 with DaisyMark + back to home | No |

### Layout Hierarchy

```
RootLayout (src/app/layout.tsx)
├── <html lang="en" suppressHydrationWarning>
├── <body suppressHydrationWarning>
│   └── I18nProvider (context)
│       ├── <div className="min-h-screen flex flex-col">
│       │   ├── Navbar (fixed, persistent)
│       │   ├── <main className="flex-1"> (page content)
│       │   └── Footer (persistent)
│       └── Toaster
```

**Navbar and Footer live in the root layout** — they persist across all route changes without
re-mounting. This means the language switcher, auth state, and active-route indicator all survive
navigation.

### Navigation

- Uses `next/link` for client-side navigation (no full page reload)
- `usePathname()` from `next/navigation` tracks the active route for the navbar indicator
- Mobile menu closes automatically on route change (`useEffect` watching `pathname`)
- User menu dropdown also closes on route change

### Dashboard as Separate App Area

The `/panel` route is intentionally separate from the landing page. It has:
- Its own PageHeader
- A login-gated state (blurred preview + "Connect to see" overlay when not authenticated)
- The 4-tab `DashboardLayout` component
- A "What you can do here" grid below

---

## 11. Internationalization (i18n)

### Architecture

```
I18nProvider (src/hooks/use-i18n.tsx)
├── locale: Locale ("en" | "pt-BR")
├── t: Translation (the full string tree)
├── setLocale(locale): switches language instantly
└── hydrated: boolean (false on SSR + first client render, true after mount)
```

### Default Language: English

The server always renders English. On mount, the client checks `localStorage` for a saved
preference and swaps if needed. This prevents hydration mismatches.

```tsx
// use-i18n.tsx — the hydration-safe pattern
const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE); // "en"
const [hydrated, setHydrated] = useState(false);

useEffect(() => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved && saved in translations) setLocaleState(saved);
  setHydrated(true);
}, []);
```

### Translation Files

| File | Language | Role |
|---|---|---|
| `src/lib/translations/en.ts` | English | Default. Defines the `Translation` type. |
| `src/lib/translations/pt-BR.ts` | Português | Must match the `Translation` type exactly. |
| `src/lib/translations/index.ts` | Registry | Imports both, exports `translations` record. |
| `src/lib/i18n-config.ts` | Config | `LOCALES` array, `DEFAULT_LOCALE`. |

### Translation Structure

The `Translation` type covers every user-facing string:
`nav`, `hero`, `whatIs`, `explore`, `finalCta`, `features` (6 items), `howItWorks` (steps, discord
mockup, weather, mutations), `plants` (5 items + callout), `panel` (locked state, dashboard with
4 tabs — garden/wallet/missions/collection), `faq` (8 items), `getStarted` (steps, kit, discord
preview), `footer`, `auth`, `userMenu`, `rarity`.

### Usage

```tsx
const { t } = useI18n();
return <h1>{t.hero.titleLine1} <em>{t.hero.titleHighlight}</em></h1>;
```

### Rules

1. **Never hardcode user-facing strings.** Always use `t.*`.
2. **Plant names and emoji are game content** — they may differ per language (e.g. "Sunflower" vs
   "Girassol") so they live in the translation files, not in a separate data file.
3. **Dynamic values** use `.replace("{year}", String(year))` pattern (see footer copyright).

### Adding a Language

1. Create `src/lib/translations/{code}.ts` — copy `en.ts`, translate every string
2. Register in `src/lib/translations/index.ts`
3. Add to `LOCALES` in `src/lib/i18n-config.ts`

---

## 12. Authentication (Mock)

### Architecture

```
useAuth (src/hooks/use-auth.ts)
├── player: MockPlayer | null
├── signIn(): sets player + saves to sessionStorage
├── signOut(): clears player + sessionStorage
└── hydrated: boolean (prevents hydration mismatch)
```

- Uses `sessionStorage` (not `localStorage`) so mock auth clears when the tab closes
- `hydrated` flag prevents SSR/client mismatch — server always renders signed-out
- The mock player is hardcoded: `petalkeeper`, Level 7

### Auth Flow

1. User clicks "Sign in" in navbar or "Sign in with Discord" on `/panel`
2. `AuthModal` opens with 3 states:
   - **intro**: benefits list + "Continue with Discord" button
   - **connecting**: spinner (1.8s) with DaisyMark
   - **done**: checkmark (1.2s) → auto-close + `onAuthenticated()` callback
3. `signIn()` is called, `player` state updates, navbar swaps to `UserMenu`

### AuthModal Implementation

Uses a `key` prop trick to reset internal state when reopening:
```tsx
<AuthModalInner key={open ? "open" : "closed"} ... />
```
This avoids `setState` in `useEffect` for the step reset.

---

## 13. Animation & Motion

### Principles

1. **Slow and calm.** Duration 0.5s, easing `[0.16, 1, 0.3, 1]` (ease-out-expo). Never bouncy.
2. **SSR-safe.** Never use `initial={{ opacity: 0 }}` with `animate` — it renders `opacity:0` in
   SSR, causing hydration mismatch when the client animates to 1. Use `initial={false}` instead.
3. **Subtle.** Movements are 6–16px. Delays are 0.05–0.2s.

### Reveal Component

The standard scroll-triggered animation:

```tsx
// src/components/site/Reveal.tsx
<motion.div
  initial={false}           // ← key: no opacity:0 in SSR
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-60px" }}
  transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
>
```

**Usage:**
```tsx
<Reveal delay={0.1}>
  <Card />
</Reveal>
```

### CSS Animations (in `globals.css`)

| Class | Duration | Easing | Usage |
|---|---|---|---|
| `animate-float-soft` | 7s | ease-in-out infinite | Floating elements (Pink Rose in mutation diagram) |
| `animate-pulse-dot` | 2.4s | ease-in-out infinite | "Live" / "synced" status dots |
| `animate-grow-up` | 0.7s | cubic-bezier(0.16,1,0.3,1) | One-time entrance (use sparingly) |
| `animate-spin-slow` | 1s | linear infinite | Loading spinners |
| `animate-draw-line` | 2s | ease-out | SVG line drawing |

### What NOT to Do

- ❌ `initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}` (hydration mismatch)
- ❌ `type: "spring"` or bouncy physics
- ❌ Parallax, scroll-jacking, auto-playing carousels
- ❌ `whileHover` with scale transforms (use color/border changes instead)

---

## 14. Accessibility

### Requirements

- **Semantic HTML:** `<header>`, `<main>`, `<section>`, `<nav>`, `<footer>`, `<h1>`–`<h3>` hierarchy
- **ARIA:** `aria-label` on icon-only buttons, `aria-expanded` on toggles/menus, `role="dialog"` +
  `aria-modal="true"` on modals
- **Keyboard:** All interactive elements reachable via Tab, Escape closes modals/menus
- **Focus:** Visible focus rings via `outline-ring/50` (from `@apply border-border outline-ring/50`)
- **Color contrast:** All text meets WCAG AA (4.5:1 body, 3:1 large text)

### Patterns

| Component | ARIA | Keyboard |
|---|---|---|
| Modal | `role="dialog"`, `aria-modal`, `aria-labelledby` | Escape closes, scroll locked |
| Dropdown (lang/user menu) | `aria-expanded` on trigger | Outside click closes, Escape closes |
| Mobile menu | `aria-expanded`, `aria-label` | — |
| Accordion (FAQ) | `aria-expanded` on trigger | — |
| Language switcher | `aria-label="Change language"` | — |

### SSR Considerations

- `suppressHydrationWarning` on `<html>` and `<body>` (needed for `lang` attribute and class
  changes from i18n/auth)
- Auth and i18n both use a `hydrated` flag pattern: server renders default state, client swaps
  after mount

---

## 15. Anti-Patterns (What We Avoid)

These are signals of generic, AI-generated frontend. **Do not do these.**

| Anti-pattern | Why | Do instead |
|---|---|---|
| Emoji as UI icons (🚀 ⚡ ✨ in buttons) | Looks unprofessional, inconsistent | Use custom SVG icon set |
| "Paper grain" dot textures | Faded trend, looks AI-generated | Clean solid backgrounds |
| Obvious multi-color gradients (`from-sage via-terra to-gold`) | Generic "pretty" gradient | Flat color or single-hue subtle wash |
| Shadow-heavy card stacks | Material Design feel | 1px hairline borders |
| "Code editor" mockups with fake syntax highlighting | Cliché dev-portfolio trope | Real diagrams or prose |
| `initial={{ opacity: 0 }}` with `animate` | Causes hydration mismatch | `initial={false}` + `whileInView` |
| Bouncy spring animations | Feels anxious, not calm | Slow ease-out-expo |
| Hardcoded user-facing strings | Breaks i18n | Always use `t.*` from translations |
| Indigo or blue colors | Wrong palette — site is warm/earthy | Sage, terra, gold, sky-soft |
| Centered everything | Looks generic | Asymmetric, editorial layouts |
| `lucide-react` icons in site components | External dependency, wrong style | Custom SVGs in `icons.tsx` |

---

## 16. File Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout (I18nProvider, Navbar, Footer, fonts)
│   ├── page.tsx                # Landing page (/)
│   ├── globals.css             # Design tokens, base styles, utilities
│   ├── not-found.tsx           # 404 page
│   ├── how-it-works/
│   │   └── page.tsx
│   ├── plants/
│   │   └── page.tsx
│   ├── panel/
│   │   └── page.tsx            # Dashboard (separate app area)
│   ├── faq/
│   │   └── page.tsx
│   ├── get-started/
│   │   └── page.tsx
│   └── api/
│       └── route.ts            # API health check
├── components/
│   ├── site/                   # DaisyFlower-specific components
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── PageHeader.tsx
│   │   ├── Reveal.tsx
│   │   ├── AuthModal.tsx
│   │   ├── LanguageSwitcher.tsx
│   │   ├── Dashboard.tsx       # DashboardLayout (exported, used by /panel)
│   │   └── icons.tsx           # 28 custom SVG icons + DaisyMark
│   └── ui/                     # shadcn/ui primitives (available but rarely used)
├── hooks/
│   ├── use-i18n.tsx            # I18nProvider + useI18n hook
│   ├── use-auth.ts             # Mock auth with sessionStorage
│   ├── use-mobile.ts
│   └── use-toast.ts
└── lib/
    ├── i18n-config.ts          # LOCALES array, DEFAULT_LOCALE
    ├── translations/
    │   ├── index.ts            # Registry
    │   ├── en.ts               # English (default, defines Translation type)
    │   └── pt-BR.ts            # Portuguese
    ├── utils.ts                # cn() class merge helper
    └── db.ts                   # Prisma client (unused by site, available)
```

### What Was Removed (Cleanup Notes)

- **`src/lib/daisy-data.ts`** — deleted. Was a legacy Portuguese-only data file that conflicted
  with the i18n system. All data now lives in translation files.
- **`src/components/site/Hero.tsx`, `FAQ.tsx`, `GetStarted.tsx`, `GardenGallery.tsx`,
  `HowToPlay.tsx`** — deleted. Were orphaned components from the single-page era, no longer
  imported by any route. All page content now lives directly in `src/app/*/page.tsx`.

---

## 17. Development Workflow

### Commands

| Command | Purpose |
|---|---|
| `bun run dev` | Start dev server on port 3000 (automatic) |
| `bun run lint` | ESLint check (must pass before commit) |
| `bun run build` | Production build |

### Dev Server

- Runs automatically on port 3000 — **do not run `bun run dev` manually**
- Check `/home/z/my-project/dev.log` for errors
- The user can only see the `/` route — all routes are accessible via navigation

### Adding a New Page

1. Create `src/app/{route}/page.tsx`
2. Add `"use client"` directive (needed for `useI18n`)
3. Add route to `NAV_LINKS` in `Navbar.tsx` (if it should appear in nav)
4. Add all strings to BOTH `en.ts` and `pt-BR.ts`
5. Use `PageHeader` component for the header
6. Add footer links if appropriate
7. Test language switching on the new page
8. Test at 390px (mobile) and 1440px (desktop)

### Adding a New Icon

1. Add to `src/components/site/icons.tsx`
2. Follow the `base()` helper pattern (1.5px stroke, 24×24 viewBox, `currentColor`)
3. Export as named function

### Adding a New Translation Key

1. Add to `en.ts` first (this defines the type)
2. Add the same key to `pt-BR.ts`
3. TypeScript will error if `pt-BR.ts` doesn't match the type

---

## 18. Contribution Checklist

Before merging any visual change, verify:

- [ ] No hardcoded user-facing strings (all through `t.*`)
- [ ] No emoji used as UI icons (use SVG icon set)
- [ ] No `initial={{ opacity: 0 }}` with `animate` (use `Reveal` or `initial={false}`)
- [ ] No indigo or blue colors
- [ ] No shadow-heavy cards (use `card-hairline` + `border`)
- [ ] Works in both English and Portuguese
- [ ] Responsive at 390px, 768px, 1024px, 1440px
- [ ] `bun run lint` passes with 0 errors
- [ ] No orphaned files (if you remove a route, remove its components too)
- [ ] Translation type matches (adding a key to `en.ts` requires adding to `pt-BR.ts`)

---

*This document is the source of truth. When the design system evolves, update this file first,
then update the code to match.*
