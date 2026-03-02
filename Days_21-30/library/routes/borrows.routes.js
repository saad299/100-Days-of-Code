const router = require('express').Router();
const { getAllBorrows, getActiveBorrows, borrowBook, returnBook } = require('../controllers/borrows.controller');
const auth = require('../middleware/auth.middleware');
const checkBookAvailable = require('../middleware/checkBook.middleware');
const checkActiveBorrow = require('../middleware/checkBorrow.middleware');

// router-level auth — ALL borrow routes are protected
router.use(auth);

router.get('/', getAllBorrows);
router.get('/active', getActiveBorrows);

// borrow a book — check availability before allowing
router.post('/', checkBookAvailable, borrowBook);

// return a book — check active borrow record before allowing
router.post('/return', checkActiveBorrow, returnBook);

module.exports = router;