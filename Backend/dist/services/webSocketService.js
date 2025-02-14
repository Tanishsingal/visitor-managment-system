"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendNotification = exports.setupWebSocket = void 0;
const ws_1 = require("ws");
const clients = new Map();
const setupWebSocket = (server) => {
    const wss = new ws_1.Server({ server });
    wss.on("connection", (ws, req) => {
        var _a;
        const userId = Number((_a = req.url) === null || _a === void 0 ? void 0 : _a.split("=")[1]); // Extract userId from URL
        if (userId) {
            clients.set(userId, ws);
        }
        ws.on("close", () => {
            clients.delete(userId);
        });
    });
    return wss;
};
exports.setupWebSocket = setupWebSocket;
const sendNotification = (userId, message) => {
    const client = clients.get(userId);
    if (client) {
        client.send(JSON.stringify({ message }));
    }
};
exports.sendNotification = sendNotification;
