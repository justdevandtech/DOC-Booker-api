import express from "express";
import {
  applyAsDoctor,
  getAllDoctors,
} from "../controller/doctorController.js";
import { proctect } from '../middlewares/authmiddleWare.js';
export const doctor_router = express.Router();

doctor_router.post("/apply", proctect, applyAsDoctor);
doctor_router.get("/get-all-doctors", proctect, getAllDoctors);
