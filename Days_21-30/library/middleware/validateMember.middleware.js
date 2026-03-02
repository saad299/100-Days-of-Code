const validateMember = (req, res, next) => {
  const { name, email } = req.body;

  if (!name || name.trim() === '') {
    return res.status(400).json({ error: 'Name is required' });
  }

  if (!email || email.trim() === '') {
    return res.status(400).json({ error: 'Email is required' });
  }

  if (!email.includes('@')) {
    return res.status(400).json({ error: 'Invalid Email Address' });
  }

  next();
};

module.exports = validateMember;