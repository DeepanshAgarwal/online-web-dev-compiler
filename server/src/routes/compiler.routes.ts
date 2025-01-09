import express from "express";
import { saveCode } from "../controllers/compiler.controller";

export const compilerRouter = express.Router();

compilerRouter.post("/save", saveCode);
