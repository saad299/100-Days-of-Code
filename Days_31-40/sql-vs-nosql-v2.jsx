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
    { type: "sql", name: "MySQL", badge: "Popular", use: "Web apps, WordPress, CMS platforms" },
    { type: "sql", name: "PostgreSQL", badge: "Enterprise", use: "Complex queries, advanced indexing" },
    { type: "sql", name: "SQLite", badge: "Lightweight", use: "Mobile apps, local storage" },
    { type: "nosql", name: "MongoDB", badge: "Document", use: "Flexible schemas, startup stacks" },
    { type: "nosql", name: "Redis", badge: "In-Memory", use: "Caching, sessions, leaderboards" },
    { type: "nosql", name: "Firebase", badge: "Real-time", use: "Mobile/web apps, live sync" },
    { type: "nosql", name: "Cassandra", badge: "Massive Scale", use: "Netflix, Instagram, time-series" },
  ],
  benchmarks: [
    {
      metric: "Read Speed (simple key lookup)",
      sqlVal: 35, nosqlVal: 95,
      sqlLabel: "~8ms", nosqlLabel: "~0.5ms",
      winner: "nosql", note: "Redis & Cassandra dominate simple lookups",
    },
    {
      metric: "Write Throughput",
      sqlVal: 40, nosqlVal: 90,
      sqlLabel: "~50k/s", nosqlLabel: "~500k/s",
      winner: "nosql", note: "NoSQL scales writes horizontally with ease",
    },
    {
      metric: "Complex JOIN Queries",
      sqlVal: 92, nosqlVal: 22,
      sqlLabel: "Excellent", nosqlLabel: "Poor",
      winner: "sql", note: "SQL was built for relational joins",
    },
    {
      metric: "Data Consistency",
      sqlVal: 98, nosqlVal: 55,
      sqlLabel: "ACID", nosqlLabel: "Eventual",
      winner: "sql", note: "SQL guarantees full consistency always",
    },
    {
      metric: "Horizontal Scalability",
      sqlVal: 30, nosqlVal: 95,
      sqlLabel: "Hard", nosqlLabel: "Native",
      winner: "nosql", note: "NoSQL was designed to scale out, not up",
    },
    {
      metric: "Schema Flexibility",
      sqlVal: 18, nosqlVal: 96,
      sqlLabel: "Rigid", nosqlLabel: "Dynamic",
      winner: "nosql", note: "Add/remove fields anytime in NoSQL",
    },
    {
      metric: "Reporting & Analytics",
      sqlVal: 90, nosqlVal: 40,
      sqlLabel: "Native", nosqlLabel: "Limited",
      winner: "sql", note: "SQL aggregations, GROUP BY, window functions",
    },
  ],
  both: [
    {
      company: "Uber",
      icon: "🚗",
      sql: "PostgreSQL for driver/rider accounts, billing",
      nosql: "Cassandra for trip location data (massive writes)",
      reason: "Structured user data + high-volume geo-events need different tools",
    },
    {
      company: "Netflix",
      icon: "🎬",
      sql: "MySQL for billing, subscriptions",
      nosql: "Cassandra for viewing history, Redis for caching",
      reason: "Financial records need ACID; watch history needs scale",
    },
    {
      company: "Airbnb",
      icon: "🏠",
      sql: "MySQL for bookings, payments, users",
      nosql: "Elasticsearch for property search, MongoDB for listing details",
      reason: "Transactions stay in SQL; flexible listing content in NoSQL",
    },
    {
      company: "Instagram",
      icon: "📸",
      sql: "PostgreSQL for user accounts, follow relationships",
      nosql: "Cassandra for feed data, Redis for likes/counts",
      reason: "Social graph in SQL; high-speed feed reads in NoSQL",
    },
  ],
  flowchart: [
    { id: 1, q: "Is your data structured with fixed fields?", yes: 2, no: 5, yesLabel: "Yes → structured", noLabel: "No → flexible" },
    { id: 2, q: "Do you need complex JOINs or reporting?", yes: "SQL ✓", no: 3, yesLabel: "Yes → relational", noLabel: "No → continue" },
    { id: 3, q: "Is data integrity & ACID critical?", yes: "SQL ✓", no: 4, yesLabel: "Yes → critical", noLabel: "No → continue" },
    { id: 4, q: "Do you need massive write throughput?", yes: "NoSQL – Wide-Column ✓", no: "SQL ✓", yesLabel: "Yes → scale", noLabel: "No → SQL fine" },
    { id: 5, q: "Is it real-time or streaming data?", yes: "NoSQL – Key-Value ✓", no: 6, yesLabel: "Yes → real-time", noLabel: "No → continue" },
    { id: 6, q: "Is it graph or nested relationship data?", yes: "NoSQL – Graph/Document ✓", no: "NoSQL – Document ✓", yesLabel: "Yes → graph", noLabel: "No → document" },
  ],
};

const TABS = [
  ["overview", "📋", "Overview"],
  ["usecases", "🧩", "Use Cases"],
  ["examples", "🗄️", "Examples"],
  ["benchmarks", "⚡", "Benchmarks"],
  ["both", "🔗", "Use Both"],
  ["flowchart", "🔀", "Flowchart"],
];

const SQL_BLUE = "#1a6cf6";
const NOSQL_GREEN = "#16a34a";

const card = (sql) => ({
  background: sql ? "#090f1f" : "#091509",
  border: `1px solid ${sql ? "#1a3060" : "#1a3d20"}`,
  borderRadius: 12, padding: "20px 22px",
  position: "relative", overflow: "hidden",
});

const glow = (sql) => ({
  position: "absolute", top: -20, right: -20,
  width: 100, height: 100, borderRadius: "50%",
  background: sql ? "rgba(26,108,246,0.09)" : "rgba(22,163,74,0.09)",
  filter: "blur(24px)", pointerEvents: "none",
});

const chip = (sql) => ({
  display: "inline-block",
  background: sql ? "rgba(26,108,246,0.15)" : "rgba(22,163,74,0.15)",
  color: sql ? "#60a5fa" : "#4ade80",
  border: `1px solid ${sql ? "#1a6cf640" : "#16a34a40"}`,
  fontSize: 10, padding: "2px 10px", borderRadius: 20,
  fontFamily: "monospace", letterSpacing: 1,
});

export default function App() {
  const [tab, setTab] = useState("overview");
  const [flowStep, setFlowStep] = useState(1);
  const [flowHistory, setFlowHistory] = useState([]);
  const [flowResult, setFlowResult] = useState(null);

  const handleFlow = (next) => {
    if (typeof next === "string") {
      setFlowResult(next);
      return;
    }
    setFlowHistory(h => [...h, flowStep]);
    setFlowStep(next);
  };

  const resetFlow = () => {
    setFlowStep(1);
    setFlowHistory([]);
    setFlowResult(null);
  };

  const currentNode = data.flowchart.find(n => n.id === flowStep);

  return (
    <div style={{ fontFamily: "'Inter','Segoe UI',sans-serif", background: "#080c14", minHeight: "100vh", color: "#e2e8f0", padding: "40px 20px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>

        {/* ── Header ── */}
        <div style={{ textAlign: "center", marginBottom: 44 }}>
          <div style={{ display: "flex", justifyContent: "center", gap: 14, alignItems: "center", marginBottom: 18 }}>
            {[["SQL", SQL_BLUE, "0 0 28px rgba(26,108,246,0.55)"], ["NoSQL", NOSQL_GREEN, "0 0 28px rgba(22,163,74,0.55)"]].map(([label, bg, shadow], i) => (
              <>
                {i === 1 && <span key="vs" style={{ color: "#1e293b", fontSize: 18, fontWeight: 800 }}>vs</span>}
                <span key={label} style={{ background: `linear-gradient(135deg, ${bg}, ${bg}cc)`, padding: "7px 22px", borderRadius: 6, fontSize: 13, fontFamily: "monospace", letterSpacing: 3, fontWeight: 700, boxShadow: shadow }}>{label}</span>
              </>
            ))}
          </div>
          <h1 style={{ fontSize: 36, fontWeight: 800, margin: "0 0 10px", letterSpacing: -1.5, color: "#f8fafc" }}>Database Comparison</h1>
          <p style={{ color: "#64748b", fontSize: 15, margin: 0 }}>Everything you need to know, side by side</p>
        </div>

        {/* ── Tabs ── */}
        <div style={{ display: "flex", gap: 0, marginBottom: 32, background: "#0f1623", borderRadius: 10, padding: 4, border: "1px solid #1a2535", flexWrap: "wrap" }}>
          {TABS.map(([t, icon, label]) => {
            const active = tab === t;
            return (
              <button key={t} onClick={() => setTab(t)} style={{
                flex: 1, minWidth: 80,
                background: active ? "linear-gradient(135deg, #121e38, #1a2f5e)" : "transparent",
                border: active ? "1px solid #243c78" : "1px solid transparent",
                color: active ? "#7eb3ff" : "#475569",
                padding: "9px 4px", cursor: "pointer", fontSize: 12,
                fontFamily: "inherit", borderRadius: 8,
                fontWeight: active ? 700 : 400, transition: "all 0.2s",
              }}>{icon} {label}</button>
            );
          })}
        </div>

        {/* ── Overview ── */}
        {tab === "overview" && (
          <div style={{ border: "1px solid #1a2535", borderRadius: 12, overflow: "hidden" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr 1fr" }}>
              {[["#0a0e18", "#2d3748", "Aspect", "left"], ["#08102a", SQL_BLUE, "⬡  SQL", "center"], ["#081a0f", NOSQL_GREEN, "⬡  NoSQL", "center"]].map(([bg, color, label, align]) => (
                <div key={label} style={{ background: bg, padding: "14px 20px", fontSize: 11, color, fontFamily: "monospace", letterSpacing: 2, textTransform: "uppercase", textAlign: align }}>{label}</div>
              ))}
              {data.overview.map((row, i) => (
                <div key={i} style={{ display: "contents" }}>
                  <div style={{ background: i % 2 === 0 ? "#0e131c" : "#0b1018", padding: "13px 20px", fontSize: 12, color: "#64748b", borderTop: "1px solid #111a26", fontFamily: "monospace" }}>{row.aspect}</div>
                  <div style={{ background: i % 2 === 0 ? "#090f1f" : "#07101e", padding: "13px 20px", fontSize: 13, color: "#7eb3ff", borderTop: "1px solid #111a26", textAlign: "center" }}>{row.sql}</div>
                  <div style={{ background: i % 2 === 0 ? "#091509" : "#071208", padding: "13px 20px", fontSize: 13, color: "#6ddd9a", borderTop: "1px solid #111a26", textAlign: "center" }}>{row.nosql}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Use Cases ── */}
        {tab === "usecases" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            {data.usecases.map((u, i) => {
              const sql = u.db === "SQL";
              return (
                <div key={i} style={card(sql)}>
                  <div style={glow(sql)} />
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                    <span style={{ fontSize: 26 }}>{u.icon}</span>
                    <span style={chip(sql)}>{u.db}</span>
                  </div>
                  <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 6, color: "#f1f5f9" }}>{u.title}</div>
                  <div style={{ fontSize: 13, color: "#64748b", lineHeight: 1.6 }}>{u.reason}</div>
                </div>
              );
            })}
          </div>
        )}

        {/* ── Examples ── */}
        {tab === "examples" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
            {[true, false].map(sql => (
              <div key={String(sql)}>
                <h3 style={{ color: sql ? SQL_BLUE : NOSQL_GREEN, fontFamily: "monospace", fontSize: 11, letterSpacing: 3, marginBottom: 16, marginTop: 0, textTransform: "uppercase", display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ width: 24, height: 2, background: `linear-gradient(90deg, ${sql ? SQL_BLUE : NOSQL_GREEN}, transparent)`, display: "inline-block" }} />
                  {sql ? "SQL Databases" : "NoSQL Databases"}
                </h3>
                {data.examples.filter(e => (e.type === "sql") === sql).map((e, i) => (
                  <div key={i} style={{ ...card(sql), padding: "16px 18px", marginBottom: 10, display: "flex", justifyContent: "space-between", alignItems: "flex-start", borderRadius: 10 }}>
                    <div style={glow(sql)} />
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 16, color: sql ? "#7eb3ff" : "#6ddd9a", marginBottom: 4 }}>{e.name}</div>
                      <div style={{ fontSize: 12, color: "#475569" }}>{e.use}</div>
                    </div>
                    <span style={{ fontSize: 9, fontFamily: "monospace", padding: "3px 8px", borderRadius: 4, background: sql ? "#1a2e50" : "#12301a", color: sql ? "#60a5fa" : "#4ade80", border: `1px solid ${sql ? "#1a6cf630" : "#16a34a30"}`, letterSpacing: 0.5, whiteSpace: "nowrap", marginTop: 2 }}>{e.badge}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        {/* ── Benchmarks ── */}
        {tab === "benchmarks" && (
          <div>
            <div style={{ marginBottom: 20, padding: "12px 18px", background: "#0a0e18", borderRadius: 10, border: "1px solid #1a2535", fontSize: 13, color: "#475569" }}>
              Relative performance across key metrics — higher bar = better performance in that area.
            </div>
            {data.benchmarks.map((b, i) => {
              const sqlWins = b.winner === "sql";
              return (
                <div key={i} style={{ background: "#0a0f1a", border: "1px solid #1a2535", borderRadius: 12, padding: "18px 22px", marginBottom: 14 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                    <span style={{ fontWeight: 600, fontSize: 14, color: "#cbd5e1" }}>{b.metric}</span>
                    <span style={{ fontSize: 11, fontFamily: "monospace", padding: "2px 10px", borderRadius: 20, background: sqlWins ? "rgba(26,108,246,0.15)" : "rgba(22,163,74,0.15)", color: sqlWins ? "#60a5fa" : "#4ade80", border: `1px solid ${sqlWins ? "#1a6cf640" : "#16a34a40"}` }}>
                      {sqlWins ? "SQL wins" : "NoSQL wins"}
                    </span>
                  </div>

                  {/* SQL Bar */}
                  <div style={{ marginBottom: 10 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                      <span style={{ fontSize: 11, color: "#60a5fa", fontFamily: "monospace" }}>SQL</span>
                      <span style={{ fontSize: 11, color: "#60a5fa", fontFamily: "monospace" }}>{b.sqlLabel}</span>
                    </div>
                    <div style={{ background: "#0d1525", borderRadius: 4, height: 8, overflow: "hidden" }}>
                      <div style={{ width: `${b.sqlVal}%`, height: "100%", background: "linear-gradient(90deg, #1a6cf6, #60a5fa)", borderRadius: 4, transition: "width 0.6s ease" }} />
                    </div>
                  </div>

                  {/* NoSQL Bar */}
                  <div style={{ marginBottom: 10 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                      <span style={{ fontSize: 11, color: "#4ade80", fontFamily: "monospace" }}>NoSQL</span>
                      <span style={{ fontSize: 11, color: "#4ade80", fontFamily: "monospace" }}>{b.nosqlLabel}</span>
                    </div>
                    <div style={{ background: "#0d1a0f", borderRadius: 4, height: 8, overflow: "hidden" }}>
                      <div style={{ width: `${b.nosqlVal}%`, height: "100%", background: "linear-gradient(90deg, #16a34a, #4ade80)", borderRadius: 4, transition: "width 0.6s ease" }} />
                    </div>
                  </div>

                  <div style={{ fontSize: 12, color: "#475569", marginTop: 4 }}>💡 {b.note}</div>
                </div>
              );
            })}
          </div>
        )}

        {/* ── Use Both ── */}
        {tab === "both" && (
          <div>
            <div style={{ marginBottom: 20, padding: "16px 20px", background: "linear-gradient(135deg, #0d1a30, #0a1f12)", borderRadius: 12, border: "1px solid #1a3050", fontSize: 13, color: "#94a3b8", lineHeight: 1.7 }}>
              <span style={{ color: "#f8fafc", fontWeight: 700 }}>The real world uses both.</span> Here's how top companies split their workloads — SQL for structured, reliable data, NoSQL for speed and flexibility.
            </div>
            {data.both.map((b, i) => (
              <div key={i} style={{ background: "#0a0f1a", border: "1px solid #1a2535", borderRadius: 14, padding: "22px 24px", marginBottom: 16, position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: -30, right: -30, width: 140, height: 140, borderRadius: "50%", background: "radial-gradient(circle, rgba(26,108,246,0.05) 0%, rgba(22,163,74,0.05) 100%)", filter: "blur(20px)", pointerEvents: "none" }} />
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                  <span style={{ fontSize: 28 }}>{b.icon}</span>
                  <span style={{ fontWeight: 800, fontSize: 18, color: "#f1f5f9" }}>{b.company}</span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
                  <div style={{ background: "#090f1f", border: "1px solid #1a3060", borderRadius: 10, padding: "14px 16px" }}>
                    <div style={{ fontSize: 10, fontFamily: "monospace", letterSpacing: 2, color: SQL_BLUE, marginBottom: 8, textTransform: "uppercase" }}>⬡ SQL Layer</div>
                    <div style={{ fontSize: 13, color: "#7eb3ff", lineHeight: 1.6 }}>{b.sql}</div>
                  </div>
                  <div style={{ background: "#091509", border: "1px solid #1a3d20", borderRadius: 10, padding: "14px 16px" }}>
                    <div style={{ fontSize: 10, fontFamily: "monospace", letterSpacing: 2, color: NOSQL_GREEN, marginBottom: 8, textTransform: "uppercase" }}>⬡ NoSQL Layer</div>
                    <div style={{ fontSize: 13, color: "#6ddd9a", lineHeight: 1.6 }}>{b.nosql}</div>
                  </div>
                </div>
                <div style={{ fontSize: 12, color: "#475569", borderTop: "1px solid #1a2535", paddingTop: 12 }}>
                  💡 {b.reason}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── Flowchart ── */}
        {tab === "flowchart" && (
          <div>
            <div style={{ marginBottom: 24, padding: "12px 18px", background: "#0a0e18", borderRadius: 10, border: "1px solid #1a2535", fontSize: 13, color: "#475569" }}>
              Answer each question to get a personalized database recommendation.
            </div>

            {/* Progress trail */}
            {flowHistory.length > 0 && (
              <div style={{ marginBottom: 16 }}>
                {flowHistory.map((stepId, i) => {
                  const node = data.flowchart.find(n => n.id === stepId);
                  return (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, opacity: 0.5 }}>
                      <span style={{ width: 20, height: 20, borderRadius: "50%", background: "#1a2535", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: "#64748b", flexShrink: 0 }}>{i + 1}</span>
                      <span style={{ fontSize: 12, color: "#475569" }}>{node?.q}</span>
                    </div>
                  );
                })}
                <div style={{ height: 1, background: "#1a2535", margin: "12px 0" }} />
              </div>
            )}

            {/* Result */}
            {flowResult ? (
              <div style={{ textAlign: "center", padding: "48px 32px", background: flowResult.includes("SQL ✓") && !flowResult.includes("NoSQL") ? "#090f1f" : "#091509", border: `2px solid ${flowResult.includes("SQL ✓") && !flowResult.includes("NoSQL") ? "#1a6cf6" : "#16a34a"}`, borderRadius: 16 }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>
                  {flowResult.includes("SQL ✓") && !flowResult.includes("NoSQL") ? "🗄️" : "🌿"}
                </div>
                <div style={{ fontSize: 13, color: "#64748b", marginBottom: 8, fontFamily: "monospace", letterSpacing: 2 }}>RECOMMENDATION</div>
                <div style={{ fontSize: 28, fontWeight: 800, color: flowResult.includes("SQL ✓") && !flowResult.includes("NoSQL") ? "#7eb3ff" : "#6ddd9a", marginBottom: 24 }}>
                  {flowResult.replace(" ✓", "")}
                </div>
                <button onClick={resetFlow} style={{ background: "#1a2535", border: "1px solid #2a3a55", color: "#94a3b8", padding: "10px 24px", borderRadius: 8, cursor: "pointer", fontSize: 13, fontFamily: "inherit" }}>
                  ↩ Start Over
                </button>
              </div>
            ) : (
              /* Active question */
              <div style={{ background: "#0a0f1a", border: "1px solid #1e2d45", borderRadius: 16, padding: "32px 28px", textAlign: "center" }}>
                <div style={{ fontSize: 11, fontFamily: "monospace", letterSpacing: 2, color: "#334155", marginBottom: 16, textTransform: "uppercase" }}>
                  Step {flowStep} of {data.flowchart.length}
                </div>
                <div style={{ fontSize: 20, fontWeight: 700, color: "#f1f5f9", marginBottom: 32, lineHeight: 1.5 }}>
                  {currentNode?.q}
                </div>
                <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
                  <button onClick={() => handleFlow(currentNode.yes)} style={{ background: "linear-gradient(135deg, #0d1f3c, #1a3060)", border: "1px solid #2a5090", color: "#7eb3ff", padding: "14px 28px", borderRadius: 10, cursor: "pointer", fontSize: 14, fontFamily: "inherit", fontWeight: 600, minWidth: 160 }}>
                    ✓ {currentNode?.yesLabel}
                  </button>
                  <button onClick={() => handleFlow(currentNode.no)} style={{ background: "linear-gradient(135deg, #0d2a1a, #1a4030)", border: "1px solid #2a6040", color: "#6ddd9a", padding: "14px 28px", borderRadius: 10, cursor: "pointer", fontSize: 14, fontFamily: "inherit", fontWeight: 600, minWidth: 160 }}>
                    ✗ {currentNode?.noLabel}
                  </button>
                </div>
                {flowHistory.length > 0 && (
                  <button onClick={() => { const prev = [...flowHistory]; const last = prev.pop(); setFlowStep(last); setFlowHistory(prev); setFlowResult(null); }} style={{ marginTop: 20, background: "none", border: "none", color: "#334155", cursor: "pointer", fontSize: 13, fontFamily: "inherit" }}>
                    ← Back
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        {/* ── Footer ── */}
        <div style={{ marginTop: 36, padding: "18px 24px", background: "linear-gradient(135deg, #0f131e, #0c1520)", borderRadius: 12, border: "1px solid #1a2535", textAlign: "center", fontSize: 14, color: "#64748b", lineHeight: 1.7 }}>
          💡 You don't have to choose one —{" "}
          <span style={{ color: "#94a3b8" }}>most large-scale apps use <strong style={{ color: "#f1f5f9" }}>both SQL and NoSQL</strong> together for different layers of their stack.</span>
        </div>
      </div>
    </div>
  );
}
