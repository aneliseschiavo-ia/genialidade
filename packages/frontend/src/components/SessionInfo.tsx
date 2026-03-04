'use client';

import React from 'react';
import styles from '@/styles/session-info.module.css';

interface SessionInfoProps {
  sessionDate: Date;
  sessionTime: string;
  sessionLink?: string;
  contactEmail?: string;
}

export function SessionInfo({
  sessionDate,
  sessionTime,
  sessionLink,
  contactEmail = 'contato@genialidade.ai',
}: SessionInfoProps) {
  const formattedDate = new Date(sessionDate).toLocaleDateString('pt-BR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const checklist = [
    'Últimos 3 meses de P&L ou dados financeiros',
    '2 maiores desafios das últimas 2 semanas',
    '1 meta que você quer alcançar em 90 dias',
    'Calendário disponível para semanas 1 e 2 de março',
  ];

  return (
    <div className={styles.container}>
      {/* Sessão 1:1 */}
      <section className={styles.session}>
        <h2 className={styles.sectionTitle}>Sua Sessão de Validação</h2>

        <div className={styles.sessionDetails}>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>📅 Data</span>
            <span className={styles.detailValue}>{formattedDate}</span>
          </div>

          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>🕐 Hora</span>
            <span className={styles.detailValue}>{sessionTime}</span>
          </div>

          {sessionLink && (
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>🔗 Link da Reunião</span>
              <a href={sessionLink} target="_blank" rel="noopener noreferrer"
                 className={styles.detailLink}>
                Entrar no Zoom
              </a>
            </div>
          )}
        </div>
      </section>

      {/* Preparação */}
      <section className={styles.preparation}>
        <h2 className={styles.sectionTitle}>Preparação — O que Levar</h2>
        <p className={styles.preparationDescription}>
          Para que a sessão seja mais produtiva, favor preparar:
        </p>

        <div className={styles.checklistContainer}>
          {checklist.map((item, index) => (
            <div key={index} className={styles.checklistItem}>
              <input
                type="checkbox"
                id={`checklist-${index}`}
                className={styles.checkbox}
              />
              <label htmlFor={`checklist-${index}`} className={styles.checklistLabel}>
                {item}
              </label>
            </div>
          ))}
        </div>
      </section>

      {/* Contato */}
      <section className={styles.contact}>
        <h2 className={styles.sectionTitle}>Dúvidas?</h2>
        <p className={styles.contactText}>
          Responda este email ou entre em contato conosco
        </p>
        <a href={`mailto:${contactEmail}`} className={styles.contactLink}>
          {contactEmail}
        </a>
      </section>

      {/* Disclaimer */}
      <div className={styles.disclaimer}>
        <p>
          Este diagnóstico é confidencial e preparado especificamente para você.
          Não compartilhe sem autorização.
        </p>
      </div>
    </div>
  );
}
