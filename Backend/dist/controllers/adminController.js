"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminLogin = exports.createAdmin = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("../db");
// import { registerAdmin, loginAdmin } from "../services/adminService";
const SECRET_KEY = process.env.JWT_SECRET || "mysecretkey";
const registerAdmin = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const hashedPassword = yield bcryptjs_1.default.hash(data.password, 10);
    return yield db_1.db.admin.create({
        data: Object.assign(Object.assign({}, data), { password: hashedPassword }),
    });
});
const loginAdmin = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const admin = yield db_1.db.admin.findUnique({ where: { email } });
    if (!admin)
        throw new Error("Admin not found");
    const isMatch = yield bcryptjs_1.default.compare(password, admin.password);
    if (!isMatch)
        throw new Error("Invalid credentials");
    return jsonwebtoken_1.default.sign({ id: admin.id, role: "admin" }, SECRET_KEY, { expiresIn: "1d" });
});
const createAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const admin = yield registerAdmin(req.body);
        res.status(201).json(admin);
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
exports.createAdmin = createAdmin;
const adminLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const token = yield loginAdmin(email, password);
        res.json({ token });
    }
    catch (error) {
        res.status(401).json({ message: error });
    }
});
exports.adminLogin = adminLogin;
