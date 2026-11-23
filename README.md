# PaglaEXTENSION

**PaglaEXTENSION** is the PaglaAI-owned browser extension for capturing, normalizing, preserving, and explicitly routing conversations from PaglaAI and supported CloudLLM web interfaces.

It is being developed for PaglaAI internal use first. Chrome and Vivaldi are the initial development targets; Firefox and Safari are later compatibility and distribution targets.

## Product boundary

PaglaEXTENSION belongs to PaglaAI. Its first-party interface support includes PaglaGPT. Its CloudLLM extraction engine is intended to support PaglaHUB and H1VE-M1ND as downstream PaglaAI destinations.

CapitalSIN and DesignCHOR are independent products. They are not modules, subsidiaries, or products of PaglaAI or PaglaEXTENSION.

## Current repository status

The existing repository began as a Manifest V3 JavaScript extension. It contains legacy extraction and export code, but its old README described a React/Vite build that was not present in the tracked source. The legacy code is being audited and migrated incrementally; platform adapters are not considered production-verified until their behavior is tested against representative pages.

See [ARCHITECTURE.md](./ARCHITECTURE.md) for the current system design and privacy boundaries, and [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) for the mandatory PaglaDESIGN consumer contract.

## Design authority

[PaglaDESIGN](https://github.com/paglaai/PaglaDESIGN) is the sole visual authority. PaglaEXTENSION inherits its Pagla Sans typography, monochrome-first color system, locked tokens, accessibility requirements, motion rules, and component grammar. No parallel palette or generic design system is introduced.

## Privacy model

- Conversation bodies and attachments remain local by default.
- Capture is previewable before export or delivery.
- Transfers to PaglaHUB or H1VE-M1ND require an explicit user action.
- Convex is reserved for authenticated metadata, configuration, and delivery coordination unless a separate privacy decision authorizes storing transcript content.
- Provider cookies, session tokens, and private browser storage are not extraction sources.

## Architecture

The implementation is organized into browser integration, platform adapters, a normalized capture core, a local archive/export workspace, and explicit PaglaAI delivery integrations.

A capture must preserve source order and distinguish observed facts from unavailable information. The extension must not guess speaker roles, timestamps, tool activity, or unloaded messages. Partial captures must be labeled as partial.

## Development status

This branch establishes the architecture and design-system contract. It does not yet represent a deployed Convex backend or a verified multi-browser release.

The next implementation milestones are:

1. Establish the extension build and test pipeline without discarding useful legacy extraction behavior.
2. Implement the normalized capture schema and adapter tests.
3. Replace unreliable role inference and unsafe HTML export behavior.
4. Add the local archive and reliable Markdown/HTML export.
5. Integrate Convex for authenticated metadata and delivery state.
6. Integrate PaglaHUB and H1VE-M1ND using their actual versioned contracts.
7. Validate Chrome/Vivaldi, then Firefox/Safari compatibility.

## License

See [LICENSE](./LICENSE) for the existing repository license and attribution.
