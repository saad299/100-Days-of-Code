const members = require("../data/members.data");
const borrows = require("../data/borrows.data");
const books = require("../data/books.data");

// GET /members  ← auth protected
const getAllMembers = (req, res) => {
  res.json(members);
};

// GET /members/:id  ← auth protected
const getMemberById = (req, res) => {
  const member = members.find((m) => m.id === parseInt(req.params.id));
  if (!member) return res.status(404).json({ error: "Member not found" });
  res.json(member);
};

// GET /members/:id/borrows  ← auth protected — see all borrow history for a member
const getMemberBorrows = (req, res) => {
  const member = members.find((m) => m.id === parseInt(req.params.id));
  if (!member) return res.status(404).json({ error: "Member not found" });

  const memberBorrows = borrows
    .filter((b) => b.memberId === member.id)
    .map((b) => ({
      ...b,
      book: books.find((book) => book.id === b.bookId),
    }));

  res.json({ member, borrows: memberBorrows });
};

// POST /members  ← auth protected
const createMember = (req, res) => {
  const { name, email } = req.body;

  const emailExists = members.find((m) => m.email === email);
  if (emailExists)
    return res.status(400).json({ error: "Email already registered" });

  const newMember = {
    id: members.length + 1,
    name,
    email,
    isActive: true,
  };

  members.push(newMember);
  res.status(201).json(newMember);
};

// PUT /members/:id/suspend  ← auth protected — suspend a member
const suspendMember = (req, res) => {
  const member = members.find((m) => m.id === parseInt(req.params.id));
  if (!member) return res.status(404).json({ error: "Member not found" });

  // check if member has active borrows before suspending
  const activeBorrows = borrows.filter(
    (b) => b.memberId === member.id && b.returnedAt === null,
  );
  if (activeBorrows.length > 0) {
    return res.status(400).json({
      error: `Cannot suspend member. They have ${activeBorrows.length} active borrow(s).`,
    });
  }

  member.isActive = false;
  res.json({ message: `Member "${member.name}" has been suspended`, member });
};

module.exports = {
  getAllMembers,
  getMemberById,
  getMemberBorrows,
  createMember,
  suspendMember,
};
