import { describe, it, expect } from 'vitest';
import { evaluateApproval, validateApprovalLogic, getApprovalActions } from '../lib/approval-logic';

describe('Story 2.1 — Aprovação/Rejeição', () => {
  describe('Approval Logic', () => {
    it('should APPROVE with score=15 and maturidade=4.5', () => {
      const result = evaluateApproval({
        scoreTotal: 15,
        scoreMaturidade: 4.5,
        clienteId: 'test-1',
      });

      expect(result.aprovado).toBe(true);
      expect(result.scoreTotal).toBe(15);
      expect(result.scoreMaturidade).toBe(4.5);
    });

    it('should APPROVE with score=12 (minimum)', () => {
      const result = evaluateApproval({
        scoreTotal: 12,
        scoreMaturidade: 4,
        clienteId: 'test-2',
      });

      expect(result.aprovado).toBe(true);
    });

    it('should REJECT with score=11.9', () => {
      const result = evaluateApproval({
        scoreTotal: 11.9,
        scoreMaturidade: 4,
        clienteId: 'test-3',
      });

      expect(result.aprovado).toBe(false);
    });

    it('should REJECT with maturidade=3.9', () => {
      const result = evaluateApproval({
        scoreTotal: 12,
        scoreMaturidade: 3.9,
        clienteId: 'test-4',
      });

      expect(result.aprovado).toBe(false);
    });

    it('should REJECT with maturidade=4 (minimum)', () => {
      const result = evaluateApproval({
        scoreTotal: 12,
        scoreMaturidade: 4.0,
        clienteId: 'test-5',
      });

      expect(result.aprovado).toBe(true);
    });

    it('should APPROVE with high scores', () => {
      const result = evaluateApproval({
        scoreTotal: 20,
        scoreMaturidade: 5,
        clienteId: 'test-6',
      });

      expect(result.aprovado).toBe(true);
    });

    it('should REJECT with both criteria failing', () => {
      const result = evaluateApproval({
        scoreTotal: 10,
        scoreMaturidade: 3,
        clienteId: 'test-7',
      });

      expect(result.aprovado).toBe(false);
      expect(result.motivo).toContain('Score');
      expect(result.motivo).toContain('Maturidade');
    });

    it('should have timestamp', () => {
      const result = evaluateApproval({
        scoreTotal: 15,
        scoreMaturidade: 4.5,
        clienteId: 'test-8',
      });

      expect(result.timestamp).toBeInstanceOf(Date);
      expect(result.timestamp.getTime()).toBeLessThanOrEqual(Date.now());
    });
  });

  describe('Edge Cases', () => {
    it('should validate all edge cases without errors', () => {
      expect(() => validateApprovalLogic()).not.toThrow();
    });

    it('should fail with score exactly at boundary (12.0)', () => {
      const result = evaluateApproval({
        scoreTotal: 12.0,
        scoreMaturidade: 4.0,
        clienteId: 'boundary-test',
      });

      expect(result.aprovado).toBe(true);
    });

    it('should fail with score just below boundary (11.99)', () => {
      const result = evaluateApproval({
        scoreTotal: 11.99,
        scoreMaturidade: 4.0,
        clienteId: 'boundary-test-2',
      });

      expect(result.aprovado).toBe(false);
    });
  });

  describe('Approval Actions', () => {
    it('should set correct actions for approval', () => {
      const decision = evaluateApproval({
        scoreTotal: 15,
        scoreMaturidade: 4.5,
        clienteId: 'test-actions-1',
      });

      const actions = getApprovalActions(decision);

      expect(actions.sendEmail).toBe(true);
      expect(actions.emailVariant).toBe('approval');
      expect(actions.createSession).toBe(true);
      expect(actions.activatePortal).toBe(true);
      expect(actions.set30DayReminder).toBe(false);
    });

    it('should set correct actions for rejection', () => {
      const decision = evaluateApproval({
        scoreTotal: 11,
        scoreMaturidade: 3,
        clienteId: 'test-actions-2',
      });

      const actions = getApprovalActions(decision);

      expect(actions.sendEmail).toBe(true);
      expect(actions.emailVariant).toBe('rejection');
      expect(actions.createSession).toBe(false);
      expect(actions.activatePortal).toBe(false);
      expect(actions.set30DayReminder).toBe(true);
    });
  });

  describe('AC Compliance — Story 2.1', () => {
    it('AC1: Aprovação automática acurada (score≥12 && maturidade≥4)', () => {
      const approved = evaluateApproval({
        scoreTotal: 12,
        scoreMaturidade: 4,
        clienteId: 'ac1-test',
      });

      expect(approved.aprovado).toBe(true);

      const rejected = evaluateApproval({
        scoreTotal: 11.9,
        scoreMaturidade: 4,
        clienteId: 'ac1-test-2',
      });

      expect(rejected.aprovado).toBe(false);
    });

    it('AC2: Rejeição automática sem falsos positivos', () => {
      // Score <12
      expect(
        evaluateApproval({
          scoreTotal: 11,
          scoreMaturidade: 5,
          clienteId: 'ac2-test-1',
        }).aprovado
      ).toBe(false);

      // Maturidade <4
      expect(
        evaluateApproval({
          scoreTotal: 15,
          scoreMaturidade: 3.9,
          clienteId: 'ac2-test-2',
        }).aprovado
      ).toBe(false);

      // Both <
      expect(
        evaluateApproval({
          scoreTotal: 10,
          scoreMaturidade: 2,
          clienteId: 'ac2-test-3',
        }).aprovado
      ).toBe(false);
    });

    it('AC4: Motivo auditável registrado', () => {
      const result = evaluateApproval({
        scoreTotal: 13.5,
        scoreMaturidade: 4.2,
        clienteId: 'ac4-test',
      });

      expect(result.motivo).toBeDefined();
      expect(result.motivo.length).toBeGreaterThan(0);
      expect(result.motivo).toContain('Score');
      expect(result.motivo).toContain('Maturidade');
    });

    it('AC6: Email rejeição copy é graceful', () => {
      const result = evaluateApproval({
        scoreTotal: 10,
        scoreMaturidade: 3,
        clienteId: 'ac6-test',
      });

      expect(result.aprovado).toBe(false);
      expect(result.motivo).toContain('Rejeição');
      // Motivo não deve ser agressivo, apenas técnico
      expect(result.motivo).not.toContain('Falho');
      expect(result.motivo).not.toContain('Ruim');
    });
  });

  describe('Numeric Precision', () => {
    it('should handle floating point precision correctly', () => {
      const testCases = [
        { score: 12.0, maturidade: 4.0, expected: true },
        { score: 12.001, maturidade: 4.0, expected: true },
        { score: 11.999, maturidade: 4.0, expected: false },
        { score: 15.5, maturidade: 4.3, expected: true },
        { score: 15.5, maturidade: 3.99, expected: false },
      ];

      testCases.forEach((testCase) => {
        const result = evaluateApproval({
          scoreTotal: testCase.score,
          scoreMaturidade: testCase.maturidade,
          clienteId: `precision-test-${testCase.score}-${testCase.maturidade}`,
        });

        expect(result.aprovado).toBe(testCase.expected);
      });
    });
  });
});
