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
exports.denyVisit = exports.approveVisit = void 0;
const db_1 = require("../db");
const webSocketService_1 = require("./webSocketService");
const client_1 = require("@prisma/client");
const approveVisit = (visitId) => __awaiter(void 0, void 0, void 0, function* () {
    const visit = yield db_1.db.visit.update({
        where: { id: visitId },
        data: { status: client_1.VisitStatus.APPROVED },
    });
    (0, webSocketService_1.sendNotification)(visit.visitorId, "Your visit has been approved!");
    return visit;
});
exports.approveVisit = approveVisit;
const denyVisit = (visitId) => __awaiter(void 0, void 0, void 0, function* () {
    const visit = yield db_1.db.visit.update({
        where: { id: visitId },
        data: { status: client_1.VisitStatus.DENIED },
    });
    (0, webSocketService_1.sendNotification)(visit.visitorId, "Your visit has been denied.");
    return visit;
});
exports.denyVisit = denyVisit;
