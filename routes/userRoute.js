import express  from 'express';
import {
  registerUser,
  loginUser,
  getUserInfoById,
} from "../controller/userController.js";
import { proctect } from "../middlewares/authmiddleWare.js";
export const user_router = express.Router();

user_router.post("/register", registerUser);
user_router.post("/login", loginUser);
user_router.post("/get-user-info-by-id", proctect, getUserInfoById);
