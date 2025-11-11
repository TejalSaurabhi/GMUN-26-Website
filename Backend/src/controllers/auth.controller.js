import bcrypt from "bcrypt";
import { generateTokenAndSetCookie } from "../utils/auth.utils.js";
import { User } from "../models/User.model.js";
import { sendVerificationEmail } from "../mailtrap/emails.js";

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
