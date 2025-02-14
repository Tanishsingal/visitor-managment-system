// import { Router } from "express";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import { Request, Response } from "express";
// import {db} from "../db"

// const SECRET_KEY = process.env.JWT_SECRET || "supersecret";

// const router = Router();

// const loginEmployee = async (email: string, password: string) => {
//     const user = await db.employee.findUnique({ where: { email } });
//     if (!user) throw new Error("User not found");
  
//     const isValid = await bcrypt.compare(password, user.password);
//     if (!isValid) throw new Error("Invalid password");
  
//     const token = jwt.sign({ id: user.id, role: user.role }, SECRET_KEY, { expiresIn: "1d" });
  
//     return { token, user };
//   };

//   const registerEmployee = async (name: string, email: string, password: string, department: string, role: string) => {
//     const hashedPassword = await bcrypt.hash(password, 10);
    
//     return await db.employee.create({
//       data: {
//         name,
//         email,
//         password: hashedPassword,
//         department,
//         role,
//       },
//     });
//   };

// router.post("/register", async (req: Request, res: Response) => {
//     try {
//       const { name, email, password, department, role } = req.body;
//       const newUser = await registerEmployee(name, email, password, department, role);
//       res.status(201).json(newUser);
//     } catch (error) {
//       res.status(400).json({ message: error });
//     }
//   });
// router.post("/login",  async (req: Request, res: Response) => {
//     try {
//       const { email, password } = req.body;
//       const result = await loginEmployee(email, password);
//       res.status(200).json(result);
//     } catch (error) {
//       res.status(401).json({ message: error });
//     }
//   });

// export default router;
