/**
 * Gerador de Hipótese Preliminar — Análise de padrão de respostas
 * Story 1.3 — Scoring Logic
 */

import { ScoreDimensoes } from './scoring';

export interface HipoteseResult {
  titulo: string;
  hipotese: string;
  focos_imediatos: string[];
}

/**
 * Gera hipótese preliminar de 3-5 frases baseada em padrão de respostas
 * Aponta o "problema raiz" para conversa na Fase 2
 */
export function gerarHipotese(
  dimensoes: ScoreDimensoes
): HipoteseResult {
  const d = dimensoes.desalinhamento_estrutural;
  const r = dimensoes.ruido_decisao;
  const v = dimensoes.vazamento_financeiro;
  const m = dimensoes.maturidade_estrategica;

  let titulo = '';
  let hipotese = '';
  let focos: string[] = [];

  // Encontra a dimensão mais crítica (maior score = mais problemática)
  const dimensoes_array = [
    { nome: 'desalinhamento', valor: d },
    { nome: 'ruido', valor: r },
    { nome: 'vazamento', valor: v },
    { nome: 'maturidade', valor: m },
  ];

  const ordenado = [...dimensoes_array].sort((a, b) => b.valor - a.valor);
  const critica = ordenado[0];
  const secundaria = ordenado[1];

  // Caso 1: Desalinhamento é crítico (> 3.5)
  if (d > 3.5) {
    titulo = 'Desvio Estratégia-Realidade';
    hipotese = `Existe um significativo desalinhamento entre a estratégia declarada e a realidade operacional. A organização está executando diferente do que foi planejado, criando confusão de direção. O primeiro passo é mapear exatamente o que está sendo feito versus o que deveria ser feito.`;
    focos = [
      'Mapear processos reais vs planejados',
      'Identificar pontos de desvio críticos',
      'Estabelecer alinhamento executivo',
    ];
  }
  // Caso 2: Ruído é crítico (> 3.5)
  else if (r > 3.5) {
    titulo = 'Excesso de Prioridades Conflitantes';
    hipotese = `A organização está sofrendo com múltiplas prioridades conflitantes e mudanças frequentes de rota. O "ruído de decisão" está consumindo recursos e criando instabilidade. Antes de qualquer mudança estrutural, é necessário estabilizar a tomada de decisão e criar clareza de prioridades.`;
    focos = [
      'Estabelecer modelo de priorização único',
      'Reduzir frequência de mudanças de rota',
      'Criar clareza executiva sobre prioridades',
    ];
  }
  // Caso 3: Vazamento é crítico (> 3.5)
  else if (v > 3.5) {
    titulo = 'Drenagem Financeira Estrutural';
    hipotese = `Há uma drenagem significativa de recursos (tempo, dinheiro, energia) devido a ineficiências estruturais. Margens estão sendo reduzidas por desperdícios e processos ineficientes. A organização precisa identificar e eliminar os principais pontos de vazamento para recuperar saúde financeira.`;
    focos = [
      'Auditar fluxos de tempo/recurso',
      'Identificar top 3 causas de desperdício',
      'Implementar controles de eficiência',
    ];
  }
  // Caso 4: Maturidade baixa (< 2.5)
  else if (m < 2.5) {
    titulo = 'Baixa Disposição para Mudança';
    hipotese = `A organização tem baixa disposição/readiness para mudanças estruturais. Antes de qualquer implementação, será necessário investir em alinhamento cultural e construir a crença de que a mudança é possível e necessária. Sem isso, qualquer iniciativa terá resistência elevada.`;
    focos = [
      'Construir urgência e necessidade de mudança',
      'Envolver lideranças-chave no diagnóstico',
      'Estabelecer visão compartilhada do futuro',
    ];
  }
  // Caso 5: Score baixo mas sem crítico único
  else if (ordenado[0].valor + ordenado[1].valor > 6) {
    titulo = 'Múltiplos Desafios Estruturais';
    hipotese = `A organização enfrenta múltiplos desafios estruturais interconectados. ${critica.nome} e ${secundaria.nome} são os mais críticos. A abordagem recomendada é sistêmica, abordando as raízes comuns desses desafios em paralelo, não sequencialmente.`;
    focos = [
      `Mapear raízes de ${critica.nome}`,
      `Mapear raízes de ${secundaria.nome}`,
      'Identificar pontos de alavancagem sistêmica',
    ];
  }
  // Caso 6: Score OK, maturidade OK, mas há pontos de melhoria
  else {
    titulo = 'Oportunidades de Otimização';
    hipotese = `A organização tem uma base sólida, mas existem oportunidades significativas de otimização. O trabalho será mais focado em ganhos incrementais do que em mudanças estruturais profundas. As dimensões críticas indicam onde concentrar esforços de melhoria.`;
    focos = [
      'Definir prioridades de otimização',
      'Estabelecer métricas de sucesso',
      'Criar roadmap incremental',
    ];
  }

  return {
    titulo,
    hipotese,
    focos_imediatos: focos,
  };
}
