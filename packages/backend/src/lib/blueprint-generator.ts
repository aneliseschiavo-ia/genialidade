/**
 * Blueprint 7D PDF Generator
 * Story 3.3 — Blueprint 7D + Diagnóstico Final PDF (E4)
 */

import PDFDocument from 'pdfkit';
import { CadernoTemplate } from './caderno-template';

export interface BlueprintPDFData {
  clientId: string;
  clientName: string;
  sessionDate: Date;
  verdadeNucleo: string;
  premissaAntes: string;
  premissaDepois: string;
  cortes: Array<{ titulo: string; o_que: string; por_que: string; impacto: string }>;
  decisoes: Array<{ titulo: string; decisao: string; metrica: string; responsavel: string; timeline: string }>;
  plano7d: Array<{ dia: number; o_que: string; quem: string }>;
  indicador: { nome: string; unidade: string; meta_7d: number; meta_90d: number };
}

const COLORS = {
  darkGreen: '#1B5E20',
  white: '#FFFFFF',
  lightGray: '#F5F5F5',
  darkGray: '#333333',
  accentGreen: '#4CAF50',
};

export async function generateBlueprintPDF(data: BlueprintPDFData): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ bufferPages: true, margins: 50 });
      const chunks: Buffer[] = [];

      doc.on('data', (chunk) => chunks.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(chunks)));
      doc.on('error', (err) => reject(err));

      // P1: Capa
      doc.rect(0, 0, doc.page.width, doc.page.height).fill(COLORS.darkGreen);
      doc.fontSize(32).fillColor(COLORS.white).text('Blueprint 7D', 50, 100, { width: 500, align: 'center' });
      doc.fontSize(16).fillColor(COLORS.accentGreen).text('Validação & Implementação', 50, 180, { width: 500, align: 'center' });
      doc.fontSize(14).fillColor(COLORS.white).text(data.clientName, 50, 300, { width: 500, align: 'center' });
      doc.fontSize(10).fillColor(COLORS.lightGray).text(new Date(data.sessionDate).toLocaleDateString('pt-BR'), 50, 350, { width: 500, align: 'center' });
      doc.fontSize(10).fillColor(COLORS.lightGray).text('___________________', 50, 500, { width: 500, align: 'center', continued: true });
      doc.fontSize(9).text('\nAssinatura Cliente', { align: 'center' });

      // P2: Verdade Núcleo
      doc.addPage();
      doc.fillColor(COLORS.darkGreen).fontSize(18).text('Verdade Núcleo', 50, 50);
      doc.moveTo(50, 80).lineTo(550, 80).stroke(COLORS.darkGreen);
      doc.fillColor(COLORS.darkGray).fontSize(12).text(data.verdadeNucleo, 50, 120, { width: 500 });

      // P3: Premissa Corrigida
      doc.addPage();
      doc.fillColor(COLORS.darkGreen).fontSize(18).text('Premissa Corrigida', 50, 50);
      doc.moveTo(50, 80).lineTo(550, 80).stroke(COLORS.darkGreen);
      doc.fontSize(11).fillColor(COLORS.darkGray).text('Antes (Fase 1):', 50, 120, { underline: true });
      doc.fontSize(10).text(data.premissaAntes, 50, 150, { width: 500 });
      doc.fontSize(11).fillColor(COLORS.darkGreen).text('Depois (Refinada):', 50, 280, { underline: true });
      doc.fontSize(10).fillColor(COLORS.darkGray).text(data.premissaDepois, 50, 310, { width: 500 });

      // P4: Cortes
      doc.addPage();
      doc.fillColor(COLORS.darkGreen).fontSize(18).text('3 Cortes Identificados', 50, 50);
      doc.moveTo(50, 80).lineTo(550, 80).stroke(COLORS.darkGreen);
      let corteY = 120;
      data.cortes.forEach((corte, idx) => {
        doc.fontSize(12).fillColor(COLORS.darkGreen).text(`${idx + 1}. ${corte.titulo}`, 50, corteY);
        corteY += 25;
        doc.fontSize(10).fillColor(COLORS.darkGray);
        doc.text(`O quê: ${corte.o_que}`, 70, corteY);
        corteY += 20;
        doc.text(`Por quê: ${corte.por_que}`, 70, corteY);
        corteY += 20;
        doc.text(`Impacto: ${corte.impacto}`, 70, corteY);
        corteY += 35;
      });

      // P5: Decisões
      doc.addPage();
      doc.fillColor(COLORS.darkGreen).fontSize(18).text('3 Decisões Definidas', 50, 50);
      doc.moveTo(50, 80).lineTo(550, 80).stroke(COLORS.darkGreen);
      let decisionY = 120;
      data.decisoes.forEach((dec, idx) => {
        doc.fontSize(12).fillColor(COLORS.darkGreen).text(`${idx + 1}. ${dec.titulo}`, 50, decisionY);
        decisionY += 25;
        doc.fontSize(10).fillColor(COLORS.darkGray);
        doc.text(`Decisão: ${dec.decisao}`, 70, decisionY);
        decisionY += 20;
        doc.text(`Métrica: ${dec.metrica}`, 70, decisionY);
        decisionY += 20;
        doc.text(`Responsável: ${dec.responsavel} | Timeline: ${dec.timeline}`, 70, decisionY);
        decisionY += 35;
      });

      // P6: Plano 7D
      doc.addPage();
      doc.fillColor(COLORS.darkGreen).fontSize(18).text('Plano 7D', 50, 50);
      doc.moveTo(50, 80).lineTo(550, 80).stroke(COLORS.darkGreen);
      let planoY = 120;
      data.plano7d.forEach((item) => {
        doc.fontSize(11).fillColor(COLORS.darkGreen).text(`Dia ${item.dia}: ${item.o_que}`, 50, planoY);
        planoY += 20;
        doc.fontSize(9).fillColor(COLORS.darkGray).text(`→ Responsável: ${item.quem}`, 70, planoY);
        planoY += 25;
      });

      // P7: Indicador + Check-in
      doc.addPage();
      doc.fillColor(COLORS.darkGreen).fontSize(18).text('Indicador Crítico', 50, 50);
      doc.moveTo(50, 80).lineTo(550, 80).stroke(COLORS.darkGreen);
      doc.fontSize(12).fillColor(COLORS.darkGray).text(`Métrica: ${data.indicador.nome}`, 50, 120);
      doc.text(`Meta 7D: ${data.indicador.meta_7d} ${data.indicador.unidade}`, 50, 150);
      doc.text(`Meta 90D: ${data.indicador.meta_90d} ${data.indicador.unidade}`, 50, 180);
      doc.fontSize(11).fillColor(COLORS.darkGreen).text('Check-in Semanal (5 campos):', 50, 240, { underline: true });
      doc.fontSize(10).fillColor(COLORS.darkGray);
      doc.text('1. Indicador da Semana: __________', 50, 270);
      doc.text('2. Ações Executadas: ☐ Ação 1 ☐ Ação 2 ☐ Ação 3', 50, 300);
      doc.text('3. Bloqueadores: _________________________________', 50, 330);
      doc.text('4. Aprendizados: ________________________________', 50, 360);
      doc.text('5. Próxima Semana: _______________________________', 50, 390);

      doc.end();
    } catch (error) {
      reject(error);
    }
  });
}
