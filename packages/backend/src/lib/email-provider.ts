/**
 * Email Provider — Abstração para Resend
 * Story 1.4 — Email Automático
 */

import { Resend } from 'resend';

export interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}

export interface EmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

class EmailProvider {
  private resend: Resend;
  private fromEmail: string;
  private fromName: string;

  constructor() {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error('RESEND_API_KEY não configurada em .env');
    }

    this.resend = new Resend(apiKey);
    this.fromEmail = process.env.RESEND_FROM_EMAIL || 'noreply@genialidade.ai';
    this.fromName = process.env.RESEND_FROM_NAME || 'Genialidade';
  }

  /**
   * Envia email com tratamento de erros
   */
  async send(options: SendEmailOptions): Promise<EmailResult> {
    try {
      const response = await this.resend.emails.send({
        from: `${this.fromName} <${this.fromEmail}>`,
        to: options.to,
        subject: options.subject,
        html: options.html,
        replyTo: options.replyTo || 'contato@genialidade.ai',
      });

      if (response.error) {
        return {
          success: false,
          error: response.error.message,
        };
      }

      return {
        success: true,
        messageId: response.data?.id,
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      return {
        success: false,
        error: errorMessage,
      };
    }
  }

  /**
   * Valida endereço de email
   */
  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}

// Singleton
let provider: EmailProvider;

export function getEmailProvider(): EmailProvider {
  if (!provider) {
    provider = new EmailProvider();
  }
  return provider;
}
