import { supabase } from '../lib/supabase';

const questoes28 = [
  // BLOCO 1 — ESTRUTURA ATUAL (5 questões)
  {
    numero: 1,
    dimensao: 'ESTRUTURA',
    texto: 'Qual é seu faturamento médio mensal?',
    tipo: 'numero',
  },
  {
    numero: 2,
    dimensao: 'ESTRUTURA',
    texto: 'Qual é sua principal fonte de receita hoje?',
    tipo: 'texto_livre',
  },
  {
    numero: 3,
    dimensao: 'ESTRUTURA',
    texto: 'Quantas ofertas ativas você possui?',
    tipo: 'numero',
  },
  {
    numero: 4,
    dimensao: 'ESTRUTURA',
    texto: 'Você acompanha margem por produto?',
    tipo: 'escala_1_5',
  },
  {
    numero: 5,
    dimensao: 'ESTRUTURA',
    texto: 'Seu negócio possui planejamento formal mensal?',
    tipo: 'escala_1_5',
  },

  // BLOCO 2 — DIREÇÃO E PRIORIDADE (5 questões)
  {
    numero: 6,
    dimensao: 'PRIORIDADE',
    texto: 'Como você define suas prioridades semanais?',
    tipo: 'texto_livre',
  },
  {
    numero: 7,
    dimensao: 'PRIORIDADE',
    texto: 'Existe um critério objetivo para decidir o que não fazer?',
    tipo: 'escala_1_5',
  },
  {
    numero: 8,
    dimensao: 'PRIORIDADE',
    texto: 'Qual projeto está parado há mais de 90 dias?',
    tipo: 'texto_livre',
  },
  {
    numero: 9,
    dimensao: 'PRIORIDADE',
    texto: 'O que hoje consome tempo e não gera retorno proporcional?',
    tipo: 'texto_livre',
  },
  {
    numero: 10,
    dimensao: 'PRIORIDADE',
    texto: 'Qual decisão você vem adiando?',
    tipo: 'texto_livre',
  },

  // BLOCO 3 — COERÊNCIA ESTRATÉGICA (5 questões)
  {
    numero: 11,
    dimensao: 'COERÊNCIA',
    texto: 'Seu posicionamento é claro em uma frase?',
    tipo: 'escala_1_5',
  },
  {
    numero: 12,
    dimensao: 'COERÊNCIA',
    texto: 'Sua oferta principal resolve um problema específico?',
    tipo: 'escala_1_5',
  },
  {
    numero: 13,
    dimensao: 'COERÊNCIA',
    texto: 'Existe desalinhamento entre o que você comunica e o que entrega?',
    tipo: 'escala_1_5',
  },
  {
    numero: 14,
    dimensao: 'COERÊNCIA',
    texto: 'Seu modelo atual é escalável?',
    tipo: 'escala_1_5',
  },
  {
    numero: 15,
    dimensao: 'COERÊNCIA',
    texto: 'Você sabe exatamente onde está seu gargalo?',
    tipo: 'escala_1_5',
  },

  // BLOCO 4 — MODELO FINANCEIRO (5 questões)
  {
    numero: 16,
    dimensao: 'FINANCEIRO',
    texto: 'Qual é sua margem média?',
    tipo: 'numero',
  },
  {
    numero: 17,
    dimensao: 'FINANCEIRO',
    texto: 'Qual percentual do seu tempo é operacional?',
    tipo: 'numero',
  },
  {
    numero: 18,
    dimensao: 'FINANCEIRO',
    texto: 'Você sente que trabalha mais do que o faturamento reflete?',
    tipo: 'escala_1_5',
  },
  {
    numero: 19,
    dimensao: 'FINANCEIRO',
    texto: 'Já investiu em estratégias que não trouxeram retorno?',
    tipo: 'texto_livre',
  },
  {
    numero: 20,
    dimensao: 'FINANCEIRO',
    texto: 'Estima quanto perdeu nos últimos 12 meses com ajustes de rota?',
    tipo: 'numero',
  },

  // BLOCO 5 — PADRÃO DE DECISÃO (5 questões)
  {
    numero: 21,
    dimensao: 'PADRÃO',
    texto: 'Você muda de estratégia com frequência?',
    tipo: 'escala_1_5',
  },
  {
    numero: 22,
    dimensao: 'PADRÃO',
    texto: 'Você inicia mais projetos do que finaliza?',
    tipo: 'escala_1_5',
  },
  {
    numero: 23,
    dimensao: 'PADRÃO',
    texto: 'Você evita eliminar projetos?',
    tipo: 'escala_1_5',
  },
  {
    numero: 24,
    dimensao: 'PADRÃO',
    texto: 'Você sente que falta clareza estrutural?',
    tipo: 'escala_1_5',
  },
  {
    numero: 25,
    dimensao: 'PADRÃO',
    texto: 'Você sente que está resolvendo sintomas?',
    tipo: 'escala_1_5',
  },

  // BLOCO 6 — MATURIDADE ESTRATÉGICA (3 questões)
  {
    numero: 26,
    dimensao: 'MATURIDADE',
    texto: 'Está disposto(a) a revisar premissas fundamentais?',
    tipo: 'escala_1_5',
  },
  {
    numero: 27,
    dimensao: 'MATURIDADE',
    texto: 'Está disposto(a) a eliminar iniciativas?',
    tipo: 'escala_1_5',
  },
  {
    numero: 28,
    dimensao: 'MATURIDADE',
    texto: 'Está preparado(a) para investir em correção estrutural?',
    tipo: 'escala_1_5',
  },
];

async function seed() {
  console.log('🌱 Iniciando seed de 28 questões...');

  try {
    // Inserir questões
    const { data, error } = await supabase.from('questoes').insert(questoes28).select();

    if (error) {
      console.error('❌ Erro ao inserir questões:', error);
      process.exit(1);
    }

    console.log(`✅ ${data?.length || 0} questões inseridas com sucesso!`);
    console.log('\n📋 Dimensões:');
    const dimensoes = new Set(questoes28.map((q) => q.dimensao));
    dimensoes.forEach((dim) => {
      const count = questoes28.filter((q) => q.dimensao === dim).length;
      console.log(`  - ${dim}: ${count} questões`);
    });

    console.log('\n📊 Tipos:');
    const tipos = new Set(questoes28.map((q) => q.tipo));
    tipos.forEach((tipo) => {
      const count = questoes28.filter((q) => q.tipo === tipo).length;
      console.log(`  - ${tipo}: ${count} questões`);
    });

    process.exit(0);
  } catch (err) {
    console.error('❌ Erro fatal:', err);
    process.exit(1);
  }
}

seed();
