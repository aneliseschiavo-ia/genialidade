'use client';

import { useState, useEffect } from 'react';
import { ScoreVisual } from './ScoreVisual';
import { SessionInfo } from './SessionInfo';
import styles from '@/styles/portal-dashboard.module.css';

interface DiagnosticData {
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
  pdfUrl?: string;
}

export function PortalDashboard() {
  const [data, setData] = useState<DiagnosticData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadDiagnosticData = async () => {
      try {
        // Obter clientId da sessão/cookie
        const sessionToken = document.cookie
          .split('; ')
          .find((row) => row.startsWith('session_token='))
          ?.split('=')[1];

        if (!sessionToken) {
          setError('Sessão não encontrada. Por favor, use o link de email.');
          setLoading(false);
          return;
        }

        // Verificar session
        const sessionRes = await fetch('/api/auth/verify-session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionToken }),
        });

        if (!sessionRes.ok) {
          setError('Sessão expirada ou inválida');
          setLoading(false);
          return;
        }

        const { clientId } = await sessionRes.json();

        // Buscar dados de diagnóstico do cliente
        const diagRes = await fetch(`/api/portal/diagnostic/${clientId}`);
        if (!diagRes.ok) {
          setError('Erro ao carregar diagnóstico');
          setLoading(false);
          return;
        }

        const diag = await diagRes.json();
        setData(diag);
      } catch (err) {
        setError('Erro ao carregar dados');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadDiagnosticData();
  }, []);

  const handleDownloadPDF = async () => {
    if (!data?.clientId) return;

    try {
      const res = await fetch(`/api/pdf/${data.clientId}`);
      if (!res.ok) throw new Error('PDF não disponível');

      const { url } = await res.json();
      window.open(url, '_blank');
    } catch (err) {
      alert('Erro ao baixar PDF');
    }
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout');
    window.location.href = '/';
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Carregando seu diagnóstico...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>{error}</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>Diagnóstico não encontrado</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.greeting}>
            Olá, <span className={styles.clientName}>{data.clientName}</span>
          </h1>
          <p className={styles.subtitle}>Seu diagnóstico neurointeligente saiu 🎯</p>
        </div>
        <button onClick={handleLogout} className={styles.logoutButton}>
          Sair
        </button>
      </header>

      {/* Verdade Núcleo - Destaque */}
      <section className={styles.verdadeNucleoSection}>
        <h2 className={styles.verdadeNucleoLabel}>Sua Verdade Núcleo</h2>
        <p className={styles.verdadeNucleoText}>{data.verdadeNucleo}</p>
      </section>

      {/* Score Visual */}
      <section className={styles.section}>
        <ScoreVisual
          desalinhamento={data.scores.desalinhamento}
          ruido={data.scores.ruido}
          vazamento={data.scores.vazamento}
          maturidade={data.scores.maturidade}
          total={data.scores.total}
        />
      </section>

      {/* Hipótese */}
      <section className={styles.hipotesesection}>
        <h2 className={styles.sectionTitleAlt}>Sua Hipótese Estruturada</h2>
        <p className={styles.hipoteseText}>{data.hipotese}</p>
      </section>

      {/* Session Info */}
      <section className={styles.section}>
        <SessionInfo
          sessionDate={new Date(data.sessionDate)}
          sessionTime={data.sessionTime}
          sessionLink={data.sessionLink}
          contactEmail="contato@genialidade.ai"
        />
      </section>

      {/* Actions */}
      <div className={styles.actions}>
        {data.pdfUrl && (
          <button onClick={handleDownloadPDF} className={styles.buttonPrimary}>
            📄 Baixar Diagnóstico em PDF
          </button>
        )}
      </div>

      {/* Footer */}
      <footer className={styles.footer}>
        <p>
          © 2026 Genialidade. Todos os direitos reservados.
        </p>
      </footer>
    </div>
  );
}
