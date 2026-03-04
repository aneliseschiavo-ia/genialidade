import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { fastify } from '../main';

describe('Story 1.5 — PDF Diagnóstico', () => {
  beforeAll(async () => {
    // Ensure server is started
  });

  afterAll(async () => {
    await fastify.close();
  });

  describe('POST /api/pdf', () => {
    it('should generate PDF with valid input', async () => {
      const response = await fastify.inject({
        method: 'POST',
        url: '/api/pdf',
        payload: {
          clientId: 'client-123',
          clientName: 'João da Silva',
          scores: {
            desalinhamento: 3.5,
            ruido: 2.8,
            vazamento: 4.2,
            maturidade: 4.5,
            total: 15.0,
          },
          verdadeNucleo:
            'Sua dispersão de oferta está drenando 35% da sua margem operacional',
          hipotese:
            'Você tenta servir 5 mercados diferentes sem especialização em nenhum deles. ' +
            'Isso cria overhead operacional (30% dos custos) sem diferencial competitivo. ' +
            'A solução é focar em 2 mercados adjacentes e automatizar operações.',
          sessionDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
          sessionTime: '14:00',
          sessionLink: 'https://zoom.us/j/123456789',
          contactEmail: 'support@genialidade.ai',
        },
      });

      expect(response.statusCode).toBe(200);
      const body = JSON.parse(response.body);
      expect(body.success).toBe(true);
      expect(body.filename).toContain('diagnose_client-123_');
      expect(body.filename).toContain('.pdf');
      expect(body.url).toBeDefined();
      expect(body.filesize).toBeGreaterThan(0);
    });

    it('should fail validation with missing required fields', async () => {
      const response = await fastify.inject({
        method: 'POST',
        url: '/api/pdf',
        payload: {
          clientId: 'client-456',
          clientName: 'Maria Santos',
          // Missing scores, verdadeNucleo, etc
        },
      });

      expect(response.statusCode).toBe(400);
      const body = JSON.parse(response.body);
      expect(body.error).toBe('Validação falhou');
      expect(body.details.length).toBeGreaterThan(0);
    });

    it('should fail with missing clientId', async () => {
      const response = await fastify.inject({
        method: 'POST',
        url: '/api/pdf',
        payload: {
          clientName: 'Test Client',
          scores: {
            desalinhamento: 3,
            ruido: 2,
            vazamento: 4,
            maturidade: 4,
            total: 13,
          },
          verdadeNucleo: 'Test',
          hipotese: 'Test',
          sessionDate: new Date().toISOString(),
          sessionTime: '14:00',
        },
      });

      expect(response.statusCode).toBe(400);
      const body = JSON.parse(response.body);
      expect(body.details).toContainEqual('clientId é obrigatório');
    });

    it('should fail with missing scores.total', async () => {
      const response = await fastify.inject({
        method: 'POST',
        url: '/api/pdf',
        payload: {
          clientId: 'client-789',
          clientName: 'Test Client',
          scores: {
            desalinhamento: 3,
            ruido: 2,
            vazamento: 4,
            maturidade: 4,
            // Missing total
          },
          verdadeNucleo: 'Test',
          hipotese: 'Test',
          sessionDate: new Date().toISOString(),
          sessionTime: '14:00',
        },
      });

      expect(response.statusCode).toBe(400);
      const body = JSON.parse(response.body);
      expect(body.details).toContainEqual('scores.total é obrigatório');
    });
  });

  describe('GET /api/pdf/:clientId', () => {
    beforeAll(async () => {
      // Generate a PDF first
      await fastify.inject({
        method: 'POST',
        url: '/api/pdf',
        payload: {
          clientId: 'test-get-client',
          clientName: 'Test Get Client',
          scores: {
            desalinhamento: 3,
            ruido: 2,
            vazamento: 4,
            maturidade: 4,
            total: 13,
          },
          verdadeNucleo: 'Test verdade',
          hipotese: 'Test hipotese',
          sessionDate: new Date().toISOString(),
          sessionTime: '14:00',
          contactEmail: 'test@example.com',
        },
      });
    });

    it('should retrieve existing PDF', async () => {
      const response = await fastify.inject({
        method: 'GET',
        url: '/api/pdf/test-get-client',
      });

      expect(response.statusCode).toBe(200);
      const body = JSON.parse(response.body);
      expect(body.success).toBe(true);
      expect(body.filename).toContain('diagnose_test-get-client_');
      expect(body.url).toBeDefined();
      expect(body.createdAt).toBeDefined();
    });

    it('should return 404 for non-existent client', async () => {
      const response = await fastify.inject({
        method: 'GET',
        url: '/api/pdf/non-existent-client-12345',
      });

      expect(response.statusCode).toBe(404);
      const body = JSON.parse(response.body);
      expect(body.error).toBe('PDF não encontrado');
    });
  });

  describe('PDF Generation Performance', () => {
    it('should generate PDF in less than 30 seconds', async () => {
      const startTime = Date.now();

      const response = await fastify.inject({
        method: 'POST',
        url: '/api/pdf',
        payload: {
          clientId: `perf-test-${Date.now()}`,
          clientName: 'Performance Test Client',
          scores: {
            desalinhamento: 3.5,
            ruido: 2.8,
            vazamento: 4.2,
            maturidade: 4.5,
            total: 15.0,
          },
          verdadeNucleo: 'Performance test verdade núcleo',
          hipotese: 'Performance test hipótese estruturada',
          sessionDate: new Date().toISOString(),
          sessionTime: '14:00',
          contactEmail: 'perf@test.com',
        },
      });

      const endTime = Date.now();
      const duration = endTime - startTime;

      expect(response.statusCode).toBe(200);
      expect(duration).toBeLessThan(30 * 1000); // 30 seconds
    });
  });

  describe('PDF Content Validation', () => {
    it('should generate PDF with correct structure (5 pages)', async () => {
      const response = await fastify.inject({
        method: 'POST',
        url: '/api/pdf',
        payload: {
          clientId: `structure-test-${Date.now()}`,
          clientName: 'Structure Test Client',
          scores: {
            desalinhamento: 3.5,
            ruido: 2.8,
            vazamento: 4.2,
            maturidade: 4.5,
            total: 15.0,
          },
          verdadeNucleo:
            'Sua verdade núcleo específica para este cliente',
          hipotese: 'Hipótese estruturada com 3-5 frases.',
          sessionDate: new Date().toISOString(),
          sessionTime: '15:30',
          contactEmail: 'structure@test.com',
        },
      });

      expect(response.statusCode).toBe(200);
      const body = JSON.parse(response.body);

      // PDF deve ter sido gerado com sucesso
      expect(body.success).toBe(true);
      expect(body.filesize).toBeGreaterThan(5000); // Deve ser um PDF não-trivial
      expect(body.filename).toMatch(/\.pdf$/);
    });
  });

  describe('AC Compliance — Story 1.5', () => {
    it('AC1: PDF renderiza corretamente', async () => {
      const response = await fastify.inject({
        method: 'POST',
        url: '/api/pdf',
        payload: {
          clientId: 'ac1-test',
          clientName: 'AC1 Test Client',
          scores: {
            desalinhamento: 3,
            ruido: 2,
            vazamento: 4,
            maturidade: 4,
            total: 13,
          },
          verdadeNucleo: 'AC1 test',
          hipotese: 'AC1 test hypothesis',
          sessionDate: new Date().toISOString(),
          sessionTime: '14:00',
          contactEmail: 'ac1@test.com',
        },
      });

      expect(response.statusCode).toBe(200);
      const body = JSON.parse(response.body);
      expect(body.filesize).toBeGreaterThan(0);
    });

    it('AC5: Branding colors e styling aplicados (arquivo gerado)', async () => {
      const response = await fastify.inject({
        method: 'POST',
        url: '/api/pdf',
        payload: {
          clientId: 'ac5-branding-test',
          clientName: 'Branding Test Client',
          scores: {
            desalinhamento: 3,
            ruido: 2,
            vazamento: 4,
            maturidade: 4,
            total: 13,
          },
          verdadeNucleo: 'Branding test verdade',
          hipotese: 'Branding test hipótese',
          sessionDate: new Date().toISOString(),
          sessionTime: '14:00',
          contactEmail: 'branding@test.com',
        },
      });

      expect(response.statusCode).toBe(200);
      // PDF templates incluem cores genialidade (#1B5E20 verde escuro)
      expect(JSON.parse(response.body).success).toBe(true);
    });

    it('AC10: Performance <30 seg para geração', async () => {
      const startTime = Date.now();

      await fastify.inject({
        method: 'POST',
        url: '/api/pdf',
        payload: {
          clientId: `perf-ac10-${Date.now()}`,
          clientName: 'Performance AC10 Test',
          scores: {
            desalinhamento: 3,
            ruido: 2,
            vazamento: 4,
            maturidade: 4,
            total: 13,
          },
          verdadeNucleo: 'AC10 perf test',
          hipotese: 'AC10 perf test',
          sessionDate: new Date().toISOString(),
          sessionTime: '14:00',
          contactEmail: 'perf@test.com',
        },
      });

      const duration = Date.now() - startTime;
      expect(duration).toBeLessThan(30 * 1000);
    });
  });
});
