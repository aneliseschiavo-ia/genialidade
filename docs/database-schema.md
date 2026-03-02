# Database Schema — Genialidade MVP

**Version:** 1.0.0
**Created:** 02/03/2026
**Database:** Supabase (PostgreSQL managed)
**Story:** 1.1 — Setup Database + Schema Diagnóstico

---

## Table of Contents

1. [Overview](#overview)
2. [Entity Relationship Diagram](#entity-relationship-diagram)
3. [Tables](#tables)
4. [Indices](#indices)
5. [Row Level Security (RLS)](#row-level-security-rls)
6. [Data Flow](#data-flow)

---

## Overview

This schema supports the complete Genialidade MVP workflow across 4 EPICs:

- **EPIC 1:** Infraestrutura Diagnóstico (Questões, Respostas, Scores, Decisões)
- **EPIC 2:** Processo Fase 1→2 (Aprovações, Sessões)
- **EPIC 3:** Validação Fase 2 (Cadernos, Blueprints)
- **EPIC 4:** Acompanhamento 90D (Check-ins, Feedback)

---

## Entity Relationship Diagram

```
┌─────────────┐
│  CLIENTES   │ (center)
└─────────────┘
      │
      ├─→ QUESTOES (one-to-many via respostas)
      │
      ├─→ RESPOSTAS (one-to-many)
      │   └─→ QUESTOES
      │
      ├─→ SCORES (one-to-one)
      │   └─→ DECISOES
      │
      ├─→ APROVACOES (one-to-one)
      │
      ├─→ SESSOES (one-to-many)
      │   ├─→ CADERNOS
      │   └─→ BLUEPRINTS
      │
      └─→ CHECKINS (one-to-many)

EMAILS_ENVIADOS (references CLIENTES, audit trail)
```

---

## Tables

### 1. CLIENTES (Clients)

**Purpose:** Store client information for the diagnostic process

| Column | Type | Constraints | Notes |
|--------|------|-------------|-------|
| `id` | UUID | PRIMARY KEY, DEFAULT gen_random_uuid() | Unique client identifier |
| `email` | VARCHAR(255) | UNIQUE NOT NULL | Client email address |
| `nome` | VARCHAR(255) | | Client name |
| `status` | VARCHAR(50) | DEFAULT 'prospect' | prospect, enrolled, rejeitado, completado |
| `data_inscricao` | TIMESTAMP | DEFAULT NOW() | Registration date |
| `user_id` | UUID | FOREIGN KEY (auth.users) | Link to Supabase auth user (optional, for RLS) |

**Indices:**
- `idx_clientes_email` — Search by email
- `idx_clientes_status` — Filter by status

**RLS Policies:**
- Clients see only their own data
- Service role can see all

---

### 2. QUESTOES (Questions)

**Purpose:** Store the 28 diagnostic questions

| Column | Type | Constraints | Notes |
|--------|------|-------------|-------|
| `id` | SERIAL | PRIMARY KEY | Auto-increment question ID |
| `numero` | INT | CHECK (1-28), UNIQUE | Question number 1-28 |
| `dimensao` | VARCHAR(50) | | Desalinhamento, Ruído, Vazamento, Maturidade |
| `texto` | TEXT | NOT NULL | Full question text |
| `tipo` | VARCHAR(50) | DEFAULT 'rating' | rating (1-5), text, choice |
| `ativa` | BOOLEAN | DEFAULT TRUE | Is question active? |

**Pre-loaded Data:**
- 28 questions, 4 per dimension
- 7 questions for Desalinhamento
- 7 questions for Ruído
- 7 questions for Vazamento
- 7 questions for Maturidade

**Indices:**
- `idx_questoes_dimensao` — Filter by dimension

**Note:** This table is static for MVP. Seed data is included in migration.

---

### 3. RESPOSTAS (Form Responses)

**Purpose:** Store client answers to diagnostic questions

| Column | Type | Constraints | Notes |
|--------|------|-------------|-------|
| `id` | UUID | PRIMARY KEY | Response identifier |
| `cliente_id` | UUID | FOREIGN KEY (clientes) | Which client |
| `questao_id` | INT | FOREIGN KEY (questoes) | Which question |
| `valor_resposta` | INT | | 1-5 for ratings, NULL for text |
| `data` | TIMESTAMP | DEFAULT NOW() | When answered |
| | | UNIQUE (cliente_id, questao_id) | One response per question |

**Data Flow:** Populated by Story 1.2 (Form submission)
**Indices:**
- `idx_respostas_cliente` — Find all responses for a client
- `idx_respostas_questao` — Find all responses to a question

**RLS:** Clients see only their own responses

---

### 4. SCORES (Scoring Results)

**Purpose:** Store calculated scores for each client

| Column | Type | Constraints | Notes |
|--------|------|-------------|-------|
| `id` | UUID | PRIMARY KEY | Score record ID |
| `cliente_id` | UUID | FOREIGN KEY (clientes), UNIQUE | One score per client |
| `desalinhamento` | INT | CHECK (1-5) | Dimension 1 score |
| `ruido` | INT | CHECK (1-5) | Dimension 2 score |
| `vazamento` | INT | CHECK (1-5) | Dimension 3 score |
| `maturidade` | INT | CHECK (1-5) | Dimension 4 score |
| `total` | INT | GENERATED ALWAYS AS (sum) | Automatic sum: 4-20 |
| `data` | TIMESTAMP | DEFAULT NOW() | When calculated |

**Calculation:**
- Each dimension is 1-5
- Total = D1 + D2 + D3 + D4 (range: 4-20)
- Approval rule: total ≥ 12 AND maturidade ≥ 4 (Story 1.3)

**Data Flow:** Populated by Story 1.3 (Scoring algorithm)
**Indices:**
- `idx_scores_cliente` — Look up score for a client

**RLS:** Clients see only their own scores

---

### 5. DECISOES (Approval Decisions)

**Purpose:** Store approval decision and hypothesis for each client

| Column | Type | Constraints | Notes |
|--------|------|-------------|-------|
| `id` | UUID | PRIMARY KEY | Decision record ID |
| `cliente_id` | UUID | FOREIGN KEY (clientes), UNIQUE | One decision per client |
| `score_id` | UUID | FOREIGN KEY (scores) | Links to score |
| `hipotese_preliminar` | TEXT | | Generated hypothesis (what's wrong) |
| `aprovado` | BOOLEAN | | TRUE = approved, FALSE = rejected |
| `motivo_rejeicao` | TEXT | | If rejected, why? |
| `data_analise` | TIMESTAMP | DEFAULT NOW() | Decision date |

**Data Flow:**
- Populated by Story 1.3 (Scoring logic)
- Used by Story 1.4 (Email hypothesis)
- Used by Story 2.1 (Approval status)

**RLS:** Clients see only their own decisions

---

### 6. APROVACOES (Approval Status)

**Purpose:** Track approval status and scheduling

| Column | Type | Constraints | Notes |
|--------|------|-------------|-------|
| `id` | UUID | PRIMARY KEY | Status record ID |
| `cliente_id` | UUID | FOREIGN KEY (clientes), UNIQUE | One status per client |
| `status` | VARCHAR(50) | DEFAULT 'pendente' | aprovado, rejeitado, pendente |
| `motivo` | TEXT | | Approval reason or rejection explanation |
| `data` | TIMESTAMP | DEFAULT NOW() | Status update date |

**Data Flow:** Populated by Story 2.1 (Approval logic)
**Used by:** Story 2.2 (Scheduling)

**RLS:** Clients see only their own approval status

---

### 7. SESSOES (Client Sessions)

**Purpose:** Track diagnostic sessions (Fase 2)

| Column | Type | Constraints | Notes |
|--------|------|-------------|-------|
| `id` | UUID | PRIMARY KEY | Session ID |
| `cliente_id` | UUID | FOREIGN KEY (clientes) | Which client |
| `agendado_em` | TIMESTAMP | | Scheduled date/time |
| `completado_em` | TIMESTAMP | | Completion date/time |
| `notas` | TEXT | | Session notes |
| `status` | VARCHAR(50) | DEFAULT 'agendada' | agendada, completada, cancelada |
| `criada_em` | TIMESTAMP | DEFAULT NOW() | Created date |

**Data Flow:** Populated by Story 2.2 (Scheduling)
**Used by:** Stories 3.2, 3.3 (Notebook, Blueprint)

**Indices:**
- `idx_sessoes_cliente` — Find sessions for a client

**RLS:** Clients see only their own sessions

---

### 8. CADERNOS (Intelligent Notebooks)

**Purpose:** Store session notes and collaborative notebook content

| Column | Type | Constraints | Notes |
|--------|------|-------------|-------|
| `id` | UUID | PRIMARY KEY | Notebook ID |
| `sessao_id` | UUID | FOREIGN KEY (sessoes) | Associated session |
| `cliente_id` | UUID | FOREIGN KEY (clientes) | Client reference |
| `conteudo` | JSONB | | Rich text/blocks (flexible structure) |
| `link_compartilhado` | UUID | | Shareable link token |
| `atualizado_em` | TIMESTAMP | DEFAULT NOW() | Last update |

**Data Flow:** Populated by Story 3.2 (Notebook editor)
**Used by:** Story 3.3 (Blueprint generation)

**JSONB Structure (example):**
```json
{
  "title": "Session Notes - Cliente XYZ",
  "blocks": [
    { "type": "heading", "content": "Key Insights" },
    { "type": "paragraph", "content": "..." },
    { "type": "list", "items": [...] }
  ]
}
```

**RLS:** Clients see only their own notebooks

---

### 9. BLUEPRINTS (7-Day Action Plans)

**Purpose:** Store generated 7-day action blueprints

| Column | Type | Constraints | Notes |
|--------|------|-------------|-------|
| `id` | UUID | PRIMARY KEY | Blueprint ID |
| `sessao_id` | UUID | FOREIGN KEY (sessoes), UNIQUE | One blueprint per session |
| `cliente_id` | UUID | FOREIGN KEY (clientes) | Client reference |
| `url_pdf` | VARCHAR(2048) | | PDF storage URL (Vercel Blob/S3) |
| `acoes_planejadas` | JSONB | | Structured 7-day actions |
| `criada_em` | TIMESTAMP | DEFAULT NOW() | Generation date |

**Data Flow:** Populated by Story 3.3 (Blueprint generation)
**Used by:** Story 3.4 (Upsell email)

**JSONB Structure (example):**
```json
{
  "title": "7-Day Blueprint",
  "dias": [
    {
      "dia": 1,
      "objetivo": "...",
      "acoes": ["Ação 1", "Ação 2"]
    }
  ],
  "metricas": {
    "meta_dia_7": "Aumentar indicador X em Y%"
  }
}
```

**RLS:** Clients see only their own blueprints

---

### 10. CHECKINS (Weekly Check-ins)

**Purpose:** Store weekly progress check-ins (EPIC 4)

| Column | Type | Constraints | Notes |
|--------|------|-------------|-------|
| `id` | UUID | PRIMARY KEY | Check-in ID |
| `cliente_id` | UUID | FOREIGN KEY (clientes) | Which client |
| `numero_semana` | INT | | Week 1-13 (90 days) |
| `respostas` | JSONB | | Weekly answers |
| `submetido_em` | TIMESTAMP | DEFAULT NOW() | Submission date |

**Data Flow:** Populated by Story 4.2 (Check-in form)
**Used by:** Stories 4.3, 4.4 (Feedback, Sessions)

**JSONB Structure (example):**
```json
{
  "semana": 1,
  "indicador_principal": 8.5,
  "avancou_sim_nao": "sim",
  "obstaculos": "...",
  "proximos_passos": "..."
}
```

**Indices:**
- `idx_checkins_cliente` — Find all check-ins for a client
- `idx_checkins_semana` — Find week-specific check-ins

**RLS:** Clients see only their own check-ins

---

### 11. EMAILS_ENVIADOS (Audit Trail)

**Purpose:** Track all transactional emails sent

| Column | Type | Constraints | Notes |
|--------|------|-------------|-------|
| `id` | UUID | PRIMARY KEY | Email record ID |
| `cliente_id` | UUID | FOREIGN KEY (clientes) | Recipient |
| `tipo_email` | VARCHAR(50) | | score_hipotese, aprovacao, confirmacao_sessao, blueprint, lembrancao_checkin, feedback, relatorio_roi |
| `destinatario` | VARCHAR(255) | | Email address |
| `enviado_em` | TIMESTAMP | DEFAULT NOW() | Send date |
| `status` | VARCHAR(50) | DEFAULT 'enviado' | enviado, falha, rejeitado |
| `id_externo` | VARCHAR(255) | | Resend message ID (for tracking) |

**Data Flow:** Populated by all email services (Stories 1.4, 2.3, 3.4, 4.3, 4.5)
**Purpose:** Compliance, debugging, re-sending

**Indices:**
- `idx_emails_enviados_cliente` — Find emails for a client
- `idx_emails_enviados_tipo` — Find emails by type

**Note:** NOT subject to RLS (admin/service-role only for compliance)

---

## Indices

### Performance Optimization

All indices are designed to support common queries:

| Index | Table | Purpose |
|-------|-------|---------|
| `idx_clientes_email` | clientes | Email lookup |
| `idx_clientes_status` | clientes | Status filtering |
| `idx_questoes_dimensao` | questoes | Dimension filtering |
| `idx_respostas_cliente` | respostas | Find all client responses |
| `idx_respostas_questao` | respostas | Find all responses to a question |
| `idx_scores_cliente` | scores | Look up score |
| `idx_decisoes_cliente` | decisoes | Look up decision |
| `idx_aprovacoes_cliente` | aprovacoes | Look up approval status |
| `idx_sessoes_cliente` | sessoes | Find client sessions |
| `idx_cadernos_sessao` | cadernos | Find notebook for session |
| `idx_blueprints_sessao` | blueprints | Look up blueprint |
| `idx_checkins_cliente` | checkins | Find client check-ins |
| `idx_checkins_semana` | checkins | Find week-specific check-in |
| `idx_emails_enviados_cliente` | emails_enviados | Email audit trail |
| `idx_emails_enviados_tipo` | emails_enviados | Email type filtering |

---

## Row Level Security (RLS)

### Policy Strategy

RLS is implemented using two roles:

1. **Authenticated Users:** See only their own data
2. **Service Role:** See all data (backend operations)

### Policies by Table

| Table | Policy | Rule |
|-------|--------|------|
| clientes | View | auth.uid() = user_id OR service_role |
| respostas | View | client_id in (auth.uid user's clients) OR service_role |
| respostas | Insert | client_id in (auth.uid user's clients) OR service_role |
| scores | View | client_id in (auth.uid user's clients) OR service_role |
| decisoes | View | client_id in (auth.uid user's clients) OR service_role |
| aprovacoes | View | client_id in (auth.uid user's clients) OR service_role |
| sessoes | View | client_id in (auth.uid user's clients) OR service_role |
| cadernos | View | client_id in (auth.uid user's clients) OR service_role |
| blueprints | View | client_id in (auth.uid user's clients) OR service_role |
| checkins | View | client_id in (auth.uid user's clients) OR service_role |
| checkins | Insert | client_id in (auth.uid user's clients) OR service_role |
| emails_enviados | View | service_role only (compliance) |

### Security Notes

- RLS is **CRITICAL** — clients cannot access other clients' data
- Backend operations use `SUPABASE_SERVICE_ROLE_KEY` to bypass RLS
- Frontend uses `SUPABASE_ANON_KEY` with authenticated sessions
- Email audit trail is NOT RLS-protected (admin only)

---

## Data Flow

### EPIC 1: Diagnóstico

```
Cliente submete formulário (Story 1.2)
    ↓
Respostas salvas em RESPOSTAS
    ↓
Algoritmo calcula scores (Story 1.3)
    ↓
Scores salvos em SCORES
    ↓
Hipótese gerada (Story 1.3)
    ↓
Decisão salva em DECISOES
    ↓
Email com score + hipótese enviado (Story 1.4)
    ↓
Email registrado em EMAILS_ENVIADOS
```

### EPIC 2: Aprovação & Agendamento

```
Decisão aprovada? (Story 2.1)
    ↓ SIM
Status atualizado em APROVACOES
    ↓
Sessão agendada em SESSOES (Story 2.2)
    ↓
Email de confirmação enviado (Story 2.3)
    ↓
Email registrado em EMAILS_ENVIADOS
```

### EPIC 3: Sessão & Blueprint

```
Sessão ocorre
    ↓
Notas salvas em CADERNOS (Story 3.2)
    ↓
Blueprint gerado e PDF salvo (Story 3.3)
    ↓
Blueprint registrado em BLUEPRINTS
    ↓
Email com blueprint + upsell enviado (Story 3.4)
    ↓
Email registrado em EMAILS_ENVIADOS
```

### EPIC 4: Acompanhamento 90D

```
Cliente submete check-in (Story 4.2)
    ↓
Check-in salvo em CHECKINS
    ↓
Feedback gerado (Story 4.3)
    ↓
Email de feedback enviado
    ↓
Sessão mensal agendada (Story 4.4)
    ↓
ROI calculado e relatório enviado (Story 4.5)
    ↓
Email registrado em EMAILS_ENVIADOS
```

---

## Migration & Deployment

### Local Development

```bash
# Start local Supabase
supabase start

# Apply migration
supabase db push

# View local dashboard
open http://localhost:54323
```

### Production

```bash
# Push migration to production
supabase db push --linked

# Verify
supabase db list
```

### Rollback

```bash
# Create rollback migration (manual SQL file)
supabase migration new rollback_initial

# Apply rollback
supabase db push
```

---

## Document Metadata

```yaml
Story: 1.1 — Setup Database + Schema Diagnóstico
Version: 1.0.0
Created: 02/03/2026
Updated: 02/03/2026
Status: Complete (AC #10)
Next: Stories 1.2-1.6 (EPIC 1)
Dependencies: None (foundational)
```
