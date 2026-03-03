/**
 * Formulário API Functions
 * Handles autosave, loading questions, and form persistence
 * Story 1.2: Formulário Web 28 Questões
 */

import { Questao, Resposta, ProgressoFormulario } from '@/types/formulario';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3007';

/**
 * Load all 28 questions from database (Story 1.1)
 */
export async function carregarQuestoes(): Promise<Questao[]> {
  try {
    const response = await fetch(`${API_BASE}/api/questoes`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error(`Failed to load questions: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error loading questions:', error);
    throw error;
  }
}

/**
 * Load existing responses for a client
 */
export async function carregarRespostasExistentes(clienteId: string): Promise<Resposta[]> {
  try {
    const response = await fetch(`${API_BASE}/api/respostas?cliente_id=${clienteId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error(`Failed to load responses: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error loading responses:', error);
    return [];
  }
}

/**
 * Autosave response (debounced)
 * POST /api/respostas with single answer
 */
export async function salvarResposta(resposta: Resposta): Promise<Resposta> {
  try {
    const response = await fetch(`${API_BASE}/api/respostas`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(resposta),
    });

    if (!response.ok) {
      throw new Error(`Failed to save response: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error saving response:', error);
    throw error;
  }
}

/**
 * Calculate progress (X de 28 preenchidas)
 */
export function calcularProgresso(respostas: Resposta[], totalQuestoes: number = 28): ProgressoFormulario {
  const questoesPreenchidas = new Set(respostas.map((r) => r.questao_id)).size;
  const percentual = Math.round((questoesPreenchidas / totalQuestoes) * 100);

  return {
    total_questoes: totalQuestoes,
    questoes_preenchidas: questoesPreenchidas,
    percentual,
    pode_enviar: questoesPreenchidas === totalQuestoes,
  };
}

/**
 * Submit all responses (final CTA)
 * POST /api/formularios/submit
 */
export async function enviarRespostas(clienteId: string, respostas: Resposta[]): Promise<any> {
  try {
    const response = await fetch(`${API_BASE}/api/formularios/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        cliente_id: clienteId,
        respostas,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to submit responses: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error submitting responses:', error);
    throw error;
  }
}

/**
 * Get or create a session (localStorage key)
 */
export function obterOuCriarSessao(): string {
  const sessionKey = 'genialidade_formulario_session';
  let clienteId = localStorage.getItem(sessionKey);

  if (!clienteId) {
    clienteId = `cliente_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem(sessionKey, clienteId);
  }

  return clienteId;
}

/**
 * Debounced autosave (300ms delay)
 * Prevents excessive API calls
 */
export function criarFuncaoAutosaveComDebounce(
  funcaoSalvar: (resposta: Resposta) => Promise<Resposta>,
  delayMs: number = 300
) {
  let timeoutId: NodeJS.Timeout;

  return (resposta: Resposta) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      funcaoSalvar(resposta).catch((error) => {
        console.error('Autosave failed:', error);
        // Retry once after 1 second
        setTimeout(() => funcaoSalvar(resposta), 1000);
      });
    }, delayMs);
  };
}
