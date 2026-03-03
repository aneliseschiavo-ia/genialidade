import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { supabase } from '../lib/supabase';
import { calcularScore, Resposta } from '../lib/scoring';
import { gerarHipotese } from '../lib/hipotese';

interface RespostaSubmissao {
  cliente_id: string;
  questao_id: number;
  valor_resposta: string | number;
}

interface SubmitBody {
  cliente_id: string;
  respostas: RespostaSubmissao[];
}

export async function formulariosRoutes(fastify: FastifyInstance) {
  // POST /api/formularios/submit - Valida todas 28 respostas e calcula score
  fastify.post<{ Body: SubmitBody }>('/api/formularios/submit', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const { cliente_id, respostas } = request.body as SubmitBody;

      // Validação básica
      if (!cliente_id || !Array.isArray(respostas)) {
        return reply.status(400).send({
          error: 'cliente_id e respostas array são obrigatórios',
        });
      }

      // Deve ter exatamente 28 respostas
      if (respostas.length !== 28) {
        return reply.status(400).send({
          error: 'Formulário incompleto',
          message: `Esperado 28 respostas, recebido ${respostas.length}`,
          total_esperado: 28,
          total_recebido: respostas.length,
        });
      }

      // Busca todas as questões para validar
      const { data: questoes, error: questoesError } = await supabase
        .from('questoes')
        .select('*')
        .order('numero', { ascending: true });

      if (questoesError || !questoes || questoes.length !== 28) {
        fastify.log.error({ questoesError }, 'Erro ao buscar questões para validação');
        return reply.status(500).send({
          error: 'Erro ao validar formulário',
        });
      }

      // Validar cada resposta contra sua questão
      const errosValidacao: string[] = [];
      const questaoMap = new Map(questoes.map((q) => [q.id, q]));

      for (const resposta of respostas) {
        const questao = questaoMap.get(resposta.questao_id);
        if (!questao) {
          errosValidacao.push(`Questão ID ${resposta.questao_id} não encontrada`);
          continue;
        }

        // Validação tipo-específica
        if (questao.tipo === 'numero') {
          const num = Number(resposta.valor_resposta);
          if (isNaN(num)) {
            errosValidacao.push(`Q${questao.numero}: Deve ser um número`);
          }
        } else if (questao.tipo === 'texto_livre') {
          const texto = String(resposta.valor_resposta);
          if (questao.maxLength && texto.length > questao.maxLength) {
            errosValidacao.push(
              `Q${questao.numero}: Excede ${questao.maxLength} caracteres`
            );
          }
          if (texto.trim().length === 0) {
            errosValidacao.push(`Q${questao.numero}: Não pode ser vazia`);
          }
        } else if (questao.tipo === 'escala_1_5') {
          const escala = Number(resposta.valor_resposta);
          if (isNaN(escala) || escala < 1 || escala > 5 || !Number.isInteger(escala)) {
            errosValidacao.push(`Q${questao.numero}: Deve ser 1-5`);
          }
        }
      }

      // Se houver erros, retorna
      if (errosValidacao.length > 0) {
        return reply.status(400).send({
          error: 'Validação falhou',
          erros: errosValidacao,
        });
      }

      // Calcular score (Story 1.3 - Scoring Logic)
      // Mapear respostas para formato esperado pelo scoring
      const respostasFormatadas: Resposta[] = respostas.map((r) => {
        const questao = questaoMap.get(r.questao_id);
        return {
          questao_id: r.questao_id,
          numero: questao?.numero || 0,
          valor_resposta: Number(r.valor_resposta),
        };
      });

      const scoreCalculo = calcularScore(respostasFormatadas);
      const hipotese = gerarHipotese({
        desalinhamento_estrutural: scoreCalculo.desalinhamento_estrutural,
        ruido_decisao: scoreCalculo.ruido_decisao,
        vazamento_financeiro: scoreCalculo.vazamento_financeiro,
        maturidade_estrategica: scoreCalculo.maturidade_estrategica,
      });

      const scorePreliminaire = {
        desalinhamento_estrutural: scoreCalculo.desalinhamento_estrutural,
        ruido_decisao: scoreCalculo.ruido_decisao,
        vazamento_financeiro: scoreCalculo.vazamento_financeiro,
        maturidade_estrategica: scoreCalculo.maturidade_estrategica,
        total: scoreCalculo.total,
        aprovado: scoreCalculo.aprovado,
        hipotese_titulo: hipotese.titulo,
        hipotese_descricao: hipotese.hipotese,
        status: scoreCalculo.aprovado ? 'aprovado' : 'rejeitado',
      };

      // Salvar formulário completo
      const { data: formulario, error: formularioError } = await supabase
        .from('formularios')
        .insert({
          cliente_id,
          status: 'completo',
          score: scorePreliminaire,
          submitted_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (formularioError) {
        fastify.log.error({ formularioError }, 'Erro ao salvar formulário');
        return reply.status(500).send({
          error: 'Erro ao submeter formulário',
          message: formularioError.message,
        });
      }

      return reply.send({
        success: true,
        formulario_id: formulario.id,
        cliente_id,
        total_respostas: respostas.length,
        score_preliminar: scorePreliminaire,
        status: 'em_processamento',
        message: 'Formulário recebido. Score será calculado em breve.',
      });
    } catch (err) {
      fastify.log.error({ err }, 'Erro interno ao submeter formulário');
      return reply.status(500).send({
        error: 'Erro interno do servidor',
      });
    }
  });
}
