---
task: Design System Creation — Genialidade MVP
responsavel: "@jose_amorim_design_lead"
responsavel_type: agent
atomic_layer: task
squad: design-squad
epic: "Visual Identity & Design System"
Entrada: |
  - Product narrative (Anelise Methodology MVP)
  - Brand values and personality
  - Target audience demographics
  - Accessibility requirements (WCAG 2.1 AA minimum)
  - Existing visual assets (if any)
Saida: |
  - design-system/ folder with all deliverables
  - Color palette with accessibility audit
  - Typography system documentation
  - Component library specification
  - Layout system (grid + spacing)
  - Design tokens (JSON + CSS Variables)
  - Design-to-dev handoff guide
  - Brand guidelines documentation
Checklist:
  - "[ ] Discover and document design principles"
  - "[ ] Create color palette (light + dark modes)"
  - "[ ] Audit color accessibility (WCAG AA+)"
  - "[ ] Design typography system"
  - "[ ] Create component library specs"
  - "[ ] Design responsive layout system"
  - "[ ] Generate design tokens (JSON)"
  - "[ ] Export CSS Variables configuration"
  - "[ ] Write design-dev handoff guide"
  - "[ ] Create brand guidelines"
  - "[ ] Accessibility audit (full WCAG 2.1 AA)"
  - "[ ] Team onboarding documentation"
  - "[ ] Validate with stakeholders"
---

# Design System Creation — Genialidade MVP

## Overview

Create a comprehensive, token-based design system for Genialidade (Anelise Methodology MVP) that:
1. Aligns visual language with product narrative
2. Ensures accessibility from the ground up (WCAG 2.1 AA)
3. Enables rapid, consistent component development
4. Scales to support platform expansion
5. Bridges design and development seamlessly

## Strategic Context

**Project:** Genialidade — Anelise Methodology MVP (Diagnóstico Neural)
**Vision:** Visual system that reflects Anelise's rigor, clarity, and human-centered approach
**Scope:** Web application (desktop + responsive mobile)
**Timeline:** MVP launch + scalability for future products

## Phase 1: Discovery & Strategy

### 1.1 Document Design Principles

Based on Anelise Methodology values:
- [ ] **Clarity:** Visual information hierarchy that guides users
- [ ] **Scientific Rigor:** Precise, measured, data-informed design
- [ ] **Accessibility First:** Inclusive design for all cognitive types
- [ ] **Human-Centered:** Visual language that builds trust
- [ ] **Consistency:** Token-based system for coherence

### 1.2 Audit Existing Assets

- [ ] Collect all current logos, color usage, typography
- [ ] Document what works, what doesn't
- [ ] Identify visual debt or inconsistencies
- [ ] Document competitive visual landscape

### 1.3 Define Brand Personality

Map to visual attributes:
- [ ] Primary emotions → colors
- [ ] Brand attributes → typography selection
- [ ] Tone → visual metaphors, illustration style
- [ ] Cultural context → color symbolism

### 1.4 Set Accessibility Baseline

- [ ] Minimum WCAG 2.1 AA compliance
- [ ] Define contrast ratio targets (4.5:1 for normal text)
- [ ] Plan for color-blind accessible palettes
- [ ] Document dyslexia-friendly typography strategy

## Phase 2: Color Palette Design

### 2.1 Primary Color Selection

Define core brand colors:
- [ ] Primary color (1-2 main brand colors)
- [ ] Secondary colors (2-3 supporting colors)
- [ ] Accent colors (emphasis, highlights)
- [ ] Neutral palette (grays, blacks, whites)

Example structure:
```
Primary: #1F2937 (Slate-900) — Authority, trust, science
Accent: #DC2626 (Red-600) — Attention, data insights
Secondary: #059669 (Emerald-600) — Growth, progress
Neutrals: #F9FAFB - #111827 (Full gray scale)
```

### 2.2 Semantic Color Tokens

Assign meaning to colors:
- [ ] Success (positive, growth) → Green shades
- [ ] Error (warning, critical) → Red shades
- [ ] Warning (caution) → Amber/Yellow shades
- [ ] Info (informational) → Blue shades
- [ ] Neutral (background, text) → Gray scale

### 2.3 Contrast Audit

For every color combination:
- [ ] Text on background: min 4.5:1 (WCAG AA)
- [ ] Large text: min 3:1 (WCAG AA)
- [ ] UI components: min 3:1 (WCAG AA)
- [ ] Grayscale simulation (color-blindness check)

### 2.4 Dark Mode Palette

Create inverted palette:
- [ ] Light mode ↔ Dark mode color mapping
- [ ] Ensure contrast ratios maintained in dark mode
- [ ] Test readability in both modes
- [ ] Document edge cases (images, charts)

### 2.5 Documentation

Create `COLOR-PALETTE.md`:
- Color definitions (hex, RGB, HSL, CSS variables)
- Semantic usage guidelines
- Accessibility notes per color
- Dark/light mode mapping table
- Visual showcase with contrast ratios

## Phase 3: Typography System

### 3.1 Font Selection

- [ ] Primary font (body, UI text) — readability focus
- [ ] Secondary font (headings, display) — brand personality
- [ ] Monospace font (code snippets, data)

Recommendation for scientific/clear brand:
- Primary: Inter, System UI, or similar (clean, neutral)
- Secondary: Font that matches brand personality
- Mono: JetBrains Mono, Monaco, or Courier Prime

### 3.2 Type Scale

Create harmonic scale (base size: 16px):
- [ ] Body text: 14px, 16px
- [ ] Small: 12px (captions, metadata)
- [ ] Large: 18px, 20px
- [ ] Headings: h6 (20px), h5 (24px), h4 (30px), h3 (36px), h2 (48px), h1 (60px+)
- [ ] Display: 72px+ (hero sections)

### 3.3 Line Heights & Letter Spacing

- [ ] Body text: 1.6 (24px for 16px base)
- [ ] Headings: 1.2-1.4
- [ ] Code: 1.5
- [ ] Letter spacing: 0 (default), ±0.5%, ±1% variants

### 3.4 Font Weights

- [ ] Regular (400) — body text
- [ ] Medium (500) — emphasis
- [ ] Semibold (600) — subheadings
- [ ] Bold (700) — strong emphasis
- [ ] (Optional) Thin/Light for display

### 3.5 Documentation

Create `TYPOGRAPHY.md`:
- Font families with fallback stacks
- Type scale visual showcase
- Line height/letter spacing chart
- Usage guidelines per element (h1, p, button, etc.)
- Responsive type behavior (desktop vs mobile)
- Accessibility notes (dyslexia-friendly considerations)

## Phase 4: Component Library Specification

### 4.1 Atomic Components

Define reusable UI building blocks:
- [ ] **Buttons** (primary, secondary, tertiary, danger, disabled states)
- [ ] **Inputs** (text, email, password, number, select, checkbox, radio)
- [ ] **Cards** (content containers, variants)
- [ ] **Badges & Tags** (labels, statuses)
- [ ] **Alerts** (success, error, warning, info)
- [ ] **Modals/Dialogs** (confirmation, forms, etc.)
- [ ] **Dropdowns/Menus** (select menus, navigation)
- [ ] **Tables** (data display, sorting, pagination)
- [ ] **Forms** (input groups, labels, validation)
- [ ] **Navigation** (header, footer, sidebar, breadcrumbs)

### 4.2 Component Specs

For each component:
- [ ] Size variants (small, medium, large)
- [ ] State variants (default, hover, active, disabled, loading, error)
- [ ] Color variants (primary, secondary, danger, etc.)
- [ ] Responsive behavior (mobile vs desktop)
- [ ] Accessibility requirements (ARIA, keyboard nav)
- [ ] Usage guidelines (when to use, when not to)

### 4.3 Documentation

Create `COMPONENTS.md`:
- Component inventory with visual preview
- Component spec template (size, states, usage)
- Do's and don'ts for each component
- Code examples (React/Vue/etc.)
- Accessibility checklist per component

## Phase 5: Layout System

### 5.1 Grid System

- [ ] Column count: 12 columns (standard)
- [ ] Gutter width: 16px, 24px, 32px (spacing scale)
- [ ] Container widths: mobile (100%), tablet (768px), desktop (1024px), wide (1280px)
- [ ] Breakpoints: mobile (0px), tablet (768px), desktop (1024px), wide (1280px+)

### 5.2 Spacing Scale

Create harmonic spacing (base: 8px):
- [ ] xs: 4px
- [ ] sm: 8px
- [ ] md: 16px
- [ ] lg: 24px
- [ ] xl: 32px
- [ ] 2xl: 48px
- [ ] 3xl: 64px

### 5.3 Layout Patterns

- [ ] Hero section layout
- [ ] Card grid (3-column, 2-column, responsive)
- [ ] Sidebar + content layout
- [ ] Modal/overlay patterns
- [ ] Mobile navigation patterns

### 5.4 Documentation

Create `LAYOUT-SYSTEM.md`:
- Grid visual showcase
- Spacing scale visualization
- Responsive behavior guide
- Common layout patterns with code
- Breakpoint usage guidelines

## Phase 6: Design Tokens & Implementation

### 6.1 Generate Design Tokens

Create `design-tokens.json` with:
```json
{
  "colors": {
    "primary": { "50": "#...", "100": "#...", ..., "900": "#..." },
    "semantic": {
      "success": "#...",
      "error": "#...",
      "warning": "#...",
      "info": "#..."
    }
  },
  "typography": {
    "fontSize": { "xs": "12px", "sm": "14px", ... },
    "fontFamily": { "sans": "...", "mono": "..." },
    "lineHeight": { "tight": "1.2", "normal": "1.6", ... }
  },
  "spacing": { "xs": "4px", "sm": "8px", ... },
  "breakpoints": { "mobile": "0px", "tablet": "768px", ... }
}
```

### 6.2 CSS Variables Export

Create root CSS variables file:
```css
:root {
  /* Colors */
  --color-primary-50: #...;
  --color-primary-900: #...;

  /* Typography */
  --font-sans: ...;
  --text-base: 16px;

  /* Spacing */
  --space-xs: 4px;
  --space-sm: 8px;

  /* Breakpoints */
  --breakpoint-mobile: 0px;
  --breakpoint-tablet: 768px;
}

@media (prefers-color-scheme: dark) {
  :root {
    --color-primary-50: #...;
    --color-primary-900: #...;
  }
}
```

### 6.3 Tailwind Configuration

If using Tailwind CSS:
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: { /* from design tokens */ },
      fontSize: { /* from design tokens */ },
      spacing: { /* from design tokens */ },
    }
  }
};
```

### 6.4 Documentation

Create `DESIGN-TOKENS.md`:
- Token naming conventions
- How to use tokens in code
- Token versioning strategy
- Figma ↔ Code sync process (if applicable)

## Phase 7: Guidelines & Handoff

### 7.1 Design-to-Dev Handoff Guide

Create `DESIGN-DEV-HANDOFF.md`:
- [ ] File organization (Figma, specs, code)
- [ ] Naming conventions (colors, components, etc.)
- [ ] How designers hand off designs
- [ ] How developers implement from design
- [ ] Feedback loop (design review process)
- [ ] Common pitfalls and how to avoid them

### 7.2 Brand Guidelines

Create `BRAND-GUIDELINES.md`:
- [ ] Brand story and values
- [ ] Logo usage and clearspace
- [ ] Color palette with do's/don'ts
- [ ] Typography usage examples
- [ ] Photography and illustration style
- [ ] Tone of voice (visual communication)
- [ ] Common mistakes and corrections

### 7.3 Design System Overview

Create `DESIGN-SYSTEM.md`:
- [ ] What is this design system?
- [ ] Who should use it?
- [ ] How to use it (quick start)
- [ ] Governance (how updates work)
- [ ] Contribution guidelines
- [ ] Version history
- [ ] FAQ

### 7.4 Accessibility Documentation

Create `ACCESSIBILITY.md`:
- [ ] WCAG 2.1 AA compliance checklist
- [ ] Color contrast audit results
- [ ] Typography accessibility (dyslexia, vision impairment)
- [ ] Interactive component accessibility (keyboard nav, screen readers)
- [ ] Testing tools and resources
- [ ] Known limitations and workarounds

## Phase 8: Team Onboarding

### 8.1 Designer Onboarding

Create `ONBOARDING-DESIGNERS.md`:
- [ ] How to use Figma design system
- [ ] Component usage guidelines
- [ ] File organization
- [ ] Handoff process to developers
- [ ] Common tasks (create button variant, add new color, etc.)

### 8.2 Developer Onboarding

Create `ONBOARDING-DEVELOPERS.md`:
- [ ] How to use CSS variables / Tailwind
- [ ] Component implementation guidelines
- [ ] Design token usage
- [ ] How to implement from design specs
- [ ] Accessibility checklist
- [ ] Common tasks (style button, create form, etc.)

### 8.3 Product Manager Onboarding

Create `ONBOARDING-PRODUCT.md`:
- [ ] Design system overview (non-technical)
- [ ] Why we have a design system
- [ ] How it speeds up product development
- [ ] How to request new components
- [ ] Design review process

## Deliverables Summary

```
design-system/
├── DESIGN-SYSTEM.md              (Overview & governance)
├── DESIGN-TOKENS.md              (Token documentation)
├── COLOR-PALETTE.md              (Color system)
├── TYPOGRAPHY.md                 (Type system)
├── COMPONENTS.md                 (Component specs)
├── LAYOUT-SYSTEM.md              (Grid & spacing)
├── DESIGN-DEV-HANDOFF.md         (Handoff process)
├── BRAND-GUIDELINES.md           (Visual identity)
├── ACCESSIBILITY.md              (WCAG 2.1 audit)
├── ONBOARDING-DESIGNERS.md       (Designer guide)
├── ONBOARDING-DEVELOPERS.md      (Developer guide)
├── ONBOARDING-PRODUCT.md         (PM guide)
├── tokens/
│   ├── design-tokens.json        (Machine-readable tokens)
│   ├── design-tokens.css         (CSS variables)
│   └── tailwind.config.js        (Tailwind config)
├── figma/
│   ├── design-file-link.md       (Figma file reference)
│   └── component-library.md      (Figma library usage)
├── examples/
│   ├── button-implementation.md  (Code example)
│   ├── form-layout.md            (Code example)
│   └── color-usage.md            (Code example)
└── accessibility/
    ├── wcag-audit.md             (Compliance checklist)
    ├── color-contrast-report.md  (Contrast audit)
    └── testing-checklist.md      (Manual testing guide)
```

## Success Criteria

- ✅ All colors meet WCAG AA contrast ratios
- ✅ Typography is optimized for readability + brand personality
- ✅ Components are specified and reusable
- ✅ Layout system is responsive and scalable
- ✅ Design tokens are machine-readable and exported
- ✅ CSS/Tailwind config reflects current system
- ✅ Design-dev handoff is automated/documented
- ✅ Brand is visually coherent
- ✅ Team can onboard and use system independently
- ✅ Accessibility audit is complete (WCAG 2.1 AA)

## Timeline (Estimated)

- Phase 1-2 (Discovery + Colors): 5-7 days
- Phase 3 (Typography): 3-4 days
- Phase 4 (Components): 5-7 days
- Phase 5 (Layout): 3-4 days
- Phase 6 (Tokens + Code): 5-7 days
- Phase 7-8 (Guidelines + Onboarding): 4-5 days

**Total: ~30-35 days** (can parallelize some phases)

## Dependencies

- Product narrative documentation (from @po or @pm)
- Accessibility requirements defined
- Design tool setup (Figma or Penpot)
- Frontend tech stack confirmed (React, Vue, etc.)

## Notes

- Design system is **living document** — expect iterations as product evolves
- Token-based approach enables automation (design → code sync)
- Accessibility is non-negotiable — built-in, not retrofitted
- Team adoption is key to long-term success

## Related Resources

- WCAG 2.1 Guidelines: https://www.w3.org/WAI/WCAG21/quickref/
- Design System Resources: https://designsystems.com/
- Accessibility Tools: WebAIM, WAVE, Axe DevTools
