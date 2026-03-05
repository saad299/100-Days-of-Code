import { useState } from "react";

const sqlData = {
  color: "blue",
  scenarios: [
    { scenario: "Structured, relational data", reason: "Tables with clear relationships (users → orders → products)" },
    { scenario: "Data integrity is critical", reason: "ACID transactions, foreign keys, constraints" },
    { scenario: "Complex queries", reason: "JOINs, aggregations, reporting, analytics" },
    { scenario: "Schema is stable", reason: "Data shape doesn't change often" },
    { scenario: "Financial/transactional systems", reason: "Banks, ERP, e-commerce backends" },
  ],
};

const nosqlData = {
  color: "green",
  scenarios: [
    { scenario: "Flexible/evolving schema", reason: "Fields vary per record, schema changes frequently" },
    { scenario: "Massive scale & speed", reason: "Horizontal scaling across many servers" },
    { scenario: "Unstructured/semi-structured data", reason: "JSON documents, logs, sensor data" },
    { scenario: "High write throughput", reason: "Millions of events/sec (Cassandra, DynamoDB)" },
    { scenario: "Hierarchical or graph data", reason: "Nested docs (MongoDB), relationships (Neo4j)" },
    { scenario: "Caching", reason: "Key-value stores like Redis" },
  ],
};

const decisionGuide = [
  { condition: "Relational data with stable schema?", answer: "SQL", type: "sql" },
  { condition: "Need ACID compliance (finance, healthcare)?", answer: "SQL", type: "sql" },
  { condition: "Unknown/flexible data structure?", answer: "NoSQL (Document)", type: "nosql" },
  { condition: "Massive scale, simple lookups?", answer: "NoSQL (Key-Value)", type: "nosql" },
  { condition: "Graph relationships (social networks)?", answer: "NoSQL (Graph)", type: "nosql" },
  { condition: "Time-series or IoT data?", answer: "NoSQL (Wide-Column)", type: "nosql" },
];

export default function SQLvsNoSQL() {
  const [tab, setTab] = useState("compare");

  return (
    <div style={{ fontFamily: "sans-serif", maxWidth: 860, margin: "0 auto", padding: 24 }}>
      <h1 style={{ textAlign: "center", fontSize: 28, marginBottom: 4 }}>SQL vs NoSQL</h1>
      <p style={{ textAlign: "center", color: "#666", marginBottom: 24 }}>When to use each database paradigm</p>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 8, marginBottom: 24, justifyContent: "center" }}>
        {["compare", "decision"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              padding: "8px 20px",
              borderRadius: 8,
              border: "none",
              cursor: "pointer",
              fontWeight: 600,
              background: tab === t ? "#1e293b" : "#e2e8f0",
              color: tab === t ? "#fff" : "#333",
            }}
          >
            {t === "compare" ? "Side-by-Side" : "Decision Guide"}
          </button>
        ))}
      </div>

      {tab === "compare" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          {[
            { label: "SQL", emoji: "🗄️", data: sqlData, bg: "#eff6ff", border: "#3b82f6", head: "#1d4ed8" },
            { label: "NoSQL", emoji: "🌿", data: nosqlData, bg: "#f0fdf4", border: "#22c55e", head: "#15803d" },
          ].map(({ label, emoji, data, bg, border, head }) => (
            <div key={label} style={{ background: bg, border: `2px solid ${border}`, borderRadius: 12, padding: 20 }}>
              <h2 style={{ color: head, marginBottom: 16 }}>{emoji} Use {label} when...</h2>
              {data.scenarios.map(({ scenario, reason }) => (
                <div key={scenario} style={{ marginBottom: 14 }}>
                  <div style={{ fontWeight: 700, color: "#1e293b" }}>✓ {scenario}</div>
                  <div style={{ color: "#475569", fontSize: 14, marginTop: 2 }}>{reason}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {tab === "decision" && (
        <div style={{ background: "#f8fafc", border: "2px solid #cbd5e1", borderRadius: 12, padding: 24 }}>
          <h2 style={{ marginBottom: 20, color: "#1e293b" }}>🔍 Quick Decision Guide</h2>
          {decisionGuide.map(({ condition, answer, type }) => (
            <div
              key={condition}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "12px 16px",
                marginBottom: 10,
                borderRadius: 8,
                background: "#fff",
                border: "1px solid #e2e8f0",
              }}
            >
              <span style={{ color: "#334155" }}>❓ {condition}</span>
              <span
                style={{
                  padding: "4px 14px",
                  borderRadius: 20,
                  fontWeight: 700,
                  fontSize: 13,
                  background: type === "sql" ? "#dbeafe" : "#dcfce7",
                  color: type === "sql" ? "#1d4ed8" : "#15803d",
                }}
              >
                → {answer}
              </span>
            </div>
          ))}
          <div style={{ marginTop: 20, padding: 16, background: "#fef9c3", borderRadius: 8, color: "#713f12" }}>
            💡 <strong>Pro tip:</strong> Many modern systems use <strong>both</strong> — SQL for core transactional data, NoSQL for caching, search, or event streams.
          </div>
        </div>
      )}
    </div>
  );
}