'use client';

import { useState, useEffect, useCallback } from 'react';
import { QuestaoCard } from './QuestaoCard';
import { salvarRespostas, carregarProgresso } from '@/lib/formulario.api';
import styles from '@/styles/formulario.module.css';

export interface Questao {
  id: number;
  bloco: number;
  ordem: number;
  pergunta: string;
  tipo: 'likert' | 'sim-nao' | 'multipla';
  opcoes?: string[];
}

interface Respostas {
  [key: number]: number | string;
}

export function FormularioDiagnostico() {
  const [questoes, setQuestoes] = useState<Questao[]>([]);
  const [respostas, setRespostas] = useState<Respostas>({});
  const [loading, setLoading] = useState(true);
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  // Carregar questões do banco
  useEffect(() => {
    const carregarQuestoes = async () => {
      try {
        const response = await fetch('/api/questoes');
        if (!response.ok) throw new Error('Erro ao carregar questões');
        const data = await response.json();
        setQuestoes(data);

        // Recuperar respostas salvas
        const saved = await carregarProgresso();
        if (saved.respostas) {
          setRespostas(saved.respostas);
        }
      } catch (err) {
        setErro(err instanceof Error ? err.message : 'Erro desconhecido');
      } finally {
        setLoading(false);
      }
    };

    carregarQuestoes();
  }, []);

  // Autossalva com debounce
  const debounceSalvar = useCallback(async (novasRespostas: Respostas) => {
    try {
      await salvarRespostas(novasRespostas);
      localStorage.setItem('formulario_respostas', JSON.stringify(novasRespostas));
    } catch (err) {
      console.error('Erro ao salvar:', err);
    }
  }, []);

  const handleRespostaChange = (questaoId: number, valor: number | string) => {
    const novasRespostas = { ...respostas, [questaoId]: valor };
    setRespostas(novasRespostas);

    // Autossalva
    const timeout = setTimeout(() => {
      debounceSalvar(novasRespostas);
    }, 500);

    return () => clearTimeout(timeout);
  };

  const handleEnviar = async () => {
    if (Object.keys(respostas).length !== questoes.length) {
      setErro('Por favor, responda todas as questões');
      return;
    }

    setEnviando(true);
    try {
      const response = await fetch('/api/formularios/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ respostas }),
      });

      if (!response.ok) throw new Error('Erro ao enviar formulário');

      // Sucesso
      localStorage.removeItem('formulario_respostas');
      window.location.href = '/resultado';
    } catch (err) {
      setErro(err instanceof Error ? err.message : 'Erro ao enviar');
    } finally {
      setEnviando(false);
    }
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Carregando formulário...</div>
      </div>
    );
  }

  const perguntasRespondidasTotal = Object.keys(respostas).length;
  const percentualConclusao = (perguntasRespondidasTotal / questoes.length) * 100;

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <h1 className={styles.titulo}>Diagnóstico Estratégico</h1>
        <p className={styles.descricao}>
          Responda {questoes.length} questões cuidadosamente selecionadas para mapear sua situação
        </p>
      </div>

      {/* Barra de Progresso */}
      <div className={styles.progressContainer}>
        <div className={styles.progressBar}>
          <div className={styles.progressFill} style={{ width: `${percentualConclusao}%` }} />
        </div>
        <span className={styles.progressText}>
          {perguntasRespondidasTotal} de {questoes.length} questões
        </span>
      </div>

      {/* Mensagem de Erro */}
      {erro && <div className={styles.erro}>{erro}</div>}

      {/* Questões agrupadas por bloco */}
      <div className={styles.questoesContainer}>
        {[1, 2, 3, 4, 5, 6].map((bloco) => (
          <div key={bloco} className={styles.bloco}>
            <h2 className={styles.blocoTitulo}>Bloco {bloco}</h2>
            {questoes
              .filter((q) => q.bloco === bloco)
              .sort((a, b) => a.ordem - b.ordem)
              .map((questao) => (
                <QuestaoCard
                  key={questao.id}
                  questao={questao}
                  resposta={respostas[questao.id]}
                  onChange={handleRespostaChange}
                />
              ))}
          </div>
        ))}
      </div>

      {/* CTA - Botão Enviar */}
      <div className={styles.ctaContainer}>
        <button
          className={styles.botaoEnviar}
          onClick={handleEnviar}
          disabled={perguntasRespondidasTotal !== questoes.length || enviando}
          aria-label={
            perguntasRespondidasTotal !== questoes.length
              ? `Responda todas as questões para continuar. ${questoes.length - perguntasRespondidasTotal} restantes`
              : 'Enviar respostas e receber diagnóstico'
          }
        >
          {enviando ? 'Processando...' : 'Enviar Respostas'}
        </button>
        <p className={styles.ctaTexto}>
          {perguntasRespondidasTotal === questoes.length
            ? 'Você completou! Clique para enviar.'
            : `${questoes.length - perguntasRespondidasTotal} questões restantes`}
        </p>
      </div>
    </div>
  );
}
