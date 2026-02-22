import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: String,
    role: {
      type: String,
      enum: ["superadmin", "admin", "editor"],
      default: "admin",
    },
    otp: String,
    otpExpiry: Date,
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);