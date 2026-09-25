export type Locale = "en" | "pt-BR";

export const LOCALES: { code: Locale; label: string; flag: string }[] = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "pt-BR", label: "Português", flag: "🇧🇷" },
];

export const DEFAULT_LOCALE: Locale = "en";
