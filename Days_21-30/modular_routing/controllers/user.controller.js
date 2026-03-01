// fake in-memory data (no database needed)
let users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
];

// GET /users
const getAllUsers = (req, res) => {
  res.json(users);
};

// GET /users/:id
const getUserById = (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
};

// POST /users
const createUser = (req, res) => {
  const { name } = req.body;
  const newUser = { id: users.length + 1, name };
  users.push(newUser);
  res.status(201).json(newUser);
};

module.exports = { getAllUsers, getUserById, createUser };