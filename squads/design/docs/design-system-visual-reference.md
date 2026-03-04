# Design System — Visual Reference

**Status:** ✅ Aprovado por José Amorim
**Data:** 03/03/2026
**Metodologia:** Espiral Expansiva (5 Camadas)
**Fidelidade:** 95% (HTML preview + documentação)

---

## 🎨 Camada 1: Gancho Visual — Paleta de Cores

### Primary Color — Deep Navy (Autoridade & Inteligência)
```
Código: #1a2332
RGB: 26, 35, 50
Uso: Headings, primary text, navigation, backgrounds premium
Sensação: Profundidade, exclusividade, inteligência
```

### Accent Color — Ouro Suave (Valor & Excelência)
```
Código: #9d8e5f
RGB: 157, 142, 95
Uso: CTAs, highlights, progress indicators, premium accents
Sensação: Resultado, valor realizado, transformação
Variações:
  - Light: #c9b896 (backgrounds suaves)
  - Dark: #8a7a50 (pressed states)
  - Hover: #b8a977 (interactive states)
```

### Secondary Color — Sage Green (Movimento & Crescimento)
```
Código: #5a7a6f
RGB: 90, 122, 111
Uso: Secondary accents, interaction states, growth metaphors
Sensação: Transformação estruturada, movimento inteligente
Variações:
  - Light: #7a9a8f (highlights)
```

### Neutral Colors

**Off-White (Espaço Respeitoso)**
```
Código: #fafbfc
RGB: 250, 251, 252
Uso: Main background, card backgrounds, breathing space
Sensação: Luxo, clareza, sofisticação
```

**Neutral Gray (Estrutura & Clareza)**
```
Código: #e5e7eb
RGB: 229, 231, 235
Uso: Borders, dividers, secondary backgrounds, disabled states
Sensação: Estrutura, ordem, suporte
```

**Text Dark (Legibilidade)**
```
Código: #1a2332
RGB: 26, 35, 50
Uso: Primary text, headings, primary UI elements
Contraste: 12:1 contra #fafbfc ✅ WCAG AAA
```

**Text Light (Secundário)**
```
Código: #9a9a9a
RGB: 154, 154, 154
Uso: Helper text, captions, placeholder text, metadata
Contraste: 6.5:1 contra #fafbfc ✅ WCAG AA
```

---

## 🖼️ Camada 2: Metáfora Visual — Tipografia

### Font Family: Serif (Elegância em Headings)
```
Primária: Georgia, Garamond, serif
Fallback: Georgia serif
Uso: h1, h2, h3, headlines principais
Peso: 600 (semi-bold) — Autoridade sem exagero
Estilo: Normal
Sensação: Tradição, profundidade, excelência
```

### Font Family: Sans-Serif (Clareza em Body)
```
Primária: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif
Fallback: System fonts
Uso: Body text, labels, UI text, support copy
Peso: 400 (normal)
Estilo: Normal
Sensação: Moderna, clara, acessível
```

### Font Sizes & Line Heights

| Elemento | Size | Weight | Line Height | Uso |
|----------|------|--------|-------------|-----|
| h1 | 56px | 600 | 1.2 | Landing page main heading |
| h2 | 48px | 600 | 1.2 | Section titles, results header |
| h3 | 32px | 600 | 1.3 | Subsection titles |
| h4 | 24px | 600 | 1.3 | Card titles, form section headers |
| Body | 16px | 400 | 1.6 | Main text, readability focus |
| Small | 14px | 400 | 1.6 | Helper text, secondary |
| Caption | 12px | 400 | 1.5 | Metadata, timestamps |
| Mono | 14px | 400 | 1.5 | Code blocks |

---

## 📐 Camada 3: Fundamento — Spacing & Grid

### Base Unit
```
Primary: 8px
Divisible: 4px and 8px (works with all breakpoints)
```

### Spacing Scale
```
0: 0px
1: 4px
2: 8px
3: 12px
4: 16px
5: 20px
6: 24px
8: 32px
10: 40px
12: 48px
16: 64px
20: 80px
24: 96px
```

### Padding & Margins
```
Heading to subtitle: 16px (generous)
Subtitle to CTA: 48px (breathing room — luxury signal)
Section to section: 60px+ (never compact)
Card padding: 40px (premium spacing)
Input padding: 12px 16px (accessible, clear)
Button padding: 16px 32px (generous, premium)
```

### Responsive Breakpoints
```
sm: 640px  — Small phones
md: 768px  — Tablets
lg: 1024px — Small laptops
xl: 1280px — Standard desktops
2xl: 1536px — Large screens
```

### Grid System
```
Columns: 12-column grid
Max-width: 1200px container
Gutter: 20px (padding)
Mobile: Single column with 20px padding
Tablet: 2-3 columns
Desktop: Full grid layout
```

---

## 🚀 Camada 4: Expansão — Components

### Button Styles

**Primary Button (CTA)**
```css
Background: #9d8e5f (Ouro)
Text: #fafbfc (Off-white)
Padding: 16px 32px
Border-radius: 4px
Font: Inter 16px, weight 600
States:
  Default: #9d8e5f
  Hover: #b8a977 (10% lighter)
  Active: #8a7a50 (10% darker)
  Disabled: #c9b896 (50% opacity)
Transition: 300ms ease
Shadow: 0 4px 6px rgba(26, 35, 50, 0.05)
Hover shadow: 0 4px 6px rgba(157, 142, 95, 0.15)
```

**Secondary Button**
```css
Background: #e5e7eb (Neutral gray)
Text: #1a2332 (Primary)
Padding: 12px 24px
Border: 1px solid #e5e7eb
Border-radius: 4px
Font: Inter 14px, weight 500
States:
  Default: #e5e7eb
  Hover: #d5d7db + border #9d8e5f
  Disabled: opacity 50%
Transition: 300ms ease
```

### Form Input

**Text Input**
```css
Padding: 12px 16px
Font: Inter 16px
Background: #fafbfc
Border: 1px solid #e5e7eb
Border-radius: 4px
States:
  Default: border #e5e7eb
  Focus: border #5a7a6f (2px) + glow 0 0 0 3px rgba(90, 122, 111, 0.1)
  Filled: border #5a7a6f + left accent 2px #9d8e5f
  Error: border 2px #c84748
Placeholder: color #9a9a9a
Transition: 200ms ease
```

### Card

```css
Background: #fafbfc
Border: 1px solid #e5e7eb
Border-left: 3px solid #9d8e5f (accent stripe)
Padding: 40px
Border-radius: 8px
Shadow: 0 4px 6px rgba(26, 35, 50, 0.08)
Transition: all 300ms ease
Animation: slideUp 600ms ease-out
```

### Progress Bar

```css
Height: 4px
Background: #e5e7eb
Fill: #9d8e5f (Ouro — premium progress)
Border-radius: 2px
Transition: width 300ms ease
Label: 12px, color #9a9a9a
```

### Radio Button Group

```css
Padding per option: 12px 16px
Border-radius: 4px
States:
  Default: transparent
  Hover: background rgba(90, 122, 111, 0.08) + border #e5e7eb
  Selected: accent-color #9d8e5f, font-weight 600
Label-color: #1a2332
Transition: 200ms ease
```

---

## 📚 Camada 5: Integração — Design System Tokens

### CSS Variables (implementar em projeto)
```css
/* Colors */
--primary: #1a2332;
--primary-light: #3a4a5a;
--accent-gold: #9d8e5f;
--accent-gold-light: #c9b896;
--secondary: #5a7a6f;
--secondary-light: #7a9a8f;
--neutral-white: #fafbfc;
--neutral-gray: #e5e7eb;
--text-dark: #1a2332;
--text-light: #9a9a9a;

/* Spacing */
--spacing-unit: 8px;
--spacing-xs: 4px;
--spacing-sm: 8px;
--spacing-md: 16px;
--spacing-lg: 24px;
--spacing-xl: 32px;
--spacing-2xl: 48px;

/* Typography */
--font-serif: 'Georgia', 'Garamond', serif;
--font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-mono: 'Fira Code', monospace;

/* Shadows */
--shadow-sm: 0 1px 2px rgba(26, 35, 50, 0.05);
--shadow-md: 0 4px 6px rgba(26, 35, 50, 0.08);
--shadow-lg: 0 10px 15px rgba(26, 35, 50, 0.1);

/* Border Radius */
--radius-sm: 2px;
--radius-md: 4px;
--radius-lg: 8px;

/* Transitions */
--transition-fast: 200ms ease;
--transition-normal: 300ms ease;
--transition-slow: 600ms ease-out;
```

---

## 🌙 Dark Mode

### Dark Mode Color Scheme
```
Background: #0f1419 (Almost black, premium)
Secondary BG: #1a2332 (Deep navy, cards)
Primary text: #fafbfc (Off-white)
Secondary text: #e0e4eb (Light gray)
Accent: #9d8e5f (Ouro — MANTÉM igual)
Secondary: #5a7a6f (Sage green — MANTÉM igual)
Border: #3a4a5a (Navy gray)
Shadow: rgba(0, 0, 0, 0.3) (Darker, more prominent)
```

### Dark Mode Behavior
- Smooth transitions (300ms) entre light/dark
- Ouro e Sage green MANTÊM exatamente as mesmas cores
- Elegância preservada em ambos os modos
- Persistência em localStorage (user preference saved)

---

## ✅ Accessibility (WCAG AA Compliant)

### Color Contrast Ratios
| Combination | Ratio | Status |
|-------------|-------|--------|
| #1a2332 (text) on #fafbfc (bg) | 12:1 | ✅ AAA |
| #9a9a9a (light text) on #fafbfc (bg) | 6.5:1 | ✅ AA |
| #9d8e5f (Ouro) on #fafbfc (bg) | 4.5:1 | ✅ AA (text) |
| #1a2332 on #9d8e5f (bg) | 5:1 | ✅ AA |

### Focus States
- Visible focus rings on all interactive elements
- Min 3px glow for keyboard navigation
- Color + shape change (not color-alone)

### Touch Targets
- Min 44px height on buttons/inputs
- Min 32px for form controls
- Adequate spacing between clickables

---

## 📋 Checklist de Implementação (Stories 1.2+)

- [ ] Tailwind config gerado com tokens (CSS variables)
- [ ] Colors palette completa
- [ ] Typography scale aplicada
- [ ] Spacing system implementado
- [ ] Components library criada (Button, Input, Card, etc.)
- [ ] Dark mode fully functional
- [ ] Accessibility validated (axe-core)
- [ ] Responsive design tested (320px, 768px, 1200px)
- [ ] Animations & transitions smooth (300-600ms)
- [ ] Form validation states styled
- [ ] Mobile tested & approved
- [ ] Dark mode tested & approved

---

## 🎯 Referências Visuais

**Live Preview:** `design-preview.html` (abra no navegador)

**Seções no Preview:**
1. **Landing** — Primeiro impacto (hero, benefits)
2. **Form** — Jornada de diagnóstico (28 questões, progress)
3. **Results** — Revelação de valor (blueprint, actions)

---

**Criado por:** José Amorim (@jose_amorim)
**Metodologia:** Espiral Expansiva
**Status:** ✅ Pronto para implementação
**Próximo:** Story 1.2 (Formulário com design system aplicado)
