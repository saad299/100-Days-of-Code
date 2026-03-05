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
  decision: [
    { condition: "Relational data with stable schema?", answer: "SQL", type: "sql" },
    { condition: "Need ACID compliance (finance, healthcare)?", answer: "SQL", type: "sql" },
    { condition: "Unknown or frequently changing structure?", answer: "NoSQL – Document", type: "nosql" },
    { condition: "Massive scale with simple lookups?", answer: "NoSQL – Key-Value", type: "nosql" },
    { condition: "Graph-like relationships (social networks)?", answer: "NoSQL – Graph", type: "nosql" },
    { condition: "Time-series or IoT sensor data?", answer: "NoSQL – Wide-Column", type: "nosql" },
    { condition: "Need fast caching layer?", answer: "NoSQL – Redis", type: "nosql" },
    { condition: "Complex reporting and analytics?", answer: "SQL", type: "sql" },
  ],
};

const TABS = ["overview", "usecases", "examples", "decision"];

const styles = {
  page: {
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
    background: "#080c14",
    minHeight: "100vh",
    color: "#e2e8f0",
    padding: "40px 20px",
  },
  container: { maxWidth: 860, margin: "0 auto" },
  headerWrap: { textAlign: "center", marginBottom: 48 },
  pillRow: { display: "flex", justifyContent: "center", gap: 12, alignItems: "center", marginBottom: 20 },
  pillSQL: {
    background: "linear-gradient(135deg, #1a6cf6, #3b8bff)",
    padding: "7px 22px", borderRadius: 6, fontSize: 13,
    fontFamily: "monospace", letterSpacing: 3, fontWeight: 700,
    boxShadow: "0 0 28px rgba(26,108,246,0.5)",
  },
  pillNoSQL: {
    background: "linear-gradient(135deg, #16a34a, #22c55e)",
    padding: "7px 22px", borderRadius: 6, fontSize: 13,
    fontFamily: "monospace", letterSpacing: 3, fontWeight: 700,
    boxShadow: "0 0 28px rgba(22,163,74,0.5)",
  },
  vsText: { color: "#1e293b", fontSize: 18, fontWeight: 800 },
  h1: { fontSize: 36, fontWeight: 800, margin: "0 0 10px", letterSpacing: -1.5, color: "#f8fafc" },
  subtitle: { color: "#64748b", fontSize: 15 },
  tabRow: {
    display: "flex", gap: 0, marginBottom: 32,
    background: "#0f1623", borderRadius: 10, padding: 4,
    border: "1px solid #1a2535",
  },
  tabBtn: (active) => ({
    flex: 1,
    background: active ? "linear-gradient(135deg, #121e38, #1a2f5e)" : "transparent",
    border: active ? "1px solid #243c78" : "1px solid transparent",
    color: active ? "#7eb3ff" : "#475569",
    padding: "10px 0", cursor: "pointer",
    fontSize: 13, fontFamily: "inherit",
    borderRadius: 8, fontWeight: active ? 600 : 400,
    transition: "all 0.2s",
  }),
};

export default function App() {
  const [tab, setTab] = useState("overview");

  const isSQL = (type) => type === "sql" || type === "SQL";

  const cardStyle = (sql) => ({
    background: sql ? "#090f1f" : "#091509",
    border: `1px solid ${sql ? "#1a3060" : "#1a3d20"}`,
    borderRadius: 12, padding: "20px 22px",
    position: "relative", overflow: "hidden",
  });

  const glowStyle = (sql) => ({
    position: "absolute", top: -20, right: -20,
    width: 100, height: 100, borderRadius: "50%",
    background: sql ? "rgba(26,108,246,0.09)" : "rgba(22,163,74,0.09)",
    filter: "blur(24px)", pointerEvents: "none",
  });

  const badge = (sql, text) => ({
    display: "inline-block",
    background: sql ? "rgba(26,108,246,0.15)" : "rgba(22,163,74,0.15)",
    color: sql ? "#60a5fa" : "#4ade80",
    border: `1px solid ${sql ? "#1a6cf640" : "#16a34a40"}`,
    fontSize: 10, padding: "2px 10px", borderRadius: 20,
    fontFamily: "monospace", letterSpacing: 1,
  });

  return (
    <div style={styles.page}>
      <div style={styles.container}>

        {/* Header */}
        <div style={styles.headerWrap}>
          <div style={styles.pillRow}>
            <span style={styles.pillSQL}>SQL</span>
            <span style={styles.vsText}>vs</span>
            <span style={styles.pillNoSQL}>NoSQL</span>
          </div>
          <h1 style={styles.h1}>Database Comparison</h1>
          <p style={styles.subtitle}>Everything you need to know, side by side</p>
        </div>

        {/* Tabs */}
        <div style={styles.tabRow}>
          {[["overview","📋 Overview"],["usecases","🧩 Use Cases"],["examples","🗄️ Examples"],["decision","🔀 Decision"]].map(([t, label]) => (
            <button key={t} onClick={() => setTab(t)} style={styles.tabBtn(tab === t)}>{label}</button>
          ))}
        </div>

        {/* Overview Tab */}
        {tab === "overview" && (
          <div style={{ border: "1px solid #1a2535", borderRadius: 12, overflow: "hidden" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr 1fr" }}>
              {[["#0a0e18","#2d3748","Aspect"], ["#08102a","#1a6cf6","⬡  SQL"], ["#081a0f","#16a34a","⬡  NoSQL"]].map(([bg, color, label]) => (
                <div key={label} style={{ background: bg, padding: "14px 20px", fontSize: 11, color, fontFamily: "monospace", letterSpacing: 2, textTransform: "uppercase", textAlign: label !== "Aspect" ? "center" : "left" }}>{label}</div>
              ))}
              {data.overview.map((row, i) => (
                <div key={i} style={{ display: "contents" }}>
                  <div style={{ background: i%2===0?"#0e131c":"#0b1018", padding:"13px 20px", fontSize:12, color:"#64748b", borderTop:"1px solid #111a26", fontFamily:"monospace" }}>{row.aspect}</div>
                  <div style={{ background: i%2===0?"#090f1f":"#07101e", padding:"13px 20px", fontSize:13, color:"#7eb3ff", borderTop:"1px solid #111a26", textAlign:"center" }}>{row.sql}</div>
                  <div style={{ background: i%2===0?"#091509":"#071208", padding:"13px 20px", fontSize:13, color:"#6ddd9a", borderTop:"1px solid #111a26", textAlign:"center" }}>{row.nosql}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Use Cases Tab */}
        {tab === "usecases" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            {data.usecases.map((u, i) => {
              const sql = isSQL(u.db);
              return (
                <div key={i} style={cardStyle(sql)}>
                  <div style={glowStyle(sql)} />
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
                    <span style={{ fontSize:26 }}>{u.icon}</span>
                    <span style={badge(sql)}>{u.db}</span>
                  </div>
                  <div style={{ fontWeight:700, fontSize:15, marginBottom:6, color:"#f1f5f9" }}>{u.title}</div>
                  <div style={{ fontSize:13, color:"#64748b", lineHeight:1.6 }}>{u.reason}</div>
                </div>
              );
            })}
          </div>
        )}

        {/* Examples Tab */}
        {tab === "examples" && (
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:24 }}>
            {[true, false].map(sql => (
              <div key={String(sql)}>
                <h3 style={{ color: sql?"#1a6cf6":"#16a34a", fontFamily:"monospace", fontSize:11, letterSpacing:3, marginBottom:16, marginTop:0, textTransform:"uppercase", display:"flex", alignItems:"center", gap:8 }}>
                  <span style={{ width:24, height:2, background:`linear-gradient(90deg, ${sql?"#1a6cf6":"#16a34a"}, transparent)`, display:"inline-block" }} />
                  {sql ? "SQL Databases" : "NoSQL Databases"}
                </h3>
                {data.examples.filter(e => isSQL(e.type) === sql).map((e, i) => (
                  <div key={i} style={{ ...cardStyle(sql), padding:"16px 18px", marginBottom:10, display:"flex", justifyContent:"space-between", alignItems:"flex-start", borderRadius:10 }}>
                    <div style={glowStyle(sql)} />
                    <div>
                      <div style={{ fontWeight:700, fontSize:16, color: sql?"#7eb3ff":"#6ddd9a", marginBottom:4 }}>{e.name}</div>
                      <div style={{ fontSize:12, color:"#475569" }}>{e.use}</div>
                    </div>
                    <span style={{ fontSize:9, fontFamily:"monospace", padding:"3px 8px", borderRadius:4, background: sql?"#1a2e50":"#12301a", color: sql?"#60a5fa":"#4ade80", border:`1px solid ${sql?"#1a6cf630":"#16a34a30"}`, letterSpacing:0.5, whiteSpace:"nowrap", marginTop:2 }}>{e.badge}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        {/* Decision Tab */}
        {tab === "decision" && (
          <div>
            <div style={{ marginBottom:20, padding:"12px 18px", background:"#0a0e18", borderRadius:10, border:"1px solid #1a2535", fontSize:13, color:"#475569" }}>
              Answer each question to find the best fit for your use case:
            </div>
            {data.decision.map((d, i) => {
              const sql = isSQL(d.type);
              return (
                <div key={i} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"14px 18px", marginBottom:10, borderRadius:10, background: sql?"#090f1f":"#091509", border:`1px solid ${sql?"#1a3060":"#1a3d20"}` }}>
                  <div style={{ color:"#94a3b8", fontSize:13, flex:1, marginRight:16 }}>
                    <span style={{ color:"#334155", marginRight:8 }}>#{i+1}</span>{d.condition}
                  </div>
                  <span style={{ padding:"5px 14px", borderRadius:20, fontWeight:700, fontSize:12, whiteSpace:"nowrap", fontFamily:"monospace", background: sql?"rgba(26,108,246,0.15)":"rgba(22,163,74,0.15)", color: sql?"#60a5fa":"#4ade80", border:`1px solid ${sql?"#1a6cf640":"#16a34a40"}` }}>→ {d.answer}</span>
                </div>
              );
            })}
          </div>
        )}

        {/* Footer */}
        <div style={{ marginTop:36, padding:"18px 24px", background:"linear-gradient(135deg, #0f131e, #0c1520)", borderRadius:12, border:"1px solid #1a2535", textAlign:"center", fontSize:14, color:"#64748b", lineHeight:1.7 }}>
          💡 You don't have to choose one —{" "}
          <span style={{ color:"#94a3b8" }}>most large-scale apps use <strong style={{ color:"#f1f5f9" }}>both SQL and NoSQL</strong> together for different layers of their stack.</span>
        </div>
      </div>
    </div>
  );
}