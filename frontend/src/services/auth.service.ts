import api from "@/lib/api";
import { AuthResponse, LoginData, SignupData, User } from "@/types/user.types";

export const authService = {
  signup: async (data: SignupData): Promise<AuthResponse> => {
    const res = await api.post("/auth/signup", data);
    return res.data.data;
  },

  login: async (data: LoginData): Promise<AuthResponse> => {
    const res = await api.post("/auth/login", data);
    return res.data.data;
  },

  getMe: async (): Promise<User> => {
    const res = await api.get("/auth/me");
    return res.data.data;
  },

  updateProfile: async (data: Partial<User>): Promise<User> => {
    const res = await api.put("/auth/profile", data);
    return res.data.data;
  },
};
