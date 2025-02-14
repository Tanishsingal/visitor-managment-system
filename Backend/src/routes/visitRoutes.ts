import express from "express";
import { createVisitRequest } from "../controllers/visitController";
import { approveVisitRequest, denyVisitRequest } from "../controllers/visitController";
import { authenticate, authorizeRole } from "../middleware/authMiddleware";
const router = express.Router();

router.post("/request", createVisitRequest);

router.put("/:visitId/approve", authenticate, authorizeRole(["EMPLOYEE"]), approveVisitRequest);
router.put("/:visitId/deny", authenticate, authorizeRole(["EMPLOYEE"]), denyVisitRequest);

export default router;