/**
 * Rota de Agendamento de Sessão
 * Story 2.2 — Agendamento Sessão 1:1 — Calendário + Zoom/Meet
 */

import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { supabase } from '../lib/supabase';

interface ScheduleSessionBody {
  clienteId: string;
  slotDate: string; // ISO date
  slotTime: string; // HH:mm
  email: string;
  phone?: string;
}

interface RescheduleSessionBody {
  sessionId: string;
  newSlotDate: string;
  newSlotTime: string;
}

export async function sessionsRoutes(fastify: FastifyInstance) {
  /**
   * GET /api/available-slots
   * Retorna slots disponíveis para agendamento
   * (Para MVP, slots pré-configurados administrativamente)
   */
  fastify.get('/api/available-slots', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      // TODO: Integrar com Calendly ou tabela de configuração
      // Para MVP: slots hardcoded
      const slots = [
        { date: '2026-03-06', time: '10:00', available: true },
        { date: '2026-03-06', time: '14:00', available: true },
        { date: '2026-03-07', time: '09:00', available: true },
        { date: '2026-03-07', time: '15:00', available: true },
        { date: '2026-03-08', time: '11:00', available: true },
      ];

      reply.send({
        success: true,
        slots,
      });
    } catch (error) {
      fastify.log.error('Available slots error:', error);
      reply.status(500).send({ error: 'Erro ao carregar slots disponíveis' });
    }
  });

  /**
   * POST /api/sessions/schedule
   * Cliente agenda sua sessão
   */
  fastify.post<{ Body: ScheduleSessionBody }>(
    '/api/sessions/schedule',
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { clienteId, slotDate, slotTime, email, phone } = request.body as ScheduleSessionBody;

        if (!clienteId || !slotDate || !slotTime || !email) {
          return reply.status(400).send({
            error: 'clienteId, slotDate, slotTime e email são obrigatórios',
          });
        }

        // Verificar se cliente está aprovado
        const { data: cliente, error: clientError } = await supabase
          .from('clientes')
          .select('status')
          .eq('id', clienteId)
          .single();

        if (clientError || !cliente || cliente.status !== 'aprovado') {
          return reply.status(403).send({
            error: 'Cliente não aprovado ou não encontrado',
          });
        }

        // Gerar link Zoom (para MVP, usar dummy)
        // TODO: Integrar com Zoom SDK
        const zoomLink = `https://zoom.us/j/${Math.random().toString().substring(2, 11)}`;

        // Scheduled datetime
        const scheduledAt = new Date(`${slotDate}T${slotTime}:00`).toISOString();

        // Criar/atualizar sessão
        const { error: sessionError } = await supabase
          .from('sessoes')
          .update({
            status: 'agendada',
            scheduled_at: scheduledAt,
            zoom_url: zoomLink,
            email_confirmacao: email,
            phone,
            updated_at: new Date().toISOString(),
          })
          .eq('cliente_id', clienteId);

        if (sessionError) {
          fastify.log.error('Session update error:', sessionError);
          return reply.status(500).send({
            error: 'Erro ao agendar sessão',
          });
        }

        // Registrar em email_log
        await supabase.from('email_log').insert({
          cliente_id: clienteId,
          tipo: 'SESSION_SCHEDULED',
          timestamp: new Date().toISOString(),
          status: 'SUCCESS',
          details: {
            date: slotDate,
            time: slotTime,
            zoom_url: zoomLink,
          },
        });

        reply.send({
          success: true,
          session: {
            clienteId,
            scheduledAt,
            zoomLink,
            email,
          },
        });
      } catch (error) {
        fastify.log.error('Session scheduling error:', error);
        reply.status(500).send({
          error: 'Erro ao agendar sessão',
          details: error instanceof Error ? error.message : 'Unknown error',
        });
      }
    }
  );

  /**
   * POST /api/sessions/:sessionId/reschedule
   * Cliente reagenda (até 24h antes)
   */
  fastify.post<{ Params: { sessionId: string }; Body: RescheduleSessionBody }>(
    '/api/sessions/:sessionId/reschedule',
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { sessionId } = request.params as { sessionId: string };
        const { newSlotDate, newSlotTime } = request.body as RescheduleSessionBody;

        // Verificar se pode reagendar (24h antes)
        const { data: session, error: getError } = await supabase
          .from('sessoes')
          .select('scheduled_at')
          .eq('id', sessionId)
          .single();

        if (getError || !session) {
          return reply.status(404).send({ error: 'Sessão não encontrada' });
        }

        const scheduledTime = new Date(session.scheduled_at).getTime();
        const now = Date.now();
        const hoursUntil = (scheduledTime - now) / (1000 * 60 * 60);

        if (hoursUntil < 24) {
          return reply.status(403).send({
            error: 'Reagendamento deve ser feito com 24h de antecedência',
          });
        }

        // Atualizar sessão
        const newScheduledAt = new Date(`${newSlotDate}T${newSlotTime}:00`).toISOString();
        const { error: updateError } = await supabase
          .from('sessoes')
          .update({
            scheduled_at: newScheduledAt,
            updated_at: new Date().toISOString(),
          })
          .eq('id', sessionId);

        if (updateError) {
          return reply.status(500).send({
            error: 'Erro ao reagendar sessão',
          });
        }

        reply.send({
          success: true,
          newScheduledAt,
        });
      } catch (error) {
        fastify.log.error('Reschedule error:', error);
        reply.status(500).send({
          error: 'Erro ao reagendar',
        });
      }
    }
  );

  /**
   * GET /api/sessions/:clienteId
   * Retorna dados da sessão agendada
   */
  fastify.get<{ Params: { clienteId: string } }>(
    '/api/sessions/:clienteId',
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { clienteId } = request.params as { clienteId: string };

        const { data: session, error } = await supabase
          .from('sessoes')
          .select('*')
          .eq('cliente_id', clienteId)
          .order('created_at', { ascending: false })
          .limit(1)
          .single();

        if (error || !session) {
          return reply.status(404).send({
            error: 'Sessão não encontrada',
          });
        }

        reply.send({
          success: true,
          session,
        });
      } catch (error) {
        fastify.log.error('Get session error:', error);
        reply.status(500).send({
          error: 'Erro ao buscar sessão',
        });
      }
    }
  );
}
