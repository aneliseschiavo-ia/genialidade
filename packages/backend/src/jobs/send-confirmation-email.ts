/**
 * Job: Envia email de confirmação de sessão agendada
 * Story 2.3 — Email Confirmação Sessão
 * Triggered por: POST /api/sessions/schedule
 */

import { supabase } from '../lib/supabase';
import { getEmailProvider } from '../lib/email-provider';

export async function sendConfirmationEmail(clienteId: string): Promise<void> {
  try {
    // Buscar cliente + sessão agendada
    const { data: cliente } = await supabase
      .from('clientes')
      .select('nome, email')
      .eq('id', clienteId)
      .single();

    const { data: session } = await supabase
      .from('sessoes')
      .select('*')
      .eq('cliente_id', clienteId)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    const { data: decision } = await supabase
      .from('decisoes')
      .select('verdade_nucleo')
      .eq('cliente_id', clienteId)
      .order('calculado_em', { ascending: false })
      .limit(1)
      .single();

    if (!cliente || !session || !decision) {
      console.error('Missing data for confirmation email');
      return;
    }

    // Formatar data/hora
    const sessionDate = new Date(session.scheduled_at);
    const formattedDate = sessionDate.toLocaleDateString('pt-BR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    const formattedTime = sessionDate.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    });

    // Preparar dados para template
    const emailData = {
      nome_cliente: cliente.nome,
      data_sessao: formattedDate,
      hora_sessao: formattedTime,
      zoom_url: session.zoom_url,
      verdade_nucleo: decision.verdade_nucleo || 'Análise estratégica',
      portal_link: `https://genialidade.ai/portal/dashboard?token=${session.id}`,
    };

    // Enviar email (template inline para MVP)
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
    .session-box { background: #f0fdf4; border-left: 4px solid #1B5E20; padding: 15px; margin: 20px 0; }
    .checklist { list-style: none; padding: 0; }
    .checklist li { padding: 10px; background: #fafafa; margin: 5px 0; border-radius: 4px; }
    .checklist li:before { content: "☐ "; color: #1B5E20; margin-right: 10px; }
    .cta { background: #1B5E20; color: white; padding: 15px 30px; text-align: center; border-radius: 6px; margin: 20px 0; }
    .cta a { color: white; text-decoration: none; font-weight: bold; }
    .footer { font-size: 12px; color: #666; text-align: center; padding: 20px; border-top: 1px solid #eee; margin-top: 20px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Parabéns! 🎉</h1>
      <p>Você foi selecionado para a Fase 2</p>
    </div>
    <div class="content">
      <p>Olá ${emailData.nome_cliente},</p>
      <p>Confirmar que sua sessão de validação foi agendada com sucesso!</p>

      <div class="session-box">
        <h3>📅 Detalhes da sua sessão</h3>
        <p><strong>Data:</strong> ${emailData.data_sessao}</p>
        <p><strong>Hora:</strong> ${emailData.hora_sessao}</p>
        <p><strong>Link Zoom:</strong> <a href="${emailData.zoom_url}">${emailData.zoom_url}</a></p>
      </div>

      <h3>Sua Verdade Núcleo</h3>
      <p style="font-style: italic; border-left: 3px solid #4CAF50; padding-left: 15px;">
        "${emailData.verdade_nucleo}"
      </p>

      <h3>Preparação para a sessão</h3>
      <ul class="checklist">
        <li>Últimos 3 meses de P&L ou dados financeiros</li>
        <li>2 maiores desafios das últimas 2 semanas</li>
        <li>1 meta que você quer alcançar em 90 dias</li>
        <li>Calendário disponível para semanas 1-2 de março</li>
      </ul>

      <div class="cta">
        <a href="${emailData.portal_link}">Acessar Portal & Revisar Diagnóstico</a>
      </div>

      <p style="color: #666; font-size: 14px;">
        Dúvidas? Responda este email ou entre em contato com contato@genialidade.ai
      </p>
    </div>
    <div class="footer">
      <p>© 2026 Genialidade. Todos os direitos reservados.</p>
      <p>Este diagnóstico é confidencial. Não compartilhe sem autorização.</p>
    </div>
  </div>
</body>
</html>
    `;

    // Enviar via email provider
    const provider = getEmailProvider();
    await provider.sendEmail({
      to: cliente.email,
      subject: `✅ Sua sessão foi agendada! ${emailData.data_sessao}`,
      html: htmlContent,
    });

    // Log envio
    await supabase.from('email_log').insert({
      cliente_id: clienteId,
      tipo: 'CONFIRMATION_SESSION',
      timestamp: new Date().toISOString(),
      status: 'SUCCESS',
      details: {
        session_id: session.id,
        scheduled_for: session.scheduled_at,
      },
    });

    console.log(`✅ Confirmation email sent to ${cliente.email}`);
  } catch (error) {
    console.error('Send confirmation email error:', error);
    throw error;
  }
}
