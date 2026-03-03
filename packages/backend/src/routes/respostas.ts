import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { supabase } from '../lib/supabase';

interface Resposta {
  cliente_id: string;
  questao_id: number;
  valor_resposta: string | number;
}

interface GetRespostasQuery {
  cliente_id: string;
}

export async function respostasRoutes(fastify: FastifyInstance) {
  // POST /api/respostas - Salva uma resposta individual
  fastify.post<{ Body: Resposta }>('/api/respostas', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const { cliente_id, questao_id, valor_resposta } = request.body as Resposta;

      // Validação básica
      if (!cliente_id || !questao_id || valor_resposta === null || valor_resposta === undefined) {
        return reply.status(400).send({
          error: 'cliente_id, questao_id e valor_resposta são obrigatórios',
        });
      }

      // Carrega a questão para validar o tipo
      const { data: questao, error: questaoError } = await supabase
        .from('questoes')
        .select('tipo, maxLength')
        .eq('id', questao_id)
        .single();

      if (questaoError || !questao) {
        return reply.status(404).send({
          error: 'Questão não encontrada',
        });
      }

      // Validação tipo-específica
      let validationError = null;

      if (questao.tipo === 'numero') {
        const num = Number(valor_resposta);
        if (isNaN(num)) {
          validationError = 'Resposta deve ser um número válido';
        }
      } else if (questao.tipo === 'texto_livre') {
        const texto = String(valor_resposta);
        if (questao.maxLength && texto.length > questao.maxLength) {
          validationError = `Resposta excede o limite de ${questao.maxLength} caracteres`;
        }
        if (texto.trim().length === 0) {
          validationError = 'Resposta não pode ser vazia';
        }
      } else if (questao.tipo === 'escala_1_5') {
        const escala = Number(valor_resposta);
        if (isNaN(escala) || escala < 1 || escala > 5 || !Number.isInteger(escala)) {
          validationError = 'Resposta deve ser um número inteiro entre 1 e 5';
        }
      }

      if (validationError) {
        return reply.status(400).send({
          error: 'Validação falhou',
          message: validationError,
        });
      }

      // Upsert (insert ou update)
      const { data, error } = await supabase
        .from('respostas')
        .upsert(
          {
            cliente_id,
            questao_id,
            valor_resposta: String(valor_resposta),
            updated_at: new Date().toISOString(),
          },
          { onConflict: 'cliente_id,questao_id' }
        )
        .select();

      if (error) {
        fastify.log.error({ error }, 'Erro ao salvar resposta');
        return reply.status(500).send({
          error: 'Erro ao salvar resposta',
          message: error.message,
        });
      }

      return reply.send({
        success: true,
        resposta: data[0],
      });
    } catch (err) {
      fastify.log.error({ err }, 'Erro interno ao salvar resposta');
      return reply.status(500).send({
        error: 'Erro interno do servidor',
      });
    }
  });

  // GET /api/respostas?cliente_id=X - Carrega respostas do cliente
  fastify.get<{ Querystring: GetRespostasQuery }>(
    '/api/respostas',
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { cliente_id } = request.query as GetRespostasQuery;

        if (!cliente_id) {
          return reply.status(400).send({
            error: 'cliente_id é obrigatório',
          });
        }

        const { data, error } = await supabase
          .from('respostas')
          .select('*')
          .eq('cliente_id', cliente_id)
          .order('questao_id', { ascending: true });

        if (error) {
          fastify.log.error({ error }, 'Erro ao buscar respostas');
          return reply.status(500).send({
            error: 'Erro ao buscar respostas',
            message: error.message,
          });
        }

        // Retorna array direto para compatibilidade com frontend
        return reply.send(data || []);
      } catch (err) {
        fastify.log.error({ err }, 'Erro interno ao buscar respostas');
        return reply.status(500).send({
          error: 'Erro interno do servidor',
        });
      }
    }
  );
}
