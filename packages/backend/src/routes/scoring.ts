import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { supabase } from '../lib/supabase';
import { calcularScore, Resposta } from '../lib/scoring';
import { gerarHipotese } from '../lib/hipotese';

interface CalcularScoreBody {
  cliente_id: string;
  respostas: Array<{
    questao_id: number;
    numero: number;
    valor_resposta: number;
  }>;
}

export async function scoringRoutes(fastify: FastifyInstance) {
  /**
   * POST /api/scoring
   * Calcula score 4D completo a partir de respostas
   * Retorna: dimensões, total, hipótese preliminar, decisão aprovação/rejeição
   */
  fastify.post<{ Body: CalcularScoreBody }>(
    '/api/scoring',
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { cliente_id, respostas } = request.body as CalcularScoreBody;

        if (!cliente_id || !Array.isArray(respostas)) {
          return reply.status(400).send({
            error: 'cliente_id e respostas array são obrigatórios',
          });
        }

        // Validar que temos respostas das dimensões críticas
        const q1_5 = respostas.filter((r) => r.numero >= 1 && r.numero <= 5);
        const q6_10 = respostas.filter((r) => r.numero >= 6 && r.numero <= 10);
        const q16_20 = respostas.filter((r) => r.numero >= 16 && r.numero <= 20);
        const q26_28 = respostas.filter((r) => r.numero >= 26 && r.numero <= 28);

        if (q1_5.length === 0 || q6_10.length === 0 || q16_20.length === 0 || q26_28.length === 0) {
          return reply.status(400).send({
            error: 'Respostas incompletas para as 4 dimensões',
            message: `Esperado: 5 Q1-5, 5 Q6-10, 5 Q16-20, 3 Q26-28. Recebido: ${q1_5.length}, ${q6_10.length}, ${q16_20.length}, ${q26_28.length}`,
          });
        }

        // Calcular score
        const resultado = calcularScore(respostas as Resposta[]);

        // Gerar hipótese preliminar
        const hipotese = gerarHipotese({
          desalinhamento_estrutural: resultado.desalinhamento_estrutural,
          ruido_decisao: resultado.ruido_decisao,
          vazamento_financeiro: resultado.vazamento_financeiro,
          maturidade_estrategica: resultado.maturidade_estrategica,
        });

        // Preparar resposta
        const scoreResponse = {
          cliente_id,
          dimensoes: {
            desalinhamento_estrutural: resultado.desalinhamento_estrutural,
            ruido_decisao: resultado.ruido_decisao,
            vazamento_financeiro: resultado.vazamento_financeiro,
            maturidade_estrategica: resultado.maturidade_estrategica,
          },
          score_total: resultado.total,
          aprovado: resultado.aprovado,
          hipotese_preliminar: {
            titulo: hipotese.titulo,
            descricao: hipotese.hipotese,
            focos_imediatos: hipotese.focos_imediatos,
          },
          feedback: resultado.aprovado
            ? {
                tipo: 'aprovacao',
                mensagem: `Parabéns! Sua organização qualifica para o diagnóstico aprofundado. Score: ${resultado.total}/20. Entraremos em contato nos próximos dias.`,
              }
            : {
                tipo: 'rejeicao',
                mensagem: `Obrigado pelo interesse. Identificamos que ${resultado.motivoRejeicao}. Sugerimos reconectar em 3-6 meses após trabalhar esses pontos.`,
                motivo_detalhado: resultado.motivoRejeicao,
              },
          timestamp: new Date().toISOString(),
        };

        // Persistir em banco (tabela decisoes)
        const { error: persistError } = await supabase.from('decisoes').insert({
          cliente_id,
          score_total: resultado.total,
          desalinhamento_estrutural: resultado.desalinhamento_estrutural,
          ruido_decisao: resultado.ruido_decisao,
          vazamento_financeiro: resultado.vazamento_financeiro,
          maturidade_estrategica: resultado.maturidade_estrategica,
          aprovado: resultado.aprovado,
          hipotese_titulo: hipotese.titulo,
          hipotese_descricao: hipotese.hipotese,
          hipotese_focos: hipotese.focos_imediatos,
          calculado_em: new Date().toISOString(),
        });

        if (persistError) {
          fastify.log.error({ persistError }, 'Erro ao persistir score em banco');
          // Não falha a resposta, apenas registra o erro
        }

        return reply.send(scoreResponse);
      } catch (err) {
        fastify.log.error({ err }, 'Erro ao calcular score');
        return reply.status(500).send({
          error: 'Erro ao calcular score',
          message: process.env.NODE_ENV === 'development' ? (err as Error).message : undefined,
        });
      }
    }
  );

  /**
   * GET /api/scoring/:cliente_id
   * Busca score já calculado para um cliente
   */
  fastify.get<{ Params: { cliente_id: string } }>(
    '/api/scoring/:cliente_id',
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { cliente_id } = request.params as { cliente_id: string };

        const { data, error } = await supabase
          .from('decisoes')
          .select('*')
          .eq('cliente_id', cliente_id)
          .order('calculado_em', { ascending: false })
          .limit(1)
          .single();

        if (error || !data) {
          return reply.status(404).send({
            error: 'Score não encontrado para este cliente',
          });
        }

        const scorData = data as any;
        return reply.send({
          cliente_id,
          score_total: scorData.score_total,
          dimensoes: {
            desalinhamento_estrutural: scorData.desalinhamento_estrutural,
            ruido_decisao: scorData.ruido_decisao,
            vazamento_financeiro: scorData.vazamento_financeiro,
            maturidade_estrategica: scorData.maturidade_estrategica,
          },
          aprovado: scorData.aprovado,
          hipotese_preliminar: {
            titulo: scorData.hipotese_titulo,
            descricao: scorData.hipotese_descricao,
            focos_imediatos: scorData.hipotese_focos,
          },
          calculado_em: scorData.calculado_em,
        });
      } catch (err) {
        fastify.log.error({ err }, 'Erro ao buscar score');
        return reply.status(500).send({
          error: 'Erro ao buscar score',
        });
      }
    }
  );
}
