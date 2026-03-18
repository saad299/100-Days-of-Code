"use strict";
// const user = require("../models/user");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const user_1 = __importDefault(require("../models/user"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_schema_1 = require("../schemas/auth.schema");
const register = async (req, res) => {
    try {
        const parsed = auth_schema_1.registerSchema.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json({ errors: parsed.error.flatten() });
        }
        const { name, email, password } = parsed.data;
        const existingUser = await user_1.default.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const newUser = await user_1.default.create({ name, email, password: hashedPassword });
        res.status(201).json(newUser);
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const parsed = auth_schema_1.loginSchema.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json({ errors: parsed.error.flatten() });
        }
        const { email, password } = parsed.data;
        const existingUser = await user_1.default.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
        }
        const isPasswordValid = await bcrypt_1.default.compare(password, existingUser.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const token = jsonwebtoken_1.default.sign({ id: existingUser._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.status(200).json({ message: "Login successful", token });
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.login = login;
//# sourceMappingURL=auth.controller.js.map