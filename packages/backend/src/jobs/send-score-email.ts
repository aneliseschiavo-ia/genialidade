/**
 * Job Scheduler — Envia emails de score 24-48h após formulário
 * Story 1.4 — Email Automático
 *
 * Execução:
 * - Em produção: Cron job a cada 1 hora
 * - Em desenvolvimento: pode ser chamado manualmente via endpoint
 *
 * Lógica:
 * 1. Busca scores calculados há 24-48h e não enviados
 * 2. Envia email com score + hipótese
 * 3. Registra em email_log
 * 4. Se falhar: registra erro, tentará novamente em 1h
 */

import { supabase } from '../lib/supabase';
import { getEmailProvider } from '../lib/email-provider';
import { renderAprovacaoTemplate, renderRejeicaoTemplate } from '../lib/email-templates';
import crypto from 'crypto';

interface EmailJob {
  cliente_id: string;
  email: string;
  nome: string;
  score_id: string;
}

/**
 * Busca jobs de email pendentes (scores 24-48h antigos sem email enviado)
 */
async function getPendingJobs(): Promise<EmailJob[]> {
  // Buscar formulários onde score foi calculado há 24-48h atrás
  const now = new Date();
  const desde24h = new Date(now.getTime() - 24 * 60 * 60 * 1000); // 24h atrás
  const desde48h = new Date(now.getTime() - 48 * 60 * 60 * 1000); // 48h atrás

  // Buscar decisões calculadas nessa janela que ainda não enviaram email
  const { data: decisions, error } = await supabase
    .from('decisoes')
    .select(
      `
      id,
      cliente_id,
      calculado_em
    `
    )
    .gte('calculado_em', desde48h.toISOString())
    .lte('calculado_em', desde24h.toISOString());

  if (error || !decisions) {
    console.error('Erro ao buscar decisões pendentes:', error);
    return [];
  }

  const jobs: EmailJob[] = [];

  for (const decision of decisions) {
    // Verificar se já enviou email para este cliente
    const { data: emailLog, error: emailError } = await supabase
      .from('email_log')
      .select('id')
      .eq('cliente_id', decision.cliente_id)
      .eq('status', 'enviado')
      .limit(1);

    if (!emailError && emailLog && emailLog.length > 0) {
      // Já enviou email, pular
      continue;
    }

    // Buscar dados do cliente
    const { data: clienteData, error: clienteError } = await supabase
      .from('formularios')
      .select('cliente_id')
      .eq('cliente_id', decision.cliente_id)
      .limit(1)
      .single();

    if (!clienteError && clienteData) {
      // Usar email/nome do cliente (em produção, viria de CRM)
      jobs.push({
        cliente_id: decision.cliente_id,
        email: `${decision.cliente_id}@example.com`, // Placeholder
        nome: decision.cliente_id,
        score_id: decision.id,
      });
    }
  }

  return jobs;
}

/**
 * Processa um job de email (envia + registra)
 */
async function processJob(job: EmailJob): Promise<boolean> {
  try {
    // Buscar score
    const { data: decision, error: decisionError } = await supabase
      .from('decisoes')
      .select('*')
      .eq('id', job.score_id)
      .single();

    if (decisionError || !decision) {
      console.error(`Score não encontrado para job ${job.score_id}`);
      return false;
    }

    // Renderizar template
    const unsubscribeToken = crypto
      .createHash('sha256')
      .update(`${job.cliente_id}-${Date.now()}`)
      .digest('hex');

    const templateContext = {
      nome_cliente: job.nome,
      email_cliente: job.email,
      score_total: decision.score_total,
      desalinhamento_estrutural: decision.desalinhamento_estrutural,
      ruido_decisao: decision.ruido_decisao,
      vazamento_financeiro: decision.vazamento_financeiro,
      maturidade_estrategica: decision.maturidade_estrategica,
      hipotese_titulo: decision.hipotese_titulo,
      hipotese_descricao: decision.hipotese_descricao,
      hipotese_focos: decision.hipotese_focos || [],
      aprovado: decision.aprovado,
      unsubscribe_token: unsubscribeToken,
    };

    const htmlContent = decision.aprovado
      ? renderAprovacaoTemplate(templateContext)
      : renderRejeicaoTemplate(templateContext);

    const subject = decision.aprovado
      ? '✨ Seu diagnóstico saiu! — Parabéns, você foi selecionado'
      : '📋 Status do seu diagnóstico — Próximos passos';

    // Enviar email
    const provider = getEmailProvider();
    const result = await provider.send({
      to: job.email,
      subject,
      html: htmlContent,
      replyTo: 'contato@genialidade.ai',
    });

    // Registrar em email_log
    const { error: logError } = await supabase.from('email_log').insert({
      cliente_id: job.cliente_id,
      email: job.email,
      tipo: decision.aprovado ? 'score_aprovado' : 'score_rejeitado',
      assunto: subject,
      status: result.success ? 'enviado' : 'falhou',
      mensagem_id: result.messageId,
      erro_mensagem: result.error,
      enviado_em: new Date().toISOString(),
      tentativas: 1,
    });

    if (logError) {
      console.error('Erro ao registrar email log:', logError);
    }

    return result.success;
  } catch (err) {
    console.error(`Erro processando job ${job.score_id}:`, err);
    return false;
  }
}

/**
 * Executa job scheduler
 * Chamado por cron job a cada 1 hora em produção
 */
export async function runEmailScheduler(): Promise<{
  success: number;
  failed: number;
  total: number;
}> {
  console.log('[Email Scheduler] Iniciando...');

  try {
    const jobs = await getPendingJobs();
    console.log(`[Email Scheduler] Encontrados ${jobs.length} jobs pendentes`);

    let success = 0;
    let failed = 0;

    for (const job of jobs) {
      const result = await processJob(job);
      if (result) {
        success++;
        console.log(
          `[Email Scheduler] ✅ Email enviado para ${job.cliente_id}`
        );
      } else {
        failed++;
        console.log(
          `[Email Scheduler] ❌ Falha ao enviar email para ${job.cliente_id}`
        );
      }
    }

    console.log(
      `[Email Scheduler] Concluído: ${success} sucesso, ${failed} falha`
    );

    return {
      success,
      failed,
      total: jobs.length,
    };
  } catch (err) {
    console.error('[Email Scheduler] Erro crítico:', err);
    return {
      success: 0,
      failed: 0,
      total: 0,
    };
  }
}

/**
 * Inicia scheduler em background (apenas em produção)
 * Em desenvolvimento, pode ser chamado manualmente
 */
export function startEmailScheduler(intervalMs: number = 60 * 60 * 1000): void {
  if (process.env.NODE_ENV === 'production') {
    // Executar imediatamente
    runEmailScheduler().catch((err) => {
      console.error('[Email Scheduler] Erro na primeira execução:', err);
    });

    // Depois, repetir a cada intervalo
    setInterval(() => {
      runEmailScheduler().catch((err) => {
        console.error('[Email Scheduler] Erro na execução cíclica:', err);
      });
    }, intervalMs);

    console.log(
      `[Email Scheduler] Iniciado. Próxima execução em ${intervalMs / 1000 / 60} minutos`
    );
  }
}
