import { useState } from "react";

const data = {
  overview: [
    { aspect: "Full Form", sql: "Structured Query Language", nosql: "Not Only SQL" },
    { aspect: "Data Storage", sql: "Tables & Rows", nosql: "JSON, Key-Value, Documents" },
    { aspect: "Structure", sql: "Fixed / Rigid", nosql: "Flexible / Dynamic" },
    { aspect: "Schema", sql: "Predefined (strict)", nosql: "Schema-less (change anytime)" },
    { aspect: "Query Language", sql: "SQL (standard)", nosql: "Each DB has its own" },
    { aspect: "Scaling", sql: "Vertical (bigger server)", nosql: "Horizontal (more servers)" },
    { aspect: "Relationships", sql: "Excellent (joins)", nosql: "Limited" },
    { aspect: "Speed", sql: "Slower at massive scale", nosql: "Faster at massive scale" },
    { aspect: "Transactions", sql: "ACID compliant (safe)", nosql: "Eventual consistency" },
    { aspect: "Maturity", sql: "Decades old, proven", nosql: "Newer, modern" },
  ],
  usecases: [
    { icon: "🏦", title: "Banking & Finance", db: "SQL", reason: "Every transaction must be exact and consistent" },
    { icon: "📱", title: "Social Media Posts", db: "NoSQL", reason: "Posts vary — photos, videos, polls, locations" },
    { icon: "🛒", title: "E-commerce Orders", db: "SQL", reason: "Orders have strict, predictable structure" },
    { icon: "💬", title: "Chat / Messaging", db: "NoSQL", reason: "Real-time, high volume, flexible message types" },
    { icon: "👤", title: "User Accounts", db: "SQL", reason: "User data is always structured and related" },
    { icon: "📊", title: "Analytics / Logs", db: "NoSQL", reason: "Massive scale, unstructured log data" },
    { icon: "🏥", title: "Healthcare Records", db: "SQL", reason: "Data must be accurate and relational" },
    { icon: "🎮", title: "Gaming Leaderboards", db: "NoSQL", reason: "Need blazing speed with Redis" },
  ],
  examples: [
    { type: "sql", name: "MySQL", use: "Web apps, WordPress" },
    { type: "sql", name: "PostgreSQL", use: "Enterprise, complex queries" },
    { type: "sql", name: "SQLite", use: "Mobile apps, local storage" },
    { type: "nosql", name: "MongoDB", use: "Document store, flexible data" },
    { type: "nosql", name: "Redis", use: "Caching, real-time" },
    { type: "nosql", name: "Firebase", use: "Mobile/web real-time apps" },
    { type: "nosql", name: "Cassandra", use: "Massive scale, Instagram" },
  ]
};

export default function App() {
  const [tab, setTab] = useState("overview");

  return (
    <div style={{ fontFamily: "'Georgia', serif", background: "#0f0f0f", minHeight: "100vh", color: "#f0f0f0", padding: "32px 20px" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ display: "flex", justifyContent: "center", gap: 16, alignItems: "center", marginBottom: 12 }}>
            <span style={{ background: "#1a6cf6", padding: "6px 18px", borderRadius: 4, fontSize: 13, fontFamily: "monospace", letterSpacing: 2 }}>SQL</span>
            <span style={{ color: "#666", fontSize: 20 }}>vs</span>
            <span style={{ background: "#16a34a", padding: "6px 18px", borderRadius: 4, fontSize: 13, fontFamily: "monospace", letterSpacing: 2 }}>NoSQL</span>
          </div>
          <h1 style={{ fontSize: 32, fontWeight: "bold", margin: 0, letterSpacing: -1 }}>Database Comparison</h1>
          <p style={{ color: "#888", marginTop: 8, fontSize: 15 }}>Everything you need to know, side by side</p>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 8, marginBottom: 28, borderBottom: "1px solid #222", paddingBottom: 0 }}>
          {["overview", "usecases", "examples"].map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              background: "none", border: "none", color: tab === t ? "#fff" : "#555",
              padding: "10px 20px", cursor: "pointer", fontSize: 14, fontFamily: "inherit",
              borderBottom: tab === t ? "2px solid #1a6cf6" : "2px solid transparent",
              textTransform: "capitalize", letterSpacing: 0.5, transition: "all 0.2s"
            }}>{t}</button>
          ))}
        </div>

        {/* Overview Tab */}
        {tab === "overview" && (
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 0, border: "1px solid #222", borderRadius: 8, overflow: "hidden" }}>
              {/* Header */}
              <div style={{ background: "#1a1a1a", padding: "12px 16px", fontSize: 12, color: "#666", fontFamily: "monospace", letterSpacing: 1, textTransform: "uppercase" }}>Aspect</div>
              <div style={{ background: "#0d1f3c", padding: "12px 16px", fontSize: 12, color: "#1a6cf6", fontFamily: "monospace", letterSpacing: 1, textTransform: "uppercase", textAlign: "center" }}>⬡ SQL</div>
              <div style={{ background: "#0d2a1a", padding: "12px 16px", fontSize: 12, color: "#16a34a", fontFamily: "monospace", letterSpacing: 1, textTransform: "uppercase", textAlign: "center" }}>⬡ NoSQL</div>

              {data.overview.map((row, i) => (
                <>
                  <div key={`a${i}`} style={{ background: i % 2 === 0 ? "#141414" : "#111", padding: "14px 16px", fontSize: 13, color: "#aaa", borderTop: "1px solid #1e1e1e" }}>{row.aspect}</div>
                  <div key={`b${i}`} style={{ background: i % 2 === 0 ? "#0f1a2e" : "#0c1726", padding: "14px 16px", fontSize: 13, color: "#7eb3ff", borderTop: "1px solid #1e1e1e", textAlign: "center" }}>{row.sql}</div>
                  <div key={`c${i}`} style={{ background: i % 2 === 0 ? "#0f2218" : "#0c1e15", padding: "14px 16px", fontSize: 13, color: "#6ddd9a", borderTop: "1px solid #1e1e1e", textAlign: "center" }}>{row.nosql}</div>
                </>
              ))}
            </div>
          </div>
        )}

        {/* Use Cases Tab */}
        {tab === "usecases" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {data.usecases.map((u, i) => (
              <div key={i} style={{
                background: u.db === "SQL" ? "#0d1f3c" : "#0d2a1a",
                border: `1px solid ${u.db === "SQL" ? "#1a3a70" : "#1a4a2a"}`,
                borderRadius: 8, padding: "18px 20px"
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                  <span style={{ fontSize: 24 }}>{u.icon}</span>
                  <span style={{
                    background: u.db === "SQL" ? "#1a6cf6" : "#16a34a",
                    color: "#fff", fontSize: 11, padding: "2px 10px", borderRadius: 20, fontFamily: "monospace"
                  }}>{u.db}</span>
                </div>
                <div style={{ fontWeight: "bold", fontSize: 15, marginBottom: 6 }}>{u.title}</div>
                <div style={{ fontSize: 13, color: "#888", lineHeight: 1.5 }}>{u.reason}</div>
              </div>
            ))}
          </div>
        )}

        {/* Examples Tab */}
        {tab === "examples" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
            <div>
              <h3 style={{ color: "#1a6cf6", fontFamily: "monospace", fontSize: 14, letterSpacing: 2, marginBottom: 16, marginTop: 0 }}>SQL DATABASES</h3>
              {data.examples.filter(e => e.type === "sql").map((e, i) => (
                <div key={i} style={{ background: "#0d1f3c", border: "1px solid #1a3a70", borderRadius: 8, padding: "16px 18px", marginBottom: 10 }}>
                  <div style={{ fontWeight: "bold", fontSize: 16, color: "#7eb3ff", marginBottom: 4 }}>{e.name}</div>
                  <div style={{ fontSize: 13, color: "#666" }}>{e.use}</div>
                </div>
              ))}
            </div>
            <div>
              <h3 style={{ color: "#16a34a", fontFamily: "monospace", fontSize: 14, letterSpacing: 2, marginBottom: 16, marginTop: 0 }}>NoSQL DATABASES</h3>
              {data.examples.filter(e => e.type === "nosql").map((e, i) => (
                <div key={i} style={{ background: "#0d2a1a", border: "1px solid #1a4a2a", borderRadius: 8, padding: "16px 18px", marginBottom: 10 }}>
                  <div style={{ fontWeight: "bold", fontSize: 16, color: "#6ddd9a", marginBottom: 4 }}>{e.name}</div>
                  <div style={{ fontSize: 13, color: "#666" }}>{e.use}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom Rule */}
        <div style={{ marginTop: 36, padding: "20px 24px", background: "#141414", borderRadius: 8, border: "1px solid #222", textAlign: "center" }}>
          <span style={{ color: "#888", fontSize: 14 }}>💡 </span>
          <span style={{ color: "#aaa", fontSize: 14 }}>You don't have to choose one — most large apps use <strong style={{ color: "#fff" }}>both SQL and NoSQL</strong> together</span>
        </div>
      </div>
    </div>
  );
}
