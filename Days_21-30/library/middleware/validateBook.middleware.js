const validateBook = (req, res, next) => {
  const { title, author, genre, copies } = req.body;

  if (!title || title.trim() === '') {
    return res.status(400).json({ error: 'Book title is required' });
  }
  if (!author || author.trim() === '') {
    return res.status(400).json({ error: 'Author is required' });
  }
  if (!genre || genre.trim() === '') {
    return res.status(400).json({ error: 'Genre is required' });
  }
  if (copies === undefined || isNaN(copies) || copies < 1) {
    return res.status(400).json({ error: 'At least 1 copy is required' });
  }

  next();
};

module.exports = validateBook;