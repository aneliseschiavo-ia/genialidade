'use client';

import React, { useState, useEffect } from 'react';
import styles from '@/styles/dashboard-progresso.module.css';

interface IndicadorData {
  nome: string;
  valor_inicial: number;
  valor_atual: number;
  meta_7d: number;
  meta_90d: number;
  historico: Array<{ data: string; valor: number }>;
}

interface TimelinePhase {
  nome: string;
  progresso: number; // 0-100
  status: 'completo' | 'em_progresso' | 'proximo';
}

export function DashboardProgresso() {
  const [indicador, setIndicador] = useState<IndicadorData | null>(null);
  const [loading, setLoading] = useState(true);
  const [diasRestantes, setDiasRestantes] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Simular dados para MVP
        setIndicador({
          nome: 'Receita por Hora',
          valor_inicial: 150,
          valor_atual: 165,
          meta_7d: 180,
          meta_90d: 220,
          historico: [
            { data: '2026-03-08', valor: 150 },
            { data: '2026-03-09', valor: 155 },
            { data: '2026-03-10', valor: 160 },
            { data: '2026-03-11', valor: 165 },
          ],
        });

        // Calcular dias restantes (até 90 dias)
        const inicioDate = new Date('2026-03-08');
        const agora = new Date();
        const daysElapsed = Math.floor((agora.getTime() - inicioDate.getTime()) / (1000 * 60 * 60 * 24));
        setDiasRestantes(Math.max(0, 90 - daysElapsed));
      } catch (err) {
        console.error('Erro ao carregar dashboard:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return <div className={styles.container}>Carregando...</div>;
  }

  if (!indicador) {
    return <div className={styles.container}>Erro ao carregar dados</div>;
  }

  const percentualProgresso = ((indicador.valor_atual - indicador.valor_inicial) / (indicador.meta_90d - indicador.valor_inicial)) * 100;
  const percentualMeta7D = ((indicador.valor_atual - indicador.valor_inicial) / (indicador.meta_7d - indicador.valor_inicial)) * 100;

  const phases: TimelinePhase[] = [
    { nome: 'Fase 1\nFormulário', progresso: 100, status: 'completo' },
    { nome: 'Fase 2\nSessão', progresso: 100, status: 'completo' },
    { nome: 'Plano 7D\nImplementação', progresso: percentualMeta7D, status: 'em_progresso' },
    { nome: 'Check-ins\n90D', progresso: percentualProgresso, status: 'em_progresso' },
  ];

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <h1>Seu Progresso 90D</h1>
        <p className={styles.subtitle}>{diasRestantes} dias restantes</p>
      </div>

      {/* Indicador Gráfico */}
      <section className={styles.indicadorSection}>
        <h2>📊 Indicador Crítico: {indicador.nome}</h2>

        {/* Valores */}
        <div className={styles.valoresGrid}>
          <div className={styles.valor}>
            <span className={styles.label}>Início</span>
            <span className={styles.number}>{indicador.valor_inicial}</span>
          </div>
          <div className={styles.valor}>
            <span className={styles.label}>Hoje</span>
            <span className={styles.numberCurrent}>{indicador.valor_atual}</span>
          </div>
          <div className={styles.valor}>
            <span className={styles.label}>Meta 7D</span>
            <span className={styles.numberGoal}>{indicador.meta_7d}</span>
          </div>
          <div className={styles.valor}>
            <span className={styles.label}>Meta 90D</span>
            <span className={styles.numberGoal}>{indicador.meta_90d}</span>
          </div>
        </div>

        {/* Progresso bar */}
        <div className={styles.progressContainer}>
          <div className={styles.progressBackground}>
            <div
              className={styles.progressFill}
              style={{ width: `${Math.min(percentualProgresso, 100)}%` }}
            />
          </div>
          <span className={styles.progressText}>{percentualProgresso.toFixed(1)}% para meta 90D</span>
        </div>

        {/* Histórico mini */}
        <div className={styles.historico}>
          <small>Últimos 4 dias: {indicador.historico.map((h) => `${h.valor}`).join(' → ')}</small>
        </div>
      </section>

      {/* Timeline */}
      <section className={styles.timelineSection}>
        <h2>📅 Timeline</h2>
        <div className={styles.timeline}>
          {phases.map((phase, idx) => (
            <div key={idx} className={styles.phase}>
              <div className={`${styles.phaseBox} ${styles[phase.status]}`}>
                <p className={styles.phaseName}>{phase.nome}</p>
                <div className={styles.phaseProgressBar}>
                  <div
                    className={styles.phaseProgressFill}
                    style={{ width: `${phase.progresso}%` }}
                  />
                </div>
                <p className={styles.phasePercent}>{phase.progresso.toFixed(0)}%</p>
              </div>
              {idx < phases.length - 1 && <div className={styles.phaseArrow}>→</div>}
            </div>
          ))}
        </div>
      </section>

      {/* Status Plano 7D */}
      <section className={styles.statusSection}>
        <h2>✅ Status Plano 7D</h2>
        <div className={styles.statusCheckboxes}>
          <label className={styles.checkbox}>
            <input type="checkbox" checked={true} readOnly />
            <span>Check-in enviado</span>
          </label>
          <label className={styles.checkbox}>
            <input type="checkbox" checked={false} readOnly />
            <span>Feedback recebido</span>
          </label>
          <label className={styles.checkbox}>
            <input type="checkbox" checked={true} readOnly />
            <span>Ações em execução</span>
          </label>
        </div>
      </section>

      {/* Notificações */}
      <section className={styles.notificacoes}>
        <div className={styles.notificacao}>
          ℹ️ <strong>Próxima sessão:</strong> Terça 14h — Preparar com pontos-chave de progresso
        </div>
        <div className={styles.notificacao}>
          ✅ <strong>Check-in da semana 1:</strong> Enviado com sucesso
        </div>
      </section>

      {/* CTA */}
      <div className={styles.cta}>
        <button className={styles.buttonPrimary}>
          Acessar Caderno Inteligente
        </button>
      </div>
    </div>
  );
}
