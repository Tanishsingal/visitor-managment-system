"use strict";
// import express from "express";
// import { createVisitRequest } from "../controllers/visitController";
// import { approveVisitRequest, denyVisitRequest } from "../controllers/visitController";
// import { authenticate, authorizeRole } from "../middleware/authMiddleware";
// const router = express.Router();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// router.post("/request", createVisitRequest);
// router.put("/:visitId/approve",authenticate, authorizeRole(["employee"]), approveVisitRequest);
// router.put("/:visitId/deny",authenticate, authorizeRole(["employee"]), denyVisitRequest);
// // router.put("/:visitId/approve", approveVisitRequest);
// // router.put("/:visitId/deny", denyVisitRequest);
// export default router;
// visitRoutes.ts
// visitRoutes.ts
const express_1 = __importDefault(require("express"));
const visitController_1 = require("../controllers/visitController");
const visitController_2 = require("../controllers/visitController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.post("/request", visitController_1.createVisitRequest);
router.put("/:visitId/approve", authMiddleware_1.authenticate, (0, authMiddleware_1.authorizeRole)(["EMPLOYEE"]), visitController_2.approveVisitRequest);
router.put("/:visitId/deny", authMiddleware_1.authenticate, (0, authMiddleware_1.authorizeRole)(["EMPLOYEE"]), visitController_2.denyVisitRequest);
exports.default = router;
