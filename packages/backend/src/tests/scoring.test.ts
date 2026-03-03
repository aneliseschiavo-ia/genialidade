/**
 * Testes unitários para sistema de scoring 4D
 * Story 1.3 — Scoring Logic
 *
 * Total: 25+ testes cobrindo:
 * - Cada dimensão (Desalinhamento, Ruído, Vazamento, Maturidade)
 * - Score total
 * - Lógica de aprovação
 * - Gerador de hipótese
 * - Edge cases
 */

import { describe, test, expect } from 'vitest';
import {
  calcularDesalinhamento,
  calcularRuido,
  calcularVazamento,
  calcularMaturidade,
  calcularScoreTotal,
  verificarAprovacao,
  calcularScore,
  Resposta,
  ScoreDimensoes,
} from '../lib/scoring';
import { gerarHipotese } from '../lib/hipotese';

describe('Scoring 4D System', () => {
  // ============================================================
  // TESTE 1-5: Desalinhamento Estrutural (Q1-5)
  // ============================================================

  describe('Desalinhamento Estrutural (Q1-5)', () => {
    test('Desalinhamento: todas respostas 1 = score 0', () => {
      const respostas: Resposta[] = [
        { questao_id: 1, numero: 1, valor_resposta: 1 },
        { questao_id: 2, numero: 2, valor_resposta: 1 },
        { questao_id: 3, numero: 3, valor_resposta: 1 },
        { questao_id: 4, numero: 4, valor_resposta: 1 },
        { questao_id: 5, numero: 5, valor_resposta: 1 },
      ];
      expect(calcularDesalinhamento(respostas)).toBe(0);
    });

    test('Desalinhamento: todas respostas 5 = score 5', () => {
      const respostas: Resposta[] = [
        { questao_id: 1, numero: 1, valor_resposta: 5 },
        { questao_id: 2, numero: 2, valor_resposta: 5 },
        { questao_id: 3, numero: 3, valor_resposta: 5 },
        { questao_id: 4, numero: 4, valor_resposta: 5 },
        { questao_id: 5, numero: 5, valor_resposta: 5 },
      ];
      expect(calcularDesalinhamento(respostas)).toBe(5);
    });

    test('Desalinhamento: média 3 (centro) = score ~2.5', () => {
      const respostas: Resposta[] = [
        { questao_id: 1, numero: 1, valor_resposta: 3 },
        { questao_id: 2, numero: 2, valor_resposta: 3 },
        { questao_id: 3, numero: 3, valor_resposta: 3 },
        { questao_id: 4, numero: 4, valor_resposta: 3 },
        { questao_id: 5, numero: 5, valor_resposta: 3 },
      ];
      const score = calcularDesalinhamento(respostas);
      expect(score).toBeGreaterThanOrEqual(2.4);
      expect(score).toBeLessThanOrEqual(2.6);
    });

    test('Desalinhamento: sem respostas Q1-5 = 0', () => {
      const respostas: Resposta[] = [];
      expect(calcularDesalinhamento(respostas)).toBe(0);
    });

    test('Desalinhamento: parcial (3 respostas)', () => {
      const respostas: Resposta[] = [
        { questao_id: 1, numero: 1, valor_resposta: 1 },
        { questao_id: 2, numero: 2, valor_resposta: 3 },
        { questao_id: 3, numero: 3, valor_resposta: 5 },
      ];
      const score = calcularDesalinhamento(respostas);
      expect(score).toBeGreaterThanOrEqual(1.5);
      expect(score).toBeLessThanOrEqual(2.5);
    });
  });

  // ============================================================
  // TESTE 6-10: Ruído de Decisão (Q6-10) — INVERTIDO
  // ============================================================

  describe('Ruído de Decisão (Q6-10) — Invertido', () => {
    test('Ruído: todas respostas 5 (pior) = score 0', () => {
      const respostas: Resposta[] = [
        { questao_id: 6, numero: 6, valor_resposta: 5 },
        { questao_id: 7, numero: 7, valor_resposta: 5 },
        { questao_id: 8, numero: 8, valor_resposta: 5 },
        { questao_id: 9, numero: 9, valor_resposta: 5 },
        { questao_id: 10, numero: 10, valor_resposta: 5 },
      ];
      const score = calcularRuido(respostas);
      expect(score).toBeCloseTo(0, 0);
    });

    test('Ruído: todas respostas 1 (melhor) = score ~5', () => {
      const respostas: Resposta[] = [
        { questao_id: 6, numero: 6, valor_resposta: 1 },
        { questao_id: 7, numero: 7, valor_resposta: 1 },
        { questao_id: 8, numero: 8, valor_resposta: 1 },
        { questao_id: 9, numero: 9, valor_resposta: 1 },
        { questao_id: 10, numero: 10, valor_resposta: 1 },
      ];
      const score = calcularRuido(respostas);
      expect(score).toBeCloseTo(5, 0);
    });

    test('Ruído: média 3 = score ~2.5', () => {
      const respostas: Resposta[] = [
        { questao_id: 6, numero: 6, valor_resposta: 3 },
        { questao_id: 7, numero: 7, valor_resposta: 3 },
        { questao_id: 8, numero: 8, valor_resposta: 3 },
        { questao_id: 9, numero: 9, valor_resposta: 3 },
        { questao_id: 10, numero: 10, valor_resposta: 3 },
      ];
      const score = calcularRuido(respostas);
      expect(score).toBeCloseTo(2.5, 1);
    });
  });

  // ============================================================
  // TESTE 11-15: Vazamento Financeiro (Q16-20)
  // ============================================================

  describe('Vazamento Financeiro (Q16-20)', () => {
    test('Vazamento: todas respostas 1 = score 0', () => {
      const respostas: Resposta[] = [
        { questao_id: 16, numero: 16, valor_resposta: 1 },
        { questao_id: 17, numero: 17, valor_resposta: 1 },
        { questao_id: 18, numero: 18, valor_resposta: 1 },
        { questao_id: 19, numero: 19, valor_resposta: 1 },
        { questao_id: 20, numero: 20, valor_resposta: 1 },
      ];
      expect(calcularVazamento(respostas)).toBe(0);
    });

    test('Vazamento: todas respostas 5 = score 5', () => {
      const respostas: Resposta[] = [
        { questao_id: 16, numero: 16, valor_resposta: 5 },
        { questao_id: 17, numero: 17, valor_resposta: 5 },
        { questao_id: 18, numero: 18, valor_resposta: 5 },
        { questao_id: 19, numero: 19, valor_resposta: 5 },
        { questao_id: 20, numero: 20, valor_resposta: 5 },
      ];
      expect(calcularVazamento(respostas)).toBe(5);
    });
  });

  // ============================================================
  // TESTE 16-20: Maturidade Estratégica (Q26-28) — CRÍTICA
  // ============================================================

  describe('Maturidade Estratégica (Q26-28)', () => {
    test('Maturidade: todas respostas 1 = score 0', () => {
      const respostas: Resposta[] = [
        { questao_id: 26, numero: 26, valor_resposta: 1 },
        { questao_id: 27, numero: 27, valor_resposta: 1 },
        { questao_id: 28, numero: 28, valor_resposta: 1 },
      ];
      expect(calcularMaturidade(respostas)).toBe(0);
    });

    test('Maturidade: todas respostas 5 = score 5', () => {
      const respostas: Resposta[] = [
        { questao_id: 26, numero: 26, valor_resposta: 5 },
        { questao_id: 27, numero: 27, valor_resposta: 5 },
        { questao_id: 28, numero: 28, valor_resposta: 5 },
      ];
      expect(calcularMaturidade(respostas)).toBe(5);
    });

    test('Maturidade: exatamente 4 (threshold)', () => {
      const respostas: Resposta[] = [
        { questao_id: 26, numero: 26, valor_resposta: 4 },
        { questao_id: 27, numero: 27, valor_resposta: 4 },
        { questao_id: 28, numero: 28, valor_resposta: 4 },
      ];
      const score = calcularMaturidade(respostas);
      expect(score).toBeCloseTo(3.75, 1);
    });

    test('Maturidade: 3.99 < 4 (abaixo threshold)', () => {
      const respostas: Resposta[] = [
        { questao_id: 26, numero: 26, valor_resposta: 4 },
        { questao_id: 27, numero: 27, valor_resposta: 4 },
        { questao_id: 28, numero: 28, valor_resposta: 3 },
      ];
      const score = calcularMaturidade(respostas);
      expect(score).toBeLessThan(4);
    });
  });

  // ============================================================
  // TESTE 21-22: Score Total (0-20)
  // ============================================================

  describe('Score Total (0-20)', () => {
    test('Score total: min (0+0+0+0) = 0', () => {
      const dimensoes: ScoreDimensoes = {
        desalinhamento_estrutural: 0,
        ruido_decisao: 0,
        vazamento_financeiro: 0,
        maturidade_estrategica: 0,
      };
      expect(calcularScoreTotal(dimensoes)).toBe(0);
    });

    test('Score total: max (5+5+5+5) = 20', () => {
      const dimensoes: ScoreDimensoes = {
        desalinhamento_estrutural: 5,
        ruido_decisao: 5,
        vazamento_financeiro: 5,
        maturidade_estrategica: 5,
      };
      expect(calcularScoreTotal(dimensoes)).toBe(20);
    });

    test('Score total: precisão ±0.1', () => {
      const dimensoes: ScoreDimensoes = {
        desalinhamento_estrutural: 3.15,
        ruido_decisao: 2.85,
        vazamento_financeiro: 3.25,
        maturidade_estrategica: 2.75,
      };
      const total = calcularScoreTotal(dimensoes);
      expect(total).toBe(12); // 12.0 (arredondado)
    });
  });

  // ============================================================
  // TESTE 23-25: Lógica de Aprovação
  // ============================================================

  describe('Lógica de Aprovação', () => {
    test('Aprovação: score 12, maturidade 4 = APROVADO', () => {
      const result = verificarAprovacao(12, 4);
      expect(result.aprovado).toBe(true);
      expect(result.motivo).toBeUndefined();
    });

    test('Aprovação: score 12, maturidade 3.99 = REJEITADO', () => {
      const result = verificarAprovacao(12, 3.99);
      expect(result.aprovado).toBe(false);
      expect(result.motivo).toContain('Maturidade');
    });

    test('Aprovação: score 11.99, maturidade 4 = REJEITADO', () => {
      const result = verificarAprovacao(11.99, 4);
      expect(result.aprovado).toBe(false);
      expect(result.motivo).toContain('Score total');
    });

    test('Aprovação: score 20, maturidade 5 = APROVADO', () => {
      const result = verificarAprovacao(20, 5);
      expect(result.aprovado).toBe(true);
    });

    test('Aprovação: score 0, maturidade 0 = REJEITADO', () => {
      const result = verificarAprovacao(0, 0);
      expect(result.aprovado).toBe(false);
      expect(result.motivo).toContain('Score total');
      expect(result.motivo).toContain('Maturidade');
    });
  });

  // ============================================================
  // TESTE 26-28: Função calcularScore (Integrada)
  // ============================================================

  describe('calcularScore - Integração Completa', () => {
    test('Caso aprovado: score 14, maturidade 4.5', () => {
      const respostas: Resposta[] = [
        // Q1-5 (desalinhamento): todas 3 = ~2.5
        { questao_id: 1, numero: 1, valor_resposta: 3 },
        { questao_id: 2, numero: 2, valor_resposta: 3 },
        { questao_id: 3, numero: 3, valor_resposta: 3 },
        { questao_id: 4, numero: 4, valor_resposta: 3 },
        { questao_id: 5, numero: 5, valor_resposta: 3 },
        // Q6-10 (ruído): todas 2 = ~4.0 (invertido)
        { questao_id: 6, numero: 6, valor_resposta: 2 },
        { questao_id: 7, numero: 7, valor_resposta: 2 },
        { questao_id: 8, numero: 8, valor_resposta: 2 },
        { questao_id: 9, numero: 9, valor_resposta: 2 },
        { questao_id: 10, numero: 10, valor_resposta: 2 },
        // Q16-20 (vazamento): todas 4 = ~5.0
        { questao_id: 16, numero: 16, valor_resposta: 4 },
        { questao_id: 17, numero: 17, valor_resposta: 4 },
        { questao_id: 18, numero: 18, valor_resposta: 4 },
        { questao_id: 19, numero: 19, valor_resposta: 4 },
        { questao_id: 20, numero: 20, valor_resposta: 4 },
        // Q26-28 (maturidade): todas 5 = 5.0
        { questao_id: 26, numero: 26, valor_resposta: 5 },
        { questao_id: 27, numero: 27, valor_resposta: 5 },
        { questao_id: 28, numero: 28, valor_resposta: 5 },
      ];

      const result = calcularScore(respostas);
      expect(result.aprovado).toBe(true);
      expect(result.total).toBeGreaterThanOrEqual(12);
      expect(result.maturidade_estrategica).toBeGreaterThanOrEqual(4);
    });

    test('Caso rejeitado (score baixo)', () => {
      const respostas: Resposta[] = [
        // Q1-5: todas 1 = 0
        { questao_id: 1, numero: 1, valor_resposta: 1 },
        { questao_id: 2, numero: 2, valor_resposta: 1 },
        { questao_id: 3, numero: 3, valor_resposta: 1 },
        { questao_id: 4, numero: 4, valor_resposta: 1 },
        { questao_id: 5, numero: 5, valor_resposta: 1 },
        // Q6-10: todas 5 = 0
        { questao_id: 6, numero: 6, valor_resposta: 5 },
        { questao_id: 7, numero: 7, valor_resposta: 5 },
        { questao_id: 8, numero: 8, valor_resposta: 5 },
        { questao_id: 9, numero: 9, valor_resposta: 5 },
        { questao_id: 10, numero: 10, valor_resposta: 5 },
        // Q16-20: todas 1 = 0
        { questao_id: 16, numero: 16, valor_resposta: 1 },
        { questao_id: 17, numero: 17, valor_resposta: 1 },
        { questao_id: 18, numero: 18, valor_resposta: 1 },
        { questao_id: 19, numero: 19, valor_resposta: 1 },
        { questao_id: 20, numero: 20, valor_resposta: 1 },
        // Q26-28: todas 1 = 0
        { questao_id: 26, numero: 26, valor_resposta: 1 },
        { questao_id: 27, numero: 27, valor_resposta: 1 },
        { questao_id: 28, numero: 28, valor_resposta: 1 },
      ];

      const result = calcularScore(respostas);
      expect(result.aprovado).toBe(false);
      expect(result.total).toBeLessThan(5);
      expect(result.motivoRejeicao).toBeDefined();
    });

    test('Caso rejeitado (maturidade < 4)', () => {
      const respostas: Resposta[] = [
        // Q1-5: todas 5 = 5
        { questao_id: 1, numero: 1, valor_resposta: 5 },
        { questao_id: 2, numero: 2, valor_resposta: 5 },
        { questao_id: 3, numero: 3, valor_resposta: 5 },
        { questao_id: 4, numero: 4, valor_resposta: 5 },
        { questao_id: 5, numero: 5, valor_resposta: 5 },
        // Q6-10: todas 1 = 5
        { questao_id: 6, numero: 6, valor_resposta: 1 },
        { questao_id: 7, numero: 7, valor_resposta: 1 },
        { questao_id: 8, numero: 8, valor_resposta: 1 },
        { questao_id: 9, numero: 9, valor_resposta: 1 },
        { questao_id: 10, numero: 10, valor_resposta: 1 },
        // Q16-20: todas 5 = 5
        { questao_id: 16, numero: 16, valor_resposta: 5 },
        { questao_id: 17, numero: 17, valor_resposta: 5 },
        { questao_id: 18, numero: 18, valor_resposta: 5 },
        { questao_id: 19, numero: 19, valor_resposta: 5 },
        { questao_id: 20, numero: 20, valor_resposta: 5 },
        // Q26-28: todas 2 = ~1.25 (< 4)
        { questao_id: 26, numero: 26, valor_resposta: 2 },
        { questao_id: 27, numero: 27, valor_resposta: 2 },
        { questao_id: 28, numero: 28, valor_resposta: 2 },
      ];

      const result = calcularScore(respostas);
      expect(result.aprovado).toBe(false);
      expect(result.total).toBeGreaterThan(12);
      expect(result.maturidade_estrategica).toBeLessThan(4);
    });
  });

  // ============================================================
  // TESTE 29-30: Gerador de Hipótese
  // ============================================================

  describe('Gerador de Hipótese Preliminar', () => {
    test('Hipótese: desalinhamento crítico', () => {
      const dimensoes: ScoreDimensoes = {
        desalinhamento_estrutural: 4.5,
        ruido_decisao: 1,
        vazamento_financeiro: 1,
        maturidade_estrategica: 3,
      };

      const hipotese = gerarHipotese(dimensoes);
      expect(hipotese.titulo).toContain('Desvio');
      expect(hipotese.hipotese).toBeDefined();
      expect(hipotese.focos_imediatos.length).toBeGreaterThan(0);
    });

    test('Hipótese: ruído crítico', () => {
      const dimensoes: ScoreDimensoes = {
        desalinhamento_estrutural: 2,
        ruido_decisao: 4.5,
        vazamento_financeiro: 2,
        maturidade_estrategica: 3,
      };

      const hipotese = gerarHipotese(dimensoes);
      expect(hipotese.titulo).toContain('Prioridades');
      expect(hipotese.focos_imediatos.length).toBeGreaterThan(0);
    });

    test('Hipótese: vazamento crítico', () => {
      const dimensoes: ScoreDimensoes = {
        desalinhamento_estrutural: 1,
        ruido_decisao: 1,
        vazamento_financeiro: 4.5,
        maturidade_estrategica: 3,
      };

      const hipotese = gerarHipotese(dimensoes);
      expect(hipotese.titulo).toContain('Drenagem');
      expect(hipotese.focos_imediatos.length).toBeGreaterThan(0);
    });

    test('Hipótese: maturidade baixa', () => {
      const dimensoes: ScoreDimensoes = {
        desalinhamento_estrutural: 3,
        ruido_decisao: 3,
        vazamento_financeiro: 3,
        maturidade_estrategica: 1,
      };

      const hipotese = gerarHipotese(dimensoes);
      expect(hipotese.titulo).toContain('Disposição');
      expect(hipotese.focos_imediatos.length).toBeGreaterThan(0);
    });
  });
});
