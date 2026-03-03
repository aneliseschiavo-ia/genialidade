/**
 * Email Templates — HTML templates para aprovação/rejeição
 * Story 1.4 — Email Automático
 */

export interface EmailTemplateContext {
  nome_cliente: string;
  email_cliente: string;
  score_total: number;
  desalinhamento_estrutural: number;
  ruido_decisao: number;
  vazamento_financeiro: number;
  maturidade_estrategica: number;
  hipotese_titulo: string;
  hipotese_descricao: string;
  hipotese_focos: string[];
  aprovado: boolean;
  unsubscribe_token: string;
}

/**
 * Template para email de APROVAÇÃO
 */
export function renderAprovacaoTemplate(context: EmailTemplateContext): string {
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Seu diagnóstico saiu!</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      line-height: 1.6;
      color: #1a2332;
      background-color: #f5f7fa;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      overflow: hidden;
    }
    .header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 40px 20px;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      font-size: 28px;
      font-weight: 600;
    }
    .header p {
      margin: 10px 0 0 0;
      opacity: 0.9;
      font-size: 16px;
    }
    .content {
      padding: 40px;
    }
    .greeting {
      font-size: 18px;
      margin-bottom: 30px;
      color: #1a2332;
    }
    .approval-badge {
      background: #d4edda;
      border: 2px solid #28a745;
      border-radius: 8px;
      padding: 20px;
      margin: 30px 0;
      text-align: center;
    }
    .approval-badge h2 {
      margin: 0 0 10px 0;
      color: #155724;
      font-size: 24px;
    }
    .approval-badge p {
      margin: 0;
      color: #155724;
      font-size: 16px;
    }
    .score-section {
      background: #f8f9fa;
      border-radius: 8px;
      padding: 20px;
      margin: 30px 0;
    }
    .score-section h3 {
      margin: 0 0 20px 0;
      color: #1a2332;
      font-size: 18px;
    }
    .score-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 15px;
      margin-bottom: 20px;
    }
    .score-item {
      background: white;
      border-left: 4px solid #667eea;
      padding: 15px;
      border-radius: 4px;
    }
    .score-item .label {
      font-size: 12px;
      color: #6c757d;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 5px;
    }
    .score-item .value {
      font-size: 24px;
      font-weight: 600;
      color: #667eea;
    }
    .score-item .max {
      font-size: 14px;
      color: #6c757d;
      margin-top: 3px;
    }
    .total-score {
      background: white;
      border: 2px solid #667eea;
      border-radius: 8px;
      padding: 15px;
      text-align: center;
    }
    .total-score .label {
      font-size: 12px;
      color: #6c757d;
      text-transform: uppercase;
      margin-bottom: 5px;
    }
    .total-score .value {
      font-size: 32px;
      font-weight: 600;
      color: #667eea;
    }
    .hypothesis-section {
      background: #e7f3ff;
      border-left: 4px solid #0066cc;
      border-radius: 8px;
      padding: 20px;
      margin: 30px 0;
    }
    .hypothesis-section h4 {
      margin: 0 0 10px 0;
      color: #004085;
      font-size: 16px;
    }
    .hypothesis-section .title {
      font-weight: 600;
      color: #004085;
      margin-bottom: 10px;
      font-size: 16px;
    }
    .hypothesis-section p {
      margin: 0 0 10px 0;
      color: #004085;
      line-height: 1.6;
      font-size: 14px;
    }
    .hypothesis-section .focos {
      margin: 15px 0 0 0;
      padding-top: 15px;
      border-top: 1px solid #b3d9ff;
    }
    .hypothesis-section .focos h5 {
      margin: 0 0 10px 0;
      color: #004085;
      font-size: 14px;
    }
    .hypothesis-section .focos ul {
      margin: 0;
      padding-left: 20px;
      color: #004085;
    }
    .hypothesis-section .focos li {
      margin: 5px 0;
      font-size: 14px;
    }
    .next-steps {
      background: #fff3cd;
      border-left: 4px solid #ffc107;
      border-radius: 8px;
      padding: 20px;
      margin: 30px 0;
    }
    .next-steps h4 {
      margin: 0 0 10px 0;
      color: #856404;
      font-size: 16px;
    }
    .next-steps p {
      margin: 0 0 10px 0;
      color: #856404;
      font-size: 14px;
      line-height: 1.6;
    }
    .next-steps p:last-child {
      margin-bottom: 0;
    }
    .cta-button {
      display: inline-block;
      background: #667eea;
      color: white;
      padding: 12px 30px;
      border-radius: 6px;
      text-decoration: none;
      font-weight: 600;
      margin-top: 20px;
      font-size: 16px;
    }
    .cta-button:hover {
      background: #5568d3;
    }
    .footer {
      background: #f8f9fa;
      padding: 20px;
      font-size: 12px;
      color: #6c757d;
      text-align: center;
      border-top: 1px solid #e9ecef;
    }
    .footer a {
      color: #667eea;
      text-decoration: none;
    }
    .footer a:hover {
      text-decoration: underline;
    }
    .footer-divider {
      margin: 10px 0;
      color: #dee2e6;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>✨ Seu diagnóstico saiu!</h1>
      <p>Análise estrutural da sua organização</p>
    </div>

    <div class="content">
      <div class="greeting">
        Olá <strong>${context.nome_cliente}</strong>,
      </div>

      <p>
        Analisamos suas respostas ao formulário de diagnóstico.
        <strong>Parabéns: sua organização qualifica para o próximo passo!</strong>
        Você foi selecionado para uma sessão de diagnóstico aprofundado.
      </p>

      <div class="approval-badge">
        <h2>✅ APROVADO</h2>
        <p>Score de impacto potencial: ${context.score_total}/20</p>
      </div>

      <div class="score-section">
        <h3>Seu Perfil Diagnóstico</h3>
        <div class="score-grid">
          <div class="score-item">
            <div class="label">Desalinhamento</div>
            <div class="value">${context.desalinhamento_estrutural.toFixed(1)}</div>
            <div class="max">de 5</div>
          </div>
          <div class="score-item">
            <div class="label">Ruído Decisório</div>
            <div class="value">${context.ruido_decisao.toFixed(1)}</div>
            <div class="max">de 5</div>
          </div>
          <div class="score-item">
            <div class="label">Vazamento Fin.</div>
            <div class="value">${context.vazamento_financeiro.toFixed(1)}</div>
            <div class="max">de 5</div>
          </div>
          <div class="score-item">
            <div class="label">Maturidade</div>
            <div class="value">${context.maturidade_estrategica.toFixed(1)}</div>
            <div class="max">de 5</div>
          </div>
        </div>
        <div class="total-score">
          <div class="label">Score Total</div>
          <div class="value">${context.score_total.toFixed(1)}/20</div>
        </div>
      </div>

      <div class="hypothesis-section">
        <h4>📊 Hipótese Preliminar</h4>
        <div class="title">${context.hipotese_titulo}</div>
        <p>${context.hipotese_descricao}</p>
        ${
          context.hipotese_focos && context.hipotese_focos.length > 0
            ? `
          <div class="focos">
            <h5>Focos imediatos:</h5>
            <ul>
              ${context.hipotese_focos.map((foco) => `<li>${foco}</li>`).join('')}
            </ul>
          </div>
        `
            : ''
        }
      </div>

      <div class="next-steps">
        <h4>🚀 Próximas Etapas</h4>
        <p>
          Você receberá <strong>um convite para sessão 1:1 de diagnóstico aprofundado</strong>
          nos próximos dias. Essa conversa vai validar a hipótese acima e mapear exatamente
          quais mudanças estruturais farão diferença na sua organização.
        </p>
        <p style="margin-top: 15px; font-weight: 600;">
          ⏱️ Tempo estimado: 60-90 minutos
        </p>
      </div>

      <div style="text-align: center; margin-top: 40px;">
        <a href="https://genialidade.ai/agenda-sessao" class="cta-button">Confirmar Interesse</a>
      </div>

      <p style="margin-top: 30px; font-size: 14px; color: #6c757d;">
        Se você tiver dúvidas sobre o diagnóstico ou preferir não continuar,
        <a href="mailto:contato@genialidade.ai" style="color: #667eea;">entre em contato conosco</a>.
      </p>
    </div>

    <div class="footer">
      <p style="margin: 0 0 10px 0;">Genialidade - Diagnóstico Neural</p>
      <div class="footer-divider">•</div>
      <p style="margin: 10px 0;">
        <a href="https://genialidade.ai">genialidade.ai</a> |
        <a href="mailto:contato@genialidade.ai">contato@genialidade.ai</a>
      </p>
      <div class="footer-divider">•</div>
      <p style="margin: 10px 0;">
        <a href="https://genialidade.ai/unsubscribe?token=${context.unsubscribe_token}">Desinscrever-se</a> |
        <a href="https://genialidade.ai/privacidade">Política de Privacidade</a>
      </p>
      <p style="margin: 10px 0 0 0; font-size: 11px;">
        Este é um email automatizado. Não responda a este endereço.
      </p>
    </div>
  </div>
</body>
</html>`;
}

/**
 * Template para email de REJEIÇÃO
 */
export function renderRejeicaoTemplate(context: EmailTemplateContext): string {
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Status do seu diagnóstico</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      line-height: 1.6;
      color: #1a2332;
      background-color: #f5f7fa;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      overflow: hidden;
    }
    .header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 40px 20px;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      font-size: 28px;
      font-weight: 600;
    }
    .header p {
      margin: 10px 0 0 0;
      opacity: 0.9;
      font-size: 16px;
    }
    .content {
      padding: 40px;
    }
    .greeting {
      font-size: 18px;
      margin-bottom: 30px;
      color: #1a2332;
    }
    .rejection-badge {
      background: #f8d7da;
      border: 2px solid #f5c6cb;
      border-radius: 8px;
      padding: 20px;
      margin: 30px 0;
      text-align: center;
    }
    .rejection-badge h2 {
      margin: 0 0 10px 0;
      color: #721c24;
      font-size: 24px;
    }
    .rejection-badge p {
      margin: 0;
      color: #721c24;
      font-size: 16px;
    }
    .feedback-section {
      background: #fff3cd;
      border-left: 4px solid #ffc107;
      border-radius: 8px;
      padding: 20px;
      margin: 30px 0;
    }
    .feedback-section h3 {
      margin: 0 0 10px 0;
      color: #856404;
      font-size: 18px;
    }
    .feedback-section p {
      margin: 0 0 10px 0;
      color: #856404;
      font-size: 14px;
      line-height: 1.6;
    }
    .feedback-section p:last-child {
      margin-bottom: 0;
    }
    .hypothesis-section {
      background: #e7f3ff;
      border-left: 4px solid #0066cc;
      border-radius: 8px;
      padding: 20px;
      margin: 30px 0;
    }
    .hypothesis-section h4 {
      margin: 0 0 10px 0;
      color: #004085;
      font-size: 16px;
    }
    .hypothesis-section .title {
      font-weight: 600;
      color: #004085;
      margin-bottom: 10px;
      font-size: 16px;
    }
    .hypothesis-section p {
      margin: 0 0 10px 0;
      color: #004085;
      line-height: 1.6;
      font-size: 14px;
    }
    .recommendation {
      background: #d1ecf1;
      border-left: 4px solid #17a2b8;
      border-radius: 8px;
      padding: 20px;
      margin: 30px 0;
    }
    .recommendation h4 {
      margin: 0 0 10px 0;
      color: #0c5460;
      font-size: 16px;
    }
    .recommendation p {
      margin: 0 0 10px 0;
      color: #0c5460;
      font-size: 14px;
      line-height: 1.6;
    }
    .recommendation p:last-child {
      margin-bottom: 0;
    }
    .cta-button {
      display: inline-block;
      background: #667eea;
      color: white;
      padding: 12px 30px;
      border-radius: 6px;
      text-decoration: none;
      font-weight: 600;
      margin-top: 20px;
      font-size: 16px;
    }
    .cta-button:hover {
      background: #5568d3;
    }
    .footer {
      background: #f8f9fa;
      padding: 20px;
      font-size: 12px;
      color: #6c757d;
      text-align: center;
      border-top: 1px solid #e9ecef;
    }
    .footer a {
      color: #667eea;
      text-decoration: none;
    }
    .footer a:hover {
      text-decoration: underline;
    }
    .footer-divider {
      margin: 10px 0;
      color: #dee2e6;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>📋 Status do seu diagnóstico</h1>
      <p>Análise estrutural da sua organização</p>
    </div>

    <div class="content">
      <div class="greeting">
        Olá <strong>${context.nome_cliente}</strong>,
      </div>

      <p>
        Obrigado por responder nosso formulário de diagnóstico.
        Analisamos suas respostas com cuidado e gostaria de compartilhar o resultado.
      </p>

      <div class="rejection-badge">
        <h2>⏸ Não qualifica neste momento</h2>
        <p>Score de impacto potencial: ${context.score_total}/20</p>
      </div>

      <div class="feedback-section">
        <h3>Por que isso?</h3>
        <p>
          Identificamos que sua organização ainda não apresenta as condições ideais para
          iniciar um diagnóstico estrutural em profundidade.
        </p>
        <p style="margin-top: 15px; font-weight: 600;">
          ${context.hipotese_descricao}
        </p>
      </div>

      <div class="hypothesis-section">
        <h4>📊 O que observamos</h4>
        <div class="title">${context.hipotese_titulo}</div>
      </div>

      <div class="recommendation">
        <h4>💡 O que recomendamos</h4>
        ${
          context.hipotese_focos && context.hipotese_focos.length > 0
            ? `
          <p style="margin-bottom: 0;">
            Trabalhe nesses pontos nos próximos meses:
          </p>
          <ul style="margin: 10px 0 0 0; padding-left: 20px; color: #0c5460;">
            ${context.hipotese_focos.map((foco) => `<li>${foco}</li>`).join('')}
          </ul>
        `
            : ''
        }
        <p style="margin-top: 15px;">
          Depois de avançar nessas áreas, sua organização estará muito melhor posicionada
          para aproveitar ao máximo um diagnóstico estrutural.
        </p>
      </div>

      <div style="background: #f8f9fa; border-radius: 8px; padding: 20px; margin: 30px 0;">
        <h4 style="margin: 0 0 10px 0; color: #1a2332;">🔄 Reconectamos em 3-6 meses</h4>
        <p style="margin: 0; color: #6c757d; font-size: 14px;">
          Gostaríamos de acompanhá-lo nessa jornada. Em <strong>3 a 6 meses</strong>,
          quando você tiver avançado nesses pontos, entraremos em contato para fazer
          uma nova avaliação — e aí sim, vocês provavelmente estarão prontos.
        </p>
      </div>

      <div style="text-align: center; margin-top: 40px;">
        <a href="mailto:contato@genialidade.ai?subject=Quero%20mais%20informações%20sobre%20Genialidade"
           class="cta-button">Entrar em Contato</a>
      </div>

      <p style="margin-top: 30px; font-size: 14px; color: #6c757d;">
        Se você tiver dúvidas sobre o diagnóstico ou gostaria de discutir seu resultado,
        <a href="mailto:contato@genialidade.ai" style="color: #667eea;">responda este email</a>
        e falaremos com você pessoalmente.
      </p>
    </div>

    <div class="footer">
      <p style="margin: 0 0 10px 0;">Genialidade - Diagnóstico Neural</p>
      <div class="footer-divider">•</div>
      <p style="margin: 10px 0;">
        <a href="https://genialidade.ai">genialidade.ai</a> |
        <a href="mailto:contato@genialidade.ai">contato@genialidade.ai</a>
      </p>
      <div class="footer-divider">•</div>
      <p style="margin: 10px 0;">
        <a href="https://genialidade.ai/unsubscribe?token=${context.unsubscribe_token}">Desinscrever-se</a> |
        <a href="https://genialidade.ai/privacidade">Política de Privacidade</a>
      </p>
      <p style="margin: 10px 0 0 0; font-size: 11px;">
        Este é um email automatizado. Não responda a este endereço.
      </p>
    </div>
  </div>
</body>
</html>`;
}
