import dotenv from "dotenv";

dotenv.config();

export const ENV = {
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || "development",
  JWT_SECRET: process.env.JWT_SECRET || "fallback_secret",
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "7d",
  FRONTEND_URL: process.env.FRONTEND_URL || "http://localhost:3000",
  DATABASE_URL: process.env.DATABASE_URL || "",
  CLOUDINARY_NAME: process.env.CLOUDINARY_CLOUD_NAME || "",
  CLOUDINARY_KEY: process.env.CLOUDINARY_API_KEY || "",
  CLOUDINARY_SECRET: process.env.CLOUDINARY_API_SECRET || "",
  OPENAI_KEY: process.env.OPENAI_API_KEY || "",
  REPLICATE_TOKEN: process.env.REPLICATE_API_TOKEN || "",
  RAZORPAY_KEY_ID: process.env.RAZORPAY_KEY_ID || "",
  RAZORPAY_SECRET: process.env.RAZORPAY_KEY_SECRET || "",
  STRIPE_SECRET: process.env.STRIPE_SECRET_KEY || "",
};
