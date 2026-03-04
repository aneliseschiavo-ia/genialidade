/**
 * Job: Envia reminder de check-in toda segunda-feira
 * Story 4.2 — Check-in Semanal (reminder automático)
 */

import { supabase } from '../lib/supabase';
import { getEmailProvider } from '../lib/email-provider';

export async function sendWeeklyCheckInReminder(clienteId: string, week: number): Promise<void> {
  try {
    // Buscar cliente
    const { data: cliente } = await supabase
      .from('clientes')
      .select('nome, email, status')
      .eq('id', clienteId)
      .single();

    if (!cliente || cliente.status !== 'em_acompanhamento') {
      console.log('Cliente não está em acompanhamento:', clienteId);
      return;
    }

    // Verificar se já fez check-in essa semana
    const { data: existingCheckIn } = await supabase
      .from('check_ins')
      .select('id')
      .eq('cliente_id', clienteId)
      .eq('week', week)
      .limit(1)
      .single();

    if (existingCheckIn) {
      console.log(`Check-in already submitted for week ${week}`);
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
    .reminder-box { background: #e8f5e9; border-left: 4px solid #1B5E20; padding: 15px; margin: 20px 0; }
    .cta { background: #1B5E20; color: white; padding: 15px 30px; text-align: center; border-radius: 6px; margin: 20px 0; }
    .cta a { color: white; text-decoration: none; font-weight: bold; }
    .footer { font-size: 12px; color: #666; text-align: center; padding: 20px; border-top: 1px solid #eee; margin-top: 20px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>⏰ Hora do Check-in Semanal!</h1>
      <p>Semana ${week} — Acompanhamento 90D</p>
    </div>
    <div class="content">
      <p>Olá ${cliente.nome},</p>
      <p>Esperamos que tenha tido uma ótima semana! 🚀</p>

      <div class="reminder-box">
        <h3>Não se esqueça de enviar seu check-in da semana ${week}</h3>
        <p>Leva apenas 3 minutos! Responda as 5 questões simples sobre:</p>
        <ul>
          <li>Seu indicador crítico</li>
          <li>Ações executadas</li>
          <li>Bloqueadores encontrados</li>
          <li>Um aprendizado importante</li>
          <li>Seu foco para próxima semana</li>
        </ul>
      </div>

      <p>Após enviar, você receberá um feedback automático em 24h com análise personalizada do seu progresso.</p>

      <div class="cta">
        <a href="https://genialidade.ai/portal/check-in?week=${week}">Enviar Check-in da Semana ${week}</a>
      </div>

      <p style="color: #666; font-size: 14px;">
        Dúvidas? Responda este email ou acesse seu portal para mais informações.
      </p>
    </div>
    <div class="footer">
      <p>© 2026 Genialidade. Todos os direitos reservados.</p>
      <p>Este é um reminder automático enviado toda segunda-feira.</p>
    </div>
  </div>
</body>
</html>
    `;

    // Enviar email
    const provider = getEmailProvider();
    await provider.sendEmail({
      to: cliente.email,
      subject: `⏰ Hora do check-in semanal! Semana ${week} — Genialidade`,
      html: htmlContent,
    });

    // Log envio
    await supabase.from('email_log').insert({
      cliente_id: clienteId,
      tipo: 'WEEKLY_REMINDER',
      timestamp: new Date().toISOString(),
      status: 'SUCCESS',
      details: {
        week,
        reminder_sent: true,
      },
    });

    console.log(`✅ Weekly reminder email sent to ${cliente.email} for week ${week}`);
  } catch (error) {
    console.error('Send weekly reminder error:', error);
    throw error;
  }
}

/**
 * Executor de jobs agendados
 * Roda toda segunda-feira às 09:00 AM
 */
export async function executeScheduledReminderJobs(): Promise<void> {
  try {
    // Buscar todos os clientes em acompanhamento
    const { data: clientes } = await supabase
      .from('clientes')
      .select('id, created_at, status')
      .eq('status', 'em_acompanhamento');

    if (!clientes || clientes.length === 0) {
      console.log('No active clients for reminders');
      return;
    }

    // Calcular semana corrente (dia 1 = dia que foi aprovado)
    for (const cliente of clientes) {
      try {
        const createdDate = new Date(cliente.created_at);
        const daysSinceStart = Math.floor((Date.now() - createdDate.getTime()) / (24 * 60 * 60 * 1000));
        const currentWeek = Math.floor(daysSinceStart / 7) + 1;

        // Enviar reminder só se ainda dentro dos 90 dias
        if (currentWeek <= 13) {
          await sendWeeklyCheckInReminder(cliente.id, currentWeek);
        }
      } catch (error) {
        console.error(`Failed to send reminder to cliente ${cliente.id}:`, error);
      }
    }
  } catch (error) {
    console.error('Execute scheduled reminder jobs error:', error);
  }
}
