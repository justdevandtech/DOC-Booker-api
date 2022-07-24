import express from "express";
import { applyAsDoctor } from "../controller/doctorController.js";
export const doctor_router = express.Router();

doctor_router.post("/apply", applyAsDoctor);
