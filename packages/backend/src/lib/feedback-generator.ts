/**
 * Feedback Generator — Análise Check-in + Recomendações
 * Story 4.3 — Feedback Semanal 24h
 */

export interface CheckInRecord {
  week: number;
  indicador_value: number;
  bloqueadores: string;
  aprendizados: string;
  proxima_semana: string;
}

export interface FeedbackResult {
  validacao: string;
  padroes: string;
  recomendacao: string;
  proxima_semana_recap: string;
}

/**
 * Analisa check-in e gera feedback automático
 */
export function generateFeedback(
  currentCheckIn: CheckInRecord,
  previousCheckIns: CheckInRecord[],
  indicadorMeta7d: number
): FeedbackResult {
  // Validação: calcular progresso
  const prevValue = previousCheckIns[previousCheckIns.length - 1]?.indicador_value || 0;
  const change = currentCheckIn.indicador_value - prevValue;
  const percentChange = prevValue > 0 ? ((change / prevValue) * 100).toFixed(1) : '0';
  const validacao =
    change > 0
      ? `Você cresceu ${change} pontos essa semana (${percentChange}% de aumento). Continue assim! 🎯`
      : `Semana de consolidação. Você manteve ${currentCheckIn.indicador_value} pontos.`;

  // Padrões: procurar bloqueadores repetidos
  const allBloquedadores = previousCheckIns.slice(-4).map((c) => c.bloqueadores.toLowerCase());
  const bloqueadorAtual = currentCheckIn.bloqueadores.toLowerCase();
  const isRepetido = allBloquedadores.filter((b) => b.includes(bloqueadorAtual.split(' ')[0])).length >= 2;
  const padroes = isRepetido
    ? `Padrão detectado: "${currentCheckIn.bloqueadores}" apareceu 2+ vezes. Isso aponta para um problema estrutural.`
    : `Bloqueador essa semana: "${currentCheckIn.bloqueadores}". Vamos acompanhar próximas semanas.`;

  // Recomendação: baseada em bloqueador + aprendizado
  const recomendacao = `Baseado em "${currentCheckIn.bloqueadores}" e no que aprendeu ("${currentCheckIn.aprendizados}"),
sugiro focar em eliminar esse bloqueador de forma estruturada. Use a semana que vem para testar: ${currentCheckIn.aprendizados}`;

  // Próxima semana recap
  const proxima_semana_recap = `Semana ${currentCheckIn.week + 1}: Seu foco é "${currentCheckIn.proxima_semana}".
Nós recomendamos manter esse foco + tentar reduzir o bloqueador "${currentCheckIn.bloqueadores}". Meta indicador: ≥${indicadorMeta7d}.`;

  return { validacao, padroes, recomendacao, proxima_semana_recap };
}
