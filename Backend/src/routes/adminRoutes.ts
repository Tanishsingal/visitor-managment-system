import express from "express";
import { createAdmin, adminLogin } from "../controllers/adminController";
const router = express.Router();

router.post("/register", createAdmin);
router.post("/login", adminLogin);

export default router;
