// vistitor  -> req us 
// host emp -> vistor send res either accept /reject  
// accept->mail 
// vistor with pass then done

// admin 
// host emp
// visitor ->user
//user
// event




here is my backend file :
server.ts->
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import visitorRoutes from "./routes/visitorRoutes";
import employeeRoutes from "./routes/employeeRoutes";
import visitRoutes from "./routes/visitRoutes";
import eventRoutes from "./routes/eventRoutes";
import adminRoutes from "./routes/adminRoutes";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

app.use("/api/visitors", visitorRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/visits", visitRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/admin", adminRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

db.ts->
import { PrismaClient } from "@prisma/client";

export const db= new PrismaClient()
routes folder:
adminRoutes.ts->
import express from "express";
import { createAdmin, adminLogin } from "../controllers/adminController";
const router = express.Router();

router.post("/register", createAdmin);
router.post("/login", adminLogin);

export default router;
employeeRoute.ts->

import express from "express";
import { createEmployee, login, fetchEmployees } from "../controllers/employeeController";
import { authenticate, authorizeRole } from "../middleware/authMiddleware";
const router = express.Router();

router.post("/register", createEmployee);
router.post("/login", login);
router.get("/", authenticate, authorizeRole(["ADMIN"]), fetchEmployees);

export default router;
eventRoutes.ts->
import express from "express";
import { addEvent, getEvents } from "../controllers/eventController";
const router = express.Router();

router.post("/create", addEvent);
router.get("/", getEvents);

export default router;
visitorRoutes.ts->

import express from "express";
import { createVisitor, fetchVisitors } from "../controllers/visitorController";
const router = express.Router();

router.post("/register", createVisitor);
router.get("/", fetchVisitors);

export default router;

visitRoues.ts->
import express from "express";
import { createVisitRequest } from "../controllers/visitController";
import { approveVisitRequest, denyVisitRequest } from "../controllers/visitController";
import { authenticate, authorizeRole } from "../middleware/authMiddleware";
const router = express.Router();

router.post("/request", createVisitRequest);

router.put("/:visitId/approve", authenticate, authorizeRole(["EMPLOYEE"]), approveVisitRequest);
router.put("/:visitId/deny", authenticate, authorizeRole(["EMPLOYEE"]), denyVisitRequest);

export default router;
middleware folder->
authMiddleware.ts->
import { Request, Response, NextFunction, RequestHandler } from "express";
import jwt from "jsonwebtoken";

// Define the user interface
interface JwtPayload {
    id: number;
    role: string;
}

// Extend Request type
declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload;
        }
    }
}

const SECRET_KEY = process.env.JWT_SECRET || "mysecretkey";

export const authenticate: RequestHandler = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        res.status(401).json({ message: "Authorization token is required." });
        return;
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY) as JwtPayload;
        req.user = decoded;
        next();
    } catch (error) {
        res.status(403).json({ message: "Invalid or expired token." });
        return;
    }
};

export const authorizeRole = (roles: string[]): RequestHandler => {
    return (req: Request, res: Response, next: NextFunction): void => {
        if (!req.user || !req.user.role || !roles.includes(req.user.role)) {
            res.status(403).json({ message: "You do not have the required permissions." });
            return;
        }

        next();
    };
};

