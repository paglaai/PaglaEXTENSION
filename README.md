# PaglaEXTENSION

> Universal AI conversation exporter, session sanitizer, and local knowledge bridge for the PaglaAI ecosystem.

---

## What is PaglaEXTENSION?

PaglaEXTENSION is the browser knowledge bridge for the **PaglaAI** ecosystem, built as a modern Chrome Extension (Manifest V3).

It is not simply a page scraper or screenshot taker.

It is a private, client-side intelligence companion designed to capture, sanitize, and structure AI conversations from every major frontier model interface (ChatGPT, Grok, Google Gemini, Google AI Studio, Alibaba Qwen, DeepSeek, and TogetherChat) into clean, standard Markdown, local files, and Notion knowledge graphs.

With PaglaEXTENSION, your interactions with cloud AI models are preserved privately on your own machine, allowing seamless ingestion into local RAG systems, PaglaMLX, or personal knowledge bases.

---

## Purpose

The purpose of this repository is to liberate conversational data from closed web interfaces and return ownership to the user.

This repository governs:

- Manifest V3 Chrome Extension architecture
- Multi-Platform DOM extraction engines (ChatGPT, Grok, Gemini, Qwen, DeepSeek)
- Clean Markdown, HTML, PDF, and Word export pipelines
- Direct Notion Database synchronization via Notion API
- Client-Side Privacy Sanitization (zero third-party tracking or data leakage)
- Optional Gemini-powered synthesis, rephrasing, and structured key point extraction
- Local-first knowledge bridging into the PaglaAI stack

---

## Ecosystem

PaglaEXTENSION connects web-based frontier models to the PaglaAI ecosystem:

- **PaglaSPACE** — Showcased on the ecosystem products page at `/products/`.
- **PaglaDESIGN** — Follows the DesignDNA visual standard for extension popups and typography.
- **PaglaMLX** — Exports conversations directly into datasets for local model fine-tuning and prompting.
- **PaglaSHELL** — Formats exported conversation transcripts for terminal agent ingestion.
- **PaglaGPT** — Bridges high-level chat reasoning into architectural PRDs and documentation.

---

## Design Philosophy

In accordance with **PaglaDESIGN** and **DesignDNA**:

- **Privacy by Default:** All DOM processing occurs entirely in the browser runtime. Zero external telemetry, tracking, or unexpected analytics.
- **Data Portability:** Raw conversation data is converted into open, standard Markdown with clean metadata.
- **Scoped Permissions:** Host permissions and storage access are scoped strictly to target AI web applications.
- **Clean Interface:** Compact popup UI utilizing Pagla Sans typography and monochrome focus states.

---

## Repository Structure

```
PaglaEXTENSION/

README.md                  — repository purpose, architecture, and installation guide
LICENSE                    — MIT license
manifest.json              — Chrome Extension Manifest V3 configuration

background.js              — background service worker for life-cycle and event routing
content.js                 — platform-specific DOM parsing and text extraction engines
popup.html                 — extension popup user interface
popup.js                   — export orchestration, format conversions, and API handlers
style.css                  — DesignDNA styling for extension popup
notion_api.js              — client-side Notion API integration

icons/                     — extension iconography
  icon128.png              — 128x128 brand mark

libs/                      — bundled client-side utilities
  html2pdf.bundle.min.js   — local PDF generation library
```

---

## Workflow

PaglaEXTENSION development adheres to the PaglaAI lifecycle:

```
Vision
    ↓
Research
    ↓
Documentation
    ↓
Design
    ↓
Review
    ↓
Prototype
    ↓
Implementation
```

All updates are tested against live web interfaces across Google Chrome and Chromium-based browsers.

---

## Quickstart

### Prerequisites

- Google Chrome, Brave, Arc, or any Chromium-based browser
- (Optional) Notion API Integration Token for direct Notion sync
- (Optional) Gemini API Key for on-device AI summarization

### Installation

1. Clone or download this repository:
   ```bash
   git clone https://github.com/paglaai/PaglaEXTENSION.git
   cd PaglaEXTENSION
   ```
2. Open Google Chrome and navigate to:
   ```
   chrome://extensions/
   ```
3. Enable **Developer mode** using the toggle switch in the upper right corner.
4. Click **Load unpacked** and select the cloned `PaglaEXTENSION` directory.
5. Pin PaglaEXTENSION to your Chrome toolbar.

### Usage

1. Open any supported AI chat interface (e.g., ChatGPT, Grok, Gemini, DeepSeek, Qwen).
2. Click the **PaglaEXTENSION** icon in the toolbar.
3. Choose your desired export format (Markdown, HTML, PDF, or Notion).
4. Download the file locally or sync to your workspace in one click.

---

## Governance & License

PaglaEXTENSION is developed and maintained by **AYNAGHOR** (The House of Mirror) for the PaglaAI ecosystem.

Released under the **MIT License**.
