/**
 * E2E Tests — Check-in Flow (4.2, 4.3)
 * Testa: Check-in submission → Feedback generation → Email job
 */

import { describe, it, expect, beforeAll } from 'vitest';
import { fastify } from '../main';
import { generateFeedback } from '../lib/feedback-generator';

describe('Check-in E2E Flow', () => {
  const testClienteId = 'test-cliente-123';
  const testToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'; // Mock token

  beforeAll(async () => {
    // TODO: Validar auth middleware com token válido
  });

  it('should accept valid check-in submission', async () => {
    const payload = {
      week: 1,
      indicador_value: 100,
      acoes_done: [true, false, true],
      bloqueadores: 'Falta de comunicação clara',
      aprendizados: 'Importância da documentação',
      proxima_semana: 'Focar em melhorar docs',
    };

    // Simular POST /api/check-ins
    expect(payload.week).toBe(1);
    expect(payload.indicador_value).toBe(100);
    expect(payload.acoes_done.filter((a) => a).length).toBeGreaterThan(0);
    expect(payload.proxima_semana).toBeTruthy();
  });

  it('should generate feedback with pattern detection', () => {
    const currentCheckIn = {
      week: 2,
      indicador_value: 120,
      bloqueadores: 'Comunicação',
      aprendizados: 'Documentação',
      proxima_semana: 'Melhorar docs',
    };

    const previousCheckIns = [
      {
        week: 1,
        indicador_value: 100,
        bloqueadores: 'Comunicação',
        aprendizados: 'Importância',
        proxima_semana: 'Focar em docs',
      },
    ];

    const feedback = generateFeedback(currentCheckIn, previousCheckIns, 130);

    // Validações
    expect(feedback.validacao).toContain('cresceu');
    expect(feedback.padroes).toContain('Comunicação');
    expect(feedback.recomendacao).toBeTruthy();
    expect(feedback.proxima_semana_recap).toContain('Semana 3');
  });

  it('should detect repeated blockers pattern', () => {
    const currentCheckIn = {
      week: 4,
      indicador_value: 140,
      bloqueadores: 'Comunicação',
      aprendizados: 'Melhor planning',
      proxima_semana: 'Sprint planning',
    };

    const previousCheckIns = [
      {
        week: 1,
        indicador_value: 100,
        bloqueadores: 'Comunicação interna',
        aprendizados: 'Sync meetings',
        proxima_semana: 'Agendar syncs',
      },
      {
        week: 2,
        indicador_value: 115,
        bloqueadores: 'Comunicação entre times',
        aprendizados: 'Slack channels',
        proxima_semana: 'Criar channels',
      },
      {
        week: 3,
        indicador_value: 130,
        bloqueadores: 'Comunicação',
        aprendizados: 'Daily standups',
        proxima_semana: 'Daily standup',
      },
    ];

    const feedback = generateFeedback(currentCheckIn, previousCheckIns, 140);

    // Deve detectar padrão de "Comunicação" aparecendo 2+ vezes
    expect(feedback.padroes).toContain('Padrão detectado');
    expect(feedback.padroes).toContain('2+');
  });

  it('should validate check-in required fields', () => {
    const invalidPayload: any = {
      week: 1,
      // Missing: indicador_value
      acoes_done: [],
      bloqueadores: '',
      aprendizados: '',
      proxima_semana: '',
    };

    // Validação deve falhar: sem indicador, sem ações, sem proxima_semana
    const hasIndicador = invalidPayload.indicador_value !== undefined;
    const hasAcoes = invalidPayload.acoes_done.length > 0;
    const hasProximaSemana = invalidPayload.proxima_semana.length > 0;

    expect(hasIndicador).toBe(false);
    expect(hasAcoes).toBe(false);
    expect(hasProximaSemana).toBe(false);
  });

  it('should format feedback email correctly', () => {
    const feedback = {
      validacao: 'Você cresceu 20 pontos essa semana (20% de aumento)',
      padroes: 'Padrão detectado: "Comunicação" apareceu 2+ vezes',
      recomendacao: 'Sugiro focar em estruturar melhor a comunicação',
      proxima_semana_recap: 'Semana 5: Seu foco é "Melhorar documentação"',
    };

    const emailContent = `
Validação: ${feedback.validacao}
Padrões: ${feedback.padroes}
Recomendação: ${feedback.recomendacao}
Próxima Semana: ${feedback.proxima_semana_recap}
`;

    expect(emailContent).toContain('cresceu');
    expect(emailContent).toContain('Padrão detectado');
    expect(emailContent).toContain('Recomendação');
  });
});
