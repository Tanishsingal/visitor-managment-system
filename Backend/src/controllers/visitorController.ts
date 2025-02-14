import { Request, Response } from "express";
// import { registerVisitor, getAllVisitors } from "../services/visitorService";
import {db} from "../db"
import { sendEmail } from "../services/emailService";

const registerVisitor = async (data: any) => {
    return await db.visitor.create({ data });
  };

  
  const getAllVisitors = async () => {
    return await db.visitor.findMany();
  };


export const createVisitor = async (req: Request, res: Response) => {
  try {
    const visitor = await registerVisitor(req.body);
    await sendEmail(req.body.email,"Email sent for confirmation","host will confirm and allow you");
    res.status(201).json(visitor);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const fetchVisitors = async (_req: Request, res: Response) => {
  try {
    const visitors = await getAllVisitors();
    res.json(visitors);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
