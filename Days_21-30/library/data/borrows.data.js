const borrows = [
  {
    id: 1,
    memberId: 1,
    bookId: 2,
    borrowedAt: '2024-01-10',
    dueDate: '2024-01-24',
    returnedAt: null // null means currently borrowed
  },
  {
    id: 2,
    memberId: 2,
    bookId: 2,
    borrowedAt: '2024-01-12',
    dueDate: '2024-01-26',
    returnedAt: null
  },
  {
    id: 3,
    memberId: 1,
    bookId: 3,
    borrowedAt: '2024-01-05',
    dueDate: '2024-01-19',
    returnedAt: '2024-01-18' // already returned
  },
];

module.exports = borrows;