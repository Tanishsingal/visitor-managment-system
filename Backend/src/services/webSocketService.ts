import { Server } from "ws";

const clients = new Map<number, any>();

export const setupWebSocket = (server: any) => {
  const wss = new Server({ server });

  wss.on("connection", (ws:any, req:any) => {
    const userId = Number(req.url?.split("=")[1]); // Extract userId from URL

    if (userId) {
      clients.set(userId, ws);
    }

    ws.on("close", () => {
      clients.delete(userId);
    });
  });

  return wss;
};

export const sendNotification = (userId: number, message: string) => {
  const client = clients.get(userId);
  if (client) {
    client.send(JSON.stringify({ message }));
  }
};
