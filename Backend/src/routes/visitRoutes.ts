import express from "express";
import { createVisitRequest } from "../controllers/visitController";
import { approveVisitRequest, denyVisitRequest } from "../controllers/visitController";
import { authenticate, authorizeRole } from "../middleware/authMiddleware";
const router = express.Router();

router.post("/request", createVisitRequest);

router.put("/:visitId/approve", authenticate, authorizeRole(["EMPLOYEE"]), approveVisitRequest);
router.put("/:visitId/deny", authenticate, authorizeRole(["EMPLOYEE"]), denyVisitRequest);

// router.get('/:id', getVisitById);
// router.post('/:id/check-in', checkInVisit);
// router.post('/:id/check-out', checkOutVisit);
// router.get('/active', getActiveVisits);
// router.get('/', getVisitsByStatus);
// router.post('/visits/:id/check-in', authenticate, checkInVisit);
// router.post('/visits/:id/check-out', authenticate, checkOutVisit);
// router.get('/visits/active', authenticate, getActiveVisits);
// router.get('/visits/status/:id', getVisitStatus);
export default router;