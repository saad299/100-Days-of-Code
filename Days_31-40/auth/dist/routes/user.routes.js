"use strict";
// const express = require("express");
// const router = express.Router();
// const userController = require("../controller/userController");
// const authMiddleware = require("../middleware/auth.middleware");
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controller/user.controller");
const auth_middleware_1 = __importDefault(require("../middleware/auth.middleware"));
const router = (0, express_1.Router)();
router.get("/", auth_middleware_1.default, user_controller_1.getUsers);
router.get("/:id", auth_middleware_1.default, user_controller_1.getUsersById);
exports.default = router;
//# sourceMappingURL=user.routes.js.map