"use strict";
// import { Server } from "ws";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const clients = new Map<number, any>();
// export const setupWebSocket = (server: any) => {
//   const wss = new Server({ server });
//   wss.on("connection", (ws:any, req:any) => {
//     const visitorId = req.url?.split("=")[1]; // Extract userId from URL
//     if (visitorId) {
//       clients.set(visitorId, ws);
//     }
//     ws.on("close", () => {
//       clients.delete(visitorId);
//     });
//   });v
//   return wss;
// };
// export const sendNotification = (userId: number, message: string) => {
//   const client = clients.get(userId);
//   if (client) {
//     client.send(JSON.stringify({ message }));
//   }
// };
const ws_1 = require("ws");
const client_1 = require("@prisma/client");
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const url_1 = require("url");
const db_1 = require("../db");
const emailService_1 = require("./emailService");
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const wss = new ws_1.Server({ server });
app.use(express_1.default.json());
const clients = new Map(); // Employee ID → WebSocket connection
wss.on("connection", (ws, req) => {
    const urlParams = new url_1.URL(req.url || "", `http://${req.headers.host}`);
    const employeeId = Number(urlParams.searchParams.get("employeeId"));
    if (!employeeId) {
        ws.close();
        return;
    }
    clients.set(employeeId, ws);
    console.log(`Employee ${employeeId} connected`);
    ws.on("close", () => {
        clients.delete(employeeId);
        console.log(`Employee ${employeeId} disconnected`);
    });
});
// Function to notify employees
const notifyEmployees = () => __awaiter(void 0, void 0, void 0, function* () {
    const pendingVisits = yield db_1.db.visit.findMany({
        where: { status: client_1.VisitStatus.PENDING },
        include: { visitor: true },
    });
    clients.forEach((ws) => {
        ws.send(JSON.stringify({ event: "NEW_VISITOR", data: pendingVisits }));
    });
});
// API to add new visitor (Triggers WebSocket Notification)
app.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { fullName, email, phone } = req.body;
    try {
        // const visit = await db.visit.create({
        //   data: { visitorId, employeeId, purpose, checkIn: new Date(), status: VisitStatus.PENDING },
        // });
        const visitor = yield db_1.db.visitor.create({ data: { fullName, email, phone } });
        yield (0, emailService_1.sendEmail)(req.body.email, "Email sent for confirmation", "host will confirm and allow you");
        yield notifyEmployees(); // Send update to employees
        res.status(201).json(visitor);
        // res.status(201).json({ message: "Visitor added", visit });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to add visitor" });
    }
}));
// API for employee to approve/reject visitor
app.post("/update-visit", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { visitId, status } = req.body;
    if (!Object.values(client_1.VisitStatus).includes(status)) {
        return res.status(400).json({ error: "Invalid status" });
    }
    try {
        yield db_1.db.visit.update({
            where: { id: visitId },
            data: { status },
        });
        yield notifyEmployees(); // Update employees after action
        res.status(200).json({ message: "Visit updated successfully" });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to update visit" });
    }
}));
server.listen(4000, () => console.log("Server running on port 4000"));
