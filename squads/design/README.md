# Design Squad — Genialidade

## 🎨 Visão Geral

Este é o **Design Squad** para o projeto Genialidade — responsável pela criação de um **Design System coesivo** que traduz a metodologia "Diagnóstico Neural Estruturado" de Anelise em uma linguagem visual clara, coerente e transformadora.

**Liderado por:** José Amorim (@jose_amorim) — Consultor & Professor Nexialista

---

## 🎯 Objetivo

Criar um design system completo que:
- ✅ Reflita a promessa de transformação da metodologia (clareza + estrutura)
- ✅ Seja consistente através de todas as interface (formulário, resultados, emails, dashboard)
- ✅ Permita que a equipe de desenvolvimento (Dex) implemente com ZERO ambiguidade
- ✅ Seja escalável para futuras features (Stories 1.5+)

---

## 📦 Entregáveis Principais

### Phase 1: Design System Foundation (2-3 dias)

| ID | Entregável | Descrição | Status |
|---|---|---|---|
| DS-01 | Design System Doc | Documento com padrões, princípios, arquitetura | 🟡 Em Progresso |
| DS-02 | Color Palette | Paleta de cores + semantic colors + contrast ratios | 🟡 Em Progresso |
| DS-03 | Typography | Familias, scales, weights, line-heights, letter-spacing | 🟡 Em Progresso |
| DS-04 | Grid & Spacing | Sistema de espaçamento + grid (4px or 8px unit) | 🟡 Em Progresso |
| DS-05 | Component Library | Button, Input, Card, Modal, Form, Navigation, etc. | 🟡 Em Progresso |
| DS-06 | Tailwind Config | Design tokens como Tailwind CSS variables | 🟡 Em Progresso |
| DS-07 | Brand Guidelines | Brand voice, imagery, photography style, iconography | 🟡 Em Progresso |

### Phase 2: Design System Application (Paralelo com Story 1.2)

| Entregável | Para | Status |
|---|---|---|
| Form Design | Story 1.2 (28 questões) | 🔴 Pendente |
| Results Dashboard Design | Story 1.3 (visualização scores) | 🔴 Pendente |
| Email Template Design | Story 1.4 (email identity) | 🔴 Pendente |
| Mobile Responsive | Todos os above | 🔴 Pendente |

---

## 🧠 Metodologia: Espiral Expansiva

José Amorim usa a **Espiral Expansiva** (5 camadas de comunicação visual) para estruturar o design:

### Camada 1: 🎯 Gancho Visual (Visual Hook)
**O que?** Cores e tipografia que criam resposta emocional imediata
**Por quê?** "Diagnóstico Neural" sugere: estrutura, clareza, inteligência
**Cores sugeridas:** Azuis (confiança), verdes (movimento), tons de cinza (estrutura)

### Camada 2: 🖼️ Metáfora Visual (Visual Metaphor)
**O que?** Componentes e layouts que refletem a metodologia
**Como?** Grids = estrutura; cards = fases do diagnóstico; progresso = movimento
**Resultado?** Usuário "sente" a estrutura através do design

### Camada 3: 🏗️ Fundamento (Foundation)
**O que?** Design tokens + grid system + spacing system
**Princípio:** Tudo é construído sobre a mesma base (não UI aleatória)
**Benefício:** Consistência + escalabilidade

### Camada 4: 🚀 Expansão (Expansion)
**O que?** Biblioteca de componentes + padrões de interação
**Escopo:** Button, Form, Modal, Card, Navigation, etc.
**Aplicação:** Reutilizável em todas as stories

### Camada 5: 📚 Integração (Integration)
**O que?** Documentação completa do design system
**Para quem?** Desenvolvedores, designers, product managers
**Como?** Instruções claras, exemplos de uso, princípios

---

## 🚀 Como Começar

### 1️⃣ José Amorim Inicia Design Strategy
```bash
# Ativar José Amorim como design lead
@jose_amorim

# Executar design strategy session (Espiral Expansiva Layer 1-2)
*consult design-strategy-for-genialidade

# Output: Design Strategy Document com:
# - Visual metaphors
# - Color principles
# - Typography direction
# - Component patterns
```

### 2️⃣ Aria (Architect) Desenha Design System Architecture
```bash
# Ativar Aria para desenhar a arquitetura
@architect

# Executar design system architecture
*create-architecture design-system

# Output: Design System Architecture Doc com:
# - Design tokens strategy
# - Grid system specification
# - Component hierarchy
# - Tailwind configuration plan
```

### 3️⃣ Dex (Dev) Implementa Design System
```bash
# Ativar Dex para implementar
@dev

# Executar Story específica para design implementation
*develop design-system-story

# Output: Design tokens + Tailwind config pronto para uso
```

### 4️⃣ Uma (UX Designer) Refina Interaction Patterns
```bash
# Ativar Uma para refinar UX
@ux-design-expert

# Executar UX design refinement
*design interaction-patterns

# Output: Documented interaction patterns + accessibility review
```

---

## 📊 Structure

```
squads/design/
├── squad.yaml                           # Manifest (este documento)
├── README.md                            # Este arquivo
│
├── config/
│   ├── tech-stack.md                    # Tailwind, Figma, tools
│   ├── design-principles.md             # Principles + methodology
│   └── brand-guidelines.md              # Voice, imagery, icons
│
├── agents/
│   └── jose_amorim.yaml                 # José Amorim agent definition (if custom)
│
├── tasks/
│   ├── design-strategy.md               # Strategy session task
│   ├── design-system-architecture.md    # Architecture task
│   ├── design-system-implementation.md  # Dev task
│   └── design-ux-refinement.md         # UX task
│
├── templates/
│   ├── design-token-template.yaml      # Template for design tokens
│   ├── component-spec-template.md      # Template for component documentation
│   └── color-palette-template.yaml     # Template for color definitions
│
├── data/
│   ├── color-palette.yaml              # Color definitions
│   ├── typography-scale.yaml           # Typography system
│   └── spacing-system.yaml             # Spacing tokens
│
└── docs/
    ├── design-system-foundation.md     # DS-01
    ├── color-palette.md                # DS-02
    ├── typography.md                   # DS-03
    ├── grid-spacing.md                 # DS-04
    ├── component-library.md            # DS-05
    ├── tailwind-config.md              # DS-06
    └── brand-guidelines.md             # DS-07
```

---

## 👥 Team

| Role | Agent | Name | Status |
|------|-------|------|--------|
| **Design Lead** | @jose_amorim | José Amorim | 🟢 Ativo |
| **Architecture** | @architect | Aria | 🟡 A chamar |
| **Implementation** | @dev | Dex | 🟡 A chamar |
| **UX/Interaction** | @ux-design-expert | Uma | 🟡 A chamar |

---

## ⏱️ Timeline

- **Phase 1 Start:** 03/03/2026
- **Phase 1 End (Design System Foundation):** 06/03/2026
- **Phase 2 (Application to Form/Results/Email):** 05/03 — 08/03/2026
- **Phase 3 (Evolution/Advanced Components):** 09/03 onwards

---

## 🎯 Success Metrics

✅ Design System documentation 100% complete
✅ All 7 deliverables (DS-01 to DS-07) finished and approved
✅ Color palette passes WCAG AA contrast ratio tests
✅ Story 1.2 form design ready (no ambiguity for Dex)
✅ Tailwind config generated and tested
✅ Design reflects Anelise Methodology visual identity

---

## 📞 How to Activate This Squad

```bash
# Activate Design Squad with José Amorim
@jose_amorim

# Start design strategy
*consult genialidade-design-strategy
```

---

**Created:** 03/03/2026
**Lead:** José Amorim (@jose_amorim)
**Project:** Genialidade — Diagnóstico Neural Estruturado
