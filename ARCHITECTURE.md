# PaglaEXTENSION Architecture

> Status: Initial implementation design  
> Product owner: PaglaAI  
> Design authority: PaglaDESIGN  
> Initial deployment: PaglaAI internal use

## 1. Product boundary

PaglaEXTENSION is a PaglaAI-owned browser extension. Its first-party surfaces include PaglaGPT. Its CloudLLM conversation extraction engine must support PaglaHUB and H1VE-M1ND as downstream PaglaAI destinations. CapitalSIN and DesignCHOR are independent products and are not part of PaglaEXTENSION.

The first release is for internal PaglaAI use. Chrome and Vivaldi are the first practical development targets; Firefox and Safari remain explicit compatibility targets for later release work. This is a sequencing decision, not a reduction of the cross-browser objective.

## 2. Repository baseline

The current default branch contains a Manifest V3 extension implemented with plain JavaScript and static HTML/CSS. The manifest still identifies the product as “Capital Sin” version 1.1.0. The README describes a TypeScript/React/Vite build and a `dist/` directory, but the repository currently has no `package.json`, build configuration, source TypeScript, test suite, or `dist/` output. The referenced `libs/html2pdf.bundle.min.js` is also absent from the tracked tree.

Existing extraction functions cover Together AI, ChatGPT, Grok, Gemini, Google AI Studio, DeepSeek, Qwen, Z.ai, MiniMax, and Xiaomi MiMo. These are useful migration inputs, not verified production adapters. Current selectors and speaker heuristics require platform-by-platform validation.

## 3. Product architecture

The extension is organized around five responsibilities:

1. **Browser integration** — manifest, permissions, tab lifecycle, content-script injection, downloads, and browser-specific API differences.
2. **Platform adapters** — one adapter per distinct conversation interface, with detection, extraction, capability declarations, and compatibility tests.
3. **Capture core** — DOM observation, message ordering, role attribution, structured-content extraction, normalization, validation, and provenance.
4. **Local workspace** — IndexedDB archive, capture preview/editing, export, retry queue, and explicit user approval for delivery.
5. **PaglaAI integration** — versioned delivery contracts for PaglaHUB and H1VE-M1ND, plus first-party PaglaGPT interface support.

A platform adapter must report what it could and could not capture. It must not fabricate speaker identity, timestamps, attachments, tool activity, or unloaded messages. Virtualized or inaccessible content must be marked as partial rather than silently presented as a complete transcript.

## 4. Canonical capture record

The normalized record is versioned and independent of any provider's DOM:

- `schemaVersion`, capture ID, platform ID, interface ID, source URL, capture timestamp, and completeness state
- ordered messages with stable local IDs, role, author label, text/Markdown, structured content blocks, and source-order index
- optional timestamps, attachments, code blocks, citations, tool calls/results, generated artifacts, and agent activity when actually exposed by the page
- extraction provenance: adapter version, selectors/strategies used, warnings, and inaccessible/omitted regions

Provider-specific DOM fragments are not the canonical data model. Raw HTML is not trusted as safe export content and must be sanitized before rendering.

### Multi-format serialization

The canonical capture record is serialized through one shared formatter layer. The initial implemented format targets are:

- JSON — loss-minimizing canonical record interchange
- Markdown — readable transcript with code blocks and capture metadata
- HTML — semantic, escaped HTML; source-page markup is never injected directly
- Plain text — portable linear transcript
- CSV — message-level rows for spreadsheet analysis

PDF and DOCX are separate document-generation targets, not alternate filename extensions. They must use actual PDF and Office document generation and will not be reported as supported until those generators are present and tested.

## 5. Local-first and Convex boundary

**Full conversation content remains local by default.** IndexedDB is the initial archive for normalized capture payloads. A user must preview and explicitly approve any transfer to a PaglaAI destination.

Convex is used for authenticated application metadata and coordination, not as an automatic transcript dump. The initial backend scope is:

- user-owned platform configuration and adapter compatibility/status metadata
- capture metadata (IDs, platform/interface, title where available, timestamps, message count, completeness, content digest, local-record reference)
- delivery job state, destination, attempts, timestamps, and structured error summaries
- user preferences that need cross-session or cross-device synchronization

Do not persist full message bodies, private attachments, browser cookies, session tokens, or provider credentials in Convex by default. A later requirement to cloud-store transcript bodies needs a separate explicit privacy, retention, access-control, and encryption decision.

All user-owned Convex records must be authenticated and ownership-scoped. Use indexed query paths and bounded reads. Keep public Convex functions to the minimum required by the client.

## 6. Security and permissions

- Request the smallest host permissions required; expand supported domains deliberately.
- Do not read cookies, local/session storage belonging to providers, authorization headers, or session tokens.
- Do not scrape undocumented private endpoints or reverse-engineer private APIs as a shortcut.
- Treat page text, HTML, URLs, attachments, and tool output as untrusted input.
- Sanitize HTML before preview/export; render text safely by default.
- Never send a capture to a destination without a visible user action and a clear destination/record preview.
- Keep credentials in the browser's protected extension storage only when strictly necessary; never commit secrets or place them in source code.
- Report partial capture and delivery failures honestly.

## 7. Design system contract

PaglaDESIGN is the sole visual authority. Implementation must consume its canonical CSS tokens/base styles and Pagla Sans assets rather than retype values or introduce a parallel palette.

Binding constraints include:
- Pagla Sans, exact CSS family name `"Pagla Sans"`
- monochrome-first light/dark themes
- semantic spacing and typography tokens only
- `#6B7EFF` for meaning, focus, or active indication only; never decorative fills
- visible focus, reduced-motion support, semantic HTML, and minimum interactive target of `2.75rem`
- editorial hierarchy and generous whitespace; avoid dashboard density and decorative effects

The README's former “dark glass aesthetic” description is not a separate design authority. Glass effects may be used only where the canonical tokens and interaction purpose justify them. The PaglaDESIGN `PAGLA_UI.md` contains an “orange accent” phrase that conflicts with locked Design DNA/tokens; the locked Design DNA and token source take precedence.

## 8. Build and browser strategy

The repository needs a real extension build pipeline before feature migration. The implementation should use TypeScript for the normalized data contract and adapter interfaces, with a React-based extension workspace where useful. The extension build framework must be selected against current Chrome, Firefox, Safari, and Vivaldi packaging constraints before it is locked.

Do not assume that a Chromium Manifest V3 service worker behaves identically in Firefox or Safari. Browser APIs must be isolated behind a small compatibility layer. Each browser build must have its own permission and packaging checks.

## 9. Delivery sequence

1. **Foundation and truth repair** — establish the build/test pipeline, correct product identity and README claims, document the normalized capture contract, and bring the UI under PaglaDESIGN.
2. **Capture reliability** — implement detection and adapters with fixtures/tests; replace guessed role attribution with explicit evidence and partial-capture reporting.
3. **Local archive and export** — persist normalized captures locally, preview/edit safely, and provide truthful Markdown/HTML exports before adding cloud delivery.
4. **Convex coordination** — add authenticated metadata/configuration and delivery-job state with ownership checks and indexes; do not store transcript bodies by default.
5. **PaglaAI delivery** — implement versioned, explicit delivery to PaglaHUB and H1VE-M1ND; validate the contracts against their actual interfaces before claiming integration.
6. **Compatibility and release** — verify Chrome/Vivaldi first, then Firefox and Safari packaging and behavior; maintain a browser/API compatibility matrix.

## 10. Verification gates

A feature is not complete because its code exists. Each adapter requires representative fixtures and tests for role attribution, order, content blocks, duplicate suppression, partial pages, and empty/error states. Each build must validate the manifest and permissions. Convex work must pass TypeScript checks and a real deployment/function smoke test. UI work must be checked against PaglaDESIGN tokens, accessibility, and reduced-motion requirements.

No deployment, platform support, full-page capture, or successful delivery may be claimed without a corresponding test or observed result.

## 11. Open implementation decisions

- Final extension build framework and Safari packaging route.
- Exact authentication method for the internal Convex deployment.
- The concrete versioned request/response contracts exposed by PaglaHUB and H1VE-M1ND.
- Which legacy platform adapters remain viable after live DOM/fixture validation.
- Whether any transcript content beyond metadata is ever permitted in Convex.

These decisions must be resolved from repository evidence and integration contracts, not guessed.
