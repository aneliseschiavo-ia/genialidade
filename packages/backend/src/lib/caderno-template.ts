/**
 * Template estrutura Caderno Inteligente
 * Story 3.2 — Caderno Inteligente
 */

export interface CadernoTemplate {
  id: string;
  clienteId: string;
  criado_em: string;
  expires_at: string;
  secoes: {
    verdade_nucleo: {
      titulo: string;
      conteudo: string;
      versoes: Array<{ data: string; conteudo: string; author: string }>;
    };
    premissa_corrigida: {
      antes: string;
      depois: string;
      versoes: Array<{ data: string; antes: string; depois: string }>;
    };
    cortes: Array<{
      titulo: string;
      o_que: string;
      por_que: string;
      impacto: string;
      timeline: string;
      responsavel: string;
      status: 'planejado' | 'em_progresso' | 'concluido';
    }>;
    decisoes: Array<{
      titulo: string;
      decisao: string;
      metrica: string;
      responsavel: string;
      timeline: string;
      checkpoint: string;
      status: 'planejado' | 'em_progresso' | 'concluido';
    }>;
    plano_7d: Array<{
      dia: number;
      o_que: string;
      quem: string;
      status: 'planejado' | 'em_progresso' | 'concluido';
      notas: string;
    }>;
    indicador: {
      nome: string;
      unidade: string;
      valor_inicial: number;
      valor_atual: number;
      meta_7d: number;
      meta_90d: number;
      frequencia_medicao: string;
      responsavel: string;
      historico: Array<{ data: string; valor: number }>;
    };
    checkin_template: {
      semana: number;
      data_preenchimento: string;
      o_que_funcionou: string;
      o_que_nao_funcionou: string;
      proximos_passos: string;
      indicador_valor: number;
      notas_gerais: string;
    };
  };
}

export function createCadernoTemplate(clienteId: string, verdadeNucleo: string): CadernoTemplate {
  const now = new Date();
  const expiresAt = new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000); // 90 dias

  return {
    id: `caderno_${clienteId}_${Date.now()}`,
    clienteId,
    criado_em: now.toISOString(),
    expires_at: expiresAt.toISOString(),
    secoes: {
      verdade_nucleo: {
        titulo: 'Sua Verdade Núcleo',
        conteudo: verdadeNucleo,
        versoes: [
          {
            data: now.toISOString(),
            conteudo: verdadeNucleo,
            author: 'system',
          },
        ],
      },
      premissa_corrigida: {
        antes: 'Hipótese Fase 1: [A ser preenchida durante sessão]',
        depois: 'Verdade Refinada: [A ser preenchida durante sessão]',
        versoes: [],
      },
      cortes: [
        {
          titulo: 'Corte 1',
          o_que: '[A ser preenchido]',
          por_que: '[A ser preenchido]',
          impacto: '[A ser preenchido]',
          timeline: '[A ser preenchido]',
          responsavel: '[A ser preenchido]',
          status: 'planejado',
        },
        {
          titulo: 'Corte 2',
          o_que: '[A ser preenchido]',
          por_que: '[A ser preenchido]',
          impacto: '[A ser preenchido]',
          timeline: '[A ser preenchido]',
          responsavel: '[A ser preenchido]',
          status: 'planejado',
        },
        {
          titulo: 'Corte 3',
          o_que: '[A ser preenchido]',
          por_que: '[A ser preenchido]',
          impacto: '[A ser preenchido]',
          timeline: '[A ser preenchido]',
          responsavel: '[A ser preenchido]',
          status: 'planejado',
        },
      ],
      decisoes: [
        {
          titulo: 'Decisão 1',
          decisao: '[A ser preenchido]',
          metrica: '[A ser preenchido]',
          responsavel: '[A ser preenchido]',
          timeline: '[A ser preenchido]',
          checkpoint: '[A ser preenchido]',
          status: 'planejado',
        },
        {
          titulo: 'Decisão 2',
          decisao: '[A ser preenchido]',
          metrica: '[A ser preenchido]',
          responsavel: '[A ser preenchido]',
          timeline: '[A ser preenchido]',
          checkpoint: '[A ser preenchido]',
          status: 'planejado',
        },
        {
          titulo: 'Decisão 3',
          decisao: '[A ser preenchido]',
          metrica: '[A ser preenchido]',
          responsavel: '[A ser preenchido]',
          timeline: '[A ser preenchido]',
          checkpoint: '[A ser preenchido]',
          status: 'planejado',
        },
      ],
      plano_7d: [
        { dia: 1, o_que: '[Dia 1]', quem: '[A ser preenchido]', status: 'planejado', notas: '' },
        { dia: 2, o_que: '[Dia 2]', quem: '[A ser preenchido]', status: 'planejado', notas: '' },
        { dia: 3, o_que: '[Dia 3]', quem: '[A ser preenchido]', status: 'planejado', notas: '' },
        { dia: 4, o_que: '[Dia 4]', quem: '[A ser preenchido]', status: 'planejado', notas: '' },
        { dia: 5, o_que: '[Dia 5]', quem: '[A ser preenchido]', status: 'planejado', notas: '' },
        { dia: 6, o_que: '[Dia 6]', quem: '[A ser preenchido]', status: 'planejado', notas: '' },
        { dia: 7, o_que: '[Checkpoint: Indicador Crítico]', quem: '[A ser preenchido]', status: 'planejado', notas: '' },
      ],
      indicador: {
        nome: '[Métrica a definir]',
        unidade: '[horas/R$/%/volume]',
        valor_inicial: 0,
        valor_atual: 0,
        meta_7d: 0,
        meta_90d: 0,
        frequencia_medicao: 'semanal',
        responsavel: '[A ser preenchido]',
        historico: [
          {
            data: now.toISOString(),
            valor: 0,
          },
        ],
      },
      checkin_template: {
        semana: 1,
        data_preenchimento: '',
        o_que_funcionou: '',
        o_que_nao_funcionou: '',
        proximos_passos: '',
        indicador_valor: 0,
        notas_gerais: '',
      },
    },
  };
}
