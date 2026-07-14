import type { Translation } from "./en";

export const ptBR: Translation = {
  nav: {
    howItWorks: "Como funciona",
    plants: "Plantas",
    panel: "Painel",
    faq: "Perguntas",
    commands: "Comandos",
    signIn: "Entrar",
    getStarted: "Começar",
    github: "GitHub",
  },
  hero: {
    badge: "simulador de jardim · grátis",
    badgeSub: "para Discord",
    titleLine1: "Cultive seu",
    titleHighlight: "pequeno jardim",
    titleLine2: "dentro do Discord.",
    subtitle:
      "Plante sementes, cuide das suas flores, reaja ao clima e descubra mutações raras. Um jogo tranquilo que cresce com você — sem pressa, sem grind, sem spam.",
    ctaPrimary: "Adicionar ao Discord",
    ctaSecondary: "Como funciona",
    stats: [
      { value: "5", label: "plantas para cultivar" },
      { value: "4", label: "climas diferentes" },
      { value: "2", label: "idiomas" },
      { value: "0", label: "timers chatos" },
    ],
    illustration: {
      now: "AGORA",
      weather: "☀ Ensolarado",
      weatherEffect: "crescendo 50% mais rápido",
      caption: "4 plantas · 2 prontas para colher",
      live: "crescendo agora",
    },
  },
  whatIs: {
    eyebrow: "O que é",
    body1:
      "DaisyFlower é um bot de Discord onde você cuida de um jardim virtual. Plante sementes, acompanhe o crescimento, regue quando precisar e colha flores bonitas.",
    body2:
      "Tudo acontece em painéis interativos com botões — não precisa decorar comandos. E o melhor: suas plantas continuam crescendo mesmo com o Discord fechado.",
  },
  explore: {
    title: "Explore por aí",
    subtitle: "Cada página tem só o que precisa — sem enrolação.",
    cards: [
      {
        emoji: "🌱",
        title: "Como funciona",
        description:
          "Três passos: plantar, deixar crescer, colher. Veja exatamente como é jogar no Discord.",
        cta: "Ver o guia",
      },
      {
        emoji: "🌻",
        title: "Plantas e clima",
        description:
          "Girassóis, rosas, mutações raras. Cada planta tem seu jeito. Cada clima muda tudo.",
        cta: "Ver plantas",
      },
      {
        emoji: "📊",
        title: "Seu painel",
        description:
          "Conecte com Discord e veja seu jardim no navegador — plantas, carteira, missões e coleção.",
        cta: "Ver painel",
      },
      {
        emoji: "⌨️",
        title: "Comandos",
        description:
          "Cada slash command numa olhada. Busque, filtre por categoria, encontre o que precisa.",
        cta: "Ver comandos",
      },
      {
        emoji: "📈",
        title: "Progressão",
        description:
          "O que desbloqueia em cada nível — sementes, ferramentas, decorações, mutações, cards de perfil.",
        cta: "Ver níveis",
      },
      {
        emoji: "❓",
        title: "Perguntas",
        description:
          "É grátis? Como adiciono? Vou perder minhas plantas? Respostas para as dúvidas comuns.",
        cta: "Ler FAQ",
      },
    ],
  },
  finalCta: {
    title: "Pronto para plantar",
    highlight: "sua primeira semente?",
    description:
      "Leva 30 segundos. Sem cadastro, sem download. Adicione o bot e digite /start.",
    button: "Começar agora",
  },
  community: {
    number: "07",
    eyebrow: "Comunidade",
    title: "Um canto tranquilo da",
    highlight: "internet.",
    description:
      "Sem ranking, sem FOMO, sem pressão. Só uma pequena comunidade de gente que gosta de jogos lentos e ver coisas crescerem.",
    stats: [
      { value: "120+", label: "jardins plantados" },
      { value: "1.400", label: "flores colhidas" },
      { value: "38", label: "mutações raras encontradas" },
      { value: "0", label: "anúncios, nunca" },
    ],
    quotes: [
      { text: "É o único bot que eu realmente espero conferir. Planto antes do trabalho e colho no almoço.", author: "marina", role: "joga desde v0.3" },
      { text: "Achei uma Rosa Rosa no dia 4. Pareceu uma descoberta de verdade, não um drop aleatório.", author: "k3v", role: "caçador de mutações" },
      { text: "Finalmente um jogo de Discord que não me spamma. Eu confiro quando quero, ele espera.", author: "jules", role: "jardineiro casual" },
    ],
  },
  updates: {
    number: "08",
    eyebrow: "Atualizações recentes",
    title: "O que há de novo",
    highlight: "no jardim.",
    description: "Changelog honesto — sem spin de marketing. Só o que mudou, o que foi corrigido, o que vem aí.",
    items: [
      { version: "0.4.2", date: "2 semanas atrás", tag: "fixed", title: "Recompensas de colheita corrigidas", body: "Sementes agora mapeiam corretamente para itens de flor. Antes algumas colheitas falhavam silenciosamente." },
      { version: "0.4.1", date: "1 mês atrás", tag: "added", title: "Mutação Rosa Rosa", body: "Plante Rosa Vermelha + Branca lado a lado. 30% de chance de híbrida rara." },
      { version: "0.4.0", date: "2 meses atrás", tag: "changed", title: "Reformulação do sistema de clima", body: "Ciclo de 4 horas com previsão de 5 passos. Tempestades agora abrem chances de mutação." },
    ],
    tagLabels: { fixed: "Corrigido", added: "Adicionado", changed: "Mudado", wip: "Em progresso" },
    viewAll: "Ver changelog completo",
  },
  features: {
    number: "01",
    eyebrow: "Recursos",
    title: "Feito para parecer",
    highlight: "cuidar de um jardim de verdade.",
    description:
      "Cada sistema existe para fazer você se sentir calmo, curioso e gentilmente guiado — nunca sobrecarregado.",
    items: [
      {
        eyebrow: "Simulação",
        title: "Cresce mesmo quando você está fora.",
        body: "Plantas não têm timers. Elas guardam timestamps. Quando você abre o jardim ou colhe, o DaisyFlower calcula o estado atual a partir do tempo, clima e modificadores — instantaneamente. Feche o Discord, volte depois, tudo cresceu.",
      },
      {
        eyebrow: "Clima",
        title: "Um céu vivo sobre cada jardim.",
        body: "O clima muda a cada 4 horas. Sol acelera o crescimento mas seca a água. Chuva rega de graça. Tempestades desaceleram mas abrem mutações raras. Neve sugere plantas de inverno.",
      },
      {
        eyebrow: "Mutações",
        title: "Descoberta, não sorte aleatória.",
        body: "Plante uma Rosa Vermelha e uma Rosa Branca lado a lado. Quando as duas amadurecem, há 30% de chance de uma virar uma rara Rosa Rosa. Dicas aparecem quando você está perto, e descobertas vão para o seu Livro de Coleção.",
      },
      {
        eyebrow: "Interface",
        title: "Painéis, não comandos para decorar.",
        body: "Comandos são só pontos de entrada. O jogo de verdade acontece em painéis interativos — botões, menus e modais. Plantar, regar, colher, comprar, vender: tudo guiado e auto-explicativo.",
      },
      {
        eyebrow: "Idiomas",
        title: "Bilíngue por design.",
        body: "Inglês e português embutidos com detecção automática do idioma do Discord. Troque quando quiser. Adicionar um idioma é só uma pasta de traduções — sem mexer no código.",
      },
      {
        eyebrow: "Conteúdo",
        title: "Novas plantas chegam como arquivos de dados.",
        body: "Sementes, flores, cultivos, clima, mutações — tudo orientado a dados. Conteúdo novo aparece na loja, autocomplete e validação sem tocar nos sistemas principais. O jogo é feito para crescer.",
      },
    ],
  },
  howItWorks: {
    number: "02",
    eyebrow: "Como funciona",
    title: "Três passos.",
    highlight: "Sem complicação.",
    description:
      "Você não precisa decorar comandos. Tudo acontece em painéis interativos com botões — como um mini-jogo dentro do Discord.",
    steps: [
      {
        emoji: "🌱",
        step: "1",
        title: "Plante uma semente",
        description:
          "Abra /garden, escolha um slot vazio, selecione uma semente da sua bolsa. Em segundos você vê a plantinha brotando.",
      },
      {
        emoji: "⏳",
        step: "2",
        title: "Deixe crescer",
        description:
          "Feche o Discord se quiser. Suas plantas continuam crescendo com o clima e a umidade. Volte quando der vontade.",
      },
      {
        emoji: "🌻",
        step: "3",
        title: "Colha e ganhe",
        description:
          "Quando a planta estiver madura, toque em Colher. Você recebe flores, Daisies (a moeda do jogo) e XP para subir de nível.",
      },
    ],
    discordMockup: {
      eyebrow: "É assim no Discord",
      title: "Um painel com botões, não um texto enorme.",
      channelName: "# meu-jardim",
      youSaid: "você · agora mesmo",
      youName: "você",
      now: "agora",
      gardenTitle: "🌼 Meu Jardim",
      gardenSubtitle: "4 plantas · 2 prontas para colher · umidade 50%",
      slots: [
        { emoji: "🌻", status: "crescendo 72%", ready: false },
        { emoji: "🌹", status: "crescendo 45%", ready: false },
        { emoji: "🌻", status: "pronta!", ready: true },
      ],
      buttons: { plant: "🌱 Plantar", harvest: "🌻 Colher", water: "💧 Regar", shop: "🛒 Loja" },
      tip: "Dica: Colha seu girassol pronto 🌻",
      inputPlaceholder: "Envie uma mensagem para #meu-jardim",
    },
    weather: {
      eyebrow: "O clima muda tudo",
      title: "Cada previsão afeta seu jardim.",
      description:
        "O clima muda a cada 4 horas. Você precisa se adaptar — regar mais no sol, aproveitar a chuva, esperar a tempestade passar.",
      items: [
        {
          emoji: "☀️",
          name: "Ensolarado",
          effect: "Plantas crescem 50% mais rápido",
          advice: "Mas a água evapora rápido — regue antes de sair.",
        },
        {
          emoji: "🌧️",
          name: "Chuvoso",
          effect: "A chuva rega seu jardim de graça",
          advice: "Tempo seguro para deixar plantas crescendo.",
        },
        {
          emoji: "⛈️",
          name: "Tempestade",
          effect: "Crescimento mais lento",
          advice: "Mas abre chance de mutações raras depois.",
        },
        {
          emoji: "🌨️",
          name: "Neve",
          effect: "Tudo cresce devagar",
          advice: "Plantas de inverno especiais podem aparecer.",
        },
      ],
    },
    mutations: {
      eyebrow: "Descoberta, não sorte aleatória",
      title: "Plante combinações e descubra mutações raras.",
      description:
        "Algumas plantas só nascem quando você cultiva outras duas lado a lado. O bot dá dicas quando você está perto de algo especial. Nada de confusão aleatória — cada descoberta faz sentido.",
      label: "exemplo de mutação",
      chance: "30% de chance",
      inputs: ["Rosa Vermelha", "Rosa Branca"],
      output: "Rosa Rosa",
      hint: "Plante uma Rosa Vermelha e uma Rosa Branca lado a lado. Quando as duas amadurecerem, há 30% de chance de uma florescer como uma rara Rosa Rosa.",
    },
  },
  plants: {
    number: "03",
    eyebrow: "O que você cultiva",
    title: "Flores, rosas e",
    highlight: "mutações raras.",
    description:
      "Comece com girassóis simples. Conforme joga, desbloqueie rosas, combine sementes e descubra híbridos que só nascem com paciência e curiosidade.",
    items: [
      {
        emoji: "🌻",
        name: "Girassol",
        rarity: "Comum",
        growTime: "1 minuto",
        price: 50,
        sellPrice: 200,
        description: "Alegra qualquer jardim. Cresce rápido e é perfeito para começar.",
        tip: "Plante vários de uma vez para colher uma fileira amarela bonita.",
        color: "sun",
      },
      {
        emoji: "🌹",
        name: "Rosa Vermelha",
        rarity: "Incomum",
        growTime: "2 minutos",
        price: 100,
        sellPrice: 400,
        description: "Clássica e elegante. Vende bem e abre caminho para mutações.",
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
        description: "Uma híbrida rara. Só nasce quando você cultiva Rosa Vermelha e Branca juntas.",
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
    ],
    growsIn: "Cresce em",
    price: "Preço",
    origin: "Origem",
    mutation: "mutação",
    sellsFor: "Vende por",
    mutationCallout: {
      label: "🧬 Descoberta especial",
      title: "A Rosa Rosa só floresce para você.",
      body: "Você não compra sementes de Rosa Rosa em lugar nenhum. Elas só aparecem quando você planta uma Rosa Vermelha e uma Rosa Branca lado a lado, espera as duas amadurecerem, e tem um pouco de sorte — 30% de chance em cada colheita.",
      link: "Entenda como mutações funcionam",
    },
  },
  panel: {
    number: "04",
    eyebrow: "Seu painel no site",
    title: "Seu jardim,",
    highlight: "no navegador.",
    description:
      "Conecte sua conta do Discord e acompanhe seu jardim pelo site — sem precisar abrir o app. Veja suas plantas, carteira, missões e coleção em um painel limpo.",
    locked: {
      title: "Conecte para ver",
      body: "Entre com Discord (mockup — nenhum dado real é enviado) para explorar como ficaria seu painel no site.",
      button: "Entrar com Discord",
    },
    whatYouCanDo: {
      eyebrow: "O que você faz aqui",
      title: "Tudo que está no Discord, também no site.",
      items: [
        { emoji: "🌼", title: "Veja seu jardim", body: "Slots, crescimento, umidade e clima — tudo em um olhar." },
        { emoji: "🪙", title: "Acompanhe sua carteira", body: "Saldo de Daisies, XP, nível e transações recentes." },
        { emoji: "🎯", title: "Siga suas missões", body: "Tutorial, missões diárias e semanais com progresso." },
        { emoji: "📚", title: "Complete sua coleção", body: "Flores descobertas e bloqueadas com dicas de como achar." },
      ],
    },
    dashboard: {
      url: "daisyflower.app/painel",
      synced: "sincronizado",
      tabs: { garden: "Jardim", wallet: "Carteira", missions: "Missões", collection: "Coleção" },
      alerts: "Alertas",
      settings: "Configurações",
      garden: {
        title: "Meu Jardim",
        subtitle: "3 plantas crescendo · 1 pronta para colher",
        weather: "Ensolarado",
        slotsUsed: "Slots usados",
        humidity: "Umidade",
        nextReady: "Próxima pronta",
        mutationHint: "Dica de mutação",
        slotsLabel: "Slots do jardim",
        slots: [
          { emoji: "🌻", name: "Girassol", progress: 72, eta: "~18m" },
          { emoji: "🌹", name: "Rosa Vermelha", progress: 45, eta: "~1h 6m" },
          { emoji: "🤍", name: "Rosa Branca", progress: 90, eta: "~12m" },
        ],
        readySlot: { emoji: "🌻", name: "Girassol" },
        activityLabel: "Atividade recente",
        activity: [
          { time: "há 2 min", text: "Girassol no slot 4 ficou pronto para colher.", tone: "sage" },
          { time: "há 14 min", text: "Regou Rosa Branca no slot 3. Umidade +30%.", tone: "sky" },
          { time: "há 1h", text: "Plantou semente de Rosa Vermelha no slot 2.", tone: "ink" },
          { time: "há 3h", text: "Clima mudou de Chuvoso para Ensolarado.", tone: "gold" },
        ],
        harvestNow: "Colher agora",
        empty: "vazio",
        plantHere: "+ plantar aqui",
        growing: "crescendo",
        ready: "pronta!",
      },
      wallet: {
        title: "Carteira",
        subtitle: "Seus Daisies, XP e progresso",
        balance: "Saldo",
        daisies: "Daisies",
        thisWeek: "+320 esta semana",
        level: "Nível 7",
        levelName: "Jardineiro",
        xpToNext: "2.140 / 3.000 XP",
        unlocks: "Faltam 860 XP para o Nível 8 — desbloqueia decorações",
        transactions: "Transações recentes",
        transactionsRows: [
          { icon: "🌻", label: "Vendeu 2 Girassóis", amount: "+400", time: "há 2 min", positive: true },
          { icon: "🌱", label: "Comprou semente de Rosa", amount: "−100", time: "há 1h" },
          { icon: "✓", label: "Recompensa de missão diária", amount: "+50", time: "há 3h", positive: true },
          { icon: "↑", label: "Bônus de Nível 7", amount: "+200", time: "há 1 dia", positive: true },
          { icon: "🚿", label: "Comprou Regador", amount: "−500", time: "há 2 dias" },
        ],
      },
      missions: {
        title: "Missões",
        subtitle: "3 de 6 concluídas hoje",
        streak: "4 dias seguidos",
        items: [
          { type: "Tutorial", title: "Plante sua primeira semente", reward: "+10 XP", done: true },
          { type: "Tutorial", title: "Colha sua primeira flor", reward: "1 semente", done: true },
          { type: "Diária", title: "Colha 3 flores", reward: "+50 Daisies", progress: "2 / 3" },
          { type: "Diária", title: "Rege seu jardim", reward: "+15 XP", progress: "1 / 1", done: true },
          { type: "Diária", title: "Verifique o clima", reward: "+10 Daisies" },
          { type: "Semanal", title: "Descubra uma mutação", reward: "semente rara", locked: true },
        ],
      },
      collection: {
        title: "Livro de Coleção",
        subtitle: "4 de 8 descobertas · 50% completo",
        entries: [
          { emoji: "🌻", name: "Girassol", rarity: "Comum", found: true, count: 12 },
          { emoji: "🌹", name: "Rosa Vermelha", rarity: "Incomum", found: true, count: 4 },
          { emoji: "🤍", name: "Rosa Branca", rarity: "Incomum", found: true, count: 2 },
          { emoji: "🌸", name: "Rosa Rosa", rarity: "Rara", found: false, hint: "Plante Rosa Vermelha + Branca juntas." },
          { emoji: "🥕", name: "Cenoura", rarity: "Comum", found: true, count: 7 },
          { emoji: "?", name: "???", rarity: "Rara", found: false, hint: "Continue cultivando sementes diferentes." },
          { emoji: "?", name: "???", rarity: "Épica", found: false, hint: "Exige uma condição de clima especial." },
          { emoji: "?", name: "???", rarity: "Incomum", found: false, hint: "Tente a loja durante o outono." },
        ],
        harvested: "colhidas",
        unknown: "???",
      },
    },
  },
  faq: {
    number: "05",
    eyebrow: "Perguntas frequentes",
    title: "Tudo que você",
    highlight: "quer saber.",
    description: "Não achou sua dúvida? Abra uma issue no GitHub que a gente responde.",
    items: [
      {
        question: "DaisyFlower é grátis?",
        answer:
          "Sim, completamente. Não há moeda premium, não há paywall, não há assinatura. Todas as plantas, mutações e conteúdo são desbloqueados jogando. O código é aberto sob licença MIT.",
      },
      {
        question: "Como adiciono o bot no meu servidor?",
        answer:
          'Clique em "Adicionar ao Discord", autorize o bot no seu servidor, e digite /start em qualquer canal. Você recebe um kit inicial com 3 sementes de girassol, 1 regador e 50 Daisies para começar.',
      },
      {
        question: "Preciso deixar o Discord aberto para as plantas crescerem?",
        answer:
          "Não. Suas plantas crescem sozinhas com o tempo e o clima. Plante, feche o Discord, volte horas depois — o bot calcula tudo quando você abre o jardim de novo. Sem notificações chatas, sem pressão.",
      },
      {
        question: "Quais idiomas suporta?",
        answer:
          "Inglês e Português (Brasil). O bot detecta automaticamente o idioma do seu Discord, mas você pode trocar quando quiser com /settings. O site suporta os mesmos idiomas — troque pela navbar.",
      },
      {
        question: "O que são mutações?",
        answer:
          "Plantas especiais que só nascem quando você cultiva as sementes certas lado a lado. Por exemplo: plante uma Rosa Vermelha e uma Rosa Branca juntas. Quando as duas amadurecem, há 30% de chance de uma virar uma Rosa Rosa rara. O bot dá dicas quando você está perto de descobrir uma.",
      },
      {
        question: "Vou perder minhas plantas se o bot reiniciar?",
        answer:
          "Não. Tudo fica salvo em banco de dados durável. Mesmo que o bot reinicie, seu jardim, suas flores, seus Daisies e seu nível continuam exatamente onde você deixou.",
      },
      {
        question: "Tem como jogar com amigos?",
        answer:
          "Cada jogador tem seu próprio jardim privado. Em breve: visitar jardins de outros jogadores, ranking de coleção e missões comunitárias. Por enquanto, é um jogo pessoal e relaxante.",
      },
      {
        question: "O projeto está pronto?",
        answer:
          "Está em desenvolvimento ativo. O ciclo principal (plantar, crescer, colher, comprar) já funciona. Mutação de Rosa Rosa já funciona. Estamos adicionando missões, livro de coleção e eventos sazonais. Veja o andamento no GitHub.",
      },
    ],
    stillQuestions: "Ainda com dúvidas?",
    stillBody: "Abra uma issue no GitHub ou pergunte no servidor de suporte.",
    githubIssues: "GitHub Issues",
  },
  getStarted: {
    number: "06",
    eyebrow: "Comece agora",
    title: "Seu jardim está",
    highlight: "esperando.",
    description:
      "Leva 30 segundos. Sem cadastro, sem download. Adicione o bot ao seu servidor, digite /start, e você já tem sementes para plantar.",
    steps: [
      { n: "1", title: "Adicione o bot", body: "Clique no botão abaixo e autorize no seu servidor." },
      { n: "2", title: "Digite /start", body: "Em qualquer canal onde o bot pode ver mensagens." },
      { n: "3", title: "Plante", body: 'Toque em "Começar Meu Jardim" e siga os botões.' },
    ],
    kit: {
      label: "Kit inicial · grátis",
      title: "Todo mundo começa igual",
      body: "Sem pay-to-win, sem vantagem paga. O suficiente para plantar seu primeiro girassol.",
      items: [
        { emoji: "🌻", name: "Sementes de Girassol", amount: "×3" },
        { emoji: "🚿", name: "Regador", amount: "×1" },
        { emoji: "🪙", name: "Daisies", amount: "50" },
      ],
    },
    discordPreview: {
      label: "No Discord",
      youType: "você digita",
      botResponds: "🌼 DaisyFlower responde",
      botMessage:
        'Bem-vindo ao DaisyFlower! Seu kit inicial está pronto. Toque em "Começar Meu Jardim" para plantar seu primeiro girassol.',
      buttons: { start: "🌱 Começar Meu Jardim", how: "❔ Como funciona", lang: "⚙️ Idioma" },
    },
    finalButton: "Adicionar DaisyFlower ao Discord",
    finalNote: "Grátis · código aberto · MIT · feito com carinho",
    checklist: {
      title: "Checklist de configuração do servidor",
      subtitle: "Garanta que seu servidor está pronto para o bot",
      items: [
        { label: "Bot tem permissão para ler mensagens", hint: "Necessário para comandos funcionarem" },
        { label: "Bot pode enviar mensagens no seu canal", hint: "Necessário para mostrar painéis do jardim" },
        { label: "Bot pode usar slash commands", hint: "Escopo Applications Commands está ativado" },
        { label: "Canal permite comandos de aplicação", hint: "Verifique permissões do canal se /start não responder" },
      ],
    },
  },
  footer: {
    tagline:
      "Um simulador de jardim tranquilo para Discord. Grátis, código aberto, feito com carinho por gente que gosta de jogos lentos.",
    github: "GitHub",
    addToDiscord: "Adicionar ao Discord",
    theGame: "O jogo",
    forPlayers: "Para jogar",
    project: "Projeto",
    links: {
      howItWorks: "Como funciona",
      plants: "Plantas e clima",
      panel: "Painel no site",
      getStarted: "Começar agora",
      faq: "Perguntas frequentes",
      sourceCode: "Código-fonte",
      docs: "Documentação",
      progress: "Andamento",
    },
    copyright: "© {year} DaisyFlower · MIT · grátis para sempre",
    signature: "feito devagar, de propósito",
  },
  auth: {
    mockLabel: "Login demonstrativo",
    title: "Entrar no DaisyFlower",
    body: "Conecte sua conta do Discord para ver seu jardim no site — plantas, missões, coleção e configurações. Isto é um mockup: nenhum dado real é enviado.",
    benefits: [
      "Veja seu jardim no navegador, sem abrir o Discord",
      "Acompanhe missões, coleção e XP em tempo real",
      "Gerencie idioma e notificações",
    ],
    discordButton: "Continuar com Discord",
    privacy: "Pedimos só seu ID e nome de usuário do Discord. Sem senha, sem mensagens.",
    connecting: "Conectando ao Discord…",
    connectingSub: "Autorizando DaisyFlower a ler seu jardim",
    done: "Bem-vindo de volta!",
    doneSub: "Seu jardim está pronto. Abrindo seu painel…",
  },
  userMenu: {
    level: "Nível",
    myPanel: "Meu painel",
    seePlants: "Ver plantas",
    signOut: "Sair",
  },
  rarity: {
    Common: "Comum",
    Uncommon: "Incomum",
    Rare: "Rara",
    Epic: "Épica",
  },
  progression: {
    number: "04",
    eyebrow: "Progressão",
    title: "Seu jardim cresce",
    highlight: "com você.",
    description:
      "Cada nível desbloqueia algo novo — sementes, ferramentas, decorações, dicas de mutação. Sem pressa, sem grind. Plante, colha e expanda aos poucos.",
    levels: [
      { level: "1", title: "Primeiro jardim", emoji: "🌻", unlocks: ["6 slots de jardim", "Sementes de girassol", "Rega básica", "Acesso à loja"] },
      { level: "3", title: "Rosas e mutações", emoji: "🌹", unlocks: ["Sementes de Rosa Vermelha", "Sementes de Rosa Branca", "Dicas de mutação", "Descoberta da Rosa Rosa"] },
      { level: "5", title: "Expansão do jardim", emoji: "🏡", unlocks: ["Mais slots", "Maior capacidade de umidade", "Ferramentas de crescimento rápido"] },
      { level: "7", title: "Decorações", emoji: "🎃", unlocks: ["Decorações de jardim", "Temas cosméticos", "Espantalho e gnomo"] },
      { level: "10", title: "Maestria avançada", emoji: "👑", unlocks: ["Categoria de sementes raras", "Mutações avançadas", "Cards de perfil"] },
    ],
  },
  economy: {
    number: "05",
    eyebrow: "Economia",
    title: "Plante, colha,",
    highlight: "ganhe, repita.",
    description:
      "Um ciclo simples que continua satisfatório. Venda flores por Daisies, gaste em sementes melhores, complete missões por XP, suba de nível para desbloquear mais.",
    loop: [
      { emoji: "🌱", label: "Plantar", sub: "Compre sementes com Daisies" },
      { emoji: "🌻", label: "Colher", sub: "Ganhe flores + XP" },
      { emoji: "🪙", label: "Vender", sub: "Ganhe Daisies de volta" },
      { emoji: "📈", label: "Subir nível", sub: "Desbloqueie conteúdo novo" },
    ],
    missions: {
      title: "Missões diárias",
      subtitle: "Direção gentil, todo dia",
      items: [
        { title: "Colha 3 flores", reward: "+50 Daisies", progress: "2 / 3" },
        { title: "Rege seu jardim", reward: "+15 XP", progress: "1 / 1", done: true },
        { title: "Verifique o clima", reward: "+10 Daisies", progress: "0 / 1" },
      ],
    },
  },
  commands: {
    number: "06",
    eyebrow: "Comandos",
    title: "Cada comando",
    highlight: "numa olhada.",
    description:
      "Comandos são atalhos — você também pode fazer tudo pelos botões do painel do jardim. Mas se prefere digitar, aqui está a lista completa.",
    searchPlaceholder: "Buscar comandos...",
    categories: {
      core: "Núcleo",
      economy: "Economia",
      system: "Sistema",
    },
    items: [
      { command: "/start", category: "core", description: "Comece seu jardim ou abra o painel de boas-vindas.", aliases: "iniciar" },
      { command: "/garden", category: "core", description: "Abra o painel do jardim — plantas, clima, ações.", aliases: "jardim" },
      { command: "/plant", category: "core", description: "Abra o fluxo de plantio — escolha slot e semente.", aliases: "plantar, semear" },
      { command: "/harvest", category: "core", description: "Colha plantas maduras para flores, XP e Daisies.", aliases: "colher" },
      { command: "/water", category: "core", description: "Regue suas plantas para proteger contra murchamento.", aliases: "regar" },
      { command: "/weather", category: "core", description: "Veja o clima atual e a previsão de 5 passos.", aliases: "clima" },
      { command: "/shop", category: "economy", description: "Navegue e compre sementes, ferramentas e decorações.", aliases: "loja, market" },
      { command: "/wallet", category: "economy", description: "Veja seu saldo de Daisies, XP e progresso de nível.", aliases: "saldo, money" },
      { command: "/inventory", category: "economy", description: "Veja sua bolsa — sementes, flores, ferramentas, decoração.", aliases: "inv, bag" },
      { command: "/sell", category: "economy", description: "Venda flores e cultivos colhidos por Daisies.", aliases: "vender" },
      { command: "/missions", category: "economy", description: "Confira missões de tutorial, diárias e semanais.", aliases: "quests" },
      { command: "/collection", category: "economy", description: "Abra seu Livro de Coleção — descobertas e bloqueadas.", aliases: "book" },
      { command: "/profile", category: "system", description: "Veja seu perfil de jogador, nível e badges.", aliases: "me" },
      { command: "/settings", category: "system", description: "Mude idioma, notificações e preferências.", aliases: "config" },
      { command: "/help", category: "system", description: "Mostre guia de ajuda e navegação.", aliases: "ajuda" },
      { command: "/ping", category: "system", description: "Verifique status do bot, latência e uptime.", aliases: "status" },
    ],
    noResults: "Nenhum comando encontrado.",
    aliasLabel: "atalhos",
  },
  weatherSection: {
    eyebrow: "O clima afeta tudo",
    title: "Quatro céus, quatro estratégias.",
    description:
      "O clima muda a cada 4 horas. Cada tipo muda como seu jardim se comporta — adapte-se ou espere passar.",
  },
  notFound: {
    code: "404",
    title: "Esta página",
    highlight: "ainda não floresceu.",
    body: "A página que você procura não existe — ou talvez nunca tenha sido plantada. Vamos voltar para o jardim.",
    backHome: "Voltar ao início",
  },
  profile: {
    number: "09",
    eyebrow: "Perfil do jogador",
    title: "Seu card,",
    highlight: "seu jardim.",
    description:
      "Um perfil público mostra seu nível, badges, planta favorita e progresso de coleção. Customize seu título e mostre suas descobertas mais raras.",
    stats: {
      level: "Nível",
      gardensPlanted: "Jardins plantados",
      flowersHarvested: "Flores colhidas",
      mutationsFound: "Mutações encontradas",
      streak: "Dias seguidos",
    },
    badges: {
      title: "Badges",
      subtitle: "Ganhas jogando — sem compras, sem atalhos",
      items: [
        { emoji: "🌱", name: "Primeira Semente", desc: "Plantou sua primeira semente", earned: true },
        { emoji: "🌻", name: "Fazendeiro de Girassol", desc: "Colheu 10 girassóis", earned: true },
        { emoji: "🌸", name: "Descobridor de Mutação", desc: "Encontrou uma Rosa Rosa", earned: true },
        { emoji: "💧", name: "Regador Dedicado", desc: "Regou 50 vezes", earned: true },
        { emoji: "☀️", name: "Observador do Clima", desc: "Conferiu o clima 30 dias", earned: true },
        { emoji: "🎃", name: "Decorador", desc: "Colocou uma decoração", earned: false },
        { emoji: "👑", name: "Mestre Jardineiro", desc: "Alcance o nível 10", earned: false },
        { emoji: "🏆", name: "Complecionista", desc: "Descubra todas as plantas", earned: false },
      ],
    },
    favoritePlant: {
      title: "Planta favorita",
      subtitle: "Mostre seu orgulho e alegria",
      empty: "Defina sua planta favorita da sua coleção",
    },
    recentAchievements: {
      title: "Conquistas recentes",
      subtitle: "Últimas badges que você ganhou",
      items: [
        { emoji: "🌸", name: "Descobridor de Mutação", time: "há 2 dias" },
        { emoji: "💧", name: "Regador Dedicado", time: "há 1 semana" },
        { emoji: "🌻", name: "Fazendeiro de Girassol", time: "há 2 semanas" },
      ],
    },
  },
};
