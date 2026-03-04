/**
 * Lógica pura de aprovação/rejeição
 * Story 2.1 — Aprovação/Rejeição + Gestão de Status
 */

export interface ApprovalEvaluationInput {
  scoreTotal: number;
  scoreMaturidade: number;
  clienteId: string;
}

export interface ApprovalDecision {
  aprovado: boolean;
  motivo: string;
  scoreTotal: number;
  scoreMaturidade: number;
  timestamp: Date;
}

/**
 * Avalia aprovação baseado em score e maturidade
 * Lógica: score ≥ 12 AND maturidade ≥ 4 → APROVADO
 */
export function evaluateApproval(input: ApprovalEvaluationInput): ApprovalDecision {
  const { scoreTotal, scoreMaturidade } = input;

  const aprovado = scoreTotal >= 12 && scoreMaturidade >= 4;

  let motivo = '';

  if (aprovado) {
    motivo = `Score ${scoreTotal.toFixed(1)}/20 (≥12) e Maturidade ${scoreMaturidade.toFixed(1)}/5 (≥4) ✅`;
  } else {
    const failureReasons = [];

    if (scoreTotal < 12) {
      failureReasons.push(
        `Score ${scoreTotal.toFixed(1)}/20 (abaixo do mínimo 12)`
      );
    }

    if (scoreMaturidade < 4) {
      failureReasons.push(
        `Maturidade ${scoreMaturidade.toFixed(1)}/5 (abaixo do mínimo 4)`
      );
    }

    motivo = `Rejeição: ${failureReasons.join(' e ')} ❌`;
  }

  return {
    aprovado,
    motivo,
    scoreTotal,
    scoreMaturidade,
    timestamp: new Date(),
  };
}

/**
 * Valida edge cases críticos
 * Score = 12.0 deve ser aprovado (≥ incluso)
 * Score = 11.9 deve ser rejeitado (< 12)
 */
export function validateApprovalLogic(): void {
  // Edge case: score exatamente 12
  const edgeCase1 = evaluateApproval({
    scoreTotal: 12.0,
    scoreMaturidade: 4.0,
    clienteId: 'test-1',
  });
  if (!edgeCase1.aprovado) {
    throw new Error('Edge case fail: score=12.0 deve ser aprovado');
  }

  // Edge case: score 11.9
  const edgeCase2 = evaluateApproval({
    scoreTotal: 11.9,
    scoreMaturidade: 4.0,
    clienteId: 'test-2',
  });
  if (edgeCase2.aprovado) {
    throw new Error('Edge case fail: score=11.9 deve ser rejeitado');
  }

  // Edge case: maturidade exatamente 4
  const edgeCase3 = evaluateApproval({
    scoreTotal: 12.0,
    scoreMaturidade: 4.0,
    clienteId: 'test-3',
  });
  if (!edgeCase3.aprovado) {
    throw new Error('Edge case fail: maturidade=4.0 deve ser aprovado');
  }

  // Edge case: maturidade 3.9
  const edgeCase4 = evaluateApproval({
    scoreTotal: 12.0,
    scoreMaturidade: 3.9,
    clienteId: 'test-4',
  });
  if (edgeCase4.aprovado) {
    throw new Error('Edge case fail: maturidade=3.9 deve ser rejeitado');
  }
}

/**
 * Determina ações conforme decisão
 */
export function getApprovalActions(decision: ApprovalDecision): {
  sendEmail: boolean;
  emailVariant: 'approval' | 'rejection';
  createSession: boolean;
  activatePortal: boolean;
  set30DayReminder: boolean;
} {
  return {
    sendEmail: true,
    emailVariant: decision.aprovado ? 'approval' : 'rejection',
    createSession: decision.aprovado,
    activatePortal: decision.aprovado,
    set30DayReminder: !decision.aprovado, // Só para rejeitados
  };
}
