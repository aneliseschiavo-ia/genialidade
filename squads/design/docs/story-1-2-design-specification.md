# Story 1.2 — Design Specification

**Story:** 1.2 Formulário Web 28 Questões
**Design System:** Genialidade Design Squad
**Lead:** José Amorim (@jose_amorim)
**Status:** ✅ Design Ready for Development

---

## 🎯 Como o Design System se Aplica a Story 1.2

Story 1.2 implementa o **formulário interativo** usando o Design System criado em Camadas 1-5 da Espiral Expansiva.

### Resumo Visual (3 seções):
1. **Landing → Formulário** (transição suave)
2. **Progresso visual** (barra de progresso em OURO, não azul genérico)
3. **CTA final** (Submit com validação de 28/28 preenchidas)

---

## 📐 Design System Tokens — Aplicação Direta

### Cores
```
Headings (Bloco de questões):
  Font: Georgia, 20px, 600, #1a2332 (Deep Navy)
  Exemplo: "Dimensão: DESALINHAMENTO ESTRATÉGICO"

Pergunta (Texto da questão):
  Font: Inter, 16px, 400, #3a4a5a (Primary Light)
  Máx: 2-3 linhas (leitura rápida)
  Exemplo: "Você sente que há algo estruturalmente errado?"

Radio Options:
  Padding: 12px 16px
  Hover bg: rgba(90, 122, 111, 0.08) (Sage green suave)
  Selected: text color #9d8e5f (Ouro), font-weight 600
  Opções: Nunca / Raramente / Às Vezes / Frequentemente / Sempre

Progress Bar:
  Background: #e5e7eb (Neutral Gray)
  Fill: #9d8e5f (OURO — premium progress, não azul!)
  Height: 4px
  Label: "5 de 28" em #9a9a9a (Text Light)
```

### Spacing
```
Pergunta até opções: 32px (generous breathing)
Entre opções: 16px
Próxima pergunta: 48px (bloco + espaço)
Padding do container: 60px 40px (premium card spacing)
Margin lateral: 20px (mobile-safe)
```

### Buttons
```
"Próxima" (ATIVO — todas 28 preenchidas):
  Background: #9d8e5f (Ouro)
  Padding: 16px 32px
  Font: Inter, 16px, 600
  Hover: #b8a977 (mais claro)
  Shadow: 0 4px 6px rgba(157, 142, 95, 0.15)

"Anterior":
  Background: #e5e7eb (Neutral Gray)
  Font: Inter, 14px, 500
  Hover: border #9d8e5f
  No shadow

"Enviar Respostas" (SO AFTER 28/28):
  Background: #9d8e5f (Ouro)
  Padding: 16px 32px
  Text: #fafbfc (Off-white)
  Font: Inter, 16px, 600
  DISABLED antes de 28/28:
    Opacity: 50%
    Cursor: not-allowed
```

---

## 🎨 Layout & Seções (28 Questões organizadas em 6 Blocos)

### Bloco 1: ESTRUTURA (Q1-5)
**Tema:** "Entendo seu faturamento e operação"
**Cor accent:** Sage Green (#5a7a6f) — estrutura
**Questões:** Revenue, team size, offerings, operational clarity, growth phase

**Visual:**
```
┌─────────────────────────────────┐
│ Dimensão: ESTRUTURA             │  ← Heading Georgia 20px #1a2332
│ (Entendo seu faturamento)        │  ← Subtitle Inter 14px #9a9a9a
├─────────────────────────────────┤
│                                 │
│ Qual é seu faturamento atual?   │  ← Pergunta Inter 16px #3a4a5a
│                                 │
│ ◯ Até R$ 10k/mês                │
│ ◯ R$ 10-50k/mês                 │
│ ◯ R$ 50-100k/mês                │
│ ◯ R$ 100-500k/mês               │
│ ◯ Acima de R$ 500k/mês          │
│                                 │
├─────────────────────────────────┤
│ [Anterior] [Próxima →]          │
└─────────────────────────────────┘
```

### Bloco 2: PRIORIDADE (Q6-10)
**Tema:** "Entendo seu caos de decisões"
**Cor accent:** Ouro (#9d8e5f) — destaque
**Questões:** Decision paralysis, priority clarity, execution speed, focus issues, opportunity clarity

### Bloco 3: COERÊNCIA (Q11-15)
**Tema:** "Entendo seu desalinhamento"
**Cor accent:** Deep Navy (#1a2332) — investigação profunda
**Questões:** Strategy-execution gap, team alignment, positioning clarity, value proposition, market fit

### Bloco 4: FINANCEIRO (Q16-20)
**Tema:** "Entendo seu vazamento"
**Cor accent:** Sage Green (#5a7a6f) — transformação
**Questões:** Margin clarity, cost structure, pricing strategy, client quality, revenue concentration

### Bloco 5: PADRÃO (Q21-25)
**Tema:** "Entendo seu loop repetido"
**Cor accent:** Ouro (#9d8e5f) — ciclo
**Questões:** Pattern recognition, same problems repeat, frustration level, search for solutions, coach history

### Bloco 6: MATURIDADE (Q26-28)
**Tema:** "Entendo se você está pronto pra mudança"
**Cor accent:** Deep Navy (#1a2332) — readiness
**Questões:** Willingness to change, investment capability, timeline, decision authority, implementation commitment

---

## 📊 Progress Bar & Feedback

### Visual Progress
```
Progress should feel PREMIUM, not like a generic form:
- Smooth animation (300ms when updating)
- Ouro color (#9d8e5f) signals VALUE, not just progress
- Show "5 de 28" to create psychological momentum
- At 50% show subtle celebration emoji 💪
- At 75% show "casi ahí" energy 🎯
- At 100% show "Ready to submit!" with full ouro glow
```

### Auto-Save Feedback
```
- Silent save (no "Saving..." spinner)
- Subtle checkmark appears for 1s after save
- Keyboard focus maintained (no interruption)
- Error: "Salvar falhou. Tentando novamente..." (retry logic)
```

---

## 📱 Responsive Design (Mobile-First)

### Mobile (375px - 767px)
```
Padding: 24px 16px (not 60px 40px)
Heading: Georgia 20px (same, readable on mobile)
Pergunta: Inter 16px (readable)
Options: Full-width stacked radio buttons
Buttons: Full-width stacked
Progress: Horizontal bar + "5 de 28" above
Container: border-radius 0 (mobile aesthetic)
```

### Tablet (768px - 1024px)
```
Padding: 40px 32px
Container width: 700px max
Same heading sizes
Full radio layout
```

### Desktop (1025px+)
```
Padding: 60px 40px (premium)
Container width: 700px max
Centered in viewport
Full spacing scale
```

---

## ♿ Accessibility (WCAG AA)

### Labels & Semantics
```html
<label for="q1-option1">Nunca sinto isto</label>
<input type="radio" id="q1-option1" name="question-1">
<!-- NOT just radio without label -->

<!-- ARIA for progress -->
<div role="progressbar" aria-valuenow="5" aria-valuemin="0" aria-valuemax="28">
```

### Color Contrast
```
#1a2332 (text) on #fafbfc (bg): 12:1 ✅ AAA
#3a4a5a (secondary) on #fafbfc: 9:1 ✅ AAA
#9a9a9a (light) on #fafbfc: 6.5:1 ✅ AA
Ouro on white is NOT used for text (contraste insuficiente)
```

### Keyboard Navigation
```
- Tab moves through radio options
- Enter/Space selects option
- Can navigate buttons with Tab
- Focus ring visible (3px glow)
```

### Screen Reader
```
- Heading hierarchy: h1 (page) → h2 (bloco) → form labels
- Progress bar announced: "5 de 28, 18% completo"
- Form submit disabled state: "button disabled, complete all questions"
```

---

## 🔧 Implementation Checklist for @dev

- [ ] Create `pages/formulario.tsx` (Next.js page)
- [ ] Create `components/FormularioDiagnostico.tsx` (main form component)
- [ ] Create `components/QuestaoCard.tsx` (question card component)
- [ ] Create `lib/formulario.api.ts` (API calls)
- [ ] Load 28 questions from database (Story 1.1 dependency)
- [ ] Render questions dynamically by block (6 blocos)
- [ ] Implement validation (each option required before next)
- [ ] Implement auto-save with debounce (POST /api/respostas)
- [ ] Implement progress bar (updates real-time)
- [ ] Implement context persistence (localStorage + DB)
- [ ] Implement mobile responsiveness (375px+)
- [ ] Implement accessibility (labels, contrast, keyboard, ARIA)
- [ ] Implement CTA logic (submit disabled until 28/28)
- [ ] Create E2E test (Cypress/Playwright)
- [ ] Test dark mode (design system should support it)

---

## 📚 Design System Reference Files

**Use These During Implementation:**
1. `squads/design/docs/design-system-visual-reference.md` — Complete tokens
2. `squads/design/design-preview.html` — Live preview (formulário section)
3. `squads/design/config/tech-stack.md` — Tailwind/CSS variables setup

---

## 🎯 Design Principles for Story 1.2

1. **Elegância, não clutter** — Espaçamento generoso
2. **Clareza, não ambiguidade** — Labels explícitos, instrução clara
3. **Momentum, não fricção** — Progresso visível, validação suave
4. **Valor, não genérico** — Cada pergunta reforça compreensão
5. **Premium, não apressado** — Transições 300-600ms, não instantâneo

---

**Design Spec Criado por:** José Amorim (@jose_amorim)
**Próximo:** @dev implementa Story 1.2 com este design
**Status:** ✅ Aprovado, pronto para desenvolvimento
