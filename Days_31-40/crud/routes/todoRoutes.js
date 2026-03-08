const express = require("express")
const router = express.Router()
const todoController = require("../controllers.js/todoController")

// list all todos
router.get("/", todoController.getTodos)

// get a single todo by id
router.get("/:id", todoController.getTodo)

// create a new todo (no id in the path)
router.post("/", todoController.createTodos)

// update an existing todo
router.put("/:id", todoController.updateTodo)

// delete a todo
router.delete("/:id", todoController.delTodo)

module.exports = router