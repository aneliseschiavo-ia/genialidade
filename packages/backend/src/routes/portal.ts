/**
 * Rota do Portal — Acesso aos dados de diagnóstico
 * Story 1.6 — Portal Cliente
 */

import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { supabase } from '../lib/supabase';

interface GetDiagnosticParams {
  clientId: string;
}

export async function portalRoutes(fastify: FastifyInstance) {
  /**
   * GET /api/portal/diagnostic/:clientId
   * Retorna dados de diagnóstico do cliente (scores, verdade núcleo, hipótese, etc)
   * Protegido por RLS — cliente só vê seus dados
   */
  fastify.get<{ Params: GetDiagnosticParams }>(
    '/api/portal/diagnostic/:clientId',
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { clientId } = request.params as GetDiagnosticParams;

        if (!clientId) {
          return reply.status(400).send({
            error: 'clientId é obrigatório',
          });
        }

        // Buscar dados de decisão (scores + aprovação/rejeição)
        const { data: decision, error: decisionError } = await supabase
          .from('decisoes')
          .select('*')
          .eq('cliente_id', clientId)
          .order('calculado_em', { ascending: false })
          .limit(1)
          .single();

        if (decisionError || !decision) {
          return reply.status(404).send({
            error: 'Diagnóstico não encontrado',
          });
        }

        // Buscar informações do cliente
        const { data: cliente, error: clientError } = await supabase
          .from('clientes')
          .select('nome, email')
          .eq('id', clientId)
          .single();

        if (clientError) {
          fastify.log.warn('Cliente info not found:', clientError);
          // Continua mesmo se não encontrar cliente (use clientId como fallback)
        }

        // Buscar PDF (se disponível)
        const { data: pdfFiles } = await supabase.storage
          .from('diagnoses')
          .list('', {
            search: `diagnose_${clientId}_`,
          });

        let pdfUrl: string | undefined;
        if (pdfFiles && pdfFiles.length > 0) {
          const latestPDF = pdfFiles.sort(
            (a, b) =>
              new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime()
          )[0];
          const { data: urlData } = supabase.storage
            .from('diagnoses')
            .getPublicUrl(latestPDF.name);
          pdfUrl = urlData.publicUrl;
        }

        reply.send({
          clientId,
          clientName: cliente?.nome || 'Cliente',
          scores: {
            desalinhamento: decision.score_desalinhamento,
            ruido: decision.score_ruido,
            vazamento: decision.score_vazamento,
            maturidade: decision.score_maturidade,
            total: decision.score_total,
          },
          verdadeNucleo: decision.verdade_nucleo || 'Análise em andamento...',
          hipotese: decision.hipotese_preliminar || 'Hipótese será atualizada...',
          aprovado: decision.aprovado,
          sessionDate: decision.data_sessao || new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
          sessionTime: decision.hora_sessao || '14:00',
          sessionLink: decision.link_sessao,
          pdfUrl,
        });
      } catch (error) {
        fastify.log.error('Portal diagnostic error:', error);
        reply.status(500).send({
          error: 'Erro ao carregar diagnóstico',
          details: error instanceof Error ? error.message : 'Unknown error',
        });
      }
    }
  );
}
