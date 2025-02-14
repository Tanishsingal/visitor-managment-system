// import express from "express";
// import { createEmployee, login, fetchEmployees } from "../controllers/employeeController";
// import { authenticate, authorizeRole } from "../middleware/authMiddleware";
// const router = express.Router();

// router.post("/register", createEmployee);
// router.post("/login", login);
// router.get("/",authenticate, authorizeRole(["admin"]), fetchEmployees);
// router.get("/", fetchEmployees);

// export default router;
// employeeRoutes.ts
// employeeRoutes.ts

import express from "express";
import { createEmployee, login, fetchEmployees } from "../controllers/employeeController";
import { authenticate, authorizeRole } from "../middleware/authMiddleware";
const router = express.Router();

router.post("/register", createEmployee);
router.post("/login", login);
router.get("/", authenticate, authorizeRole(["ADMIN"]), fetchEmployees);

export default router;