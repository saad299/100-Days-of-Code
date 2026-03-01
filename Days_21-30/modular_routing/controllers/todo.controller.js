let todos = [
  { id: 1, title: 'Buy groceries', done: false },
  { id: 2, title: 'Walk the dog', done: false },
];

// GET /todos
const getAllTodos = (req, res) => {
  res.json(todos);
};

// GET /todos/:id
const getTodoById = (req, res) => {
  const todo = todos.find(t => t.id === parseInt(req.params.id));
  if (!todo) return res.status(404).json({ error: 'Todo not found' });
  res.json(todo);
};

// POST /todos  ← validate middleware runs before this
const createTodo = (req, res) => {
  const { title, done } = req.body;
  const newTodo = { id: todos.length + 1, title, done };
  todos.push(newTodo);
  res.status(201).json(newTodo);
};

// PUT /todos/:id
const updateTodo = (req, res) => {
  const todo = todos.find(t => t.id === parseInt(req.params.id));
  if (!todo) return res.status(404).json({ error: 'Todo not found' });

  todo.title = req.body.title || todo.title;
  todo.done = req.body.done !== undefined ? req.body.done : todo.done;

  res.json(todo);
};

// DELETE /todos/:id
const deleteTodo = (req, res) => {
  const index = todos.findIndex(t => t.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Todo not found' });

  todos.splice(index, 1);
  res.json({ message: 'Todo deleted' });
};

module.exports = { getAllTodos, getTodoById, createTodo, updateTodo, deleteTodo };