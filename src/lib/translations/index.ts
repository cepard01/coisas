/**
 * DaisyFlower website translations.
 * Default locale: English (en).
 */
import { en, type Translation } from "./en";
import { ptBR } from "./pt-BR";

export type { Translation } from "./en";

export const translations: Record<string, Translation> = {
  en,
  "pt-BR": ptBR,
};
