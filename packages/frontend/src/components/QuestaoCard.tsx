'use client';

import { Questao } from './FormularioDiagnostico';
import styles from '@/styles/questao-card.module.css';

interface QuestaoCardProps {
  questao: Questao;
  resposta?: number | string;
  onChange: (questaoId: number, valor: number | string) => void;
}

export function QuestaoCard({ questao, resposta, onChange }: QuestaoCardProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const valor = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked ? 1 : 0 : e.target.value;
    onChange(questao.id, valor);
  };

  const isResponded = resposta !== undefined && resposta !== '';
  const respostaNumerica = typeof resposta === 'string' ? parseInt(resposta) : resposta;

  return (
    <div className={`${styles.card} ${isResponded ? styles.respondida : ''}`}>
      <div className={styles.header}>
        <label htmlFor={`q-${questao.id}`} className={styles.pergunta}>
          Q{questao.ordem}. {questao.pergunta}
        </label>
        {isResponded && <span className={styles.badge}>✓</span>}
      </div>

      <div className={styles.inputContainer}>
        {questao.tipo === 'likert' && (
          <div className={styles.likertContainer}>
            {[1, 2, 3, 4, 5].map((valor) => (
              <label key={valor} className={styles.likertLabel}>
                <input
                  type="radio"
                  name={`q-${questao.id}`}
                  value={valor}
                  checked={respostaNumerica === valor}
                  onChange={handleChange}
                  className={styles.radioInput}
                />
                <span className={styles.likertValue}>{valor}</span>
              </label>
            ))}
          </div>
        )}

        {questao.tipo === 'sim-nao' && (
          <div className={styles.simNaoContainer}>
            {['Sim', 'Não'].map((opcao) => (
              <label key={opcao} className={styles.checkboxLabel}>
                <input
                  type="radio"
                  name={`q-${questao.id}`}
                  value={opcao === 'Sim' ? 1 : 0}
                  checked={respostaNumerica === (opcao === 'Sim' ? 1 : 0)}
                  onChange={handleChange}
                  className={styles.radioInput}
                />
                <span>{opcao}</span>
              </label>
            ))}
          </div>
        )}

        {questao.tipo === 'multipla' && questao.opcoes && (
          <select
            id={`q-${questao.id}`}
            value={resposta || ''}
            onChange={handleChange}
            className={styles.selectInput}
          >
            <option value="">Selecione uma opção</option>
            {questao.opcoes.map((opcao, idx) => (
              <option key={idx} value={opcao}>
                {opcao}
              </option>
            ))}
          </select>
        )}
      </div>
    </div>
  );
}
