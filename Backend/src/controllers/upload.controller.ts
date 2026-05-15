import { Response } from "express";
import fs from "fs";
import cloudinary from "../config/cloudinary";
import { prisma } from "../config/database";
import { AuthRequest } from "../middleware/auth.middleware";
import { sendError, sendSuccess } from "../utils/apiResponse";

export const uploadRoomImage = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.file) return sendError(res, "No image uploaded", 400);

    const { projectId } = req.body;
    if (!projectId) return sendError(res, "Project ID required", 400);

    const project = await prisma.project.findFirst({
      where: { id: projectId, userId: req.userId },
    });
    if (!project) return sendError(res, "Project not found", 404);

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "framework/rooms",
      transformation: [{ quality: "auto", fetch_format: "auto" }],
    });

    fs.unlinkSync(req.file.path);

    const upload = await prisma.roomUpload.create({
      data: {
        projectId,
        originalUrl: result.secure_url,
        cloudinaryId: result.public_id,
      },
    });

    return sendSuccess(
      res,
      {
        uploadId: upload.id,
        url: result.secure_url,
        cloudinaryId: result.public_id,
      },
      "Image uploaded successfully",
      201
    );
  } catch (err: any) {
    console.error("Upload error:", err);
    if (req.file?.path && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    if (err?.message?.includes("Invalid cloud_name")) {
      return sendError(
        res,
        "Cloudinary cloud name is invalid. Check CLOUDINARY_CLOUD_NAME in Backend/.env.",
        500
      );
    }

    if (err?.http_code === 401) {
      return sendError(
        res,
        "Cloudinary credentials are invalid. Check CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET.",
        500
      );
    }

    return sendError(res, err?.message || "Upload failed");
  }
};
