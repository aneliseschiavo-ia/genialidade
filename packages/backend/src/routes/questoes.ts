import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { supabase } from '../lib/supabase';

export async function questoesRoutes(fastify: FastifyInstance) {
  // GET /api/questoes - Retorna todas 28 questões
  fastify.get<{ Params: {} }>('/api/questoes', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const { data, error } = await supabase
        .from('questoes')
        .select('*')
        .order('numero', { ascending: true });

      if (error) {
        fastify.log.error({ error }, 'Erro ao buscar questões');
        return reply.status(500).send({
          error: 'Erro ao buscar questões',
          message: error.message,
        });
      }

      if (!data || data.length === 0) {
        return reply.status(404).send({
          error: 'Nenhuma questão encontrada',
        });
      }

      // Retorna array direto para compatibilidade com frontend
      return reply.send(data);
    } catch (err) {
      fastify.log.error({ err }, 'Erro interno ao buscar questões');
      return reply.status(500).send({
        error: 'Erro interno do servidor',
      });
    }
  });
}
