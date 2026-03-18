// const express = require("express")
// const authController = require("../controller/auth.controller")
// const router = express.Router()
import { Router } from "express";
import { register, login } from "../controller/auth.controller";

const router = Router();

router.post("/register", register);

router.post("/login", login);

export default router