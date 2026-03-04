'use client';

import React from 'react';
import styles from '@/styles/score-visual.module.css';

interface ScoreVisualProps {
  desalinhamento: number;
  ruido: number;
  vazamento: number;
  maturidade: number;
  total: number;
}

function getColorClass(score: number): string {
  if (score <= 2) return styles.scoreRed;
  if (score <= 4) return styles.scoreYellow;
  return styles.scoreGreen;
}

export function ScoreVisual({
  desalinhamento,
  ruido,
  vazamento,
  maturidade,
  total,
}: ScoreVisualProps) {
  const dimensions = [
    {
      label: 'Desalinhamento',
      subtitle: 'Estrutura vs Realidade',
      value: desalinhamento,
    },
    {
      label: 'Ruído',
      subtitle: 'Prioridades Conflitantes',
      value: ruido,
    },
    {
      label: 'Vazamento',
      subtitle: 'Drenagem Financeira',
      value: vazamento,
    },
    {
      label: 'Maturidade',
      subtitle: 'Disposição para Mudança',
      value: maturidade,
    },
  ];

  return (
    <div className={styles.container}>
      {/* Total Score - Destaque */}
      <div className={styles.totalScoreSection}>
        <h2 className={styles.totalScoreLabel}>Seu Score Total</h2>
        <div className={styles.totalScore}>
          <span className={styles.totalScoreValue}>{total.toFixed(1)}</span>
          <span className={styles.totalScoreMax}>/20</span>
        </div>
        <p className={styles.totalScoreDescription}>
          Baseado em suas respostas às 28 questões
        </p>
      </div>

      {/* 4 Dimensões */}
      <div className={styles.dimensionsGrid}>
        {dimensions.map((dim) => (
          <div key={dim.label} className={styles.dimensionCard}>
            <div className={styles.dimensionHeader}>
              <h3 className={styles.dimensionLabel}>{dim.label}</h3>
              <p className={styles.dimensionSubtitle}>{dim.subtitle}</p>
            </div>

            {/* Score Bar */}
            <div className={styles.scoreBarContainer}>
              <div className={styles.scoreBarBackground}>
                <div
                  className={`${styles.scoreBarFill} ${getColorClass(dim.value)}`}
                  style={{
                    width: `${(dim.value / 5) * 100}%`,
                  }}
                />
              </div>
              <span className={styles.scoreValue}>{dim.value.toFixed(1)}/5</span>
            </div>

            {/* Score Interpretation */}
            <p className={styles.scoreInterpretation}>
              {dim.value <= 2 && 'Crítico — Requer ação imediata'}
              {dim.value > 2 && dim.value <= 4 && 'Em progresso — Melhorias necessárias'}
              {dim.value > 4 && 'Saudável — Continue monitorando'}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
