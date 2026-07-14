/**
 * DaisyFlower website data — user-facing, not technical.
 * Plants, weather, and game feel. No IDs, no JSON paths, no architecture.
 */

export interface Plant {
  emoji: string;
  name: string;
  rarity: "Comum" | "Incomum" | "Rara" | "Épica";
  growTime: string;
  price: number;
  sellPrice?: number;
  description: string;
  tip: string;
  color: "sun" | "rose" | "sky" | "terra" | "gold";
}

/* ── Plants you can grow ────────────────────────────────────────────── */
export const PLANTS: Plant[] = [
  {
    emoji: "🌻",
    name: "Girassol",
    rarity: "Comum",
    growTime: "1 minuto",
    price: 50,
    sellPrice: 200,
    description: "Alegra qualquer jardim. Cresce rápido e é perfeito para começar.",
    tip: "Plante vários de uma vez para colher uma bonita fileira amarela.",
    color: "sun",
  },
  {
    emoji: "🌹",
    name: "Rosa Vermelha",
    rarity: "Incomum",
    growTime: "2 minutos",
    price: 100,
    sellPrice: 400,
    description: "Clássica e elegante. Vende bem e abre o caminho para mutações.",
    tip: "Plante ao lado de uma Rosa Branca para descobrir algo especial.",
    color: "rose",
  },
  {
    emoji: "🤍",
    name: "Rosa Branca",
    rarity: "Incomum",
    growTime: "2 minutos",
    price: 100,
    description: "Delicada e pura. Combina com qualquer jardim.",
    tip: "Precisa de um pouco mais de cuidado — mantenha a umidade alta.",
    color: "sky",
  },
  {
    emoji: "🌸",
    name: "Rosa Rosa",
    rarity: "Rara",
    growTime: "3 minutos",
    price: 0,
    description: "Uma híbrida rara. Só nasce quando você planta Rosa Vermelha e Branca juntas.",
    tip: "30% de chance de aparecer quando as duas amadurecem lado a lado.",
    color: "rose",
  },
  {
    emoji: "🥕",
    name: "Cenoura",
    rarity: "Comum",
    growTime: "1 minuto",
    price: 30,
    sellPrice: 50,
    description: "Croccante e útil. Boa para render Daisies rápido.",
    tip: "Cresce bem em qualquer clima — uma aposta segura.",
    color: "terra",
  },
];

/* ── Weather ────────────────────────────────────────────────────────── */
export interface Weather {
  emoji: string;
  name: string;
  effect: string;
  advice: string;
  color: "sun" | "sky" | "terra" | "snow";
}

export const WEATHER: Weather[] = [
  {
    emoji: "☀️",
    name: "Ensolarado",
    effect: "Plantas crescem 50% mais rápido",
    advice: "Mas a água evapora rápido — regue antes de sair.",
    color: "sun",
  },
  {
    emoji: "🌧️",
    name: "Chuvoso",
    effect: "A chuva rega seu jardim de graça",
    advice: "Tempo seguro para deixar plantas crescendo sossegadas.",
    color: "sky",
  },
  {
    emoji: "⛈️",
    name: "Tempestade",
    effect: "Crescimento mais lento, mas...",
    advice: "Tempestades abrem chance de mutações raras depois.",
    color: "terra",
  },
  {
    emoji: "🌨️",
    name: "Nevando",
    effect: "Tudo cresce devagar",
    advice: "Mas plantas de inverno especiais podem aparecer.",
    color: "snow",
  },
];

/* ── Gameplay steps (user-facing) ───────────────────────────────────── */
export interface PlayStep {
  emoji: string;
  step: string;
  title: string;
  description: string;
}

export const PLAY_STEPS: PlayStep[] = [
  {
    emoji: "🌱",
    step: "1",
    title: "Plante uma semente",
    description: "Abra /garden, escolha um slot vazio, selecione uma semente da sua bolsa. Em segundos você vê a plantinha brotando.",
  },
  {
    emoji: "⏳",
    step: "2",
    title: "Deixe crescer",
    description: "Feche o Discord se quiser. Suas plantas continuam crescendo com o clima e a umidade. Volte quando der vontade.",
  },
  {
    emoji: "🌻",
    step: "3",
    title: "Colha e ganhe",
    description: "Quando a planta estiver madura, toque em Colher. Você recebe flores, Daisies (a moeda do jogo) e XP para subir de nível.",
  },
];

/* ── Discord UI mockups ─────────────────────────────────────────────── */
export interface Mockup {
  id: string;
  title: string;
  subtitle: string;
  content: React.ReactNode;
}

/* ── FAQ (user questions) ───────────────────────────────────────────── */
export interface FAQItem {
  question: string;
  answer: string;
}

export const FAQS: FAQItem[] = [
  {
    question: "DaisyFlower é grátis?",
    answer: "Sim, completamente. Não há moeda premium, não há paywall, não há assinatura. Todas as plantas, mutações e conteúdo são desbloqueados jogando. O código é aberto sob licença MIT.",
  },
  {
    question: "Como adiciono o bot no meu servidor?",
    answer: "Clique em \"Adicionar ao Discord\", autorize o bot no seu servidor, e digite /start em qualquer canal. Você recebe um kit inicial com 3 sementes de girassol, 1 regador e 50 Daisies para começar.",
  },
  {
    question: "Preciso deixar o Discord aberto para as plantas crescerem?",
    answer: "Não. Suas plantas crescem sozinhas com o tempo e o clima. Plante, feche o Discord, volte horas depois — o bot calcula tudo quando você abre o jardim de novo. Sem notificações chatas, sem pressão.",
  },
  {
    question: "Em quais idiomas funciona?",
    answer: "Português do Brasil e Inglês. O bot detecta automaticamente o idioma do seu Discord, mas você pode trocar quando quiser com /settings.",
  },
  {
    question: "O que são mutações?",
    answer: "Plantas especiais que só nascem quando você combina sementes certas lado a lado. Por exemplo: plante uma Rosa Vermelha e uma Rosa Branca juntas. Quando as duas amadurecem, há 30% de chance de uma virar uma Rosa Rosa rara. O bot dá dicas quando você está perto de descobrir uma.",
  },
  {
    question: "Vou perder minhas plantas se o bot reiniciar?",
    answer: "Não. Tudo fica salvo em banco de dados durável. Mesmo que o bot reinicie, seu jardim, suas flores, seus Daisies e seu nível continuam exatamente onde você deixou.",
  },
  {
    question: "Tem como jogar com amigos?",
    answer: "Cada jogador tem seu próprio jardim privado. Em breve: visitar jardins de outros jogadores, ranking de coleção, e missões comunitárias. Por enquanto, é um jogo pessoal e relaxante.",
  },
  {
    question: "O projeto está pronto?",
    answer: "Está em desenvolvimento ativo. O ciclo principal (plantar, crescer, colher, comprar) já funciona. Mutação de Rosa Rosa já funciona. Estamos adicionando missões, livro de coleção e eventos sazonais. Veja o andamento no GitHub.",
  },
];

/* ── Stats for hero ─────────────────────────────────────────────────── */
export const HERO_STATS = [
  { value: "5", label: "plantas para cultivar" },
  { value: "4", label: "climas que mudam tudo" },
  { value: "2", label: "idiomas (PT-BR, EN)" },
  { value: "0", label: "timers chatos" },
];

/* ── What you get (kit inicial) ─────────────────────────────────────── */
export const STARTER_KIT = [
  { emoji: "🌻", name: "Sementes de Girassol", amount: "×3" },
  { emoji: "🚿", name: "Regador", amount: "×1" },
  { emoji: "🪙", name: "Daisies", amount: "50" },
];
