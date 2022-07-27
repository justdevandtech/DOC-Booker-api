import express  from 'express';
import {
  registerUser,
  loginUser,
  getUserInfoById,
  getAllUsers,
} from "../controller/userController.js";
import { proctect } from "../middlewares/authmiddleWare.js";
export const user_router = express.Router();

user_router.post("/register", registerUser);
user_router.post("/login", loginUser);
user_router.post("/get-user-info-by-id", proctect, getUserInfoById);
user_router.get("/get-all-users", proctect, getAllUsers);
