const todo = require("../models/todo")
const mongoose = require("mongoose")

const createTodos = async (req, res) => {
    const getTodo = await todo.create(req.body)
    res.status(201).json(getTodo)
}

const getTodos = async (req, res) => {
    const getTodo = await todo.find();
    res.json(getTodo)
}

const getTodo = async (req, res) => {
    const { id } = req.params
    // validate format before querying
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid todo ID" })
    }

    const oneTodo = await todo.findById(id)
    if (!oneTodo) {
        return res.status(404).json({ error: "Todo not found" })
    }
    res.json(oneTodo)
}

const updateTodo = async (req, res) => {
    const updt = await todo.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    )
    res.status(200).json(updt)
}

const delTodo = async (req, res) => {
    await todo.findByIdAndDelete(req.params.id)
    res.json({ message: "Todo Deleted!" })
}

module.exports = { createTodos, getTodos, getTodo, updateTodo, delTodo }