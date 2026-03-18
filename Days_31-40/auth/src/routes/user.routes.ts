// const express = require("express");
// const router = express.Router();
// const userController = require("../controller/userController");
// const authMiddleware = require("../middleware/auth.middleware");

import { Router } from "express"
import { getUsers, getUsersById } from "../controller/user.controller"
import authMiddleware from "../middleware/auth.middleware"

const router = Router()

router.get("/", authMiddleware, getUsers);

router.get("/:id", authMiddleware, getUsersById);

export default router;