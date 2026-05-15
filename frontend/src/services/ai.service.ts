import api from "@/lib/api";

export interface GenerateRequest {
  projectId: string;
  roomType: string;
  style: string;
  length?: string;
  width?: string;
  height?: string;
  floorType?: string;
  ceilingType?: string;
  assets: string[];
  outputType: string;
}

export interface Generation {
  id: string;
  status: string;
  outputUrl?: string;
  outputType: string;
  prompt?: string;
  errorMessage?: string;
  createdAt: string;
}

export interface Credits {
  planName: string;
  totalCredits: number;
  usedCredits: number;
  remaining: number;
  status: string;
}

export const aiService = {
  generate: async (
    data: GenerateRequest
  ): Promise<{ generationId: string; remaining: number }> => {
    const res = await api.post("/ai/generate", data);
    return res.data.data;
  },

  getStatus: async (generationId: string): Promise<Generation> => {
    const res = await api.get(`/ai/status/${generationId}`);
    return res.data.data;
  },

  getMyGenerations: async (): Promise<Generation[]> => {
    const res = await api.get("/ai/my-generations");
    return res.data.data;
  },

  getCredits: async (): Promise<Credits> => {
    const res = await api.get("/ai/credits");
    return res.data.data;
  },
};
