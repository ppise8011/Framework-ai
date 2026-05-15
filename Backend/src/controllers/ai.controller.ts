import { Response } from "express";
import { ENV } from "../config/env";
import { prisma } from "../config/database";
import { AuthRequest } from "../middleware/auth.middleware";
import { generateInteriorDesign } from "../services/imageGeneration.service";
import { sendError, sendSuccess } from "../utils/apiResponse";

type OutputType = "2d" | "3d" | "video";

const getParamId = (id: string | string[] | undefined) =>
  Array.isArray(id) ? id[0] : id;

const normalizeOutputType = (outputType: unknown): OutputType => {
  if (outputType === "2d" || outputType === "3d" || outputType === "video") {
    return outputType;
  }

  return "3d";
};

const isMissingSecret = (value: string, placeholders: string[]) => {
  if (!value || !value.trim()) {
    return true;
  }

  const normalized = value.toLowerCase();
  return placeholders.some((placeholder) => normalized.includes(placeholder));
};

const getAiSetupError = () => {
  const cloudinaryMissing =
    isMissingSecret(ENV.CLOUDINARY_NAME, ["your_cloud_name", "cloud_name"]) ||
    isMissingSecret(ENV.CLOUDINARY_KEY, ["your_api_key", "api_key"]) ||
    isMissingSecret(ENV.CLOUDINARY_SECRET, ["your_api_secret", "api_secret"]);

  if (cloudinaryMissing) {
    return "Cloudinary credentials are missing in Backend/.env. Add CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET.";
  }

  return null;
};

export const generateDesign = async (req: AuthRequest, res: Response) => {
  try {
    const {
      projectId,
      roomType,
      style,
      length,
      width,
      height,
      floorType,
      ceilingType,
      assets,
      outputType,
    } = req.body;

    if (!projectId || !roomType || !style) {
      return sendError(res, "projectId, roomType and style are required", 400);
    }

    const setupError = getAiSetupError();
    if (setupError) {
      return sendError(res, setupError, 503);
    }

    const project = await prisma.project.findFirst({
      where: { id: projectId, userId: req.userId },
      include: {
        uploads: {
          orderBy: { createdAt: "desc" },
          take: 1,
        },
      },
    });

    if (!project) {
      return sendError(res, "Project not found", 404);
    }

    const normalizedOutputType = normalizeOutputType(outputType);
    const creditsNeeded = normalizedOutputType === "video" ? 3 : 1;

    const subscription = await prisma.subscription.findUnique({
      where: { userId: req.userId },
    });

    if (!subscription) {
      return sendError(res, "No subscription found", 404);
    }

    const remaining = subscription.totalCredits - subscription.usedCredits;

    if (remaining < creditsNeeded) {
      return sendError(
        res,
        `Not enough credits. You need ${creditsNeeded} but have ${remaining}.`,
        402
      );
    }

    const generation = await prisma.aIGeneration.create({
      data: {
        projectId,
        userId: req.userId!,
        outputType: normalizedOutputType,
        status: "processing",
        creditsUsed: creditsNeeded,
      },
    });

    await prisma.subscription.update({
      where: { userId: req.userId },
      data: { usedCredits: { increment: creditsNeeded } },
    });

    await prisma.project.update({
      where: { id: projectId },
      data: {
        roomType: roomType || undefined,
        style: style || undefined,
        length: length ? parseFloat(length) : undefined,
        width: width ? parseFloat(width) : undefined,
        height: height ? parseFloat(height) : undefined,
        floorType: floorType || undefined,
        ceilingType: ceilingType || undefined,
        assets: Array.isArray(assets) ? assets : [],
        status: "processing",
      },
    });

    res.status(202).json({
      success: true,
      message: "Generation started",
      data: {
        generationId: generation.id,
        status: "processing",
        creditsUsed: creditsNeeded,
        remaining: remaining - creditsNeeded,
      },
    });

    generateInteriorDesign({
      roomType,
      style,
      length: length ? parseFloat(length) : undefined,
      width: width ? parseFloat(width) : undefined,
      height: height ? parseFloat(height) : undefined,
      floorType: floorType || undefined,
      ceilingType: ceilingType || undefined,
      assets: Array.isArray(assets) ? assets : [],
      outputType: normalizedOutputType,
      roomImageUrl: project.uploads[0]?.originalUrl,
    })
      .then(async (result) => {
        await prisma.aIGeneration.update({
          where: { id: generation.id },
          data: {
            outputUrl: result.outputUrl,
            cloudinaryId: result.cloudinaryId,
            prompt: result.prompt,
            provider: result.provider,
            status: "completed",
          },
        });

        await prisma.project.update({
          where: { id: projectId },
          data: { status: "completed" },
        });

        console.log(`Generation ${generation.id} completed`);
      })
      .catch(async (error) => {
        console.error("Generation failed:", error);

        await prisma.aIGeneration.update({
          where: { id: generation.id },
          data: {
            status: "failed",
            errorMessage: error.message,
          },
        });

        await prisma.subscription.update({
          where: { userId: req.userId },
          data: { usedCredits: { decrement: creditsNeeded } },
        });

        await prisma.project.update({
          where: { id: projectId },
          data: { status: "failed" },
        });
      });
  } catch (err) {
    console.error("AI generation error:", err);
    return sendError(res, "Failed to start generation");
  }
};

export const getGenerationStatus = async (req: AuthRequest, res: Response) => {
  try {
    const generationId = getParamId(req.params.id);

    if (!generationId) {
      return sendError(res, "Generation id is required", 400);
    }

    const generation = await prisma.aIGeneration.findFirst({
      where: { id: generationId, userId: req.userId },
    });

    if (!generation) {
      return sendError(res, "Generation not found", 404);
    }

    return sendSuccess(res, {
      id: generation.id,
      status: generation.status,
      outputUrl: generation.outputUrl,
      outputType: generation.outputType,
      prompt: generation.prompt,
      errorMessage: generation.errorMessage,
      createdAt: generation.createdAt,
    });
  } catch {
    return sendError(res, "Failed to get generation status");
  }
};

export const getMyGenerations = async (req: AuthRequest, res: Response) => {
  try {
    const generations = await prisma.aIGeneration.findMany({
      where: { userId: req.userId },
      orderBy: { createdAt: "desc" },
      take: 50,
      include: { project: { select: { name: true } } },
    });

    return sendSuccess(res, generations);
  } catch {
    return sendError(res, "Failed to fetch generations");
  }
};

export const getCredits = async (req: AuthRequest, res: Response) => {
  try {
    const subscription = await prisma.subscription.findUnique({
      where: { userId: req.userId },
    });

    if (!subscription) {
      return sendError(res, "No subscription found", 404);
    }

    return sendSuccess(res, {
      planName: subscription.planName,
      totalCredits: subscription.totalCredits,
      usedCredits: subscription.usedCredits,
      remaining: subscription.totalCredits - subscription.usedCredits,
      status: subscription.status,
      expiresAt: subscription.expiresAt,
    });
  } catch {
    return sendError(res, "Failed to fetch credits");
  }
};
