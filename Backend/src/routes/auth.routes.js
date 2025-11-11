import { Router } from "express";
import { loginRoute, logoutRoute, signUpRoute, verifyEmail } from "../controllers/auth.controller.js";

const router = Router();

router.post("/signup", signUpRoute);
router.post("/login", loginRoute);
router.post("/logout", logoutRoute);
router.post("/verify-email", verifyEmail);

export default router;