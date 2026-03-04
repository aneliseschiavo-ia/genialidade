# Design Squad — Genialidade

**Design System Architecture & Visual Strategy for Anelise Methodology MVP**

## Overview

The Design Squad is responsible for creating and maintaining the comprehensive design system for Genialidade (Anelise Methodology MVP — Diagnóstico Neural). We establish the visual language, accessibility standards, and component library that enable rapid, consistent product development.

## Squad Lead

**José Amorim** (@jose_amorim_design_lead)
- Role: Design System Architect & Visual Strategy Consultant
- Persona: Estrategista Direto (Consulting profile)
- Expertise: Design systems, color theory, typography, accessibility, visual communication

## Mission

Create a **token-based, accessible, scalable design system** that:
1. Aligns visual language with Anelise Methodology values (clarity, rigor, human-centeredness)
2. Ensures WCAG 2.1 AA accessibility from day one
3. Enables rapid component development without design compromise
4. Scales to support future product lines and platforms
5. Bridges design-development workflow seamlessly

## Key Responsibilities

### Core Design System Deliverables
- **Color Palette** — Brand + semantic colors with accessibility audit
- **Typography System** — Font selection, scale, hierarchy, responsive behavior
- **Component Library** — Specification and documentation of reusable UI components
- **Layout System** — Grid, spacing, breakpoints, responsive patterns
- **Design Tokens** — Machine-readable token definitions (JSON + CSS Variables)
- **Brand Guidelines** — Visual identity and usage standards
- **Accessibility Audit** — Full WCAG 2.1 AA compliance

### Secondary Responsibilities
- **Design-Dev Handoff** — Documentation and process for design → code workflow
- **Team Onboarding** — Guides for designers, developers, product managers
- **Design System Governance** — How updates and new components are managed
- **Design Review** — Ensure all visual work aligns with system

## Quick Start

### For Designers
1. Read `DESIGN-SYSTEM.md` (overview)
2. Study `COLOR-PALETTE.md` and `TYPOGRAPHY.md` (core palette)
3. Reference `COMPONENTS.md` for component specs
4. Follow `DESIGN-DEV-HANDOFF.md` when handing off to developers

### For Developers
1. Read `DESIGN-SYSTEM.md` (overview)
2. Import CSS variables or Tailwind config (`tokens/` folder)
3. Reference `COMPONENTS.md` for component implementation
4. Check `ACCESSIBILITY.md` for WCAG 2.1 compliance requirements

### For Product Managers
1. Read `ONBOARDING-PRODUCT.md` (non-technical overview)
2. Understand how design system accelerates feature development
3. Learn how to request new components or design changes

## Folder Structure

```
squads/design-squad/
├── squad.yaml                      # Squad manifest
├── README.md                       # This file
├── agents/
│   └── jose-amorim-lead.md        # Agent definition
├── tasks/
│   └── jose-amorim-design-lead-task.md  # Main workflow
├── config/
│   └── .gitkeep                   # Configs (in docs/framework/)
├── design-system/                 # MAIN DELIVERABLES (created during task execution)
│   ├── DESIGN-SYSTEM.md
│   ├── COLOR-PALETTE.md
│   ├── TYPOGRAPHY.md
│   ├── COMPONENTS.md
│   ├── LAYOUT-SYSTEM.md
│   ├── DESIGN-TOKENS.md
│   ├── DESIGN-DEV-HANDOFF.md
│   ├── BRAND-GUIDELINES.md
│   ├── ACCESSIBILITY.md
│   ├── tokens/
│   │   ├── design-tokens.json
│   │   ├── design-tokens.css
│   │   └── tailwind.config.js
│   └── examples/
└── checklists/
    └── .gitkeep
```

## How to Use This Squad

### Activate the Design Squad

```bash
@jose_amorim_design_lead

# View available commands
*help

# Start design system creation
*design-strategy      # Strategic overview
*color-palette        # Color design
*typography-system    # Type design
*components-spec      # Component specs
*design-tokens-export # Generate tokens
```

### Main Tasks

1. **Design System Creation** (`jose-amorim-design-lead-task.md`)
   - 7-phase process from discovery to implementation
   - Deliverables: Color, Typography, Components, Layout, Tokens
   - Timeline: ~30-35 days (parallelizable)

### Governance

- **Source of Truth:** Figma design file (versioned in git)
- **Implementation:** CSS variables + Tailwind config
- **Updates:** Token changes → CSS sync → Dev notification
- **Contributions:** All design decisions must be documented in design tokens

## Design Principles (Genialidade)

1. **Clarity** — Information hierarchy guides users with confidence
2. **Scientific Rigor** — Precise, measured, data-informed decisions
3. **Accessibility First** — Inclusive design for all cognitive types
4. **Human-Centered** — Visual language builds trust and connection
5. **Consistency** — Token-based system ensures coherence

## Accessibility Standards

- **Minimum:** WCAG 2.1 AA compliance
- **Target:** AAA where feasible
- **Color Contrast:** 4.5:1 for normal text, 3:1 for UI components
- **Typography:** Dyslexia-friendly font selection and spacing
- **Interactive:** Full keyboard navigation, screen reader support

## Tools & Tech Stack

- **Design Tool:** Figma
- **Implementation:** Tailwind CSS, CSS Variables
- **Documentation:** Markdown + GitHub
- **Version Control:** Git (design tokens in repository)
- **Testing:** WAVE, WebAIM, Axe DevTools

## Files & Documentation

### Core Documentation
- `DESIGN-SYSTEM.md` — System overview, governance, contribution guidelines
- `COLOR-PALETTE.md` — Color definitions, semantic usage, accessibility audit
- `TYPOGRAPHY.md` — Font selection, scales, hierarchy, responsive behavior
- `COMPONENTS.md` — Component specs, variants, usage guidelines
- `LAYOUT-SYSTEM.md` — Grid, spacing, breakpoints, patterns

### Implementation
- `DESIGN-TOKENS.md` — Token naming, usage, versioning
- `tokens/design-tokens.json` — Machine-readable tokens
- `tokens/design-tokens.css` — CSS variables
- `tokens/tailwind.config.js` — Tailwind configuration

### Handoff & Adoption
- `DESIGN-DEV-HANDOFF.md` — Design → code workflow
- `BRAND-GUIDELINES.md` — Visual identity, tone, usage standards
- `ACCESSIBILITY.md` — WCAG 2.1 audit, testing checklist
- `ONBOARDING-DESIGNERS.md` — Designer guide
- `ONBOARDING-DEVELOPERS.md` — Developer guide
- `ONBOARDING-PRODUCT.md` — Product manager guide

## Success Metrics

- ✅ All colors meet WCAG AA contrast ratios
- ✅ Typography optimized for readability
- ✅ Component library covers 80%+ of UI needs
- ✅ Design tokens fully exported and integrated
- ✅ Team can use system independently (low support burden)
- ✅ New features use design system by default
- ✅ Design-dev cycle time reduced by 40%+
- ✅ Zero accessibility compliance violations (WCAG 2.1 AA)

## Team & Contact

- **Lead:** José Amorim (@jose_amorim_design_lead)
- **Squad:** design-squad
- **Prefix:** `/design` (slash commands)

## Related Squads

- None yet (design system is foundational)

## Contributing

All changes to the design system must:
1. Be documented in design tokens
2. Pass accessibility audit (WCAG 2.1 AA)
3. Be approved by José (design lead)
4. Be reflected in all relevant documentation

## Questions?

Ask José Amorim (@jose_amorim_design_lead) or review the relevant documentation in `design-system/`.

---

**Version:** 1.0.0
**Last Updated:** 2026-03-03
**Status:** Active
