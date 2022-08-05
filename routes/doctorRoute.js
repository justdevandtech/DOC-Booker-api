import express from "express";
import {
  applyAsDoctor,
  getAllDoctors,
  changeDoctorStatus,
  getDoctorById,
  getAllApprovedDoctors,
  blockDoctor,
} from "../controller/doctorController.js";
import { proctect } from '../middlewares/authmiddleWare.js';
export const doctor_router = express.Router();

doctor_router.post("/apply", proctect, applyAsDoctor);
doctor_router.get("/get-all-approved-doctors", proctect, getAllApprovedDoctors);
doctor_router.get("/get-all-doctors", proctect, getAllDoctors);
doctor_router.get("/get-doctor-by-id", proctect, getDoctorById);
doctor_router.put("/change-doctor-status", proctect, changeDoctorStatus);
doctor_router.put("/block-doctor", proctect, blockDoctor);
