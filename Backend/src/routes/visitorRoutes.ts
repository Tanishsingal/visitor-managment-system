// import { Router } from "express";
// import { Request, Response } from "express";
// import { db } from "../db";
// // import { registerVisitor } from "../controllers/visitorController";
// const router = Router();

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


import express from "express";
import { createVisitor, fetchVisitors } from "../controllers/visitorController";
const router = express.Router();

router.post("/register", createVisitor);
router.get("/", fetchVisitors);

export default router;