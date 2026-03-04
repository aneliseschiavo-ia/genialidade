import PDFDocument from 'pdfkit';

export interface DiagnosticPDFData {
  clientId: string;
  clientName: string;
  date: Date;
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
  contactEmail: string;
}

const COLORS = {
  darkGreen: '#1B5E20',
  white: '#FFFFFF',
  lightGray: '#F5F5F5',
  darkGray: '#333333',
  accentGreen: '#4CAF50',
};

export class DiagnosticPDFTemplate {
  /**
   * Gera PDF de diagnóstico com 5 páginas
   */
  static generatePDF(doc: PDFDocument, data: DiagnosticPDFData): void {
    this.page1Cover(doc, data);
    doc.addPage();
    this.page2ExecutiveSummary(doc, data);
    doc.addPage();
    this.page3Scores(doc, data);
    doc.addPage();
    this.page4Hypothesis(doc, data);
    doc.addPage();
    this.page5NextSteps(doc, data);
  }

  /**
   * P1: Capa
   */
  private static page1Cover(doc: PDFDocument, data: DiagnosticPDFData): void {
    // Background verde escuro
    doc.rect(0, 0, doc.page.width, doc.page.height).fill(COLORS.darkGreen);

    // Logo/Título (simulado)
    doc.fontSize(14).fillColor(COLORS.white).text('GENIALIDADE', 50, 100, {
      width: 500,
      align: 'center',
    });

    doc.moveTo(150, 140).lineTo(450, 140).stroke(COLORS.white);

    // Título principal
    doc.fontSize(32)
      .fillColor(COLORS.white)
      .text('Diagnóstico Neural', 50, 200, {
        width: 500,
        align: 'center',
      })
      .text('Estruturado', 50, 250, {
        width: 500,
        align: 'center',
      });

    // Nome cliente
    doc.fontSize(24)
      .fillColor(COLORS.accentGreen)
      .text(data.clientName, 50, 360, {
        width: 500,
        align: 'center',
      });

    // Data
    doc.fontSize(12)
      .fillColor(COLORS.white)
      .text(new Date(data.date).toLocaleDateString('pt-BR'), 50, 450, {
        width: 500,
        align: 'center',
      });

    // Footer
    doc.fontSize(10)
      .fillColor(COLORS.lightGray)
      .text(
        'Uma análise estruturada da realidade operacional do seu negócio',
        50,
        700,
        {
          width: 500,
          align: 'center',
        }
      );
  }

  /**
   * P2: Resumo Executivo
   */
  private static page2ExecutiveSummary(
    doc: PDFDocument,
    data: DiagnosticPDFData
  ): void {
    doc.fillColor(COLORS.darkGreen);

    // Header
    doc.fontSize(18).text('Resumo Executivo', 50, 50);
    doc.moveTo(50, 80).lineTo(550, 80).stroke(COLORS.darkGreen);

    // Verdade Núcleo (destaque)
    doc.fontSize(14).fillColor(COLORS.darkGray);
    doc.text('Sua Verdade Núcleo:', 50, 120, { underline: true });

    doc.fontSize(16)
      .fillColor(COLORS.darkGreen)
      .text(data.verdadeNucleo, 50, 160, {
        width: 500,
        align: 'left',
      });

    // Contexto
    doc.fontSize(11)
      .fillColor(COLORS.darkGray)
      .text(
        'Este diagnóstico identifica o padrão raiz que está drenando eficiência da sua operação. ' +
          'Não é apenas um problema isolado — é uma cadeia de decisões, estruturas e prioridades que ' +
          'reforçam o mesmo padrão repetidamente.',
        50,
        280,
        {
          width: 500,
          align: 'left',
        }
      );

    // Nota importante
    doc.fontSize(10)
      .fillColor('#D32F2F')
      .text(
        'Este diagnóstico é baseado em sua resposta a 28 questões estruturadas. ' +
          'A próxima etapa é validar essa verdade em uma conversa ao vivo.',
        50,
        400,
        {
          width: 500,
          align: 'left',
        }
      );
  }

  /**
   * P3: Scores detalhados
   */
  private static page3Scores(doc: PDFDocument, data: DiagnosticPDFData): void {
    doc.fillColor(COLORS.darkGreen);

    // Header
    doc.fontSize(18).text('Seus Scores', 50, 50);
    doc.moveTo(50, 80).lineTo(550, 80).stroke(COLORS.darkGreen);

    const scoreY = 120;
    const lineHeight = 100;
    const barWidth = 300;
    const barHeight = 20;

    // Dimensão 1: Desalinhamento
    doc.fontSize(12)
      .fillColor(COLORS.darkGray)
      .text('Desalinhamento (Estrutura vs Realidade)', 50, scoreY);
    this.drawScoreBar(doc, data.scores.desalinhamento, 50, scoreY + 25, barWidth, barHeight);
    doc.fontSize(10)
      .fillColor(COLORS.darkGray)
      .text(`${(data.scores.desalinhamento * 20).toFixed(1)}/100`, 400, scoreY + 25);

    // Dimensão 2: Ruído
    doc.fontSize(12)
      .fillColor(COLORS.darkGray)
      .text('Ruído (Prioridades Conflitantes)', 50, scoreY + lineHeight);
    this.drawScoreBar(
      doc,
      data.scores.ruido,
      50,
      scoreY + lineHeight + 25,
      barWidth,
      barHeight
    );
    doc.fontSize(10)
      .fillColor(COLORS.darkGray)
      .text(`${(data.scores.ruido * 20).toFixed(1)}/100`, 400, scoreY + lineHeight + 25);

    // Dimensão 3: Vazamento
    doc.fontSize(12)
      .fillColor(COLORS.darkGray)
      .text('Vazamento (Drenagem Financeira)', 50, scoreY + lineHeight * 2);
    this.drawScoreBar(
      doc,
      data.scores.vazamento,
      50,
      scoreY + lineHeight * 2 + 25,
      barWidth,
      barHeight
    );
    doc.fontSize(10)
      .fillColor(COLORS.darkGray)
      .text(`${(data.scores.vazamento * 20).toFixed(1)}/100`, 400, scoreY + lineHeight * 2 + 25);

    // Dimensão 4: Maturidade
    doc.fontSize(12)
      .fillColor(COLORS.darkGray)
      .text('Maturidade (Disposição para Mudança)', 50, scoreY + lineHeight * 3);
    this.drawScoreBar(
      doc,
      data.scores.maturidade,
      50,
      scoreY + lineHeight * 3 + 25,
      barWidth,
      barHeight
    );
    doc.fontSize(10)
      .fillColor(COLORS.darkGray)
      .text(`${(data.scores.maturidade * 20).toFixed(1)}/100`, 400, scoreY + lineHeight * 3 + 25);

    // Total Score (destaque)
    doc.fontSize(14)
      .fillColor(COLORS.darkGreen)
      .text('Score Total', 50, scoreY + lineHeight * 4 + 20, { underline: true });
    doc.fontSize(28)
      .fillColor(COLORS.accentGreen)
      .text(`${data.scores.total}/20`, 50, scoreY + lineHeight * 4 + 50);
  }

  /**
   * Helper: desenha barra de score com cor dinâmica
   */
  private static drawScoreBar(
    doc: PDFDocument,
    score: number,
    x: number,
    y: number,
    width: number,
    height: number
  ): void {
    // Background
    doc.rect(x, y, width, height).stroke(COLORS.darkGray);

    // Preenchimento baseado em score (0-5 scale)
    const fillWidth = (score / 5) * width;
    const color = score <= 2 ? '#D32F2F' : score <= 4 ? '#FBC02D' : '#4CAF50';
    doc.rect(x, y, fillWidth, height).fill(color);

    // Label
    doc.fillColor(COLORS.darkGray).fontSize(9).text(`${score.toFixed(1)}/5`, x + 10, y + 5);
  }

  /**
   * P4: Hipótese estruturada
   */
  private static page4Hypothesis(
    doc: PDFDocument,
    data: DiagnosticPDFData
  ): void {
    doc.fillColor(COLORS.darkGreen);

    // Header
    doc.fontSize(18).text('Hipótese Estruturada', 50, 50);
    doc.moveTo(50, 80).lineTo(550, 80).stroke(COLORS.darkGreen);

    // Hipótese
    doc.fontSize(12)
      .fillColor(COLORS.darkGray)
      .text('Padrão Detectado:', 50, 120, { underline: true });

    doc.fontSize(11)
      .fillColor(COLORS.darkGray)
      .text(data.hipotese, 50, 150, {
        width: 500,
        align: 'left',
      });

    // Implicações
    doc.fontSize(12)
      .fillColor(COLORS.darkGray)
      .text('Implicações Operacionais:', 50, 350, { underline: true });

    const implications = [
      '• Decisões ficam mais lentas porque faltam critérios claros',
      '• Equipe fica sobrecarregada tentando perseguir múltiplas prioridades',
      '• Margens caem porque não há rigor sobre onde o dinheiro vai',
      '• Escalação fica difícil porque não há processo claro',
    ];

    let implY = 380;
    implications.forEach((imp) => {
      doc.fontSize(10)
        .fillColor(COLORS.darkGray)
        .text(imp, 50, implY, {
          width: 500,
        });
      implY += 25;
    });
  }

  /**
   * P5: Próximos passos
   */
  private static page5NextSteps(
    doc: PDFDocument,
    data: DiagnosticPDFData
  ): void {
    doc.fillColor(COLORS.darkGreen);

    // Header
    doc.fontSize(18).text('Próximos Passos', 50, 50);
    doc.moveTo(50, 80).lineTo(550, 80).stroke(COLORS.darkGreen);

    // Sessão 1:1
    doc.fontSize(12)
      .fillColor(COLORS.darkGreen)
      .text('Sessão de Validação — 1:1', 50, 120, { underline: true });

    doc.fontSize(11)
      .fillColor(COLORS.darkGray)
      .text(`Data: ${new Date(data.sessionDate).toLocaleDateString('pt-BR')}`, 50, 150);
    doc.text(`Hora: ${data.sessionTime}`, 50, 170);

    if (data.sessionLink) {
      doc.fontSize(10)
        .fillColor('#1976D2')
        .text(`Link: ${data.sessionLink}`, 50, 190, { link: data.sessionLink });
    }

    // O que levar
    doc.fontSize(12)
      .fillColor(COLORS.darkGreen)
      .text('Preparação — O que levar:', 50, 250, { underline: true });

    const checklist = [
      'Últimos 3 meses de P&L (ou dados financeiros recentes)',
      '2 maiores desafios enfrentados nas últimas 2 semanas',
      '1 meta que você quer alcançar em 90 dias',
      'Calendário disponível para semanas 1 e 2 de março',
    ];

    let checkY = 280;
    checklist.forEach((item) => {
      doc.fontSize(10)
        .fillColor(COLORS.darkGray)
        .text(`☐ ${item}`, 50, checkY, {
          width: 500,
        });
      checkY += 25;
    });

    // Contato
    doc.fontSize(11)
      .fillColor(COLORS.darkGray)
      .text('Dúvidas? Responda este email ou entre em contato:', 50, 450);
    doc.fontSize(10)
      .fillColor('#1976D2')
      .text(data.contactEmail, 50, 475, { link: `mailto:${data.contactEmail}` });

    // Disclaimer
    doc.fontSize(8)
      .fillColor(COLORS.darkGray)
      .text(
        'Este diagnóstico é confidencial e preparado especificamente para você. ' +
          'Não compartilhe sem autorização.',
        50,
        700,
        {
          width: 500,
        }
      );
  }
}
