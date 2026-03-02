# Stories Index — Genialidade MVP

**Last Updated:** 01/03/2026
**Status:** ✅ All 13 stories created and ready for development
**Target MVP Launch:** 09/03/2026

---

## 📋 Quick Summary

| EPIC | Count | Priority | Status |
|------|-------|----------|--------|
| **EPIC 1: Infraestrutura Diagnóstico** | 6 | 🔴 MUST (4) + 🟡 SHOULD (2) | ✅ Complete |
| **EPIC 2: Processo Fase 1→2** | 3 | 🔴 MUST (3) | ✅ Complete |
| **EPIC 3: Validação Fase 2** | 4 | 🔴 MUST (4) | ✅ Complete |
| **EPIC 4: Acompanhamento 90D** | 5 | 🔴 MUST (4) + 🟡 SHOULD (1) | ✅ Complete |
| **EPIC 5: Marketing** | 3 | 🟡 SHOULD (3) | ✅ Complete |
| **TOTAL (current)** | **21** | — | ✅ |

---

## 📚 EPIC 1: Infraestrutura Diagnóstico (6 Stories)

**Timeline:** 02/03 - 05/03/2026
**Objective:** Criar pipeline Fase 1 (formulário → score → email aprovação)

| # | Story | Título | Priority | Target | Entregável | Status |
|---|-------|--------|----------|--------|-----------|--------|
| 1.1 | [Story 1.1](1.1.story.md) | Setup Database + Schema | 🔴 MUST | 02/03 | — | ✅ |
| 1.2 | [Story 1.2](1.2.story.md) | Formulário Web 28Q | 🔴 MUST | 03/03 | **E1** | ✅ |
| 1.3 | [Story 1.3](1.3.story.md) | Sistema Scoring 4D | 🔴 MUST | 04/03 | — | ✅ |
| 1.4 | [Story 1.4](1.4.story.md) | Email Score+Hipótese | 🔴 MUST | 04/03 | **E2** | ✅ |
| 1.5 | [Story 1.5](1.5.story.md) | PDF Diagnóstico | 🟡 SHOULD | 05/03 | **E3** | ✅ |
| 1.6 | [Story 1.6](1.6.story.md) | Portal Cliente | 🟡 SHOULD | 05/03 | — | ✅ |

### Key Dependencies
```
1.1 (Database) ← BLOCKER
├── 1.2 (Formulário) ← precisa 1.1
├── 1.3 (Scoring) ← precisa 1.1, 1.2
├── 1.4 (Email) ← precisa 1.3, 1.1
├── 1.5 (PDF) ← precisa 1.1, 1.3, 1.4
└── 1.6 (Portal) ← precisa 1.1, 1.3, 1.5
```

---

## 📚 EPIC 2: Processo Fase 1→2 (3 Stories)

**Timeline:** 05/03 - 06/03/2026
**Objective:** Conectar aprovação com agendamento sessão

| # | Story | Título | Priority | Target | Entregável | Status |
|---|-------|--------|----------|--------|-----------|--------|
| 2.1 | [Story 2.1](2.1.story.md) | Aprovação/Rejeição + Status | 🔴 MUST | 05/03 | — | ✅ |
| 2.2 | [Story 2.2](2.2.story.md) | Agendamento Sessão 1:1 | 🔴 MUST | 06/03 | — | ✅ |
| 2.3 | [Story 2.3](2.3.story.md) | Email Confirmação Sessão | 🔴 MUST | 06/03 | — | ✅ |

### Key Dependencies
```
1.3 (Scoring) ← provides approval logic
2.1 (Aprovação)
├── 2.2 (Agendamento) ← precisa 2.1 approved
│   └── 2.3 (Email confirmação) ← precisa 2.2 scheduled
```

---

## 📚 EPIC 5: Marketing (3 Stories)

**Timeline:** 15/03 - 17/03/2026
**Objective:** Trazer MVP pra produção (landing page, email sequences, copywriting)

| # | Story | Título | Priority | Target | Entregável | Status |
|---|-------|--------|----------|--------|-----------|--------|
| 5.1 | [Story 5.1](5.1.story.md) | Landing Page Build | 🔴 MUST | 16/03 | — | ✅ |
| 5.2 | [Story 5.2](5.2.story.md) | Email Sequences Automáticas | 🟡 SHOULD | 17/03 | — | ✅ |
| 5.3 | [Story 5.3](5.3.story.md) | Copywriting Implementation | 🟡 SHOULD | 17/03 | — | ✅ |

### Key Dependencies
```
5.1 (Landing page) ← MUST (primeiro landing que cliente vê)
├── 5.2 (Email sequences) — depende 5.1 URL
└── 5.3 (Copywriting) — refactor 5.1, 5.2 com copy-loader
```

---

## 📚 EPIC 4: Acompanhamento 90D (5 Stories)

**Timeline:** 08/03 - 14/03/2026
**Objective:** Rastrear evolução cliente + entregar entregáveis 90D

| # | Story | Título | Priority | Target | Entregável | Status |
|---|-------|--------|----------|--------|-----------|--------|
| 4.1 | [Story 4.1](4.1.story.md) | Dashboard Progresso 90D | 🟡 SHOULD | 12/03 | — | ✅ |
| 4.2 | [Story 4.2](4.2.story.md) | Check-in Template Semanal | 🔴 MUST | 11/03 | **E6** | ✅ |
| 4.3 | [Story 4.3](4.3.story.md) | Feedback Semanal 24h | 🔴 MUST | 12/03 | **E7** | ✅ |
| 4.4 | [Story 4.4](4.4.story.md) | Sessões Mensais (4x) | 🔴 MUST | 13/03 | **E8** | ✅ |
| 4.5 | [Story 4.5](4.5.story.md) | Relatório ROI Final (Dia 90) | 🔴 MUST | 14/03 | **E9** | ✅ |

### Key Dependencies
```
4.2 (Check-in) ← CORE
├── 4.1 (Dashboard) — visualiza check-in data
├── 4.3 (Feedback) — consome check-in data
└── 4.4 (Sessões) — integra com check-ins
    └── 4.5 (ROI) — usa notas sessões
```

---

## 📚 EPIC 3: Validação Fase 2 (4 Stories)

**Timeline:** 02/03 - 09/03/2026
**Objective:** Executar Fase 2 e gerar Blueprint 7D + Upsell 90D

| # | Story | Título | Priority | Target | Entregável | Status |
|---|-------|--------|----------|--------|-----------|--------|
| 3.1 | [Story 3.1](3.1.story.md) | Guia Condução Sessão | 🔴 MUST | 02/03 | — | ✅ |
| 3.2 | [Story 3.2](3.2.story.md) | Caderno Inteligente | 🔴 MUST | 07/03 | **E5** | ✅ |
| 3.3 | [Story 3.3](3.3.story.md) | Blueprint 7D + Diagnóstico | 🔴 MUST | 08/03 | **E4** | ✅ |
| 3.4 | [Story 3.4](3.4.story.md) | Email Blueprint + Upsell 90D | 🔴 MUST | 09/03 | — | ✅ |

### Key Dependencies
```
3.1 (Guia sessão) — starts immediately (for your prep)
3.2 (Caderno) ← precisa 1.1 (Fase 1 data), 3.1 (data coletado)
3.3 (Blueprint) ← precisa 3.1 (dados sessão), 3.2 (caderno)
3.4 (Email+Upsell) ← precisa 3.3 (blueprint PDF), 3.2 (caderno link)
```

---

## 🎯 Entregáveis Mapeados (Criteria de Aceitação)

| Entregável | Story | Descrição | Status |
|-----------|-------|-----------|--------|
| **E1** | 1.2 | Formulário Estratégico Web (28Q) | ✅ Story created |
| **E2** | 1.4 | Hipótese Preliminar Email | ✅ Story created |
| **E3** | 1.5 | Diagnóstico Formal PDF | ✅ Story created |
| **E4** | 3.3 | Blueprint 7D | ✅ Story created |
| **E5** | 3.2 | Acesso Caderno 90D | ✅ Story created |
| **E6** | 4.2 | Check-in Template Semanal | ✅ Story created |
| **E7** | 4.3 | Feedback Semanal 24h | ✅ Story created |
| **E8** | 4.4 | Sessão Mensal ao Vivo | ✅ Story created |
| **E9** | 4.5 | Relatório ROI Final | ✅ Story created |

---

## 📊 MoSCoW Alignment

### MUST Features (Stories)
- ✅ 1.1: Database schema (blocker)
- ✅ 1.2: Formulário 28Q (E1)
- ✅ 1.3: Scoring 4D (lógica core)
- ✅ 1.4: Email score+hipótese (E2)
- ✅ 2.1: Aprovação/Rejeição (fluxo)
- ✅ 2.2: Agendamento (pipeline)
- ✅ 2.3: Email confirmação (ux)
- ✅ 3.1: Guia sessão (facilitação)
- ✅ 3.2: Caderno Inteligente (E5)
- ✅ 3.3: Blueprint 7D (E4)
- ✅ 3.4: Email+Upsell 90D (conversion)

### SHOULD Features (Stories)
- ✅ 1.5: PDF Diagnóstico (E3)
- ✅ 1.6: Portal Cliente (ux enhancement)

---

## 🚀 Critical Path (MVP + Acompanhamento)

```
Day 1-2:   Story 1.1 (Database)      — BLOCKER
Day 2-3:   Story 1.2 (Formulário)    — depends 1.1
Day 3-4:   Story 1.3 (Scoring)       — depends 1.1, 1.2
Day 4:     Story 1.4 (Email)         — depends 1.3
Day 4-5:   Story 1.5, 1.6            — SHOULD features
           Story 2.1 (Aprovação)     — depends 1.3
Day 5-6:   Story 2.2 (Agendamento)   — depends 2.1
           Story 2.3 (Email confirm) — depends 2.2
Day 2:     Story 3.1 (Guia sessão)   — independent (you use it)
Day 5-7:   Story 3.2 (Caderno)       — depends 1.1, 3.1
Day 7-8:   Story 3.3 (Blueprint)     — depends 3.1, 3.2
Day 8-9:   Story 3.4 (Upsell email)  — depends 3.3, 3.2

MVP READY: Day 8-9 (09/03/2026)

Day 9-11:  Story 4.2 (Check-in)      — independent (database, starts early)
           Story 4.1 (Dashboard)     — depends 4.2
Day 11-12: Story 4.3 (Feedback)      — depends 4.2
Day 12-13: Story 4.4 (Sessões)       — depends 4.1, 4.3
Day 13-14: Story 4.5 (ROI Report)    — depends 4.4

ACOMPANHAMENTO READY: Day 14 (14/03/2026)

FULL MVP + ACOMPANHAMENTO: 09/03 - 14/03/2026 (6 dias)
```

---

## 📌 How to Use This Index

1. **For @dev:** Start with Story 1.1 (Database) — it's the BLOCKER
2. **For development order:** Follow critical path above
3. **For testing:** Each story has Acceptance Criteria (10 points) and DoD checklist
4. **For reference:** Each story links to PRDs and Critérios de Aceitação
5. **For tracking:** Stories will be moved to Kanban (In Progress → Done) as work progresses

---

## 📝 Next Steps

### Immediate (Next Stories to Create)
- [ ] EPIC 4: Acompanhamento 90D (4-5 stories)
  - Check-in template (weekly)
  - Feedback automático (24h)
  - Sessão mensal (45min)
  - Relatório ROI (day 90)

- [ ] EPIC 5: Marketing (2-3 stories)
  - Landing page build
  - Email sequences
  - Copywriting implementation

### After @dev Starts Work
- [ ] Monitor EPIC 1 completion (target 05/03)
- [ ] Create any blocking issues that arise
- [ ] Prepare first client for Fase 1 (formulário)

---

## 🔗 Related Documents

- [Critérios de Aceitação Entregáveis](criterios-aceitacao-entregaveis.md)
- [PRD MVP Diagnóstico](prd-oferta-mvp.md)
- [PRD Acompanhamento 90D](prd-acompanhamento-90d.md)
- [MoSCoW + Métricas](refinements-moscow-metricas.md)
- [Landing Page + Formulário](landing-page-formulario.md)
- [Scripts Venda + Bundling](script-venda-bundling.md)

---

**Document created by River (Scrum Master)**
**Last updated:** 01/03/2026
**Status:** ✅ 13 stories created, ready for @dev to start implementation
