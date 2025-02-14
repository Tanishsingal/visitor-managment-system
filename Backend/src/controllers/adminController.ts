import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {db} from "../db";
// import { registerAdmin, loginAdmin } from "../services/adminService";


const SECRET_KEY = process.env.JWT_SECRET || "mysecretkey";

const registerAdmin = async (data: any) => {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    return await db.admin.create({
      data: { ...data, password: hashedPassword },
    });
  };

  const loginAdmin = async (email: string, password: string) => {
    const admin = await db.admin.findUnique({ where: { email } });
    if (!admin) throw new Error("Admin not found");
  
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) throw new Error("Invalid credentials");
  
    return jwt.sign({ id: admin.id, role: "admin" }, SECRET_KEY, { expiresIn: "1d" });
  };

export const createAdmin = async (req: Request, res: Response) => {
  try {
    const admin = await registerAdmin(req.body);
    res.status(201).json(admin);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const adminLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const token = await loginAdmin(email, password);
    res.json({ token });
  } catch (error) {
    res.status(401).json({ message: error });
  }
};
