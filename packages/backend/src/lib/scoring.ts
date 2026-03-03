/**
 * Sistema de Scoring 4D — Cálculo automático de dimensões diagnósticas
 * Story 1.3 — Scoring Logic
 */

export interface Resposta {
  questao_id: number;
  numero: number;
  valor_resposta: number; // 1-5 para escala_1_5
}

export interface ScoreDimensoes {
  desalinhamento_estrutural: number; // 0-5
  ruido_decisao: number; // 0-5
  vazamento_financeiro: number; // 0-5
  maturidade_estrategica: number; // 0-5
}

export interface ScoreResult extends ScoreDimensoes {
  total: number; // 0-20
  aprovado: boolean; // score >= 12 && maturidade >= 4
  motivoRejeicao?: string; // Se rejeitado
}

/**
 * Calcula Desalinhamento Estrutural (Q1-5)
 * Mede desvio entre estratégia declarada e realidade operacional
 */
export function calcularDesalinhamento(respostas: Resposta[]): number {
  const q1_5 = respostas.filter((r) => r.numero >= 1 && r.numero <= 5);
  if (q1_5.length === 0) return 0;

  // Soma das respostas (1-5 cada) dividida por quantidade
  const soma = q1_5.reduce((acc, r) => acc + r.valor_resposta, 0);
  const media = soma / q1_5.length; // 1-5

  // Normaliza para 0-5 (onde 1 = 0 no score, 5 = 5 no score)
  return Math.round((media - 1) * (5 / 4) * 10) / 10;
}

/**
 * Calcula Ruído de Decisão (Q6-10)
 * Mede quantidade de prioridades conflitantes / mudanças de rota
 */
export function calcularRuido(respostas: Resposta[]): number {
  const q6_10 = respostas.filter((r) => r.numero >= 6 && r.numero <= 10);
  if (q6_10.length === 0) return 0;

  // Soma e normaliza
  const soma = q6_10.reduce((acc, r) => acc + r.valor_resposta, 0);
  const media = soma / q6_10.length; // 1-5

  // Inverter: ruído alto = score baixo (Q6-10 são "negativas")
  // Se responde 5 (pior), score é 0. Se responde 1 (melhor), score é 5.
  return Math.round((5 - media) * (5 / 4) * 10) / 10;
}

/**
 * Calcula Vazamento Financeiro (Q16-20)
 * Mede drenagem financeira (tempo desperdiçado, margens baixas)
 */
export function calcularVazamento(respostas: Resposta[]): number {
  const q16_20 = respostas.filter((r) => r.numero >= 16 && r.numero <= 20);
  if (q16_20.length === 0) return 0;

  // Soma e normaliza
  const soma = q16_20.reduce((acc, r) => acc + r.valor_resposta, 0);
  const media = soma / q16_20.length; // 1-5

  // Normaliza para 0-5
  return Math.round((media - 1) * (5 / 4) * 10) / 10;
}

/**
 * Calcula Maturidade Estratégica (Q26-28)
 * Mede disposição/readiness para mudança estrutural
 * Crítico: score >= 4 é necessário para aprovação
 */
export function calcularMaturidade(respostas: Resposta[]): number {
  const q26_28 = respostas.filter((r) => r.numero >= 26 && r.numero <= 28);
  if (q26_28.length === 0) return 0;

  // Soma e normaliza
  const soma = q26_28.reduce((acc, r) => acc + r.valor_resposta, 0);
  const media = soma / q26_28.length; // 1-5

  // Normaliza para 0-5
  return Math.round((media - 1) * (5 / 4) * 10) / 10;
}

/**
 * Calcula Score Total = soma das 4 dimensões
 * Precisão: ±0.1
 */
export function calcularScoreTotal(dimensoes: ScoreDimensoes): number {
  const total =
    dimensoes.desalinhamento_estrutural +
    dimensoes.ruido_decisao +
    dimensoes.vazamento_financeiro +
    dimensoes.maturidade_estrategica;

  // Precisão: ±0.1
  return Math.round(total * 10) / 10;
}

/**
 * Verifica aprovação com lógica:
 * ✅ APROVADO: score >= 12 AND maturidade >= 4
 * ❌ REJEITADO: caso contrário
 */
export function verificarAprovacao(
  scoreTotal: number,
  maturidade: number
): { aprovado: boolean; motivo?: string } {
  if (scoreTotal >= 12 && maturidade >= 4) {
    return {
      aprovado: true,
    };
  }

  const motivos: string[] = [];
  if (scoreTotal < 12) {
    motivos.push(
      `Score total ${scoreTotal} < 12 (necessário >= 12)`
    );
  }
  if (maturidade < 4) {
    motivos.push(
      `Maturidade ${maturidade} < 4 (necessário >= 4)`
    );
  }

  return {
    aprovado: false,
    motivo: motivos.join('; '),
  };
}

/**
 * Calcula score completo a partir das respostas
 */
export function calcularScore(respostas: Resposta[]): ScoreResult {
  const desalinhamento = calcularDesalinhamento(respostas);
  const ruido = calcularRuido(respostas);
  const vazamento = calcularVazamento(respostas);
  const maturidade = calcularMaturidade(respostas);

  const dimensoes: ScoreDimensoes = {
    desalinhamento_estrutural: desalinhamento,
    ruido_decisao: ruido,
    vazamento_financeiro: vazamento,
    maturidade_estrategica: maturidade,
  };

  const total = calcularScoreTotal(dimensoes);
  const { aprovado, motivo } = verificarAprovacao(total, maturidade);

  return {
    ...dimensoes,
    total,
    aprovado,
    motivoRejeicao: motivo,
  };
}
