// before returning a book, check if this member actually borrowed it
// and that the borrow record is still active (not already returned)
const borrows = require('../data/borrows.data');

const checkBorrow = (req, res, next) => {
  const memberId = parseInt(req.body.memberId);
  const bookId = parseInt(req.body.bookId);

  if (!memberId) {
    return res.status(400).json({ error: 'MemberId is required' });
  }
  if (!bookId) {
    return res.status(400).json({ error: 'BookId is required' });
  }

  // find an active borrow record for this member and book
  const activeBorrow = borrows.find(
    b => b.memberId === memberId && b.bookId === bookId && b.returnedAt === null
  );

  if (!activeBorrow) {
    return res.status(404).json({
      error: 'No active borrow record found for this member and book'
    });
  }

  // attach the borrow record to request so controller can update it
  req.activeBorrow = activeBorrow;

  next();
};

module.exports = checkBorrow;