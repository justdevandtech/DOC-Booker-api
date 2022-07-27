import express from "express";
import { applyAsDoctor } from "../controller/doctorController.js";
import { proctect } from '../middlewares/authmiddleWare.js';
export const doctor_router = express.Router();

doctor_router.post("/apply", proctect, applyAsDoctor);
