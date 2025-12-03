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
    verified: {
      type: Boolean,
      default: false,
    },
    committee: String,
    country: String,
    personnel: String,
    verificationToken: String,
    verificationTokenExpiresAt: Date, // 24 hours from now
    resetPasswordToken: String,
    resetPasswordTokenExpiresAt: Date, // 15 minutes from now
  },
  { timestamps: true }
);

export const User = mongoose.model("User", UserSchema);
