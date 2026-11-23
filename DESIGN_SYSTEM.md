# PaglaEXTENSION Design System Contract

> Visual authority: [PaglaDESIGN](https://github.com/paglaai/PaglaDESIGN)  
> Canonical source: PaglaDESIGN `main` branch  
> Status: Binding for all PaglaEXTENSION UI

## Authority

PaglaDESIGN governs PaglaEXTENSION's brand, visual language, tokens, typography, accessibility, motion, and component behavior. This file records the consumer integration contract; it does not fork or redefine the design system.

Before UI changes, consult these canonical files:

- `brand/BRAND.md`
- `design-system/DESIGN_DNA.md`
- `design-system/DESIGN_TOKENS.md`
- `design-system/COLOR_SYSTEM.md`
- `design-system/TYPOGRAPHY.md`
- `design-system/ACCESSIBILITY.md`
- `design-system/MOTION.md`
- `design-system/CSS_ARCHITECTURE.md`
- `components/COMPONENT_LIBRARY.md`
- `governance/DECISIONS.md`

## Consumer rules

1. Consume the canonical PaglaDESIGN CSS layers and Pagla Sans font assets from the approved package or a pinned, verifiable source revision. Do not hand-copy a drifting token subset.
2. Keep the token, base, and utility cascade layers in the canonical order.
3. Use semantic CSS custom properties for every color, spacing, radius, typography, motion, and layout value.
4. Support the canonical light and dark themes. Respect the user's system preference unless an explicit preference is stored.
5. Use the Pagla Face and PaglaAI wordmark only according to the canonical brand rules. Product identity may be expressed through the product name, not a newly invented logo.
6. Prefer the registered PaglaDESIGN component grammar. Do not create one-off component patterns for visual novelty.
7. Use semantic HTML, keyboard-operable controls, visible focus, reduced-motion behavior, and the canonical minimum interactive target.
8. Design for the extension's actual constrained surfaces: compact browser action popup, optional extension workspace, and in-page capture controls. Responsive behavior must preserve hierarchy rather than compress the entire product into a dashboard.

## Non-negotiable visual constraints

- Typeface: `"Pagla Sans"`; display/wordmark Light 300, body Regular 400.
- Monochrome first: ink, paper, surface, border, and muted tokens.
- Accent `#6B7EFF` is reserved for meaning, focus, active state, dot, or underline. Never use it as a decorative fill.
- Spacing comes only from the locked `space.*` scale.
- Radii, type sizes, line heights, tracking, breakpoints, and motion come only from locked tokens.
- No arbitrary hex values, pixel margins, decorative gradients, heavy shadows, or trend-driven glass treatment.
- Respect `prefers-reduced-motion`; motion must communicate state or orientation.

## Conflict resolution

If a product README, mockup, code comment, or legacy stylesheet conflicts with PaglaDESIGN's locked Design DNA or token source, PaglaDESIGN's canonical locked source wins. If canonical PaglaDESIGN documents conflict with one another, do not silently invent a compromise: record the discrepancy and follow the locked Design DNA plus token source until the authority resolves it.

## Change control

A change to PaglaDESIGN's locked values or doctrine belongs in PaglaDESIGN's formal decision workflow. PaglaEXTENSION may document consumer-specific layout decisions here, but must not redefine shared tokens or brand rules.
