const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const authMiddleware = require("../middleware/auth.middleware");

router.get("/", authMiddleware, userController.getUsers);

router.get("/:id", authMiddleware, userController.getUsersById);

module.exports = router;