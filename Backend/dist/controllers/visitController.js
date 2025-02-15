"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.denyVisitRequest = exports.approveVisitRequest = exports.createVisitRequest = void 0;
const db_1 = require("../db");
const client_1 = require("@prisma/client");
const emailService_1 = require("../services/emailService");
// import { sendSMS } from "../services/smsService";
// import { io } from '../services/websocketService';
// import { sendNotification } from "../services/webSocketService";
// import { requestVisit } from "../services/visitService";
const requestVisit = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.db.visit.create({ data });
});
const approveVisit = (visitId) => __awaiter(void 0, void 0, void 0, function* () {
    const visit = yield db_1.db.visit.update({
        where: { id: visitId },
        data: { status: client_1.VisitStatus.APPROVED },
        include: { visitor: true },
    });
    // sendNotification(visit.visitorId, "Your visit has been approved!");
    (0, emailService_1.sendEmail)(visit.visitor.email, "Visit Approved", "Your visit request has been approved.");
    // sendSMS(visit.visitor.phone, "Your visit has been approved!");
    return visit;
});
const denyVisit = (visitId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.db.visit.update({
        where: { id: visitId },
        data: { status: client_1.VisitStatus.DENIED },
    });
});
const createVisitRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const visit = yield requestVisit(req.body);
        res.status(201).json(visit);
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
exports.createVisitRequest = createVisitRequest;
const approveVisitRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { visitId } = req.params;
        const visit = yield approveVisit(Number(visitId));
        res.json(visit);
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
exports.approveVisitRequest = approveVisitRequest;
const denyVisitRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { visitId } = req.params;
        const visit = yield denyVisit(Number(visitId));
        res.json(visit);
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
exports.denyVisitRequest = denyVisitRequest;
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
