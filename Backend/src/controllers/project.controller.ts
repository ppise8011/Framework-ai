import { Response } from "express";
import { prisma } from "../config/database";
import { AuthRequest } from "../middleware/auth.middleware";
import { sendError, sendSuccess } from "../utils/apiResponse";

const getParamId = (id: string | string[] | undefined) =>
  Array.isArray(id) ? id[0] : id;

export const createProject = async (req: AuthRequest, res: Response) => {
  try {
    const { name, roomType, style, length, width, height, floorType, ceilingType, assets } = req.body;

    const project = await prisma.project.create({
      data: {
        userId: req.userId!,
        name: name || "Untitled Project",
        roomType: roomType || null,
        style: style || null,
        length: length ? parseFloat(length) : null,
        width: width ? parseFloat(width) : null,
        height: height ? parseFloat(height) : null,
        floorType: floorType || null,
        ceilingType: ceilingType || null,
        assets: assets || [],
        status: "draft",
      },
    });

    return sendSuccess(res, project, "Project created", 201);
  } catch (err) {
    console.error(err);
    return sendError(res, "Failed to create project");
  }
};

export const getProjects = async (req: AuthRequest, res: Response) => {
  try {
    const projects = await prisma.project.findMany({
      where: { userId: req.userId },
      include: { uploads: true, generations: true },
      orderBy: { createdAt: "desc" },
    });

    return sendSuccess(res, projects);
  } catch {
    return sendError(res, "Failed to fetch projects");
  }
};

export const getProject = async (req: AuthRequest, res: Response) => {
  try {
    const id = getParamId(req.params.id);
    if (!id) return sendError(res, "Project ID is required", 400);

    const project = await prisma.project.findFirst({
      where: { id, userId: req.userId },
      include: { uploads: true, generations: true },
    });

    if (!project) return sendError(res, "Project not found", 404);
    return sendSuccess(res, project);
  } catch {
    return sendError(res, "Failed to fetch project");
  }
};

export const updateProject = async (req: AuthRequest, res: Response) => {
  try {
    const id = getParamId(req.params.id);
    if (!id) return sendError(res, "Project ID is required", 400);

    const existing = await prisma.project.findFirst({
      where: { id, userId: req.userId },
    });
    if (!existing) return sendError(res, "Project not found", 404);

    const updated = await prisma.project.update({
      where: { id },
      data: req.body,
    });

    return sendSuccess(res, updated, "Project updated");
  } catch {
    return sendError(res, "Failed to update project");
  }
};

export const deleteProject = async (req: AuthRequest, res: Response) => {
  try {
    const id = getParamId(req.params.id);
    if (!id) return sendError(res, "Project ID is required", 400);

    const existing = await prisma.project.findFirst({
      where: { id, userId: req.userId },
    });
    if (!existing) return sendError(res, "Project not found", 404);

    await prisma.project.delete({ where: { id } });
    return sendSuccess(res, null, "Project deleted");
  } catch {
    return sendError(res, "Failed to delete project");
  }
};
