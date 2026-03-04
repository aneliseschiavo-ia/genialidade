/**
 * Rota de Autenticação — Magic Link para Portal
 * Story 1.6 — Portal Cliente
 */

import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import {
  generateMagicLink,
  validateMagicLink,
  generateSessionToken,
  validateSessionToken,
} from '../lib/auth-magic-link';
import { supabase } from '../lib/supabase';

interface VerifyMagicLinkBody {
  token: string;
}

interface VerifySessionBody {
  sessionToken: string;
}

export async function authRoutes(fastify: FastifyInstance) {
  /**
   * POST /api/auth/verify-magic-link
   * Valida magic link token e retorna session token
   */
  fastify.post<{ Body: VerifyMagicLinkBody }>(
    '/api/auth/verify-magic-link',
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { token } = request.body as VerifyMagicLinkBody;

        if (!token) {
          return reply.status(400).send({
            error: 'Token é obrigatório',
          });
        }

        // Validar magic link
        const result = await validateMagicLink(token);
        if (!result) {
          return reply.status(401).send({
            error: 'Token inválido, expirado ou já foi usado',
          });
        }

        // Gerar session token
        const sessionToken = await generateSessionToken(result.clientId);

        // Set HTTP-only cookie para sessão
        reply.cookie('session_token', sessionToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7 dias
          path: '/',
        });

        reply.send({
          success: true,
          clientId: result.clientId,
          sessionToken,
        });
      } catch (error) {
        fastify.log.error('Magic link verification error:', error);
        reply.status(500).send({
          error: 'Erro ao verificar token',
          details: error instanceof Error ? error.message : 'Unknown error',
        });
      }
    }
  );

  /**
   * POST /api/auth/verify-session
   * Valida session token
   */
  fastify.post<{ Body: VerifySessionBody }>(
    '/api/auth/verify-session',
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { sessionToken } = request.body as VerifySessionBody;

        if (!sessionToken) {
          return reply.status(400).send({
            error: 'sessionToken é obrigatório',
          });
        }

        const clientId = await validateSessionToken(sessionToken);
        if (!clientId) {
          return reply.status(401).send({
            error: 'Sessão inválida ou expirada',
          });
        }

        reply.send({
          success: true,
          clientId,
        });
      } catch (error) {
        fastify.log.error('Session verification error:', error);
        reply.status(500).send({
          error: 'Erro ao verificar sessão',
          details: error instanceof Error ? error.message : 'Unknown error',
        });
      }
    }
  );

  /**
   * GET /api/auth/logout
   * Logout (invalida session)
   */
  fastify.get('/api/auth/logout', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      // Limpar cookie
      reply.clearCookie('session_token', { path: '/' });

      reply.send({
        success: true,
        message: 'Logout realizado',
      });
    } catch (error) {
      fastify.log.error('Logout error:', error);
      reply.status(500).send({
        error: 'Erro ao fazer logout',
      });
    }
  });
}
