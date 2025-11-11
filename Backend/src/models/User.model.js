import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    Role: {
      type: String,
      enum: [
        "Executive Board",
        "Secretary General",
        "MUN head",
        "Organizing Committee", // Corrected typo here
        "Delegate",
        "Unregistered",
        "ADMIN"
      ],
      default: "Unregistered",
    },
    verified: {
      type: Boolean,
      default: false,
    },
    verificationToken: String,
    verificationTokenExpiresAt: Date, // 24 hours from now
    resetPasswordToken: String,
    resetPasswordTokenExpiresAt: Date, // 15 minutes from now
  },
  { timestamps: true }
);

export const User = mongoose.model("User", UserSchema);
