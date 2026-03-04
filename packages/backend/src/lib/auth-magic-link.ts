import crypto from 'crypto';
import { supabase } from './supabase';

interface MagicLinkToken {
  token: string;
  clientId: string;
  email: string;
  expiresAt: Date;
}

const TOKEN_EXPIRATION_MS = 24 * 60 * 60 * 1000; // 24 horas

/**
 * Gera um token de magic link único e o salva no banco
 */
export async function generateMagicLink(
  clientId: string,
  email: string
): Promise<string> {
  // Gerar token aleatório seguro
  const token = crypto.randomBytes(32).toString('hex');
  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
  const expiresAt = new Date(Date.now() + TOKEN_EXPIRATION_MS);

  // Salvar token no banco
  const { error } = await supabase.from('auth_tokens').insert({
    cliente_id: clientId,
    email,
    token_hash: hashedToken,
    expires_at: expiresAt.toISOString(),
    usado: false,
  });

  if (error) {
    throw new Error(`Failed to generate magic link token: ${error.message}`);
  }

  // Retornar o token (será colocado em uma URL para o cliente)
  return token;
}

/**
 * Valida um magic link token e retorna o cliente ID se válido
 */
export async function validateMagicLink(token: string): Promise<{
  clientId: string;
  email: string;
} | null> {
  // Hash do token
  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

  // Buscar no banco
  const { data, error } = await supabase
    .from('auth_tokens')
    .select('cliente_id, email, expires_at, usado')
    .eq('token_hash', hashedToken)
    .single();

  if (error || !data) {
    return null;
  }

  // Verificar expiração
  const expiresAt = new Date(data.expires_at);
  if (expiresAt < new Date()) {
    return null;
  }

  // Verificar se já foi usado
  if (data.usado) {
    return null;
  }

  // Marcar como usado (one-time use)
  await supabase
    .from('auth_tokens')
    .update({ usado: true, usado_em: new Date().toISOString() })
    .eq('token_hash', hashedToken);

  return {
    clientId: data.cliente_id,
    email: data.email,
  };
}

/**
 * Gera um session token (JWT ou cookie-based)
 * Para simplicidade, usamos token aleatório com expiração de 7 dias
 */
export async function generateSessionToken(clientId: string): Promise<string> {
  const sessionToken = crypto.randomBytes(32).toString('hex');
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 dias

  await supabase.from('sessions').insert({
    cliente_id: clientId,
    session_token: sessionToken,
    expires_at: expiresAt.toISOString(),
  });

  return sessionToken;
}

/**
 * Valida um session token
 */
export async function validateSessionToken(sessionToken: string): Promise<string | null> {
  const { data, error } = await supabase
    .from('sessions')
    .select('cliente_id, expires_at')
    .eq('session_token', sessionToken)
    .single();

  if (error || !data) {
    return null;
  }

  // Verificar expiração
  const expiresAt = new Date(data.expires_at);
  if (expiresAt < new Date()) {
    // Session expirado, deletar
    await supabase.from('sessions').delete().eq('session_token', sessionToken);
    return null;
  }

  return data.cliente_id;
}
