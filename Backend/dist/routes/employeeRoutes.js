"use strict";
// import express from "express";
// import { createEmployee, login, fetchEmployees } from "../controllers/employeeController";
// import { authenticate, authorizeRole } from "../middleware/authMiddleware";
// const router = express.Router();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// router.post("/register", createEmployee);
// router.post("/login", login);
// router.get("/",authenticate, authorizeRole(["admin"]), fetchEmployees);
// router.get("/", fetchEmployees);
// export default router;
// employeeRoutes.ts
// employeeRoutes.ts
const express_1 = __importDefault(require("express"));
const employeeController_1 = require("../controllers/employeeController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.post("/register", employeeController_1.createEmployee);
router.post("/login", employeeController_1.login);
router.get("/", authMiddleware_1.authenticate, (0, authMiddleware_1.authorizeRole)(["ADMIN"]), employeeController_1.fetchEmployees);
exports.default = router;
