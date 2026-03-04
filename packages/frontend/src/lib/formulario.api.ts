/**
 * API calls para o formulário de diagnóstico
 * Integra com backend Fastify para persistência
 */

export interface ProgressResponse {
  respostas: Record<number, number | string>;
  lastUpdated: string;
  totalAnswered: number;
}

/**
 * Salvar respostas no servidor com debounce
 */
export async function salvarRespostas(
  respostas: Record<number, number | string>,
): Promise<void> {
  try {
    const response = await fetch('/api/formularios/progresso', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        respostas,
        timestamp: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      throw new Error(`Erro ao salvar: ${response.statusText}`);
    }
  } catch (error) {
    console.error('Erro ao salvar respostas:', error);
    throw error;
  }
}

/**
 * Carregar progresso anterior (respostas salvas)
 */
export async function carregarProgresso(): Promise<ProgressResponse> {
  try {
    // Primeiro tenta carregar do localStorage (mais rápido)
    const stored = localStorage.getItem('formulario_respostas');
    if (stored) {
      return {
        respostas: JSON.parse(stored),
        lastUpdated: new Date().toISOString(),
        totalAnswered: Object.keys(JSON.parse(stored)).length,
      };
    }

    // Se não houver localStorage, tenta do servidor
    const response = await fetch('/api/formularios/progresso');
    if (!response.ok) {
      return { respostas: {}, lastUpdated: new Date().toISOString(), totalAnswered: 0 };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao carregar progresso:', error);
    return { respostas: {}, lastUpdated: new Date().toISOString(), totalAnswered: 0 };
  }
}

/**
 * Submeter formulário completo (calcula score na API)
 */
export async function submeterFormulario(
  respostas: Record<number, number | string>,
): Promise<{ success: boolean; clienteId: string; score: number }> {
  const response = await fetch('/api/formularios/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ respostas }),
  });

  if (!response.ok) {
    throw new Error('Erro ao submeter formulário');
  }

  return response.json();
}
