import { useState } from "react";

// ── Neon palette ──────────────────────────────────────────────
const N = {
  cyan:        "#00c8ff",   // SQL accent
  cyanDim:     "#0090bb",
  cyanGlow:    "rgba(0,200,255,0.18)",
  cyanBorder:  "rgba(0,200,255,0.22)",

  purple:      "#bf5af2",   // NoSQL accent
  purpleDim:   "#8b35c4",
  purpleGlow:  "rgba(191,90,242,0.18)",
  purpleBorder:"rgba(191,90,242,0.22)",

  amber:       "#ffaa3b",   // string literals
  pink:        "#ff6eb4",   // numbers / special
  comment:     "#3a3350",   // dimmed comments

  bg:          "#060914",
  surface:     "#0b0f1e",
  surfaceAlt:  "#0d1020",
  border:      "#181e35",
  borderMid:   "#1e2640",
  textPrimary: "#dde4f0",
  textMuted:   "#4a5580",
  textDim:     "#2a3050",
};

const syntaxData = {
  create: {
    label: "Create / Define", icon: "🏗️",
    description: "Setting up a structure to store data",
    sql:   { title: "CREATE TABLE",              code: `CREATE TABLE users (\n  id       INT PRIMARY KEY AUTO_INCREMENT,\n  name     VARCHAR(100) NOT NULL,\n  email    VARCHAR(255) UNIQUE,\n  age      INT,\n  created  TIMESTAMP DEFAULT NOW()\n);` },
    nosql: { title: "Insert first doc (schema-free)", code: `// No setup needed — just insert!\ndb.users.insertOne({\n  name:    "Alice",\n  email:   "alice@email.com",\n  age:     28,\n  created: new Date()\n});` },
  },
  insert: {
    label: "Insert", icon: "➕",
    description: "Adding new data records",
    sql:   { title: "INSERT INTO",         code: `INSERT INTO users (name, email, age)\nVALUES ('Alice', 'alice@email.com', 28);\n\n-- Multiple rows at once\nINSERT INTO users (name, email, age)\nVALUES\n  ('Bob',   'bob@email.com',   32),\n  ('Carol', 'carol@email.com', 25);` },
    nosql: { title: "insertOne / insertMany", code: `// Single document\ndb.users.insertOne({\n  name: "Alice", email: "alice@email.com", age: 28\n});\n\n// Multiple documents\ndb.users.insertMany([\n  { name: "Bob",   email: "bob@email.com",   age: 32 },\n  { name: "Carol", email: "carol@email.com", age: 25 }\n]);` },
  },
  select: {
    label: "Read / Query", icon: "🔍",
    description: "Fetching and filtering records",
    sql:   { title: "SELECT",       code: `-- All records\nSELECT * FROM users;\n\n-- With filter\nSELECT name, email\nFROM users\nWHERE age > 25;\n\n-- With sort & limit\nSELECT * FROM users\nORDER BY name ASC\nLIMIT 10;` },
    nosql: { title: "find / findOne", code: `// All documents\ndb.users.find({});\n\n// With filter\ndb.users.find(\n  { age: { $gt: 25 } },\n  { name: 1, email: 1 }   // projection\n);\n\n// With sort & limit\ndb.users.find({})\n  .sort({ name: 1 })\n  .limit(10);` },
  },
  update: {
    label: "Update", icon: "✏️",
    description: "Modifying existing records",
    sql:   { title: "UPDATE SET",           code: `-- Update one field\nUPDATE users\nSET age = 29\nWHERE email = 'alice@email.com';\n\n-- Update multiple fields\nUPDATE users\nSET age = 29, name = 'Alice B.'\nWHERE id = 1;` },
    nosql: { title: "updateOne / updateMany", code: `// Update one field\ndb.users.updateOne(\n  { email: "alice@email.com" },\n  { $set: { age: 29 } }\n);\n\n// Update multiple fields\ndb.users.updateOne(\n  { _id: ObjectId("...") },\n  { $set: { age: 29, name: "Alice B." } }\n);` },
  },
  delete: {
    label: "Delete", icon: "🗑️",
    description: "Removing records from the database",
    sql:   { title: "DELETE FROM",           code: `-- Delete specific record\nDELETE FROM users\nWHERE email = 'alice@email.com';\n\n-- Delete with condition\nDELETE FROM users\nWHERE age < 18;\n\n-- Delete all (careful!)\nDELETE FROM users;` },
    nosql: { title: "deleteOne / deleteMany", code: `// Delete specific document\ndb.users.deleteOne({\n  email: "alice@email.com"\n});\n\n// Delete with condition\ndb.users.deleteMany({\n  age: { $lt: 18 }\n});\n\n// Delete all (careful!)\ndb.users.deleteMany({});` },
  },
  join: {
    label: "Join / Lookup", icon: "🔗",
    description: "Combining data from multiple tables or collections",
    sql:   { title: "JOIN",                  code: `-- Inner join orders with users\nSELECT u.name, o.product, o.total\nFROM users u\nINNER JOIN orders o\n  ON u.id = o.user_id\nWHERE o.total > 100;\n\n-- Left join (include users with no orders)\nSELECT u.name, o.product\nFROM users u\nLEFT JOIN orders o ON u.id = o.user_id;` },
    nosql: { title: "$lookup (aggregation)",  code: `db.orders.aggregate([\n  {\n    $lookup: {\n      from:         "users",\n      localField:   "user_id",\n      foreignField: "_id",\n      as:           "user"\n    }\n  },\n  { $unwind: "$user" },\n  { $match: { total: { $gt: 100 } } },\n  { $project: { "user.name": 1, product: 1, total: 1 } }\n]);` },
  },
  aggregate: {
    label: "Aggregate", icon: "📊",
    description: "Grouping, counting, summing data",
    sql:   { title: "GROUP BY / COUNT / SUM", code: `-- Count users per age group\nSELECT age, COUNT(*) AS total\nFROM users\nGROUP BY age\nORDER BY total DESC;\n\n-- Sum of orders by user\nSELECT user_id, SUM(total) AS spent\nFROM orders\nGROUP BY user_id\nHAVING SUM(total) > 500;` },
    nosql: { title: "$group / $count / $sum", code: `// Count users per age\ndb.users.aggregate([\n  { $group: { _id: "$age", total: { $sum: 1 } } },\n  { $sort:  { total: -1 } }\n]);\n\n// Sum of orders by user\ndb.orders.aggregate([\n  { $group: { _id: "$user_id", spent: { $sum: "$total" } } },\n  { $match: { spent: { $gt: 500 } } }\n]);` },
  },
  index: {
    label: "Index", icon: "⚡",
    description: "Speeding up queries with indexes",
    sql:   { title: "CREATE INDEX",  code: `-- Simple index\nCREATE INDEX idx_email\nON users (email);\n\n-- Composite index\nCREATE INDEX idx_name_age\nON users (name, age);\n\n-- Unique index\nCREATE UNIQUE INDEX idx_unique_email\nON users (email);` },
    nosql: { title: "createIndex",   code: `// Simple index\ndb.users.createIndex({ email: 1 });\n\n// Composite index\ndb.users.createIndex({ name: 1, age: -1 });\n\n// Unique index\ndb.users.createIndex(\n  { email: 1 },\n  { unique: true }\n);` },
  },
};

const DIFFS = {
  create:    { sql: ["Schema must be defined upfront before inserting any data", "Column types are strictly enforced (INT, VARCHAR, etc.)", "Constraints like UNIQUE and NOT NULL are set at table level"], nosql: ["No schema definition needed — just insert a document", "Fields can vary between documents in the same collection", "New fields can be added at any time with no migration"] },
  insert:    { sql: ["Column names and data types must match the defined schema", "Inserting into non-existent columns throws an error", "Batch inserts use multiple value tuples in one statement"], nosql: ["Documents are plain JSON objects — no schema to match", "Extra or missing fields are allowed per document", "insertMany takes a plain array of objects"] },
  select:    { sql: ["SELECT specifies exact columns to return", "WHERE uses operators like =, >, <, LIKE, BETWEEN", "LIMIT and ORDER BY are built-in clauses"], nosql: ["find() takes a filter object as first argument", "Projection (which fields to return) is a second argument", "Chaining .sort() and .limit() controls results"] },
  update:    { sql: ["SET keyword assigns new values to columns", "Without WHERE, all rows are updated — be careful!", "Multiple columns updated in one SET clause with commas"], nosql: ["$set operator patches only specified fields", "Other fields in the document are left untouched", "updateMany() updates all matching documents at once"] },
  delete:    { sql: ["DELETE without WHERE removes ALL rows — dangerous!", "Can filter with any WHERE condition", "Cascading deletes possible via foreign key constraints"], nosql: ["deleteMany({}) removes all documents in a collection", "deleteOne() stops after the first match", "No automatic cascade — must handle relations manually"] },
  join:      { sql: ["JOIN is a first-class operation with dedicated syntax", "Multiple join types: INNER, LEFT, RIGHT, FULL OUTER", "Highly optimized by the query planner with indexes"], nosql: ["$lookup performs a join inside an aggregation pipeline", "$unwind is needed to flatten the joined array result", "Joins are slower — data is usually denormalized instead"] },
  aggregate: { sql: ["GROUP BY with COUNT, SUM, AVG, MIN, MAX are native", "HAVING filters groups after aggregation", "Window functions available in most modern SQL databases"], nosql: ["Aggregation uses a pipeline of composable stages", "$sum: 1 counts documents; $sum: '$field' sums a field", "Pipelines can chain many stages in sequence"] },
  index:     { sql: ["Indexes defined with CREATE INDEX statement", "Composite indexes cover multiple columns at once", "EXPLAIN keyword shows if an index is being used"], nosql: ["Indexes created with the createIndex() method", "1 = ascending, -1 = descending for sort direction", "{ unique: true } option enforces field uniqueness"] },
};

const SQL_KW  = ["SELECT","FROM","WHERE","INSERT","INTO","VALUES","UPDATE","SET","DELETE","CREATE","TABLE","JOIN","LEFT","INNER","ON","GROUP","BY","ORDER","HAVING","COUNT","SUM","LIMIT","INDEX","UNIQUE","PRIMARY","KEY","NOT","NULL","DEFAULT","AUTO_INCREMENT","TIMESTAMP","INT","VARCHAR","AND","OR","AS","ASC","DESC"];
const NOSQL_KW = ["db","insertOne","insertMany","find","findOne","updateOne","updateMany","deleteOne","deleteMany","aggregate","createIndex","$set","$gt","$lt","$gte","$lte","$match","$group","$sort","$lookup","$unwind","$project","$sum","$count","new Date","ObjectId"];

function CodeBlock({ code, sql }) {
  const [copied, setCopied] = useState(false);
  const color = sql ? N.cyan : N.purple;
  const glowBg = sql ? N.cyanGlow : N.purpleGlow;

  const copy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  };

  const tokenize = (line) => {
    const isComment = sql ? /^\s*--/.test(line) : /^\s*\/\//.test(line);
    if (isComment) return [<span key="cm" style={{ color: N.comment, fontStyle: "italic" }}>{line}</span>];

    const kws = sql ? SQL_KW : NOSQL_KW;
    const parts = [];
    let rem = line, k = 0;

    while (rem.length > 0) {
      // keyword
      let hit = false;
      for (const kw of kws) {
        const m = rem.match(new RegExp(`^(${kw.replace("$","\\$")})(?=[^a-zA-Z_$]|$)`));
        if (m) {
          parts.push(<span key={k++} style={{ color, fontWeight: 700, textShadow: `0 0 8px ${color}55` }}>{m[0]}</span>);
          rem = rem.slice(m[0].length); hit = true; break;
        }
      }
      if (hit) continue;
      // string
      const str = rem.match(/^(".*?"|'.*?')/);
      if (str) { parts.push(<span key={k++} style={{ color: N.amber }}>{str[0]}</span>); rem = rem.slice(str[0].length); continue; }
      // number
      const num = rem.match(/^\b\d+\b/);
      if (num) { parts.push(<span key={k++} style={{ color: N.pink }}>{num[0]}</span>); rem = rem.slice(num[0].length); continue; }
      // default
      parts.push(<span key={k++} style={{ color: "#6a7fa8" }}>{rem[0]}</span>);
      rem = rem.slice(1);
    }
    return parts;
  };

  return (
    <div style={{ position: "relative", flex: 1 }}>
      {/* glow line at top of code panel */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent, ${color}44, transparent)` }} />
      <button onClick={copy} style={{
        position: "absolute", top: 10, right: 10, zIndex: 2,
        background: copied ? glowBg : "rgba(10,14,28,0.8)",
        border: `1px solid ${copied ? color : N.borderMid}`,
        color: copied ? color : N.textMuted,
        padding: "3px 10px", borderRadius: 6,
        cursor: "pointer", fontSize: 11, fontFamily: "monospace",
        transition: "all 0.2s",
        boxShadow: copied ? `0 0 10px ${color}44` : "none",
      }}>
        {copied ? "✓ copied" : "copy"}
      </button>
      <pre style={{
        margin: 0, padding: "18px 16px 18px",
        fontSize: 12.5, lineHeight: 1.8,
        fontFamily: "'Fira Code','Cascadia Code','Courier New',monospace",
        overflowX: "auto", background: "transparent",
        minHeight: 170,
      }}>
        {code.split("\n").map((line, i) => <div key={i}>{tokenize(line)}{"\n"}</div>)}
      </pre>
    </div>
  );
}

export default function App() {
  const [tab, setTab] = useState(Object.keys(syntaxData)[0]);
  const cur = syntaxData[tab];
  const TABS = Object.keys(syntaxData);

  return (
    <div style={{ fontFamily: "'Inter','Segoe UI',sans-serif", background: N.bg, minHeight: "100vh", color: N.textPrimary, padding: "36px 20px" }}>
      {/* subtle grid overlay */}
      <div style={{ position: "fixed", inset: 0, backgroundImage: `linear-gradient(${N.border} 1px, transparent 1px), linear-gradient(90deg, ${N.border} 1px, transparent 1px)`, backgroundSize: "40px 40px", opacity: 0.25, pointerEvents: "none" }} />

      <div style={{ maxWidth: 980, margin: "0 auto", position: "relative" }}>

        {/* ── Header ── */}
        <div style={{ textAlign: "center", marginBottom: 44 }}>
          <div style={{ display: "flex", justifyContent: "center", gap: 16, alignItems: "center", marginBottom: 20 }}>
            {/* SQL pill */}
            <div style={{ position: "relative" }}>
              <div style={{ position: "absolute", inset: -3, borderRadius: 8, background: N.cyanGlow, filter: "blur(8px)" }} />
              <span style={{ position: "relative", display: "inline-block", background: "linear-gradient(135deg, #031824, #051e2e)", border: `1px solid ${N.cyan}55`, padding: "8px 24px", borderRadius: 7, fontSize: 13, fontFamily: "monospace", letterSpacing: 3, fontWeight: 700, color: N.cyan, textShadow: `0 0 12px ${N.cyan}` }}>SQL</span>
            </div>
            <span style={{ color: N.textDim, fontSize: 16, fontWeight: 700, letterSpacing: 2 }}>VS</span>
            {/* NoSQL pill */}
            <div style={{ position: "relative" }}>
              <div style={{ position: "absolute", inset: -3, borderRadius: 8, background: N.purpleGlow, filter: "blur(8px)" }} />
              <span style={{ position: "relative", display: "inline-block", background: "linear-gradient(135deg, #120418, #1a0624)", border: `1px solid ${N.purple}55`, padding: "8px 24px", borderRadius: 7, fontSize: 13, fontFamily: "monospace", letterSpacing: 3, fontWeight: 700, color: N.purple, textShadow: `0 0 12px ${N.purple}` }}>NoSQL</span>
            </div>
          </div>
          <h1 style={{ fontSize: 34, fontWeight: 800, margin: "0 0 10px", letterSpacing: -1.5, color: "#eef2ff" }}>Syntax Comparison</h1>
          <p style={{ color: N.textMuted, fontSize: 15, margin: 0 }}>Side-by-side code — same operation, different world</p>
        </div>

        {/* ── Tabs ── */}
        <div style={{ display: "flex", gap: 0, marginBottom: 26, background: N.surface, borderRadius: 12, padding: 4, border: `1px solid ${N.border}`, flexWrap: "wrap" }}>
          {TABS.map(t => {
            const active = tab === t;
            return (
              <button key={t} onClick={() => setTab(t)} style={{
                flex: 1, minWidth: 90,
                background: active ? "linear-gradient(135deg, #07111f, #0b1a30)" : "transparent",
                border: active ? `1px solid ${N.cyan}33` : "1px solid transparent",
                color: active ? N.cyan : N.textMuted,
                boxShadow: active ? `0 0 16px ${N.cyanGlow}` : "none",
                padding: "9px 4px", cursor: "pointer",
                fontSize: 12, fontFamily: "inherit",
                borderRadius: 8, fontWeight: active ? 700 : 400,
                transition: "all 0.2s",
                textShadow: active ? `0 0 8px ${N.cyan}88` : "none",
              }}>
                {syntaxData[t].icon} {syntaxData[t].label}
              </button>
            );
          })}
        </div>

        {/* ── Description strip ── */}
        <div style={{ marginBottom: 18, padding: "12px 18px", background: N.surface, borderRadius: 10, border: `1px solid ${N.border}`, display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 20 }}>{cur.icon}</span>
          <div>
            <span style={{ fontWeight: 700, color: "#c8d6f0", fontSize: 14 }}>{cur.label}</span>
            <span style={{ color: N.textMuted, fontSize: 14 }}> — {cur.description}</span>
          </div>
        </div>

        {/* ── Code panels ── */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {[
            { sql: true,  d: cur.sql },
            { sql: false, d: cur.nosql },
          ].map(({ sql, d }) => {
            const color  = sql ? N.cyan   : N.purple;
            const glow   = sql ? N.cyanGlow : N.purpleGlow;
            const border = sql ? N.cyanBorder : N.purpleBorder;
            const bgCard = sql ? "#050d1a" : "#0c0516";
            const bgHead = sql ? "#040c18" : "#0a0414";
            return (
              <div key={String(sql)} style={{ background: bgCard, border: `1px solid ${border}`, borderRadius: 14, overflow: "hidden", display: "flex", flexDirection: "column", boxShadow: `0 0 30px ${glow}` }}>
                {/* card header */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "11px 16px", background: bgHead, borderBottom: `1px solid ${border}` }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ display: "flex", gap: 5 }}>
                      {["#ff5f57","#febc2e","#28c840"].map(c => <div key={c} style={{ width: 9, height: 9, borderRadius: "50%", background: c, opacity: 0.55 }} />)}
                    </div>
                    <span style={{ fontSize: 11, fontFamily: "monospace", color, letterSpacing: 1, textShadow: `0 0 6px ${color}88` }}>
                      {sql ? "query.sql" : "query.js"}
                    </span>
                  </div>
                  <span style={{ fontSize: 9, fontFamily: "monospace", letterSpacing: 0.5, padding: "2px 9px", borderRadius: 4, background: `${color}18`, color, border: `1px solid ${color}33` }}>
                    {d.title}
                  </span>
                </div>
                <CodeBlock code={d.code} sql={sql} />
              </div>
            );
          })}
        </div>

        {/* ── Key Differences ── */}
        <div style={{ marginTop: 18, background: N.surfaceAlt, border: `1px solid ${N.border}`, borderRadius: 14, padding: "18px 22px" }}>
          <div style={{ fontSize: 10, fontFamily: "monospace", letterSpacing: 3, color: N.textDim, marginBottom: 16, textTransform: "uppercase" }}>
            ── Key Differences · {cur.label} ──
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {[true, false].map(sql => {
              const color = sql ? N.cyan : N.purple;
              const points = (DIFFS[tab] || {})[sql ? "sql" : "nosql"] || [];
              return (
                <div key={String(sql)}>
                  <div style={{ fontSize: 10, color, fontFamily: "monospace", letterSpacing: 2, marginBottom: 12, textShadow: `0 0 8px ${color}88`, textTransform: "uppercase" }}>
                    {sql ? "⬡ SQL" : "⬡ NoSQL"}
                  </div>
                  {points.map((p, i) => (
                    <div key={i} style={{ display: "flex", gap: 10, marginBottom: 9, alignItems: "flex-start" }}>
                      <span style={{ color, marginTop: 2, flexShrink: 0, fontSize: 12, textShadow: `0 0 6px ${color}` }}>›</span>
                      <span style={{ fontSize: 12.5, color: "#5a6a8a", lineHeight: 1.6 }}>{p}</span>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Footer ── */}
        <div style={{ marginTop: 24, padding: "16px 24px", background: N.surface, borderRadius: 12, border: `1px solid ${N.border}`, textAlign: "center", fontSize: 13.5, color: N.textMuted, lineHeight: 1.7 }}>
          💡 SQL uses{" "}
          <strong style={{ color: N.cyan, textShadow: `0 0 8px ${N.cyan}66` }}>declarative, set-based</strong>
          {" "}syntax — NoSQL uses{" "}
          <strong style={{ color: N.purple, textShadow: `0 0 8px ${N.purple}66` }}>imperative, object-based</strong>
          {" "}method calls. Same goals, different philosophies.
        </div>
      </div>
    </div>
  );
}
