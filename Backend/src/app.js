/**
 * This file was last changed on 12-11-2025 by Ishan Sekhar
 * 
 * This is the main entry point of the backend application.
 * 
 * Before running this file, make sure to install:
 * mailtrap - for sending mails to registered users for verifying email, welcoming, resetting password, etc.
 * nodemon - for auto-restarting the server on code changes during development
 * crypto - for generating secure random tokens for email verification and password reset
 * bcrypt - for hashing user passwords before storing them in the database
 * jsonwebtoken - for generating and verifying JWT tokens for user authentication
 * To install the packages, run:
 * npm install mailtrap nodemon crypto bcrypt jsonwebtoken cors cookie-parser dotenv express mongoose
 *
 * To start the server with nodemon, add the following script to your package.json:
 * "scripts": {
 *  existing code...
 *   "start": "nodemon src/app.js"
 *  existing code...
 *  }
 */

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./db/connectDB.js";
import userRoutes from "./routes/User.routes.js";
import qnaRoutes from "./routes/qna.routes.js";
import healthCheckRoutes from "./routes/healthCheck.routes.js";
import authRoutes from "./routes/auth.routes.js";
import dotenv from "dotenv";

const app = express();
dotenv.config();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser()); // setup to send and recieve cookies


connectDB()
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server is running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch((err) => {
    console.log("MONGO DB connection failed !!!", err);
    process.exit(1);
  }); 

app.use("/api/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/posts", qnaRoutes);
app.use("/api/v1/health", healthCheckRoutes);

// Global error handler
app.use((err, req, res, next) => {
  err.message = err.message || "Internal server error";
  err.statusCode = err.statusCode || 500;

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
});

