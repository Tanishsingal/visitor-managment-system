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
exports.fetchEmployees = exports.login = exports.createEmployee = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("../db");
// import { registerEmployee, loginEmployee, getAllEmployees } from "../services/employeeService";
const SECRET_KEY = process.env.JWT_SECRET || "mysecretkey";
const registerEmployee = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const hashedPassword = yield bcryptjs_1.default.hash(data.password, 10);
    return yield db_1.db.employee.create({
        data: Object.assign(Object.assign({}, data), { password: hashedPassword }),
    });
});
const loginEmployee = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const employee = yield db_1.db.employee.findUnique({ where: { email } });
    if (!employee)
        throw new Error("Employee not found");
    // const isMatch = await bcrypt.compare(password, employee.password);
    // if (!isMatch) throw new Error("Invalid credentials");
    return jsonwebtoken_1.default.sign({ id: employee.id, role: "employee" }, SECRET_KEY, { expiresIn: "1d" });
});
const getAllEmployees = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.db.employee.findMany();
});
const createEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const employee = yield registerEmployee(req.body);
        res.status(201).json(employee);
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
exports.createEmployee = createEmployee;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const token = yield loginEmployee(email, password);
        res.json({ token });
    }
    catch (error) {
        res.status(401).json({ message: error });
    }
});
exports.login = login;
const fetchEmployees = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const employees = yield getAllEmployees();
        res.json(employees);
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
exports.fetchEmployees = fetchEmployees;
