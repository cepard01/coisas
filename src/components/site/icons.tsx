import type { SVGProps } from "react";

/**
 * Custom icon set for DaisyFlower.
 * Hand-drawn, single-stroke botanical/UI icons — replaces emoji-as-icon usage.
 * All icons inherit currentColor and use 1.5px strokes for a consistent feel.
 */

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function base({ size = 16, ...props }: IconProps) {
  return {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    ...props,
  };
}

export function SproutIcon(p: IconProps) {
  return (
    <svg {...base(p)}>
      <path d="M12 21v-8" />
      <path d="M12 13c0-3-2-5-5-5-1 0-2 .3-2 .3S5 13 12 13Z" />
      <path d="M12 13c0-3 2-5 5-5 1 0 2 .3 2 .3S19 13 12 13Z" />
      <path d="M9 21h6" />
    </svg>
  );
}

export function SunIcon(p: IconProps) {
  return (
    <svg {...base(p)}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 3v1.5M12 19.5V21M3 12h1.5M19.5 12H21M5.6 5.6l1 1M17.4 17.4l1 1M5.6 18.4l1-1M17.4 6.6l1-1" />
    </svg>
  );
}

export function CloudIcon(p: IconProps) {
  return (
    <svg {...base(p)}>
      <path d="M7 18a4 4 0 1 1 .5-7.97A5.5 5.5 0 0 1 18 11.5a3.5 3.5 0 0 1 0 7H7Z" />
    </svg>
  );
}

export function RainIcon(p: IconProps) {
  return (
    <svg {...base(p)}>
      <path d="M7 15a4 4 0 1 1 .5-7.97A5.5 5.5 0 0 1 18 8.5a3.5 3.5 0 0 1 0 7H7Z" />
      <path d="M9 18v2M13 18v2M17 18v2" />
    </svg>
  );
}

export function StormIcon(p: IconProps) {
  return (
    <svg {...base(p)}>
      <path d="M7 15a4 4 0 1 1 .5-7.97A5.5 5.5 0 0 1 18 8.5a3.5 3.5 0 0 1 0 7H7Z" />
      <path d="M13 14l-3 5h3l-2 4" />
    </svg>
  );
}

export function SnowIcon(p: IconProps) {
  return (
    <svg {...base(p)}>
      <path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6L5.6 18.4" />
    </svg>
  );
}

export function DropletIcon(p: IconProps) {
  return (
    <svg {...base(p)}>
      <path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11Z" />
    </svg>
  );
}

export function ClockIcon(p: IconProps) {
  return (
    <svg {...base(p)}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

export function SparkIcon(p: IconProps) {
  return (
    <svg {...base(p)}>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M6 18l2.5-2.5M15.5 8.5L18 6" />
    </svg>
  );
}

export function WalletIcon(p: IconProps) {
  return (
    <svg {...base(p)}>
      <path d="M3 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v1" />
      <path d="M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2H5a2 2 0 0 1-2-2Z" />
      <circle cx="16" cy="13" r="1" />
    </svg>
  );
}

export function ListIcon(p: IconProps) {
  return (
    <svg {...base(p)}>
      <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
    </svg>
  );
}

export function BookIcon(p: IconProps) {
  return (
    <svg {...base(p)}>
      <path d="M4 4v16a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H6a2 2 0 0 0-2 2Z" />
      <path d="M4 4a2 2 0 0 1 2-2h12" />
    </svg>
  );
}

export function BellIcon(p: IconProps) {
  return (
    <svg {...base(p)}>
      <path d="M6 9a6 6 0 0 1 12 0c0 4 1.5 5 2 6H4c.5-1 2-2 2-6Z" />
      <path d="M10 19a2 2 0 0 0 4 0" />
    </svg>
  );
}

export function GearIcon(p: IconProps) {
  return (
    <svg {...base(p)}>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1l2.1-2.1M17 7l2.1-2.1" />
    </svg>
  );
}

export function ArrowRightIcon(p: IconProps) {
  return (
    <svg {...base(p)}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function ArrowUpRightIcon(p: IconProps) {
  return (
    <svg {...base(p)}>
      <path d="M7 17L17 7M9 7h8v8" />
    </svg>
  );
}

export function CheckIcon(p: IconProps) {
  return (
    <svg {...base(p)}>
      <path d="M4 12l5 5L20 6" />
    </svg>
  );
}

export function PlusIcon(p: IconProps) {
  return (
    <svg {...base(p)}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export function MinusIcon(p: IconProps) {
  return (
    <svg {...base(p)}>
      <path d="M5 12h14" />
    </svg>
  );
}

export function MenuIcon(p: IconProps) {
  return (
    <svg {...base(p)}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function CloseIcon(p: IconProps) {
  return (
    <svg {...base(p)}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

export function ChevronDownIcon(p: IconProps) {
  return (
    <svg {...base(p)}>
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

export function LockIcon(p: IconProps) {
  return (
    <svg {...base(p)}>
      <rect x="5" y="11" width="14" height="9" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </svg>
  );
}

export function ShieldIcon(p: IconProps) {
  return (
    <svg {...base(p)}>
      <path d="M12 3l8 3v5c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6l8-3Z" />
    </svg>
  );
}

export function GithubIcon(p: IconProps) {
  return (
    <svg {...base(p)} strokeWidth={0} fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.09.66-.22.66-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02.8-.22 1.65-.33 2.5-.33.85 0 1.7.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.74c0 .27.16.58.67.48A10 10 0 0 0 22 12c0-5.52-4.48-10-10-10Z" />
    </svg>
  );
}

export function TerminalIcon(p: IconProps) {
  return (
    <svg {...base(p)}>
      <path d="M4 5h16v14H4z" />
      <path d="M8 9l3 3-3 3M13 15h3" />
    </svg>
  );
}

export function TrendingIcon(p: IconProps) {
  return (
    <svg {...base(p)}>
      <path d="M3 17l6-6 4 4 8-8M14 7h7v7" />
    </svg>
  );
}

export function SearchIcon(p: IconProps) {
  return (
    <svg {...base(p)}>
      <circle cx="11" cy="11" r="7" />
      <path d="M16 16l4 4" />
    </svg>
  );
}

export function ShopIcon(p: IconProps) {
  return (
    <svg {...base(p)}>
      <path d="M4 7h16l-1 3H5L4 7Z" />
      <path d="M5 10v9a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-9" />
      <path d="M9 14h6" />
    </svg>
  );
}

export function WeatherIcon(p: IconProps) {
  return (
    <svg {...base(p)}>
      <path d="M7 18a4 4 0 1 1 .5-7.97A5.5 5.5 0 0 1 18 11.5a3.5 3.5 0 0 1 0 7H7Z" />
      <path d="M12 3v2M16 5l-1 1M8 5l1 1" />
    </svg>
  );
}

/* ── Botanical decorative icons (larger, for illustration) ──────────── */

export function DaisyMark({ size = 32, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none" {...props}>
      {/* Petals — 8 around center */}
      <g fill="currentColor">
        <ellipse cx="18" cy="7" rx="2.8" ry="5" />
        <ellipse cx="18" cy="29" rx="2.8" ry="5" />
        <ellipse cx="7" cy="18" rx="5" ry="2.8" />
        <ellipse cx="29" cy="18" rx="5" ry="2.8" />
      </g>
      <g fill="currentColor" opacity="0.75">
        <ellipse cx="10" cy="10" rx="2.8" ry="5" transform="rotate(-45 10 10)" />
        <ellipse cx="26" cy="10" rx="2.8" ry="5" transform="rotate(45 26 10)" />
        <ellipse cx="10" cy="26" rx="2.8" ry="5" transform="rotate(45 10 26)" />
        <ellipse cx="26" cy="26" rx="2.8" ry="5" transform="rotate(-45 26 26)" />
      </g>
      <circle cx="18" cy="18" r="4.5" fill="oklch(0.62 0.12 75)" />
    </svg>
  );
}

/** A small botanical sprig — for decorative dividers */
export function SprigDivider({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 24" fill="none" className={className} aria-hidden>
      <path
        d="M10 12h100"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.3"
      />
      <path
        d="M55 12c0-4 2-6 5-6M65 12c0-4-2-6-5-6M55 12c0 4 2 6 5 6M65 12c0 4-2 6-5 6"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        fill="none"
        opacity="0.5"
      />
      <circle cx="60" cy="12" r="2" fill="currentColor" opacity="0.6" />
    </svg>
  );
}
