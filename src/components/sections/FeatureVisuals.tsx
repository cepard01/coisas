"use client";

/**
 * Hand-drawn SVG visualizations for each feature card.
 * Minimalist, editorial — matches the site's calm aesthetic.
 * Each visual sits in a fixed-height container to keep the grid aligned.
 */

/* ── 1. Simulation: timeline showing timestamps ─────────────────────── */

export function SimulationVisual() {
  return (
    <div className="h-32 mt-4 rounded-lg border border-border bg-background/40 p-4 overflow-hidden">
      <svg viewBox="0 0 280 100" className="w-full h-full" preserveAspectRatio="xMidYMid meet" aria-hidden>
        {/* Timeline base */}
        <line x1="20" y1="60" x2="260" y2="60" stroke="oklch(0.9 0.008 75)" strokeWidth="1.5" />

        {/* Markers */}
        {[
          { x: 30, label: "planted", time: "10:24", color: "oklch(0.48 0.012 75)" },
          { x: 100, label: "watered", time: "10:54", color: "oklch(0.46 0.06 145)" },
          { x: 160, label: "sunny", time: "11:08", color: "oklch(0.8 0.1 85)" },
          { x: 240, label: "now", time: "11:32", color: "oklch(0.68 0.1 45)" },
        ].map((m) => (
          <g key={m.label}>
            <circle cx={m.x} cy="60" r="4" fill={m.color} />
            <text x={m.x} y="42" textAnchor="middle" fontSize="9" fill="oklch(0.48 0.012 75)" fontFamily="monospace">
              {m.time}
            </text>
            <text x={m.x} y="80" textAnchor="middle" fontSize="10" fill="oklch(0.21 0.012 75)" fontFamily="serif" fontStyle="italic">
              {m.label}
            </text>
          </g>
        ))}

        {/* Now indicator */}
        <line x1="240" y1="25" x2="240" y2="95" stroke="oklch(0.68 0.1 45)" strokeWidth="1" strokeDasharray="2 3" opacity="0.4" />
      </svg>
    </div>
  );
}

/* ── 2. Weather: 5-day forecast strip ────────────────────────────────── */

export function WeatherVisual() {
  const days = [
    { d: "now", emoji: "☀️", active: true },
    { d: "+4h", emoji: "🌧️" },
    { d: "+8h", emoji: "☀️" },
    { d: "+12h", emoji: "⛈️" },
    { d: "+16h", emoji: "🌨️" },
  ];
  return (
    <div className="h-32 mt-4 rounded-lg border border-border bg-background/40 p-3 grid grid-cols-5 gap-1.5">
      {days.map((d) => (
        <div
          key={d.d}
          className={`rounded-md border p-2 text-center flex flex-col items-center justify-center ${
            d.active ? "border-foreground/30 bg-secondary/40" : "border-transparent"
          }`}
        >
          <span className="text-lg leading-none">{d.emoji}</span>
          <span className="mt-1 font-mono text-[9px] text-muted-foreground">{d.d}</span>
        </div>
      ))}
    </div>
  );
}

/* ── 3. Mutations: red + white → pink diagram ────────────────────────── */

export function MutationVisual() {
  return (
    <div className="h-32 mt-4 rounded-lg border border-border bg-background/40 grid place-items-center">
      <svg viewBox="0 0 280 100" className="w-full h-full px-4" preserveAspectRatio="xMidYMid meet" aria-hidden>
        <g transform="translate(40, 20)">
          <circle cx="0" cy="30" r="18" fill="oklch(0.62 0.16 15)" />
          <circle cx="-7" cy="25" r="11" fill="oklch(0.58 0.16 15)" />
          <circle cx="7" cy="25" r="11" fill="oklch(0.65 0.17 15)" />
          <circle cx="0" cy="20" r="9" fill="oklch(0.7 0.18 15)" />
          <path d="M0 48 L0 75" stroke="oklch(0.42 0.06 145)" strokeWidth="2" strokeLinecap="round" />
        </g>

        <text x="110" y="55" textAnchor="middle" fontSize="20" fill="oklch(0.7 0.01 75)" fontFamily="serif">+</text>

        <g transform="translate(140, 20)">
          <circle cx="0" cy="30" r="18" fill="oklch(0.94 0.01 75)" stroke="oklch(0.85 0.01 75)" strokeWidth="1" />
          <circle cx="-7" cy="25" r="11" fill="oklch(0.92 0.008 75)" />
          <circle cx="7" cy="25" r="11" fill="oklch(0.96 0.005 75)" />
          <circle cx="0" cy="20" r="9" fill="oklch(0.98 0.004 75)" />
          <path d="M0 48 L0 75" stroke="oklch(0.42 0.06 145)" strokeWidth="2" strokeLinecap="round" />
        </g>

        <text x="210" y="55" textAnchor="middle" fontSize="20" fill="oklch(0.7 0.01 75)" fontFamily="serif">→</text>

        <g transform="translate(240, 20)">
          <circle cx="0" cy="30" r="18" fill="oklch(0.75 0.13 350)" />
          <circle cx="-7" cy="25" r="11" fill="oklch(0.72 0.13 350)" />
          <circle cx="7" cy="25" r="11" fill="oklch(0.78 0.12 350)" />
          <circle cx="0" cy="20" r="9" fill="oklch(0.82 0.1 350)" />
          <path d="M0 48 L0 75" stroke="oklch(0.42 0.06 145)" strokeWidth="2" strokeLinecap="round" />
        </g>
      </svg>
    </div>
  );
}

/* ── 4. Interface: mini Discord panel mockup ─────────────────────────── */

export function InterfaceVisual() {
  return (
    <div className="h-32 mt-4 rounded-lg border border-border bg-ink p-3 overflow-hidden">
      <div className="flex items-center gap-1.5 mb-2">
        <span className="h-1.5 w-1.5 rounded-full bg-terra/60" />
        <span className="h-1.5 w-1.5 rounded-full bg-gold/60" />
        <span className="h-1.5 w-1.5 rounded-full bg-sage/60" />
        <span className="ml-auto font-mono text-[9px] text-paper/40">/garden</span>
      </div>
      <div className="rounded bg-[oklch(0.22 0.01 150)] p-2">
        <p className="text-[10px] text-paper font-medium">🌼 My Garden</p>
        <p className="text-[9px] text-paper/50 mt-0.5">2 ready · humidity 50%</p>
        <div className="mt-2 flex gap-1">
          <span className="rounded bg-sage text-white px-1.5 py-0.5 text-[8px] font-medium">Plant</span>
          <span className="rounded bg-white/10 text-paper px-1.5 py-0.5 text-[8px]">Harvest</span>
          <span className="rounded bg-white/10 text-paper px-1.5 py-0.5 text-[8px]">Shop</span>
        </div>
      </div>
    </div>
  );
}

/* ── 5. Languages: EN / PT toggle ────────────────────────────────────── */

export function LanguagesVisual() {
  return (
    <div className="h-32 mt-4 rounded-lg border border-border bg-background/40 grid place-items-center">
      <div className="flex items-center gap-3">
        <div className="rounded-lg border-2 border-sage bg-sage/10 px-4 py-3 text-center">
          <div className="text-xl">🇬🇧</div>
          <p className="mt-1 font-mono text-[10px] text-sage font-semibold">EN</p>
        </div>
        <span className="font-display text-xl text-muted-foreground">↔</span>
        <div className="rounded-lg border border-border px-4 py-3 text-center">
          <div className="text-xl">🇧🇷</div>
          <p className="mt-1 font-mono text-[10px] text-muted-foreground">PT-BR</p>
        </div>
      </div>
    </div>
  );
}

/* ── 6. Content: file tree ───────────────────────────────────────────── */

export function ContentVisual() {
  return (
    <div className="h-32 mt-4 rounded-lg border border-border bg-background/40 p-3 overflow-hidden">
      <div className="font-mono text-[10px] space-y-0.5">
        <div className="text-muted-foreground">src/data/</div>
        <div className="pl-3 text-foreground">seeds.json <span className="text-muted-foreground">— 4</span></div>
        <div className="pl-3 text-foreground">flowers.json <span className="text-muted-foreground">— 2</span></div>
        <div className="pl-3 text-foreground">weather.json <span className="text-muted-foreground">— 4</span></div>
        <div className="pl-3 text-foreground">mutations.json <span className="text-muted-foreground">— 1</span></div>
        <div className="pl-3 text-sage mt-1">+ lavender.json <span className="text-muted-foreground italic">{"// new"}</span></div>
      </div>
    </div>
  );
}

/* ── Registry ────────────────────────────────────────────────────────── */

export const FEATURE_VISUALS = [
  SimulationVisual,
  WeatherVisual,
  MutationVisual,
  InterfaceVisual,
  LanguagesVisual,
  ContentVisual,
];
