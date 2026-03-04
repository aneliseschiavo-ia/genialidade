/**
 * Types for Formulário Diagnóstico
 * Story 1.2: Formulário Web 28 Questões
 */

export interface Questao {
  id: number;
  numero: number; // 1-28
  dimensao: string; // ESTRUTURA, PRIORIDADE, COERÊNCIA, FINANCEIRO, PADRÃO, MATURIDADE
  texto: string;
  tipo: 'escala_1_5' | 'texto_livre' | 'numero' | 'multipla_escolha';
  placeholder?: string; // Exemplo: "Ex: R$ 50.000/mês"
  helperText?: string; // Dica de como preencher
  maxLength?: number; // Limite de caracteres para texto livre
  inputType?: 'text' | 'number' | 'textarea'; // Para texto_livre
}

export interface Resposta {
  id?: number;
  cliente_id: string;
  questao_id: number;
  valor_resposta: number; // 1-5 para escala
  data?: string;
}

export interface PrognosticoFormulario {
  cliente_id: string;
  respostas_completas: number; // 0-28
  respostas: Resposta[];
  data_inicio?: string;
  data_ultima_atualizacao?: string;
}

export interface ProgressoFormulario {
  total_questoes: number; // 28
  questoes_preenchidas: number; // 0-28
  percentual: number; // 0-100
  pode_enviar: boolean; // true se 28/28
}

export interface FormularioBlocos {
  bloco1: Questao[]; // Q1-5: ESTRUTURA
  bloco2: Questao[]; // Q6-10: PRIORIDADE
  bloco3: Questao[]; // Q11-15: COERÊNCIA
  bloco4: Questao[]; // Q16-20: FINANCEIRO
  bloco5: Questao[]; // Q21-25: PADRÃO
  bloco6: Questao[]; // Q26-28: MATURIDADE
}
