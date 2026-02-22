import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateTokens.js";
// import { Resend } from "resend";

// const resend = new Resend(process.env.RESEND_API_KEY);

// SEND OTP
export const sendOTP = async (req, res) => {
  const { email } = req.body;

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "User not found" });

  user.otp = otp;
  user.otpExpiry = Date.now() + 10 * 60 * 1000;
  await user.save();

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Your Admin OTP",
    html: `<h2>Your OTP is ${otp}</h2>`,
  });

  res.json({ message: "OTP sent successfully" });
};

// VERIFY OTP
export const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  const user = await User.findOne({ email });

  if (!user || user.otp !== otp || user.otpExpiry < Date.now())
    return res.status(400).json({ message: "Invalid OTP" });

  user.isEmailVerified = true;
  user.otp = null;
  await user.save();

  const token = generateToken(user);

  res.json({ token, user });
};