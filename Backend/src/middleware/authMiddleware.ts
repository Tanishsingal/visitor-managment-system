// // import { Request, Response, NextFunction } from "express";
// // import jwt from "jsonwebtoken";

// // const SECRET_KEY = process.env.JWT_SECRET || "supersecret";

// // export const authenticate = (req: Request, res: Response, next: NextFunction) => {
// //   const token = req.header("Authorization")?.split(" ")[1];
// //   if (!token) return res.status(401).json({ message: "Access Denied" });

// //   try {
// //     const decoded = jwt.verify(token, SECRET_KEY);
// //     req.user = decoded;
// //     next();
// //   } catch (error) {
// //     res.status(400).json({ message: "Invalid Token" });
// //   }
// // };

// // export const authorizeAdmin = (req: Request, res: Response, next: NextFunction) => {
// //   if (req.user?.role !== "ADMIN") return res.status(403).json({ message: "Forbidden" });
// //   next();
// // };


// import { Request, Response, NextFunction } from "express";
// import jwt from "jsonwebtoken";
// // import { User } from '../types/user'; 
// const SECRET_KEY = process.env.JWT_SECRET || "mysecretkey";

// // interface AuthenticatedRequest extends Request {
// //   user?: { id: number; role: string };
// // }

// // export const authenticate = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
// //   const token = req.headers.authorization?.split(" ")[1];

// //   if (!token) return res.status(401).json({ message: "Unauthorized" });

// //   try {
// //     const decoded = jwt.verify(token, SECRET_KEY) as { id: number; role: string };
// //     req.user = decoded;
// //     next();
// //   } catch (error) {
// //     res.status(401).json({ message: "Invalid Token" });
// //   }
// // };

// export const authenticate = (req: Request, res: Response, next: NextFunction) => {
//     // Check for the token in headers (e.g., Authorization header)
//     const token = req.headers.authorization?.split(' ')[1];  // Assuming Bearer token
  
//     if (!token) {
//       return res.status(401).json({ message: "Authorization token is required." });
//     }
  
//     try {
//       // Verify token and extract user information (replace 'your_secret_key' with the actual key)
//       const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
//       req.user = decoded;  // Store user info in the request object
//       next();  // Pass control to the next middleware/route handler
//     } catch (error) {
//       return res.status(403).json({ message: "Invalid or expired token." });
//     }
//   };

// // export const authorizeRole = (roles: string[]) => {
// //   return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
// //     if (!req.user || !roles.includes(req.user.role)) {
// //       return res.status(403).json({ message: "Forbidden" });
// //     }
// //     next();
// //   };
// // };


// export const authorizeRole = (roles: string[]) => {
//     return (req: Request, res: Response, next: NextFunction) => {
//       const userRole = req.user?.role;  // Assuming req.user contains user info from `authenticate`
      
//       if (!roles.includes(userRole)) {
//         return res.status(403).json({ message: "You do not have the required permissions." });
//       }
  
//       next();  // Continue to the next middleware/route handler
//     };
//   };
// authMiddleware.ts
// authMiddleware.ts

// authMiddleware.ts

// authMiddleware.ts

// authMiddleware.ts

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