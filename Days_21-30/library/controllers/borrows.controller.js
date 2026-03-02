const borrows = require('../data/borrows.data');
const members = require('../data/members.data');

// GET /borrow  ← auth protected — all borrow records
const getAllBorrows = (req, res) => {
  const books = require('../data/books.data');

  const enriched = borrows.map(b => ({
    ...b,
    member: members.find(m => m.id === b.memberId),
    book: books.find(book => book.id === b.bookId),
  }));

  res.json(enriched);
};

// GET /borrow/active  ← auth protected — only currently borrowed books
const getActiveBorrows = (req, res) => {
  const books = require('../data/books.data');

  const active = borrows
    .filter(b => b.returnedAt === null)
    .map(b => ({
      ...b,
      member: members.find(m => m.id === b.memberId),
      book: books.find(book => book.id === b.bookId),
    }));

  res.json(active);
};

// POST /borrow  ← auth + checkBookAvailable + member check all run before this
const borrowBook = (req, res) => {
  const { memberId, bookId } = req.body;

  // check member exists and is active
  const member = members.find(m => m.id === parseInt(memberId));
  if (!member) return res.status(404).json({ error: 'Member not found' });
  if (!member.isActive) return res.status(403).json({ error: 'Suspended members cannot borrow books' });

  // check member doesn't already have this book borrowed
  const alreadyBorrowed = borrows.find(
    b => b.memberId === parseInt(memberId) && b.bookId === parseInt(bookId) && b.returnedAt === null
  );
  if (alreadyBorrowed) return res.status(400).json({ error: 'Member already has this book borrowed' });

  // req.book is attached by checkBookAvailable middleware — reduce available copies
  req.book.availableCopies -= 1;

  // calculate due date (14 days from today)
  const borrowedAt = new Date().toISOString().split('T')[0];
  const dueDate = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  const newBorrow = {
    id: borrows.length + 1,
    memberId: parseInt(memberId),
    bookId: parseInt(bookId),
    borrowedAt,
    dueDate,
    returnedAt: null,
  };

  borrows.push(newBorrow);
  res.status(201).json({
    message: `"${req.book.title}" successfully borrowed`,
    borrow: newBorrow,
    dueDate,
  });
};

// POST /borrow/return  ← auth + checkActiveBorrow run before this
const returnBook = (req, res) => {
  const books = require('../data/books.data');

  // req.activeBorrow is attached by checkActiveBorrow middleware
  const borrow = req.activeBorrow;

  // mark as returned
  borrow.returnedAt = new Date().toISOString().split('T')[0];

  // increase available copies back
  const book = books.find(b => b.id === borrow.bookId);
  book.availableCopies += 1;

  res.json({
    message: `"${book.title}" successfully returned`,
    borrow,
    availableCopies: book.availableCopies,
  });
};

module.exports = { getAllBorrows, getActiveBorrows, borrowBook, returnBook };