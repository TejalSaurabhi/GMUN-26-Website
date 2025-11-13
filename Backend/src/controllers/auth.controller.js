import bcrypt from "bcrypt";
import crypto from "crypto";
import { generateTokenAndSetCookie } from "../utils/auth.utils.js";
import { User } from "../models/User.model.js";
import {
  sendVerificationEmail,
  sendResetPasswordEmail,
  sendResetSuccessfulEmail,
} from "../mailtrap/emails.js";

export const signUpRoute = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    bcrypt.hash(password, 10, async (err, hashedPassword) => {
      if (err) {
        return res
          .status(500)
          .json({ success: false, message: "Error hashing password" });
      }

      const verificationToken = Math.floor(
        100000 + Math.random() * 900000
      ).toString();

      const user = new User({
        fullName,
        email,
        password: hashedPassword,
        verificationToken,
        verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours from now
      });

      await user.save();
      generateTokenAndSetCookie(res, user._id);

      await sendVerificationEmail(email, verificationToken);

      res.status(201).json({
        success: true,
        message: "User registered successfully",
        user: {
          ...user._doc,
          password: undefined,
        },
      });
    });
  } catch (error) {
    console.log("Error in signUpRoute:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const verifyEmail = async (req, res) => {
  const { code } = req.body;

  try {
    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid or expired verification code" });
    }

    user.verified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    await user.save();

    res
      .status(200)
      .json({ success: true, message: "Email verified successfully" });
  } catch (error) {
    console.log("Error in verifyEmail:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const loginRoute = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    user.lastLogin = Date.now();
    await user.save();

    generateTokenAndSetCookie(res, user._id);
    res.status(200).json({
      success: true,
      message: "Login successful",
      user: { ...user._doc, password: undefined },
    });
  } catch (error) {
    console.log("Error in loginRoute:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const logoutRoute = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ success: true, message: "Logged out successfully" });
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      res.status(400).json({ success: false, message: "No such user exists" });
    }

    const resetPasswordToken = crypto.randomBytes(20).toString("hex");
    const resetPasswordTokenExpiresAt = Date.now() + 15 * 60 * 1000; // 15 minutes

    user.resetPasswordToken = resetPasswordToken;
    user.resetPasswordTokenExpiresAt = resetPasswordTokenExpiresAt;

    await user.save();

    await sendResetPasswordEmail(
      email,
      `${process.env.RESET_PASSWORD_URL}/reset-password/${resetPasswordToken}`
    );
    res
      .status(200)
      .json({ success: true, message: "Reset Email sent successfully" });
  } catch (error) {
    console.log("Error in forgot Passsword function: ", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
    });

    if (!user) {
      res.status(400).json({ success: false, message: "reset token expired" });
    }

    bcrypt.hash(password, 10, async (err, hashedPassword) => {
      if (err) {
        console.log("error in hashing password in reset password function");
        res
          .status(500)
          .json({ success: false, message: "error in hashing password" });
      }

      user.password = hashedPassword;
      user.resetPasswordToken = undefined;
      user.resetPasswordTokenExpiresAt = undefined;

      await user.save();
      await sendResetSuccessfulEmail(user.email);

      res
        .status(200)
        .json({ success: true, message: "Password reset successfully" });
    });
  } catch (error) {
    console.log("Error in reset password function: ", error);
    res.status(500).json({ success: false, message: "internal server error" });
  }
};

export const checkAuth = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res.status(400).json({ success: false, message: "No user found" });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.log("Error in chechAuth controller", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
