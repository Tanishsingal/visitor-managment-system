"use strict";
// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import morgan from "morgan";
// import visitorRoutes from "./routes/visitorRoutes";
// import authRoutes from "./routes/authRoutes";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// dotenv.config();
// const app = express();
// app.use(express.json());
// app.use(cors());
// app.use(morgan("dev"));
// app.use("/api/visitors", visitorRoutes);
// app.use("/api/auth", authRoutes);
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const visitorRoutes_1 = __importDefault(require("./routes/visitorRoutes"));
const employeeRoutes_1 = __importDefault(require("./routes/employeeRoutes"));
const visitRoutes_1 = __importDefault(require("./routes/visitRoutes"));
const eventRoutes_1 = __importDefault(require("./routes/eventRoutes"));
const adminRoutes_1 = __importDefault(require("./routes/adminRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, morgan_1.default)("dev"));
app.use("/api/visitors", visitorRoutes_1.default);
app.use("/api/employees", employeeRoutes_1.default);
app.use("/api/visits", visitRoutes_1.default);
app.use("/api/events", eventRoutes_1.default);
app.use("/api/admin", adminRoutes_1.default);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
