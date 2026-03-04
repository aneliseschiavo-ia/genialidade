# Task: Design Strategy Initiation — Espiral Expansiva

**Squad:** Design (Genialidade)
**Lead:** José Amorim (@jose_amorim)
**Duration:** 4-6 hours
**Output:** Design Strategy Document (with 5-layer visual direction)

---

## 📋 Objetivo

Criar a ESTRATÉGIA VISUAL inicial usando a Espiral Expansiva de José Amorim.
Traduzir a promessa da Metodologia Anelise ("Diagnóstico Neural Estruturado") em linguagem visual.

---

## 🎯 Entrega

**Design Strategy Document com:**
1. ✅ Visual metaphors que refletem a metodologia
2. ✅ Color direction (primária, secundária, semântica)
3. ✅ Typography direction (sans + headings + body)
4. ✅ Component patterns iniciais
5. ✅ Design principles (5 camadas Espiral Expansiva)

---

## 🧠 Processo: Espiral Expansiva

### Camada 1: Gancho Visual (Visual Hook)
**Pergunta:** O que "Diagnóstico Neural Estruturado" DEVE EVOCAR visualmente?

**Análise:**
- Diagnóstico = Inteligência, clareza, precisão
- Neural = Movimento, energia, conexões
- Estruturado = Ordem, sistema, confiabilidade

**Resultado esperado:**
```
Color Direction:
- Primary: Azul (confiança, inteligência, profundismo)
- Secondary: Verde (movimento, transformação, vitalidade)
- Accent: Âmbar/Laranja (energia, clareza, destaque)
- Neutral: Cinza (estrutura, base sólida)

Typography Direction:
- Sans serif moderno (Inter, Poppins) — clareza + contemporâneo
- Headings: Peso 700 (autoridade metodológica)
- Body: Peso 400 (leitura confortável)
```

**Document:** Salvar em `data/layer-1-visual-hook.md`

---

### Camada 2: Metáfora Visual (Visual Metaphor)
**Pergunta:** Como os COMPONENTES refletem a METODOLOGIA?

**Mapeamento:**
```
Metodologia Elemento         → Visual Componente
─────────────────────────────────────────────────
Diagnóstico (entrada)        → Form (28 questions)
Processamento (análise)      → Progress indicators
Resultado (saída)            → Card/Dashboard (scores)
Blueprint (ação)             → Call-to-action (next steps)
Transformação (impact)       → Visual progression (before/after)
```

**Padrões de Interação:**
```
- Cards que se "revelam" (como diagnóstico se revela)
- Progress que mostra "estrutura" (não linear, estruturado)
- Form fields com "clareza progressiva" (questão por questão)
- Results com "visualização de movimento" (mudança de direção)
```

**Document:** Salvar em `data/layer-2-visual-metaphor.md`

---

### Camada 3: Fundamento (Foundation)
**Pergunta:** Qual é a BASE SISTEMÁTICA?

**Design Tokens:**
```yaml
colors:
  primary-500: #0EA5E9 (azul confiança)
  primary-900: #0C2D4D (azul profundo)
  secondary-500: #10B981 (verde movimento)
  accent-500: #F59E0B (âmbar clareza)

typography:
  sans: Inter
  sizes:
    h1: 32px / 1.2
    h2: 24px / 1.2
    body: 16px / 1.6

spacing:
  unit: 8px
  scale: [0, 8, 16, 24, 32, 40, 48, 64, 80, 96]
```

**Grid & Spacing:**
```
- 12-column grid (mobile-first responsive)
- 8px base unit (divisível por 4 e 8)
- Padding/margin usando scale (não valores aleatórios)
```

**Document:** Salvar em `config/design-tokens.yaml`

---

### Camada 4: Expansão (Expansion)
**Pergunta:** Como isso ESCALA em componentes?

**Componentes Iniciais:**
```
1. Button
   - Primary (azul)
   - Secondary (verde)
   - Disabled state
   - Loading state

2. Form Input
   - Text input
   - Select dropdown
   - Validation states (error, success)
   - Help text

3. Form Container
   - Label + Input + Help text
   - Spacing consistente
   - Validation messaging

4. Card
   - Header (titulo)
   - Body (conteúdo)
   - Footer (CTA)
   - Responsive sizing

5. Progress Indicator
   - Visual que comunica "estrutura"
   - Step-by-step progression
   - Completion state

6. Result Dashboard
   - Visualização de scores (4 dimensões)
   - Visual progress (antes/depois)
   - Actionable insights
```

**Variações por Estado:**
```
Default → Hover → Focus → Disabled → Loading → Error
```

**Document:** Salvar em `data/component-patterns.md`

---

### Camada 5: Integração (Integration)
**Pergunta:** Como COMUNICO isso ao time?

**Documentação:**
```
docs/design-system-foundation.md
├── 1. Design Principles (por quê essas escolhas?)
├── 2. Color System (cores + accessibility)
├── 3. Typography (escala + pairing)
├── 4. Spacing & Grid (sistemático, não aleatório)
├── 5. Components (specs + usage examples)
├── 6. Patterns (form patterns, validation, etc.)
└── 7. Brand Guidelines (voice, imagery, tone)
```

**For Developers (Dex):**
```
"Aqui está tudo que você precisa implementar.
Zero ambiguidade. Siga os tokens. Faça teste em mobile."
```

**For Designers (Future):**
```
"Aqui está o sistema. Qualquer novo componente
segue essa estrutura (tokens, states, responsiveness)."
```

**Document:** Salvar em `docs/design-system-foundation.md`

---

## ✅ Acceptance Criteria

- [ ] Layer 1: Visual Hook document completo (cores + tipografia vision)
- [ ] Layer 2: Visual Metaphor document completo (componentes mapeados)
- [ ] Layer 3: Design tokens YAML defined (colors, typography, spacing)
- [ ] Layer 4: Component patterns detailed (8-10 componentes iniciais)
- [ ] Layer 5: Design System Foundation doc completo (5 seções)
- [ ] All documents salvo em `docs/` do squad
- [ ] Jose Amorim aprovado (estratégia reflete metodologia)
- [ ] Pronto para Aria (Design System Architecture)

---

## 📁 Output Files

```
squads/design/
├── data/
│   ├── layer-1-visual-hook.md
│   ├── layer-2-visual-metaphor.md
│   └── component-patterns.md
│
├── config/
│   └── design-tokens.yaml
│
└── docs/
    └── design-system-foundation.md
```

---

## 🚀 Próximos Passos

1. ✅ **José Amorim** completa Design Strategy (este task)
2. ➡️ **Aria** converte em Design System Architecture
3. ➡️ **Dex** implementa Design tokens + Tailwind
4. ➡️ **Uma** refina UX + Accessibility
5. ➡️ **Dex** implementa Stories 1.2+ com design

---

## 💡 Notas para José

- Confessionalidade: Explica POR QUÊ cada escolha visual
- Metáforas visuais: Tudo comunica a metodologia
- Sistemático: Design tokens não são aleatórios
- Escalável: Componentes podem crescer sem perder coerência
- Transformacional: Design reflete a promessa (diagnóstico → clareza)

---

**Iniciador:** Craft (Squad Creator)
**Data:** 03/03/2026
**Prioridade:** 🔴 BLOCKER (Stories 1.2+ dependem disso)
