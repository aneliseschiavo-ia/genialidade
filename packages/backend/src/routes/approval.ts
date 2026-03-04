/**
 * Rota de Aprovação/Rejeição
 * Story 2.1 — Lógica Aprovação/Rejeição + Gestão de Status
 */

import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { supabase } from '../lib/supabase';
import { evaluateApproval, getApprovalActions } from '../lib/approval-logic';

interface DecideClientBody {
  clienteId: string;
  scoreTotal: number;
  scoreMaturidade: number;
}

interface AdminOverrideBody {
  clienteId: string;
  forceAprovado: boolean;
  motivo?: string;
}

export async function approvalRoutes(fastify: FastifyInstance) {
  /**
   * POST /api/clients/:clienteId/decide
   * Processa lógica de aprovação/rejeição automaticamente
   */
  fastify.post<{ Params: { clienteId: string }; Body: { scoreTotal: number; scoreMaturidade: number } }>(
    '/api/clients/:clienteId/decide',
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { clienteId } = request.params as { clienteId: string };
        const { scoreTotal, scoreMaturidade } = request.body as { scoreTotal: number; scoreMaturidade: number };

        if (!clienteId || scoreTotal === undefined || scoreMaturidade === undefined) {
          return reply.status(400).send({
            error: 'clienteId, scoreTotal e scoreMaturidade são obrigatórios',
          });
        }

        // Avaliar aprovação
        const decision = evaluateApproval({
          scoreTotal,
          scoreMaturidade,
          clienteId,
        });

        // Atualizar status cliente
        const { error: updateError } = await supabase
          .from('clientes')
          .update({
            status: decision.aprovado ? 'aprovado' : 'rejeitado',
            approved_at: decision.timestamp.toISOString(),
          })
          .eq('id', clienteId);

        if (updateError) {
          fastify.log.error({ error: updateError }, 'Update client status error');
          return reply.status(500).send({
            error: 'Erro ao atualizar status cliente',
          });
        }

        // Registrar em tabela decisões
        const { error: decisionError } = await supabase.from('decisoes').insert({
          cliente_id: clienteId,
          aprovado: decision.aprovado,
          score_total: decision.scoreTotal,
          score_maturidade: decision.scoreMaturidade,
          motivo: decision.motivo,
          reviewer: 'system',
          calculado_em: decision.timestamp.toISOString(),
        });

        if (decisionError) {
          fastify.log.error({ error: decisionError }, 'Insert decision error');
          return reply.status(500).send({
            error: 'Erro ao registrar decisão',
          });
        }

        // Determinar ações
        const actions = getApprovalActions(decision);

        // Se aprovado: criar sessão
        if (actions.createSession) {
          const { error: sessionError } = await supabase.from('sessoes').insert({
            cliente_id: clienteId,
            status: 'agendamento_pendente',
            created_at: new Date().toISOString(),
          });

          if (sessionError) {
            fastify.log.warn({ error: sessionError }, 'Create session error');
            // Não bloqueia se falhar (será criado durante agendamento Story 2.2)
          }
        }

        // Se rejeitado: agendar reminder 30 dias
        if (actions.set30DayReminder) {
          const reminderDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
          try {
            await supabase.from('reminders').insert({
              cliente_id: clienteId,
              tipo: 'reconnect_rejection',
              scheduled_for: reminderDate.toISOString(),
              status: 'pending',
            });
          } catch (err) {
            fastify.log.warn({ error: err }, 'Create reminder error');
          }
        }

        reply.send({
          success: true,
          decision: {
            aprovado: decision.aprovado,
            motivo: decision.motivo,
          },
          actions,
        });
      } catch (error) {
        fastify.log.error({ error }, 'Approval decision error');
        reply.status(500).send({
          error: 'Erro ao processar decisão de aprovação',
          details: error instanceof Error ? error.message : 'Unknown error',
        });
      }
    }
  );

  /**
   * POST /api/clients/:clienteId/approve-force
   * Admin override: força aprovação mesmo se score <12
   * Requer auth admin
   */
  fastify.post<{ Params: { clienteId: string }; Body: AdminOverrideBody }>(
    '/api/clients/:clienteId/approve-force',
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { clienteId } = request.params as { clienteId: string };
        const { forceAprovado, motivo = 'Admin override' } = request.body as AdminOverrideBody;

        // TODO: Validar que user é admin
        // const adminId = request.user?.id;
        // if (!adminId) return reply.status(401).send({ error: 'Unauthorized' });

        // Atualizar status cliente
        const { error: updateError } = await supabase
          .from('clientes')
          .update({
            status: forceAprovado ? 'aprovado' : 'rejeitado',
            approved_at: new Date().toISOString(),
          })
          .eq('id', clienteId);

        if (updateError) {
          return reply.status(500).send({
            error: 'Erro ao atualizar status cliente',
          });
        }

        // Registrar override com auditoria
        const { error: auditError } = await supabase.from('decisoes').insert({
          cliente_id: clienteId,
          aprovado: forceAprovado,
          motivo: `ADMIN OVERRIDE: ${motivo}`,
          reviewer: 'admin', // TODO: usar user.id actual
          calculado_em: new Date().toISOString(),
        });

        if (auditError) {
          fastify.log.error({ error: auditError }, 'Audit log error');
          // Continua mesmo se falhar (override já foi feito)
        }

        // Se forçou aprovação: criar sessão
        if (forceAprovado) {
          await supabase.from('sessoes').insert({
            cliente_id: clienteId,
            status: 'agendamento_pendente',
            created_at: new Date().toISOString(),
          });
        }

        reply.send({
          success: true,
          message: `Cliente ${forceAprovado ? 'aprovado' : 'rejeitado'} manualmente`,
          motivo,
        });
      } catch (error) {
        fastify.log.error({ error }, 'Admin override error');
        reply.status(500).send({
          error: 'Erro ao aplicar override',
        });
      }
    }
  );
}
