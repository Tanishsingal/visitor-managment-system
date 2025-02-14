"use strict";
// import { Router } from "express";
// import { Request, Response } from "express";
// import { db } from "../db";
// // import { registerVisitor } from "../controllers/visitorController";
// const router = Router();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// router.post("/register", async (req: Request, res: Response) => {
//     try {
//       const { fullName, email, company, purpose, employeeId } = req.body;
//       const visitor = await db.visitor.create({
//         data: {
//           fullName,
//           email,
//           company,
//           purpose,
//           visitRequest: {
//             create: {
//               employeeId,
//               status: "PENDING",
//             },
//           },
//         },
//       });
//       return res.status(201).json(visitor);
//     } catch (error) {
//       return res.status(500).json({ message: "Error registering visitor" });
//     }
// }
// );
// export default router;
const express_1 = __importDefault(require("express"));
const visitorController_1 = require("../controllers/visitorController");
const router = express_1.default.Router();
router.post("/register", visitorController_1.createVisitor);
router.get("/", visitorController_1.fetchVisitors);
exports.default = router;
