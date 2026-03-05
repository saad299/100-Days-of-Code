import { useState } from "react";

// ── Neon palette ──────────────────────────────────────────────
const C = {
  cyan:    "#00d4ff",
  purple:  "#c45ef5",
  green:   "#39ff8f",
  amber:   "#ffb347",
  pink:    "#ff4fa3",
  red:     "#ff4444",
  bg:      "#05070f",
  surface: "#080c18",
  panel:   "#0a0e1c",
  border:  "#141a2e",
  dim:     "#1a2035",
  muted:   "#3a4560",
  text:    "#c8d6f0",
  faint:   "#4a5578",
};

const SQL_KW   = ["SELECT","FROM","WHERE","INSERT","INTO","VALUES","UPDATE","SET","DELETE","CREATE","TABLE","JOIN","LEFT","INNER","ON","GROUP","BY","ORDER","HAVING","COUNT","SUM","LIMIT","INDEX","UNIQUE","PRIMARY","KEY","NOT","NULL","DEFAULT","AUTO_INCREMENT","TIMESTAMP","INT","VARCHAR","AND","OR","AS","ASC","DESC","REFERENCES"];
const NOSQL_KW = ["db","insertOne","insertMany","find","findOne","updateOne","updateMany","deleteOne","deleteMany","aggregate","createIndex","$set","$gt","$lt","$gte","$lte","$ne","$in","$match","$group","$sort","$lookup","$unwind","$project","$sum","$count","new","Date","ObjectId","true","false","null"];

function tokenize(line, sql) {
  const isComment = sql ? /^\s*--/.test(line) : /^\s*\/\//.test(line);
  if (isComment) return [<span key="cm" style={{ color: C.muted, fontStyle: "italic" }}>{line}</span>];

  const kws = sql ? SQL_KW : NOSQL_KW;
  const parts = []; let rem = line; let k = 0;

  while (rem.length > 0) {
    let hit = false;
    for (const kw of kws) {
      const m = rem.match(new RegExp(`^(${kw.replace(/[$]/g, "\\$")})(?=[^a-zA-Z_$]|$)`));
      if (m) {
        const color = sql ? C.cyan : C.purple;
        parts.push(<span key={k++} style={{ color, fontWeight: 700, textShadow: `0 0 6px ${color}66` }}>{m[0]}</span>);
        rem = rem.slice(m[0].length); hit = true; break;
      }
    }
    if (hit) continue;
    const str = rem.match(/^(".*?"|'.*?')/);
    if (str) { parts.push(<span key={k++} style={{ color: C.amber }}>{str[0]}</span>); rem = rem.slice(str[0].length); continue; }
    const num = rem.match(/^\b\d+\b/);
    if (num) { parts.push(<span key={k++} style={{ color: C.pink }}>{num[0]}</span>); rem = rem.slice(num[0].length); continue; }
    parts.push(<span key={k++} style={{ color: "#5a6e96" }}>{rem[0]}</span>);
    rem = rem.slice(1);
  }
  return parts;
}

function MiniCode({ code, sql }) {
  const [copied, setCopied] = useState(false);
  const accent = sql ? C.cyan : C.purple;
  const copy = () => { navigator.clipboard.writeText(code).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1500); }); };
  return (
    <div style={{ position: "relative", background: sql ? "#030a14" : "#0a0314", border: `1px solid ${accent}22`, borderRadius: 8, overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent 0%, ${accent}66 50%, transparent 100%)` }} />
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "7px 12px", borderBottom: `1px solid ${accent}18`, background: `${accent}08` }}>
        <div style={{ display: "flex", gap: 5 }}>
          {["#ff5f57","#febc2e","#28c840"].map(c => <div key={c} style={{ width: 8, height: 8, borderRadius: "50%", background: c, opacity: 0.5 }} />)}
        </div>
        <span style={{ fontSize: 10, fontFamily: "monospace", color: accent, letterSpacing: 1, opacity: 0.8 }}>{sql ? "query.sql" : "query.js"}</span>
        <button onClick={copy} style={{ background: "none", border: "none", cursor: "pointer", color: copied ? accent : C.muted, fontSize: 10, fontFamily: "monospace", padding: 0, transition: "color 0.2s" }}>{copied ? "✓ copied" : "copy"}</button>
      </div>
      <pre style={{ margin: 0, padding: "12px 14px", fontSize: 12, lineHeight: 1.75, fontFamily: "'Fira Code','Cascadia Code','Courier New',monospace", overflowX: "auto" }}>
        {code.split("\n").map((l, i) => <div key={i}>{tokenize(l, sql)}</div>)}
      </pre>
    </div>
  );
}

const CHAPTERS = [
  {
    id: "schema",
    icon: "01",
    title: "Schema & Structure",
    tagline: "How data is organized before anything is stored",
    insight: "SQL demands you define the blueprint first. NoSQL skips the blueprint entirely — structure emerges from the data itself.",
    sqlExplain: "You must declare every column, its data type, and any constraints before inserting a single row. The schema is enforced at the database level.",
    nosqlExplain: "No definition step exists. The first insert creates the collection automatically. Every document can have completely different fields.",
    sqlCode: `-- Define structure BEFORE inserting data
CREATE TABLE users (
  id      INT PRIMARY KEY AUTO_INCREMENT,
  name    VARCHAR(100) NOT NULL,
  email   VARCHAR(255) UNIQUE,
  age     INT,
  created TIMESTAMP DEFAULT NOW()
);`,
    nosqlCode: `// No definition needed — just write
// The collection is created on first insert
db.users.insertOne({
  name:    "Alice",
  email:   "alice@email.com",
  age:     28,
  created: new Date()
});`,
  },
  {
    id: "insert",
    icon: "02",
    title: "Inserting Data",
    tagline: "Writing new records into the database",
    insight: "SQL validates every insert against your schema. NoSQL just accepts whatever you throw at it — even if two records look nothing alike.",
    sqlExplain: "Column order and types must match the table definition. Batch inserts use comma-separated value tuples in a single statement.",
    nosqlExplain: "Each document is an independent JSON object. insertMany takes a plain array — documents can have different shapes in the same collection.",
    sqlCode: `-- Single insert
INSERT INTO users (name, email, age)
VALUES ('Alice', 'alice@email.com', 28);

-- Batch insert (multiple rows at once)
INSERT INTO users (name, email, age)
VALUES
  ('Bob',   'bob@email.com',   32),
  ('Carol', 'carol@email.com', 25);`,
    nosqlCode: `// Single document
db.users.insertOne({
  name: "Alice", email: "alice@email.com", age: 28
});

// Batch insert — mixed shapes allowed
db.users.insertMany([
  { name: "Bob",   age: 32, verified: true },
  { name: "Carol", age: 25, role: "admin"  }
]);`,
  },
  {
    id: "read",
    icon: "03",
    title: "Reading & Querying",
    tagline: "Fetching records with filters, sorting, and limits",
    insight: "SQL reads are clause-based sentences. NoSQL reads are method chains on filter objects. Both achieve the same result via completely different mental models.",
    sqlExplain: "SELECT lists columns, FROM names the table, WHERE filters rows. ORDER BY and LIMIT are appended as clauses at the end of the statement.",
    nosqlExplain: "find() takes two objects: a filter and a projection. Results are a cursor you chain .sort() and .limit() onto like a fluent API.",
    sqlCode: `-- All records
SELECT * FROM users;

-- Filtered, projected
SELECT name, email
FROM   users
WHERE  age > 25;

-- Sorted and limited
SELECT * FROM users
ORDER BY name ASC
LIMIT 10;`,
    nosqlCode: `// All documents
db.users.find({});

// Filtered + projection (1 = include, 0 = exclude)
db.users.find(
  { age: { $gt: 25 } },
  { name: 1, email: 1, _id: 0 }
);

// Sorted and limited (chained)
db.users.find({}).sort({ name: 1 }).limit(10);`,
  },
  {
    id: "update",
    icon: "04",
    title: "Updating Records",
    tagline: "Modifying data that already exists",
    insight: "SQL's SET rewrites column values in place. NoSQL's $set surgically patches only the fields you name — everything else in the document stays untouched.",
    sqlExplain: "SET lists new values for each column. Always pair with WHERE — omitting it updates every single row in the table silently.",
    nosqlExplain: "$set is the patch operator. Other update operators include $inc (increment), $push (append to array), $unset (remove a field).",
    sqlCode: `-- Update a single column
UPDATE users
SET    age = 29
WHERE  email = 'alice@email.com';

-- Update multiple columns at once
UPDATE users
SET    age = 29, name = 'Alice B.'
WHERE  id = 1;`,
    nosqlCode: `// Patch specific fields ($set)
db.users.updateOne(
  { email: "alice@email.com" },
  { $set: { age: 29 } }
);

// Multiple fields + other operators
db.users.updateOne(
  { _id: ObjectId("...") },
  { $set: { age: 29 }, $inc: { loginCount: 1 } }
);`,
  },
  {
    id: "delete",
    icon: "05",
    title: "Deleting Data",
    tagline: "Removing records — carefully",
    insight: "Both SQL and NoSQL follow the same danger rule: delete without a filter and you nuke everything. Always double-check your WHERE / filter object.",
    sqlExplain: "DELETE FROM removes rows matching the WHERE clause. No WHERE = all rows gone. You can use any valid WHERE condition including subqueries.",
    nosqlExplain: "deleteOne() removes only the first match. deleteMany() removes all matches. An empty filter {} matches every document in the collection.",
    sqlCode: `-- Delete one specific record
DELETE FROM users
WHERE  email = 'alice@email.com';

-- Delete by condition
DELETE FROM users
WHERE  age < 18;

-- ⚠️ Deletes EVERYTHING
DELETE FROM users;`,
    nosqlCode: `// Delete first match only
db.users.deleteOne({ email: "alice@email.com" });

// Delete all matches
db.users.deleteMany({ age: { $lt: 18 } });

// ⚠️ Deletes EVERYTHING in collection
db.users.deleteMany({});`,
  },
  {
    id: "join",
    icon: "06",
    title: "Joining / Lookup",
    tagline: "Combining data from multiple tables or collections",
    insight: "Joins are SQL's home turf — first-class syntax, query planner optimization, multiple join types. In NoSQL, $lookup works but is verbose and slower, which is why most NoSQL data is denormalized to avoid joins altogether.",
    sqlExplain: "INNER JOIN returns only rows with matches in both tables. LEFT JOIN keeps all left rows even without a match. Multiple joins can be chained.",
    nosqlExplain: "$lookup lives inside an aggregation pipeline. $unwind is required to flatten the joined array result into usable documents.",
    sqlCode: `-- Inner join: only matched rows
SELECT u.name, o.product, o.total
FROM   users u
INNER JOIN orders o ON u.id = o.user_id
WHERE  o.total > 100;

-- Left join: all users, even those with no orders
SELECT u.name, o.product
FROM   users u
LEFT JOIN orders o ON u.id = o.user_id;`,
    nosqlCode: `db.orders.aggregate([
  {
    $lookup: {
      from:         "users",
      localField:   "user_id",
      foreignField: "_id",
      as:           "user"
    }
  },
  { $unwind: "$user" },          // flatten the array
  { $match: { total: { $gt: 100 } } },
  { $project: { "user.name": 1, product: 1 } }
]);`,
  },
  {
    id: "aggregate",
    icon: "07",
    title: "Aggregation",
    tagline: "Grouping, counting, summing — making sense of bulk data",
    insight: "SQL aggregation is a single enriched SELECT. NoSQL aggregation is a pipeline of stages — each stage transforms the data and passes it to the next, like Unix pipes.",
    sqlExplain: "GROUP BY collapses rows into groups. Aggregate functions (COUNT, SUM, AVG) run per group. HAVING filters the resulting groups — not the original rows.",
    nosqlExplain: "$match first (filter early for speed), $group to collapse, $sort to order results. Stages are composable — add as many as needed.",
    sqlCode: `-- Count per group
SELECT   age, COUNT(*) AS total
FROM     users
GROUP BY age
ORDER BY total DESC;

-- Sum with group filter (HAVING)
SELECT   user_id, SUM(total) AS spent
FROM     orders
GROUP BY user_id
HAVING   SUM(total) > 500;`,
    nosqlCode: `// Count per group
db.users.aggregate([
  { $group: { _id: "$age", total: { $sum: 1 } } },
  { $sort:  { total: -1 } }
]);

// Sum with post-group filter
db.orders.aggregate([
  { $group: { _id: "$user_id", spent: { $sum: "$total" } } },
  { $match: { spent: { $gt: 500 } } }
]);`,
  },
  {
    id: "index",
    icon: "08",
    title: "Indexes",
    tagline: "Making queries fast by avoiding full scans",
    insight: "Without an index, every query scans every row or document. With the right index, the database jumps directly to results. The syntax differs but the concept is identical in both worlds.",
    sqlExplain: "CREATE INDEX names the index, specifies the table and column(s). EXPLAIN before a query shows whether the index is actually being hit by the planner.",
    nosqlExplain: "createIndex takes a document: 1 for ascending, -1 for descending. Options like { unique: true } or { sparse: true } modify behavior.",
    sqlCode: `-- Single column index
CREATE INDEX idx_email
ON users (email);

-- Composite index (covers both columns)
CREATE INDEX idx_name_age
ON users (name, age);

-- Unique index (also enforces uniqueness)
CREATE UNIQUE INDEX idx_unique_email
ON users (email);`,
    nosqlCode: `// Single field index
db.users.createIndex({ email: 1 });

// Compound index
db.users.createIndex({ name: 1, age: -1 });

// Unique index
db.users.createIndex(
  { email: 1 },
  { unique: true }
);`,
  },
];

export default function App() {
  const [active, setActive] = useState(null);
  const [hoveredNav, setHoveredNav] = useState(null);

  return (
    <div style={{ fontFamily: "'Inter','Segoe UI',sans-serif", background: C.bg, minHeight: "100vh", color: C.text }}>

      {/* scanline overlay */}
      <div style={{ position: "fixed", inset: 0, backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,212,255,0.012) 2px, rgba(0,212,255,0.012) 4px)`, pointerEvents: "none", zIndex: 0 }} />

      {/* ── HEADER ── */}
      <div style={{ position: "relative", borderBottom: `1px solid ${C.border}`, padding: "32px 24px 28px", textAlign: "center", background: `linear-gradient(180deg, #070b18 0%, ${C.bg} 100%)` }}>
        <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 600, height: 1, background: `linear-gradient(90deg, transparent, ${C.cyan}55, ${C.purple}55, transparent)` }} />

        {/* top label */}
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 20, padding: "4px 14px", borderRadius: 20, background: `${C.green}10`, border: `1px solid ${C.green}30` }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: C.green, boxShadow: `0 0 8px ${C.green}` }} />
          <span style={{ fontSize: 10, fontFamily: "monospace", color: C.green, letterSpacing: 2 }}>SYNTAX CODEX v2.0</span>
        </div>

        <h1 style={{ margin: "0 0 6px", fontSize: 40, fontWeight: 900, letterSpacing: -2, lineHeight: 1 }}>
          <span style={{ color: C.cyan, textShadow: `0 0 30px ${C.cyan}66` }}>SQL</span>
          <span style={{ color: C.muted, margin: "0 14px", fontSize: 22, fontWeight: 400 }}>vs</span>
          <span style={{ color: C.purple, textShadow: `0 0 30px ${C.purple}66` }}>NoSQL</span>
        </h1>
        <p style={{ margin: "10px 0 0", fontSize: 14, color: C.faint }}>
          Eight fundamental operations · side-by-side · explained
        </p>

        {/* SQL / NoSQL legend */}
        <div style={{ display: "flex", justifyContent: "center", gap: 24, marginTop: 20 }}>
          {[[C.cyan, "SQL — declarative, clause-based"], [C.purple, "NoSQL (MongoDB) — imperative, method-based"]].map(([col, label]) => (
            <div key={col} style={{ display: "flex", alignItems: "center", gap: 7 }}>
              <div style={{ width: 24, height: 2, background: col, boxShadow: `0 0 6px ${col}` }} />
              <span style={{ fontSize: 11, color: C.faint, fontFamily: "monospace" }}>{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── CHAPTER NAV (pill strip) ── */}
      <div style={{ position: "sticky", top: 0, zIndex: 10, background: `${C.surface}ee`, borderBottom: `1px solid ${C.border}`, backdropFilter: "blur(12px)", padding: "10px 24px", display: "flex", gap: 6, overflowX: "auto" }}>
        {CHAPTERS.map(ch => {
          const isActive = active === ch.id;
          const isHov    = hoveredNav === ch.id;
          return (
            <button
              key={ch.id}
              onClick={() => { setActive(isActive ? null : ch.id); if (!isActive) setTimeout(() => document.getElementById(`ch-${ch.id}`)?.scrollIntoView({ behavior: "smooth", block: "start" }), 50); }}
              onMouseEnter={() => setHoveredNav(ch.id)}
              onMouseLeave={() => setHoveredNav(null)}
              style={{
                background: isActive ? `${C.cyan}18` : (isHov ? `${C.cyan}0a` : "transparent"),
                border: `1px solid ${isActive ? C.cyan + "55" : (isHov ? C.cyan + "28" : C.border)}`,
                color: isActive ? C.cyan : (isHov ? C.text : C.faint),
                padding: "5px 12px", borderRadius: 20, cursor: "pointer",
                fontSize: 11, fontFamily: "monospace", whiteSpace: "nowrap",
                textShadow: isActive ? `0 0 8px ${C.cyan}` : "none",
                transition: "all 0.15s", letterSpacing: 0.5,
              }}
            >
              {ch.icon} {ch.title}
            </button>
          );
        })}
      </div>

      {/* ── CHAPTERS ── */}
      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "0 24px 60px" }}>
        {CHAPTERS.map((ch, idx) => {
          const isOpen = active === ch.id || active === null;
          return (
            <div key={ch.id} id={`ch-${ch.id}`} style={{ marginTop: 32, opacity: isOpen ? 1 : 0.35, transition: "opacity 0.2s" }}>

              {/* Chapter header */}
              <div
                onClick={() => setActive(active === ch.id ? null : ch.id)}
                style={{ display: "flex", alignItems: "center", gap: 16, cursor: "pointer", marginBottom: 16, userSelect: "none" }}
              >
                {/* Number badge */}
                <div style={{ flexShrink: 0, width: 44, height: 44, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", background: `${C.cyan}0f`, border: `1px solid ${C.cyan}33`, boxShadow: `0 0 16px ${C.cyan}18` }}>
                  <span style={{ fontSize: 13, fontFamily: "monospace", fontWeight: 800, color: C.cyan, textShadow: `0 0 8px ${C.cyan}` }}>{ch.icon}</span>
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
                    <h2 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: "#eef2ff", letterSpacing: -0.5 }}>{ch.title}</h2>
                    <span style={{ fontSize: 12, color: C.faint }}>{ch.tagline}</span>
                  </div>
                </div>

                {/* toggle chevron */}
                <span style={{ color: C.cyan, fontSize: 14, opacity: 0.6, transform: (active === ch.id) ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>▾</span>
              </div>

              {/* divider line */}
              <div style={{ height: 1, background: `linear-gradient(90deg, ${C.cyan}44 0%, ${C.purple}33 50%, transparent 100%)`, marginBottom: 18 }} />

              {/* ── INSIGHT CALLOUT ── */}
              <div style={{ marginBottom: 20, padding: "12px 16px", background: `${C.green}08`, border: `1px solid ${C.green}22`, borderRadius: 10, display: "flex", gap: 12, alignItems: "flex-start" }}>
                <span style={{ color: C.green, fontSize: 13, textShadow: `0 0 8px ${C.green}`, flexShrink: 0, marginTop: 1 }}>⬡</span>
                <p style={{ margin: 0, fontSize: 13, color: "#7a9070", lineHeight: 1.65, fontFamily: "monospace" }}>
                  <span style={{ color: C.green, fontWeight: 700 }}>insight: </span>{ch.insight}
                </p>
              </div>

              {/* ── EXPLANATION + CODE ROWS ── */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>

                {/* SQL side */}
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 16, height: 2, background: C.cyan, boxShadow: `0 0 6px ${C.cyan}` }} />
                    <span style={{ fontSize: 10, fontFamily: "monospace", color: C.cyan, letterSpacing: 2, textShadow: `0 0 8px ${C.cyan}66` }}>SQL</span>
                  </div>
                  {/* explain box */}
                  <div style={{ padding: "10px 14px", background: `${C.cyan}07`, border: `1px solid ${C.cyan}18`, borderRadius: 8 }}>
                    <p style={{ margin: 0, fontSize: 12.5, color: C.faint, lineHeight: 1.65 }}>{ch.sqlExplain}</p>
                  </div>
                  <MiniCode code={ch.sqlCode} sql={true} />
                </div>

                {/* NoSQL side */}
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 16, height: 2, background: C.purple, boxShadow: `0 0 6px ${C.purple}` }} />
                    <span style={{ fontSize: 10, fontFamily: "monospace", color: C.purple, letterSpacing: 2, textShadow: `0 0 8px ${C.purple}66` }}>NoSQL</span>
                  </div>
                  {/* explain box */}
                  <div style={{ padding: "10px 14px", background: `${C.purple}07`, border: `1px solid ${C.purple}18`, borderRadius: 8 }}>
                    <p style={{ margin: 0, fontSize: 12.5, color: C.faint, lineHeight: 1.65 }}>{ch.nosqlExplain}</p>
                  </div>
                  <MiniCode code={ch.nosqlCode} sql={false} />
                </div>
              </div>

              {/* bottom spacer line */}
              {idx < CHAPTERS.length - 1 && (
                <div style={{ marginTop: 32, height: 1, background: C.dim }} />
              )}
            </div>
          );
        })}
      </div>

      {/* ── FOOTER ── */}
      <div style={{ borderTop: `1px solid ${C.border}`, padding: "24px", textAlign: "center", background: C.surface }}>
        <div style={{ position: "relative", display: "inline-block" }}>
          <div style={{ position: "absolute", inset: -1, borderRadius: 12, background: `linear-gradient(135deg, ${C.cyan}22, ${C.purple}22)`, filter: "blur(4px)" }} />
          <div style={{ position: "relative", padding: "14px 28px", borderRadius: 12, background: C.panel, border: `1px solid ${C.border}` }}>
            <span style={{ fontSize: 13, color: C.faint }}>
              SQL uses{" "}
              <span style={{ color: C.cyan, textShadow: `0 0 8px ${C.cyan}66`, fontWeight: 700 }}>declarative, set-based</span>
              {" "}syntax —  NoSQL uses{" "}
              <span style={{ color: C.purple, textShadow: `0 0 8px ${C.purple}66`, fontWeight: 700 }}>imperative, object-based</span>
              {" "}method calls
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
