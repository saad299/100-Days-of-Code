// checks if todo title exists before creating — applied at route level
const validate = (req, res, next) => {
  const { title } = req.body;

  if (!title || title.trim() === '') {
    return res.status(400).json({ error: 'Title is required' });
  }

  next();
};

module.exports = validate;