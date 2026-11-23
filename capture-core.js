/* PaglaEXTENSION Capture Core
 * Pure normalization and serialization. No provider DOM assumptions.
 * Exposes globalThis.PaglaCaptureCore and CommonJS for Node tests.
 */
(function (root, factory) {
  const api = factory();
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  if (root) root.PaglaCaptureCore = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  const SCHEMA_VERSION = "1.0.0";
  const ROLES = new Set(["system", "user", "assistant", "tool", "unknown"]);
  const COMPLETENESS = new Set(["complete", "partial", "unknown"]);
  const BLOCK_TYPES = new Set(["text", "code", "image", "file", "citation", "tool_call", "tool_result", "unknown"]);

  function cleanString(value) {
    return typeof value === "string" ? value : value == null ? "" : String(value);
  }

  function safeId(value, fallback) {
    const candidate = cleanString(value).trim();
    return candidate || fallback;
  }

  function normalizeBlock(block) {
    if (typeof block === "string") return { type: "text", text: block };
    const input = block && typeof block === "object" ? block : {};
    const type = BLOCK_TYPES.has(input.type) ? input.type : "unknown";
    const result = { type };
    ["text", "language", "url", "name", "mimeType", "alt"].forEach((key) => {
      if (input[key] != null) result[key] = cleanString(input[key]);
    });
    if (input.metadata && typeof input.metadata === "object" && !Array.isArray(input.metadata)) {
      result.metadata = input.metadata;
    }
    return result;
  }

  function normalizeMessage(message, index, captureId) {
    const input = message && typeof message === "object" ? message : {};
    const role = ROLES.has(input.role) ? input.role : "unknown";
    const blocksInput = Array.isArray(input.contentBlocks)
      ? input.contentBlocks
      : [{ type: "text", text: cleanString(input.messageMD ?? input.text) }];
    const contentBlocks = blocksInput.map(normalizeBlock);
    const text = input.text != null
      ? cleanString(input.text)
      : input.messageMD != null
        ? cleanString(input.messageMD)
        : contentBlocks.filter((b) => b.type === "text" || b.type === "code").map((b) => b.text || "").join("\n");
    const confidence = ["high", "medium", "low", "unknown"].includes(input.roleConfidence)
      ? input.roleConfidence
      : role === "unknown" ? "unknown" : "low";

    return {
      id: safeId(input.id, captureId + "-m" + (index + 1)),
      sequence: Number.isInteger(input.sequence) && input.sequence >= 0 ? input.sequence : index,
      role,
      authorLabel: input.authorLabel == null ? cleanString(input.sender) : cleanString(input.authorLabel),
      text,
      contentBlocks,
      timestamp: input.timestamp ? cleanString(input.timestamp) : null,
      attachments: Array.isArray(input.attachments) ? input.attachments : [],
      citations: Array.isArray(input.citations) ? input.citations : [],
      provenance: {
        roleConfidence: confidence,
        roleEvidence: cleanString(input.roleEvidence),
        selector: cleanString(input.selector)
      },
      metadata: input.metadata && typeof input.metadata === "object" && !Array.isArray(input.metadata) ? input.metadata : {}
    };
  }

  function normalizeCapture(input) {
    const source = input && typeof input === "object" ? input : {};
    const captureId = safeId(source.id, "capture-" + Date.now().toString(36));
    const completeness = source.completeness && typeof source.completeness === "object" ? source.completeness : {};
    const status = COMPLETENESS.has(completeness.status) ? completeness.status : "unknown";
    const messages = Array.isArray(source.messages) ? source.messages : Array.isArray(source.chat) ? source.chat : [];

    return {
      schemaVersion: SCHEMA_VERSION,
      id: captureId,
      source: {
        platformId: safeId(source.source && source.source.platformId, "unknown"),
        interfaceId: safeId(source.source && source.source.interfaceId, "unknown"),
        url: cleanString(source.source && source.source.url),
        title: cleanString(source.source && source.source.title),
        capturedAt: cleanString(source.source && source.source.capturedAt) || new Date().toISOString(),
        adapterVersion: cleanString(source.source && source.source.adapterVersion) || "unversioned"
      },
      completeness: {
        status,
        reasons: Array.isArray(completeness.reasons) ? completeness.reasons.map(cleanString) : []
      },
      messages: messages.map((message, index) => normalizeMessage(message, index, captureId))
        .sort((a, b) => a.sequence - b.sequence),
      warnings: Array.isArray(source.warnings) ? source.warnings.map(cleanString) : []
    };
  }

  function escapeHTML(value) {
    return cleanString(value).replace(/[&<>"']/g, (char) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    })[char]);
  }

  function roleLabel(message) {
    return message.authorLabel || message.role;
  }

  function formatText(capture) {
    const c = normalizeCapture(capture);
    return c.messages.map((m) => {
      const stamp = m.timestamp ? " [" + m.timestamp + "]" : "";
      return roleLabel(m) + stamp + "\n" + m.text;
    }).join("\n\n");
  }

  function formatMarkdown(capture) {
    const c = normalizeCapture(capture);
    const lines = [
      "# " + (c.source.title || "Conversation capture"),
      "",
      "- Platform: " + c.source.platformId,
      "- Source: " + c.source.url,
      "- Captured: " + c.source.capturedAt,
      "- Completeness: " + c.completeness.status,
      ""
    ];
    c.messages.forEach((m) => {
      lines.push("## " + roleLabel(m));
      if (m.timestamp) lines.push("_" + m.timestamp + "_", "");
      if (m.contentBlocks.length) {
        m.contentBlocks.forEach((block) => {
          if (block.type === "code") {
            lines.push("```" + (block.language || ""), block.text || "", "```", "");
          } else if (block.text) {
            lines.push(block.text, "");
          } else if (block.url) {
            lines.push("[" + (block.name || block.alt || block.type) + "](" + block.url + ")", "");
          }
        });
      } else {
        lines.push(m.text, "");
      }
    });
    if (c.completeness.status !== "complete") {
      lines.push("> Capture is " + c.completeness.status + ". Do not assume unloaded or inaccessible messages are included.", "");
    }
    if (c.warnings.length) lines.push("## Capture warnings", ...c.warnings.map((w) => "- " + w), "");
    return lines.join("\n").trimEnd() + "\n";
  }

  function formatHTML(capture) {
    const c = normalizeCapture(capture);
    const messages = c.messages.map((m) => {
      const body = m.contentBlocks.map((block) => {
        if (block.type === "code") return "<pre><code>" + escapeHTML(block.text) + "</code></pre>";
        if (block.text) return "<p>" + escapeHTML(block.text).replace(/\n/g, "<br>") + "</p>";
        if (block.url && (block.type === "image" || block.type === "file")) {
          return "<p>" + escapeHTML(block.name || block.alt || block.type) + ": " + escapeHTML(block.url) + "</p>";
        }
        return "";
      }).join("");
      return '<article class="message"><header><strong>' + escapeHTML(roleLabel(m)) +
        "</strong>" + (m.timestamp ? '<time>' + escapeHTML(m.timestamp) + "</time>" : "") +
        "</header>" + (body || "<p>" + escapeHTML(m.text) + "</p>") + "</article>";
    }).join("\n");
    return "<!doctype html>\n<html lang=\"en\"><head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"><title>" +
      escapeHTML(c.source.title || "Conversation capture") +
      "</title><style>body{font:16px/1.5 system-ui,sans-serif;max-width:48rem;margin:2rem auto;padding:0 1rem;color:#0A0A0B;background:#fff}article{padding:1rem 0;border-bottom:1px solid #E8E8E6}header{display:flex;justify-content:space-between;gap:1rem}time{color:#6B707E;font-size:.875rem}pre{overflow:auto;background:#F5F5F3;padding:1rem}</style></head><body><h1>" +
      escapeHTML(c.source.title || "Conversation capture") + "</h1><p>Platform: " + escapeHTML(c.source.platformId) +
      " · Completeness: " + escapeHTML(c.completeness.status) + "</p>" + messages + "</body></html>";
  }

  function formatCSV(capture) {
    const c = normalizeCapture(capture);
    const quote = (value) => '"' + cleanString(value).replace(/"/g, '""') + '"';
    const rows = [["sequence", "role", "author", "timestamp", "text", "role_confidence"]];
    c.messages.forEach((m) => rows.push([m.sequence, m.role, roleLabel(m), m.timestamp || "", m.text, m.provenance.roleConfidence]));
    return rows.map((row) => row.map(quote).join(",")).join("\r\n") + "\r\n";
  }

  function formatJSON(capture) {
    return JSON.stringify(normalizeCapture(capture), null, 2) + "\n";
  }

  function serialize(capture, format) {
    const serializers = {
      json: formatJSON,
      markdown: formatMarkdown,
      md: formatMarkdown,
      text: formatText,
      txt: formatText,
      html: formatHTML,
      csv: formatCSV
    };
    if (!serializers[format]) throw new Error("Unsupported export format: " + format);
    return serializers[format](capture);
  }

  return {
    SCHEMA_VERSION,
    normalizeCapture,
    serialize,
    formatJSON,
    formatMarkdown,
    formatText,
    formatHTML,
    formatCSV,
    escapeHTML
  };
});
