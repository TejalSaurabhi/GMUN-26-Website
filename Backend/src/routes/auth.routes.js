import { Router } from "express";
import {
  loginRoute,
  logoutRoute,
  signUpRoute,
  verifyEmail,
  forgotPassword,
  resetPassword,
  checkAuth,
} from "../controllers/auth.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = Router();

router.get("/check-auth", verifyToken, checkAuth);
router.post("/signup", signUpRoute);
router.post("/login", loginRoute);
router.post("/logout", logoutRoute);
router.post("/verify-email", verifyEmail);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

export default router;
