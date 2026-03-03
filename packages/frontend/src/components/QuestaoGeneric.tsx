'use client';

/**
 * QuestaoGeneric Component
 * Renderiza questão com tipo dinâmico (escala, texto, número, etc.)
 * Story 1.2: Formulário Web 28 Questões (versão com múltiplos tipos)
 *
 * Tipos suportados:
 * - escala_1_5: Radio buttons 1-5
 * - texto_livre: Textarea com placeholder + helper text
 * - numero: Input número com placeholder + helper text
 * - multipla_escolha: Radio buttons com múltiplas opções
 */

import { Questao, Resposta } from '@/types/formulario';
import styles from '@/styles/questao-generic.module.css';

interface QuestaoGenericProps {
  questao: Questao;
  respostaAtual?: Resposta;
  onMudarResposta: (valor: string | number) => void;
  dimensaoPrincipal?: string;
}

const opcoes1a5 = ['Nunca sinto isto', 'Raramente', 'Às vezes', 'Frequentemente', 'Sempre'];

export function QuestaoGeneric({
  questao,
  respostaAtual,
  onMudarResposta,
  dimensaoPrincipal,
}: QuestaoGenericProps) {
  const numeroQuestion = `q${questao.numero}`;
  const temResposta = !!respostaAtual?.valor_resposta;

  const renderPorTipo = () => {
    switch (questao.tipo) {
      case 'escala_1_5':
        return (
          <div className={styles.opcoesContainer}>
            {opcoes1a5.map((opcao, index) => {
              const valor = index + 1;
              const isSelected = respostaAtual?.valor_resposta === valor;
              return (
                <label key={valor} className={`${styles.radioOption} ${isSelected ? styles.selected : ''}`}>
                  <input
                    type="radio"
                    name={numeroQuestion}
                    value={valor}
                    checked={isSelected}
                    onChange={() => onMudarResposta(valor)}
                    aria-label={`${opcao}: ${valor} de 5`}
                  />
                  <span className={styles.radioLabel}>{opcao}</span>
                </label>
              );
            })}
          </div>
        );

      case 'texto_livre':
        return (
          <div className={styles.textoLivreContainer}>
            <textarea
              className={styles.textarea}
              name={numeroQuestion}
              placeholder={questao.placeholder || 'Digite sua resposta aqui...'}
              value={respostaAtual?.valor_resposta?.toString() || ''}
              onChange={(e) => onMudarResposta(e.target.value)}
              maxLength={questao.maxLength || 500}
              rows={4}
              aria-label={`Resposta para: ${questao.texto}`}
            />
            {questao.maxLength && (
              <p className={styles.charCount}>
                {(respostaAtual?.valor_resposta?.toString().length || 0)} / {questao.maxLength} caracteres
              </p>
            )}
            {questao.helperText && <p className={styles.helperText}>💡 {questao.helperText}</p>}
          </div>
        );

      case 'numero':
        return (
          <div className={styles.numeroContainer}>
            <input
              className={styles.numberInput}
              type="number"
              name={numeroQuestion}
              placeholder={questao.placeholder || 'Digite um número...'}
              value={respostaAtual?.valor_resposta || ''}
              onChange={(e) => onMudarResposta(e.target.value ? parseFloat(e.target.value) : '')}
              aria-label={`Número para: ${questao.texto}`}
            />
            {questao.helperText && <p className={styles.helperText}>💡 {questao.helperText}</p>}
          </div>
        );

      case 'multipla_escolha':
      default:
        return (
          <div className={styles.opcoesContainer}>
            <p className={styles.notaImplementacao}>Tipo multipla_escolha não implementado ainda</p>
          </div>
        );
    }
  };

  return (
    <div className={styles.questaoContainer}>
      {dimensaoPrincipal && (
        <div className={styles.dimensaoHeader}>
          <h2 className={styles.dimensaoTitle}>Dimensão: {dimensaoPrincipal}</h2>
        </div>
      )}

      <div className={styles.perguntaBloco}>
        <p className={styles.perguntaTexto}>{questao.texto}</p>
        {renderPorTipo()}
      </div>
    </div>
  );
}

export default QuestaoGeneric;
