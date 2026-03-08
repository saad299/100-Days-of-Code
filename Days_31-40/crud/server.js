const express = require("express")
const mongoose = require("mongoose")
const todoRoute = require("./routes/todoRoutes")
const connectDB = require("./config/db")
const dotenv = require("dotenv")

dotenv.config()
connectDB()

const app = express()

app.use(express.json())

app.use('/api/todos', todoRoute)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})