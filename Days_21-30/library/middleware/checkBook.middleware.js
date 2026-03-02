// before borrowing a book, check if it exists AND has available copies
const books = require("../data/books.data");

const checkBook = (req, res, next) => {
  const bookId = parseInt(req.body.bookId);

  if (!bookId) {
    return res.status(400).json({ error: "BookId is required" });
  }

  const book = books.find((b) => b.id === bookId);

  if (!book) {
    return res.status(404).json({ error: `Book with id ${bookId} not found` });
  }

  if (book.availableCopies <= 0) {
    return res.status(400).json({
      error: `"${book.title}" has no available copies right now. Total copies: ${book.totalCopies}`,
    });
  }

  // attach book to request so controller doesn't need to find it again
  req.book = book;

  next();
};

module.exports = checkBook;
