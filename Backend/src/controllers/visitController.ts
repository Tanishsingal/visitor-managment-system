import { Request, Response } from "express";
import {db} from "../db";
import { VisitStatus } from "@prisma/client";
import { sendEmail } from "../services/emailService";
import { sendSMS } from "../services/smsService";
import { sendNotification } from "../services/webSocketService";
// import { requestVisit } from "../services/visitService";

const requestVisit = async (data: any) => {
    return await db.visit.create({ data });
  };


  const approveVisit = async (visitId: number) => {
    const visit= await db.visit.update({
      where: { id: visitId },
      data: { status: VisitStatus.APPROVED },
      include: { visitor: true }, 
    });

    sendNotification(visit.visitorId, "Your visit has been approved!");
    sendEmail(visit.visitor.email, "Visit Approved", "Your visit request has been approved.");
    sendSMS(visit.visitor.phone, "Your visit has been approved!");
    return visit;
  };
  

  const denyVisit = async (visitId: number) => {
      return await db.visit.update({
        where: { id: visitId },
        data: { status: VisitStatus.DENIED },
      });
    };

export const createVisitRequest = async (req: Request, res: Response) => {
  try {
    const visit = await requestVisit(req.body);
    res.status(201).json(visit);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const approveVisitRequest = async (req: Request, res: Response) => {
    try {
      const { visitId } = req.params;
      const visit = await approveVisit(Number(visitId));
      res.json(visit);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  };
  
  export const denyVisitRequest = async (req: Request, res: Response) => {
    try {
      const { visitId } = req.params;
      const visit = await denyVisit(Number(visitId));
      res.json(visit);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  };