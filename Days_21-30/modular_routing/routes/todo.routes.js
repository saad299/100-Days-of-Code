const router = require('express').Router();

const { getAllTodos, getTodoById, createTodo, updateTodo, deleteTodo } = require('../controllers/todo.controller');
const validateTodo = require('../middleware/validate.middleware');

router.get('/', getAllTodos);
router.get('/:id', getTodoById);
router.post('/', validateTodo, createTodo); // validateTodo runs ONLY for this route
router.put('/:id', updateTodo);
router.delete('/:id', deleteTodo);

module.exports = router;