// simulates a librarian login
const VALID_TOKEN = 'librariantoken';

const auth = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  if (token !== VALID_TOKEN) {
    return res.status(403).json({ error: 'Invalid token.' });
  }

  // attach librarian info to request
  req.librarian = { id: 1, name: 'Head Librarian' };

  next();
};

module.exports = auth;