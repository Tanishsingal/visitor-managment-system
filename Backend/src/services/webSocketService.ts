// import { Server } from "ws";

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

import { Server, WebSocket } from "ws";
import {  VisitStatus } from "@prisma/client";
import express, { Request, Response } from "express";
import http from "http";
import { IncomingMessage } from "http";
import { URL } from "url";
import {db} from "../db"
import { sendEmail } from "./emailService";
const app = express();
const server = http.createServer(app);
const wss = new Server({ server });
app.use(express.json())
const clients = new Map<number, WebSocket>(); // Employee ID → WebSocket connection

wss.on("connection", (ws: WebSocket, req: IncomingMessage) => {
  const urlParams = new URL(req.url || "", `http://${req.headers.host}`);
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
const notifyEmployees = async (): Promise<void> => {
  const pendingVisits = await db.visit.findMany({
    where: { status: VisitStatus.PENDING },
    include: { visitor: true },
  });

  clients.forEach((ws) => {
    ws.send(JSON.stringify({ event: "NEW_VISITOR", data: pendingVisits }));
  });
};

// API to add new visitor (Triggers WebSocket Notification)
app.post("/register", async (req: Request, res: Response) => {
  
  const { fullName, email, phone } = req.body ;

  try {
    // const visit = await db.visit.create({
    //   data: { visitorId, employeeId, purpose, checkIn: new Date(), status: VisitStatus.PENDING },
    // });
     const visitor = await db.visitor.create({data:{fullName,email,phone}});
        await sendEmail(req.body.email,"Email sent for confirmation","host will confirm and allow you");
        await notifyEmployees(); // Send update to employees
        
        res.status(201).json(visitor);
    // res.status(201).json({ message: "Visitor added", visit });
  } catch (error) {
    res.status(500).json({ error: "Failed to add visitor" });
  }
});

// API for employee to approve/reject visitor
app.post("/update-visit", async (req: any, res: any) => {
  const { visitId, status } = req.body as { visitId: number; status: VisitStatus };

  if (!Object.values(VisitStatus).includes(status)) {
    return res.status(400).json({ error: "Invalid status" });
  }

  try {
    await db.visit.update({
      where: { id: visitId },
      data: { status },
    });

    await notifyEmployees(); // Update employees after action

    res.status(200).json({ message: "Visit updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update visit" });
  }
});

server.listen(4000, () => console.log("Server running on port 4000"));