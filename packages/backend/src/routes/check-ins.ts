/**
 * Rota de Check-ins Semanais
 * Story 4.2 — Check-in Semanal (5 campos)
 */

import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { supabase } from '../lib/supabase';
import { authMiddleware, AuthPayload } from '../middleware/auth';

interface CheckInBody {
  week: number;
  indicador_value: number;
  acoes_done: boolean[];
  bloqueadores: string;
  aprendizados: string;
  proxima_semana: string;
}

export async function checkInsRoutes(fastify: FastifyInstance) {
  /**
   * POST /api/check-ins
   * Salva check-in semanal do cliente
   * Trigger: Frontend CheckInForm.tsx após submit
   * Requer: Bearer token JWT no header Authorization
   */
  fastify.post<{ Body: CheckInBody }>(
    '/api/check-ins',
    { preHandler: authMiddleware },
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { week, indicador_value, acoes_done, bloqueadores, aprendizados, proxima_semana } = request.body as CheckInBody;

        // Validação
        if (!week || !indicador_value || !acoes_done || !proxima_semana) {
          return reply.status(400).send({
            error: 'week, indicador_value, acoes_done e proxima_semana são obrigatórios',
          });
        }

        // Extrair clienteId do JWT token (validado por authMiddleware)
        const user = (request as any).user as AuthPayload;
        const clienteId = user.clienteId;

        // Validar que cliente existe e está no plano 90D
        const { data: cliente } = await supabase
          .from('clientes')
          .select('id, status')
          .eq('id', clienteId)
          .single();

        if (!cliente || cliente.status !== 'em_acompanhamento') {
          return reply.status(400).send({
            error: 'Cliente não está em acompanhamento',
          });
        }

        // Salvar check-in
        const { error: insertError, data } = await supabase
          .from('check_ins')
          .insert({
            cliente_id: clienteId,
            week,
            indicador_value,
            acoes_done,
            bloqueadores,
            aprendizados,
            proxima_semana,
            submitted_at: new Date().toISOString(),
          })
          .select();

        if (insertError) {
          fastify.log.error('Insert check-in error:', insertError);
          return reply.status(500).send({
            error: 'Erro ao salvar check-in',
          });
        }

        // Agendar feedback job para 24h depois
        const feedbackDate = new Date(Date.now() + 24 * 60 * 60 * 1000);
        await supabase.from('jobs').insert({
          tipo: 'send_feedback',
          cliente_id: clienteId,
          check_in_id: data?.[0]?.id,
          scheduled_for: feedbackDate.toISOString(),
          status: 'pending',
        });

        reply.status(201).send({
          success: true,
          checkIn: data?.[0],
          feedbackScheduledFor: feedbackDate.toISOString(),
        });
      } catch (error) {
        fastify.log.error('Check-in save error:', error);
        reply.status(500).send({
          error: 'Erro ao salvar check-in',
          details: error instanceof Error ? error.message : 'Unknown error',
        });
      }
    }
  );

  /**
   * GET /api/check-ins/:clienteId
   * Retorna histórico de check-ins do cliente
   */
  fastify.get<{ Params: { clienteId: string } }>(
    '/api/check-ins/:clienteId',
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { clienteId } = request.params as { clienteId: string };

        const { data: checkIns, error } = await supabase
          .from('check_ins')
          .select('*')
          .eq('cliente_id', clienteId)
          .order('week', { ascending: false });

        if (error) {
          return reply.status(500).send({
            error: 'Erro ao buscar check-ins',
          });
        }

        reply.send({
          checkIns: checkIns || [],
          total: checkIns?.length || 0,
        });
      } catch (error) {
        fastify.log.error('Check-in fetch error:', error);
        reply.status(500).send({
          error: 'Erro ao buscar check-ins',
        });
      }
    }
  );

  /**
   * GET /api/check-ins/:clienteId/:week
   * Retorna check-in específico da semana
   */
  fastify.get<{ Params: { clienteId: string; week: string } }>(
    '/api/check-ins/:clienteId/:week',
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { clienteId, week } = request.params as { clienteId: string; week: string };

        const { data: checkIn, error } = await supabase
          .from('check_ins')
          .select('*')
          .eq('cliente_id', clienteId)
          .eq('week', parseInt(week))
          .single();

        if (error || !checkIn) {
          return reply.status(404).send({
            error: 'Check-in não encontrado',
          });
        }

        reply.send(checkIn);
      } catch (error) {
        fastify.log.error('Check-in fetch error:', error);
        reply.status(500).send({
          error: 'Erro ao buscar check-in',
        });
      }
    }
  );
}
