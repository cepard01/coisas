/**
 * Static catalog data for the DaisyFlower website.
 * Sourced directly from the DaisyFlower repository (src/data/*.json)
 * and curated from docs/commands.md, docs/gameplay.md, and docs/architecture.md.
 */

export type Rarity = "common" | "uncommon" | "rare" | "epic" | "legendary";

export interface SeedEntry {
  id: string;
  name: string;
  emoji: string;
  rarity: Rarity;
  requiredHumidity: number;
  growthTime: number; // seconds
  price?: number;
  description: string;
  source: "shop" | "mutation" | "event";
}

export interface FlowerEntry {
  id: string;
  name: string;
  emoji: string;
  rarity: Rarity;
  sellPrice: number;
  description: string;
}

export interface CropEntry {
  id: string;
  name: string;
  emoji: string;
  rarity: Rarity;
  sellPrice: number;
  description: string;
}

export interface WeatherEntry {
  id: string;
  emoji: string;
  label: string;
  growthMultiplier: number;
  hydrationLossMultiplier: number;
  description: string;
  tone: "sun" | "rain" | "storm" | "snow";
}

export interface MutationEntry {
  id: string;
  emoji: string;
  inputs: string[];
  inputsEmojis: string[];
  output: string;
  outputEmoji: string;
  chance: number;
  description: string;
}

export interface ItemEntry {
  id: string;
  name: string;
  emoji: string;
  type: "tool" | "consumable";
  price: number;
  description: string;
}

export interface DecorationEntry {
  id: string;
  name: string;
  emoji: string;
  price: number;
  description: string;
}

export interface CommandEntry {
  name: string;
  category: "Core" | "Economy" | "Progression" | "System" | "Info";
  type: "slash" | "both";
  status: "Implemented" | "MVP planned" | "Post-MVP planned" | "LiveOps planned";
  description: string;
  aliases?: string[];
}

/* ── Seeds ──────────────────────────────────────────────────────────── */
export const SEEDS: SeedEntry[] = [
  {
    id: "seed_sunflower",
    name: "Sunflower Seed",
    emoji: "🌻",
    rarity: "common",
    requiredHumidity: 20,
    growthTime: 60,
    price: 50,
    description: "Plant to grow a bright, friendly Sunflower.",
    source: "shop",
  },
  {
    id: "seed_rose",
    name: "Red Rose Seed",
    emoji: "🌹",
    rarity: "uncommon",
    requiredHumidity: 40,
    growthTime: 120,
    price: 100,
    description: "Plant to grow a beautiful Red Rose.",
    source: "shop",
  },
  {
    id: "seed_rose_white",
    name: "White Rose Seed",
    emoji: "🤍",
    rarity: "uncommon",
    requiredHumidity: 40,
    growthTime: 120,
    price: 100,
    description: "Plant to grow a delicate White Rose.",
    source: "shop",
  },
  {
    id: "seed_rose_pink",
    name: "Pink Rose Seed",
    emoji: "🌸",
    rarity: "rare",
    requiredHumidity: 70,
    growthTime: 180,
    description: "A rare hybrid pink rose — only obtainable through mutation.",
    source: "mutation",
  },
];

/* ── Flowers ────────────────────────────────────────────────────────── */
export const FLOWERS: FlowerEntry[] = [
  {
    id: "flower_sunflower",
    name: "Sunflower",
    emoji: "🌻",
    rarity: "common",
    sellPrice: 200,
    description: "A bright yellow flower that follows the sun.",
  },
  {
    id: "flower_rose",
    name: "Rose",
    emoji: "🌹",
    rarity: "uncommon",
    sellPrice: 400,
    description: "A timeless red rose with velvety petals.",
  },
];

/* ── Crops ──────────────────────────────────────────────────────────── */
export const CROPS: CropEntry[] = [
  {
    id: "crop_carrot",
    name: "Carrot",
    emoji: "🥕",
    rarity: "common",
    sellPrice: 50,
    description: "A crunchy orange vegetable, freshly pulled from the soil.",
  },
];

/* ── Weather ────────────────────────────────────────────────────────── */
export const WEATHER: WeatherEntry[] = [
  {
    id: "SUNNY",
    emoji: "☀️",
    label: "Sunny",
    growthMultiplier: 1.5,
    hydrationLossMultiplier: 2.0,
    description: "Plants grow faster, but water drains faster. Check hydration before leaving.",
    tone: "sun",
  },
  {
    id: "RAIN",
    emoji: "🌧️",
    label: "Rain",
    growthMultiplier: 1.0,
    hydrationLossMultiplier: 0.0,
    description: "A safe time to let plants grow. Rain refills the soil for free.",
    tone: "rain",
  },
  {
    id: "STORM",
    emoji: "⛈️",
    label: "Storm",
    growthMultiplier: 0.8,
    hydrationLossMultiplier: -0.5,
    description: "Growth slows, but storms open special mutation chances later.",
    tone: "storm",
  },
  {
    id: "SNOW",
    emoji: "🌨️",
    label: "Snow",
    growthMultiplier: 0.5,
    hydrationLossMultiplier: 0.5,
    description: "Slow growth, but supports rare winter plants in the future.",
    tone: "snow",
  },
];

/* ── Mutations ──────────────────────────────────────────────────────── */
export const MUTATIONS: MutationEntry[] = [
  {
    id: "rose_pink_mutation",
    emoji: "🌸",
    inputs: ["Red Rose Seed", "White Rose Seed"],
    inputsEmojis: ["🌹", "🤍"],
    output: "Pink Rose Seed",
    outputEmoji: "🌸",
    chance: 0.3,
    description:
      "Plant a Red Rose and a White Rose side by side. When both mature, there is a 30% chance one will bloom as a rare Pink Rose.",
  },
];

/* ── Items / Tools / Consumables ────────────────────────────────────── */
export const ITEMS: ItemEntry[] = [
  {
    id: "watering_can",
    name: "Watering Can",
    emoji: "🚿",
    type: "tool",
    price: 500,
    description: "Used to water plants and refill garden humidity.",
  },
  {
    id: "fertilizer",
    name: "Basic Fertilizer",
    emoji: "💩",
    type: "consumable",
    price: 50,
    description: "Speeds up plant growth by 10%.",
  },
];

/* ── Decorations ────────────────────────────────────────────────────── */
export const DECORATIONS: DecorationEntry[] = [
  {
    id: "scarecrow",
    name: "Scarecrow",
    emoji: "🎃",
    price: 1500,
    description: "Keeps the birds away from your prized flowers.",
  },
  {
    id: "gnome",
    name: "Garden Gnome",
    emoji: "👺",
    price: 1000,
    description: "A lucky charm that watches over your garden.",
  },
];

/* ── Commands ───────────────────────────────────────────────────────── */
export const COMMANDS: CommandEntry[] = [
  {
    name: "/start",
    category: "Core",
    type: "both",
    status: "Implemented",
    description: "Begin onboarding or open your existing garden. The first command every new player uses.",
    aliases: ["iniciar", "journey"],
  },
  {
    name: "/garden",
    category: "Core",
    type: "both",
    status: "Implemented",
    description: "Main garden dashboard. Shows weather, humidity, plant status, and a recommended next action.",
    aliases: ["jardim"],
  },
  {
    name: "/plant",
    category: "Core",
    type: "both",
    status: "Implemented",
    description: "Opens the guided planting flow — pick a slot, choose a seed, confirm.",
    aliases: ["plantar", "semear"],
  },
  {
    name: "/harvest",
    category: "Core",
    type: "both",
    status: "Implemented",
    description: "Harvest mature plants and collect items, XP, and possible mutation discoveries.",
    aliases: ["colher", "colheita"],
  },
  {
    name: "/weather",
    category: "Core",
    type: "both",
    status: "Implemented",
    description: "Show the current weather, growth and hydration effects, the next change, and the forecast.",
    aliases: ["clima"],
  },
  {
    name: "/wallet",
    category: "Economy",
    type: "both",
    status: "Implemented",
    description: "Display your Daisies balance, level, XP, and progression to the next unlock.",
    aliases: ["saldo", "money", "balance", "atm"],
  },
  {
    name: "/inventory",
    category: "Economy",
    type: "both",
    status: "Implemented",
    description: "Browse your bag — seeds, flowers, crops, tools, consumables, and decorations.",
    aliases: ["inv", "bag", "mochila"],
  },
  {
    name: "/shop",
    category: "Economy",
    type: "both",
    status: "Implemented",
    description: "Open the shop panel. Buy seeds, tools, consumables, and decorations.",
    aliases: ["loja", "store", "market", "mercado"],
  },
  {
    name: "/settings",
    category: "System",
    type: "both",
    status: "Implemented",
    description: "Manage your language preference, terms status, and notification settings.",
  },
  {
    name: "/config",
    category: "System",
    type: "slash",
    status: "Implemented",
    description: "Owner-only live configuration management. Read and write runtime config values.",
  },
  {
    name: "/ping",
    category: "Info",
    type: "both",
    status: "Implemented",
    description: "Check bot latency, uptime, MongoDB and Redis status, and loaded command count.",
  },
  {
    name: "/help",
    category: "Info",
    type: "both",
    status: "Implemented",
    description: "Show getting started guide, command categories, and links to key panels.",
  },
  {
    name: "/water",
    category: "Core",
    type: "both",
    status: "MVP planned",
    description: "Open the watering flow directly. Show plants that need water and confirm action.",
  },
  {
    name: "/missions",
    category: "Progression",
    type: "both",
    status: "MVP planned",
    description: "Open the mission panel. Tutorial, daily, weekly, event, and claimable missions.",
    aliases: ["mission", "quests", "tasks"],
  },
  {
    name: "/collection",
    category: "Progression",
    type: "both",
    status: "MVP planned",
    description: "Open the Collection Book — discovered flowers, mutations, event collections, and locked hints.",
    aliases: ["book", "codex", "album"],
  },
  {
    name: "/profile",
    category: "Progression",
    type: "both",
    status: "MVP planned",
    description: "Show player profile — level, title, collection progress, badges, and favorite plant.",
    aliases: ["me", "player", "perfil"],
  },
  {
    name: "/event",
    category: "Progression",
    type: "both",
    status: "MVP planned",
    description: "Open the active Event Hub — event missions, event shop, and event collection.",
    aliases: ["events", "festival"],
  },
  {
    name: "/leaderboard",
    category: "Progression",
    type: "both",
    status: "Post-MVP planned",
    description: "Show rankings — level, collection, mutations, event points, and harvest count.",
    aliases: ["rank", "ranking", "lb"],
  },
  {
    name: "/upgrade",
    category: "Economy",
    type: "both",
    status: "Post-MVP planned",
    description: "Open the garden upgrade panel — more slots, better humidity, slower hydration loss.",
  },
];

/* ── Tech stack ─────────────────────────────────────────────────────── */
export interface TechEntry {
  name: string;
  version: string;
  role: string;
  emoji: string;
}

export const TECH_STACK: TechEntry[] = [
  {
    name: "TypeScript",
    version: "5.x",
    role: "End-to-end type safety across commands, services, schemas, and viewers.",
    emoji: "🟦",
  },
  {
    name: "Discord.js",
    version: "v14",
    role: "Gateway connection, Components v2 UI, slash commands, buttons, select menus, and modals.",
    emoji: "💬",
  },
  {
    name: "MongoDB",
    version: "via Mongoose",
    role: "Durable source of truth for users, gardens, inventory, weather journal, and live config.",
    emoji: "🍃",
  },
  {
    name: "Redis",
    version: "via ioredis",
    role: "Acceleration layer for cache, cooldowns, weather state, and sorted sets — with failover mode.",
    emoji: "⚡",
  },
  {
    name: "i18next",
    version: "23.x",
    role: "Multilingual UI with pt-BR and en-US locales, per-command JSON files, and emoji packs.",
    emoji: "🌍",
  },
  {
    name: "Pino",
    version: "10.x",
    role: "Structured logging through LoggerManager with pretty printing in development.",
    emoji: "🪵",
  },
];

/* ── Features ───────────────────────────────────────────────────────── */
export interface FeatureEntry {
  icon: string;
  title: string;
  description: string;
  accent: "leaf" | "sun" | "rose" | "sky";
}

export const FEATURES: FeatureEntry[] = [
  {
    icon: "⏱️",
    title: "Lazy deterministic simulation",
    description:
      "Plants store timestamps — not timers. The current state is computed on demand from time, weather history, and modifiers. No per-plant setTimeouts, no per-user cron jobs, and the game scales far beyond timer-based simulations.",
    accent: "leaf",
  },
  {
    icon: "🌦️",
    title: "Living weather system",
    description:
      "Weather rotates on a 4-hour cycle with a 5-step forecast. Sunny boosts growth but drains water; Rain refills soil for free; Storms unlock rare mutation chances; Snow supports future winter plants.",
    accent: "sky",
  },
  {
    icon: "🧬",
    title: "Discovery-driven mutations",
    description:
      "Plant compatible seeds side by side and harvest for a chance at rare hybrids. Hints appear when adjacency is right, and discoveries are recorded in the Collection Book — never random confusion.",
    accent: "rose",
  },
  {
    icon: "🎛️",
    title: "UI-first gameplay",
    description:
      "Commands open panels. Panels guide the player. Most actions happen through buttons, select menus, and modals — slash and prefix commands are entry points and shortcuts, not the main interface.",
    accent: "sun",
  },
  {
    icon: "🌍",
    title: "Multilingual & localized",
    description:
      "Built-in pt-BR and en-US locales with per-command translation files, Discord locale detection, user/guild language preferences, and swappable emoji packs (default + seasonal).",
    accent: "leaf",
  },
  {
    icon: "📦",
    title: "Scalable content packs",
    description:
      "New plants, missions, events, items, and decorations arrive through data-driven JSON registries with stable IDs and validation — no core system rewrites needed to ship new content.",
    accent: "sun",
  },
];

/* ── Gameplay loop steps ────────────────────────────────────────────── */
export interface LoopStep {
  emoji: string;
  title: string;
  description: string;
}

export const GAMEPLAY_LOOP: LoopStep[] = [
  {
    emoji: "🌱",
    title: "Plant",
    description: "Pick a slot, choose a seed from your bag, and confirm. The bot checks humidity, ownership, and weather effects before you commit.",
  },
  {
    emoji: "🌧️",
    title: "Grow",
    description: "Plants grow in real time using weather history and hydration. You don't need to keep the bot open — return whenever you like.",
  },
  {
    emoji: "💧",
    title: "Care",
    description: "Water your plants to protect them from wilting. The UI warns you when hydration is low or a plant is at risk.",
  },
  {
    emoji: "🌻",
    title: "Harvest",
    description: "Collect mature plants for flowers, crops, XP, and possible mutation discoveries. The reward screen always shows what changed.",
  },
  {
    emoji: "🪙",
    title: "Earn",
    description: "Sell harvest goods for Daisies, complete missions for XP, and unlock new seeds, tools, and upgrades at the shop.",
  },
  {
    emoji: "✨",
    title: "Expand",
    description: "Upgrade your garden with more slots, better humidity, decorations, and rare mutation seeds. Build your botanical collection over weeks.",
  },
];

/* ── Player journey phases ──────────────────────────────────────────── */
export interface JourneyPhase {
  level: string;
  title: string;
  emoji: string;
  unlocks: string[];
  goal: string;
}

export const JOURNEY_PHASES: JourneyPhase[] = [
  {
    level: "Level 1",
    title: "Beginner garden",
    emoji: "🌻",
    unlocks: ["Starter garden (6 slots)", "Sunflower Seed", "Basic watering", "Shop basics"],
    goal: "Harvest your first Sunflower.",
  },
  {
    level: "Level 2",
    title: "Collection start",
    emoji: "📚",
    unlocks: ["New common seed", "Basic daily mission", "Collection book intro"],
    goal: "Collect 2 different flowers.",
  },
  {
    level: "Level 3",
    title: "Mutation discovery",
    emoji: "🧬",
    unlocks: ["Rose Seed", "White Rose Seed", "Mutation hints", "Plant adjacency"],
    goal: "Plant two compatible flowers side by side.",
  },
  {
    level: "Level 4",
    title: "Care & fertilize",
    emoji: "💩",
    unlocks: ["Fertilizer", "Better shop category", "Garden detail warnings"],
    goal: "Speed up one plant and harvest it.",
  },
  {
    level: "Level 5",
    title: "Garden expansion",
    emoji: "🏡",
    unlocks: ["First garden upgrade", "More slots or humidity capacity"],
    goal: "Upgrade the garden for the first time.",
  },
  {
    level: "Level 7",
    title: "Decoration",
    emoji: "🎃",
    unlocks: ["Decorations", "Garden cosmetic customization"],
    goal: "Place your first decoration.",
  },
  {
    level: "Level 10",
    title: "Advanced mastery",
    emoji: "👑",
    unlocks: ["Advanced mutation hints", "Rare seed category", "Profile card preview"],
    goal: "Discover a rare mutation.",
  },
];

/* ── Architecture pillars ───────────────────────────────────────────── */
export interface PillarEntry {
  title: string;
  description: string;
}

export const DESIGN_PRINCIPLES: PillarEntry[] = [
  {
    title: "Cozy first, strategic second",
    description:
      "The game feels calm and inviting before it feels complex. Strategy appears gradually through weather, hydration, mutations, upgrades, and collection goals.",
  },
  {
    title: "Every screen answers what's next",
    description:
      "A player should never open a screen and feel lost. Every panel includes a clear recommended action — harvest ready plants, water at-risk ones, visit the shop, or wait.",
  },
  {
    title: "Short actions, long-term progression",
    description:
      "A Discord command should be quick. The long-term game comes from planning, waiting, collecting, upgrading, and returning later — not from grinding in real time.",
  },
  {
    title: "Failure states are helpful",
    description:
      "When something goes wrong, the bot explains why and what to do next. \"Invalid seed\" becomes \"You do not own this seed yet. Open /shop to buy seeds.\"",
  },
];

/* ── Stats ──────────────────────────────────────────────────────────── */
export interface StatEntry {
  value: string;
  label: string;
  emoji: string;
}

export const STATS: StatEntry[] = [
  { value: "12+", label: "Implemented commands", emoji: "⚡" },
  { value: "4", label: "Weather types", emoji: "🌦️" },
  { value: "4", label: "Seed varieties", emoji: "🌱" },
  { value: "2", label: "Languages (pt-BR, en-US)", emoji: "🌍" },
];

/* ── Getting started steps ──────────────────────────────────────────── */
export interface StartStep {
  step: string;
  title: string;
  description: string;
  emoji: string;
}

export const START_STEPS: StartStep[] = [
  {
    step: "01",
    title: "Invite DaisyFlower",
    description:
      "Add the bot to your Discord server with the standard OAuth2 scope. Make sure it has permission to read messages and send components in the channels where you want to play.",
    emoji: "🤝",
  },
  {
    step: "02",
    title: "Run /start",
    description:
      "Type /start in any channel where DaisyFlower can see you. You'll receive a welcome panel, a starter kit (50 Daisies, 3 Sunflower Seeds, 1 Watering Can), and a guided first objective.",
    emoji: "🌼",
  },
  {
    step: "03",
    title: "Plant, grow, harvest",
    description:
      "Click \"Start My Garden\", plant your first Sunflower Seed, watch it grow under the current weather, water if needed, and harvest when ready. You'll earn XP, items, and unlock the next tutorial step.",
    emoji: "🌻",
  },
];
