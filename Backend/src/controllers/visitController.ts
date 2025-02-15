import { Request, Response } from "express";
import {db} from "../db";
import { VisitStatus } from "@prisma/client";
import { sendEmail } from "../services/emailService";
// import { sendSMS } from "../services/smsService";
// import { io } from '../services/websocketService';
// import { sendNotification } from "../services/webSocketService";
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

    // sendNotification(visit.visitorId, "Your visit has been approved!");
    sendEmail(visit.visitor.email, "Visit Approved", "Your visit request has been approved.");
    // sendSMS(visit.visitor.phone, "Your visit has been approved!");
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

// export const getVisitById = async (req: Request, res: Response) => {
//   try {
//     const visit = await db.visit.findUnique({
//       where: { id: Number(req.params.id) },
//       include: {
//         visitor: true,
//         employee: true
//       }
//     });

//     if (!visit) {
//       return res.status(404).json({ message: 'Visit not found' });
//     }

//     res.json(visit);
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to fetch visit' });
//   }
// };

// export const checkInVisit = async (req: Request, res: Response) => {
//   try {
//     const visit = await db.visit.update({
//       where: { id: Number(req.params.id) },
//       data: {
//         status: 'CHECKED_IN',
//         checkIn: new Date()
//       },
//       include: {
//         visitor: true,
//         employee: true
//       }
//     });

//     // Emit real-time update
//     io.emit('visitUpdate', { type: 'CHECK_IN', visit });

//     // Notify employee
//     await sendEmail(
//       visit.employee.email,
//       'Visitor Check-in',
//       `${visit.visitor.fullName} has checked in for their visit.`
//     );

//     res.json(visit);
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to check in' });
//   }
// };

// export const checkOutVisit = async (req: Request, res: Response) => {
//   try {
//     const visit = await db.visit.update({
//       where: { id: Number(req.params.id) },
//       data: {
//         status: 'CHECKED_OUT',
//         checkOut: new Date()
//       },
//       include: {
//         visitor: true,
//         employee: true
//       }
//     });

//     io.emit('visitUpdate', { type: 'CHECK_OUT', visit });

//     res.json(visit);
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to check out' });
//   }
// };

// export const getActiveVisits = async (req: Request, res: Response) => {
//   try {
//     const visits = await db.visit.findMany({
//       where: {
//         status: 'CHECKED_IN'
//       },
//       include: {
//         visitor: true,
//         employee: true
//       },
//       orderBy: {
//         checkIn: 'desc'
//       }
//     });

//     res.json(visits);
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to fetch active visits' });
//   }
// };

// export const getVisitsByStatus = async (req: Request, res: Response) => {
//   try {
//     const { status } = req.query;
//     const visits = await db.visit.findMany({
//       where: status !== 'all' ? {
//         status: status as VisitStatus
//       } : undefined,
//       include: {
//         visitor: true,
//         employee: true
//       },
//       orderBy: {
//         checkIn: 'desc'
//       }
//     });

//     res.json(visits);
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to fetch visits' });
//   }
// };