import { useState, useEffect, useCallback } from "react";

const BASE_URL = "http://localhost:3000";

// FIX 1: Token is sent as plain value, not "Bearer token"
// because backend checks: token !== 'librariantoken' (no Bearer prefix)
const fetchAPI = async (path, options = {}, token = "") => {
  const headers = { "Content-Type": "application/json" };
  if (token) headers["authorization"] = token;
  const res = await fetch(`${BASE_URL}${path}`, { ...options, headers });
  const data = await res.json();
  return { ok: res.ok, status: res.status, data };
};

const StatusBadge = ({ ok, message }) => (
  <div className={`px-3 py-2 rounded text-xs font-mono mt-2 ${ok ? "bg-emerald-900/40 text-emerald-300 border border-emerald-700" : "bg-red-900/40 text-red-300 border border-red-700"}`}>
    {ok ? "✓" : "✗"} {message}
  </div>
);

const Modal = ({ title, onClose, children }) => (
  <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
    <div className="bg-[#1a1a14] border border-amber-900/40 rounded-xl w-full max-w-md shadow-2xl">
      <div className="flex justify-between items-center p-5 border-b border-amber-900/30">
        <h3 className="text-amber-200 font-serif text-lg">{title}</h3>
        <button onClick={onClose} className="text-stone-400 hover:text-amber-300 text-xl">✕</button>
      </div>
      <div className="p-5">{children}</div>
    </div>
  </div>
);

const Input = ({ label, ...props }) => (
  <div className="mb-3">
    {label && <label className="block text-stone-400 text-xs mb-1 uppercase tracking-wider">{label}</label>}
    <input {...props} className="w-full bg-[#0f0f0a] border border-amber-900/30 rounded px-3 py-2 text-amber-100 text-sm focus:outline-none focus:border-amber-600 placeholder-stone-600" />
  </div>
);

const Btn = ({ variant = "primary", className = "", ...props }) => {
  const base = "px-4 py-2 rounded text-sm font-medium transition-all duration-150 disabled:opacity-40 cursor-pointer";
  const styles = {
    primary: "bg-amber-700 hover:bg-amber-600 text-amber-50",
    ghost: "border border-amber-800/60 text-amber-400 hover:bg-amber-900/30",
    danger: "bg-red-900/60 hover:bg-red-800/70 text-red-300 border border-red-800/50",
    success: "bg-emerald-800/60 hover:bg-emerald-700/70 text-emerald-300 border border-emerald-800/50",
  };
  return <button {...props} className={`${base} ${styles[variant]} ${className}`} />;
};

// ─── BOOKS SECTION ──────────────────────────────────────────────────────────
// Books GET routes are PUBLIC — no token needed
// Books POST/PUT/DELETE are protected — token needed

function BooksSection({ token }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [genreFilter, setGenreFilter] = useState("");
  const [availableOnly, setAvailableOnly] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  // FIX 5: form uses 'copies' not 'year' — matches validateBook middleware
  const [form, setForm] = useState({ title: "", author: "", genre: "", copies: "" });

  const loadBooks = useCallback(async () => {
    setLoading(true);
    let path = availableOnly ? "/books/available" : "/books";
    if (!availableOnly && genreFilter) path += `?genre=${encodeURIComponent(genreFilter)}`;
    const { ok, data } = await fetchAPI(path);
    setBooks(ok ? (Array.isArray(data) ? data : []) : []);
    setStatus({ ok, message: ok ? `Loaded ${Array.isArray(data) ? data.length : 0} book(s)` : data.error || "Failed to load" });
    setLoading(false);
  }, [genreFilter, availableOnly]);

  useEffect(() => { loadBooks(); }, [loadBooks]);

  const fetchOne = async (id) => {
    const { ok, data } = await fetchAPI(`/books/${id}`);
    if (ok) setSelectedBook(data);
    setStatus({ ok, message: ok ? `Fetched: ${data.title}` : data.error || "Not found" });
  };

  const addBook = async () => {
    const { ok, data } = await fetchAPI("/books", { method: "POST", body: JSON.stringify(form) }, token);
    setStatus({ ok, message: ok ? `"${form.title}" added!` : data.error || "Failed — check token or required fields" });
    if (ok) { setShowAddModal(false); setForm({ title: "", author: "", genre: "", copies: "" }); loadBooks(); }
  };

  const updateBook = async () => {
    const { ok, data } = await fetchAPI(`/books/${selectedBook.id}`, { method: "PUT", body: JSON.stringify(form) }, token);
    setStatus({ ok, message: ok ? "Book updated!" : data.error || "Failed — check token" });
    if (ok) { setShowEditModal(false); setSelectedBook(null); loadBooks(); }
  };

  const deleteBook = async (id, title) => {
    if (!confirm(`Delete "${title}"?`)) return;
    const { ok, data } = await fetchAPI(`/books/${id}`, { method: "DELETE" }, token);
    setStatus({ ok, message: ok ? `"${title}" deleted` : data.error || "Failed — check token" });
    if (ok) loadBooks();
  };

  const openEdit = (book) => {
    setSelectedBook(book);
    setForm({ title: book.title, author: book.author, genre: book.genre, copies: book.totalCopies || "" });
    setShowEditModal(true);
  };

  return (
    <div>
      <div className="flex flex-wrap gap-3 mb-5 items-end">
        <div className="flex gap-2">
          <input value={genreFilter} onChange={e => setGenreFilter(e.target.value)} placeholder="Filter by genre…"
            className="bg-[#0f0f0a] border border-amber-900/30 rounded px-3 py-2 text-amber-100 text-sm focus:outline-none focus:border-amber-600 placeholder-stone-600 w-44" />
          <Btn variant="ghost" onClick={loadBooks}>Search</Btn>
        </div>
        <label className="flex items-center gap-2 text-sm text-stone-400 cursor-pointer">
          <input type="checkbox" checked={availableOnly} onChange={e => setAvailableOnly(e.target.checked)} className="accent-amber-600" />
          Available only
        </label>
        <Btn onClick={() => { setForm({ title: "", author: "", genre: "", copies: "" }); setShowAddModal(true); }}>+ Add Book</Btn>
      </div>

      <div className="font-mono text-xs text-stone-500 mb-3">
        → GET {availableOnly ? "/books/available" : `/books${genreFilter ? `?genre=${genreFilter}` : ""}`}
        <span className="text-emerald-700 ml-2">[public]</span>
      </div>

      {status && <StatusBadge ok={status.ok} message={status.message} />}

      <div className="mt-4 overflow-x-auto">
        {loading ? (
          <p className="text-stone-500 text-sm py-8 text-center">Loading…</p>
        ) : books.length === 0 ? (
          <p className="text-stone-500 text-sm py-8 text-center">No books found.</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-amber-900/30 text-stone-400 text-xs uppercase tracking-wider">
                <th className="text-left py-2 pr-4">ID</th>
                <th className="text-left py-2 pr-4">Title</th>
                <th className="text-left py-2 pr-4">Author</th>
                <th className="text-left py-2 pr-4">Genre</th>
                <th className="text-left py-2 pr-4">Copies</th>
                <th className="text-left py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map(book => (
                <tr key={book.id} className="border-b border-amber-900/10 hover:bg-amber-900/10 transition-colors">
                  <td className="py-2 pr-4 text-stone-500 font-mono text-xs">{book.id}</td>
                  <td className="py-2 pr-4 text-amber-100 font-medium">{book.title}</td>
                  <td className="py-2 pr-4 text-stone-300">{book.author}</td>
                  <td className="py-2 pr-4 text-stone-400">{book.genre}</td>
                  <td className="py-2 pr-4">
                    {/* FIX 4: backend uses availableCopies/totalCopies fields */}
                    <span className={`px-2 py-0.5 rounded-full text-xs ${book.availableCopies > 0 ? "bg-emerald-900/40 text-emerald-400" : "bg-red-900/40 text-red-400"}`}>
                      {book.availableCopies}/{book.totalCopies}
                    </span>
                  </td>
                  <td className="py-2">
                    <div className="flex gap-1">
                      <Btn variant="ghost" className="!px-2 !py-1 text-xs" onClick={() => fetchOne(book.id)}>View</Btn>
                      <Btn variant="ghost" className="!px-2 !py-1 text-xs" onClick={() => openEdit(book)}>Edit</Btn>
                      <Btn variant="danger" className="!px-2 !py-1 text-xs" onClick={() => deleteBook(book.id, book.title)}>Del</Btn>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {selectedBook && !showEditModal && (
        <div className="mt-4 p-4 bg-amber-900/10 border border-amber-800/30 rounded-lg">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-stone-500 text-xs font-mono mb-1">→ GET /books/{selectedBook.id}</p>
              <h4 className="text-amber-200 font-serif text-lg">{selectedBook.title}</h4>
              <p className="text-stone-300 text-sm">{selectedBook.author} · {selectedBook.genre}</p>
              <p className="text-stone-500 text-xs mt-1">{selectedBook.availableCopies} of {selectedBook.totalCopies} copies available</p>
            </div>
            <button onClick={() => setSelectedBook(null)} className="text-stone-500 hover:text-amber-300">✕</button>
          </div>
        </div>
      )}

      {showAddModal && (
        <Modal title="Add New Book" onClose={() => setShowAddModal(false)}>
          <p className="text-stone-500 font-mono text-xs mb-1">→ POST /books</p>
          <p className="text-amber-700/70 text-xs font-mono mb-4">[requires token — all fields required]</p>
          <Input label="Title *" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Book title" />
          <Input label="Author *" value={form.author} onChange={e => setForm({ ...form, author: e.target.value })} placeholder="Author name" />
          <Input label="Genre *" value={form.genre} onChange={e => setForm({ ...form, genre: e.target.value })} placeholder="Classic, Technology, Dystopian…" />
          <Input label="Copies *" type="number" value={form.copies} onChange={e => setForm({ ...form, copies: e.target.value })} placeholder="Number of copies (min 1)" />
          <div className="flex gap-2 mt-4">
            <Btn onClick={addBook}>Add Book</Btn>
            <Btn variant="ghost" onClick={() => setShowAddModal(false)}>Cancel</Btn>
          </div>
        </Modal>
      )}

      {showEditModal && selectedBook && (
        <Modal title={`Edit: ${selectedBook.title}`} onClose={() => setShowEditModal(false)}>
          <p className="text-stone-500 font-mono text-xs mb-4">→ PUT /books/{selectedBook.id} <span className="text-amber-700">[requires token]</span></p>
          <Input label="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
          <Input label="Author" value={form.author} onChange={e => setForm({ ...form, author: e.target.value })} />
          <Input label="Genre" value={form.genre} onChange={e => setForm({ ...form, genre: e.target.value })} />
          <div className="flex gap-2 mt-4">
            <Btn onClick={updateBook}>Save Changes</Btn>
            <Btn variant="ghost" onClick={() => setShowEditModal(false)}>Cancel</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ─── MEMBERS SECTION ────────────────────────────────────────────────────────
// FIX 2: ALL member routes have router.use(auth) — token needed even for GET

function MembersSection({ token }) {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [memberBorrows, setMemberBorrows] = useState(null);
  const [form, setForm] = useState({ name: "", email: "" });

  const loadMembers = useCallback(async () => {
    if (!token) {
      setStatus({ ok: false, message: "Token required — all /members routes are protected" });
      return;
    }
    setLoading(true);
    const { ok, data } = await fetchAPI("/members", {}, token);
    setMembers(ok ? (Array.isArray(data) ? data : []) : []);
    setStatus({ ok, message: ok ? `Loaded ${Array.isArray(data) ? data.length : 0} member(s)` : data.error || "Failed — check token" });
    setLoading(false);
  }, [token]);

  useEffect(() => { loadMembers(); }, [loadMembers]);

  const addMember = async () => {
    const { ok, data } = await fetchAPI("/members", { method: "POST", body: JSON.stringify(form) }, token);
    setStatus({ ok, message: ok ? `"${form.name}" registered!` : data.error || "Failed — check token" });
    if (ok) { setShowAddModal(false); setForm({ name: "", email: "" }); loadMembers(); }
  };

  const suspendMember = async (id, name) => {
    if (!confirm(`Suspend "${name}"? They must have no active borrows.`)) return;
    const { ok, data } = await fetchAPI(`/members/${id}/suspend`, { method: "PUT" }, token);
    setStatus({ ok, message: ok ? data.message : data.error || "Failed" });
    if (ok) loadMembers();
  };

  const viewBorrows = async (id, name) => {
    const { ok, data } = await fetchAPI(`/members/${id}/borrows`, {}, token);
    if (ok) setMemberBorrows({ name, ...data });
    setStatus({ ok, message: ok ? `Loaded borrow history for ${name}` : data.error || "Failed" });
  };

  return (
    <div>
      <div className="flex gap-3 mb-5">
        <Btn onClick={loadMembers} variant="ghost">↻ Refresh</Btn>
        <Btn onClick={() => { setForm({ name: "", email: "" }); setShowAddModal(true); }}>+ Register Member</Btn>
      </div>

      <div className="font-mono text-xs text-stone-500 mb-3">
        → GET /members <span className="text-amber-700">[requires token]</span>
      </div>

      {!token && (
        <div className="bg-amber-900/20 border border-amber-800/40 rounded px-4 py-3 text-amber-600 text-sm mb-4">
          ⚠ Set your auth token above. All <code className="font-mono">/members</code> routes use <code className="font-mono">router.use(auth)</code> — fully protected.
        </div>
      )}

      {status && <StatusBadge ok={status.ok} message={status.message} />}

      <div className="mt-4">
        {loading ? (
          <p className="text-stone-500 text-sm py-8 text-center">Loading…</p>
        ) : members.length === 0 ? (
          <p className="text-stone-500 text-sm py-8 text-center">{token ? "No members found." : "Enter token to load members."}</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-amber-900/30 text-stone-400 text-xs uppercase tracking-wider">
                <th className="text-left py-2 pr-4">ID</th>
                <th className="text-left py-2 pr-4">Name</th>
                <th className="text-left py-2 pr-4">Email</th>
                <th className="text-left py-2 pr-4">Status</th>
                <th className="text-left py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {members.map(m => (
                <tr key={m.id} className="border-b border-amber-900/10 hover:bg-amber-900/10 transition-colors">
                  <td className="py-2 pr-4 text-stone-500 font-mono text-xs">{m.id}</td>
                  <td className="py-2 pr-4 text-amber-100 font-medium">{m.name}</td>
                  <td className="py-2 pr-4 text-stone-300">{m.email}</td>
                  <td className="py-2 pr-4">
                    <span className={`px-2 py-0.5 rounded-full text-xs ${m.isActive ? "bg-emerald-900/40 text-emerald-400" : "bg-stone-800 text-stone-500"}`}>
                      {m.isActive ? "Active" : "Suspended"}
                    </span>
                  </td>
                  <td className="py-2">
                    <div className="flex gap-1">
                      <Btn variant="ghost" className="!px-2 !py-1 text-xs" onClick={() => viewBorrows(m.id, m.name)}>History</Btn>
                      {m.isActive && (
                        <Btn variant="danger" className="!px-2 !py-1 text-xs" onClick={() => suspendMember(m.id, m.name)}>Suspend</Btn>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {memberBorrows && (
        <div className="mt-4 p-4 bg-amber-900/10 border border-amber-800/30 rounded-lg">
          <div className="flex justify-between items-center mb-3">
            <p className="text-stone-400 text-xs font-mono">→ GET /members/{memberBorrows.member?.id}/borrows — {memberBorrows.name}'s history</p>
            <button onClick={() => setMemberBorrows(null)} className="text-stone-500 hover:text-amber-300">✕</button>
          </div>
          {memberBorrows.borrows?.length === 0 ? (
            <p className="text-stone-500 text-sm">No borrow history.</p>
          ) : (
            memberBorrows.borrows?.map(b => (
              <div key={b.id} className="text-xs py-1.5 border-b border-amber-900/10 flex justify-between">
                <span className="text-amber-100">{b.book?.title}</span>
                <span className={b.returnedAt ? "text-stone-500" : "text-amber-500"}>
                  {b.returnedAt ? `Returned ${b.returnedAt}` : `Due ${b.dueDate}`}
                </span>
              </div>
            ))
          )}
        </div>
      )}

      {showAddModal && (
        <Modal title="Register New Member" onClose={() => setShowAddModal(false)}>
          <p className="text-stone-500 font-mono text-xs mb-4">→ POST /members <span className="text-amber-700">[requires token]</span></p>
          <Input label="Name *" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Full name" />
          <Input label="Email *" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="email@example.com" />
          <div className="flex gap-2 mt-4">
            <Btn onClick={addMember}>Register</Btn>
            <Btn variant="ghost" onClick={() => setShowAddModal(false)}>Cancel</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ─── BORROWS SECTION ────────────────────────────────────────────────────────
// FIX 2: ALL borrow routes use router.use(auth) — token needed even for GET
// FIX 3: Return is POST /borrows/return with {memberId, bookId} in body

function BorrowsSection({ token }) {
  const [borrows, setBorrows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [activeOnly, setActiveOnly] = useState(false);
  const [showBorrowModal, setShowBorrowModal] = useState(false);
  const [showReturnModal, setShowReturnModal] = useState(false);
  const [borrowForm, setBorrowForm] = useState({ memberId: "", bookId: "" });
  const [returnForm, setReturnForm] = useState({ memberId: "", bookId: "" });

  const loadBorrows = useCallback(async () => {
    if (!token) {
      setStatus({ ok: false, message: "Token required — all /borrows routes are protected" });
      return;
    }
    setLoading(true);
    const path = activeOnly ? "/borrows/active" : "/borrows";
    const { ok, data } = await fetchAPI(path, {}, token);
    setBorrows(ok ? (Array.isArray(data) ? data : []) : []);
    setStatus({ ok, message: ok ? `Loaded ${Array.isArray(data) ? data.length : 0} record(s)` : data.error || "Failed — check token" });
    setLoading(false);
  }, [token, activeOnly]);

  useEffect(() => { loadBorrows(); }, [loadBorrows]);

  const borrowBook = async () => {
    const { ok, data } = await fetchAPI("/borrows", {
      method: "POST",
      body: JSON.stringify({ memberId: parseInt(borrowForm.memberId), bookId: parseInt(borrowForm.bookId) })
    }, token);
    setStatus({ ok, message: ok ? data.message || "Borrowed!" : data.error || "Failed" });
    if (ok) { setShowBorrowModal(false); setBorrowForm({ memberId: "", bookId: "" }); loadBorrows(); }
  };

  // FIX 3: POST /borrows/return with memberId + bookId in body
  // (not PUT /borrows/return/:id as was assumed before)
  const returnBook = async () => {
    const { ok, data } = await fetchAPI("/borrows/return", {
      method: "POST",
      body: JSON.stringify({ memberId: parseInt(returnForm.memberId), bookId: parseInt(returnForm.bookId) })
    }, token);
    setStatus({ ok, message: ok ? data.message || "Returned!" : data.error || "Failed" });
    if (ok) { setShowReturnModal(false); setReturnForm({ memberId: "", bookId: "" }); loadBorrows(); }
  };

  return (
    <div>
      <div className="flex flex-wrap gap-3 mb-5 items-center">
        <Btn onClick={loadBorrows} variant="ghost">↻ Refresh</Btn>
        <label className="flex items-center gap-2 text-sm text-stone-400 cursor-pointer">
          <input type="checkbox" checked={activeOnly} onChange={e => setActiveOnly(e.target.checked)} className="accent-amber-600" />
          Active only
        </label>
        <Btn onClick={() => { setBorrowForm({ memberId: "", bookId: "" }); setShowBorrowModal(true); }}>+ Borrow a Book</Btn>
        <Btn variant="success" onClick={() => { setReturnForm({ memberId: "", bookId: "" }); setShowReturnModal(true); }}>↩ Return a Book</Btn>
      </div>

      <div className="font-mono text-xs text-stone-500 mb-3">
        → GET {activeOnly ? "/borrows/active" : "/borrows"} <span className="text-amber-700">[requires token]</span>
      </div>

      {!token && (
        <div className="bg-amber-900/20 border border-amber-800/40 rounded px-4 py-3 text-amber-600 text-sm mb-4">
          ⚠ Set your auth token above. All <code className="font-mono">/borrows</code> routes use <code className="font-mono">router.use(auth)</code> — fully protected.
        </div>
      )}

      {status && <StatusBadge ok={status.ok} message={status.message} />}

      <div className="mt-4">
        {loading ? (
          <p className="text-stone-500 text-sm py-8 text-center">Loading…</p>
        ) : borrows.length === 0 ? (
          <p className="text-stone-500 text-sm py-8 text-center">{token ? "No records found." : "Enter token to load borrows."}</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-amber-900/30 text-stone-400 text-xs uppercase tracking-wider">
                <th className="text-left py-2 pr-3">ID</th>
                <th className="text-left py-2 pr-3">Member</th>
                <th className="text-left py-2 pr-3">Book</th>
                <th className="text-left py-2 pr-3">Borrowed</th>
                <th className="text-left py-2 pr-3">Due</th>
                <th className="text-left py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {borrows.map(b => (
                <tr key={b.id} className="border-b border-amber-900/10 hover:bg-amber-900/10 transition-colors">
                  <td className="py-2 pr-3 text-stone-500 font-mono text-xs">{b.id}</td>
                  <td className="py-2 pr-3 text-xs"><span className="text-amber-100">{b.member?.name || `#${b.memberId}`}</span></td>
                  <td className="py-2 pr-3 text-xs"><span className="text-amber-100">{b.book?.title || `#${b.bookId}`}</span></td>
                  <td className="py-2 pr-3 text-stone-400 text-xs font-mono">{b.borrowedAt}</td>
                  <td className="py-2 pr-3 text-stone-400 text-xs font-mono">{b.dueDate}</td>
                  <td className="py-2">
                    <span className={`px-2 py-0.5 rounded-full text-xs ${b.returnedAt ? "bg-stone-800 text-stone-400" : "bg-amber-900/40 text-amber-400"}`}>
                      {b.returnedAt ? `Returned ${b.returnedAt}` : "Active"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {showBorrowModal && (
        <Modal title="Borrow a Book" onClose={() => setShowBorrowModal(false)}>
          <p className="text-stone-500 font-mono text-xs mb-1">→ POST /borrows</p>
          <p className="text-amber-700/70 text-xs font-mono mb-4">[token + book available + member active required]</p>
          <Input label="Member ID" type="number" value={borrowForm.memberId} onChange={e => setBorrowForm({ ...borrowForm, memberId: e.target.value })} placeholder="e.g. 1" />
          <Input label="Book ID" type="number" value={borrowForm.bookId} onChange={e => setBorrowForm({ ...borrowForm, bookId: e.target.value })} placeholder="e.g. 3" />
          <p className="text-stone-600 text-xs mt-2">Tip: Book 2 has 0 copies — good for testing the error response.</p>
          <div className="flex gap-2 mt-4">
            <Btn onClick={borrowBook}>Confirm Borrow</Btn>
            <Btn variant="ghost" onClick={() => setShowBorrowModal(false)}>Cancel</Btn>
          </div>
        </Modal>
      )}

      {showReturnModal && (
        <Modal title="Return a Book" onClose={() => setShowReturnModal(false)}>
          <p className="text-stone-500 font-mono text-xs mb-1">→ POST /borrows/return</p>
          <p className="text-amber-700/70 text-xs font-mono mb-4">[token + active borrow must exist for member+book]</p>
          <Input label="Member ID" type="number" value={returnForm.memberId} onChange={e => setReturnForm({ ...returnForm, memberId: e.target.value })} placeholder="e.g. 1" />
          <Input label="Book ID" type="number" value={returnForm.bookId} onChange={e => setReturnForm({ ...returnForm, bookId: e.target.value })} placeholder="e.g. 2" />
          <p className="text-stone-600 text-xs mt-2">Tip: Member 1 has book 2 active — try returning that.</p>
          <div className="flex gap-2 mt-4">
            <Btn variant="success" onClick={returnBook}>Confirm Return</Btn>
            <Btn variant="ghost" onClick={() => setShowReturnModal(false)}>Cancel</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ─── APP ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [tab, setTab] = useState("books");
  const [token, setToken] = useState("");
  const [tokenInput, setTokenInput] = useState("");

  const tabs = [
    { id: "books", label: "📚 Books" },
    { id: "members", label: "👤 Members" },
    { id: "borrows", label: "🔄 Borrows" },
  ];

  return (
    <div className="min-h-screen bg-[#0d0d08] text-amber-50" style={{ fontFamily: "'Georgia', serif" }}>
      <header className="border-b border-amber-900/30 bg-[#0f0f0a]">
        <div className="max-w-5xl mx-auto px-6 py-5 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-serif text-amber-200 tracking-wide">📖 Library System</h1>
            <p className="text-stone-500 text-xs mt-0.5">Connected to <span className="font-mono text-amber-700">{BASE_URL}</span></p>
          </div>
          <div className="text-right">
            {/* FIX 1: hint shows 'librariantoken' — backend compares plain string, no Bearer prefix */}
            <p className="text-stone-500 text-xs mb-1">
              Auth Token <span className="text-stone-600">(hint: <code className="font-mono text-amber-900">librariantoken</code>)</span>
            </p>
            <div className="flex gap-2">
              <input type="text" value={tokenInput} onChange={e => setTokenInput(e.target.value)} placeholder="Enter token…"
                className="bg-[#0a0a06] border border-amber-900/40 rounded px-3 py-1.5 text-amber-100 text-xs font-mono focus:outline-none focus:border-amber-600 placeholder-stone-700 w-44" />
              <Btn onClick={() => setToken(tokenInput)} variant={token ? "success" : "ghost"} className="!py-1.5 text-xs">
                {token ? "✓ Active" : "Set"}
              </Btn>
              {token && <Btn onClick={() => { setToken(""); setTokenInput(""); }} variant="danger" className="!py-1.5 text-xs">Clear</Btn>}
            </div>
          </div>
        </div>
      </header>

      {!token && (
        <div className="max-w-5xl mx-auto px-6 pt-4">
          <div className="bg-amber-900/10 border border-amber-800/30 rounded px-4 py-2 text-xs text-amber-700">
            ⚠ No token — Books (GET) are public. Members &amp; Borrows are fully protected. Enter <code className="font-mono">librariantoken</code> above.
          </div>
        </div>
      )}

      <div className="max-w-5xl mx-auto px-6 mt-6">
        <div className="flex gap-1 border-b border-amber-900/30 mb-6">
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`px-5 py-2.5 text-sm transition-colors cursor-pointer ${tab === t.id ? "text-amber-300 border-b-2 border-amber-500 -mb-px" : "text-stone-500 hover:text-stone-300"}`}>
              {t.label}
            </button>
          ))}
        </div>
        <div className="pb-12">
          {tab === "books" && <BooksSection token={token} />}
          {tab === "members" && <MembersSection token={token} />}
          {tab === "borrows" && <BorrowsSection token={token} />}
        </div>
      </div>
    </div>
  );
}