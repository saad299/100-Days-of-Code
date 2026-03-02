const books = require("../data/books.data");

// GET /books  ← public
const getAllBooks = (req, res) => {
  // support filtering by genre: GET /books?genre=Classic
  const { genre } = req.query;

  if (genre) {
    const filtered = books.filter(
      (b) => b.genre.toLowerCase() === genre.toLowerCase(),
    );
    return res.json(filtered);
  }

  res.json(books);
};

// GET /books/:id  ← public
const getBookById = (req, res) => {
  const book = books.find((b) => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).json({ error: "Book not found" });
  res.json(book);
};

// GET /books/available  ← public — only show books with copies available
const getAvailableBooks = (req, res) => {
  const available = books.filter((b) => b.availableCopies > 0);
  res.json(available);
};

// POST /books  ← auth protected
const createBook = (req, res) => {
  const { title, author, genre, copies } = req.body;

  const newBook = {
    id: books.length + 1,
    title,
    author,
    genre,
    totalCopies: parseInt(copies),
    availableCopies: parseInt(copies), // all copies available when first added
  };

  books.push(newBook);
  res.status(201).json(newBook);
};

// PUT /books/:id  ← auth protected
const updateBook = (req, res) => {
  const book = books.find((b) => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).json({ error: "Book not found" });

  book.title = req.body.title || book.title;
  book.author = req.body.author || book.author;
  book.genre = req.body.genre || book.genre;

  res.json(book);
};

// DELETE /books/:id  ← auth protected
const deleteBook = (req, res) => {
  const index = books.findIndex((b) => b.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: "Book not found" });

  // prevent deleting a book that has active borrows
  const borrows = require("../data/borrows.data");
  const activeBorrow = borrows.find(
    (b) => b.bookId === parseInt(req.params.id) && b.returnedAt === null,
  );

  if (activeBorrow) {
    return res
      .status(400)
      .json({ error: "Cannot delete a book that is currently borrowed" });
  }

  books.splice(index, 1);
  res.json({ message: "Book deleted" });
};

module.exports = {
  getAllBooks,
  getBookById,
  getAvailableBooks,
  createBook,
  updateBook,
  deleteBook,
};
