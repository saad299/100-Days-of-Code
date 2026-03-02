const router = require('express').Router();
const {
  getAllBooks, getBookById, getAvailableBooks, createBook, updateBook, deleteBook
} = require('../controllers/books.controller');
const auth = require('../middleware/auth.middleware');
const validateBook = require('../middleware/validateBook.middleware');

// IMPORTANT: /available must come before /:id
// otherwise Express will treat "available" as an id param
router.get('/available', getAvailableBooks); // GET /books/available
router.get('/', getAllBooks);                 // GET /books
router.get('/:id', getBookById);             // GET /books/1

// write operations are protected
router.post('/', auth, validateBook, createBook);
router.put('/:id', auth, updateBook);
router.delete('/:id', auth, deleteBook);

module.exports = router;