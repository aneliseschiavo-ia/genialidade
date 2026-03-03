'use client';

/**
 * FormularioDiagnostico Component
 * Manages form state, autosave, and progression
 * Story 1.2: Formulário Web 28 Questões
 */

import { useEffect, useState, useCallback } from 'react';
import { Questao, Resposta, ProgressoFormulario } from '@/types/formulario';
import {
  carregarQuestoes,
  carregarRespostasExistentes,
  salvarResposta,
  calcularProgresso,
  enviarRespostas,
  obterOuCriarSessao,
  criarFuncaoAutosaveComDebounce,
} from '@/lib/formulario.api';
import QuestaoGeneric from './QuestaoGeneric';
import { questoes28 } from '@/data/questoes-28';
import styles from '@/styles/formulario.module.css';

export function FormularioDiagnostico() {
  const [questoes, setQuestoes] = useState<Questao[]>([]);
  const [respostas, setRespostas] = useState<Map<number, Resposta>>(new Map());
  const [progresso, setProgresso] = useState<ProgressoFormulario | null>(null);
  const [clienteId, setClienteId] = useState<string>('');
  const [carregando, setCarregando] = useState(true);
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [questaoAtual, setQuestaoAtual] = useState(0);

  // Debounced autosave function
  const autosaveDebounced = useCallback(
    criarFuncaoAutosaveComDebounce((resposta: Resposta) => salvarResposta(resposta), 300),
    []
  );

  // Initialize form
  useEffect(() => {
    const inicializar = async () => {
      try {
        setCarregando(true);

        // Get or create session
        const id = obterOuCriarSessao();
        setClienteId(id);

        // Load questions (from local data or API)
        // Using local questoes28 for now; can be replaced with API call
        const questoesCarregadas = (questoes28 as unknown as Questao[]);
        setQuestoes(questoesCarregadas);

        // Try to load existing responses from API
        // If API fails, continue with empty responses
        try {
          const respostasExistentes = await carregarRespostasExistentes(id);
          const respostasMap = new Map(respostasExistentes.map((r) => [r.questao_id, r]));
          setRespostas(respostasMap);
          const prog = calcularProgresso(respostasExistentes);
          setProgresso(prog);
        } catch (apiError) {
          console.warn('Could not load responses from API, starting fresh:', apiError);
          setProgresso(calcularProgresso([]));
        }
      } catch (error) {
        console.error('Error initializing form:', error);
        setErro('Erro ao carregar formulário. Tente novamente.');
      } finally {
        setCarregando(false);
      }
    };

    inicializar();
  }, []);

  // Handle response change
  const handleMudarResposta = useCallback(
    (questaoId: number, valor: number) => {
      const novaResposta: Resposta = {
        cliente_id: clienteId,
        questao_id: questaoId,
        valor_resposta: valor,
      };

      // Update local state
      const novasRespostas = new Map(respostas);
      novasRespostas.set(questaoId, novaResposta);
      setRespostas(novasRespostas);

      // Update progress
      const prog = calcularProgresso(Array.from(novasRespostas.values()));
      setProgresso(prog);

      // Autosave
      autosaveDebounced(novaResposta);
    },
    [clienteId, respostas, autosaveDebounced]
  );

  // Handle form submission
  const handleEnviar = async () => {
    if (!progresso?.pode_enviar || !clienteId) {
      setErro('Por favor, preencha todas as 28 questões antes de enviar.');
      return;
    }

    try {
      setEnviando(true);
      await enviarRespostas(clienteId, Array.from(respostas.values()));

      // Success feedback
      alert('✅ Seu diagnóstico foi enviado com sucesso!');
      // TODO: Redirect to results page
    } catch (error) {
      console.error('Error submitting form:', error);
      setErro('Erro ao enviar formulário. Tente novamente.');
    } finally {
      setEnviando(false);
    }
  };

  // Loading state
  if (carregando) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingState}>
          <p>Carregando seu diagnóstico...</p>
        </div>
      </div>
    );
  }

  if (questoes.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.errorState}>
          <p>❌ Erro: Não foi possível carregar o formulário.</p>
        </div>
      </div>
    );
  }

  const questaoExibida = questoes[questaoAtual];
  const respostaExibida = respostas.get(questaoExibida.id);
  const podeAvançar = questaoAtual < questoes.length - 1 && !!respostaExibida;
  const podeVoltar = questaoAtual > 0;

  return (
    <div className={styles.container}>
      <div className={styles.formularioWrapper}>
        {/* Header */}
        <div className={styles.header}>
          <h1 className={styles.titulo}>Seu Diagnóstico Neural Estruturado</h1>

          {/* Progress Bar */}
          <div className={styles.progressContainer}>
            <div className={styles.progressBar}>
              <div
                className={styles.progressFill}
                style={{
                  width: `${progresso?.percentual || 0}%`,
                  transition: 'width 300ms ease',
                }}
              />
            </div>
            <p className={styles.progressText}>
              {progresso?.questoes_preenchidas} de {progresso?.total_questoes}
            </p>
          </div>
        </div>

        {/* Error Message */}
        {erro && <div className={styles.errorMessage}>{erro}</div>}

        {/* Current Question */}
        <QuestaoGeneric
          questao={questaoExibida}
          respostaAtual={respostaExibida}
          onMudarResposta={(valor) => handleMudarResposta(questaoExibida.id, valor)}
          dimensaoPrincipal={questaoAtual === 0 ? questaoExibida.dimensao : undefined}
        />

        {/* Navigation Buttons */}
        <div className={styles.buttonContainer}>
          <button
            className={`${styles.buttonSecondary} ${!podeVoltar ? styles.disabled : ''}`}
            onClick={() => setQuestaoAtual(Math.max(0, questaoAtual - 1))}
            disabled={!podeVoltar}
          >
            ← Anterior
          </button>

          {questaoAtual < questoes.length - 1 ? (
            <button
              className={`${styles.buttonPrimary} ${!podeAvançar ? styles.disabled : ''}`}
              onClick={() => setQuestaoAtual(questaoAtual + 1)}
              disabled={!podeAvançar}
            >
              Próxima →
            </button>
          ) : (
            <button
              className={`${styles.buttonPrimary} ${!progresso?.pode_enviar ? styles.disabled : ''}`}
              onClick={handleEnviar}
              disabled={!progresso?.pode_enviar || enviando}
            >
              {enviando ? 'Enviando...' : 'Enviar Respostas'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default FormularioDiagnostico;
