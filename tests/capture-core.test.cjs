const test = require("node:test");
const assert = require("node:assert/strict");
const core = require("../capture-core.js");

test("normalizes messages into a versioned schema and keeps unknown roles unknown", () => {
  const capture = core.normalizeCapture({
    id: "cap-1",
    source: { platformId: "chatgpt", title: "Test" },
    messages: [
      { sender: "AI", messageMD: "response", sequence: 1 },
      { role: "user", text: "question", sequence: 0, roleConfidence: "high", roleEvidence: "explicit author attribute" }
    ]
  });
  assert.equal(capture.schemaVersion, "1.0.0");
  assert.equal(capture.messages[0].role, "user");
  assert.equal(capture.messages[1].role, "unknown");
  assert.equal(capture.messages[1].authorLabel, "AI");
  assert.equal(capture.messages[1].provenance.roleConfidence, "unknown");
});

test("orders messages by source sequence", () => {
  const capture = core.normalizeCapture({
    messages: [
      { role: "assistant", text: "second", sequence: 2 },
      { role: "user", text: "first", sequence: 1 }
    ]
  });
  assert.deepEqual(capture.messages.map((m) => m.text), ["first", "second"]);
});

test("HTML serializer escapes untrusted page text", () => {
  const html = core.formatHTML({
    source: { title: "<script>alert(1)</script>" },
    messages: [{ role: "assistant", text: "<img src=x onerror=alert(1)>" }]
  });
  assert.equal(html.includes("<script>alert(1)</script>"), false);
  assert.equal(html.includes("&lt;script&gt;"), true);
  assert.equal(html.includes("&lt;img"), true);
});

test("CSV serializer quotes commas, quotes, and line breaks", () => {
  const csv = core.formatCSV({
    messages: [{ role: "user", text: 'a, "quoted"\nline' }]
  });
  assert.equal(csv.includes('"a, ""quoted""\nline"'), true);
});

test("supports JSON, Markdown, text, HTML, and CSV serializers", () => {
  const capture = { source: { platformId: "demo" }, messages: [{ role: "user", text: "hello" }] };
  for (const format of ["json", "markdown", "md", "text", "txt", "html", "csv"]) {
    assert.equal(typeof core.serialize(capture, format), "string");
  }
});

test("rejects unknown formats instead of returning mislabeled content", () => {
  assert.throws(() => core.serialize({}, "pdf"), /Unsupported export format/);
});
