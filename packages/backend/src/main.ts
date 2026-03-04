import Fastify from 'fastify';
import cors from '@fastify/cors';
import { questoesRoutes } from './routes/questoes';
import { respostasRoutes } from './routes/respostas';
import { formulariosRoutes } from './routes/formularios';
import { scoringRoutes } from './routes/scoring';
import { emailRoutes } from './routes/email';
import { pdfRoutes } from './routes/pdf';
import { authRoutes } from './routes/auth';
import { portalRoutes } from './routes/portal';
import { approvalRoutes } from './routes/approval';
import { sessionsRoutes } from './routes/sessions';
import { checkInsRoutes } from './routes/check-ins';
import { startEmailScheduler } from './jobs/send-score-email';
import { executeScheduledFeedbackJobs } from './jobs/send-weekly-feedback';
import { executeScheduledReminderJobs } from './jobs/send-weekly-reminder';

const PORT = parseInt(process.env.PORT || '3001', 10);
const NODE_ENV = process.env.NODE_ENV || 'development';
const LOG_LEVEL = process.env.LOG_LEVEL || 'info';

export const fastify = Fastify({
  logger: {
    level: LOG_LEVEL as any,
    transport:
      NODE_ENV === 'development'
        ? {
            target: 'pino-pretty',
            options: {
              colorize: true,
            },
          }
        : undefined,
  },
});

// CORS middleware
fastify.register(cors, {
  origin: true, // Allow all origins in development
  credentials: true,
});

// Health check
fastify.get('/health', async (request, reply) => {
  return {
    status: 'ok',
    timestamp: new Date().toISOString(),
    env: NODE_ENV,
  };
});

// Registra rotas
fastify.register(questoesRoutes);
fastify.register(respostasRoutes);
fastify.register(formulariosRoutes);
fastify.register(scoringRoutes);
fastify.register(emailRoutes);
fastify.register(pdfRoutes);
fastify.register(authRoutes);
fastify.register(portalRoutes);
fastify.register(approvalRoutes);
fastify.register(sessionsRoutes);
fastify.register(checkInsRoutes);

// Error handler
fastify.setErrorHandler((error: Error, request, reply) => {
  fastify.log.error(error);
  reply.status(500).send({
    error: 'Erro interno do servidor',
    message: NODE_ENV === 'development' ? error.message : undefined,
  });
});

// Start server
const start = async () => {
  try {
    await fastify.listen({ port: PORT, host: '0.0.0.0' });
    fastify.log.info(`🚀 Backend rodando em http://localhost:${PORT}`);

    // Inicia schedulers em background (apenas produção)
    if (NODE_ENV === 'production') {
      startEmailScheduler(60 * 60 * 1000); // A cada 1 hora
      // Executar feedback jobs a cada 30 min
      setInterval(() => {
        executeScheduledFeedbackJobs().catch((err) => fastify.log.error('Feedback job error:', err));
      }, 30 * 60 * 1000);
      // Executar reminder jobs toda segunda-feira às 09:00 AM
      const scheduleReminderJob = () => {
        const now = new Date();
        const monday = new Date(now);
        monday.setDate(now.getDate() + ((1 - now.getDay() + 7) % 7));
        monday.setHours(9, 0, 0, 0);
        const timeUntilMonday = monday.getTime() - now.getTime();
        setTimeout(() => {
          executeScheduledReminderJobs().catch((err) => fastify.log.error('Reminder job error:', err));
          setInterval(() => {
            executeScheduledReminderJobs().catch((err) => fastify.log.error('Reminder job error:', err));
          }, 7 * 24 * 60 * 60 * 1000); // Semanalmente
        }, timeUntilMonday);
      };
      scheduleReminderJob();
    }
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
