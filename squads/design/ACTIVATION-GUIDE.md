# 🚀 Design Squad Activation Guide

**Status:** ✅ PRONTO PARA ATIVAÇÃO
**Created:** 03/03/2026
**Project:** Genialidade — Diagnóstico Neural Estruturado

---

## 📍 O Que Foi Criado

Um **Design Squad completo** com estrutura AIOS-compliant para liderar a criação do Design System do Genialidade.

### Arquivos Criados

```
squads/design/
├── squad.yaml                              ✅ Squad manifest + configuration
├── README.md                               ✅ Squad documentation + overview
├── ACTIVATION-GUIDE.md                     ✅ This file
│
├── config/
│   └── tech-stack.md                       ✅ Design tools + tech stack guide
│
├── agents/
│   └── jose_amorim-design-lead.yaml        ✅ José Amorim agent definition
│
├── tasks/
│   └── design-strategy-initiation.md       ✅ Design Strategy task (Espiral Expansiva)
│
└── (additional templates, data, docs to be generated during execution)
```

---

## 👥 Squad Team

| Role | Agent | Status |
|------|-------|--------|
| **Design Lead (Strategic)** | @jose_amorim | 🟢 Ativo / Pronto |
| **Architecture (System)** | @architect (Aria) | 🟡 A convocar |
| **Implementation (Code)** | @dev (Dex) | 🟡 A convocar |
| **UX/Interaction** | @ux-design-expert (Uma) | 🟡 A convocar |

---

## 🎯 Scope & Phases

### Phase 1: Design System Foundation (Dias 1-3)
**Lead:** José Amorim (Design Strategy)
**Supporting:** Aria (Architecture)

**Deliverables:**
- DS-01: Design System Foundation Document
- DS-02: Color Palette & Semantic Colors
- DS-03: Typography System
- DS-04: Grid & Spacing System
- DS-05: Component Library Baseline
- DS-06: Tailwind CSS Configuration
- DS-07: Brand Guidelines

### Phase 2: Design System Application (Dias 2-4, Paralelo)
**Lead:** Dex (Implementation) com support de Uma (UX)

**Deliverables:**
- Form Design (Story 1.2 — 28 questões)
- Results Dashboard Design (Story 1.3 — visualização scores)
- Email Template Design (Story 1.4 — email identity)
- Mobile Responsive Variants

### Phase 3: Evolution & Advanced Components (Dia 5+)
**Lead:** José Amorim (ongoing strategic direction)

---

## 🚀 Como Ativar

### OPÇÃO 1: Ativar José Amorim Direto

```bash
# Ativar José Amorim como Design Lead
@jose_amorim

# Ele começará a Design Strategy usando Espiral Expansiva
# Output: Design Strategy Document (DS-01)
```

### OPÇÃO 2: Orquestração Completa (Recomendado)

```bash
# 1. @jose_amorim — Design Strategy
@jose_amorim
*consult genialidade-design-strategy

# 2. @architect — Design System Architecture
@architect
*create-architecture design-system-genialidade

# 3. @dev — Implementation
@dev
*develop design-system-implementation

# 4. @ux-design-expert — UX Refinement
@ux-design-expert
*design interaction-patterns

# 5. Back to @dev → Implement Stories 1.2+
@dev
*develop 1.2
```

### OPÇÃO 3: Manual Workflow

1. **Read squad documentation:**
   ```bash
   cat squads/design/squad.yaml
   cat squads/design/README.md
   ```

2. **Review Design Strategy task:**
   ```bash
   cat squads/design/tasks/design-strategy-initiation.md
   ```

3. **Activate José:**
   ```bash
   @jose_amorim
   # "Comece a Design Strategy usando Espiral Expansiva"
   ```

---

## 📊 Design Strategy: Espiral Expansiva

José will guide the design through 5 layers:

### Layer 1: 🎯 Gancho Visual
**Qual é a emoção visual que "Diagnóstico Neural" deve evocar?**
- Colors: Azul (confiança), Verde (movimento), Âmbar (clareza)
- Typography: Modern sans-serif (Inter)
- Feeling: Inteligência, estrutura, transformação

### Layer 2: 🖼️ Metáfora Visual
**Como os componentes refletem a metodologia?**
- Form = Diagnóstico (entrada)
- Progress = Processamento (análise)
- Dashboard = Resultado (clareza)
- Blueprint = Ação (transformação)

### Layer 3: 🏗️ Fundamento
**Qual é a base sistemática?**
- Design tokens (colors, typography, spacing)
- Grid system (12-column, 8px base)
- Component specs (definição precisa)

### Layer 4: 🚀 Expansão
**Como isso escala?**
- Component library (Button, Input, Card, Modal, Form, etc.)
- Interaction patterns (hover, focus, disabled, loading, error)
- Responsive variants (mobile, tablet, desktop)

### Layer 5: 📚 Integração
**Como comunico isso?**
- Design System documentation (7 seções)
- Developer guide (zero ambiguidade)
- Design guide (escalabilidade)

---

## ✅ Success Metrics

### Phase 1 Complete When:
- [ ] Todos os 7 deliverables (DS-01 a DS-07) finalizados
- [ ] Color palette passa em WCAG AA contrast ratios
- [ ] Typography scale testada e aprovada
- [ ] Design tokens definidos em YAML
- [ ] Componentes listados e especificados
- [ ] Tailwind config plan documentado
- [ ] Brand guidelines escritas
- [ ] José Amorim aprovado (estratégia reflete metodologia)

### Phase 2 Complete When:
- [ ] Form design pronto (Story 1.2)
- [ ] Results dashboard design pronto (Story 1.3)
- [ ] Email template design pronto (Story 1.4)
- [ ] Responsiveness testada (mobile, tablet, desktop)
- [ ] Dev team (Dex) pode implementar sem perguntas

### Phase 3 Success:
- [ ] Design system escalável para Stories 1.5+
- [ ] Documentação mantida e atualizada
- [ ] Novos componentes adotam padrões do sistema

---

## 📚 Key Documents to Read

**Before Activation:**
1. `squads/design/squad.yaml` — Full squad configuration
2. `squads/design/README.md` — Squad overview
3. `squads/design/config/tech-stack.md` — Tools and technology

**During Execution:**
1. `squads/design/tasks/design-strategy-initiation.md` — Design Strategy task
2. `squads/design/agents/jose_amorim-design-lead.yaml` — José's definition

**Output Files (generated during execution):**
1. `squads/design/docs/design-system-foundation.md` — Complete design system
2. `squads/design/config/design-tokens.yaml` — Design tokens
3. `squads/design/data/component-patterns.md` — Components specs

---

## 🔄 Timeline

| Date | Phase | Deliverables | Status |
|------|-------|---|---|
| 03/03 | Phase 1 Start | Design Strategy initiated | 🟡 In Progress |
| 04/03 | Phase 1 | Color + Typography systems | 🔴 Pending |
| 05/03 | Phase 1 + 2 | Design tokens + Form design | 🔴 Pending |
| 06/03 | Phase 1 End | DS-01 to DS-07 complete | 🔴 Pending |
| 07/03 | Phase 2 | Results dashboard + Email | 🔴 Pending |
| 08/03 | Phase 2 End | All Phase 2 deliverables | 🔴 Pending |
| 09/03 | Phase 3 Start | Evolution begins | 🔴 Pending |

---

## 🎯 Next Action

**Activate José Amorim now:**

```bash
@jose_amorim

"Vamos iniciar a Design Strategy para Genialidade.
Comece pela Espiral Expansiva — Camada 1 (Gancho Visual).

Qual é a emoção visual que 'Diagnóstico Neural Estruturado' deve evocar?"
```

---

## 💡 Design Principles for Team

1. **Metáforas visuais ANTES de teoria** — Show, don't tell
2. **Sistemático, não aleatório** — Design tokens guide everything
3. **Escalável** — Components work for Stories 1.2 through 2.0+
4. **Acessível** — WCAG AA minimum, tested
5. **Transformacional** — Design reflects the promise (diagnóstico → clareza)
6. **Coerente** — Color, typography, spacing all work together
7. **Developer-friendly** — Dex implements without ambiguity

---

## 📞 Support

**Questions about squad structure?** Read `squad.yaml`

**Questions about tech stack?** Read `config/tech-stack.md`

**Questions about design process?** Read `tasks/design-strategy-initiation.md`

**Ready to activate?** Type `@jose_amorim` ↓↓↓

---

## 🏗️ Squad Status

```
✅ Squad Directory Structure Created
✅ Squad Manifest (squad.yaml) Written
✅ Squad Documentation (README.md) Written
✅ Tech Stack Guide Written
✅ José Amorim Agent Definition Written
✅ Design Strategy Task Template Written

🟡 READY FOR ACTIVATION
   Next: Activate @jose_amorim and begin Design Strategy
```

---

**Created by:** Craft (Squad Creator)
**Date:** 03/03/2026
**Project:** Genialidade — Diagnóstico Neural Estruturado
**Status:** ✅ READY TO ACTIVATE

---

## 🚀 PRÓXIMO PASSO: Ativar José Amorim

Digite `@jose_amorim` para ativar o Design Squad Lead com Espiral Expansiva.

José irá guiar a criação do Design System através das 5 camadas:
1. Gancho Visual (cores + tipografia)
2. Metáfora Visual (componentes refletem metodologia)
3. Fundamento (design tokens)
4. Expansão (component library)
5. Integração (documentação)

**Vamos lá!** 🎨
