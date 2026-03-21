// const express = require("express")
// const authRoutes = require("./routes/auth.route");
// const userRoutes = require("./routes/user.routes");
// const connectDB = require("./config/db")
// const dotenv = require("dotenv")

import express from "express";
import authRoutes from "./routes/auth.route";
import userRoutes from "./routes/user.routes";
import connectDB from "./config/db";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config()
connectDB()

const app = express()

app.use(express.json())
app.use(cors<express.Request>());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})