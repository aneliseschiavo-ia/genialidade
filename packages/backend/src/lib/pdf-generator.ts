import PDFDocument from 'pdfkit';
import { DiagnosticPDFTemplate, DiagnosticPDFData } from './pdf-templates';

export interface PDFGenerationInput {
  clientId: string;
  clientName: string;
  scores: {
    desalinhamento: number;
    ruido: number;
    vazamento: number;
    maturidade: number;
    total: number;
  };
  verdadeNucleo: string;
  hipotese: string;
  sessionDate: Date;
  sessionTime: string;
  sessionLink?: string;
  contactEmail?: string;
}

/**
 * Gera PDF de diagnóstico
 * Retorna stream do PDF para ser enviado como attachment ou salvo em storage
 */
export async function generateDiagnosticPDF(
  input: PDFGenerationInput
): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({
        bufferPages: true,
        margins: 0,
      });

      const chunks: Buffer[] = [];

      doc.on('data', (chunk) => chunks.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(chunks)));
      doc.on('error', (err) => reject(err));

      const data: DiagnosticPDFData = {
        clientId: input.clientId,
        clientName: input.clientName,
        date: new Date(),
        scores: input.scores,
        verdadeNucleo: input.verdadeNucleo,
        hipotese: input.hipotese,
        sessionDate: input.sessionDate,
        sessionTime: input.sessionTime,
        sessionLink: input.sessionLink,
        contactEmail: input.contactEmail || 'contato@genialidade.ai',
      };

      DiagnosticPDFTemplate.generatePDF(doc, data);
      doc.end();
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * Valida que todos os campos necessários estão presentes
 */
export function validatePDFInput(input: Partial<PDFGenerationInput>): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!input.clientId) errors.push('clientId é obrigatório');
  if (!input.clientName) errors.push('clientName é obrigatório');
  if (!input.scores) errors.push('scores é obrigatório');
  if (!input.verdadeNucleo) errors.push('verdadeNucleo é obrigatório');
  if (!input.hipotese) errors.push('hipotese é obrigatório');
  if (!input.sessionDate) errors.push('sessionDate é obrigatório');
  if (!input.sessionTime) errors.push('sessionTime é obrigatório');

  if (input.scores) {
    const { desalinhamento, ruido, vazamento, maturidade, total } = input.scores;
    if (desalinhamento === undefined) errors.push('scores.desalinhamento é obrigatório');
    if (ruido === undefined) errors.push('scores.ruido é obrigatório');
    if (vazamento === undefined) errors.push('scores.vazamento é obrigatório');
    if (maturidade === undefined) errors.push('scores.maturidade é obrigatório');
    if (total === undefined) errors.push('scores.total é obrigatório');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
