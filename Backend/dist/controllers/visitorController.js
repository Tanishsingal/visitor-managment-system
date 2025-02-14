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
exports.fetchVisitors = exports.createVisitor = void 0;
// import { registerVisitor, getAllVisitors } from "../services/visitorService";
const db_1 = require("../db");
const emailService_1 = require("../services/emailService");
const registerVisitor = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.db.visitor.create({ data });
});
const getAllVisitors = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.db.visitor.findMany();
});
const createVisitor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const visitor = yield registerVisitor(req.body);
        yield (0, emailService_1.sendEmail)(req.body.email, "Email sent for confirmation", "host will confirm and allow you");
        res.status(201).json(visitor);
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
exports.createVisitor = createVisitor;
const fetchVisitors = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const visitors = yield getAllVisitors();
        res.json(visitors);
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
exports.fetchVisitors = fetchVisitors;
