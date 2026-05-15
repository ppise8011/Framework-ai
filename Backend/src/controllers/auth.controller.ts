import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt, { Secret, SignOptions } from "jsonwebtoken";
import { prisma } from "../config/database";
import { ENV } from "../config/env";
import { AuthRequest } from "../middleware/auth.middleware";
import { sendError, sendSuccess } from "../utils/apiResponse";

const generateToken = (userId: string, email: string) =>
  jwt.sign(
    { userId, email },
    ENV.JWT_SECRET as Secret,
    { expiresIn: ENV.JWT_EXPIRES_IN } as SignOptions
  );

export const signup = async (req: Request, res: Response) => {
  try {
    const { fullName, email, password, phone, userType } = req.body;

    if (!fullName || !email || !password) {
      return sendError(res, "Name, email and password are required", 400);
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return sendError(res, "Email already registered", 409);
    }

    const hashed = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
      data: {
        fullName,
        email,
        password: hashed,
        phone: phone || null,
        userType: userType || "Homeowner",
      },
    });

    await prisma.subscription.create({
      data: {
        userId: user.id,
        planName: "free",
        totalCredits: 3,
        usedCredits: 0,
        status: "active",
      },
    });

    const token = generateToken(user.id, user.email);

    return sendSuccess(
      res,
      {
        token,
        user: {
          id: user.id,
          fullName: user.fullName,
          email: user.email,
          userType: user.userType,
          role: user.role,
        },
      },
      "Account created successfully",
      201
    );
  } catch (err) {
    console.error("Signup error:", err);
    return sendError(res, "Server error during signup");
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return sendError(res, "Email and password are required", 400);
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !user.password) {
      return sendError(res, "Invalid email or password", 401);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return sendError(res, "Invalid email or password", 401);
    }

    if (!user.isActive) {
      return sendError(res, "Account is deactivated", 403);
    }

    const token = generateToken(user.id, user.email);

    return sendSuccess(
      res,
      {
        token,
        user: {
          id: user.id,
          fullName: user.fullName,
          email: user.email,
          userType: user.userType,
          role: user.role,
          profileImage: user.profileImage,
        },
      },
      "Login successful"
    );
  } catch (err) {
    console.error("Login error:", err);
    return sendError(res, "Server error during login");
  }
};

export const getMe = async (req: AuthRequest, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
      include: { subscription: true },
    });

    if (!user) return sendError(res, "User not found", 404);

    return sendSuccess(res, {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
      userType: user.userType,
      role: user.role,
      profileImage: user.profileImage,
      subscription: user.subscription,
    });
  } catch {
    return sendError(res, "Server error");
  }
};

export const updateProfile = async (req: AuthRequest, res: Response) => {
  try {
    const { fullName, phone, userType, company, bio } = req.body;

    const user = await prisma.user.update({
      where: { id: req.userId },
      data: {
        fullName: fullName || undefined,
        phone: phone || undefined,
        userType: userType || undefined,
        company: company || undefined,
        bio: bio || undefined,
      },
    });

    return sendSuccess(
      res,
      {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        userType: user.userType,
        role: user.role,
      },
      "Profile updated"
    );
  } catch {
    return sendError(res, "Server error");
  }
};
