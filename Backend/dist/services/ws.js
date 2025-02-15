"use strict";
// import { Server } from "ws";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendNotification = void 0;
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
//   });
//   return wss;
// };
// export const sendNotification = (userId: number, message: string) => {
//   const client = clients.get(userId);
//   if (client) {
//     client.send(JSON.stringify({ message }));
//   }
// };
// // src/services/websocketService.ts
// import { Server } from "ws";
// import { Visit } from "@prisma/client";
// interface WebSocketMessage {
//   type: 'VISIT_UPDATE' | 'NOTIFICATION' | 'CHECK_IN' | 'CHECK_OUT';
//   data: any;
// }
// const clients = new Map<number, WebSocket>();
// export const setupWebSocket = (server: any) => {
//   const wss = new Server({ server });
//   wss.on("connection", (ws: WebSocket, req: any) => {
//     // Extract userId from URL query parameters
//     const userId = req.url?.split("=")[1];
//     if (userId) {
//       clients.set(Number(userId), ws);
//       console.log(`Client connected: ${userId}`);
//       // Send initial connection success message
//       ws.send(JSON.stringify({
//         type: 'CONNECTION',
//         data: { message: 'Connected successfully' }
//       }));
//     }
//     ws.on("close", () => {
//       if (userId) {
//         clients.delete(Number(userId));
//         console.log(`Client disconnected: ${userId}`);
//       }
//     });
//     ws.on("error", (error) => {
//       console.error(`WebSocket error for user ${userId}:`, error);
//     });
//   });
//   return wss;
// };
// // Function to send notifications to specific users
// export const sendNotification = (userId: number, message: string) => {
//   const client = clients.get(userId);
//   if (client) {
//     client.send(JSON.stringify({
//       type: 'NOTIFICATION',
//       data: { message }
//     }));
//   }
// };
// // Function to broadcast visit updates to all connected clients
// export const broadcastVisitUpdate = (visit: Visit) => {
//   clients.forEach((client) => {
//     client.send(JSON.stringify({
//       type: 'VISIT_UPDATE',
//       data: { visit }
//     }));
//   });
// };
// // Function to notify employee about check-in
// export const notifyEmployeeOfCheckIn = (employeeId: number, visitorName: string) => {
//   const client = clients.get(employeeId);
//   if (client) {
//     client.send(JSON.stringify({
//       type: 'CHECK_IN',
//       data: {
//         message: `${visitorName} has checked in for their visit`,
//         timestamp: new Date().toISOString()
//       }
//     }));
//   }
// };
// // Function to notify employee about check-out
// export const notifyEmployeeOfCheckOut = (employeeId: number, visitorName: string) => {
//   const client = clients.get(employeeId);
//   if (client) {
//     client.send(JSON.stringify({
//       type: 'CHECK_OUT',
//       data: {
//         message: `${visitorName} has checked out`,
//         timestamp: new Date().toISOString()
//       }
//     }));
//   }
// };
// import { Server, WebSocket } from "ws";
// import { Visit } from "@prisma/client";
// import { IncomingMessage, Server as HttpServer } from "http";
// interface WebSocketMessage {
//   type: "VISIT_UPDATE" | "NOTIFICATION" | "CHECK_IN" | "CHECK_OUT";
//   data: any;
// }
// const clients = new Map<number, WebSocket>();
// export const setupWebSocket = (server: HttpServer) => {
//   const wss = new Server({ server });
//   wss.on("connection", (ws: WebSocket, req: IncomingMessage) => {
//     try {
//       const url = new URL(req.url || "", `http://${req.headers.host}`);
//       const userId = Number(url.searchParams.get("userId"));
//       if (isNaN(userId)) {
//         console.error("Invalid userId in WebSocket connection");
//         ws.close();
//         return;
//       }
//       clients.set(userId, ws);
//       console.log(`Client connected: ${userId}`);
//       ws.send(
//         JSON.stringify({
//           type: "CONNECTION",
//           data: { message: "Connected successfully" },
//         })
//       );
//       ws.on("close", () => {
//         clients.delete(userId);
//         console.log(`Client disconnected: ${userId}`);
//       });
//       ws.on("error", (error) => {
//         console.error(`WebSocket error for user ${userId}:`, error);
//       });
//     } catch (error) {
//       console.error("Error processing WebSocket connection:", error);
//       ws.close();
//     }
//   });
//   return wss;
// };
// // Function to send notifications to specific users
// export const sendNotification = (userId: number, message: string) => {
//   const client = clients.get(userId);
//   if (client && client.readyState === WebSocket.OPEN) {
//     client.send(
//       JSON.stringify({
//         type: "NOTIFICATION",
//         data: { message },
//       })
//     );
//   }
// };
// // Function to broadcast visit updates to all connected clients
// export const broadcastVisitUpdate = (visit: Visit) => {
//   clients.forEach((client) => {
//     if (client.readyState === WebSocket.OPEN) {
//       client.send(
//         JSON.stringify({
//           type: "VISIT_UPDATE",
//           data: { visit },
//         })
//       );
//     }
//   });
// };
// // Function to notify employee about check-in
// export const notifyEmployeeOfCheckIn = (employeeId: number, visitorName: string) => {
//   const client = clients.get(employeeId);
//   if (client && client.readyState === WebSocket.OPEN) {
//     client.send(
//       JSON.stringify({
//         type: "CHECK_IN",
//         data: {
//           message: `${visitorName} has checked in for their visit`,
//           timestamp: new Date().toISOString(),
//         },
//       })
//     );
//   }
// };
// // Function to notify employee about check-out
// export const notifyEmployeeOfCheckOut = (employeeId: number, visitorName: string) => {
//   const client = clients.get(employeeId);
//   if (client && client.readyState === WebSocket.OPEN) {
//     client.send(
//       JSON.stringify({
//         type: "CHECK_OUT",
//         data: {
//           message: `${visitorName} has checked out`,
//           timestamp: new Date().toISOString(),
//         },
//       })
//     );
//   }
// };
const ws_1 = require("ws");
const wss = new ws_1.Server({ port: 8080 });
const clients = new Map();
wss.on("connection", (ws, req) => {
    var _a;
    ws.on("error", console.error);
    const visitorId = (_a = req.url) === null || _a === void 0 ? void 0 : _a.split("=")[1]; // Extract userId from URL
    if (visitorId) {
        clients.set(Number(visitorId), ws);
    }
    ws.on("close", () => {
        clients.delete(Number(visitorId));
    });
});
const sendNotification = (userId, message) => {
    const client = clients.get(userId);
    if (client) {
        client.send(JSON.stringify({ type: "notification", message }));
    }
};
exports.sendNotification = sendNotification;
