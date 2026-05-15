import api from "@/lib/api";

export interface Project {
  id: string;
  name: string;
  roomType?: string;
  style?: string;
  length?: number;
  width?: number;
  height?: number;
  floorType?: string;
  ceilingType?: string;
  assets?: string[];
  status: string;
  createdAt: string;
  uploads?: unknown[];
  generations?: unknown[];
}

export interface CreateProjectData {
  name: string;
  roomType?: string;
  style?: string;
  length?: number;
  width?: number;
  height?: number;
  floorType?: string;
  ceilingType?: string;
  assets?: string[];
}

export const projectService = {
  create: async (data: CreateProjectData): Promise<Project> => {
    const res = await api.post("/projects", data);
    return res.data.data;
  },

  getAll: async (): Promise<Project[]> => {
    const res = await api.get("/projects");
    return res.data.data;
  },

  getOne: async (id: string): Promise<Project> => {
    const res = await api.get(`/projects/${id}`);
    return res.data.data;
  },

  update: async (id: string, data: Partial<CreateProjectData>): Promise<Project> => {
    const res = await api.put(`/projects/${id}`, data);
    return res.data.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/projects/${id}`);
  },

  uploadRoomImage: async (projectId: string, file: File): Promise<{ url: string; uploadId: string }> => {
    const form = new FormData();
    form.append("image", file);
    form.append("projectId", projectId);

    const res = await api.post("/upload/room-image", form, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return res.data.data;
  },
};
