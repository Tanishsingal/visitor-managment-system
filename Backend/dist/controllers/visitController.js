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
const smsService_1 = require("../services/smsService");
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
    (0, smsService_1.sendSMS)(visit.visitor.phone, "Your visit has been approved!");
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
