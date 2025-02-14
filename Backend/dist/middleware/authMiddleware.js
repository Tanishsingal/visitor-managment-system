"use strict";
// // import { Request, Response, NextFunction } from "express";
// // import jwt from "jsonwebtoken";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeRole = exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET_KEY = process.env.JWT_SECRET || "mysecretkey";
const authenticate = (req, res, next) => {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token) {
        res.status(401).json({ message: "Authorization token is required." });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, SECRET_KEY);
        req.user = decoded;
        next();
    }
    catch (error) {
        res.status(403).json({ message: "Invalid or expired token." });
        return;
    }
};
exports.authenticate = authenticate;
const authorizeRole = (roles) => {
    return (req, res, next) => {
        if (!req.user || !req.user.role || !roles.includes(req.user.role)) {
            res.status(403).json({ message: "You do not have the required permissions." });
            return;
        }
        next();
    };
};
exports.authorizeRole = authorizeRole;
