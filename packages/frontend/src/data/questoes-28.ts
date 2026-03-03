/**
 * 28 Questões Diagnóstico Neural Estruturado
 * Story 1.2: Formulário Web 28 Questões
 *
 * Tipos de questões:
 * - numero: Para respostas numéricas (R$, %)
 * - texto_livre: Para respostas descritivas
 * - escala_1_5: Para avaliações (1=Nunca, 5=Sempre)
 *
 * Cada questão inclui:
 * - placeholder: Exemplo de como responder
 * - helperText: Dica para guiar o cliente
 * - maxLength: Limite de caracteres (para texto_livre)
 */

export const questoes28 = [
  // BLOCO 1 — ESTRUTURA ATUAL (5 questões)
  {
    id: 1,
    numero: 1,
    dimensao: 'ESTRUTURA',
    texto: 'Qual é seu faturamento médio mensal?',
    tipo: 'numero',
    placeholder: 'Ex: 50000',
    helperText: 'Digite o valor em reais (apenas números). Este dado ajuda a entender a escala do seu negócio.',
    maxLength: 20,
  },
  {
    id: 2,
    numero: 2,
    dimensao: 'ESTRUTURA',
    texto: 'Qual é sua principal fonte de receita hoje?',
    tipo: 'texto_livre',
    placeholder: 'Ex: Consultoria estratégica, vendas de produtos, serviços recorrentes, etc.',
    helperText: 'Descreva sua maior fonte de receita. Se tem múltiplas, cite a principal e quantos % representa.',
    maxLength: 300,
  },
  {
    id: 3,
    numero: 3,
    dimensao: 'ESTRUTURA',
    texto: 'Quantas ofertas ativas você possui?',
    tipo: 'numero',
    placeholder: 'Ex: 3',
    helperText: 'Conte quantas ofertas/serviços/produtos diferentes você está oferecendo agora.',
    maxLength: 3,
  },
  {
    id: 4,
    numero: 4,
    dimensao: 'ESTRUTURA',
    texto: 'Você acompanha margem por produto?',
    tipo: 'escala_1_5',
    helperText: 'Quanto você tem clareza de lucro em cada produto/serviço que oferece?',
  },
  {
    id: 5,
    numero: 5,
    dimensao: 'ESTRUTURA',
    texto: 'Seu negócio possui planejamento formal mensal?',
    tipo: 'escala_1_5',
    helperText: 'Você tem um plano estruturado (metas, KPIs, ações) que você acompanha mês a mês?',
  },

  // BLOCO 2 — DIREÇÃO E PRIORIDADE (5 questões)
  {
    id: 6,
    numero: 6,
    dimensao: 'PRIORIDADE',
    texto: 'Como você define suas prioridades semanais?',
    tipo: 'texto_livre',
    placeholder: 'Ex: Emergências do dia, e-mails, o que aparece primeiro, reunião de sprint, etc.',
    helperText: 'Seja honesto. Qual é o seu critério REAL de priorização (mesmo que não seja ideal)?',
    maxLength: 300,
  },
  {
    id: 7,
    numero: 7,
    dimensao: 'PRIORIDADE',
    texto: 'Existe um critério objetivo para decidir o que não fazer?',
    tipo: 'escala_1_5',
    helperText: 'Você consegue dizer "não" ou interromper projetos? Ou tudo sempre continua?',
  },
  {
    id: 8,
    numero: 8,
    dimensao: 'PRIORIDADE',
    texto: 'Qual projeto está parado há mais de 90 dias?',
    tipo: 'texto_livre',
    placeholder: 'Ex: Reformulação do site, lançamento de novo produto, integração de ferramenta, etc.',
    helperText: 'Cite um projeto que começou mas não terminou há 3+ meses. Qual é o motivo?',
    maxLength: 300,
  },
  {
    id: 9,
    numero: 9,
    dimensao: 'PRIORIDADE',
    texto: 'O que hoje consome tempo e não gera retorno proporcional?',
    tipo: 'texto_livre',
    placeholder: 'Ex: Reuniões internas, admin, relacionamento com cliente específico, etc.',
    helperText: 'Qual atividade você faz regularmente que sente que é um vazamento de tempo/energia?',
    maxLength: 300,
  },
  {
    id: 10,
    numero: 10,
    dimensao: 'PRIORIDADE',
    texto: 'Qual decisão você vem adiando?',
    tipo: 'texto_livre',
    placeholder: 'Ex: Aumentar preço, cortar cliente, contratar, descontinuar produto, etc.',
    helperText: 'Qual decisão importante você sabe que precisa tomar mas vem empurrando?',
    maxLength: 300,
  },

  // BLOCO 3 — COERÊNCIA ESTRATÉGICA (5 questões)
  {
    id: 11,
    numero: 11,
    dimensao: 'COERÊNCIA',
    texto: 'Seu posicionamento é claro em uma frase?',
    tipo: 'escala_1_5',
    helperText: 'Você consegue descrever em 1-2 frases o que você faz e para quem? As pessoas entendem?',
  },
  {
    id: 12,
    numero: 12,
    dimensao: 'COERÊNCIA',
    texto: 'Sua oferta principal resolve um problema específico?',
    tipo: 'escala_1_5',
    helperText: 'Sua oferta é clara e focada em um cliente específico? Ou é ampla demais?',
  },
  {
    id: 13,
    numero: 13,
    dimensao: 'COERÊNCIA',
    texto: 'Existe desalinhamento entre o que você comunica e o que entrega?',
    tipo: 'escala_1_5',
    helperText: 'Você promete uma coisa no marketing e entrega outra? Ou está tudo alinhado?',
  },
  {
    id: 14,
    numero: 14,
    dimensao: 'COERÊNCIA',
    texto: 'Seu modelo atual é escalável?',
    tipo: 'escala_1_5',
    helperText: 'Você consegue crescer sem multiplicar seu trabalho pessoal na mesma proporção?',
  },
  {
    id: 15,
    numero: 15,
    dimensao: 'COERÊNCIA',
    texto: 'Você sabe exatamente onde está seu gargalo?',
    tipo: 'escala_1_5',
    helperText: 'Qual é o ponto crítico que limita seu crescimento? Você consegue identificar?',
  },

  // BLOCO 4 — MODELO FINANCEIRO (5 questões)
  {
    id: 16,
    numero: 16,
    dimensao: 'FINANCEIRO',
    texto: 'Qual é sua margem média?',
    tipo: 'numero',
    placeholder: 'Ex: 45',
    helperText: 'Quanto você lucra em % do faturamento? (apenas número, sem %). Deixe em branco se não sabe.',
    maxLength: 3,
  },
  {
    id: 17,
    numero: 17,
    dimensao: 'FINANCEIRO',
    texto: 'Qual percentual do seu tempo é operacional?',
    tipo: 'numero',
    placeholder: 'Ex: 70',
    helperText: 'De 100% do seu tempo, quanto você gasta executando tarefas vs pensando estratégia?',
    maxLength: 3,
  },
  {
    id: 18,
    numero: 18,
    dimensao: 'FINANCEIRO',
    texto: 'Você sente que trabalha mais do que o faturamento reflete?',
    tipo: 'escala_1_5',
    helperText: 'Sua renda é proporcional ao esforço? Ou você trabalha muito para ganhar pouco?',
  },
  {
    id: 19,
    numero: 19,
    dimensao: 'FINANCEIRO',
    texto: 'Já investiu em estratégias que não trouxeram retorno?',
    tipo: 'texto_livre',
    placeholder: 'Ex: Anúncios, treinamento, software, contratação, etc.',
    helperText: 'Descreva brevemente qual investimento não funcionou. Quanto foi o prejuízo (aproximado)?',
    maxLength: 300,
  },
  {
    id: 20,
    numero: 20,
    dimensao: 'FINANCEIRO',
    texto: 'Estima quanto perdeu nos últimos 12 meses com ajustes de rota?',
    tipo: 'numero',
    placeholder: 'Ex: 50000',
    helperText: 'Se pudesse somar perdas por mudanças de estratégia, qual número aproximado sairia?',
    maxLength: 20,
  },

  // BLOCO 5 — PADRÃO DE DECISÃO (5 questões)
  {
    id: 21,
    numero: 21,
    dimensao: 'PADRÃO',
    texto: 'Você muda de estratégia com frequência?',
    tipo: 'escala_1_5',
    helperText: 'Com que frequência você abandona uma estratégia e começa outra?',
  },
  {
    id: 22,
    numero: 22,
    dimensao: 'PADRÃO',
    texto: 'Você inicia mais projetos do que finaliza?',
    tipo: 'escala_1_5',
    helperText: 'Você tem várias coisas em andamento mas poucas efetivamente terminadas?',
  },
  {
    id: 23,
    numero: 23,
    dimensao: 'PADRÃO',
    texto: 'Você evita eliminar projetos?',
    tipo: 'escala_1_5',
    helperText: 'Quando algo não funciona, você para ou deixa "ligado" indefinidamente?',
  },
  {
    id: 24,
    numero: 24,
    dimensao: 'PADRÃO',
    texto: 'Você sente que falta clareza estrutural?',
    tipo: 'escala_1_5',
    helperText: 'Você tem a sensação de que há "algo errado na base" mas não consegue nomear?',
  },
  {
    id: 25,
    numero: 25,
    dimensao: 'PADRÃO',
    texto: 'Você sente que está resolvendo sintomas?',
    tipo: 'escala_1_5',
    helperText: 'Você resolve problema, semana depois aparece outro parecido? Parece um loop?',
  },

  // BLOCO 6 — MATURIDADE ESTRATÉGICA (3 questões)
  {
    id: 26,
    numero: 26,
    dimensao: 'MATURIDADE',
    texto: 'Está disposto(a) a revisar premissas fundamentais?',
    tipo: 'escala_1_5',
    helperText: 'Você está aberto a questionar crenças/decisões antigas que talvez estejam erradas?',
  },
  {
    id: 27,
    numero: 27,
    dimensao: 'MATURIDADE',
    texto: 'Está disposto(a) a eliminar iniciativas?',
    tipo: 'escala_1_5',
    helperText: 'Se descobrirmos que algo não está funcionando, você consegue parar e cortar?',
  },
  {
    id: 28,
    numero: 28,
    dimensao: 'MATURIDADE',
    texto: 'Está preparado(a) para investir em correção estrutural?',
    tipo: 'escala_1_5',
    helperText: 'Descobrir é uma coisa. Corrigir requer recursos (tempo, dinheiro, energia). Você está pronto?',
  },
];

export default questoes28;
