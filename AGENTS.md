# PaglaEXTENSION Agent Instructions

## Product identity and boundaries

- The product name is `PaglaEXTENSION`; the owner is PaglaAI.
- CapitalSIN and DesignCHOR are independent products. Never describe them as PaglaAI modules or subsystems.
- PaglaHUB and H1VE-M1ND are downstream PaglaAI destinations. PaglaGPT is a first-party interface that the extension must support.

## Required reading

Before changing architecture or UI, read:

1. `README.md`
2. `ARCHITECTURE.md`
3. `DESIGN_SYSTEM.md`
4. PaglaDESIGN canonical Design DNA and token documentation.

## Design rules

PaglaDESIGN is the sole visual authority. Never introduce a parallel palette, arbitrary CSS values, a second typeface, or decorative use of the accent. Use canonical Pagla Sans, semantic tokens, light/dark themes, accessible controls, visible focus, and reduced-motion behavior.

## Engineering rules

- Preserve useful legacy behavior until its replacement is implemented and tested.
- Never claim a platform adapter is supported without current representative fixtures and validation.
- Never infer user/assistant roles from alternating message order or incidental words in message text.
- Never claim a capture is complete when the page is virtualized, partially loaded, or otherwise inaccessible.
- Treat DOM text, HTML, URLs, attachments, and tool results as untrusted input.
- Sanitize HTML before preview/export; default to safe text rendering.
- Keep full conversation content local by default. Do not upload transcript bodies or attachments to Convex without a separately approved privacy decision.
- Do not access provider cookies, session tokens, authorization headers, or private site storage.
- Request the minimum browser permissions required.
- Use explicit, versioned contracts for PaglaHUB and H1VE-M1ND; do not invent their API behavior.
- Keep browser-specific APIs behind compatibility adapters.
- Document material architecture changes and verify them with tests before claiming completion.

## Convex rules

Before editing `convex/`, read the installed Convex expert skill and inspect the existing schema and generated guidelines. Use object-form functions with argument and return validators, indexed reads, ownership checks, and bounded queries. Do not use unbounded `.collect()` on growing tables. Keep public functions minimal.

## Epistemic standard

Separate implemented, tested, deployed, and planned work. Do not report success without observed evidence. Record limitations and partial results explicitly.
