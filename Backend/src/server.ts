import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
// import morgan from "morgan";
// import http from "http";
// import { setupWebSocket } from "./services/webSocketService";
import visitorRoutes from "./routes/visitorRoutes";
import employeeRoutes from "./routes/employeeRoutes";
import visitRoutes from "./routes/visitRoutes";
import eventRoutes from "./routes/eventRoutes";
import adminRoutes from "./routes/adminRoutes";
// import notificationRoutes from './routes/notificationRoutes'
// import reportRoutes from './routes/reportRoutes'
// import analyticsRoutes from './routes/analyticsRoutes'
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
// app.use(morgan("dev"));

app.use("/api/visitors", visitorRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/visits", visitRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/admin", adminRoutes);

// app.use("/api/analytics", analyticsRoutes);
// app.use("/api/reports", reportRoutes);
// app.use("/api/notifications", notificationRoutes);
// const server = http.createServer(app);
// setupWebSocket(server);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
