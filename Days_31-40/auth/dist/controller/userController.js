"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsersById = exports.getUsers = void 0;
const user_1 = __importDefault(require("../models/user"));
const getUsers = async (req, res) => {
    const users = await user_1.default.find().select("-password");
    res.json(users);
};
exports.getUsers = getUsers;
const getUsersById = async (req, res) => {
    const oneUser = await user_1.default.findById(req.params.id).select("-password");
    res.json(oneUser);
};
exports.getUsersById = getUsersById;
//# sourceMappingURL=userController.js.map