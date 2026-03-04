# Design Squad Activation Guide

## Quick Start (3 Steps)

### Step 1: Understand the Squad
Read these files in order:
1. `README.md` (2-minute overview)
2. `SQUAD-CREATION-SUMMARY.md` (context and structure)

### Step 2: Activate José Amorim
```bash
@jose_amorim_design_lead
```

The agent will load with consulting profile (Estrategista Direto) focused on design system architecture and visual strategy.

### Step 3: Start the Workflow
```bash
@jose_amorim_design_lead
*design-strategy
```

Or dive directly into a specific phase:
```bash
@jose_amorim_design_lead
*color-palette        # Jump to color system design
*typography-system    # Jump to typography design
*components-spec      # Jump to component specs
```

---

## What Happens When You Activate

### Agent Loading
- José Amorim loads with his **Consulting persona** (Estrategista Direto)
- Profile: Direct, pragmatic, visionary communicator
- Communication framework: Espiral Expansiva (5 layers)
- Expertise: Design systems, color theory, typography, accessibility

### Available Commands

```
*help                    # Show all available commands
*design-strategy         # Phase 1: Discovery & strategy
*color-palette          # Phase 2: Color system design
*typography-system      # Phase 3: Typography design
*components-spec        # Phase 4: Component specs
*layout-grid            # Phase 5: Layout system
*design-tokens-export   # Phase 6: Generate tokens
*design-handoff         # Phase 7: Handoff guide
*brand-guidelines       # Write brand guidelines
*accessibility-audit    # WCAG 2.1 compliance
```

---

## Recommended Workflow

### Session 1: Discovery (2-3 hours)
```bash
@jose_amorim_design_lead
*design-strategy

# Answer questions about:
# - Product narrative (Anelise Methodology MVP)
# - Brand values and personality
# - Target audience
# - Accessibility requirements
# - Current visual assets (if any)
```

**Deliverable:** Discovery document + design principles

### Session 2: Color System (3-4 hours)
```bash
@jose_amorim_design_lead
*color-palette

# Design:
# - Primary, secondary, accent colors
# - Semantic colors (success, error, warning, info)
# - Dark mode palette
# - WCAG AA contrast audit
```

**Deliverable:** COLOR-PALETTE.md + visual showcase

### Session 3: Typography (2-3 hours)
```bash
@jose_amorim_design_lead
*typography-system

# Select and design:
# - Font families
# - Type scale
# - Line heights and letter spacing
# - Responsive typography
```

**Deliverable:** TYPOGRAPHY.md + type scale showcase

### Session 4: Components (3-4 hours)
```bash
@jose_amorim_design_lead
*components-spec

# Specify:
# - Atomic components (buttons, inputs, cards, etc.)
# - Component variants and states
# - Usage guidelines
```

**Deliverable:** COMPONENTS.md + component inventory

### Session 5: Layout & Tokens (3-4 hours)
```bash
@jose_amorim_design_lead
*layout-grid
*design-tokens-export

# Create:
# - Grid system (columns, breakpoints)
# - Spacing scale
# - Design tokens (JSON + CSS)
```

**Deliverable:** LAYOUT-SYSTEM.md + design tokens

### Session 6: Handoff & Guidelines (2-3 hours)
```bash
@jose_amorim_design_lead
*design-handoff
*brand-guidelines
*accessibility-audit

# Document:
# - Design-to-dev workflow
# - Brand guidelines
# - WCAG 2.1 AA compliance
```

**Deliverable:** Complete design system documentation

---

## What Gets Created

After completing all phases, you'll have:

```
squads/design-squad/design-system/
├── DESIGN-SYSTEM.md                 ← System overview
├── COLOR-PALETTE.md                 ← Color system
├── TYPOGRAPHY.md                    ← Type system
├── COMPONENTS.md                    ← Component specs
├── LAYOUT-SYSTEM.md                 ← Grid & spacing
├── DESIGN-TOKENS.md                 ← Token docs
├── DESIGN-DEV-HANDOFF.md            ← Handoff process
├── BRAND-GUIDELINES.md              ← Visual identity
├── ACCESSIBILITY.md                 ← WCAG 2.1 audit
├── ONBOARDING-DESIGNERS.md          ← Designer guide
├── ONBOARDING-DEVELOPERS.md         ← Developer guide
├── ONBOARDING-PRODUCT.md            ← PM guide
├── tokens/
│   ├── design-tokens.json           ← Machine-readable
│   ├── design-tokens.css            ← CSS Variables
│   └── tailwind.config.js           ← Tailwind config
└── examples/
    └── *.md                         ← Code examples
```

**Total:** 12+ documents + 3 implementation files

---

## Success Indicators

You'll know you're successful when:

1. ✅ Color palette meets WCAG AA contrast ratios
2. ✅ Typography is optimized for readability
3. ✅ Component specs cover 80%+ of UI needs
4. ✅ Design tokens are exported and integrated
5. ✅ Design-dev handoff process is clear
6. ✅ Brand is visually coherent
7. ✅ Team can use system independently

---

## Common Questions

### Q: How long does this take?
**A:** ~30-35 days for complete system (phases 1-7). You can parallelize and iterate incrementally.

### Q: Can I customize the workflow?
**A:** Yes! Each command is independent. You can:
- Skip phases and focus on specific areas
- Iterate within a phase
- Jump between phases as needed

### Q: Who should be involved?
**A:** Ideally:
- Product owner/PM (for direction)
- Designers (for design inputs)
- Developers (for implementation feedback)
- QA (for accessibility testing)

### Q: What if I need feedback?
**A:** After each phase:
1. Review deliverables
2. Get stakeholder feedback
3. Iterate with José (use commands again)
4. Move to next phase when satisfied

### Q: Can I export to Figma?
**A:** Yes! Design tokens can be:
- Exported as JSON
- Synced to Figma (if using token sync tools)
- Used in CSS/Tailwind directly

### Q: What about brand guidelines?
**A:** José will create comprehensive BRAND-GUIDELINES.md that includes:
- Brand story and values
- Logo usage
- Color guidelines
- Typography usage
- Do's and don'ts

---

## After the Design System is Created

### For Designers
1. Read `ONBOARDING-DESIGNERS.md`
2. Use Figma library based on design system
3. Follow `DESIGN-DEV-HANDOFF.md` when handing off

### For Developers
1. Read `ONBOARDING-DEVELOPERS.md`
2. Import `tokens/design-tokens.css` or `tailwind.config.js`
3. Build components following `COMPONENTS.md`

### For Product Managers
1. Read `ONBOARDING-PRODUCT.md`
2. Understand how system accelerates development
3. Request new components or design changes through José

---

## Troubleshooting

### Issue: José gives too much detail
**Solution:** Ask for a summary:
```bash
@jose_amorim_design_lead
Resumo executivo de color-palette, por favor
```

### Issue: Colors don't look right in the app
**Solution:** Check contrast audit in `ACCESSIBILITY.md` and adjust in tokens.

### Issue: Typography doesn't scale on mobile
**Solution:** Review responsive type behavior in `TYPOGRAPHY.md`.

### Issue: Component doesn't match spec
**Solution:** Check `COMPONENTS.md` for exact specs and variants.

---

## Integration with Development

### Using Design Tokens in Code

**Option 1: CSS Variables**
```css
/* In your CSS */
:root {
  --color-primary: var(--color-primary-600);
  --color-error: var(--color-red-600);
}

/* In HTML */
<button style="background-color: var(--color-primary);">Click me</button>
```

**Option 2: Tailwind**
```javascript
// tailwind.config.js
const designTokens = require('./tokens/design-tokens.json');

module.exports = {
  theme: {
    colors: designTokens.colors,
    fontSize: designTokens.typography.fontSize,
    spacing: designTokens.spacing,
  }
};
```

**Option 3: CSS-in-JS**
```javascript
import tokens from './tokens/design-tokens.json';

const Button = styled.button`
  background-color: ${tokens.colors.primary[600]};
  color: ${tokens.colors.neutral[50]};
`;
```

---

## Next Steps After Activation

1. **Activate:** `@jose_amorim_design_lead`
2. **Run:** `*design-strategy` (Phase 1)
3. **Answer:** Questions about product and brand
4. **Get:** Discovery document and design principles
5. **Iterate:** Through remaining phases
6. **Export:** Design tokens and implementation files
7. **Onboard:** Team with guide documents
8. **Build:** Features using design system

---

## Need Help?

- **General Questions:** Ask @jose_amorim_design_lead
- **Workflow Issues:** Check `README.md` or `SQUAD-CREATION-SUMMARY.md`
- **Design Decisions:** Request feedback via design-squad
- **Technical Implementation:** Check `DESIGN-DEV-HANDOFF.md`

---

**Status:** Ready to Activate
**Version:** 1.0.0
**Last Updated:** 2026-03-03
