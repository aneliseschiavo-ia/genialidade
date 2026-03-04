/**
 * Job: Envia feedback semanal automático 24h após check-in
 * Story 4.3 — Feedback Semanal 24h
 * Triggered por: POST /api/check-ins (agrupa em job scheduler)
 */

import { supabase } from '../lib/supabase';
import { getEmailProvider } from '../lib/email-provider';
import { generateFeedback, CheckInRecord } from '../lib/feedback-generator';

export async function sendWeeklyFeedback(checkInId: string, clienteId: string): Promise<void> {
  try {
    // Buscar check-in atual
    const { data: currentCheckIn } = await supabase
      .from('check_ins')
      .select('*')
      .eq('id', checkInId)
      .single();

    if (!currentCheckIn) {
      console.error('Check-in not found:', checkInId);
      return;
    }

    // Buscar últimos 4 check-ins para análise de padrões
    const { data: previousCheckIns } = await supabase
      .from('check_ins')
      .select('*')
      .eq('cliente_id', clienteId)
      .lt('week', currentCheckIn.week)
      .order('week', { ascending: false })
      .limit(4);

    // Buscar meta do indicador
    const { data: decision } = await supabase
      .from('decisoes')
      .select('indicador')
      .eq('cliente_id', clienteId)
      .order('calculado_em', { ascending: false })
      .limit(1)
      .single();

    const indicadorMeta7d = decision?.indicador?.meta_7d || 0;

    // Transformar dados para feedback generator
    const checkInRecords: CheckInRecord[] = (previousCheckIns || []).map((ci) => ({
      week: ci.week,
      indicador_value: ci.indicador_value,
      bloqueadores: ci.bloqueadores,
      aprendizados: ci.aprendizados,
      proxima_semana: ci.proxima_semana,
    }));

    const currentRecord: CheckInRecord = {
      week: currentCheckIn.week,
      indicador_value: currentCheckIn.indicador_value,
      bloqueadores: currentCheckIn.bloqueadores,
      aprendizados: currentCheckIn.aprendizados,
      proxima_semana: currentCheckIn.proxima_semana,
    };

    // Gerar feedback
    const feedback = generateFeedback(currentRecord, checkInRecords, indicadorMeta7d);

    // Buscar cliente email
    const { data: cliente } = await supabase
      .from('clientes')
      .select('nome, email')
      .eq('id', clienteId)
      .single();

    if (!cliente) {
      console.error('Cliente not found:', clienteId);
      return;
    }

    // Preparar email
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; background: #f9f9f9; }
    .header { background: linear-gradient(135deg, #1B5E20 0%, #2E7D32 100%); color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
    .content { background: white; padding: 30px; }
    .section { margin: 20px 0; }
    .section-title { color: #1B5E20; font-weight: bold; font-size: 16px; margin-bottom: 10px; }
    .section-content { background: #f9f9f9; padding: 15px; border-radius: 6px; line-height: 1.6; }
    .pattern-box { background: #fff3cd; border-left: 4px solid #ff9800; padding: 15px; margin: 10px 0; }
    .cta { background: #1B5E20; color: white; padding: 15px 30px; text-align: center; border-radius: 6px; margin: 20px 0; }
    .cta a { color: white; text-decoration: none; font-weight: bold; }
    .footer { font-size: 12px; color: #666; text-align: center; padding: 20px; border-top: 1px solid #eee; margin-top: 20px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Seu Feedback Semanal 📊</h1>
      <p>Semana ${currentCheckIn.week} do seu acompanhamento</p>
    </div>
    <div class="content">
      <p>Olá ${cliente.nome},</p>
      <p>Aqui está o feedback automático baseado no seu check-in da semana ${currentCheckIn.week}:</p>

      <div class="section">
        <div class="section-title">✅ Validação do Progresso</div>
        <div class="section-content">${feedback.validacao}</div>
      </div>

      <div class="section">
        <div class="section-title">🔍 Padrões Detectados</div>
        <div class="section-content">${feedback.padroes}</div>
      </div>

      <div class="section">
        <div class="section-title">💡 Recomendação</div>
        <div class="section-content">${feedback.recomendacao}</div>
      </div>

      <div class="section">
        <div class="section-title">🎯 Seu Foco para Próxima Semana</div>
        <div class="section-content">${feedback.proxima_semana_recap}</div>
      </div>

      <div class="cta">
        <a href="https://genialidade.ai/portal/dashboard">Acessar seu Dashboard & Enviar próximo Check-in</a>
      </div>

      <p style="color: #666; font-size: 14px;">
        Dúvidas ou precisa de ajustes? Responda este email para entrar em contato com seu facilitador.
      </p>
    </div>
    <div class="footer">
      <p>© 2026 Genialidade. Todos os direitos reservados.</p>
      <p>Feedback automático gerado 24h após seu check-in semanal.</p>
    </div>
  </div>
</body>
</html>
    `;

    // Enviar email
    const provider = getEmailProvider();
    await provider.sendEmail({
      to: cliente.email,
      subject: `📊 Seu feedback da semana ${currentCheckIn.week} — Genialidade`,
      html: htmlContent,
    });

    // Log envio
    await supabase.from('email_log').insert({
      cliente_id: clienteId,
      tipo: 'WEEKLY_FEEDBACK',
      timestamp: new Date().toISOString(),
      status: 'SUCCESS',
      details: {
        check_in_week: currentCheckIn.week,
        feedback_generated: true,
      },
    });

    console.log(`✅ Weekly feedback email sent to ${cliente.email} for week ${currentCheckIn.week}`);
  } catch (error) {
    console.error('Send weekly feedback error:', error);
    throw error;
  }
}

/**
 * Executor de jobs agendados
 * Roda a cada hora em produção, busca jobs pendentes do tipo 'send_feedback'
 */
export async function executeScheduledFeedbackJobs(): Promise<void> {
  try {
    const now = new Date().toISOString();

    // Buscar jobs agendados que devem ser executados
    const { data: jobs } = await supabase
      .from('jobs')
      .select('*')
      .eq('tipo', 'send_feedback')
      .eq('status', 'pending')
      .lte('scheduled_for', now);

    if (!jobs || jobs.length === 0) {
      console.log('No pending feedback jobs');
      return;
    }

    for (const job of jobs) {
      try {
        await sendWeeklyFeedback(job.check_in_id, job.cliente_id);

        // Marcar job como concluído
        await supabase
          .from('jobs')
          .update({ status: 'completed', completed_at: now })
          .eq('id', job.id);
      } catch (error) {
        console.error(`Failed to execute feedback job ${job.id}:`, error);

        // Registrar erro
        await supabase
          .from('jobs')
          .update({ status: 'failed', error: String(error) })
          .eq('id', job.id);
      }
    }
  } catch (error) {
    console.error('Execute scheduled feedback jobs error:', error);
  }
}
