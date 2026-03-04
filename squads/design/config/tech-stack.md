# Tech Stack — Design Squad

## 🎨 Design Tools

### Figma
- **Purpose:** Design, prototyping, component library
- **Setup:** Create Figma file for Genialidade Design System
- **Structure:**
  - Page 1: Color Palette
  - Page 2: Typography System
  - Page 3: Grid & Spacing
  - Page 4: Components (button, input, card, etc.)
  - Page 5: Form (Story 1.2 - 28 questions)
  - Page 6: Results Dashboard (Story 1.3)
  - Page 7: Email Templates (Story 1.4)
  - Page 8: Mobile Responsive Variants

**Link:** (Create and share with team)

---

## 💻 Frontend Tech Stack

### Framework
- **Next.js 14+** (React Server Components)
- **TypeScript** (type safety)
- **Tailwind CSS** (utility-first styling)

### Styling Approach
```
Design System (Figma) → Design Tokens (YAML) → Tailwind Config → Components (React)
```

### Design Tokens Strategy

#### 1. Token Definition (YAML format)
**File:** `data/design-tokens.yaml`

```yaml
colors:
  primary:
    50: '#f0f9ff'
    100: '#e0f2fe'
    500: '#0ea5e9'
    900: '#0c2d4d'

  semantic:
    success: '#10b981'
    error: '#ef4444'
    warning: '#f59e0b'
    info: '#3b82f6'

typography:
  fonts:
    sans: ['Inter', 'system-ui']
    mono: ['Fira Code']

  sizes:
    xs: '12px'
    sm: '14px'
    base: '16px'
    lg: '18px'
    xl: '20px'
    h1: '32px'
    h2: '24px'

spacing:
  unit: '4px'
  scale: [0, 4, 8, 12, 16, 20, 24, 32, 40, 48]
```

#### 2. Tailwind Configuration
**File:** `tailwind.config.js`

```javascript
// Importa design tokens e gera Tailwind config
// Colors, spacing, typography, shadows via design tokens
// Garante 100% consistência entre Figma e código
```

#### 3. CSS Variables (for dynamic theming)
**File:** `styles/globals.css`

```css
:root {
  --color-primary: #0ea5e9;
  --color-secondary: #6366f1;
  --spacing-unit: 4px;
  /* ... */
}
```

---

## 📐 Component Architecture

### Atomic Design Pattern
```
Atoms (Button, Input, Badge)
  ↓
Molecules (InputGroup, FormField)
  ↓
Organisms (Form, Card, Modal)
  ↓
Templates (Dashboard, Page layouts)
  ↓
Pages (Story-specific implementations)
```

### Component Documentation
- **Tool:** Storybook
- **Location:** `packages/frontend/src/stories/`
- **For each component:** Design specs + usage examples + accessibility notes

---

## 🎯 Design System Documentation

### Structure
```
docs/design-system/
├── 01-design-principles.md
├── 02-color-system.md
├── 03-typography.md
├── 04-spacing-grid.md
├── 05-components.md
│   ├── button.md
│   ├── input.md
│   ├── form.md
│   ├── card.md
│   └── ... (each component documented)
├── 06-patterns.md
│   ├── form-patterns.md
│   ├── validation-patterns.md
│   └── error-patterns.md
└── 07-brand-guidelines.md
```

---

## 🔧 Implementation Workflow

### Step 1: Design Strategy (José Amorim)
- Define visual metaphors using Espiral Expansiva
- Create color direction + typography direction
- Define component patterns

### Step 2: Design System Architecture (Aria)
- Map design tokens to Tailwind config
- Define component hierarchy
- Plan design token generation

### Step 3: Implementation (Dex)
- Create Tailwind config from tokens
- Build components in React/TypeScript
- Create Storybook documentation
- Test accessibility (WCAG AA)

### Step 4: UX Refinement (Uma)
- Validate interaction patterns
- Test accessibility
- Suggest UX improvements
- Document patterns

---

## 📊 Color System

### Primary Colors
- **Primary:** Brand color (neural/diagnostic theme)
- **Secondary:** Supporting interactions
- **Accent:** Calls-to-action

### Semantic Colors
- **Success:** ✅ Green (#10b981)
- **Error:** ❌ Red (#ef4444)
- **Warning:** ⚠️ Amber (#f59e0b)
- **Info:** ℹ️ Blue (#3b82f6)

### Neutral Colors
- **Backgrounds:** Light grays
- **Text:** Dark grays/blacks
- **Borders:** Medium grays
- **Disabled:** Light grays

### Accessibility
- All colors must meet WCAG AA contrast ratio (4.5:1 for text)
- Test with colorblind simulators (Protanopia, Deuteranopia, Tritanopia)

---

## 🔤 Typography System

### Font Families
- **Sans (body):** Inter (excellent readability + open source)
- **Mono (code):** Fira Code (monospace consistency)
- **Headings:** Same sans (hierarchy via size/weight)

### Scale
| Level | Size | Weight | Use |
|-------|------|--------|-----|
| h1 | 32px | 700 | Page titles |
| h2 | 24px | 700 | Section headers |
| h3 | 20px | 600 | Subsection headers |
| h4 | 18px | 600 | Card titles |
| base | 16px | 400 | Body text (primary) |
| sm | 14px | 400 | Secondary text |
| xs | 12px | 400 | Captions, metadata |
| mono | 14px | 400 | Code blocks |

### Line Heights
- Headings: 1.2
- Body: 1.6 (readability)
- Compact: 1.4 (forms, lists)

---

## 📏 Spacing & Grid System

### Base Unit
- **8px unit** (divisible by 4 and 8 for responsive breakpoints)

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

### Grid
- **Columns:** 12-column responsive grid
- **Breakpoints:**
  - sm: 640px
  - md: 768px
  - lg: 1024px
  - xl: 1280px
  - 2xl: 1536px

---

## ✅ Quality Gates

### Design Review
- [ ] All components follow design system tokens
- [ ] Color contrast ratios pass WCAG AA
- [ ] Typography scales are readable at all sizes
- [ ] Spacing is consistent
- [ ] Components work on mobile (320px), tablet, desktop

### Code Review
- [ ] No hardcoded colors (use Tailwind/CSS variables)
- [ ] No custom fonts (use system/configured fonts)
- [ ] No magic numbers (use spacing scale)
- [ ] All components documented in Storybook
- [ ] TypeScript types are correct
- [ ] Accessibility tests pass (axe-core)

### Accessibility Testing
- [ ] Color contrast ≥ 4.5:1 for text
- [ ] Keyboard navigation works (Tab, Enter, Escape)
- [ ] Screen reader friendly (semantic HTML, ARIA labels)
- [ ] Focus visible (visible focus indicators)
- [ ] Mobile touch targets ≥ 44px

---

## 🚀 Deployment

### Development
```bash
npm run dev
# Runs Next.js dev server with Tailwind watch
```

### Storybook
```bash
npm run storybook
# Runs Storybook for component development
```

### Build
```bash
npm run build
# Builds Next.js app with production Tailwind optimization
```

---

## 📚 Resources

- **Tailwind Docs:** https://tailwindcss.com
- **Figma Design Systems:** https://www.figma.com/resources/
- **WCAG Accessibility:** https://www.w3.org/WAI/WCAG21/quickref/
- **Storybook:** https://storybook.js.org/

---

## 🔄 Iteration Cycle

1. **José** → Design direction (Espiral Expansiva)
2. **Aria** → System architecture
3. **Dex** → Implementation + Tailwind config
4. **Uma** → UX refinement + accessibility
5. **Repeat** for improvements

---

**Version:** 1.0
**Last Updated:** 03/03/2026
**Maintained By:** Design Squad Lead (José Amorim)
