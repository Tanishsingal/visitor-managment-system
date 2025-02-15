import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {db} from "../db"
// import { registerEmployee, loginEmployee, getAllEmployees } from "../services/employeeService";


const SECRET_KEY = process.env.JWT_SECRET || "mysecretkey";

const registerEmployee = async (data: any) => {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    return await db.employee.create({
      data: { ...data, password: hashedPassword },
    });
  };


  const loginEmployee = async (email: string, password: string) => {
    const employee = await db.employee.findUnique({ where: { email } });
    if (!employee) throw new Error("Employee not found");
  
    // const isMatch = await bcrypt.compare(password, employee.password);
    // if (!isMatch) throw new Error("Invalid credentials");
  
    return jwt.sign({ id: employee.id, role: "employee" }, SECRET_KEY, { expiresIn: "1d" });
  };

  const getAllEmployees = async () => {
    return await db.employee.findMany();
  };

export const createEmployee = async (req: Request, res: Response) => {
  try {
    const employee = await registerEmployee(req.body);
    res.status(201).json(employee);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const token = await loginEmployee(email, password);
    res.json({ token });
  } catch (error) {
    res.status(401).json({ message: error });
  }
};

export const fetchEmployees = async (_req: Request, res: Response) => {
  try {
    const employees = await getAllEmployees();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

