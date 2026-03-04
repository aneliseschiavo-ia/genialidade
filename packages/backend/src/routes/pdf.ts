/**
 * Rota de PDF — Geração de diagnóstico formal
 * Story 1.5 — Diagnóstico Formal PDF
 */

import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { generateDiagnosticPDF, validatePDFInput, PDFGenerationInput } from '../lib/pdf-generator';
import { supabase } from '../lib/supabase';

interface GeneratePDFBody extends PDFGenerationInput {
  // Extended by PDFGenerationInput
}

interface GetPDFParams {
  clientId: string;
}

export async function pdfRoutes(fastify: FastifyInstance) {
  /**
   * POST /api/pdf
   * Gera PDF de diagnóstico e salva em Supabase Storage
   */
  fastify.post<{ Body: GeneratePDFBody }>(
    '/api/pdf',
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const input = request.body as Partial<PDFGenerationInput>;

        // Validar input
        const validation = validatePDFInput(input);
        if (!validation.valid) {
          return reply.status(400).send({
            error: 'Validação falhou',
            details: validation.errors,
          });
        }

        // Gerar PDF
        const pdfBuffer = await generateDiagnosticPDF(input as PDFGenerationInput);

        // Salvar em Supabase Storage
        const filename = `diagnose_${input.clientId}_${Date.now()}.pdf`;
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('diagnoses')
          .upload(filename, pdfBuffer, {
            contentType: 'application/pdf',
            upsert: false,
          });

        if (uploadError) {
          fastify.log.error('Storage upload error:', uploadError);
          return reply.status(500).send({
            error: 'Erro ao salvar PDF',
            details: uploadError.message,
          });
        }

        // Obter URL pública
        const { data: urlData } = supabase.storage.from('diagnoses').getPublicUrl(filename);

        // Log em tabela de auditoria
        try {
          await supabase.from('email_log').insert({
            cliente_id: input.clientId,
            tipo: 'PDF_GENERATED',
            timestamp: new Date().toISOString(),
            status: 'SUCCESS',
            details: {
              filename,
              filesize: pdfBuffer.length,
              url: urlData.publicUrl,
            },
          });
        } catch (logError) {
          fastify.log.warn('Failed to log PDF generation:', logError);
          // Não bloqueia se logging falhar
        }

        reply.send({
          success: true,
          filename,
          url: urlData.publicUrl,
          filesize: pdfBuffer.length,
        });
      } catch (error) {
        fastify.log.error('PDF generation error:', error);
        reply.status(500).send({
          error: 'Erro ao gerar PDF',
          details: error instanceof Error ? error.message : 'Unknown error',
        });
      }
    }
  );

  /**
   * GET /api/pdf/:clientId
   * Retorna PDF já gerado para cliente
   */
  fastify.get<{ Params: GetPDFParams }>(
    '/api/pdf/:clientId',
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { clientId } = request.params as GetPDFParams;

        // Verificar se PDF existe em storage
        const { data: files, error: listError } = await supabase.storage
          .from('diagnoses')
          .list('', {
            search: `diagnose_${clientId}_`,
          });

        if (listError || !files || files.length === 0) {
          return reply.status(404).send({
            error: 'PDF não encontrado',
          });
        }

        // Retornar URL do PDF mais recente
        const latestFile = files.sort(
          (a, b) =>
            new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime()
        )[0];

        const { data: urlData } = supabase.storage.from('diagnoses').getPublicUrl(latestFile.name);

        reply.send({
          success: true,
          filename: latestFile.name,
          url: urlData.publicUrl,
          createdAt: latestFile.created_at,
        });
      } catch (error) {
        fastify.log.error('PDF retrieval error:', error);
        reply.status(500).send({
          error: 'Erro ao recuperar PDF',
          details: error instanceof Error ? error.message : 'Unknown error',
        });
      }
    }
  );
}
