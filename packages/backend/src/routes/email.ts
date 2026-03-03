/**
 * Rota de Email — Envio de score + hipótese preliminar
 * Story 1.4 — Email Automático
 */

import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { supabase } from '../lib/supabase';
import { getEmailProvider } from '../lib/email-provider';
import { renderAprovacaoTemplate, renderRejeicaoTemplate } from '../lib/email-templates';
import crypto from 'crypto';

interface SendScoreEmailBody {
  cliente_id: string;
  email_cliente: string;
  nome_cliente: string;
}

export async function emailRoutes(fastify: FastifyInstance) {
  /**
   * POST /api/email/send-score
   * Envia email com score + hipótese preliminar
   * Chamado pelo job scheduler ou manualmente para teste
   */
  fastify.post<{ Body: SendScoreEmailBody }>(
    '/api/email/send-score',
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { cliente_id, email_cliente, nome_cliente } = request.body as SendScoreEmailBody;

        if (!cliente_id || !email_cliente || !nome_cliente) {
          return reply.status(400).send({
            error: 'cliente_id, email_cliente e nome_cliente são obrigatórios',
          });
        }

        const provider = getEmailProvider();
        if (!provider.isValidEmail(email_cliente)) {
          return reply.status(400).send({
            error: 'Email inválido',
          });
        }

        // Buscar score mais recente do cliente
        const { data: decision, error: decisonError } = await supabase
          .from('decisoes')
          .select('*')
          .eq('cliente_id', cliente_id)
          .order('calculado_em', { ascending: false })
          .limit(1)
          .single();

        if (decisonError || !decision) {
          fastify.log.error({ decisonError }, `Score não encontrado para cliente ${cliente_id}`);
          return reply.status(404).send({
            error: 'Score não encontrado para este cliente',
          });
        }

        // Gerar unsubscribe token
        const unsubscribeToken = crypto
          .createHash('sha256')
          .update(`${cliente_id}-${Date.now()}`)
          .digest('hex');

        // Renderizar template
        const templateContext = {
          nome_cliente,
          email_cliente,
          score_total: decision.score_total,
          desalinhamento_estrutural: decision.desalinhamento_estrutural,
          ruido_decisao: decision.ruido_decisao,
          vazamento_financeiro: decision.vazamento_financeiro,
          maturidade_estrategica: decision.maturidade_estrategica,
          hipotese_titulo: decision.hipotese_titulo,
          hipotese_descricao: decision.hipotese_descricao,
          hipotese_focos: decision.hipotese_focos || [],
          aprovado: decision.aprovado,
          unsubscribe_token: unsubscribeToken,
        };

        const htmlContent = decision.aprovado
          ? renderAprovacaoTemplate(templateContext)
          : renderRejeicaoTemplate(templateContext);

        const subject = decision.aprovado
          ? '✨ Seu diagnóstico saiu! — Parabéns, você foi selecionado'
          : '📋 Status do seu diagnóstico — Próximos passos';

        // Enviar email
        const result = await provider.send({
          to: email_cliente,
          subject,
          html: htmlContent,
          replyTo: 'contato@genialidade.ai',
        });

        // Registrar em email_log
        const { error: logError } = await supabase.from('email_log').insert({
          cliente_id,
          email: email_cliente,
          tipo: decision.aprovado ? 'score_aprovado' : 'score_rejeitado',
          assunto: subject,
          status: result.success ? 'enviado' : 'falhou',
          mensagem_id: result.messageId,
          erro_mensagem: result.error,
          enviado_em: new Date().toISOString(),
          tentativas: 1,
        });

        if (logError) {
          fastify.log.error({ logError }, 'Erro ao registrar email em email_log');
        }

        if (!result.success) {
          return reply.status(500).send({
            error: 'Falha ao enviar email',
            message: result.error,
          });
        }

        return reply.send({
          success: true,
          message: 'Email enviado com sucesso',
          messageId: result.messageId,
          cliente_id,
          email: email_cliente,
          tipo: decision.aprovado ? 'aprovado' : 'rejeitado',
          timestamp: new Date().toISOString(),
        });
      } catch (err) {
        fastify.log.error({ err }, 'Erro ao enviar score email');
        return reply.status(500).send({
          error: 'Erro ao enviar email',
          message: process.env.NODE_ENV === 'development' ? (err as Error).message : undefined,
        });
      }
    }
  );

  /**
   * GET /api/email/log/:cliente_id
   * Retorna histórico de emails enviados para um cliente
   */
  fastify.get<{ Params: { cliente_id: string } }>(
    '/api/email/log/:cliente_id',
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { cliente_id } = request.params as { cliente_id: string };

        const { data: logs, error } = await supabase
          .from('email_log')
          .select('*')
          .eq('cliente_id', cliente_id)
          .order('enviado_em', { ascending: false })
          .limit(10);

        if (error) {
          return reply.status(500).send({
            error: 'Erro ao buscar histórico de emails',
          });
        }

        return reply.send({
          cliente_id,
          total: logs?.length || 0,
          logs: logs || [],
        });
      } catch (err) {
        fastify.log.error({ err }, 'Erro ao buscar email log');
        return reply.status(500).send({
          error: 'Erro ao buscar histórico de emails',
        });
      }
    }
  );

  /**
   * POST /api/email/retry/:email_log_id
   * Retenta envio de um email que falhou
   */
  fastify.post<{ Params: { email_log_id: string } }>(
    '/api/email/retry/:email_log_id',
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { email_log_id } = request.params as { email_log_id: string };

        // Buscar registro do email_log
        const { data: emailLog, error: logError } = await supabase
          .from('email_log')
          .select('*')
          .eq('id', email_log_id)
          .single();

        if (logError || !emailLog) {
          return reply.status(404).send({
            error: 'Email log não encontrado',
          });
        }

        // Max 3 tentativas
        if ((emailLog.tentativas || 0) >= 3) {
          return reply.status(400).send({
            error: 'Número máximo de tentativas atingido (3)',
          });
        }

        // Buscar cliente e dados necessários
        const { data: decision } = await supabase
          .from('decisoes')
          .select('*')
          .eq('cliente_id', emailLog.cliente_id)
          .order('calculado_em', { ascending: false })
          .limit(1)
          .single();

        if (!decision) {
          return reply.status(404).send({
            error: 'Score do cliente não encontrado',
          });
        }

        // Reenviar email
        const provider = getEmailProvider();
        const templateContext = {
          nome_cliente: emailLog.cliente_id, // Fallback
          email_cliente: emailLog.email,
          score_total: decision.score_total,
          desalinhamento_estrutural: decision.desalinhamento_estrutural,
          ruido_decisao: decision.ruido_decisao,
          vazamento_financeiro: decision.vazamento_financeiro,
          maturidade_estrategica: decision.maturidade_estrategica,
          hipotese_titulo: decision.hipotese_titulo,
          hipotese_descricao: decision.hipotese_descricao,
          hipotese_focos: decision.hipotese_focos || [],
          aprovado: decision.aprovado,
          unsubscribe_token: crypto
            .createHash('sha256')
            .update(`${emailLog.cliente_id}-${Date.now()}`)
            .digest('hex'),
        };

        const htmlContent = decision.aprovado
          ? renderAprovacaoTemplate(templateContext)
          : renderRejeicaoTemplate(templateContext);

        const result = await provider.send({
          to: emailLog.email,
          subject: emailLog.assunto,
          html: htmlContent,
        });

        // Atualizar tentativas
        const { error: updateError } = await supabase
          .from('email_log')
          .update({
            tentativas: (emailLog.tentativas || 1) + 1,
            status: result.success ? 'enviado' : 'falhou',
            mensagem_id: result.messageId,
            erro_mensagem: result.error,
          })
          .eq('id', email_log_id);

        if (updateError) {
          fastify.log.error({ updateError }, 'Erro ao atualizar email log');
        }

        return reply.send({
          success: result.success,
          message: result.success ? 'Email reenviado com sucesso' : 'Falha ao reenviar email',
          tentativa: (emailLog.tentativas || 1) + 1,
          erro: result.error,
        });
      } catch (err) {
        fastify.log.error({ err }, 'Erro ao fazer retry de email');
        return reply.status(500).send({
          error: 'Erro ao fazer retry de email',
        });
      }
    }
  );
}
