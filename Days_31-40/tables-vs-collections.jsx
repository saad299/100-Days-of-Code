import { useState } from "react";

const tableData = {
  rows: [
    { id: 1, name: "Ali", age: 25, email: "ali@gmail.com" },
    { id: 2, name: "Sara", age: 30, email: "sara@gmail.com" },
    { id: 3, name: "John", age: 22, email: "john@gmail.com" },
  ]
};

const collectionData = [
  { _id: "001", name: "Ali", age: 25, email: "ali@gmail.com", hobbies: ["coding", "gaming"] },
  { _id: "002", name: "Sara", age: 30, email: "sara@gmail.com", location: "Karachi", premium: true },
  { _id: "003", name: "John", age: 22, social: { twitter: "@john", github: "john-dev" } },
];

const differences = [
  { aspect: "Called", table: "Table", collection: "Collection" },
  { aspect: "Row/Record", table: "Row", collection: "Document" },
  { aspect: "Column/Field", table: "Column", collection: "Field" },
  { aspect: "Structure", table: "Every row has same columns", collection: "Each document can differ" },
  { aspect: "Empty fields", table: "Must store NULL", collection: "Just omit the field" },
  { aspect: "Nested data", table: "Not possible", collection: "Fully supported" },
  { aspect: "Arrays inside", table: "Not possible", collection: "Fully supported" },
  { aspect: "Used in", table: "MySQL, PostgreSQL, SQLite", collection: "MongoDB, Firebase" },
];

export default function App() {
  const [tab, setTab] = useState("visual");

  return (
    <div style={{ fontFamily: "'Georgia', serif", background: "#0f0f0f", minHeight: "100vh", color: "#f0f0f0", padding: "32px 20px" }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ display: "flex", justifyContent: "center", gap: 16, alignItems: "center", marginBottom: 12 }}>
            <span style={{ background: "#1a6cf6", padding: "6px 18px", borderRadius: 4, fontSize: 13, fontFamily: "monospace", letterSpacing: 2 }}>TABLE</span>
            <span style={{ color: "#555", fontSize: 20 }}>vs</span>
            <span style={{ background: "#9333ea", padding: "6px 18px", borderRadius: 4, fontSize: 13, fontFamily: "monospace", letterSpacing: 2 }}>COLLECTION</span>
          </div>
          <h1 style={{ fontSize: 30, fontWeight: "bold", margin: 0, letterSpacing: -1 }}>SQL Tables vs NoSQL Collections</h1>
          <p style={{ color: "#666", marginTop: 8, fontSize: 14 }}>Same users data — two completely different ways to store it</p>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 8, marginBottom: 28, borderBottom: "1px solid #222" }}>
          {["visual", "difference", "terminology"].map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              background: "none", border: "none", color: tab === t ? "#fff" : "#555",
              padding: "10px 20px", cursor: "pointer", fontSize: 14, fontFamily: "inherit",
              borderBottom: tab === t ? "2px solid #1a6cf6" : "2px solid transparent",
              textTransform: "capitalize", letterSpacing: 0.5
            }}>{t}</button>
          ))}
        </div>

        {/* Visual Tab */}
        {tab === "visual" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            {/* SQL Table */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                <span style={{ background: "#1a6cf6", padding: "3px 12px", borderRadius: 4, fontSize: 12, fontFamily: "monospace" }}>SQL</span>
                <span style={{ fontWeight: "bold", fontSize: 16 }}>users <span style={{ color: "#555", fontWeight: "normal", fontSize: 13 }}>table</span></span>
              </div>
              <div style={{ border: "1px solid #1a3a70", borderRadius: 8, overflow: "hidden" }}>
                {/* Table Header */}
                <div style={{ display: "grid", gridTemplateColumns: "0.4fr 1fr 0.6fr 1.4fr", background: "#0d1f3c" }}>
                  {["id", "name", "age", "email"].map(h => (
                    <div key={h} style={{ padding: "10px 12px", fontSize: 11, color: "#1a6cf6", fontFamily: "monospace", letterSpacing: 1, textTransform: "uppercase", borderRight: "1px solid #1a3a70" }}>{h}</div>
                  ))}
                </div>
                {/* Rows */}
                {tableData.rows.map((row, i) => (
                  <div key={i} style={{ display: "grid", gridTemplateColumns: "0.4fr 1fr 0.6fr 1.4fr", borderTop: "1px solid #1e2a40", background: i % 2 === 0 ? "#0a1628" : "#0c1a30" }}>
                    <div style={{ padding: "10px 12px", fontSize: 13, color: "#7eb3ff", borderRight: "1px solid #1a3a70" }}>{row.id}</div>
                    <div style={{ padding: "10px 12px", fontSize: 13, color: "#e0e0e0", borderRight: "1px solid #1a3a70" }}>{row.name}</div>
                    <div style={{ padding: "10px 12px", fontSize: 13, color: "#e0e0e0", borderRight: "1px solid #1a3a70" }}>{row.age}</div>
                    <div style={{ padding: "10px 12px", fontSize: 13, color: "#e0e0e0" }}>{row.email}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 12, padding: "12px 14px", background: "#0d1f3c", borderRadius: 6, border: "1px solid #1a3a70" }}>
                <p style={{ margin: 0, fontSize: 12, color: "#7eb3ff", lineHeight: 1.7 }}>
                  ✓ Every row has <strong>exact same columns</strong><br />
                  ✓ Missing data stored as <strong>NULL</strong><br />
                  ✗ Can't store arrays or nested objects
                </p>
              </div>
            </div>

            {/* NoSQL Collection */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                <span style={{ background: "#9333ea", padding: "3px 12px", borderRadius: 4, fontSize: 12, fontFamily: "monospace" }}>NoSQL</span>
                <span style={{ fontWeight: "bold", fontSize: 16 }}>users <span style={{ color: "#555", fontWeight: "normal", fontSize: 13 }}>collection</span></span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {collectionData.map((doc, i) => (
                  <div key={i} style={{ background: "#160d2a", border: "1px solid #4a1d8a", borderRadius: 8, padding: "14px 16px", fontFamily: "monospace", fontSize: 12 }}>
                    <div style={{ color: "#666", marginBottom: 6, fontSize: 11 }}>— document {i + 1} —</div>
                    <div><span style={{ color: "#c084fc" }}>"_id"</span><span style={{ color: "#555" }}>: </span><span style={{ color: "#fbbf24" }}>"{doc._id}"</span>,</div>
                    <div><span style={{ color: "#c084fc" }}>"name"</span><span style={{ color: "#555" }}>: </span><span style={{ color: "#86efac" }}>"{doc.name}"</span>,</div>
                    <div><span style={{ color: "#c084fc" }}>"age"</span><span style={{ color: "#555" }}>: </span><span style={{ color: "#7eb3ff" }}>{doc.age}</span>,</div>
                    {doc.email && <div><span style={{ color: "#c084fc" }}>"email"</span><span style={{ color: "#555" }}>: </span><span style={{ color: "#86efac" }}>"{doc.email}"</span>,</div>}
                    {doc.hobbies && <div><span style={{ color: "#c084fc" }}>"hobbies"</span><span style={{ color: "#555" }}>: </span><span style={{ color: "#fb923c" }}>["coding", "gaming"]</span></div>}
                    {doc.location && <div><span style={{ color: "#c084fc" }}>"location"</span><span style={{ color: "#555" }}>: </span><span style={{ color: "#86efac" }}>"{doc.location}"</span>,</div>}
                    {doc.premium && <div><span style={{ color: "#c084fc" }}>"premium"</span><span style={{ color: "#555" }}>: </span><span style={{ color: "#7eb3ff" }}>true</span></div>}
                    {doc.social && <div><span style={{ color: "#c084fc" }}>"social"</span><span style={{ color: "#555" }}>: </span><span style={{ color: "#fb923c" }}>{`{ twitter, github }`}</span></div>}
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 12, padding: "12px 14px", background: "#160d2a", borderRadius: 6, border: "1px solid #4a1d8a" }}>
                <p style={{ margin: 0, fontSize: 12, color: "#c084fc", lineHeight: 1.7 }}>
                  ✓ Each document can have <strong>different fields</strong><br />
                  ✓ No field? Just <strong>don't include it</strong><br />
                  ✓ Can store arrays & nested objects
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Difference Tab */}
        {tab === "difference" && (
          <div style={{ border: "1px solid #222", borderRadius: 8, overflow: "hidden" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr" }}>
              <div style={{ background: "#1a1a1a", padding: "12px 16px", fontSize: 11, color: "#555", fontFamily: "monospace", letterSpacing: 1, textTransform: "uppercase" }}>Aspect</div>
              <div style={{ background: "#0d1f3c", padding: "12px 16px", fontSize: 11, color: "#1a6cf6", fontFamily: "monospace", letterSpacing: 1, textTransform: "uppercase", textAlign: "center" }}>TABLE (SQL)</div>
              <div style={{ background: "#160d2a", padding: "12px 16px", fontSize: 11, color: "#9333ea", fontFamily: "monospace", letterSpacing: 1, textTransform: "uppercase", textAlign: "center" }}>COLLECTION (NoSQL)</div>
            </div>
            {differences.map((row, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", borderTop: "1px solid #1e1e1e" }}>
                <div style={{ background: i % 2 === 0 ? "#141414" : "#111", padding: "14px 16px", fontSize: 13, color: "#888" }}>{row.aspect}</div>
                <div style={{ background: i % 2 === 0 ? "#0f1a2e" : "#0c1726", padding: "14px 16px", fontSize: 13, color: "#7eb3ff", textAlign: "center" }}>{row.table}</div>
                <div style={{ background: i % 2 === 0 ? "#130d20" : "#100b1c", padding: "14px 16px", fontSize: 13, color: "#c084fc", textAlign: "center" }}>{row.collection}</div>
              </div>
            ))}
          </div>
        )}

        {/* Terminology Tab */}
        {tab === "terminology" && (
          <div>
            <p style={{ color: "#666", fontSize: 14, marginTop: 0, marginBottom: 24 }}>SQL and NoSQL use different words for the same concepts:</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { sql: "Table", nosql: "Collection", desc: "Where all similar data is grouped" },
                { sql: "Row", nosql: "Document", desc: "A single record / entry" },
                { sql: "Column", nosql: "Field", desc: "A single property of a record" },
                { sql: "Primary Key", nosql: "_id", desc: "Unique identifier for each record" },
                { sql: "JOIN", nosql: "$lookup", desc: "Combining data from two sources" },
                { sql: "Index", nosql: "Index", desc: "Speed up searching (same concept!)" },
              ].map((item, i) => (
                <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr 2fr", alignItems: "center", gap: 16, background: "#141414", border: "1px solid #222", borderRadius: 8, padding: "16px 20px" }}>
                  <div style={{ background: "#0d1f3c", padding: "8px 14px", borderRadius: 6, textAlign: "center", color: "#7eb3ff", fontFamily: "monospace", fontSize: 14, fontWeight: "bold" }}>{item.sql}</div>
                  <div style={{ color: "#444", fontSize: 18 }}>→</div>
                  <div style={{ background: "#160d2a", padding: "8px 14px", borderRadius: 6, textAlign: "center", color: "#c084fc", fontFamily: "monospace", fontSize: 14, fontWeight: "bold" }}>{item.nosql}</div>
                  <div style={{ color: "#666", fontSize: 13 }}>{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
