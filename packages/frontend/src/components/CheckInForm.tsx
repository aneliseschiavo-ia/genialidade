'use client';

import { useState } from 'react';
import styles from '@/styles/check-in-form.module.css';

interface CheckInData {
  week: number;
  indicador_value: number;
  acoes_done: boolean[];
  bloqueadores: string;
  aprendizados: string;
  proxima_semana: string;
}

export function CheckInForm({ week, acoes }: { week: number; acoes: string[] }) {
  const [data, setData] = useState<CheckInData>({
    week,
    indicador_value: 0,
    acoes_done: [false, false, false],
    bloqueadores: '',
    aprendizados: '',
    proxima_semana: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    if (!data.indicador_value || data.acoes_done.every((a) => !a) || !data.proxima_semana) {
      alert('Por favor, preencha os campos obrigatórios');
      return;
    }

    try {
      await fetch('/api/check-ins', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      setSubmitted(true);
    } catch (err) {
      console.error('Erro ao salvar check-in:', err);
    }
  };

  if (submitted) {
    return (
      <div className={styles.container}>
        <div className={styles.success}>✅ Check-in salvo com sucesso! Você receberá feedback em 24h.</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1>Check-in Semana {week}</h1>

      {/* Campo 1: Indicador */}
      <div className={styles.field}>
        <label>
          <span className={styles.required}>*</span> Qual foi o valor do seu indicador crítico essa semana?
        </label>
        <input
          type="number"
          placeholder="Ex: 250"
          value={data.indicador_value || ''}
          onChange={(e) => setData({ ...data, indicador_value: parseFloat(e.target.value) || 0 })}
          className={styles.input}
        />
      </div>

      {/* Campo 2: Ações */}
      <div className={styles.field}>
        <label>
          <span className={styles.required}>*</span> Você executou as 3 ações do plano?
        </label>
        <div className={styles.checkboxes}>
          {acoes.map((acao, idx) => (
            <label key={idx} className={styles.checkbox}>
              <input
                type="checkbox"
                checked={data.acoes_done[idx] || false}
                onChange={(e) => {
                  const newAcoes = [...data.acoes_done];
                  newAcoes[idx] = e.target.checked;
                  setData({ ...data, acoes_done: newAcoes });
                }}
              />
              <span>{acao}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Campo 3: Bloqueadores */}
      <div className={styles.field}>
        <label>O que foi mais difícil essa semana? (opcional)</label>
        <textarea
          placeholder="Descreva os bloqueadores..."
          maxLength={200}
          value={data.bloqueadores}
          onChange={(e) => setData({ ...data, bloqueadores: e.target.value })}
          className={styles.textarea}
        />
        <span className={styles.charCount}>{data.bloqueadores.length}/200</span>
      </div>

      {/* Campo 4: Aprendizados */}
      <div className={styles.field}>
        <label>1 coisa que você aprendeu que pode escalar? (opcional)</label>
        <textarea
          placeholder="Compartilhe um aprendizado..."
          maxLength={200}
          value={data.aprendizados}
          onChange={(e) => setData({ ...data, aprendizados: e.target.value })}
          className={styles.textarea}
        />
        <span className={styles.charCount}>{data.aprendizados.length}/200</span>
      </div>

      {/* Campo 5: Próxima Semana */}
      <div className={styles.field}>
        <label>
          <span className={styles.required}>*</span> Qual é o foco principal para próxima semana?
        </label>
        <textarea
          placeholder="Defina seu foco..."
          maxLength={100}
          value={data.proxima_semana}
          onChange={(e) => setData({ ...data, proxima_semana: e.target.value })}
          className={styles.textarea}
        />
        <span className={styles.charCount}>{data.proxima_semana.length}/100</span>
      </div>

      {/* Botão Submit */}
      <button onClick={handleSubmit} className={styles.submitButton}>
        Enviar Check-in
      </button>
    </div>
  );
}
