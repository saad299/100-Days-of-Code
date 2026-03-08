const mongoose = require("mongoose")

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        default: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("todo", todoSchema)