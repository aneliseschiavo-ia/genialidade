/**
 * Auth Middleware — JWT/Session Validation
 * Story 4.2 — Auth Validation para Check-ins
 */

import { FastifyRequest, FastifyReply } from 'fastify';
import { jwtVerify, SignJWT } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'dev-secret-key-change-in-production'
);

export interface AuthPayload {
  clienteId: string;
  email: string;
  iat: number;
  exp: number;
}

/**
 * Extrai e valida token JWT do header Authorization
 */
export async function authMiddleware(request: FastifyRequest, reply: FastifyReply) {
  try {
    const token = request.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      return reply.status(401).send({
        error: 'Unauthorized: Token não fornecido',
      });
    }

    // Validar JWT
    const verified = await jwtVerify(token, JWT_SECRET);
    const payload = verified.payload as unknown as AuthPayload;

    // Adicionar ao request context
    (request as any).user = payload;
  } catch (error) {
    return reply.status(401).send({
      error: 'Unauthorized: Token inválido',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}

/**
 * Gera JWT token para cliente
 */
export async function generateAuthToken(clienteId: string, email: string): Promise<string> {
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + 7 * 24 * 60 * 60; // 7 dias

  const token = await new SignJWT({ clienteId, email })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt(iat)
    .setExpirationTime(exp)
    .sign(JWT_SECRET);

  return token;
}
