"use strict";
// const express = require("express")
// const authRoutes = require("./routes/auth.route");
// const userRoutes = require("./routes/user.routes");
// const connectDB = require("./config/db")
// const dotenv = require("dotenv")
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const db_1 = __importDefault(require("./config/db"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
(0, db_1.default)();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api/auth", auth_route_1.default);
app.use("/api/users", user_routes_1.default);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
//# sourceMappingURL=server.js.map