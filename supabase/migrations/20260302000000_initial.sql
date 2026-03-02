-- Initial Schema for Genialidade MVP
-- Created: 2026-03-02
-- EPIC 1-4: Complete database structure

-- ============================================================================
-- CLIENTES (Clients) — EPIC 1
-- ============================================================================
CREATE TABLE clientes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  nome VARCHAR(255),
  status VARCHAR(50) DEFAULT 'prospect', -- prospect, enrolled, rejeitado, completado
  data_inscricao TIMESTAMP DEFAULT NOW(),
  user_id UUID, -- Link to Supabase auth.users (optional, for RLS)
  CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES auth.users(id) ON DELETE CASCADE
);

-- ============================================================================
-- QUESTOES (Questions) — EPIC 1
-- ============================================================================
CREATE TABLE questoes (
  id SERIAL PRIMARY KEY,
  numero INT CHECK(numero BETWEEN 1 AND 28), -- Question number 1-28
  dimensao VARCHAR(50), -- Desalinhamento, Ruído, Vazamento, Maturidade
  texto TEXT NOT NULL, -- Question text
  tipo VARCHAR(50) DEFAULT 'rating', -- rating (1-5), text, choice
  ativa BOOLEAN DEFAULT TRUE,
  UNIQUE(numero)
);

-- ============================================================================
-- RESPOSTAS (Form Responses) — EPIC 1
-- ============================================================================
CREATE TABLE respostas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cliente_id UUID NOT NULL REFERENCES clientes(id) ON DELETE CASCADE,
  questao_id INT NOT NULL REFERENCES questoes(id),
  valor_resposta INT, -- 1-5 for ratings
  data TIMESTAMP DEFAULT NOW(),
  UNIQUE(cliente_id, questao_id) -- One response per question per client
);

-- ============================================================================
-- SCORES (Scoring Results) — EPIC 1
-- ============================================================================
CREATE TABLE scores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cliente_id UUID NOT NULL REFERENCES clientes(id) ON DELETE CASCADE,
  desalinhamento INT CHECK(desalinhamento BETWEEN 1 AND 5), -- Dimension 1
  ruido INT CHECK(ruido BETWEEN 1 AND 5), -- Dimension 2
  vazamento INT CHECK(vazamento BETWEEN 1 AND 5), -- Dimension 3
  maturidade INT CHECK(maturidade BETWEEN 1 AND 5), -- Dimension 4
  total INT GENERATED ALWAYS AS (desalinhamento + ruido + vazamento + maturidade) STORED,
  data TIMESTAMP DEFAULT NOW(),
  UNIQUE(cliente_id)
);

-- ============================================================================
-- DECISOES (Approval Decisions) — EPIC 1 + EPIC 2
-- ============================================================================
CREATE TABLE decisoes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cliente_id UUID NOT NULL REFERENCES clientes(id) ON DELETE CASCADE,
  score_id UUID NOT NULL REFERENCES scores(id),
  hipotese_preliminar TEXT, -- Preliminary hypothesis
  aprovado BOOLEAN, -- approval decision
  motivo_rejeicao TEXT, -- If rejected, why
  data_analise TIMESTAMP DEFAULT NOW(),
  UNIQUE(cliente_id)
);

-- ============================================================================
-- APROVACOES (Approvals Status) — EPIC 2
-- ============================================================================
CREATE TABLE aprovacoes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cliente_id UUID NOT NULL REFERENCES clientes(id) ON DELETE CASCADE,
  status VARCHAR(50) DEFAULT 'pendente', -- aprovado, rejeitado, pendente
  motivo TEXT,
  data TIMESTAMP DEFAULT NOW(),
  UNIQUE(cliente_id)
);

-- ============================================================================
-- SESSOES (Client Sessions) — EPIC 2 + EPIC 3
-- ============================================================================
CREATE TABLE sessoes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cliente_id UUID NOT NULL REFERENCES clientes(id) ON DELETE CASCADE,
  agendado_em TIMESTAMP,
  completado_em TIMESTAMP,
  notas TEXT,
  status VARCHAR(50) DEFAULT 'agendada', -- agendada, completada, cancelada
  criada_em TIMESTAMP DEFAULT NOW()
);

-- ============================================================================
-- CADERNOS (Intelligent Notebooks) — EPIC 3
-- ============================================================================
CREATE TABLE cadernos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sessao_id UUID NOT NULL REFERENCES sessoes(id) ON DELETE CASCADE,
  cliente_id UUID NOT NULL REFERENCES clientes(id) ON DELETE CASCADE,
  conteudo JSONB, -- Rich text/blocks
  link_compartilhado UUID,
  atualizado_em TIMESTAMP DEFAULT NOW()
);

-- ============================================================================
-- BLUEPRINTS (Action Plans) — EPIC 3
-- ============================================================================
CREATE TABLE blueprints (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sessao_id UUID NOT NULL REFERENCES sessoes(id) ON DELETE CASCADE,
  cliente_id UUID NOT NULL REFERENCES clientes(id) ON DELETE CASCADE,
  url_pdf VARCHAR(2048), -- PDF storage URL
  acoes_planejadas JSONB, -- 7D action items
  criada_em TIMESTAMP DEFAULT NOW(),
  UNIQUE(sessao_id)
);

-- ============================================================================
-- CHECKINS (Weekly Check-ins) — EPIC 4
-- ============================================================================
CREATE TABLE checkins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cliente_id UUID NOT NULL REFERENCES clientes(id) ON DELETE CASCADE,
  numero_semana INT,
  respostas JSONB, -- Weekly check-in answers
  submetido_em TIMESTAMP DEFAULT NOW()
);

-- ============================================================================
-- EMAILS_ENVIADOS (Email Audit Trail)
-- ============================================================================
CREATE TABLE emails_enviados (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cliente_id UUID NOT NULL REFERENCES clientes(id) ON DELETE CASCADE,
  tipo_email VARCHAR(50), -- score_hipotese, aprovacao, confirmacao_sessao, blueprint, lembrancao_checkin, feedback, relatorio_roi
  destinatario VARCHAR(255),
  enviado_em TIMESTAMP DEFAULT NOW(),
  status VARCHAR(50) DEFAULT 'enviado', -- enviado, falha, rejeitado
  id_externo VARCHAR(255) -- Resend message ID
);

-- ============================================================================
-- INDICES for Performance
-- ============================================================================
CREATE INDEX idx_clientes_email ON clientes(email);
CREATE INDEX idx_clientes_status ON clientes(status);
CREATE INDEX idx_questoes_dimensao ON questoes(dimensao);
CREATE INDEX idx_respostas_cliente ON respostas(cliente_id);
CREATE INDEX idx_respostas_questao ON respostas(questao_id);
CREATE INDEX idx_scores_cliente ON scores(cliente_id);
CREATE INDEX idx_decisoes_cliente ON decisoes(cliente_id);
CREATE INDEX idx_aprovacoes_cliente ON aprovacoes(cliente_id);
CREATE INDEX idx_sessoes_cliente ON sessoes(cliente_id);
CREATE INDEX idx_cadernos_sessao ON cadernos(sessao_id);
CREATE INDEX idx_blueprints_sessao ON blueprints(sessao_id);
CREATE INDEX idx_checkins_cliente ON checkins(cliente_id);
CREATE INDEX idx_checkins_semana ON checkins(cliente_id, numero_semana);
CREATE INDEX idx_emails_enviados_cliente ON emails_enviados(cliente_id);
CREATE INDEX idx_emails_enviados_tipo ON emails_enviados(tipo_email);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) Policies
-- ============================================================================
ALTER TABLE clientes ENABLE ROW LEVEL SECURITY;
ALTER TABLE respostas ENABLE ROW LEVEL SECURITY;
ALTER TABLE scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE decisoes ENABLE ROW LEVEL SECURITY;
ALTER TABLE aprovacoes ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessoes ENABLE ROW LEVEL SECURITY;
ALTER TABLE cadernos ENABLE ROW LEVEL SECURITY;
ALTER TABLE blueprints ENABLE ROW LEVEL SECURITY;
ALTER TABLE checkins ENABLE ROW LEVEL SECURITY;

-- Clients see only their own data
CREATE POLICY "Clientes veem só seus dados" ON clientes
  FOR SELECT USING (auth.uid()::text = user_id::text OR auth.jwt() ->> 'role' = 'service_role');

CREATE POLICY "Clientes veem suas respostas" ON respostas
  FOR SELECT USING (
    cliente_id IN (SELECT id FROM clientes WHERE user_id = auth.uid()::uuid)
    OR auth.jwt() ->> 'role' = 'service_role'
  );

CREATE POLICY "Clientes veem seus scores" ON scores
  FOR SELECT USING (
    cliente_id IN (SELECT id FROM clientes WHERE user_id = auth.uid()::uuid)
    OR auth.jwt() ->> 'role' = 'service_role'
  );

CREATE POLICY "Clientes veem suas decisões" ON decisoes
  FOR SELECT USING (
    cliente_id IN (SELECT id FROM clientes WHERE user_id = auth.uid()::uuid)
    OR auth.jwt() ->> 'role' = 'service_role'
  );

CREATE POLICY "Clientes veem suas aprovações" ON aprovacoes
  FOR SELECT USING (
    cliente_id IN (SELECT id FROM clientes WHERE user_id = auth.uid()::uuid)
    OR auth.jwt() ->> 'role' = 'service_role'
  );

CREATE POLICY "Clientes veem suas sessões" ON sessoes
  FOR SELECT USING (
    cliente_id IN (SELECT id FROM clientes WHERE user_id = auth.uid()::uuid)
    OR auth.jwt() ->> 'role' = 'service_role'
  );

CREATE POLICY "Clientes veem seus cadernos" ON cadernos
  FOR SELECT USING (
    cliente_id IN (SELECT id FROM clientes WHERE user_id = auth.uuid())
    OR auth.jwt() ->> 'role' = 'service_role'
  );

CREATE POLICY "Clientes veem seus blueprints" ON blueprints
  FOR SELECT USING (
    cliente_id IN (SELECT id FROM clientes WHERE user_id = auth.uuid())
    OR auth.jwt() ->> 'role' = 'service_role'
  );

CREATE POLICY "Clientes veem seus checkins" ON checkins
  FOR SELECT USING (
    cliente_id IN (SELECT id FROM clientes WHERE user_id = auth.uuid())
    OR auth.jwt() ->> 'role' = 'service_role'
  );

-- Allow authenticated users to insert/update their own data
CREATE POLICY "Clientes inserem suas respostas" ON respostas
  FOR INSERT WITH CHECK (
    cliente_id IN (SELECT id FROM clientes WHERE user_id = auth.uuid())
    OR auth.jwt() ->> 'role' = 'service_role'
  );

CREATE POLICY "Clientes inserem seus checkins" ON checkins
  FOR INSERT WITH CHECK (
    cliente_id IN (SELECT id FROM clientes WHERE user_id = auth.uuid())
    OR auth.jwt() ->> 'role' = 'service_role'
  );

-- ============================================================================
-- SEED DATA: 28 Questões for Diagnóstico
-- ============================================================================
INSERT INTO questoes (numero, dimensao, texto, tipo) VALUES
-- DESALINHAMENTO (1-7)
(1, 'Desalinhamento', 'Qual é o seu principal objetivo no próximo trimestre?', 'text'),
(2, 'Desalinhamento', 'Como você comunica esse objetivo à sua equipe?', 'text'),
(3, 'Desalinhamento', 'Todos na equipe entendem o mesmo objetivo?', 'rating'),
(4, 'Desalinhamento', 'Existem conflitos de prioridades internas?', 'rating'),
(5, 'Desalinhamento', 'Como você mede se atingiu o objetivo?', 'text'),
(6, 'Desalinhamento', 'Há desalinhamento entre o que você faz e o que deveria fazer?', 'rating'),
(7, 'Desalinhamento', 'Qual é o custo mensal desse desalinhamento?', 'text'),

-- RUÍDO (8-14)
(8, 'Ruído', 'Quantas distrações você tem por dia?', 'rating'),
(9, 'Ruído', 'Qual é a tarefa que mais drena sua energia?', 'text'),
(10, 'Ruído', 'Você consegue se concentrar em uma tarefa por 2 horas?', 'rating'),
(11, 'Ruído', 'Como é o seu ambiente de trabalho?', 'text'),
(12, 'Ruído', 'Existem interrupções inesperadas durante o dia?', 'rating'),
(13, 'Ruído', 'Qual é o seu maior dreno de energia (financeiro, operacional, pessoal)?', 'text'),
(14, 'Ruído', 'Em uma escala, quanto esse ruído afeta seu desempenho?', 'rating'),

-- VAZAMENTO (15-21)
(15, 'Vazamento', 'Para quantas pessoas você está "pagando" mas não gerando valor?', 'text'),
(16, 'Vazamento', 'Qual é o seu maior vazamento de recursos?', 'text'),
(17, 'Vazamento', 'Quanto você perde por mês em processos ineficientes?', 'text'),
(18, 'Vazamento', 'Existem tarefas que você faz que outros poderiam fazer?', 'rating'),
(19, 'Vazamento', 'Como é sua relação com delegar?', 'text'),
(20, 'Vazamento', 'Em uma escala, quanto dinheiro você perde por vazamento?', 'rating'),
(21, 'Vazamento', 'Se pudesse eliminar um vazamento, qual seria?', 'text'),

-- MATURIDADE (22-28)
(22, 'Maturidade', 'Qual é o seu sistema de gestão? (nenhum, planilhas, software, etc)', 'text'),
(23, 'Maturidade', 'Você tem processos documentados?', 'rating'),
(24, 'Maturidade', 'Como é sua capacidade de se adaptar a mudanças?', 'rating'),
(25, 'Maturidade', 'Você coleta dados sobre seu desempenho?', 'rating'),
(26, 'Maturidade', 'Qual é seu maior obstáculo para escalar?', 'text'),
(27, 'Maturidade', 'Em uma escala, qual é o seu nível de maturidade operacional?', 'rating'),
(28, 'Maturidade', 'O que você faria se tivesse mais tempo/recursos?', 'text');
