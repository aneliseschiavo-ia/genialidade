'use client';

import React, { useState } from 'react';
import styles from '@/styles/agenda-sessao.module.css';

interface CheckInData {
  week: number;
  indicador_value: number;
  bloqueadores: string;
  aprendizados: string;
}

interface AgendaSessaoProps {
  sessaoNumero: number;
  dataForecast: Date;
  indicadorGrafico: { semana: number; valor: number }[];
  checkInsRecentes: CheckInData[];
  padroesBloqueadores: string;
}

export function AgendaSessaoMensal({ sessaoNumero, dataForecast, indicadorGrafico, checkInsRecentes, padroesBloqueadores }: AgendaSessaoProps) {
  const [notas, setNotas] = useState('');
  const [compromissos, setCompromisos] = useState('');

  const handleSalvarNotas = async () => {
    try {
      await fetch('/api/sessoes-mensais', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessao_numero: sessaoNumero,
          notas,
          compromissos,
        }),
      });
      alert('Notas salvas com sucesso!');
    } catch (err) {
      console.error('Erro ao salvar notas:', err);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Sessão Mensal #{sessaoNumero}</h1>
      <p className={styles.data}>{new Date(dataForecast).toLocaleDateString('pt-BR')} — 45 minutos</p>

      {/* Timeline Agenda */}
      <div className={styles.timeline}>
        <div className={styles.timelineItem}>
          <span className={styles.time}>0-5 min</span>
          <h3>Abertura</h3>
          <p>Recapitular meta da semana {checkInsRecentes.length}</p>
        </div>

        <div className={styles.timelineItem}>
          <span className={styles.time}>5-15 min</span>
          <h3>Análise Indicador</h3>
          <p>Última trajetória: {indicadorGrafico.map((d) => d.valor).join(' → ')} {checkInsRecentes[0]?.indicador_value || 0}</p>
        </div>

        <div className={styles.timelineItem}>
          <span className={styles.time}>15-25 min</span>
          <h3>Padrões Bloqueadores</h3>
          <p>Detectado: {padroesBloqueadores}</p>
        </div>

        <div className={styles.timelineItem}>
          <span className={styles.time}>25-35 min</span>
          <h3>Ajustes Plano</h3>
          <p>Revisar cortes/decisões, necessário ajuste?</p>
        </div>

        <div className={styles.timelineItem}>
          <span className={styles.time}>35-40 min</span>
          <h3>Próximos 4 Passos</h3>
          <p>Definir foco para próximas 4 semanas</p>
        </div>

        <div className={styles.timelineItem}>
          <span className={styles.time}>40-45 min</span>
          <h3>Encerramento</h3>
          <p>Compromissos + próxima revisão agendada</p>
        </div>
      </div>

      {/* Notas */}
      <div className={styles.notasSection}>
        <label>
          <h3>Notas Sessão</h3>
          <textarea
            value={notas}
            onChange={(e) => setNotas(e.target.value)}
            placeholder="Documentar insights, decisões, ajustes..."
            className={styles.textarea}
          />
        </label>
      </div>

      {/* Compromissos */}
      <div className={styles.compromissosSection}>
        <label>
          <h3>Cliente se compromete a...</h3>
          <textarea
            value={compromissos}
            onChange={(e) => setCompromisos(e.target.value)}
            placeholder="1-2 ações para próxima semana..."
            className={styles.textarea}
          />
        </label>
      </div>

      <button onClick={handleSalvarNotas} className={styles.saveButton}>
        Salvar Notas da Sessão
      </button>
    </div>
  );
}
