import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile
} from "../controllers/User.controllers.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

export default router;
